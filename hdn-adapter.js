/* HDN-adapter: zet een HDN-aanvraagbericht (XML) om naar de invoer van ArgentaEngine.
 *
 * De adapter kent zelf geen HDN-elementnamen. Welke elementen bij welk invoerveld horen staat in een
 * mapping (zie hdn-mapping.json). Vul daar de paden en codelijsten in uit het HDN-schema van het
 * aanvraagbericht dat eBlinqx gebruikt.
 *
 * Gebruik:
 *   const { invoer, ontbrekend } = HdnAdapter.vanHdn(xmlTekst, mapping);
 *   const uitkomst = ArgentaEngine.resultaat(invoer);
 */
const HdnAdapter = (() => {
  /* Kleine XML-lezer zonder afhankelijkheden: elementen, tekst, CDATA; namespace-prefixen vervallen */
  function leesXml(xml) {
    const wortel = { naam: '#wortel', kinderen: [], tekst: '' }, stapel = [wortel];
    const re = /<!\[CDATA\[([\s\S]*?)\]\]>|<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!DOCTYPE[^>]*>|<\/\s*([^\s>]+)\s*>|<([^\s>\/]+)([^>]*?)(\/?)>|([^<]+)/g;
    const ontsnap = t => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&');
    const kaal = n => n.replace(/^.*:/, '');
    let m;
    while ((m = re.exec(xml))) {
      const top = stapel[stapel.length - 1];
      if (m[1] != null) top.tekst += m[1];
      else if (m[2]) { if (stapel.length < 2 || kaal(m[2]) !== top.naam) throw new Error('XML is niet goed gevormd bij </' + m[2] + '>'); stapel.pop(); }
      else if (m[3]) { const knoop = { naam: kaal(m[3]), kinderen: [], tekst: '' }; top.kinderen.push(knoop); if (!m[5]) stapel.push(knoop); }
      else if (m[6] != null) top.tekst += ontsnap(m[6]);
    }
    if (stapel.length !== 1) throw new Error('XML is niet goed gevormd: element <' + stapel[stapel.length - 1].naam + '> is niet afgesloten');
    return wortel;
  }

  /* Zoek knopen via een pad als "Aanvraag/Object/Koopsom"; begint het pad met "//" dan wordt overal gezocht */
  function zoek(knoop, pad) {
    if (!pad) return [];
    const overal = pad.startsWith('//'), delen = pad.replace(/^\/+/, '').split('/').filter(Boolean);
    let nu = [knoop];
    if (overal) { const alle = []; const loop = k => { k.kinderen.forEach(c => { if (c.naam === delen[0]) alle.push(c); loop(c); }); }; loop(knoop); nu = alle; delen.shift(); }
    delen.forEach(d => { nu = [].concat(...nu.map(k => k.kinderen.filter(c => c.naam === d))); });
    return nu;
  }

  function waarde(knoop, regel) {
    const gevonden = zoek(knoop, regel.pad)[0];
    if (!gevonden) return undefined;
    const tekst = gevonden.tekst.trim();
    if (tekst === '') return undefined;
    if (regel.codes) return Object.prototype.hasOwnProperty.call(regel.codes, tekst) ? regel.codes[tekst] : undefined;
    switch (regel.type) {
      case 'bedrag': case 'getal': { const n = parseFloat(tekst.replace(',', '.')); return isNaN(n) ? undefined : Math.round(n * (regel.factor || 1) * 1e4) / 1e4; }
      case 'janee': return /^(j|ja|true|1|y)$/i.test(tekst);
      case 'datum': return tekst.slice(0, 10);
      default: return tekst;
    }
  }

  function zet(doel, sleutel, w) {
    const delen = sleutel.split('.'); let o = doel;
    delen.slice(0, -1).forEach(d => { if (o[d] == null || typeof o[d] !== 'object') o[d] = {}; o = o[d]; });
    o[delen[delen.length - 1]] = w;
  }

  /* Geeft { invoer, ontbrekend }: ontbrekend noemt de velden zonder pad in de mapping of zonder waarde in het bericht */
  function vanHdn(xml, mapping) {
    const boom = typeof xml === 'string' ? leesXml(xml) : xml;
    const invoer = {}, ontbrekend = [];
    const vul = (knoop, velden, doel, voorvoegsel) => Object.keys(velden || {}).forEach(sleutel => {
      const regel = velden[sleutel];
      if (!regel || !regel.pad) { if (!regel || regel.standaard === undefined) ontbrekend.push(voorvoegsel + sleutel + ' (geen pad in de mapping)'); else zet(doel, sleutel, regel.standaard); return; }
      const w = waarde(knoop, regel);
      if (w === undefined) { if (regel.standaard !== undefined) zet(doel, sleutel, regel.standaard); else if (regel.verplicht) ontbrekend.push(voorvoegsel + sleutel + ' (niet gevonden in het bericht)'); }
      else zet(doel, sleutel, w);
    });
    vul(boom, mapping.velden, invoer, '');
    Object.keys(mapping.lijsten || {}).forEach(naam => {
      const lijst = mapping.lijsten[naam];
      if (!lijst.pad) { ontbrekend.push(naam + ' (geen pad in de mapping)'); return; }
      invoer[naam] = zoek(boom, lijst.pad).map((knoop, n) => { const item = {}; vul(knoop, lijst.velden, item, naam + '[' + n + '].'); return item; });
    });
    Object.keys(mapping.blokken || {}).forEach(naam => {
      const blok = mapping.blokken[naam];
      if (!blok.pad) return;
      const knoop = zoek(boom, blok.pad)[0];
      if (!knoop) { invoer[naam] = null; return; }
      invoer[naam] = {}; vul(knoop, blok.velden, invoer[naam], naam + '.');
    });
    return { invoer, ontbrekend };
  }

  return { leesXml, zoek, vanHdn };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = HdnAdapter;
if (typeof globalThis !== 'undefined') globalThis.HdnAdapter = HdnAdapter;
