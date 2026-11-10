/* Robuustheidstest van de rekenkern: 3000 willekeurige aanvragen mogen niet crashen en de uitkomst moet intern kloppen.
   Draai met: node tests/fuzz.js */
const assert = require('assert');
const E = require('../argenta-engine.js');

let seed = 12345;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const kies = a => a[Math.floor(rnd() * a.length)];
const geld = (lo, hi) => Math.round((lo + rnd() * (hi - lo)) / 1000) * 1000;
const kans = p => rnd() < p;
const oordelen = {};
const SOORTEN = Object.keys(E.INKOMEN_SOORTEN);
// willekeurige inkomensbronnen, verblijfsstatus en inkomen na pensionering
const extraAanvrager = () => ({
  verblijf: kies(['nl', 'nl', 'eu', 'onbepaald', 'niettijdelijk', 'tijdelijk']), inkomenNaPensioen: kans(0.2) ? geld(0, 60000) : 0,
  inkomens: kans(0.4) ? Array.from({ length: 1 + Math.floor(rnd() * 3) }, () => ({ soort: kies(SOORTEN), salaris: geld(0, 90000), vakantietoeslag: geld(0, 7000), vast13: geld(0, 5000), variabel: geld(0, 5000),
    bonus1: geld(0, 9000), bonus2: geld(0, 9000), bonus3: geld(0, 9000), bonusPersoonlijk: geld(0, 3000), uren: kies([0, 20, 36, 40, 60]), proeftijdVoorbij: kans(0.9), bedrag: geld(0, 90000),
    jaar1: geld(0, 90000), jaar2: geld(0, 90000), jaar3: geld(0, 90000), huidig: kans(0.3) ? geld(0, 90000) : 0, jaren: kies([0, 2, 5]), ikv: kans(0.5) ? geld(0, 90000) : 0, sociaalMinimum: kies([0, 16000]), vermogen: geld(0, 300000), pct: kies([0, 2.5, 6]) })) : undefined
});

for (let i = 0; i < 3000; i++) {
  const doel = kies(['bestaand', 'bestaand', 'nieuwbouw', 'oversluiten', 'verbouwing', 'uitkoop', 'erfpacht', 'oha']);
  const redelijk = kans(0.5);                        // de helft van de aanvragen is zo gekozen dat ze kunnen passen
  const koopsom = redelijk ? geld(200000, 500000) : geld(80000, 1500000);
  const delen = [];
  const aantal = redelijk ? 1 : 1 + Math.floor(rnd() * 3);
  for (let j = 0; j < aantal; j++) {
    const vorm = redelijk ? kies(['ann', 'lin']) : kies(['ann', 'ann', 'lin', 'av', 'groenAnn', 'groenLin']);
    const groen = vorm.startsWith('groen'), mee = !redelijk && kans(0.2);
    const deel = { vorm, bedrag: aantal === 1 && (redelijk || kans(0.3)) ? null : geld(5000, groen ? 50000 : 800000),
      looptijd: groen && !mee ? kies([5, 10, 15, 20, 25, 30]) : 5 + Math.floor(rnd() * 26),
      rentevast: mee ? 1 + Math.floor(rnd() * 30) : groen ? kies([5, 10, 15, 20, 25, 30]) : kies(['var', 1, 3, 5, 9, 10, 12, 20, 30]),
      consumptief: !groen && vorm !== 'av' && !mee && !redelijk && kans(0.1), meegenomen: mee, rente: mee ? Math.round((1 + rnd() * 5) * 100) / 100 : undefined };
    if (deel.consumptief && deel.rentevast === 'var') deel.rentevast = 10;
    delen.push(deel);
  }
  const inv = {
    woning: { doel, koopsom, marktwaarde: redelijk || kans(0.3) ? null : geld(80000, 1600000), energielabel: kies(E.LABEL_CODES), waardebepaling: kies(['nwwi', 'desktop', 'desktopplus']),
      funderingsrisico: redelijk ? kies([null, 'A', 'C']) : kies([null, 'A', 'C', 'D', 'E']), woningtype: redelijk ? undefined : kies(['standaard', 'standaard', 'bedrijfsruimte', 'woonboerderij', 'kangoeroe', 'uitgesloten']), bedrijfsdeelPct: kies([0, 10, 40]), bestemmingWonen: kans(0.8), koopstarter: kans(0.2), appartement: kans(0.3), nhg: kans(0.3) },
    kosten: { verbouwing: kans(0.3) ? geld(0, 80000) : 0, energiemaatregelen: kans(0.3) ? geld(0, 30000) : 0, overdrachtsbelastingPct: kies([0, 2]), notarisLevering: 650, notarisHypotheek: 650, taxatie: 500, advies: 2500,
      eigenGeld: redelijk || kans(0.4) ? null : geld(0, 200000), overig: kans(0.3) ? [{ omschrijving: 'Kostenpost', bedrag: geld(0, 5000), kredietkosten: kans(0.5) }] : undefined },
    aanvragers: kans(0.5) ? [Object.assign({ geboortedatum: redelijk ? '1985-05-05' : kies(['1960-01-01', '2012-01-01', '1985-05-05']), toetsinkomen: redelijk ? geld(90000, 200000) : geld(0, 150000) }, redelijk ? {} : extraAanvrager())]
      : [{ geboortedatum: '1985-05-05', toetsinkomen: redelijk ? geld(60000, 150000) : geld(0, 150000) }, Object.assign({ geboortedatum: redelijk ? '1990-01-01' : kies(['1958-01-01', '1990-01-01']), toetsinkomen: geld(0, 90000) }, redelijk ? {} : extraAanvrager())],
    klant: redelijk ? undefined : { familieverband: kans(0.05), borgstelling: kans(0.05), bewind: kans(0.05), abcConstructie: kans(0.05) },
    inkomen: { aftrekPerJaar: kans(0.2) ? geld(0, 12000) : 0, verplichtingenPerMaand: kans(0.3) ? 200 : 0, studieleningPerMaand: kans(0.3) ? 100 : 0, toetsrenteKort: kies([undefined, 5, 5.5]),
      aowGerechtigd: kans(0.2), alleenstaand: kans(0.3), regeling: redelijk ? 'geen' : kies(['geen', 'geen', 'aow', 'senioren', 'tekort']), regelingInkomen: geld(0, 80000), huidigeMaandlast: 1500 },
    leningdelen: delen,
    erfpacht: !redelijk && kans(0.2) ? { uitgever: kies(['overheid', 'particulier']), vestiging: kies(['voor2013', '2013', 'na2014']), opinie: kies(['groen', 'oranje', 'rood', 'geen']), resterendeDuur: kies([0, 15, 40]), canonPerJaar: 1800 } : null,
    vve: kans(0.5) ? { aanwezig: kies(['ja', 'oprichting', 'nee']), actief: kans(0.5), onderhoudGoed: kans(0.5), mjopVoldoende: kans(0.5), fondsenToereikend: kans(0.5) } : null,
    overbrugging: !redelijk && kans(0.2) ? { situatie: kies(['a', 'b', 'c', 'd']), waarde: geld(100000, 600000), restschuld: geld(0, 300000), bedrag: geld(0, 200000), maandlastHuidig: kans(0.7) ? 900 : 0, maanden: kies([6, 12, 24, 40]), eigenMiddelen: geld(0, 30000) } : null,
    oha: doel === 'oha' ? { zonderWerk: kans(0.3), achterstand: kans(0.1), oorspronkelijkeMarktwaarde: geld(0, 600000), kinderen: kies([0, 2, 5]), vermogen: kans(0.3) ? 50000 : 0, wozWaarde: 300000,
      dienstverbandEindigt: kans(0.2), jaarinkomens: [40000, 38000, 0], inkomenNaPensioen: kans(0.2) ? 30000 : 0, nettoInkomenPerMaand: kans(0.3) ? 3000 : 0, basisuitgavenPerMaand: 1500 } : null,
    bkr: { status: redelijk ? 'schoon' : kies(['onbekend', 'schoon', 'negatief', 'hy2', 'hy', 'herstelA2', 'herstelA0']), aantalContracten: kies([0, 3, 9, 16]), loonbeslag: !redelijk && kans(0.05) }
  };
  const r = E.resultaat(inv);                         // mag niet crashen
  const context = 'aanvraag ' + i + ': ' + JSON.stringify(inv).slice(0, 400);
  oordelen[r.oordeel] = (oordelen[r.oordeel] || 0) + 1;
  assert.notStrictEqual(r.oordeel, 'ongeldige_invoer', context);
  assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(r)), 'NaN of undefined in de uitvoer; ' + context);
  assert.strictEqual(r.oordeel === 'past_niet', r.afwijzingen.length > 0, context);
  if (r.oordeel === 'voorbehoud') assert.ok(r.voorbehoud.length > 0, context);
  const som = r.leningdelen.reduce((s, d) => s + d.bedrag, 0);
  assert.ok(Math.abs(som - r.totalen.hoofdsom) <= 1, 'hoofdsom is de som van de leningdelen; ' + context);
  assert.ok(r.kosten.teFinancieren >= 0 && r.kosten.eigenGeld >= 0, context);
  if (r.totalen.marktwaarde > 0) assert.ok(Math.abs(r.totalen.ltvPct - r.totalen.hoofdsom / r.totalen.marktwaarde * 100) < 0.02, context);
  if (r.totalen.hoofdsom > 0 && r.leningdelen.every(d => d.rentePct > 0)) {
    const afl = r.verloop.reduce((s, j) => s + j.aflossing, 0), rente = r.verloop.reduce((s, j) => s + j.rente, 0);
    assert.ok(Math.abs(afl - r.totalen.hoofdsom) <= 40, 'het verloop lost de hele hoofdsom af; ' + context);
    assert.ok(Math.abs(rente - r.totalen.renteTotaal) <= 40, 'rente in het verloop is gelijk aan de totale rente; ' + context);
    assert.ok(r.verloop[r.verloop.length - 1].restschuld <= 1, 'restschuld is 0 aan het einde; ' + context);
    assert.ok(Math.abs(r.totalen.totaalTeBetalen - (r.totalen.hoofdsom + r.totalen.renteTotaal + r.totalen.kredietKosten)) <= 2, context);
    const laagste = Math.min(...r.leningdelen.map(d => d.rentePct));
    assert.ok(r.totalen.jkpPct >= laagste - 0.01, 'het JKP is niet lager dan de laagste rente; ' + context);
  }
}
assert.ok(oordelen.past > 50 && oordelen.past_niet > 50, 'de test raakt zowel passende als niet-passende aanvragen: ' + JSON.stringify(oordelen));
console.log('Robuustheidstest geslaagd: 3000 aanvragen', JSON.stringify(oordelen));
