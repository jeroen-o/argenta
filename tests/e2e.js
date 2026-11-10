/* Browsertest van de rekentool. Draai met: node tests/e2e.js  (vereist het pakket playwright met Chromium) */
const assert = require('assert');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const fouten = [];
  page.on('pageerror', e => fouten.push(e.message));
  page.on('dialog', d => d.accept());
  await page.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  const tekst = sel => page.$eval(sel, e => e.innerText);
  const stap = n => page.click('[data-naar="' + n + '"]');

  // Stap 1 en 2: standaardaanvraag, eigen geld wordt automatisch ingevuld
  await page.fill('#klant1', 'Test Aanvrager');
  await stap(2);
  assert.ok((await tekst('#boom2')).replace(/\s+/g, ' ').includes('Te financieren € 400.000'));
  assert.strictEqual(await page.inputValue('#eigenGeld'), '12.300');

  // Vrije kostenpost: telt mee in de totale kosten en verhoogt het automatisch ingevulde eigen geld
  await page.click('#voegKosten');
  await page.locator('.kostenrij [data-kveld=omschrijving]').fill('Bouwkundige keuring');
  await page.locator('.kostenrij [data-kveld=bedrag]').fill('600');
  assert.ok((await tekst('#boom2')).replace(/\s+/g, ' ').includes('Bouwkundige keuring € 600'));
  assert.strictEqual(await page.inputValue('#eigenGeld'), '12.900');
  await page.click('.kostenrij [data-kweg]');
  assert.strictEqual(await page.inputValue('#eigenGeld'), '12.300');

  // Stap 3: inkomen, rente uit de tariefkaart, JKP
  await stap(3);
  await page.fill('#ink1', '95000');
  assert.ok((await tekst('#resRijen3')).includes('Annuïtair'));
  assert.ok((await tekst('#kvMaand')).includes('Jaarlijks kostenpercentage (JKP)'));

  // Stap 4: oordeel, voorwaarden en tips
  await stap(4);
  assert.ok((await tekst('#oordeelBlok')).includes('Past binnen de regels van Argenta'));
  assert.ok((await tekst('#oordeelBlok')).includes('marktwaarde volgens het taxatierapport is minimaal € 400.000'));
  assert.ok((await page.$$('#tipsBlok li')).length > 0, 'er worden tips getoond');

  // Afwijzing: negatieve BKR
  await stap(3);
  await page.selectOption('#bkrStatus', 'negatief');
  await stap(4);
  assert.ok((await tekst('#oordeelBlok')).includes('Past niet'));
  await stap(3);
  await page.selectOption('#bkrStatus', 'schoon');

  // Meegenomen leningdeel: resterende rentevaste periode korter dan 10 jaar wordt op de toetsrente getoetst
  await page.click('#voegToe');
  await page.locator('.deel').nth(0).locator('[data-veld=bedrag]').fill('200000');
  await page.locator('.deel').nth(0).locator('[data-veld=meegenomen]').check();
  await page.locator('.deel').nth(0).locator('[data-veld=rente]').fill('2,10');
  await page.locator('.deel').nth(0).locator('[data-veld=rvp]').selectOption('5');
  await page.locator('.deel').nth(1).locator('[data-veld=bedrag]').fill('200000');
  await stap(4);
  const rijen = (await tekst('#resRijen')).replace(/\s+/g, ' ');
  assert.ok(rijen.includes('Annuïtair (meegenomen) € 200.000') && rijen.includes('2,10%'), rijen);
  assert.ok((await tekst('#inkomenBlok')).includes('korter dan 10 jaar, getoetst op de toetsrente van 5,00%'));

  // Inkomensbepaling: bronnen bepalen het toetsinkomen; flexibel inkomen telt alleen naast een hoger vast inkomen
  await stap(3);
  await page.click('#bronnenBlok summary');
  await page.click('#voegBron1');
  await page.locator('#bronnen1 [data-bveld=salaris]').fill('80000');
  await page.locator('#bronnen1 [data-bveld=vakantietoeslag]').fill('6400');
  assert.strictEqual(await page.inputValue('#ink1'), '86.400');
  assert.ok(await page.locator('#ink1').evaluate(el => el.readOnly));
  await page.click('#voegBron2');
  await page.locator('#bronnen2 [data-bveld=soort]').selectOption('flex');
  for (const [veld, waarde] of [['jaar1', '30000'], ['jaar2', '36000'], ['jaar3', '24000']]) await page.locator('#bronnen2 [data-bveld=' + veld + ']').fill(waarde);
  assert.strictEqual(await page.inputValue('#ink2'), '30.000');
  await stap(4);
  assert.ok((await tekst('#inkomenBlok')).includes('Inkomensbepaling'));
  assert.ok((await page.$eval('#documentenBlok', el => el.textContent)).includes('Jaaropgaven van de afgelopen 3 kalenderjaren'));
  await stap(3);
  await page.click('#bronnen2 [data-bweg]');
  await page.click('#bronnen1 [data-bweg]');
  assert.ok(!(await page.locator('#ink1').evaluate(el => el.readOnly)));
  await page.fill('#ink1', '95000');
  await page.fill('#ink2', '');

  // Kredieten: de tool berekent de maandlast per krediet (2% van de limiet)
  await stap(3);
  await page.click('#voegKrediet');
  await page.locator('.krediet [data-crveld=limiet]').fill('10000');
  assert.ok((await tekst('#kredietUit')).replace(/\s+/g, ' ').includes('Totaal kredieten per maand € 200,00'));
  await page.click('.krediet [data-crweg]');

  // Verhoging: het blok verschijnt bij het doel verbouwing / verhoging
  await stap(1);
  await page.selectOption('#doel', 'verbouwing');
  await stap(3);
  assert.ok(await page.isVisible('#verhogingBlok'));
  await stap(1);
  await page.selectOption('#doel', 'bestaand');

  // Nieuwbouw: het blok verschijnt, meerwerk telt mee in de kosten en zelfbouw geeft een afwijzing
  await page.selectOption('#doel', 'nieuwbouw');
  assert.ok(await page.isVisible('#nieuwbouwVelden'));
  await page.fill('#nbMeerwerk', '15000');
  await stap(2);
  assert.ok((await tekst('#boom2')).replace(/\s+/g, ' ').includes('aansluitkosten € 15.000'));
  await stap(1);
  await page.selectOption('#nbBouwwijze', 'zelfbouw');
  await stap(4);
  assert.ok((await tekst('#meldingen')).includes('zelf bouwen zonder aannemer'));
  await stap(1);
  await page.selectOption('#nbBouwwijze', 'project');
  await page.fill('#nbMeerwerk', '');
  await page.selectOption('#doel', 'bestaand');

  // Tijdelijk twee hypotheken: de oude lening gaat naar het 1-jaarstarief
  await stap(3);
  await page.check('#tweeHyp');
  await page.fill('#thRestschuld', '150000');
  await page.fill('#thWaarde', '300000');
  await stap(4);
  assert.ok((await tekst('#inkomenBlok')).includes('Tijdelijk twee hypotheken'));
  await stap(3);
  await page.uncheck('#tweeHyp');
  await stap(1);

  // Bouwkundig rapport: herstelkosten boven 10% van de marktwaarde die niet in depot staan geven een afwijzing
  await page.fill('#herstelkosten', '60000');
  await stap(4);
  assert.ok((await tekst('#meldingen')).includes('Bouwkundig rapport'));
  await stap(1);
  await page.fill('#herstelkosten', '');

  // Woningtype en aanvrager: een uitgesloten woningtype en een tijdelijk verblijfsdoel geven een afwijzing
  await stap(1);
  await page.selectOption('#woningtype', 'uitgesloten');
  await stap(4);
  assert.ok((await tekst('#meldingen')).includes('Woningtype'));
  await stap(1);
  await page.selectOption('#woningtype', 'standaard');
  await page.selectOption('#verblijf1', 'tijdelijk');
  await stap(4);
  assert.ok((await tekst('#meldingen')).includes('tijdelijk verblijfsdoel'));
  await stap(1);
  await page.selectOption('#verblijf1', 'nl');

  // Ontslag hoofdelijke aansprakelijkheid: het OHA-blok verschijnt en de toets wordt getoond
  await stap(1);
  await page.selectOption('#doel', 'oha');
  await stap(3);
  assert.ok(await page.isVisible('#ohaBlok'));
  assert.ok((await page.locator('.deel').nth(0).innerText()).includes('Bestaand leningdeel'));
  await stap(4);
  assert.ok((await tekst('#inkomenBlok')).includes('OHA'));
  await stap(1);
  await page.selectOption('#doel', 'bestaand');
  await stap(4);

  // Conceptofferte: 9 pagina's A4 zonder overloop
  const [rapport] = await Promise.all([page.waitForEvent('popup'), page.click('#print')]);
  await rapport.waitForLoadState();
  await rapport.setViewportSize({ width: 900, height: 1200 });
  const paginas = await rapport.$$eval('.pag', e => e.map(x => Math.round(x.scrollHeight / (x.offsetWidth / 210))));
  assert.deepStrictEqual(paginas, [297, 297, 297, 297, 297, 297, 297, 297, 297]);

  // Mobiele breedte: geen horizontale scroll
  await page.setViewportSize({ width: 390, height: 800 });
  for (const n of [1, 2, 3, 4]) {
    await stap(n);
    assert.strictEqual(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0, 'stap ' + n + ' past op mobiel');
  }

  // Handleiding laadt zonder fouten
  await page.goto('file://' + path.resolve(__dirname, '..', 'handleiding.html'));
  assert.ok((await tekst('h1')).includes('Handleiding'));

  assert.deepStrictEqual(fouten, []);
  await browser.close();
  console.log('Browsertest geslaagd');
})().catch(e => { console.error(e); process.exit(1); });
