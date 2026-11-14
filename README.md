# Conceptofferte Argenta hypotheek (indicatief)

Rekentool en API waarmee hypotheekadviseurs vooraf toetsen of een aanvraag past binnen de gepubliceerde tarieven en
voorwaarden van de Argenta hypotheek, en waarmee ze een conceptofferte voor de klant maken.

> **Geen product of document van Argenta.** De tool levert geen renteaanbod of bindende offerte; die brengt alleen
> Argenta uit na een aanvraag via HDN. Het oordeel zegt of een aanvraag past binnen de gepubliceerde regels, niet of
> Argenta de offerte afgeeft. Het resultaat is ook geen adviesrapport.

Uitleg voor gebruikers en voor de koppeling staat in **`handleiding.html`**.

## Wat de tool doet

De rekentool (`index.html`) is één HTML-bestand zonder installatie of server. De opzet volgt de rekentool van MUNT
Hypotheken: een wizard in vier stappen met een rapport als resultaat.

1. **Start** – woning, aanvragers en adviseur; bij een appartement de VvE, bij erfpacht de erfpachtgegevens.
2. **Kosten** – koopsom, verbouwing, overdrachtsbelasting, notaris-, taxatie- en advieskosten, vrije kostenposten, NHG en
   eigen geld → te financieren.
3. **Kan dit bedrag geleend worden?** – leningdelen met rente uit de tariefkaart, inkomenstoets (leennormen 2027),
   bijzondere toetsen, BKR, overbrugging; toont het haalbare bedrag, maandlast, totaal te betalen bedrag en JKP.
4. **Overzicht** – het oordeel (past, past onder voorbehoud, past niet), de voorwaarden waaronder het geldt, meldingen,
   tips voor de adviseur, de documentenlijst en de conceptofferte (9 pagina's A4).

Afdrukken gaat via `window.open` (werkt ook in een iframe / Google Sites). Geen `localStorage`; er wordt niets verstuurd
of opgeslagen.

## Wat er wordt getoetst

| Onderdeel | Bron |
| --- | --- |
| Rente per leningdeel: NHG of risicoklasse, duurzaamheidskorting, opslag consumptief, groen lenen, variabel, overbrugging | tariefkaart Argenta |
| Hoofdsom, LTV, aflossingsvrij (ook de regel voor hypotheken van vóór 17 augustus 2026), koopstarters, consumptief, groen lenen, Desktop Taxatie met betrouwbaarheidsscore, een of meer overbruggingen, verkrijgen volledig eigendom | hypotheekgids, hoofdstuk 1–3 |
| Inkomensbepaling: vast, IBL, flexibel, perspectiefverklaring, ondernemer, pensioen, uitkering, alimentatie, vermogen, lijfrente, 50-urengrens, toekomstig inkomen en toekomstig pensioen | hypotheekgids hoofdstuk 5 |
| Inkomenstoets: financieringslastpercentages, toetsrente (gewogen naar hoofdsom en looptijd; aangeboden rente als die hoger is), studielening, energielabel, alleenstaanden, lijst met energiebesparende voorzieningen | Tijdelijke regeling hypothecair krediet, tekst per 1 januari 2027 (wetten.overheid.nl, BWBR0032503) |
| NHG-grens op de kosten voor de woning en op de lening, bijkomende kosten (6%), borgtochtprovisie, aflossingsvrij, label E/F/G, taxatie | NHG Voorwaarden en normen 2027-1 (A.5.3, C.2, C.5.1, C.6, D.2) |
| Toetsrente bij aflossing binnen de rentevaste periode, eisen aan de consumptieve hypotheek, vrijstelling van het bouwdepot, omgevingsvergunning, ouderdom van de taxatie, energielabelplicht | hypotheekgids 1.2.2, 1.5, 1.8.2, 2.1.1, 2.1.2, 3.3 |
| Werkelijke lasten voor AOW-gerechtigden, senioren verhuisregeling, tijdelijk-tekortregeling | hypotheekgids 5.1.1 en 5.1.2 |
| Erfpacht, VvE, funderingsrisico, woningtype | hypotheekgids 2.4, 2.1.6 (stroomschema VvE), 2.1.7, 2.3 |
| Aanvrager: minimumleeftijd, nationaliteit en verblijf, familieverband, borgstelling, bewind | hypotheekgids 4.1 en 4.2 |
| Documentenlijst per dossier | hypotheekgids hoofdstuk 8 |
| BKR-uitkomst, aantal contracten, loonbeslag | hypotheekgids 6.2 en 7.1.1 |
| Maandlast per krediet, buitenlands belastingplichtig, 30%-regeling | hypotheekgids 6.3 en 6.4 |
| Verhoging en tweede hypotheek | hypotheekgids 1.2.4 en de adviseurspagina over wijzigingen in beheer |
| Bouwkundig rapport en herstelkosten in depot | hypotheekgids 2.1.4 en 2.1.5 |
| Nieuwbouw: marktwaarde uit de stichtingskosten, eigen beheer, zelfbouw | hypotheekgids 2.2 |
| Tijdelijk twee hypotheken bij de verhuisregeling | hypotheekgids 1.7.2 |
| PGB-inkomen, opschortende voorwaarden, schuldsanering, starterslening, garagebox | hypotheekgids 7.1 en 2.3.1 |
| Dubbele lasten bij overbrugging | hypotheekgids 1.8.1 |
| Verhuisregeling: meegenomen leningdeel met eigen rente en resterende rentevaste periode | hypotheekgids 1.7 |
| Ontslag hoofdelijke aansprakelijkheid: leennorm, werkelijke lasten, beheertoets | adviseurspagina Argenta OHA, NHG D.4, D.6 en bijlage 5 |

De uitkomst bevat ook de **voorwaarden en grenzen** waaronder het oordeel geldt: minimale marktwaarde (ook voor de
tariefklasse), funderingsrisico, BKR, minimaal toetsinkomen, benodigd eigen geld, maximaal aflossingsvrij.

## Bestanden

| Bestand | Doel |
| --- | --- |
| `index.html` | De rekentool; bevat ook de rekenkern (enige bron) |
| `handleiding.html` | Handleiding voor de tool en de API |
| `testinstructie.html` | Testinstructie voor Argenta: testdossiers, de rekenregels die bevestigd moeten worden en het terugmelden van afwijkingen |
| `argenta-engine.js` | De rekenkern als module voor koppelingen (gegenereerd uit `index.html`) |
| `hdn-adapter.js`, `hdn-mapping.json` | Omzetting van een HDN-aanvraagbericht naar de invoer van de rekenkern; **de mapping moet nog worden ingevuld** |
| `voorbeelden/aanvraag.json`, `voorbeelden/aanvraag-inkomensbronnen.json`, `voorbeelden/uitkomst.json` | Voorbeelden van de invoer en de uitvoer van de API |
| `voorbeelden/voorbeeld-conceptofferte.pdf` | Voorbeeld van de conceptofferte (fictieve cijfers) |
| `tests/test.js`, `tests/fuzz.js`, `tests/e2e.js` | Tests van de rekenkern en adapter, robuustheidstest met willekeurige aanvragen, browsertest van de tool |
| `tools/` | Scripts om tarieven, normen, beheertabellen en de module bij te werken |
| `.github/workflows/` | Draait de tests bij elke wijziging en de tariefbewaking elke werkdag |

## API

`ArgentaEngine.resultaat(aanvraag)` krijgt een aanvraag als JSON en geeft het oordeel als JSON terug: `oordeel`,
`afwijzingen`, `voorbehoud`, `voorwaarden`, `grenzen`, rente, maandlast, JKP, de inkomenstoets en de tariefstatus.
Het is een module, geen server: de rekenkern draait in de browser of in Node, heeft geen afhankelijkheden en verstuurt niets.

```js
const ArgentaEngine = require('./argenta-engine.js');
const uitkomst = ArgentaEngine.resultaat(require('./voorbeelden/aanvraag.json'));
```

## Tests

```bash
node tests/test.js
```

```bash
node tests/fuzz.js
```

```bash
node tests/e2e.js
```

De browsertest vraagt het pakket `playwright` met Chromium. Op GitHub draaien alle drie bij elke push en pull request,
samen met een controle dat `argenta-engine.js` gelijk is aan `index.html`.

## Bijwerken

`index.html` is de enige bron. Draai na elke wijziging het exportscript en de tests.

| Wanneer | Opdracht |
| --- | --- |
| Controleren op een nieuwe tariefkaart | `python3 tools/check_rates.py` (met `--update` wordt de kaart verwerkt) |
| Tariefkaart handmatig verwerken | `pdftotext -layout Tariefkaart.pdf tarief.txt` en `python3 tools/update_rates.py tarief.txt` |
| Nieuwe leennormen (jaarlijks) | `python3 tools/update_normen.py "Bijlage financieringslastnormen JJJJ.xlsx" JJJJ` |
| Nieuwe NHG-beheertabellen (jaarlijks) | `python3 tools/update_beheer.py "vn-nhg-JJJJ-bijlage-5-beheertabellen-excel.xlsx" JJJJ` |
| Nieuwe hypotheekgids, NHG-grens of toetsrente AFM | constanten `REGELS`, `NHG`, `EXTRA` en `VOORWAARDEN` in `index.html` |
| Na elke wijziging | `python3 tools/export_engine.py` |

**Tariefbewaking.** Argenta heeft geen API voor tarieven en wijzigt de rente meerdere keren per maand. De tool toont een
gele balk en de API geeft `tarieven.verouderd: true` als de tariefkaart ouder is dan 14 dagen. Op GitHub controleert een
workflow elke werkdag of er een nieuwe kaart is en maakt dan een pull request. Dat vraagt de repository-instelling
"Allow GitHub Actions to create and approve pull requests"; anders maakt de workflow een issue aan.

## Bronnen

| Onderdeel | Bron | Versie |
| --- | --- | --- |
| Tarieven | Tariefkaart Argenta, argenta.nl/hypotheek-argenta/hypotheekrente-overzicht | zie de kop van de tool |
| Acceptatie | Argenta hypotheekgids | augustus 2026 |
| Kredietgever, aflossen, klachten | Voorwaarden Argenta hypotheek | juli 2025 |
| OHA | argenta.nl/adviseur/ontslag-uit-de-hoofdelijke-aansprakelijkheid-oha | geraadpleegd november 2026 |
| Leennormen | Wijzigingsregeling hypothecair krediet 2027 (Stcrt. 2026, 38415) + Nibud-bijlage | 2027 |
| NHG-grens, kosten, provisie, beheertoets | NHG Voorwaarden en normen 2027-1 (A.5.3, C.2, C.5.1, C.6, D.2, D.4, D.6, bijlage 5) | 2027 |

## Compliance

- **Offerte.** Een bindend aanbod komt van de kredietgever, met een gepersonaliseerd ESIS en minimaal 14 dagen bedenktijd
  (art. 4:33 Wft, BGfo, richtlijn 2014/17/EU). De conceptofferte neemt de verplichte onderdelen over en volgt de indeling
  van het ESIS, maar is zelf geen renteaanbod, bindend aanbod of ESIS. De wettelijke eisen zijn niet tegen de wettekst gecontroleerd.
- **Logo.** Het Argenta-logo staat in de tool en op het voorblad. Gebruik van het logo vraagt toestemming van Argenta.
- **Tips.** De tips voor de adviseur zijn rekenkundige mogelijkheden, geen advies; ze staan niet op de conceptofferte.
- **Voorbeeldofferte.** Het voorbeeld in `voorbeelden/` bevat fictieve namen en gegevens.
- Laat compliance de teksten toetsen voordat de tool naar adviseurs gaat.

## Beperkingen

- Het oordeel is geen kans dat Argenta de offerte afgeeft; de tool is niet geijkt op echte uitkomsten van Argenta.
- De leennormen en NHG-bedragen zijn die van 2027; de normen 2026 zitten er niet in.
- De toetsrente voor rentevast korter dan 10 jaar is een invoerveld (standaard 5,00%); de AFM stelt deze per kwartaal vast.
- De NHG-toets dekt de NHG-grens, de mee te financieren kosten, de provisie, aflossingsvrij, energielabel E, F of G en de taxatie. Niet doorgerekend: restschuldfinanciering (C.6.3), koop via een veiling, erfpachtconstructies en koperssteun met aanvullend vermogensrisico, drijvende woningen en opbouwproducten.
- De tool voert zelf geen BKR-toets uit; de uitkomst is invoer. Het toetsinkomen wordt berekend uit de opgegeven bronnen, maar Argenta stelt het zelf vast. Geen netto maandlast.
- Het percentage van het CHF voor inkomen uit vermogen zit niet in de tool; de regel voor ondernemers op basis van cijfers is een eigen uitwerking.
- Eigen uitwerkingen die Argenta nog moet bevestigen: de dubbele-lastentoets, de volgorde in het VvE-stroomschema, de toets
  bij de senioren- en tekortregeling, en welke NHG-regel bij welke stap van de OHA-toets hoort. De AOW-leeftijd staat op 67 jaar.
- De budgettoets bij OHA rekent met bedragen van de adviseur; de tool bevat geen Nibud-normbedragen.
- Bij de verhuisregeling bepaalt Argenta de risicoklasse opnieuw; de tool rekent met de ingevulde rente. Bij tijdelijk twee hypotheken rekent de tool indicatief met het huidige 1-jaarstarief; Argenta gebruikt de rentelijst van de laatste rentevaststelling.
- Het JKP en het verloop gaan uit van een gelijkblijvende rente over de hele looptijd; de overbrugging telt niet mee.
- Notaris-, taxatie- en advieskosten zijn invulbare indicaties; overdrachtsbelasting alleen 2% of 0%.
- De HDN-mapping is leeg; het HDN-schema is alleen voor deelnemers beschikbaar.
