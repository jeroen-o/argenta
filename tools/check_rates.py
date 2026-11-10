#!/usr/bin/env python3
"""Tariefbewaking: controleer of Argenta een nieuwere tariefkaart heeft dan de tool gebruikt.

Gebruik:
    python3 tools/check_rates.py            # alleen controleren; exitcode 1 als de tool achterloopt
    python3 tools/check_rates.py --update   # nieuwe tariefkaart ophalen en verwerken (vereist pdftotext)

Bron: https://www.argenta.nl/hypotheek-argenta/hypotheekrente-overzicht
De vaste rentes komen uit de nieuwste tariefkaart (PDF), de variabele rente uit de tabel op de pagina.
"""
import argparse
import html
import json
import pathlib
import re
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request

PAGINA = "https://www.argenta.nl/hypotheek-argenta/hypotheekrente-overzicht"
ROOT = pathlib.Path(__file__).resolve().parent.parent
MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]


def haal(url):
    """Haal een URL op; valt terug op curl als de site het verzoek van Python weigert."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.read()
    except Exception as fout:  # bijvoorbeeld HTTP 403
        try:
            return subprocess.run(["curl", "-sS", "-L", "--fail", "-A", "Mozilla/5.0", url], check=True, capture_output=True, timeout=120).stdout
        except Exception:
            raise SystemExit(f"Ophalen mislukt: {url} ({fout})")


def huidige():
    src = (ROOT / "index.html").read_text(encoding="utf-8")
    m = re.search(r"/\*RATES_START\*/(.*?)/\*RATES_END\*/", src, flags=re.S)
    return json.loads(m.group(1))


def lees_pagina():
    pagina = haal(PAGINA).decode("utf-8", errors="ignore")
    kaarten = {}
    for link, datum in re.findall(r'href="([^"]*TariefkaartSpecialline_(\d{8})\.pdf)"', pagina):
        kaarten[datum] = urllib.parse.urljoin(PAGINA, link)
    if not kaarten:
        raise SystemExit("Geen tariefkaart gevonden op de pagina; de opbouw van de pagina is mogelijk gewijzigd.")
    nieuwste = max(kaarten)
    tekst = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", re.sub(r"<script.*?</script>|<style.*?</style>", "", pagina, flags=re.S))))
    variabel = None
    m = re.search(r"3-maands variabel((?:\s*\d+,\d+%){11})", tekst)
    if m:
        # de ingangsdatum staat in de laatste zin "rentepercentages vanaf ..." vóór de variabele tabel
        datums = re.findall(r"rentepercentages vanaf (?:\w+ )?(\d{1,2} \w+ \d{4})", tekst[:m.start()])
        if datums and datums[-1].split()[1].lower() in MAANDEN:
            variabel = {"datum": datums[-1], "waarden": " ".join(re.findall(r"\d+,\d+", m.group(1)))}
    return nieuwste, kaarten[nieuwste], variabel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--update", action="store_true", help="verwerk de nieuwste tariefkaart in index.html")
    a = ap.parse_args()
    rates = huidige()
    in_tool = rates.get("datumVastIso", "").replace("-", "")
    nieuwste, url, variabel = lees_pagina()
    var_nieuw = bool(variabel) and variabel["datum"] != rates.get("datumVariabel")
    print(f"Tariefkaart in de tool: {rates['datumVast']} ({in_tool}); nieuwste op argenta.nl: {nieuwste}")
    print(f"Variabele rente in de tool: {rates.get('datumVariabel')}; op argenta.nl: {variabel['datum'] if variabel else 'niet gevonden'}")
    achter = nieuwste > in_tool or var_nieuw
    if not achter:
        print("De tarieven in de tool zijn actueel.")
        return 0
    print("De tool loopt achter op de tarieven van Argenta.")
    if not a.update:
        return 1
    with tempfile.TemporaryDirectory() as tmp:
        pdf, txt = pathlib.Path(tmp) / "tarief.pdf", pathlib.Path(tmp) / "tarief.txt"
        pdf.write_bytes(haal(url))
        subprocess.run(["pdftotext", "-layout", str(pdf), str(txt)], check=True)
        cmd = [sys.executable, str(ROOT / "tools" / "update_rates.py"), str(txt)]
        if variabel:
            cmd += ["--variabel", variabel["waarden"], "--variabel-datum", variabel["datum"]]
        subprocess.run(cmd, check=True)
    subprocess.run([sys.executable, str(ROOT / "tools" / "export_engine.py")], check=True)
    print(f"Verwerkt: tariefkaart {nieuwste}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
