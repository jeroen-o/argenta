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

  // Conceptofferte: 7 pagina's A4 zonder overloop
  const [rapport] = await Promise.all([page.waitForEvent('popup'), page.click('#print')]);
  await rapport.waitForLoadState();
  await rapport.setViewportSize({ width: 900, height: 1200 });
  const paginas = await rapport.$$eval('.pag', e => e.map(x => Math.round(x.scrollHeight / (x.offsetWidth / 210))));
  assert.deepStrictEqual(paginas, [297, 297, 297, 297, 297, 297, 297]);

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
