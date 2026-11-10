/* Draai met: node tests/test.js  (na python3 tools/export_engine.py) */
const assert = require('assert');
const E = require('../argenta-engine.js');
const H = require('../hdn-adapter.js');
const basis = () => JSON.parse(JSON.stringify(require('../voorbeelden/aanvraag.json')));

// 1. Nibud-rekenhulp 2027: € 75.000 inkomen, toetsrente 4,25% -> 25,9% en € 329.054 (label E/F/G, geen extra's)
let inv = basis();
inv.woning.energielabel = 'E_F_G'; inv.aanvragers = [{ toetsinkomen: 75000 }]; inv.inkomen.studieleningPerMaand = 0; inv.inkomen.toetsrenteKort = 4.25;
inv.leningdelen = [{ vorm: 'ann', bedrag: 300000, looptijd: 30, rentevast: 1 }];
let r = E.resultaat(inv);
assert.strictEqual(r.inkomenstoets.financieringslastPct, 25.9);
assert.strictEqual(r.inkomenstoets.maximaleHypotheek, 329054);

// 2. Voorbeeldaanvraag past; rente uit de tariefkaart met duurzaamheidskorting
r = E.resultaat(basis());
assert.strictEqual(r.oordeel, 'past');
assert.strictEqual(r.leningdelen[0].rentePct, 4.52);
assert.strictEqual(r.grenzen.minimaleMarktwaarde, 380000);
assert.ok(r.grenzen.minimaalToetsinkomen > 80000 && r.grenzen.minimaalToetsinkomen < 90000);

// 3. Harde afwijzingen
inv = basis(); inv.bkr.status = 'negatief'; assert.strictEqual(E.resultaat(inv).oordeel, 'past_niet');
inv = basis(); inv.woning.marktwaarde = 370000; assert.strictEqual(E.resultaat(inv).oordeel, 'past_niet');
inv = basis(); inv.woning.koopstarter = true; inv.leningdelen = [{ vorm: 'ann', bedrag: 300000, looptijd: 30, rentevast: 10 }, { vorm: 'av', bedrag: 80000, looptijd: 30, rentevast: 10 }];
assert.strictEqual(E.resultaat(inv).oordeel, 'past_niet');

// 4. Voorbehoud: funderingsrisico D, veel BKR-contracten
inv = basis(); inv.woning.funderingsrisico = 'D'; assert.strictEqual(E.resultaat(inv).oordeel, 'voorbehoud');
inv = basis(); inv.bkr.aantalContracten = 16; assert.strictEqual(E.resultaat(inv).oordeel, 'voorbehoud');

// 5. NHG-grens 2027
inv = basis(); inv.woning.nhg = true; inv.woning.koopsom = 560000; inv.woning.marktwaarde = 560000; inv.kosten.eigenGeld = 20000;
inv.leningdelen = [{ vorm: 'ann', bedrag: 540000, looptijd: 30, rentevast: 10 }]; inv.aanvragers = [{ toetsinkomen: 200000 }];
assert.ok(E.resultaat(inv).afwijzingen.some(t => /530\.000/.test(t)));

// 6. Ongeldige invoer
assert.strictEqual(E.resultaat({ leningdelen: [{ vorm: 'spaar' }] }).oordeel, 'ongeldige_invoer');

// 7. HDN-adapter: mechanisme getest met een verzonnen bericht (geen echte HDN-elementnamen)
const xml = `<?xml version="1.0"?><ns:Bericht xmlns:ns="x"><ns:Pand><ns:Prijs>400000.00</ns:Prijs><ns:Label>01</ns:Label></ns:Pand>
  <ns:Persoon><ns:Geb>1988-04-12T00:00:00</ns:Geb><ns:Ink>62000</ns:Ink></ns:Persoon><ns:Persoon><ns:Ink>41000</ns:Ink></ns:Persoon>
  <ns:Deel><ns:Soort>A</ns:Soort><ns:Som>380000</ns:Som><ns:Mnd>360</ns:Mnd><ns:Rvp>120</ns:Rvp></ns:Deel></ns:Bericht>`;
const mapping = { velden: { 'woning.koopsom': { pad: 'Bericht/Pand/Prijs', type: 'bedrag', verplicht: true }, 'woning.energielabel': { pad: '//Label', codes: { '01': 'A' }, standaard: 'GEEN' }, 'woning.nhg': { pad: '', type: 'janee', standaard: false } },
  lijsten: { aanvragers: { pad: 'Bericht/Persoon', velden: { geboortedatum: { pad: 'Geb', type: 'datum' }, toetsinkomen: { pad: 'Ink', type: 'bedrag', verplicht: true } } },
    leningdelen: { pad: '//Deel', velden: { vorm: { pad: 'Soort', codes: { A: 'ann' }, verplicht: true }, bedrag: { pad: 'Som', type: 'bedrag' }, looptijd: { pad: 'Mnd', type: 'getal', factor: 1 / 12 }, rentevast: { pad: 'Rvp', type: 'getal', factor: 1 / 12 } } } } };
const uit = H.vanHdn(xml, mapping);
assert.deepStrictEqual(uit.ontbrekend, []);
assert.strictEqual(uit.invoer.woning.koopsom, 400000);
assert.strictEqual(uit.invoer.aanvragers.length, 2);
assert.strictEqual(uit.invoer.aanvragers[0].geboortedatum, '1988-04-12');
assert.strictEqual(uit.invoer.leningdelen[0].looptijd, 30);
assert.strictEqual(uit.invoer.leningdelen[0].rentevast, 10);
assert.strictEqual(E.resultaat(uit.invoer).leningdelen[0].rentePct, 4.52);
const leeg = H.vanHdn(xml, require('../hdn-mapping.json'));
assert.ok(leeg.ontbrekend.length > 3, 'lege mapping meldt ontbrekende paden');

console.log('Alle tests geslaagd');
