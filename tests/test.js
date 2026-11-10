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

// 8. Verhuisregeling: meegenomen leningdeel houdt de eigen rente; toetsrente hangt af van de resterende rentevaste periode
inv = basis(); inv.leningdelen = [{ vorm: 'ann', bedrag: 200000, looptijd: 22, rentevast: 12, meegenomen: true, rente: 2.1 }, { vorm: 'ann', bedrag: 180000, looptijd: 30, rentevast: 10 }];
r = E.resultaat(inv);
assert.strictEqual(r.leningdelen[0].rentePct, 2.1);
const toetsLang = r.inkomenstoets.toetsrentePct;
inv.leningdelen[0].rentevast = 5;
r = E.resultaat(inv);
assert.ok(r.inkomenstoets.toetsrentePct > toetsLang, 'korter dan 10 jaar: toets op de AFM-toetsrente');
inv.leningdelen[0].rente = 0;
assert.strictEqual(E.resultaat(inv).oordeel, 'past_niet');

// 9. Tariefbewaking: na 14 dagen geldt de tariefkaart als verouderd
const kaart = E.RATES.datumVastIso;
const plus = d => new Date(new Date(kaart + 'T00:00:00').getTime() + d * 864e5).toISOString().slice(0, 10);
assert.strictEqual(E.tariefStatus(plus(14)).verouderd, false);
assert.strictEqual(E.tariefStatus(plus(16)).verouderd, true);

// 10. Toetsrente is per aanvraag aan te passen
inv = basis(); inv.leningdelen = [{ vorm: 'ann', bedrag: 380000, looptijd: 30, rentevast: 5 }];
inv.inkomen.toetsrenteKort = 5; const max5 = E.resultaat(inv).inkomenstoets.maximaleHypotheek;
inv.inkomen.toetsrenteKort = 5.5; assert.ok(E.resultaat(inv).inkomenstoets.maximaleHypotheek < max5);

// 11. Vrije kostenposten tellen mee in de totale kosten; alleen kredietkosten tellen mee in het JKP
inv = basis(); const jkp0 = E.resultaat(inv);
inv.kosten.overig = [{ omschrijving: 'Bouwkundige keuring', bedrag: 600 }];
r = E.resultaat(inv);
assert.strictEqual(r.kosten.totaal, jkp0.kosten.totaal + 600);
assert.strictEqual(r.totalen.jkpPct, jkp0.totalen.jkpPct);
inv.kosten.overig = [{ omschrijving: 'Afsluitkosten', bedrag: 4000, kredietkosten: true }];
r = E.resultaat(inv);
assert.ok(r.totalen.jkpPct > jkp0.totalen.jkpPct);
assert.strictEqual(r.totalen.kredietKosten, jkp0.totalen.kredietKosten + 4000);

// 12. Ontslag hoofdelijke aansprakelijkheid: eerst de reguliere leennorm, dan de beheertoets NHG op werkelijke lasten
const ohaInv = ink => ({ woning: { doel: 'oha', koopsom: 300000, marktwaarde: 420000, energielabel: 'C_D' },
  kosten: { notarisLevering: 900, notarisHypotheek: 0, taxatie: 600, advies: 1500, eigenGeld: 3000 }, aanvragers: [{ geboortedatum: '1984-02-01', toetsinkomen: ink }], inkomen: { alleenstaand: true },
  leningdelen: [{ vorm: 'ann', bedrag: 220000, looptijd: 23, rentevast: 6, meegenomen: true, rente: 1.9 }, { vorm: 'ann', bedrag: 80000, looptijd: 30, rentevast: 10 }],
  oha: { oorspronkelijkeMarktwaarde: 380000 }, bkr: { status: 'schoon' } });
r = E.resultaat(ohaInv(110000)); assert.strictEqual(r.oordeel, 'past');                      // past binnen de reguliere norm
r = E.resultaat(ohaInv(70000)); assert.strictEqual(r.oordeel, 'voorbehoud');                 // alleen via de beheertoets
assert.strictEqual(r.beheertoets.tabel, 'alleenstaand'); assert.ok(r.beheertoets.ruimte > 0);
assert.strictEqual(r.beheertoets.financieringslastPct, E.BEHEER.alleen.regulier.pct[70 - 31][3] / 10);   // toetsrente 2,6% valt in de kolom 2,501-3,000%
r = E.resultaat(ohaInv(38000)); assert.strictEqual(r.oordeel, 'voorbehoud');                 // alleen met de laagst mogelijke last (beheertoets D.6.5)
assert.ok(r.beheertoets.ruimte < 0 && r.beheertoets.ruimteLaagsteLast >= 0);
r = E.resultaat(ohaInv(30000)); assert.strictEqual(r.oordeel, 'past_niet');                  // ook de beheertoets niet
inv = ohaInv(70000); inv.oha.dienstverbandEindigt = true; inv.oha.jaarinkomens = [40000, 44000, 36000];
assert.strictEqual(E.resultaat(inv).beheertoets.toetsinkomen, 40000);                        // gemiddelde van 3 jaar, of het laatste jaar als dat hoger is
inv.oha.jaarinkomens = [50000, 44000, 36000]; assert.strictEqual(E.resultaat(inv).beheertoets.toetsinkomen, 50000);
inv = ohaInv(48000); inv.oha.vermogen = 60000; inv.oha.wozWaarde = 400000;
assert.strictEqual(E.resultaat(inv).beheertoets.vermogenInMindering, 60000 - 6800 - 3550);   // 1,7% van de WOZ-waarde en 3.550 per consument vrijgesteld
inv = ohaInv(70000); inv.oha.nettoInkomenPerMaand = 3900; inv.oha.basisuitgavenPerMaand = 1700; inv.oha.overigeLastenPerMaand = 300;
assert.ok(E.resultaat(inv).beheertoets.budgettoets.ruimte > 0);

// 13. Looptijd korter dan 30 jaar: annuïtaire toetslast over de werkelijke looptijd (NHG C.7.2.3)
inv = basis(); const max30 = E.resultaat(inv).inkomenstoets.maximaleHypotheek;
inv.leningdelen[0].looptijd = 20; assert.ok(E.resultaat(inv).inkomenstoets.maximaleHypotheek < max30);
inv = ohaInv(110000); inv.oha.achterstand = true; assert.strictEqual(E.resultaat(inv).oordeel, 'past_niet');
inv = ohaInv(110000); inv.leningdelen.push({ vorm: 'av', bedrag: 200000, looptijd: 30, rentevast: 10 }); inv.woning.koopsom = 500000; inv.woning.marktwaarde = 600000;
assert.ok(E.resultaat(inv).afwijzingen.some(t => t.includes('50% van de oorspronkelijke marktwaarde')));   // 200.000 > 50% van 380.000

// 14. Inkomensbepaling volgens hoofdstuk 5 van de hypotheekgids
const metBronnen = (a, nhg) => ({ woning: { doel: 'bestaand', koopsom: 350000, marktwaarde: 350000, energielabel: 'C_D', nhg: !!nhg }, kosten: { eigenGeld: 30000, overdrachtsbelastingPct: 0 }, aanvragers: a, inkomen: {},
  leningdelen: [{ vorm: 'ann', bedrag: 320000, looptijd: 30, rentevast: 10 }], bkr: { status: 'schoon' } });
const toetsVan = (a, nhg) => E.resultaat(metBronnen(a, nhg)).inkomensbepaling.map(b => b.toetsinkomen);
// vast: salaris, vakantietoeslag, 13e maand, toeslagen; bedrijfsbonus gemiddeld over 3 jaar met maximaal het laatste jaar; persoonlijke bonus laatste 12 maanden
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 60000, vakantietoeslag: 4800, vast13: 5000, variabel: 2000, bonus1: 6000, bonus2: 9000, bonus3: 3000, bonusPersoonlijk: 1000 }] }]), [78800, 0]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 60000, vakantietoeslag: 4800, bonus1: 6000, bonus2: 9000, bonus3: 3000 }] }], true), [64800, 0]);   // met NHG geen bonus
// flexibel: gemiddelde van 3 jaar, maximaal het laatste jaar; zonder NHG alleen naast een hoger vast inkomen van de andere aanvrager
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'flex', jaar1: 50000, jaar2: 60000, jaar3: 55000 }] }]), [0, 0]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 70000 }] }, { inkomens: [{ soort: 'flex', jaar1: 30000, jaar2: 36000, jaar3: 24000 }] }]), [70000, 30000]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 20000 }] }, { inkomens: [{ soort: 'flex', jaar1: 60000, jaar2: 60000, jaar3: 60000 }] }]), [20000, 0]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'flex', jaar1: 50000, jaar2: 60000, jaar3: 55000 }] }], true), [50000, 0]);                                        // met NHG telt het mee
// maximaal 50 uur: 40 + 20 uur, het kleinste dienstverband telt voor de helft
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 60000, uren: 40 }, { soort: 'vast', salaris: 20000, uren: 20 }] }]), [70000, 0]);
// ondernemer: 1 tot 3 jaar alleen met NHG en IKV; langer dan 3 jaar zonder NHG ook op cijfers
assert.strictEqual(E.resultaat(metBronnen([{ inkomens: [{ soort: 'onderneming', jaren: 2, ikv: 80000 }] }])).oordeel, 'past_niet');
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'onderneming', jaren: 2, ikv: 80000 }] }], true), [80000, 0]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'onderneming', jaren: 5, jaar1: 90000, jaar2: 80000, jaar3: 100000 }] }]), [90000, 0]);
// vermogen: percentage CHF, maximaal de leningrente; niet-blijvende uitkering als enig inkomen: sociaal minimum
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 80000 }, { soort: 'vermogen', vermogen: 200000, pct: 3 }] }]), [86000, 0]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'uitkeringTijdelijk', bedrag: 30000, sociaalMinimum: 16000 }] }]), [16000, 0]);
// toekomstig pensioen binnen 10 jaar: toets ook op het inkomen na pensionering; niet ingevuld geeft een voorbehoud
r = E.resultaat(metBronnen([{ geboortedatum: '1962-01-01', inkomens: [{ soort: 'vast', salaris: 95000 }], inkomenNaPensioen: 45000 }]));
assert.strictEqual(r.oordeel, 'past_niet'); assert.ok(r.afwijzingen.some(t => t.includes('Toekomstig pensioen')));
inv = metBronnen([{ geboortedatum: '1962-01-01', toetsinkomen: 95000 }]); inv.peildatum = '2026-11-10';
assert.strictEqual(E.resultaat(inv).oordeel, 'voorbehoud');

// 15. Aanvrager en woningtype
const type = extra => { const i = basis(); Object.assign(i.woning, extra.woning || {}); if (extra.klant) i.klant = extra.klant; if (extra.verblijf) i.aanvragers[0].verblijf = extra.verblijf; return E.resultaat(i); };
assert.strictEqual(type({ woning: { woningtype: 'uitgesloten' } }).oordeel, 'past_niet');
assert.strictEqual(type({ woning: { woningtype: 'bedrijfsruimte', bedrijfsdeelPct: 30 } }).oordeel, 'past_niet');
assert.strictEqual(type({ woning: { woningtype: 'bedrijfsruimte', bedrijfsdeelPct: 20 } }).oordeel, 'past');
assert.strictEqual(type({ woning: { woningtype: 'kangoeroe' } }).oordeel, 'past');
assert.strictEqual(type({ woning: { woningtype: 'woonboerderij', bestemmingWonen: false } }).oordeel, 'past_niet');
assert.strictEqual(type({ verblijf: 'tijdelijk' }).oordeel, 'past_niet');
assert.strictEqual(type({ verblijf: 'niettijdelijk' }).oordeel, 'voorbehoud');
assert.strictEqual(type({ klant: { familieverband: true } }).oordeel, 'past_niet');
assert.strictEqual(type({ klant: { abcConstructie: true } }).oordeel, 'voorbehoud');

// 16. Documentenlijst volgt het dossier
r = E.resultaat(basis());
assert.ok(r.documenten.some(d => d.groep === 'Algemeen') && r.documenten.some(d => d.groep === 'Eigen middelen'));
assert.ok(r.documenten.find(d => d.groep === 'Financiële verplichtingen').items.some(t => t.includes('DUO')));
r = E.resultaat(metBronnen([{ inkomens: [{ soort: 'onderneming', jaren: 5, ikv: 90000 }] }]));
assert.ok(r.documenten.find(d => d.groep === 'Inkomen').items.some(t => t.includes('Inkomensverklaring Ondernemer')));

// 17. Lasten per krediet (hypotheekgids 6.3)
inv = basis(); inv.inkomen.studieleningPerMaand = 0;
inv.inkomen.kredieten = [{ soort: 'RK', limiet: 10000 }, { soort: 'AK', bedrag: 12000, looptijdMaanden: 60 }, { soort: 'overig', maandbedrag: 150 }, { soort: 'ZK', maandbedrag: 900 }, { soort: 'VK', limiet: 5000, aflossen: true }];
r = E.resultaat(inv);
assert.deepStrictEqual(r.verplichtingen.perKrediet.map(k => k.maandlast), [200, 200, 150, 0, 0]);   // 2% van de limiet; bedrag / looptijd; werkelijk; zakelijk en af te lossen tellen niet
assert.strictEqual(r.verplichtingen.totaalPerMaand, 550);
assert.ok(r.inkomenstoets.maximaleHypotheek < jkp0.inkomenstoets.maximaleHypotheek);

// 18. Buitenlands belastingplichtig: de tabel voor niet-aftrekbare leningen (lagere leenruimte)
inv = basis(); const maxNl = E.resultaat(inv).inkomenstoets;
inv.inkomen.buitenlandsBelastingplichtig = true; r = E.resultaat(inv);
assert.ok(r.inkomenstoets.financieringslastPct < maxNl.financieringslastPct && r.inkomenstoets.maximaleHypotheek < maxNl.maximaleHypotheek);
assert.strictEqual(r.inkomenstoets.financieringslastPct, E.NORMEN.box3nietAOW[103 - 31][7] / 10);    // inkomen 103.000, toetsrente 4,52% valt in de kolom 4,501-5,000%

// 19. Verhoging of tweede hypotheek (hypotheekgids 1.2.4)
const verhoging = (nieuw, extra) => ({ woning: { doel: 'verbouwing', koopsom: 200000, marktwaarde: 400000, energielabel: 'C_D' }, kosten: { verbouwing: nieuw, notarisLevering: 0, notarisHypotheek: 0, taxatie: 0, advies: 0, eigenGeld: 0 },
  aanvragers: [{ toetsinkomen: 90000 }], inkomen: {}, leningdelen: [{ vorm: 'ann', bedrag: 200000, looptijd: 22, rentevast: 8, meegenomen: true, rente: 2.4 }, { vorm: 'ann', bedrag: nieuw, looptijd: 30, rentevast: 10 }],
  verhoging: Object.assign({ soort: 'onderhands', bestaandBijArgenta: true }, extra || {}), bkr: { status: 'schoon' } });
assert.strictEqual(E.resultaat(verhoging(20000)).oordeel, 'past');                                  // 20.000 mag: het minimum van 25.000 geldt niet voor een verhoging
assert.strictEqual(E.resultaat(verhoging(4000)).oordeel, 'past_niet');                              // onder het minimum van 5.000
assert.strictEqual(E.resultaat(verhoging(20000, { bestaandBijArgenta: false })).oordeel, 'past_niet');
assert.strictEqual(E.resultaat(verhoging(20000, { achterstand: true })).oordeel, 'past_niet');
assert.strictEqual(E.resultaat(verhoging(20000, { achterstandLaatste12Maanden: true })).oordeel, 'voorbehoud');

// 20. Bouwkundig rapport (hypotheekgids 2.1.4 en 2.1.5): verplicht boven 10% van de marktwaarde; herstelkosten in depot
inv = basis(); inv.woning.herstelkosten = 30000; assert.strictEqual(E.resultaat(inv).bijzondereToetsen.find(b => b.naam === 'Bouwkundig rapport').uitkomst, 'akkoord');
inv.woning.herstelkosten = 50000; assert.strictEqual(E.resultaat(inv).oordeel, 'past_niet');        // 50.000 > 10% van 400.000 en niet in depot
inv.kosten.verbouwing = 50000; inv.kosten.eigenGeld = 82300; r = E.resultaat(inv);
assert.strictEqual(r.oordeel, 'voorbehoud'); assert.ok(r.documenten.some(d => d.items.some(t => t.includes('Bouwkundig rapport'))));

// 21. Toekomstig inkomen (hypotheekgids 5.2.3): verhoging of dienstverband binnen 6 maanden telt mee
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 70000, verhoging: 5000, verhogingMaanden: 4 }] }]), [75000, 0]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 70000, verhoging: 5000, verhogingMaanden: 9 }] }]), [70000, 0]);
assert.deepStrictEqual(toetsVan([{ inkomens: [{ soort: 'vast', salaris: 70000, toekomstig: true, startMaanden: 3 }] }]), [70000, 0]);
assert.strictEqual(E.resultaat(metBronnen([{ inkomens: [{ soort: 'vast', salaris: 90000, toekomstig: true, startMaanden: 8 }] }])).oordeel, 'past_niet');

console.log('Alle tests geslaagd');
