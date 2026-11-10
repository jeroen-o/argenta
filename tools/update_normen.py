#!/usr/bin/env python3
"""Werk de leennormen (Tijdelijke regeling hypothecair krediet) in index.html bij.

Gebruik (vereist openpyxl):
    python3 tools/update_normen.py "Bijlage financieringslastnormen 2027.xlsx" 2027

Bron: Nibud-bijlage bij het advies hypotheeknormen; de tabellen zijn gelijk aan
bijlage 1 van de Wijzigingsregeling hypothecair krediet in de Staatscourant.
"""
import json
import pathlib
import re
import sys
import warnings

import openpyxl

warnings.simplefilter("ignore")


def promille(c):
    if isinstance(c, str):
        return round(float(c.strip().rstrip("%").replace(",", ".")) * 10)
    return round(c * 1000)


def tabel(ws):
    rijen = [r[:13] for r in ws.iter_rows(min_row=5, values_only=True) if isinstance(r[0], (int, float))]
    ink = [r[0] for r in rijen]
    assert ink[0] % 1000 == 0 and all(b - a == 1000 for a, b in zip(ink, ink[1:])), "onverwachte inkomensstappen"
    return ink[0], [[promille(c) for c in r[1:]] for r in rijen]


def parameters(ws):
    blok, uit = None, {"labelExtra": [], "verbouwExtra": [], "brutering": []}
    for r in ws.iter_rows(values_only=True):
        c = [x for x in r if x is not None]
        if not c:
            continue
        kop = str(c[0]).lower()
        if kop.startswith("extra bedrag bij aangaan"):
            blok = "labelExtra"
        elif kop.startswith("extra bedrag voor verduurzamende"):
            blok = "verbouwExtra"
        elif kop.startswith("vuistregel"):
            blok = "twee"
        elif kop.startswith("verhoging voor groepen"):
            blok = "alleen"
        elif kop.startswith("bruteringsfactor"):
            blok = "brutering"
        elif blok in ("labelExtra", "verbouwExtra", "brutering") and len(c) == 2 and isinstance(c[1], (int, float)):
            uit[blok].append(c[1])
        elif blok == "twee" and len(c) >= 5:
            uit["factorHoog"], uit["factorLaag"] = c[1], c[4]
        elif blok == "alleen" and len(c) == 2:
            uit["alleenstaandBedrag"] = c[1]
    assert len(uit["labelExtra"]) == 8 and len(uit["verbouwExtra"]) == 8 and len(uit["brutering"]) == 12
    return uit


def main():
    xlsx, jaar = sys.argv[1], int(sys.argv[2])
    wb = openpyxl.load_workbook(xlsx, data_only=True)
    normen = {"jaar": jaar, "grenzen": [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5]}
    for blad, sleutel in (("nietAOW", "nietAOW"), ("welAOW", "welAOW"), ("box3 nietAOW", "box3nietAOW"), ("box3 welAOW", "box3welAOW")):
        start, data = tabel(wb[blad])
        normen["start"] = start
        normen[sleutel] = data
    normen.update(parameters(wb["overige parameters"]))
    html = pathlib.Path(__file__).resolve().parent.parent / "index.html"
    src = html.read_text(encoding="utf-8")
    new, n = re.subn(r"/\*NORMEN_START\*/.*?/\*NORMEN_END\*/",
                     lambda _: "/*NORMEN_START*/" + json.dumps(normen, separators=(",", ":")) + "/*NORMEN_END*/", src, flags=re.S)
    assert n == 1, "NORMEN-markers niet gevonden in index.html"
    html.write_text(new, encoding="utf-8")
    print(f"Leennormen {jaar} bijgewerkt: {len(normen['nietAOW'])} inkomensrijen (niet-AOW), {len(normen['welAOW'])} (AOW)")


if __name__ == "__main__":
    main()
