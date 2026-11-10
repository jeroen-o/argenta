#!/usr/bin/env python3
"""Werk de NHG-beheertabellen (Financieringslasttabel Beheer) in index.html bij.

Gebruik (vereist openpyxl):
    python3 tools/update_beheer.py "vn-nhg-2027-bijlage-5-beheertabellen-excel.xlsx" 2027

Bron: bijlage 5 bij de NHG Voorwaarden en normen (nhg.nl/voorwaarden-en-normen).
De tabellen worden gebruikt voor de beheertoets bij ontslag uit de hoofdelijke aansprakelijkheid.
"""
import json
import pathlib
import re
import sys
import warnings

import openpyxl

warnings.simplefilter("ignore")
BLADEN = {"1. paar": "paar", "2. paar zonder werk": "paarZonderWerk", "3. alleenstaand": "alleen",
          "4. alleenstaand zonder werk": "alleenZonderWerk", "5. paar AOW": "paarAOW", "6. alleenstaand AOW": "alleenAOW"}


def promille(c):
    if isinstance(c, str):
        return round(float(c.strip().rstrip("%").replace(",", ".")) * 10)
    return round(c * 1000)


def blok(rijen, kolom):
    """Lees een tabel waarvan de inkomenskolom op index `kolom` staat."""
    data = [(r[kolom], [promille(c) for c in r[kolom + 1:kolom + 13]]) for r in rijen
            if isinstance(r[kolom], (int, float)) and r[kolom] >= 1000 and all(c is not None for c in r[kolom + 1:kolom + 13])]
    ink = [d[0] for d in data]
    assert ink and all(b - a == 1000 for a, b in zip(ink, ink[1:])), "onverwachte inkomensstappen"
    return {"start": ink[0], "pct": [d[1] for d in data]}


def main():
    xlsx, jaar = sys.argv[1], int(sys.argv[2])
    wb = openpyxl.load_workbook(xlsx, data_only=True)
    uit = {"jaar": jaar}
    for blad, sleutel in BLADEN.items():
        rijen = list(wb[blad].iter_rows(values_only=True))
        kop = rijen[0]
        box3 = next(i for i, c in enumerate(kop) if isinstance(c, str) and c.strip().lower() == "box 3")
        uit[sleutel] = {"regulier": blok(rijen, 0), "box3": blok(rijen, box3)}
    html = pathlib.Path(__file__).resolve().parent.parent / "index.html"
    src = html.read_text(encoding="utf-8")
    new, n = re.subn(r"/\*BEHEER_START\*/.*?/\*BEHEER_END\*/",
                     lambda _: "/*BEHEER_START*/" + json.dumps(uit, separators=(",", ":")) + "/*BEHEER_END*/", src, flags=re.S)
    assert n == 1, "BEHEER-markers niet gevonden in index.html"
    html.write_text(new, encoding="utf-8")
    print("Beheertabellen " + str(jaar) + ": " + ", ".join(f"{k} {len(v['regulier']['pct'])}/{len(v['box3']['pct'])} rijen vanaf {v['regulier']['start']}" for k, v in uit.items() if k != "jaar"))


if __name__ == "__main__":
    main()
