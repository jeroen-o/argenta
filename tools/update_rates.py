#!/usr/bin/env python3
"""Werk de tarieven in index.html bij vanuit een Argenta-tariefkaart.

Gebruik:
    pdftotext -layout TariefkaartSpecialline_JJJJMMDD.pdf tarief.txt
    python3 tools/update_rates.py tarief.txt [--variabel "4,87 4,82 ... 5,57" --variabel-datum "9 november 2026"]

De variabele rente op de tariefkaart loopt achter op de website
(https://www.argenta.nl/hypotheek-argenta/hypotheekrente-overzicht); geef de actuele
11 waarden (NHG, <=50 ... >106) mee met --variabel als ze afwijken.
"""
import argparse
import json
import pathlib
import re

PCT = re.compile(r"(\d+,\d+)%")
num = lambda s: float(s.replace(",", "."))


def parse(text):
    lines = text.splitlines()
    datum = re.search(r"(\d{1,2} \w+ \d{4})", lines[0]).group(1)
    out = {"datumVast": datum, "klassen": [50, 60, 70, 80, 85, 90, 95, 100, 106],
           "annuitair": {}, "aflossingsvrij": {}, "groen": {}}
    blok = None
    for line in lines:
        kop = line.strip().lower()
        if kop.startswith("annuïteit, lineair"):
            blok = "annuitair"
        elif kop.startswith("aflossingsvrij, leven"):
            blok = "aflossingsvrij"
        elif kop.startswith("argenta groen lenen"):
            blok = "groen"
        elif kop.startswith("argenta consumptieve"):
            blok = "consumptief"
        elif kop.startswith("argenta duurzaamheidskorting"):
            blok = "korting"
        elif kop.startswith("overbruggingshypotheek"):
            blok = "overbrugging"
        elif kop.startswith("variabele rente"):
            blok = "variabel"
            m = re.search(r"(\d{1,2} \w+ \d{4})", line)
            if m:
                out["datumVariabel"] = m.group(1)
        vals = [num(v) for v in PCT.findall(line)]
        if not vals:
            continue
        jaar = re.match(r"\s*(\d+) jaar", line)
        if blok in ("annuitair", "aflossingsvrij") and jaar and len(vals) == 11:
            out[blok][jaar.group(1)] = vals
        elif blok == "groen" and jaar and len(vals) == 2:
            out["groen"][jaar.group(1)] = vals
        elif blok == "consumptief" and "consumptiefOpslag" not in out:
            out["consumptiefOpslag"] = vals[0]
        elif blok == "korting" and len(vals) >= 2:
            out["korting"] = {"A": vals[0], "B": vals[1], "C": 0}
        elif blok == "overbrugging" and "overbrugging" not in out:
            out["overbrugging"] = vals[0]
        elif blok == "variabel" and len(vals) == 11:
            out["variabel"] = vals
    for naam in ("annuitair", "aflossingsvrij"):
        assert len(out[naam]) == 30, f"{naam}: {len(out[naam])} rijen gevonden, 30 verwacht"
    assert len(out["groen"]) == 6 and "variabel" in out and "korting" in out and "consumptiefOpslag" in out
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tekst")
    ap.add_argument("--variabel")
    ap.add_argument("--variabel-datum")
    ap.add_argument("--html", default=str(pathlib.Path(__file__).resolve().parent.parent / "index.html"))
    a = ap.parse_args()
    rates = parse(pathlib.Path(a.tekst).read_text(encoding="utf-8"))
    if a.variabel:
        v = [num(x.rstrip("%")) for x in a.variabel.split()]
        assert len(v) == 11, "--variabel verwacht 11 waarden"
        rates["variabel"] = v
        if a.variabel_datum:
            rates["datumVariabel"] = a.variabel_datum
    html = pathlib.Path(a.html)
    src = html.read_text(encoding="utf-8")
    new, n = re.subn(r"/\*RATES_START\*/.*?/\*RATES_END\*/",
                     lambda _: "/*RATES_START*/" + json.dumps(rates, ensure_ascii=False, separators=(",", ":")) + "/*RATES_END*/",
                     src, flags=re.S)
    assert n == 1, "RATES-markers niet gevonden in index.html"
    html.write_text(new, encoding="utf-8")
    print(f"Tarieven bijgewerkt: vast per {rates['datumVast']}, variabel per {rates['datumVariabel']}")


if __name__ == "__main__":
    main()
