# Conceptofferte Argenta hypotheek (indicatief)

Standalone tool (`index.html`, één bestand, geen build-step, geen externe API's) waarmee hypotheekadviseurs een
indicatieve conceptofferte voor de Argenta hypotheek opstellen en afdrukken. De opzet volgt de rekentool van
MUNT Hypotheken (munt.hypotheekbond.nl): een wizard in vier stappen met een rapport als resultaat.

> **Geen product of document van Argenta.** De tool levert geen renteaanbod of bindende offerte; die brengt alleen
> Argenta uit na een aanvraag via HDN. Het resultaat is ook geen adviesrapport.

## Wat de tool doet

1. **Start** – woning, aanvragers en adviseur.
2. **Kosten** – koopsom, verbouwing, overdrachtsbelasting, notaris-, taxatie- en advieskosten, NHG, eigen geld → te financieren.
3. **Kan dit bedrag geleend worden?** – leningdelen met rente uit de tariefkaart, inkomenstoets (leennormen 2027),
   overbrugging; toont financieel haalbaar bedrag, extra ruimte voor EBV, maandlast, totaal te betalen bedrag en JKP.
4. **Overzicht** – toetsing aan de productregels uit de hypotheekgids en de conceptofferte (6 pagina's A4):
   voorblad, toelichting, kosten en maandlast, verloop restschuld per jaar, overzicht volgens de indeling van het ESIS,
   aandachtspunten en het vervolgtraject bij Argenta.

Afdrukken gaat via `window.open` (werkt ook in een iframe / Google Sites). Geen `localStorage`.

## Eisen aan een hypotheekofferte

Een bindend aanbod komt van de kredietgever, met een gepersonaliseerd ESIS en minimaal 14 dagen bedenktijd
(art. 4:33 Wft, BGfo, richtlijn 2014/17/EU). De conceptofferte neemt de verplichte onderdelen over (kredietbedrag,
looptijd, rente en rentevaste periode, JKP, totale kosten, totaal te betalen bedrag, termijnen, aanvullende
verplichtingen, vervroegd aflossen, klachten, toezichthouder), maar is zelf geen renteaanbod, bindend aanbod of ESIS.
Laat compliance de teksten toetsen voordat de tool naar adviseurs gaat.

## Logo

Het Argenta-logo staat in de tool en op het voorblad. Gebruik van het logo vraagt toestemming van Argenta.

## Bronnen

| Onderdeel | Bron | Versie |
| --- | --- | --- |
| Tarieven | Tariefkaart Argenta, argenta.nl/hypotheek-argenta/hypotheekrente-overzicht | vast 28-10-2026, variabel 9-11-2026 |
| Acceptatie | Argenta hypotheekgids | augustus 2026 |
| Leennormen | Wijzigingsregeling hypothecair krediet 2027 (Stcrt. 2026, 38415) + Nibud-bijlage | 2027 |
| Kredietgever, aflossen, klachten | Voorwaarden Argenta hypotheek | juli 2025 |
| NHG-grens, provisie | NHG Voorwaarden en normen 2027-1 (C.2, A.5.3) | 2027: € 500.000 / € 530.000, provisie 0,4% |

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
- Het JKP en het verloop gaan uit van een gelijkblijvende rente over de hele looptijd; de overbrugging telt niet mee.
- Kostenposten (notaris, taxatie, advies) zijn invulbare indicaties; overdrachtsbelasting alleen 2% of 0%.
