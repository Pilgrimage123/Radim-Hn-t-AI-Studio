import { HeroDef, PartakDef, PatronDef } from '../types/game';

export const HERO_STATS: Record<string, HeroDef> = {
  bozhena: {
    nameCz: 'BOZhena 2026',
    maxActions: 20,
    maxTempt: 20,
    handSize: 5,
    temptationCleanup: 7,
    contemplationPerTurn: 20,
    senzory: 20,
    diplomAPI: 20,
    icon: '🤖',
    desc: 'AI pilotka je vlastenecká spisovatelka z 19. století. Mech je vyvážený, spolehlivý, bez zbytečností — až na BabiCZku: Boženino největší dílo (zde dělo).'
  },
  vaclav: {
    nameCz: 'VAClav 1989',
    maxActions: 19,
    maxTempt: 23,
    handSize: 5,
    temptationCleanup: 8,
    contemplationPerTurn: 22,
    senzory: 18,
    diplomAPI: 18,
    icon: '⚙️',
    desc: 'Starý mech, ošlehaný roky provozu. Pomalejší, ale nic ho nezastaví.'
  },
  kara: {
    nameCz: 'Kára Mk. II',
    maxActions: 22,
    maxTempt: 19,
    handSize: 5,
    temptationCleanup: 6,
    contemplationPerTurn: 18,
    senzory: 23,
    diplomAPI: 22,
    icon: '🦿',
    desc: 'Odlehčený a rychlý model, staví na obratnosti víc než na pancíři.'
  },
  bidlo: {
    nameCz: 'Dlouhé bidlo',
    maxActions: 21,
    maxTempt: 19,
    handSize: 5,
    temptationCleanup: 6,
    contemplationPerTurn: 18,
    senzory: 22,
    diplomAPI: 20,
    icon: '🦵',
    desc: 'Vytáhlý, tenký rám na dlouhých nohách. Skvělý dosah a tempo, ale málo místa na pancíř.'
  },
  robur: {
    nameCz: 'Robur',
    maxActions: 18,
    maxTempt: 24,
    handSize: 5,
    temptationCleanup: 9,
    contemplationPerTurn: 21,
    senzory: 16,
    diplomAPI: 24,
    icon: '🚁',
    desc: 'Přestavěná vzducholoďová pohonná jednotka, teď našroubovaná na nohy. Pomalý, ale nese obří rezervu výkonu.'
  },
  kolohnat: {
    nameCz: 'ColoHnaat',
    maxActions: 17,
    maxTempt: 25,
    handSize: 5,
    temptationCleanup: 10,
    contemplationPerTurn: 19,
    senzory: 15,
    diplomAPI: 16,
    icon: '👹',
    desc: 'Bájný obr z dílny, o které se vypráví jen šeptem. Nejpomalejší a nejodolnější kus železa na hoře.'
  },
  helena: {
    nameCz: 'HELena 77',
    maxActions: 20,
    maxTempt: 21,
    handSize: 5,
    temptationCleanup: 7,
    contemplationPerTurn: 20,
    senzory: 19,
    diplomAPI: 23,
    icon: '🔧',
    desc: 'Poctivý model staré školy, vyráběný roky beze změny. Nic extra, ale nikdy nezklame.'
  },
  ferda: {
    nameCz: 'Ferda Mk. III',
    maxActions: 23,
    maxTempt: 18,
    handSize: 5,
    temptationCleanup: 6,
    contemplationPerTurn: 17,
    senzory: 25,
    diplomAPI: 14,
    icon: '🐜',
    desc: 'Malý, hbitý a věčně v pohybu. Nejrychlejší nohy na hoře, křehký jako plech od konzervy.'
  },
  antonin: {
    nameCz: 'Antonín Turbo',
    maxActions: 22,
    maxTempt: 18,
    handSize: 5,
    temptationCleanup: 6,
    contemplationPerTurn: 16,
    senzory: 24,
    diplomAPI: 17,
    icon: '🏎️',
    desc: 'Závodní úprava s přeplňovaným krokem. Staví na rychlosti, ne na výdrži.'
  },
  babetta: {
    nameCz: 'Babetta Standard',
    maxActions: 20,
    maxTempt: 20,
    handSize: 5,
    temptationCleanup: 7,
    contemplationPerTurn: 20,
    senzory: 20,
    diplomAPI: 26,
    icon: '🛵',
    desc: 'Skromný, spolehlivý model pro každého. Nic vás nepřekvapí — v dobrém i špatném.'
  },
  zelva: {
    nameCz: 'Želva Expedice',
    maxActions: 19,
    maxTempt: 23,
    handSize: 5,
    temptationCleanup: 9,
    contemplationPerTurn: 23,
    senzory: 17,
    diplomAPI: 20,
    icon: '🐢',
    desc: 'Stavěný na dlouhé výpravy, ne na sprint. Pomalý krok, ale bezkonkurenční trpělivost a regenerace.'
  }
};

export const PATRONS: Record<string, PatronDef> = {
  carlo: {
    id: 'carlo',
    nameCz: 'Harini "Chromo" Thapa',
    bonusCz: '+5 Akcí každé kolo',
    flavourCz: 'Harini sedí v hamaku hluboko ve venušanské džungli — od Neptunu to je skoro celá sluneční soustava. Rychlá, pohotová.',
    reliability: 20
  },
  aquinas: {
    id: 'aquinas',
    nameCz: 'Dr. Soňa Krejčová',
    bonusCz: '+30% Protonová bublináž, +1 karta navíc',
    flavourCz: 'Dr. Krejčová přednáší z orbitální fakulty u Merkuru a tvůj výstup si pouští jako webinář.',
    reliability: 24
  },
  francis: {
    id: 'francis',
    nameCz: 'Miluše Ostrá',
    bonusCz: '+20% poškození entitám',
    flavourCz: 'Miluše ti řve do comms z nějaké bary na Ceresu. Do mecha by se neumastila.',
    reliability: 16
  },
  michael: {
    id: 'michael',
    nameCz: 'Kapitánka Jitka Pevná',
    bonusCz: 'Začni kolo s Holoklamem = 40 % Senzorů',
    flavourCz: 'Kapitánka Pevná velí z dispečinku u Saturnu a tvůj mech bere jako jednu z milionu ikonek.',
    reliability: 26
  },
  joseph: {
    id: 'joseph',
    nameCz: 'Bára Účetní',
    bonusCz: '+20% získaných Kreditů',
    flavourCz: 'Bára účtuje z kanceláře na Vesta Station. Výstup na Arx Prima má v tabulce.',
    reliability: 22
  },
  pio: {
    id: 'pio',
    nameCz: 'Zdena "Medička" Holá',
    bonusCz: 'Za zabití entity +2 Protonová bublináž',
    flavourCz: 'Zdena má ošetřovnu na Callistu a tvoje rány sleduje na zpožděném streamu.',
    reliability: 18
  },
  teresa: {
    id: 'teresa',
    nameCz: 'Táňa Reaktorová',
    bonusCz: 'Začni etapu s 1 Vyladěním, +1 k Zisku Vyladění',
    flavourCz: 'Táňa hlídá reaktory z měsíce u Urana a tvůj kotel bere jako dálkovou diagnostiku.',
    reliability: 20
  },
  ignatius: {
    id: 'ignatius',
    nameCz: 'Iva Klidná',
    bonusCz: 'Entity získávají o 25 % méně Agrese, +1 Omráčení',
    flavourCz: 'Iva meditace vysílá z klášterního habitatu nad oběžnou dráhou Země. Klidná a přesná.',
    reliability: 28
  },
  faustina: {
    id: 'faustina',
    nameCz: 'Nikola Odolná',
    bonusCz: '-20 % Kapoty z útoků, první overflow na půl',
    flavourCz: 'Nikola sedí v bunkru na Plutonu a tvrdí, že odtamtud je na Neptun skoro vedle.',
    reliability: 16
  },
  kolbe: {
    id: 'kolbe',
    nameCz: 'Karolína Krunýřová',
    bonusCz: '+35 % Holoklam, 25 % přeteče do dalšího kola',
    flavourCz: 'Karolína krunýře kreslí v doku u Jupitera. Holoklam ti nahrává jako firmware.',
    reliability: 14
  },
  anthony: {
    id: 'anthony',
    nameCz: 'Petra Sběračka',
    bonusCz: '+1 Kredit za zabití, 10 % sleva v obchodě',
    flavourCz: 'Petra sbírá trosky z pásu mezi Marsem a Jupiterem a tvoji horu má jako boční kanál.',
    reliability: 30
  },
  hynek: {
    id: 'hynek',
    nameCz: 'Hynek Setrvačný',
    bonusCz: 'Přenos Akcí 2:1, +3 Akce/kolo',
    flavourCz: 'Hynek točí setrvačník v hangáru na Vesta Station a tvrdí, že moment hybnosti se nevyhazuje.',
    reliability: 21
  },
  ondra: {
    id: 'ondra',
    nameCz: 'Ondřej "Převis" Hradil',
    bonusCz: 'Přenos Akcí 3:1 se zdvojí, +2 Akce/kolo',
    flavourCz: 'Ondřej účtuje převisy z kanceláře nad pásem asteroidů. Každou ušetřenou Akci si čárkuje.',
    reliability: 19
  }
};

export const PARTACI: Record<string, PartakDef> = {
  mavka: {
    id: 'mavka',
    nameCz: 'Mavka "Pavuk" Kovalenko',
    bonusCz: '+35 % max. Protonové bublináže a Reaktoru · Výsadek 20 · Zdraví 20',
    flavourCz: 'Je z Nového Kijiva na Marsu. Je ucházející bojovnice a skvělá odbornice na energetiku. Její dobrá nálada je pověstná - především tím, že nikdy nepřichází.',
    temptBonusPct: 0.35,
    mortalBonusPct: 0.35,
    vysadek: 20,
    zdravi: 20
  }
};

export const PATRON_BREAK_QUOTES: string[] = [
  'Máme míting. Vyřeš si to sám, já jsem o tři planety dál.',
  'Pauza na kávičku. Pravá pluto-arabica — a ping sem nenos.',
  'Myslíš, že budu viset na comms celou směnu? Kašlu na to.',
  'Tolik mi zase neplatí, abych ti hlídal každý schod.',
  'Je tu velký boss. Tvoje hora počká, moje povýšení ne.',
  'Sorry, zase to na mě přišlo. Střeva si nechám vyměnit, ty si zatím vystač beze mě.',
  'Promiň, zrovna vibekóduju appku. Signál ti nechávám na záznamníku.',
  'Latence z druhého konce soustavy. Já jdu na cigáro, ty lez.',
  'Remote support neznamená nonstop. Jdu pryč.'
];
