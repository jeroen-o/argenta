# Offertevoorstel Argenta hypotheek (indicatief)

Standalone tool (`index.html`, één bestand, geen build-step, geen externe API's) waarmee hypotheekadviseurs een
indicatief offertevoorstel voor de Argenta hypotheek opstellen en afdrukken.

> **Geen product of document van Argenta.** De tool levert geen renteaanbod of bindende offerte; die brengt alleen
> Argenta uit na een aanvraag via HDN. Het resultaat is ook geen adviesrapport.

## Wat de tool doet

- Rente per leningdeel uit de tariefkaart: aflosvorm, rentevaste periode, NHG of risicoklasse (LTV),
  duurzaamheidskorting, opslag consumptief, groen lenen, variabele rente, overbrugging.
- Toetsing van de productregels uit de hypotheekgids: hoofdsom, LTV, aflossingsvrij (30% / € 150.000, koopstarters),
  consumptieve hypotheek, groen lenen, Desktop Taxatie, overbrugging, NHG-grens.
- Inkomenstoets volgens de Tijdelijke regeling hypothecair krediet (leennormen 2027): financieringslastpercentages,
  toetsrente, studielening (bruteringsfactor), extra leenruimte energielabel en alleenstaanden.
- Afdrukbaar offertevoorstel (via `window.open`, werkt ook in een iframe / Google Sites). Geen `localStorage`.

## Bronnen

| Onderdeel | Bron | Versie |
| --- | --- | --- |
| Tarieven | Tariefkaart Argenta, argenta.nl/hypotheek-argenta/hypotheekrente-overzicht | vast 28-10-2026, variabel 9-11-2026 |
| Acceptatie | Argenta hypotheekgids | augustus 2026 |
| Leennormen | Wijzigingsregeling hypothecair krediet 2027 (Stcrt. 2026, 38415) + Nibud-bijlage | 2027 |
| NHG-grens, provisie | nhg.nl/voorwaarden-en-normen | geraadpleegd 10-11-2026 |

Argenta heeft geen API; wijzigingen komen via de nieuwsbrief en de adviseurspagina. Tarieven moeten dus handmatig
worden bijgewerkt (meerdere keren per maand).

## Bijwerken

```bash
pdftotext -layout TariefkaartSpecialline_JJJJMMDD.pdf tarief.txt
```

```bash
python3 tools/update_rates.py tarief.txt --variabel "4,87 4,82 4,82 4,82 5,07 5,07 5,37 5,37 5,37 5,37 5,57" --variabel-datum "9 november 2026"
```

```bash
python3 tools/update_normen.py "Bijlage financieringslastnormen 2027.xlsx" 2027
```

Productregels (`REGELS`, `VOORWAARDEN`) en NHG-parameters (`NHG`) staan als constanten bovenin het script in
`index.html` en moeten bij een nieuwe hypotheekgids handmatig worden nagelopen.

## Beperkingen

- De inkomenstoets rekent met de normen 2027 (gelden vanaf 1 januari 2027); de normen 2026 zitten er niet in.
- De toetsrente voor rentevast korter dan 10 jaar is een invoerveld (standaard 5,00%); de AFM stelt deze per kwartaal vast.
- De NHG-grens is vereenvoudigd getoetst op de hoofdsom, niet op de kosten voor de woning.
- Niet getoetst: BKR, dubbele lasten bij overbrugging, werkelijke-lastentoets voor AOW-gerechtigden, tijdelijk-tekortregeling,
  erfpacht- en VvE-beoordeling. Geen netto maandlast.
