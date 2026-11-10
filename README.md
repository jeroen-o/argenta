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
4. **Overzicht** – toetsing aan de productregels uit de hypotheekgids en de conceptofferte (8 pagina's A4):
   voorblad, toelichting, kosten en maandlast, verloop restschuld per jaar, overzicht volgens de indeling van het ESIS,
   aandachtspunten en het vervolgtraject bij Argenta.

Stap 4 toont ook **tips voor de adviseur** (extra eigen geld voor een lagere tariefklasse, NHG, duurzaamheidskorting,
aflossingsvrij terugbrengen, leenruimte vergroten). Dit zijn rekenkundige mogelijkheden, geen advies; ze staan niet in het rapport.

Afdrukken gaat via `window.open` (werkt ook in een iframe / Google Sites). Geen `localStorage`.

## Bestanden

| Bestand | Doel |
| --- | --- |
| `index.html` | De rekentool; bevat ook de rekenkern (enige bron) |
| `handleiding.html` | Handleiding voor de tool en de API |
| `argenta-engine.js` | De rekenkern als module voor koppelingen (gegenereerd uit `index.html`) |
| `hdn-adapter.js`, `hdn-mapping.json` | Omzetting van een HDN-aanvraagbericht naar de invoer van de rekenkern; de mapping moet nog worden ingevuld |
| `voorbeelden/aanvraag.json` | Voorbeeldinvoer voor de API |
| `tests/test.js`, `tests/e2e.js` | Tests van de rekenkern en de adapter, en een browsertest van de tool |
| `tools/check_rates.py` | Tariefbewaking: controleert argenta.nl op een nieuwere tariefkaart en verwerkt die met `--update` |
| `.github/workflows/` | Draait de tests bij elke wijziging en de tariefbewaking elke werkdag |
| `voorbeelden/voorbeeld-conceptofferte.pdf` | Voorbeeld van de conceptofferte (fictieve cijfers) |
| `tools/` | Scripts om tarieven, normen en de module bij te werken |

## API

`ArgentaEngine.resultaat(aanvraag)` geeft een oordeel (`past`, `voorbehoud`, `past_niet`) met afwijzingen, voorbehouden,
voorwaarden, grenzen (minimale marktwaarde, minimaal toetsinkomen, benodigd eigen geld en meer), rente, maandlast en JKP.
Het is een module, geen server: de rekenkern draait in de browser of in Node en verstuurt niets. Het oordeel is geen kans
dat Argenta de offerte afgeeft. Zie `handleiding.html` voor invoer, uitvoer en de HDN-aansluiting.

```bash
python3 tools/export_engine.py
```

```bash
node tests/test.js
```

## Tariefbewaking en tests

- De tool toont een gele balk en de API geeft `tarieven.verouderd: true` als de tariefkaart ouder is dan 14 dagen.
- `python3 tools/check_rates.py` controleert of argenta.nl een nieuwere tariefkaart of variabele rente heeft; met `--update` wordt die verwerkt.
- Op GitHub draait dit elke werkdag en volgt bij nieuwe tarieven een pull request. Dat vraagt de repository-instelling
  "Allow GitHub Actions to create and approve pull requests"; anders maakt de workflow een issue aan.
- Bij elke push en pull request draaien `tests/test.js` en `tests/e2e.js`, en wordt gecontroleerd dat `argenta-engine.js` gelijk is aan `index.html`.

## Bijzondere toetsen

| Toets | Invoer | Bron |
| --- | --- | --- |
| Werkelijke lasten voor AOW-gerechtigden | stap 3, bijzondere toets | hypotheekgids 5.1.1 |
| Senioren verhuisregeling | huidige maandlast, inkomen vanaf AOW | hypotheekgids 5.1.1 |
| Tijdelijk-tekortregeling | geboortedata, inkomen in de tekortperiode | hypotheekgids 5.1.2 |
| Erfpacht | uitgever, vestigingsdatum, opinie, resterende duur, canon | hypotheekgids 2.4 |
| VvE | aanwezig, actief/slapend, onderhoud, MJOP, fondsen | stroomschema beoordeling VvE |
| Ontslag hoofdelijke aansprakelijkheid | doel OHA, bestaande leningdelen, oorspronkelijke marktwaarde | adviseurspagina Argenta OHA, NHG V&N 2027 D.4 en bijlage 5 |
| Dubbele lasten bij overbrugging | maandlast huidige hypotheek, periode, eigen middelen | hypotheekgids 1.8.1 |

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
| Beheertoets (OHA) | NHG Financieringslasttabel Beheer (bijlage 5) | 2027 |
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
- De tool voert zelf geen BKR-toets uit; de uitkomst van de BKR-toets is invoer. Geen netto maandlast.
- Bijzondere toetsen (werkelijke lasten AOW, senioren verhuisregeling, tijdelijk-tekortregeling, erfpacht, VvE, dubbele lasten)
  volgen de hypotheekgids en het stroomschema VvE, maar blijven indicatief: de AOW-leeftijd is vast op 67 jaar gezet, de
  dubbele-lastentoets is een eigen uitwerking (eigen middelen of ruimte in de inkomenstoets) en erfpachtopinies beoordeelt Argenta zelf.
- Het JKP en het verloop gaan uit van een gelijkblijvende rente over de hele looptijd; de overbrugging telt niet mee.
- Kostenposten (notaris, taxatie, advies) zijn invulbare indicaties; overdrachtsbelasting alleen 2% of 0%.
