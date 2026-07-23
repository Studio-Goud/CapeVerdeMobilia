import type { TL } from '@/i18n';

/**
 * Djarvista knowledge base ("Guias"). Curated, SOURCED reference content about
 * building, property, tax and government in Cabo Verde.
 *
 * Editorial rules (this is what makes us a trustworthy, citable source):
 *  - Every factual claim carries a source. `status: 'fact'` = attributable to a
 *    primary source (Boletim Oficial) or a reliable named source; `status: 'verify'`
 *    = secondary/uncertain, shown with an explicit "a confirmar" flag.
 *  - Nothing is invented. Figures we could not source are omitted, not approximated.
 *  - Legal/tax content is indicative, not advice; each page tells the reader which
 *    authority to confirm with.
 *  Full sourced corpus for the remaining topics: scratchpad/kb-corpus.md + kb-terrenos.md.
 */

export interface KbSource {
  label: string;
  url: string;
  date: string;      // publication or access date (YYYY-MM-DD)
  primary?: boolean; // true = official/primary (e.g. Boletim Oficial)
}

export interface KbEntry {
  q: TL;             // question
  a: TL;             // plain-language answer
  status: 'fact' | 'verify';
  authority?: TL;    // who to confirm with
  sources: KbSource[];
}

export interface KbTopic {
  slug: string;
  title: TL;
  intro: TL;
  updated: string;   // YYYY-MM-DD
  seoTitle: TL;
  seoDesc: TL;
  entries: KbEntry[];
}

const BOE_TAX: KbSource = { label: 'Boletim Oficial n.º 46, I Série (Lei 54/X/2025 e 55/X/2025)', url: 'https://boe.incv.cv/Bulletins/Download/23602', date: '2025-06-06', primary: true };
const MCT_IPI: KbSource = { label: 'Ministério competente – explicador IPI', url: 'https://mct.gov.cv/download/imposto-sobre-propriedade-de-imoveis-ipi/', date: '2026-07-23' };
const PWC: KbSource = { label: 'PwC Worldwide Tax Summaries – Cabo Verde', url: 'https://taxsummaries.pwc.com/cabo-verde/individual/other-taxes', date: '2026-05-29' };

const CONFIRM_AT: TL = {
  pt: 'Autoridade Tributária e Aduaneira (DNRE) e a Câmara Municipal onde se situa o imóvel.',
  en: 'The Tax Authority (DNRE) and the Municipal Council where the property is located.',
  nl: 'De belastingdienst (DNRE) en de gemeente (Câmara Municipal) waar het pand ligt.',
};

/** Flagship topic: the 2026 property-tax reform. Best primary-sourced cluster. */
const impostos: KbTopic = {
  slug: 'impostos-imobiliarios',
  title: { pt: 'Impostos imobiliários em Cabo Verde (reforma de 2026)', en: 'Property taxes in Cabo Verde (2026 reform)', nl: 'Vastgoedbelasting in Kaapverdië (hervorming 2026)' },
  updated: '2026-07-23',
  seoTitle: { pt: 'Impostos imobiliários em Cabo Verde 2026: ITI e IPI (fim do IUP)', en: 'Property taxes in Cabo Verde 2026: ITI and IPI (end of IUP)', nl: 'Vastgoedbelasting Kaapverdië 2026: ITI en IPI (einde IUP)' },
  seoDesc: {
    pt: 'Desde 1 de janeiro de 2026, o IUP foi substituído pelo ITI (1% na compra) e pelo IPI (0,1% anual). Fonte: Boletim Oficial, Leis 54 e 55/X/2025. Informação indicativa, não é aconselhamento jurídico.',
    en: 'Since 1 January 2026, IUP was replaced by ITI (1% on purchase) and IPI (0.1% yearly). Source: Boletim Oficial, Laws 54 and 55/X/2025. Indicative, not legal advice.',
    nl: 'Sinds 1 januari 2026 verving ITI (1% bij koop) en IPI (0,1% per jaar) de oude IUP. Bron: Boletim Oficial, wetten 54 en 55/X/2025. Indicatief, geen juridisch advies.',
  },
  intro: {
    pt: 'A 1 de janeiro de 2026 entrou em vigor uma reforma da tributação do património: o antigo IUP foi revogado e substituído por dois impostos, o ITI (na transmissão) e o IPI (anual). As taxas abaixo são citadas diretamente do texto da lei no Boletim Oficial. É informação indicativa e não constitui aconselhamento fiscal ou jurídico.',
    en: 'On 1 January 2026 a property-tax reform took effect: the old IUP was repealed and replaced by two taxes, ITI (on transfer) and IPI (annual). The rates below are quoted directly from the law in the Boletim Oficial. This is indicative information and not tax or legal advice.',
    nl: 'Op 1 januari 2026 trad een hervorming van de vastgoedbelasting in werking: de oude IUP werd ingetrokken en vervangen door twee belastingen, ITI (bij overdracht) en IPI (jaarlijks). De tarieven hieronder zijn rechtstreeks uit de wet in de Boletim Oficial geciteerd. Dit is indicatieve informatie, geen fiscaal of juridisch advies.',
  },
  entries: [
    {
      q: { pt: 'O que mudou em 2026?', en: 'What changed in 2026?', nl: 'Wat is er in 2026 veranderd?' },
      a: {
        pt: 'A partir de 1 de janeiro de 2026, o Imposto Único sobre o Património (IUP) foi revogado e substituído por dois impostos: o ITI (Imposto sobre a Transmissão de Imóveis), pago na compra/transmissão, e o IPI (Imposto sobre a Propriedade de Imóveis), pago anualmente por quem é dono. Base legal: Leis n.º 54/X/2025 e 55/X/2025.',
        en: 'From 1 January 2026 the single property tax (IUP) was repealed and replaced by two taxes: ITI (tax on property transfer), paid on purchase, and IPI (property ownership tax), paid yearly by the owner. Legal basis: Laws 54/X/2025 and 55/X/2025.',
        nl: 'Vanaf 1 januari 2026 is de oude vermogensbelasting (IUP) ingetrokken en vervangen door twee belastingen: ITI (belasting op overdracht), betaald bij koop, en IPI (belasting op bezit), jaarlijks betaald door de eigenaar. Wettelijke basis: wetten 54/X/2025 en 55/X/2025.',
      },
      status: 'fact',
      authority: CONFIRM_AT,
      sources: [BOE_TAX, MCT_IPI],
    },
    {
      q: { pt: 'Quanto pago de imposto ao comprar (ITI)?', en: 'How much tax do I pay when buying (ITI)?', nl: 'Hoeveel belasting betaal ik bij koop (ITI)?' },
      a: {
        pt: 'A taxa do ITI é de 1% do valor tributável do imóvel (Código do ITI, art. 11.º: "A taxa do imposto é fixada em 1%"). Sobe para 3% quando o comprador ou o vendedor beneficia de um regime de tributação privilegiada. É um imposto municipal, pago normalmente pelo comprador, e liquidado antes do ato de transmissão. Nota: alguns anúncios ainda citam "1,5%", que era um valor da era do antigo IUP, não a taxa atual.',
        en: 'The ITI rate is 1% of the property’s taxable value (ITI Code, art. 11: "the tax rate is set at 1%"). It rises to 3% where the buyer or seller enjoys a privileged tax regime. It is a municipal tax, usually paid by the buyer, and assessed before the transfer. Note: some ads still quote "1.5%", an old IUP-era figure, not the current rate.',
        nl: 'Het ITI-tarief is 1% van de belastbare waarde (ITI-wetboek, art. 11: "het tarief is vastgesteld op 1%"). Het stijgt naar 3% als koper of verkoper een bevoorrecht belastingregime geniet. Het is een gemeentelijke belasting, meestal door de koper betaald, en wordt vastgesteld vóór de overdracht. Let op: sommige advertenties noemen nog "1,5%", een oud IUP-cijfer, niet het huidige tarief.',
      },
      status: 'fact',
      authority: CONFIRM_AT,
      sources: [BOE_TAX, PWC],
    },
    {
      q: { pt: 'Quanto pago todos os anos por ser dono (IPI)?', en: 'How much do I pay yearly to own (IPI)?', nl: 'Hoeveel betaal ik jaarlijks voor bezit (IPI)?' },
      a: {
        pt: 'O IPI é de 0,1% do valor tributável por ano (Código do IPI, art. 28.º); para terrenos para construção a taxa é de 0,15% (art. 23.º, n.º 2). Há agravamentos para prédios devolutos, em ruína ou com fachada por acabar. É devido por quem for dono em 31 de dezembro. Uma norma transitória limita a subida anual a 10%.',
        en: 'IPI is 0.1% of the taxable value per year (IPI Code, art. 28); for construction land the rate is 0.15% (art. 23(2)). There are surcharges for vacant, ruined or unfinished-façade buildings. It is owed by whoever owns the property on 31 December. A transitional rule caps the yearly increase at 10%.',
        nl: 'IPI is 0,1% van de belastbare waarde per jaar (IPI-wetboek, art. 28); voor bouwgrond is het 0,15% (art. 23 lid 2). Er zijn verhogingen voor leegstaande, vervallen of onafgewerkte panden. Verschuldigd door wie op 31 december eigenaar is. Een overgangsregel maximeert de jaarlijkse stijging op 10%.',
      },
      status: 'fact',
      authority: CONFIRM_AT,
      sources: [BOE_TAX, MCT_IPI],
    },
    {
      q: { pt: 'E quando vendo, pago imposto sobre o lucro?', en: 'And when I sell, is the gain taxed?', nl: 'En bij verkoop, wordt de winst belast?' },
      a: {
        pt: 'As mais-valias de particulares na venda de imóveis são tributadas a uma taxa autónoma de 1% (em sede de IRPS). Não encontrámos, em fonte oficial, uma isenção confirmada para habitação própria ou reinvestimento, pelo que não se deve assumir que exista. Confirme com a Autoridade Tributária.',
        en: 'Individuals’ capital gains on selling property are taxed at a 1% autonomous rate (under IRPS). We did not find a confirmed exemption for a main home or reinvestment in an official source, so do not assume one exists. Confirm with the Tax Authority.',
        nl: 'Meerwaarde van particulieren bij verkoop wordt belast tegen een autonoom tarief van 1% (via IRPS). We vonden in een officiële bron geen bevestigde vrijstelling voor eigen woning of herinvestering, dus ga er niet van uit dat die bestaat. Bevestig bij de belastingdienst.',
      },
      status: 'fact',
      authority: CONFIRM_AT,
      sources: [PWC],
    },
    {
      q: { pt: 'Quais são os custos de notário e registo?', en: 'What are the notary and registration costs?', nl: 'Wat zijn de notaris- en registratiekosten?' },
      a: {
        pt: 'Além dos impostos, há emolumentos do notário (escritura) e do registo predial. Não conseguimos obter a tabela oficial de emolumentos, por isso não publicamos valores estimados como se fossem certos. Peça a tabela atual à Casa do Cidadão / ao cartório notarial e à conservatória antes de contar com um valor.',
        en: 'Besides taxes there are notary (deed) and land-registry fees. We could not obtain the official fee schedule, so we do not publish estimates as if they were certain. Ask Casa do Cidadão / the notary and the land registry for the current table before relying on a figure.',
        nl: 'Naast belastingen zijn er notaris- (akte) en kadasterkosten. We konden de officiële tarieventabel niet verkrijgen, dus publiceren we geen schattingen alsof ze zeker zijn. Vraag de actuele tabel op bij Casa do Cidadão / de notaris en het kadaster voordat je op een bedrag rekent.',
      },
      status: 'verify',
      authority: {
        pt: 'Casa do Cidadão, o cartório notarial e a Conservatória do Registo Predial.',
        en: 'Casa do Cidadão, the notary and the Land Registry (Conservatória).',
        nl: 'Casa do Cidadão, de notaris en het kadaster (Conservatória).',
      },
      sources: [{ label: 'Casa do Cidadão / Porton di Nôs Ilha', url: 'https://portondinosilhas.gov.cv/', date: '2026-07-23', primary: true }],
    },
  ],
};

export const KB_TOPICS: Record<string, KbTopic> = {
  [impostos.slug]: impostos,
};

export const KB_SLUGS: string[] = Object.keys(KB_TOPICS);
