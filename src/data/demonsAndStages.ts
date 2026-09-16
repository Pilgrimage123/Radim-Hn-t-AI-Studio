import { DemonActionDef, StageDef, TraitDef } from '../types/game';

export const DEMON_ACTIONS: DemonActionDef[] = [
  { name: 'Attack', chance: 2 / 9, type: 'attack' },
  { name: 'Enrage', chance: 2 / 9, type: 'enrage', angerGain: 8 },
  { name: 'Persistent Hate', chance: 1 / 9, type: 'hate' },
  { name: 'Combat Scout', chance: 2 / 9, type: 'scout' },
  { name: 'Reprisal', chance: 1 / 9, type: 'reprisal' },
  { name: 'Bulwark', chance: 1 / 9, type: 'bulwark' }
];

export const DEMON_STAT_SETS: Record<string, { hp: number; temptDmg: number; venialDmg: number; mortalDmg: number; stun: number }> = {
  Devil:      { hp: 32, temptDmg: 14, venialDmg: 0, mortalDmg: 0, stun: 15 },
  Trickster:  { hp: 26, temptDmg: 0,  venialDmg: 12, mortalDmg: 0, stun: 11 },
  Glutton:    { hp: 46, temptDmg: 4,  venialDmg: 0, mortalDmg: 0, stun: 19 },
  Striker:    { hp: 24, temptDmg: 22, venialDmg: 0, mortalDmg: 0, stun: 11 },
  Reaper:     { hp: 39, temptDmg: 0,  venialDmg: 0, mortalDmg: 4, stun: 8  },
  Wraith:     { hp: 47, temptDmg: 0,  venialDmg: 2, mortalDmg: 0, stun: 19 },
  Sentinel:   { hp: 33, temptDmg: 0,  venialDmg: 8, mortalDmg: 0, stun: 15 },
  Hexer:      { hp: 34, temptDmg: 6,  venialDmg: 5, mortalDmg: 0, stun: 14 },
  Backslider: { hp: 44, temptDmg: 2,  venialDmg: 3, mortalDmg: 0, stun: 17 },
};

export const KEYWORD_NAMES_CZ: Record<string, string> = {
  Devil: 'Vetřelec',
  Trickster: 'Přeludník',
  Glutton: 'Žrout',
  Striker: 'Bijec',
  Reaper: 'Sběrač',
  Wraith: 'Přízrak',
  Sentinel: 'Strážce',
  Hexer: 'Rušič',
  Backslider: 'Mutant',
};

export function keywordName(kw: string): string {
  return KEYWORD_NAMES_CZ[kw] || kw;
}

export const TRAITS: Record<string, TraitDef> = {
  scales:   { name: 'Šupinatý',     desc: 'Utrpěné poškození -15%', dmgTakenMult: 0.85 },
  toughguy: { name: 'Odolný',       desc: '+15 % zdraví', hpMult: 1.15 },
  brutal:   { name: 'Brutální',     desc: '+12 % způsobeného poškození', dmgDealtMult: 1.12 },
  quick:    { name: 'Rychlý',       desc: '+25 % nárůstu Agrese', angerGainMult: 1.25 },
  stubborn: { name: 'Tvrdohlavý',   desc: 'Snížení Agrese je proti němu o 30 % slabší', angerResistMult: 0.7 },
  venomous: { name: 'Jedovatý',     desc: '+25 % poškození Kapotou', venialDealtMult: 1.25 },
  vampiric: { name: 'Vampýrský',    desc: 'Při Útoku se opraví o 20 % způsobeného poškození', lifestealPct: 0.2 },
  frenzied: { name: 'Zuřivý',       desc: 'Rozzuření zůstává v jeho výběru akcí až do Agrese 12 (místo 7); začíná souboj se 3 Agresí', enrageCapBonus: 5, startAnger: 3 },
  wrathful: { name: 'Vzteklý',      desc: '+25 % poškození Protonovou bublináží', temptDealtMult: 1.25 },
  corrosive:{ name: 'Leptavý',      desc: 'Tvůj Holoklam je proti němu o 25 % méně účinný', shieldResistMult: 0.75 },
  grim:     { name: 'Ponurý',       desc: 'Trvalá nenávist více léčí a roste (40 %/15 % místo 25 %/10 %)', hateHealMult: 1.6, hateGrowMult: 1.5 },
  miserly:  { name: 'Skoupý',       desc: 'Při zničení uděluje o 25 % méně Kreditů', graceMult: 0.75 },
  draining: { name: 'Vysávající',   desc: 'Dokud žije, máš o 2 Akce méně za kolo', actionDrain: 2 },
  stunproof:    { name: 'Odolný vůči EMP', desc: 'Práh Omráčení je o 30 % vyšší', stunThresholdMult: 1.30 },
  hasty:        { name: 'Chvatný',      desc: 'Práh Omráčení je o 25 % nižší, ale +15 % zdraví', stunThresholdMult: 0.75, hpMult: 1.15 },
  swarming:     { name: 'Rojivý',       desc: 'Bojový průzkum proti němu funguje jen napůl', scoutSuppressMult: 0.5 },
  keen:         { name: 'Ostražitý',    desc: 'Bojový průzkum proti němu vůbec nefunguje', scoutSuppressMult: 0 },
  vicious:      { name: 'Zákeřný',      desc: '20% šance, že jeho útok tohoto kola způsobí o 50 % víc poškození', viciousStrikeChance: 0.20 },
  timid:        { name: 'Plachý',       desc: '15% šance, že v kole svou akci úplně vynechá', skipActionChance: 0.15 },
  ambusher:     { name: 'Přepadový',    desc: 'Jeho úplně první útok v boji ignoruje celý Holoklam', shieldPierceOnSpawn: true },
  ramping:      { name: 'Narůstající',  desc: 'Dokud žije, tvé Akce za kolo klesají o 1 navíc každé jeho kolo (kumulativně)', actionDrainRamp: 1 },
  chilling:     { name: 'Mrazivý',      desc: 'Dokud žije, tvá max. Protonová bublináž je o 3 nižší', maxTemptDrain: 3 },
  clogging:     { name: 'Ucpávající',   desc: 'Dokud žije, tvá max. Kapota je o 3 nižší', maxVenialDrain: 3 },
  panicky:      { name: 'Panikářský',   desc: 'První Trvalá nenávist mu navíc jednorázově doplní 25 % max. zdraví', hateOneShotHealPct: 0.25 },
  resilient:    { name: 'Houževnatý',   desc: 'Při smrtelném zásahu jednou za boj přežije s 1 zdravím', reviveOnce: true },
  jamming:      { name: 'Rušící',       desc: 'Na začátku tvého prvního kola s ním lízneš o 1 kartu méně', drawPenaltyOnce: 1 },
  gilded:       { name: 'Pozlacený',    desc: 'Při zničení uděluje o 30 % více Kreditů, ale +12 % zdraví', graceMult: 1.30, hpMult: 1.12 },
  jittery2:     { name: 'Citlivý',      desc: 'Omráčení se mu plní o 20 % rychleji', stunGainResistMult: 1.20 },
  stoic:        { name: 'Stoický',      desc: 'Karty snižující Agresi jsou proti němu o 30 % slabší', calmResistMult: 0.70 },
  draining2:    { name: 'Odsávající',   desc: 'Dokud žije, tvůj max. Holoklam je o 4 nižší', shieldCapDrain: 4 },
  reckless:     { name: 'Bezhlavý',     desc: 'Jeho útoky směřují víc do Reaktoru (o 25 % větší podíl přeteče až tam)', mortalBias: 0.25 },
  vengeful:     { name: 'Mstivý',       desc: 'Při zničení ještě jednou naposledy zasáhne za 3 Reaktor', deathEcho: 3 },
  static:       { name: 'Statický',     desc: 'Jeho útok mu sám naplní 15 % vlastního Omráčení navíc', stunProc: 0.15 },
  patient:      { name: 'Trpělivý',     desc: 'Agrese se u něj začíná stupňovat o 2 kola později', rageDelay: 2 },
  eager:        { name: 'Dychtivý',     desc: 'Agrese se u něj začíná stupňovat o 2 kola dříve, ale +10 % zdraví', rageDelay: -2, hpMult: 1.10 },
  bleeding:     { name: 'Krvácející',   desc: 'Uděluje 1 Kredit navíc pokaždé, když je zasažen', graceOnHit: 1 },
  jamming2:     { name: 'Blokující',    desc: 'Dokud žije, jedna náhodná karta v ruce nejde zahrát', handLock: true },
  packHunter:   { name: 'Smečkový',     desc: '+8 % způsobeného poškození za každou entitu už zničenou v této etapě', packHunterPct: 0.08 },
  explosive:    { name: 'Explozivní',   desc: '+10 % nárůstu Agrese, +8 % způsobeného poškození', angerGainMult: 1.10, dmgDealtMult: 1.08 },
  symbiotic:    { name: 'Symbiotický',  desc: 'Při Útoku se opraví o 10 % způsobeného poškození, utrpěné poškození -8 %', lifestealPct: 0.10, dmgTakenMult: 0.92 },
  unshakeable:  { name: 'Neochvějný',   desc: '+10 % zdraví, snížení Agrese je proti němu o 15 % slabší', hpMult: 1.10, angerResistMult: 0.85 },
  rusty:        { name: 'Rezavý',       desc: '+20 % poškození Kapotou (opotřebené, ale pořád řeže)', venialDealtMult: 1.20 },
  alluring:     { name: 'Lákavý',       desc: '+20 % poškození Protonovou bublináží', temptDealtMult: 1.20 }
};

export const STAGES: StageDef[] = [
  {
    name: 'Úpatí — Vyprahlá pláň Arx Prima',
    biome: 'plain',
    demons: [
      { name: 'Blikající Signál', desc: 'Ruší tvůj radar zprávami od nikoho.',
        fixedKeyword: 'Hexer', fixedTraits: ['jamming', 'static'], fixedLevelMin: 1, fixedLevel: 1 },
      { name: 'Drobek s malými kleštěmi', desc: 'Štípe do podvozku, dokud servopohony nezakřičí.',
        fixedKeyword: 'Striker', fixedTraits: ['vicious', 'jittery2'], fixedLevelMin: 1, fixedLevel: 1 },
      { name: 'Apathosaurus', desc: 'Ne, není to Brontosaur, ale ani Apatosaur. Apathosaurus má prostě hodně rád staré filmy o boxu. NO PAIN!',
        fixedKeyword: 'Striker', fixedTraits: ['stubborn', 'unshakeable'], fixedLevelMin: 1, fixedLevel: 1 },
    ]
  },
  {
    name: 'Kaňon kapot',
    biome: 'canyon',
    demons: [
      { name: 'Šeptající Anténa', desc: 'Vysílá drby na všech frekvencích.',
        fixedKeyword: 'Sentinel', fixedTraits: ['keen', 'stoic'], fixedLevelMin: 1, fixedLevel: 2 },
      { name: 'Gumový Chapadlovec', desc: 'Chce si jen lehnout. Ty taky, ale nemůžeš.',
        fixedKeyword: 'Backslider', fixedTraits: ['patient', 'symbiotic'], fixedLevelMin: 2, fixedLevel: 2 },
      { name: 'Zrcadlová Medúza', desc: 'Ukazuje ti, jak dobře vypadáš. Lže.',
        fixedKeyword: 'Trickster', fixedTraits: ['corrosive', 'venomous'], fixedLevelMin: 2, fixedLevel: 3 },
    ]
  },
  {
    name: 'Skalní srázy — Zóna přetlaku',
    biome: 'cliffs',
    demons: [
      { name: 'Nafukovací Titán', desc: 'Tvrdí, že horu vůbec nepotřebuješ.',
        fixedKeyword: 'Glutton', fixedTraits: ['toughguy', 'panicky'], fixedLevelMin: 3, fixedLevel: 4 },
      { name: 'Byrokratický Robot', desc: 'Má na tebe formulář o 40 stránkách.',
        fixedKeyword: 'Sentinel', fixedTraits: ['draining', 'stubborn'], fixedLevelMin: 2, fixedLevel: 3 },
      { name: 'Starý Rezavý Dron', desc: 'Pamatuje si každou tvou chybu. Nahlas.',
        fixedKeyword: 'Trickster', fixedTraits: ['rusty', 'stubborn'], fixedLevelMin: 3, fixedLevel: 4 },
    ]
  },
  {
    name: 'Temná strana hory',
    biome: 'darkside',
    demons: [
      { name: 'Prázdná Ozvěna', desc: 'Tvrdí, že už žádné pivo nezbylo.',
        fixedKeyword: 'Wraith', fixedTraits: ['chilling', 'draining2'], fixedLevelMin: 3, fixedLevel: 4 },
      { name: 'Hologram z Reklamy', desc: 'Slibuje věci, co neexistují.',
        fixedKeyword: 'Trickster', fixedTraits: ['ambusher', 'venomous'], fixedLevelMin: 3, fixedLevel: 4 },
      { name: 'Falešný Navigátor', desc: 'Tvrdí, že zná zkratku. Nezná.',
        fixedKeyword: 'Devil', fixedTraits: ['jamming2', 'vicious'], fixedLevelMin: 4, fixedLevel: 5 },
    ]
  },
  {
    name: 'Vrchol — Poslední výstup',
    biome: 'summit',
    demons: [
      { name: 'Roj Nanovosáčů', desc: 'Mnoho maličkých, jeden velký problém.',
        fixedKeyword: 'Hexer', fixedTraits: ['swarming', 'ramping'], fixedLevelMin: 4, fixedLevel: 5 },
      { name: 'Jádro Hory', desc: 'To, co tu bylo dřív, než přišli lidi.',
        fixedKeyword: 'Reaper', fixedTraits: ['resilient', 'grim'], fixedLevelMin: 5, fixedLevel: 6 },
    ]
  },
  {
    name: 'Rezavá orbitální šibenice',
    biome: 'orbital',
    demons: [
      { name: 'Iron nacističtí piráti', desc: 'Posádka v železných přilbách křičí hesla a střílí z rezavých harpun. Plují na vlně metanu a ukradených memů.',
        traitCount: 2, fixedKeyword: 'Hexer', fixedTraits: ['swarming', 'vicious'], fixedLevelMin: 5, fixedLevel: 6 },
      { name: 'Adolfosaurus Rex', desc: 'Kříženec tyrannosaura a špatné historie. Řve manifest a kouše do Kapoty i Reaktoru.',
        traitCount: 3, hpMult: 1.25, fixedKeyword: 'Glutton', fixedTraits: ['brutal', 'toughguy', 'vampiric'], fixedLevelMin: 6, fixedLevel: 7 },
      { name: 'Naci Iron Man', desc: 'Exoskelet s černým leskem a analogovým knírkem na hledí. Myslí si, že je hrdina, ale je jen drahá zbraň.',
        traitCount: 2, fixedKeyword: 'Striker', fixedTraits: ['ambusher', 'frenzied'], fixedLevelMin: 5, fixedLevel: 6 },
      { name: 'Potulný paladin AI cenzury', desc: 'Bloudí horou s holým mečem a seznamem zakázaných slov. Chce ti vypnout humor i radar.',
        traitCount: 3, fixedKeyword: 'Sentinel', fixedTraits: ['jamming2', 'stubborn', 'keen'], fixedLevelMin: 6, fixedLevel: 7 },
      { name: 'Loupeživý triton', desc: 'Mrazivý a pěkně od pohledu otylý, připlaval — vlastně přiletěl — rovnou z neptunského oceánu. Byl tu dávno předtím, než jsi na tuhle skálu vztyčil vlajku, a rozhodně si to pamatuje.',
        traitCount: 2, fixedKeyword: 'Glutton', fixedTraits: ['chilling', 'toughguy'], fixedLevelMin: 5, fixedLevel: 6 },
      { name: 'Vyhnaná siréna', desc: 'Vyhnaná z hlubin, děsivě korpulentní a nebezpečně, smrtelně atraktivní. Než stihneš říct "ne, díky", už jí nasloucháš.',
        traitCount: 2, fixedKeyword: 'Devil', fixedTraits: ['alluring', 'toughguy'], fixedLevelMin: 5, fixedLevel: 6 },
      { name: 'Zhrzená nereida', desc: 'Zhrzená nereida, které někdo zlomil srdce až na orbitě. Teď to schytáš ty — prostě proto, že jsi zrovna po ruce.',
        traitCount: 2, fixedKeyword: 'Wraith', fixedTraits: ['vengeful', 'grim'], fixedLevelMin: 6, fixedLevel: 7 },
    ]
  },
  {
    name: 'Kaltův křyšťálový palác',
    biome: 'palace',
    demons: [
      { name: 'Noel Skum', desc: 'Přijíždí někdo v hrozně hranatém autě. Až by sis myslel, že je to Filip Turek…',
        traitCount: 2, fixedKeyword: 'Trickster', fixedTraits: ['alluring', 'corrosive'], fixedLevelMin: 6, fixedLevel: 7 },
      { name: 'Viktor Kalt', desc: 'Ego velikosti černé díry.',
        traitCount: 3, hpMult: 1.6, rageDelay: 1,
        fixedKeyword: 'Devil', fixedTraits: ['frenzied', 'miserly', 'vengeful'], fixedLevelMin: 6, fixedLevel: 7 },
    ]
  }
];
