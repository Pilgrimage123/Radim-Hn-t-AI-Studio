import { CardDef, CardIntent, CardKind } from '../types/game';

export const CARD_DB: CardDef[] = [
  // Protokoly (bývalé modlitby)
  { id: 'nafouknuti', name: 'Ranní nafouknutí', type: 'prayer', cost: 8, text: 'Doplň Protonovou bublináž o 8.' },
  { id: 'rychle_fouknuti', noShop: true, name: 'Rychlé fouknutí', type: 'prayer', cost: 4, text: 'Doplň Protonovou bublináž o 4.' },
  { id: 'kontrola_bublin', name: 'Kontrola bublin', type: 'prayer', cost: 6, text: 'Doplň Protonovou bublináž o 4. Lízni 1 kartu.' },
  { id: 'plna_davka', name: 'Plná dávka bublin', type: 'prayer', cost: 15, text: 'Doplň Protonovou bublináž o 10 a Kapotu o 4. Lízni 1 kartu.' },
  { id: 'zalohovane', name: 'Zálohované bubliny', type: 'prayer', cost: 8, text: 'Doplň Protonovou bublináž o 6. Pokud byla Protonová bublináž >10, také +4 Kapota.' },

  // Systémy (bývalé ctnosti)
  { id: 'presna_palba', name: 'Přesná palba', type: 'virtue', cost: 12, text: 'Zraň za 4. Získej 1 Vyladění. Lízni 1 kartu.' },
  { id: 'rezervni_bublina', name: 'Rezervní bublina', type: 'virtue', cost: 8, text: 'Doplň Protonovou bublináž o 10.' },
  { id: 'sdilene', name: 'Sdílené bubliny', type: 'virtue', cost: 12, text: 'Doplň Kapotu o 8. Protonová bublináž +4.' },
  { id: 'vyvazeni', name: 'Vyvážení bublin', type: 'virtue', cost: 8, text: 'Doplň Protonovou bublináž o 6 a Kapotu o 2.' },
  { id: 'titanova_kostra', name: 'Titanová kostra', type: 'virtue', cost: 15, text: 'Zraň za 8.' },
  { id: 'tiche_bublinky', noShop: true, name: 'Tiché bublinky', type: 'virtue', cost: 6, text: 'Doplň Protonovou bublináž o 6.' },

  // Nouzové moduly (bývalé svátosti)
  { id: 'nouzova_davka', name: 'Nouzová dávka bublin', type: 'sacrament', cost: 16, text: 'Doplň Protonovou bublináž o 12 a Kapotu o 6. Lízni 1 kartu.', priceMult: 1.15 },
  { id: 'novy_nater', name: 'Nový nátěr, nové bubliny', type: 'sacrament', cost: 9, text: 'Doplň Kapotu o 10.' },
  { id: 'bojovy_mod', name: 'Bojový mód', type: 'sacrament', cost: 16, text: 'Zraň za 12.' },

  // Legendy (bývalí svatí)
  { id: 'model7', name: 'Model 7', type: 'saint', cost: 16, text: 'Zraň za 10. Doplň Protonovou bublináž o 6.' },
  { id: 'mistr_bublinar', noShop: true, name: 'Mistr Bublinář', type: 'saint', cost: 12, text: 'Doplň Protonovou bublináž o 10. Doplň Kapotu o 2.' },
  { id: 'mala_rada', name: 'Malá Rada', type: 'saint', cost: 6, text: 'Doplň Kapotu o 6.' },
  { id: 'stary_bublinar', name: 'Starý Bublinář', type: 'saint', cost: 12, text: 'Doplň Protonovou bublináž o 10 a Kapotu o 4.' },
  { id: 'filozof', noShop: true, name: 'Filozof z Podpalubí', type: 'saint', cost: 8, text: 'Doplň Kapotu o 4 a Protonovou bublináž o 4.' },

  // Manuály (bývalé písmo)
  { id: 'nouzova_holo', name: 'Nouzová holoprojekce', type: 'scripture', cost: 8, text: 'Získej 8 bodů Holoklam.' },
  { id: 'plna_salva', intent: 'splash', name: 'Plná salva', type: 'scripture', cost: 16, text: 'Zraň za 8. Doplň Protonovou bublináž o 4.' },
  { id: 'protiuder', name: 'Protiúder', type: 'scripture', cost: 10, text: 'Zraň za 4. Získej 1 Vyladění. Doplň Protonovou bublináž o 2.' },
  { id: 'udrzba', name: 'Údržba po havárii', type: 'scripture', cost: 10, text: 'Sniž Agresi entity o 3. Doplň Kapotu o 4. Doplň Protonovou bublináž o 2.' },

  // Speciální
  { id: 'kompletni_servis', name: 'Kompletní servis', type: 'special', cost: 12, text: 'Doplň Kapotu o 12 a Protonovou bublináž o 6.', priceMult: 1.3 },
  { id: 'holo_dron', name: 'Holo-dron', type: 'special', cost: 8, text: 'Získej 5 bodů Holoklam.', priceMult: 0.85 },
  { id: 'chladici_cyklus', name: 'Chladicí cyklus', type: 'prayer', cost: 8, text: 'Sniž Agresi entity o 5.' },
  { id: 'pretlakovy_ventil', name: 'Přetlakový ventil', type: 'special', cost: 13, text: 'Sniž Agresi entity o 5. Doplň Protonovou bublináž o 4. Doplň Kapotu o 2.' },
  { id: 'bublinkova_pauza', noShop: true, name: 'Bublinková pauza', type: 'prayer', cost: 4, text: 'Doplň Protonovou bublináž o 4.' },
  { id: 'cimrman', name: 'Cimrmanova metoda', type: 'special', cost: 10, text: 'Lízni 3 karty.' },

  // Karty na Vyladění
  { id: 'seznam_kontaktu', name: 'Seznam kontaktů', type: 'special', cost: 6, text: 'Získej 2 Vyladění. Doplň Kapotu o 2.' },
  { id: 'improv_zbran', name: 'Improvizovaná zbraň', type: 'scripture', cost: 16, text: 'Zraň za 7, plus 2 za každé Vyladění.', priceMult: 1.15 },
  { id: 'odpaleni_reaktoru', intent: 'row', name: 'Plné odpálení reaktoru', type: 'special', cost: 16, text: 'Spotřebuj veškeré Vyladění: Poškoď entitu 3x tolik (min. 5).', priceMult: 1.3 },

  // Holoklam karty
  { id: 'zrcadlova_clona', name: 'Zrcadlová clona', type: 'virtue', cost: 8, text: 'Získej 6 bodů Holoklam.' },
  { id: 'bleskovy_klamacek', name: 'Bleskový klamáček', type: 'prayer', cost: 6, text: 'Získej 4 body Holoklam.' },
  { id: 'nouzovy_holoplast', name: 'Nouzový holoplášť', type: 'special', cost: 12, text: 'Získej 10 bodů Holoklam.' },
  { id: 'zdvojeny_obraz', name: 'Zdvojený obraz', type: 'scripture', cost: 10, text: 'Získej 5 bodů Holoklam. Doplň Kapotu o 2.', priceMult: 0.85 },
  { id: 'klam_uder', name: 'Klam a úder', type: 'saint', cost: 16, text: 'Získej 8 bodů Holoklam. Zraň za 4.', priceMult: 0.85 },

  // Omráčení karty (Stun)
  { id: 'empburst', intent: 'splash', name: 'EMP výboj', type: 'special', cost: 6, text: 'Zvyš Omráčení entity o 4.' },
  { id: 'shortcircuit', intent: 'splash', name: 'Zkratovací paprsek', type: 'scripture', cost: 10, text: 'Zvyš Omráčení entity o 5. Zraň za 3.', priceMult: 1.1 },
  { id: 'staticfield', intent: 'splash', name: 'Statické pole', type: 'virtue', cost: 6, text: 'Zvyš Omráčení entity o 3. Doplň Protonovou bublináž o 2.' },

  // Liché ceny akcí
  { id: 'kapka_do_bubliny', name: 'Kapka do bubliny', type: 'prayer', cost: 3, text: 'Doplň Protonovou bublináž o 2.' },
  { id: 'rychly_vypad', name: 'Rychlý výpad', type: 'virtue', cost: 5, text: 'Zraň za 3.' },
  { id: 'dotazeni_sroubu', name: 'Dotažení šroubů', type: 'saint', cost: 7, text: 'Doplň Kapotu o 7.' },
  { id: 'dolazena_salva', intent: 'splash', name: 'Doladěná salva', type: 'virtue', cost: 9, text: 'Zraň za 6. Získej 1 Vyladění.' },
  { id: 'velka_revize', name: 'Velká revize', type: 'sacrament', cost: 11, text: 'Doplň Protonovou bublináž o 8 a Kapotu o 5.' },
  { id: 'drtivy_zasah', name: 'Drtivý zásah', type: 'scripture', cost: 13, text: 'Zraň za 10.' },
  { id: 'posledni_zaloha', name: 'Poslední záloha', type: 'special', cost: 15, text: 'Zraň za 6. Doplň Kapotu o 6. Lízni 1 kartu.' },

  // Koroze
  { id: 'kysely_sprej', name: 'Kyselý sprej', type: 'prayer', cost: 9, text: 'Aplikuj 3 Koroze.' },
  { id: 'rezavy_hreb', name: 'Rezavý hřeb', type: 'virtue', cost: 11, text: 'Zraň za 3. Aplikuj 2 Koroze.' },
  { id: 'solna_mlha', intent: 'splash', name: 'Solná mlha', type: 'scripture', cost: 13, text: 'Aplikuj 4 Koroze.' },
  { id: 'odloupnuty_nater', name: 'Odloupnutý nátěr', type: 'saint', cost: 11, text: 'Spotřebuj veškerou Korozi: 2 poškození za každý stoh.' },
  { id: 'rez_z_kapoty', name: 'Rez z kapoty', type: 'special', cost: 13, text: 'Ztrať 4 Kapotu. Aplikuj 5 Koroze. Získej 1 Vyladění.' },
];

export const STARTING_DECK_IDS = [
  'nafouknuti', 'kontrola_bublin',
  'presna_palba', 'presna_palba', 'staticfield', 'nouzova_holo',
  'empburst', 'protiuder', 'plna_salva', 'udrzba', 'bojovy_mod', 'cimrman'
];

export const CARD_ID_ALIASES: Record<string, string> = {
  ourfather: 'nafouknuti', hailmary: 'rychle_fouknuti', glorybe: 'kontrola_bublin',
  rosary: 'plna_davka', memorare: 'zalohovane', faith: 'presna_palba',
  hope: 'rezervni_bublina', charity: 'sdilene', temperance: 'vyvazeni',
  fortitude: 'titanova_kostra', humility: 'tiche_bublinky', eucharist: 'nouzova_davka',
  baptism: 'novy_nater', confirmation: 'bojovy_mod',
  michael: 'model7', joseph: 'mistr_bublinar', therese: 'mala_rada',
  padrepio: 'stary_bublinar', augustine: 'filozof', psalm23: 'nouzova_holo',
  ephesians6: 'plna_salva', james4: 'protiuder', psalm51: 'udrzba',
  actofcontrition: 'kompletni_servis', guardian: 'holo_dron',
  divinemercy: 'chladici_cyklus', sacredheart: 'pretlakovy_ventil',
  jesusprayer: 'bublinkova_pauza', litanysaints: 'seznam_kontaktu',
  swordspirit: 'improv_zbran', transfiguration: 'odpaleni_reaktoru',
  shieldoffaith: 'zrcadlova_clona', prayertomichael: 'bleskovy_klamacek',
  mantleofmary: 'nouzovy_holoplast', breastplate: 'zdvojeny_obraz',
  michaelshield: 'klam_uder'
};

export function canonCardId(id: string): string {
  return CARD_ID_ALIASES[id] || id;
}

export function cardIdsMatch(a: string, b: string): boolean {
  return canonCardId(a) === canonCardId(b);
}

export function findCardDef(id: string): CardDef | null {
  const c = canonCardId(id);
  const found = CARD_DB.find(x => x.id === c);
  return found ? { ...found } : null;
}

export const CARD_INTENT_SPLASH = ['plna_salva', 'dolazena_salva', 'shortcircuit', 'empburst', 'staticfield', 'solna_mlha'];
export const CARD_INTENT_ROW = ['odpaleni_reaktoru'];

export function resolveCardIntent(card: CardDef): CardIntent {
  if (card.intent) return card.intent;
  if (CARD_INTENT_ROW.includes(card.id)) return 'row';
  if (CARD_INTENT_SPLASH.includes(card.id)) return 'splash';
  return 'focus';
}

export function cardIntentLabel(intent: CardIntent): string {
  if (intent === 'splash') return 'Splash 40 %';
  if (intent === 'row') return 'Řada';
  return '';
}

export function classifyCardKind(card: CardDef): CardKind {
  const txt = card.text;
  if (/Zraň za \d+|Aplikuj \d+ Koroze|veškerou Korozi/.test(txt)) return 'attack';
  if (/Získej \d+ bod(?:y|ů) Holoklam/.test(txt)) return 'shield';
  if (/(?:Doplň|a) Kapotu o \d+|\+\d+ Kapota/.test(txt)) return 'repair';
  if (/Lízni \d+ kart/.test(txt)) return 'draw';
  return 'special';
}

export const CARD_KIND_META: Record<CardKind, { label: string; icon: string }> = {
  attack: { label: 'Útok', icon: '⚔️' },
  shield: { label: 'Štít', icon: '🎭' },
  repair: { label: 'Oprava', icon: '🧰' },
  draw: { label: 'Líznutí', icon: '🎴' },
  special: { label: 'Speciál', icon: '✨' }
};

export function starValueMult(card: CardDef): number {
  const stars = card.stars || 0;
  const capped = Math.min(5, stars);
  return 1 + capped * 0.08;
}

export function starPriceMult(card: CardDef): number {
  const stars = card.stars || 0;
  const capped = Math.min(5, stars);
  return 1 + capped * 0.12;
}

export function starEmoji(stars?: number): string {
  if (!stars) return '';
  const full = Math.floor(stars);
  const half = (stars - full) >= 0.5 ? 1 : 0;
  return '⭐'.repeat(full) + (half ? '✨' : '');
}
