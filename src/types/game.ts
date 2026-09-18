export type ScreenId =
  | 'flavor-screen'
  | 'title-screen'
  | 'hero-screen'
  | 'patron-screen'
  | 'partak-screen'
  | 'game-screen'
  | 'discard-screen'
  | 'ruka-screen'
  | 'balicek-screen'
  | 'zahaz-screen'
  | 'shop-screen'
  | 'choice-screen'
  | 'confession-screen'
  | 'win-screen'
  | 'lose-screen'
  | 'options-screen'
  | 'story-screen'
  | 'roadmap-screen';

export type CardType = 'prayer' | 'virtue' | 'sacrament' | 'saint' | 'scripture' | 'special';
export type CardKind = 'attack' | 'shield' | 'repair' | 'draw' | 'special';
export type CardIntent = 'focus' | 'splash' | 'row';

export interface CardDef {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  text: string;
  priceMult?: number;
  noShop?: boolean;
  intent?: CardIntent;
  stars?: number;
  enhanced?: boolean;
  contemplationStacks?: number;
  uid?: string;
}

export interface DemonActionDef {
  name: string;
  type: 'attack' | 'enrage' | 'hate' | 'scout' | 'reprisal' | 'bulwark';
  chance: number;
  angerGain?: number;
}

export interface TraitDef {
  name: string;
  desc: string;
  dmgTakenMult?: number;
  hpMult?: number;
  dmgDealtMult?: number;
  angerGainMult?: number;
  angerResistMult?: number;
  venialDealtMult?: number;
  lifestealPct?: number;
  enrageCapBonus?: number;
  temptDealtMult?: number;
  shieldResistMult?: number;
  hateHealMult?: number;
  hateGrowMult?: number;
  graceMult?: number;
  actionDrain?: number;
  startAnger?: number;
  stunThresholdMult?: number;
  scoutSuppressMult?: number;
  viciousStrikeChance?: number;
  skipActionChance?: number;
  shieldPierceOnSpawn?: boolean;
  actionDrainRamp?: number;
  maxTemptDrain?: number;
  maxVenialDrain?: number;
  hateOneShotHealPct?: number;
  reviveOnce?: boolean;
  drawPenaltyOnce?: number;
  stunGainResistMult?: number;
  calmResistMult?: number;
  shieldCapDrain?: number;
  mortalBias?: number;
  deathEcho?: number;
  stunProc?: number;
  rageDelay?: number;
  graceOnHit?: number;
  handLock?: boolean;
  packHunterPct?: number;
}

export interface DemonInstance {
  uid: string;
  name: string;
  desc: string;
  keyword: string;
  maxHp: number;
  hp: number;
  anger: number;
  scale: number;
  level: number;
  levelMin: number;
  traits: string[];
  dmgTakenMult: number;
  angerGainMult: number;
  angerResistMult: number;
  lifestealPct: number;
  enrageCapBonus: number;
  shieldResistMult: number;
  hateHealMult: number;
  hateGrowMult: number;
  graceMult: number;
  actionDrain: number;
  scoutSuppressMult: number;
  viciousStrikeChance: number;
  skipActionChance: number;
  shieldPierceRemaining: number;
  actionDrainRamp: number;
  hateOneShotHealPct: number;
  hateOneShotHealUsed: boolean;
  reviveAvailable: boolean;
  revived: boolean;
  corrosion: number;
  stunGainResistMult: number;
  calmResistMult: number;
  shieldCapDrain: number;
  mortalBias: number;
  deathEcho: number;
  stunProc: number;
  rageDelay: number;
  graceOnHit: number;
  handLock: boolean;
  packHunterPct: number;
  coreTempt: number;
  coreVenial: number;
  coreMortal: number;
  baseTempt: number;
  baseVenial: number;
  baseMortal: number;
  combatRound: number;
  scoutRageBonus: number;
  rageMult: number;
  rageWarned: boolean;
  stunBar: number;
  stunThreshold: number;
  stunned: boolean;
  nextAction?: DemonActionDef | null;
  role?: 'line' | 'support' | 'artillery';
  budgetApplied?: boolean;
  pendingMaxTemptDrain?: number;
  pendingMaxVenialDrain?: number;
  pendingShieldCapDrain?: number;
  queueIndex?: number;
  reprisalActive?: boolean;
  bulwarkActive?: boolean;
  bulwarkUsed?: boolean;
  mortalOpened?: boolean;
  _resolvedDead?: boolean;
}

export interface StageDef {
  name: string;
  biome: 'plain' | 'canyon' | 'cliffs' | 'darkside' | 'summit' | 'orbital' | 'palace';
  demons: Array<{
    name: string;
    desc: string;
    keyword?: string;
    fixedKeyword?: string;
    fixedTraits?: string[];
    fixedLevelMin?: number;
    fixedLevel?: number;
    traitCount?: number;
    hpMult?: number;
    rageDelay?: number;
    hp?: number;
    temptDmg?: number;
    venialDmg?: number;
    mortalDmg?: number;
    stun?: number;
    levelMin?: number;
    level?: number;
  }>;
}

export interface HeroDef {
  nameCz: string;
  maxActions: number;
  maxTempt: number;
  handSize: number;
  temptationCleanup: number;
  contemplationPerTurn: number;
  senzory: number;
  diplomAPI: number;
  icon: string;
  desc: string;
}

export interface PatronDef {
  id: string;
  nameCz: string;
  bonusCz: string;
  flavourCz: string;
  reliability: number;
  portraitUrl?: string;
  portraitFullUrl?: string;
}

export interface PartakDef {
  id: string;
  nameCz: string;
  bonusCz: string;
  flavourCz: string;
  temptBonusPct: number;
  mortalBonusPct: number;
  vysadek: number;
  zdravi: number;
}

export interface GameRunStats {
  cardsPlayed: number;
  enemiesKilled: number;
  damageDealt: number;
  damageTaken: number;
  shieldAbsorbed: number;
  creditsEarned: number;
  creditsSpent: number;
  shopBuys: number;
  babiczkaUses: number;
  patronBreaks: number;
  bonusDetours: number;
  services: number;
  stagesCleared: number;
  peakPower: number;
  lowestMortal: number;
}

export interface GameState {
  tempt: number;
  venial: number;
  mortal: number;
  actions: number;
  maxActions: number;
  maxTempt: number;
  maxVenial: number;
  maxMortal: number;
  handSize: number;
  banDamageMult: number;
  senzory: number;
  diplomAPI: number;
  patron: string;
  patronName: string;
  partak: string;
  partakName: string;
  partakVysadek: number;
  partakZdravi: number;
  partakZdraviCurrent: number;
  hero: string;
  heroName: string;
  stage: number;
  demonIndex: number;
  scoutValue: number;
  encounter: {
    slots: DemonInstance[];
    focusId: string | null;
    wave: number;
    killsThisStage: number;
    deathEchoUsed: boolean;
    viciousUsedThisTurn: boolean;
    appliedMaxTemptDrain: number;
    appliedMaxVenialDrain: number;
    appliedShieldCapDrain: number;
    pendingCount: number | null;
  };
  pendingEncounterCount: number;
  bonusStageActive: boolean;
  bonusStage: StageDef | null;
  choiceKillGraceBonus: number;
  currentDemon: DemonInstance | null;
  nextDemonAction: DemonActionDef | null;
  deck: CardDef[];
  hand: CardDef[];
  discard: CardDef[];
  shield: number;
  gracePoints: number;
  powerOfGod: number;
  temptationCleanup: number;
  startShield: number;
  graceGainMult: number;
  powerOfGodStart: number;
  demonAngerGainMult: number;
  venialGainMult: number;
  shieldGainMult: number;
  stageClearGraceBonus: number;
  shopPriceMult: number;
  stunCardBonus: number;
  shieldPersistPct: number;
  overflowHalve: boolean;
  overflowHalveRemaining?: boolean;
  contemplation: number;
  contemplationPerTurn: number;
  turnCount: number;
  cardEnhanceMult: number;
  activeCardIntent?: CardIntent;
  reliability: number;
  patronBaseValues: any;
  patronBoostedValues: any;
  patronOnBreak: boolean;
  breakRoundsLeft: number;
  breakQuote: string;
  justReturnedFromBreak: boolean;
  babiczkaCooldown: number;
  babiczkaTargeting: boolean;
  babiczkaDmgMult: number;
  pendingActionCarry: number;
  lastActionCarry: number;
  actionCarryDivisor: number;
  actionCarryMult: number;
  pendingChoiceEvent: any | null;
  nextDemonLevelBonus: number;
  nextDemonAngerBonus: number;
  nextDemonStunAdjust: number;
  frostPenalty: { turnsLeft: number; actionPenalty: number } | null;
  actionBoost: { turnsLeft: number; actionBonus: number } | null;
  handSizePenalty: { turnsLeft: number; amount: number } | null;
  lockedCardUid: string | null;
  pendingServiceBonus: number;
  postChoiceServiceMode: boolean;
  pendingDrawPenalty?: number;
  tutorial?: boolean;
  tutorialPart?: number;
  tutorialStep?: number;
  tutorialForceCategory?: string[] | null;
  tutorialForceEndTurn?: boolean;
  tutorialDemonSpawned?: boolean;
  tutorialChecklist?: Record<string, boolean>;
  tutorialChecklistNotified?: Record<string, boolean>;
  tutorialAwaitingChoice?: boolean;
  tutorialShopSeen?: boolean;
  tutorialPurchasedCards?: string[];
  movie?: boolean;
  movieStepIndex?: number;
  movieActionDone?: boolean;
  runStats: GameRunStats;
}
