import React, { useState, useEffect, useRef } from 'react';
import { CardDef, DemonInstance, GameState, ScreenId } from './types/game';
import { CARD_DB, STARTING_DECK_IDS, findCardDef, resolveCardIntent } from './data/cards';
import { DEMON_ACTIONS, DEMON_STAT_SETS, STAGES } from './data/demonsAndStages';
import { HERO_STATS, PARTACI, PATRONS } from './data/heroesAndPatrons';
import { CockpitBezel } from './components/CockpitBezel';
import { CrtMonitor } from './components/CrtMonitor';
import { DefenseStrip } from './components/DefenseStrip';
import { PilotConsole } from './components/PilotConsole';
import { DiagnosticModal, NavigatorPortraitModal, PileInspectorModal } from './components/Modals';
import {
  FlavorScreen,
  TitleScreen,
  HeroSelectScreen,
  PatronSelectScreen,
  PartakSelectScreen,
  ShopScreen,
  ChoiceScreen,
  ServiceScreen,
  WinScreen,
  LoseScreen,
  StoryScreen,
  RoadmapScreen,
} from './components/SecondaryScreens';
import {
  isSoundEnabled,
  playCardPlaySound,
  playClickSound,
  playLaserSound,
  playShieldSound,
  toggleSound,
} from './utils/sound';

function createInitialGameState(heroId = 'bozhena', patronId = 'carlo', partakId = 'mavka'): GameState {
  const hero = HERO_STATS[heroId] || HERO_STATS.bozhena;
  const patron = PATRONS[patronId] || PATRONS.carlo;
  const partak = PARTACI[partakId] || PARTACI.mavka;

  let maxActions = hero.maxActions;
  let maxTempt = hero.maxTempt;
  let maxMortal = 20;

  if (patronId === 'carlo') maxActions += 5;
  if (patronId === 'aquinas') maxTempt = Math.round(maxTempt * 1.3);

  maxTempt = Math.round(maxTempt * (1 + partak.temptBonusPct));
  maxMortal = Math.round(maxMortal * (1 + partak.mortalBonusPct));

  const deck: CardDef[] = STARTING_DECK_IDS.map(id => findCardDef(id)!).filter(Boolean);

  return {
    tempt: maxTempt,
    venial: 20,
    mortal: maxMortal,
    actions: maxActions,
    maxActions: maxActions,
    maxTempt: maxTempt,
    maxVenial: 20,
    maxMortal: maxMortal,
    handSize: hero.handSize,
    banDamageMult: patronId === 'francis' ? 1.2 : 1,
    senzory: hero.senzory,
    diplomAPI: hero.diplomAPI,
    patron: patronId,
    patronName: patron.nameCz,
    partak: partakId,
    partakName: partak.nameCz,
    partakVysadek: partak.vysadek,
    partakZdravi: partak.zdravi,
    partakZdraviCurrent: partak.zdravi,
    hero: heroId,
    heroName: hero.nameCz,
    stage: 0,
    demonIndex: 0,
    scoutValue: 0,
    encounter: {
      slots: [],
      focusId: null,
      wave: 1,
      killsThisStage: 0,
      deathEchoUsed: false,
      viciousUsedThisTurn: false,
      appliedMaxTemptDrain: 0,
      appliedMaxVenialDrain: 0,
      appliedShieldCapDrain: 0,
      pendingCount: 0,
    },
    pendingEncounterCount: 0,
    bonusStageActive: false,
    bonusStage: null,
    choiceKillGraceBonus: 0,
    currentDemon: null,
    nextDemonAction: null,
    deck: deck,
    hand: [],
    discard: [],
    shield: patronId === 'michael' ? Math.round(hero.senzory * 0.4) : 0,
    gracePoints: 0,
    powerOfGod: patronId === 'teresa' ? 1 : 0,
    temptationCleanup: hero.temptationCleanup,
    startShield: patronId === 'michael' ? Math.round(hero.senzory * 0.4) : 0,
    graceGainMult: patronId === 'joseph' ? 1.2 : 1,
    powerOfGodStart: patronId === 'teresa' ? 1 : 0,
    demonAngerGainMult: patronId === 'ignatius' ? 0.75 : 1,
    venialGainMult: patronId === 'faustina' ? 0.8 : 1,
    shieldGainMult: patronId === 'kolbe' ? 1.35 : 1,
    stageClearGraceBonus: patronId === 'anthony' ? 1 : 0,
    shopPriceMult: patronId === 'anthony' ? 0.9 : 1,
    stunCardBonus: patronId === 'ignatius' ? 1 : 0,
    shieldPersistPct: patronId === 'kolbe' ? 0.25 : 0,
    overflowHalve: patronId === 'faustina',
    contemplation: 0,
    contemplationPerTurn: hero.contemplationPerTurn,
    turnCount: 0,
    cardEnhanceMult: 1,
    reliability: patron.reliability,
    patronBaseValues: {},
    patronBoostedValues: {},
    patronOnBreak: false,
    breakRoundsLeft: 0,
    breakQuote: '',
    justReturnedFromBreak: false,
    babiczkaCooldown: 0,
    babiczkaTargeting: false,
    babiczkaDmgMult: 1,
    pendingActionCarry: 0,
    lastActionCarry: 0,
    actionCarryDivisor: patronId === 'hynek' ? 2 : 3,
    actionCarryMult: patronId === 'ondra' ? 2 : 1,
    pendingChoiceEvent: null,
    nextDemonLevelBonus: 0,
    nextDemonAngerBonus: 0,
    nextDemonStunAdjust: 0,
    frostPenalty: null,
    actionBoost: null,
    handSizePenalty: null,
    lockedCardUid: null,
    pendingServiceBonus: 0,
    postChoiceServiceMode: false,
    runStats: {
      cardsPlayed: 0,
      enemiesKilled: 0,
      damageDealt: 0,
      damageTaken: 0,
      shieldAbsorbed: 0,
      creditsEarned: 0,
      creditsSpent: 0,
      shopBuys: 0,
      babiczkaUses: 0,
      patronBreaks: 0,
      bonusDetours: 0,
      services: 0,
      stagesCleared: 0,
      peakPower: 0,
      lowestMortal: 20,
    },
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('flavor-screen');
  const [game, setGame] = useState<GameState>(() => createInitialGameState());
  const [selectedHero, setSelectedHero] = useState('bozhena');
  const [selectedPatron, setSelectedPatron] = useState('carlo');
  const [combatLogs, setCombatLogs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [showPatronPortrait, setShowPatronPortrait] = useState(false);
  const [pileModal, setPileModal] = useState<{ title: string; cards: CardDef[] } | null>(null);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const [crtGlitch, setCrtGlitch] = useState(false);

  // Helper log function
  const addLog = (msg: string) => {
    setCombatLogs(prev => [msg, ...prev.slice(0, 35)]);
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2500);
  };

  const handleToggleSound = () => {
    const newVal = toggleSound();
    setSoundOn(newVal);
  };

  // Start new game run
  const startNewRun = (heroId = selectedHero, patronId = selectedPatron, partakId = 'mavka') => {
    const newG = createInitialGameState(heroId, patronId, partakId);
    setGame(newG);
    setCombatLogs([]);
    setCurrentScreen('game-screen');
    addLog(`Expedice začíná! Pilotuje ${newG.heroName}.`);
    addLog(`Navigátor: ${newG.patronName} je na dálkovém spojení.`);
    spawnStageDemons(newG, 0);
  };

  const spawnStageDemons = (gState: GameState, stageIndex: number) => {
    const stage = STAGES[stageIndex] || STAGES[0];
    const demons = stage.demons.map((proto, idx) => {
      const kw = proto.fixedKeyword || 'Striker';
      const stats = DEMON_STAT_SETS[kw] || DEMON_STAT_SETS.Striker;
      const dInstance: DemonInstance = {
        uid: `demon_${stageIndex}_${idx}_${Date.now()}`,
        name: proto.name,
        desc: proto.desc,
        keyword: kw,
        maxHp: stats.hp,
        hp: stats.hp,
        anger: 0,
        scale: 1,
        level: proto.fixedLevel || stageIndex + 1,
        levelMin: proto.fixedLevelMin || 1,
        traits: proto.fixedTraits || ['scales'],
        dmgTakenMult: 1,
        angerGainMult: 1,
        angerResistMult: 1,
        lifestealPct: 0,
        enrageCapBonus: 0,
        shieldResistMult: 1,
        hateHealMult: 1,
        hateGrowMult: 1,
        graceMult: 1,
        actionDrain: 0,
        scoutSuppressMult: 1,
        viciousStrikeChance: 0.1,
        skipActionChance: 0.05,
        shieldPierceRemaining: 0,
        actionDrainRamp: 0,
        hateOneShotHealPct: 0,
        hateOneShotHealUsed: false,
        reviveAvailable: false,
        revived: false,
        corrosion: 0,
        stunGainResistMult: 1,
        calmResistMult: 1,
        shieldCapDrain: 0,
        mortalBias: 0,
        deathEcho: 0,
        stunProc: 0,
        rageDelay: 0,
        graceOnHit: 0,
        handLock: false,
        packHunterPct: 0,
        coreTempt: stats.temptDmg,
        coreVenial: stats.venialDmg,
        coreMortal: stats.mortalDmg,
        baseTempt: stats.temptDmg,
        baseVenial: stats.venialDmg,
        baseMortal: stats.mortalDmg,
        combatRound: 0,
        scoutRageBonus: 0,
        rageMult: 1,
        rageWarned: false,
        stunBar: 0,
        stunThreshold: stats.stun || 8,
        stunned: false,
        nextAction: DEMON_ACTIONS[0],
      };
      return dInstance;
    });

    const activeDemon = demons[0];
    const initialDeck = [...gState.deck].sort(() => 0.5 - Math.random());
    const initialHand = initialDeck.slice(0, gState.handSize);
    const remainingDeck = initialDeck.slice(gState.handSize);

    setGame(prev => ({
      ...prev,
      stage: stageIndex,
      demonIndex: 0,
      currentDemon: activeDemon,
      nextDemonAction: DEMON_ACTIONS[0],
      deck: remainingDeck,
      hand: initialHand,
      discard: [],
      actions: prev.maxActions,
      encounter: {
        ...prev.encounter,
        slots: demons,
        focusId: activeDemon.uid,
      },
    }));

    addLog(`Etapa ${stageIndex + 1}: ${stage.name}`);
    addLog(`Objevuje se ${activeDemon.name}!`);
  };

  // Play a card
  const handlePlayCard = (cardIdx: number) => {
    const card = game.hand[cardIdx];
    if (!card || game.actions < card.cost) return;

    playCardPlaySound();
    let dmgToDeal = 0;
    let temptGain = 0;
    let venialGain = 0;
    let shieldGain = 0;
    let drawCount = 0;
    let stunGain = 0;
    let reduceAngerAmt = 0;

    const txt = card.text;
    const dmgMatch = txt.match(/Zraň za (\d+)/);
    if (dmgMatch) dmgToDeal = parseInt(dmgMatch[1], 10);

    const temptMatch = txt.match(/(?:Doplň|a) Protonovou bublináž o (\d+)/);
    if (temptMatch) temptGain = parseInt(temptMatch[1], 10);

    const venialMatch = txt.match(/(?:Doplň|a) Kapotu o (\d+)/);
    if (venialMatch) venialGain = parseInt(venialMatch[1], 10);

    const shieldMatch = txt.match(/Získej (\d+) bod(?:y|ů) Holoklam/);
    if (shieldMatch) shieldGain = parseInt(shieldMatch[1], 10);

    const drawMatch = txt.match(/Lízni (\d+) kart/);
    if (drawMatch) drawCount = parseInt(drawMatch[1], 10);

    const stunMatch = txt.match(/Zvyš Omráčení entity o (\d+)/);
    if (stunMatch) stunGain = parseInt(stunMatch[1], 10);

    const angerMatch = txt.match(/Sniž Agresi entity o (\d+)/);
    if (angerMatch) reduceAngerAmt = parseInt(angerMatch[1], 10);

    // Apply Ručičky multiplier
    const enhance = card.enhanced
      ? 1 + Math.min(0.5, (card.contemplationStacks || 1) * (game.contemplationPerTurn / 100))
      : 1;

    let finalDmg = Math.round(dmgToDeal * enhance);
    if (finalDmg > 0) {
      finalDmg += game.powerOfGod;
      finalDmg = Math.round(finalDmg * (game.banDamageMult || 1));
      playLaserSound();
      setCrtGlitch(true);
      setTimeout(() => setCrtGlitch(false), 250);
    }

    if (shieldGain > 0) playShieldSound();

    setGame(prev => {
      const newActions = prev.actions - card.cost;
      const newHand = [...prev.hand];
      newHand.splice(cardIdx, 1);
      const newDiscard = [...prev.discard, { ...card, enhanced: false, contemplationStacks: 0 }];

      let curDemon = prev.currentDemon ? { ...prev.currentDemon } : null;
      let newGrace = prev.gracePoints;

      if (curDemon && finalDmg > 0) {
        curDemon.hp = Math.max(0, curDemon.hp - finalDmg);
        curDemon.stunBar = (curDemon.stunBar || 0) + finalDmg + stunGain;
        if (curDemon.stunBar >= curDemon.stunThreshold) {
          curDemon.stunBar = 0;
          curDemon.stunned = true;
          curDemon.stunThreshold = curDemon.stunThreshold * 2;
          addLog(`${curDemon.name} byla ochromena!`);
        }
      }

      if (curDemon && reduceAngerAmt > 0) {
        curDemon.anger = Math.max(0, curDemon.anger - reduceAngerAmt);
      }

      // Check if enemy died
      if (curDemon && curDemon.hp <= 0) {
        addLog(`💥 ${curDemon.name} byla zničena!`);
        newGrace += 4;
        const nextIdx = prev.demonIndex + 1;
        const stage = STAGES[prev.stage];
        if (stage && nextIdx < stage.demons.length) {
          // Next demon
          const nextProto = stage.demons[nextIdx];
          const kw = nextProto.fixedKeyword || 'Devil';
          const stats = DEMON_STAT_SETS[kw] || DEMON_STAT_SETS.Devil;
          curDemon = {
            ...curDemon,
            uid: `demon_${prev.stage}_${nextIdx}_${Date.now()}`,
            name: nextProto.name,
            desc: nextProto.desc,
            keyword: kw,
            maxHp: stats.hp,
            hp: stats.hp,
            anger: 0,
            level: nextProto.fixedLevel || prev.stage + 1,
            stunBar: 0,
            stunThreshold: stats.stun || 8,
            stunned: false,
          };
          addLog(`Objevuje se nový nepřítel: ${curDemon.name}!`);
        } else {
          // Stage cleared!
          curDemon = null;
          addLog(`Etapa ${prev.stage + 1} dokončena!`);
          setTimeout(() => {
            if (prev.stage >= STAGES.length - 1) {
              setCurrentScreen('win-screen');
            } else {
              setCurrentScreen('choice-screen');
            }
          }, 600);
        }
      }

      // Handle card draw
      let deckCopy = [...prev.deck];
      let discardCopy = [...newDiscard];
      for (let d = 0; d < drawCount; d++) {
        if (deckCopy.length === 0) {
          if (discardCopy.length === 0) break;
          deckCopy = [...discardCopy].sort(() => 0.5 - Math.random());
          discardCopy = [];
        }
        newHand.push(deckCopy.pop()!);
      }

      const newTempt = Math.min(prev.maxTempt, prev.tempt + Math.round(temptGain * enhance));
      const newVenial = Math.min(prev.maxVenial, prev.venial + Math.round(venialGain * enhance));
      const newShield = Math.min(prev.senzory, (prev.shield || 0) + Math.round(shieldGain * enhance));

      return {
        ...prev,
        actions: newActions,
        hand: newHand,
        deck: deckCopy,
        discard: discardCopy,
        tempt: newTempt,
        venial: newVenial,
        shield: newShield,
        currentDemon: curDemon,
        gracePoints: newGrace,
      };
    });

    addLog(`Zahráno: ${card.name}`);
  };

  // Play card with BabiCZka
  const handlePlayWithBabiczka = (cardIdx: number) => {
    setGame(prev => ({ ...prev, babiczkaTargeting: false, babiczkaCooldown: 2 }));
    addLog('📡 BabiCZka asistuje — masivní posílení úderu!');
    handlePlayCard(cardIdx);
  };

  // End turn & enemy attacks
  const handleEndTurn = () => {
    playClickSound();
    const curD = game.currentDemon;

    setGame(prev => {
      let tDmg = 0;
      let vDmg = 0;
      let mDmg = 0;

      if (curD && !curD.stunned) {
        const act = prev.nextDemonAction || DEMON_ACTIONS[0];
        if (act.type === 'attack') {
          tDmg = Math.round((curD.baseTempt || 8) * (1 + curD.anger * 0.08) * curD.rageMult);
          vDmg = Math.round((curD.baseVenial || 0) * (1 + curD.anger * 0.08));
          mDmg = Math.round((curD.baseMortal || 0) * (1 + curD.anger * 0.08));
        } else if (act.type === 'enrage') {
          curD.anger += 8;
          addLog(`${curD.name} se rozzuřuje! (+8 Agrese)`);
        } else if (act.type === 'hate') {
          curD.hp = Math.min(curD.maxHp, curD.hp + 6);
          addLog(`${curD.name} používá Trvalou zlobu (+6 Zdraví)`);
        } else if (act.type === 'scout') {
          tDmg = Math.round((curD.baseTempt || 6) * 0.4);
          addLog(`${curD.name} provádí Bojový průzkum`);
        }
      } else if (curD && curD.stunned) {
        curD.stunned = false;
        addLog(`${curD.name} byla ochromena a vynechala tah!`);
      }

      // Absorb damage with Holoklam first
      let currentShield = prev.shield || 0;
      if (currentShield > 0) {
        const bite = Math.min(currentShield, tDmg + vDmg + mDmg);
        currentShield -= bite;
        tDmg = Math.max(0, tDmg - bite);
        addLog(`Holoklam pohltil ${bite} poškození.`);
      }

      // Damage overflow pipeline: Bublináž -> Kapota -> Reaktor
      let currentTempt = prev.tempt;
      let currentVenial = prev.venial;
      let currentMortal = prev.mortal;

      const tBite = Math.min(currentTempt, tDmg);
      currentTempt -= tBite;
      let overflow = tDmg - tBite;

      const vBite = Math.min(currentVenial, vDmg + overflow);
      currentVenial -= vBite;
      overflow = (vDmg + overflow) - vBite;

      const mBite = Math.min(currentMortal, mDmg + overflow);
      currentMortal -= mBite;

      if (tBite > 0) addLog(`Nepřítel zasáhl Protonovou bublináž (-${tBite})`);
      if (vBite > 0) addLog(`Poškození prorazilo do Kapoty (-${vBite})`);
      if (mBite > 0) addLog(`⚠️ REAKTOR POŠKOZEN (-${mBite})!`);

      // Check defeat
      if (currentMortal <= 0) {
        setTimeout(() => setCurrentScreen('lose-screen'), 600);
      }

      // Roll next demon action
      const rollIdx = Math.floor(Math.random() * DEMON_ACTIONS.length);
      const nextAct = DEMON_ACTIONS[rollIdx];

      // Draw cards up to handSize
      let deckCopy = [...prev.deck];
      let discardCopy = [...prev.discard];
      let handCopy = [...prev.hand];

      // Mark unplayed cards as enhanced by Ručičky
      handCopy = handCopy.map(c => ({
        ...c,
        enhanced: true,
        contemplationStacks: Math.min(3, (c.contemplationStacks || 0) + 1),
      }));

      while (handCopy.length < prev.handSize) {
        if (deckCopy.length === 0) {
          if (discardCopy.length === 0) break;
          deckCopy = [...discardCopy].sort(() => 0.5 - Math.random());
          discardCopy = [];
        }
        handCopy.push(deckCopy.pop()!);
      }

      // Cool down BabiCZka
      const cd = Math.max(0, prev.babiczkaCooldown - 1);

      return {
        ...prev,
        actions: prev.maxActions,
        shield: currentShield,
        tempt: currentTempt,
        venial: currentVenial,
        mortal: currentMortal,
        deck: deckCopy,
        discard: discardCopy,
        hand: handCopy,
        babiczkaCooldown: cd,
        nextDemonAction: nextAct,
        currentDemon: curD,
        turnCount: prev.turnCount + 1,
      };
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0a08] text-[#eafcff] font-['IBM_Plex_Sans'] overflow-x-hidden">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-24 inset-x-4 z-50 flex justify-center pointer-events-none">
          <div className="bg-[#0e1626]/95 border border-[#1fb8ae] text-[#eafcff] px-4 py-2 rounded-xl text-xs sm:text-sm font-mono shadow-2xl animate-fade-in max-w-md text-center">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Screen Router */}
      {currentScreen === 'flavor-screen' && (
        <FlavorScreen onContinue={() => setCurrentScreen('title-screen')} />
      )}

      {currentScreen === 'title-screen' && (
        <TitleScreen
          onNewGame={() => setCurrentScreen('hero-screen')}
          onQuickStart={(random) => {
            if (random) {
              const heroes = Object.keys(HERO_STATS);
              const patrons = Object.keys(PATRONS);
              const rHero = heroes[Math.floor(Math.random() * heroes.length)];
              const rPatron = patrons[Math.floor(Math.random() * patrons.length)];
              startNewRun(rHero, rPatron, 'mavka');
            } else {
              startNewRun('bozhena', 'carlo', 'mavka');
            }
          }}
          onOpenTutorial={() => startNewRun('bozhena', 'carlo', 'mavka')}
          onOpenMovie={() => startNewRun('bozhena', 'carlo', 'mavka')}
          onOpenScreen={(scr) => setCurrentScreen(scr)}
        />
      )}

      {currentScreen === 'hero-screen' && (
        <HeroSelectScreen
          onSelect={(id) => {
            setSelectedHero(id);
            setCurrentScreen('patron-screen');
          }}
          onBack={() => setCurrentScreen('title-screen')}
        />
      )}

      {currentScreen === 'patron-screen' && (
        <PatronSelectScreen
          onSelect={(id) => {
            setSelectedPatron(id);
            setCurrentScreen('partak-screen');
          }}
          onBack={() => setCurrentScreen('hero-screen')}
        />
      )}

      {currentScreen === 'partak-screen' && (
        <PartakSelectScreen
          onSelect={(id) => startNewRun(selectedHero, selectedPatron, id)}
          onBack={() => setCurrentScreen('patron-screen')}
        />
      )}

      {currentScreen === 'shop-screen' && (
        <ShopScreen
          gracePoints={game.gracePoints}
          onBuyCard={(card, price) => {
            setGame(prev => ({
              ...prev,
              gracePoints: prev.gracePoints - price,
              deck: [...prev.deck, card],
            }));
            addLog(`Zakoupeno: ${card.name} do balíčku.`);
          }}
          onContinue={() => {
            const nextStage = game.stage + 1;
            setCurrentScreen('game-screen');
            spawnStageDemons(game, nextStage);
          }}
        />
      )}

      {currentScreen === 'choice-screen' && (
        <ChoiceScreen
          onSelectOption={(type, label) => {
            addLog(`Zvoleno: ${label}`);
            if (type === 'shop') setCurrentScreen('shop-screen');
            else if (type === 'service') setCurrentScreen('confession-screen');
            else {
              const nextSt = game.stage + 1;
              setCurrentScreen('game-screen');
              spawnStageDemons(game, nextSt);
            }
          }}
        />
      )}

      {currentScreen === 'confession-screen' && (
        <ServiceScreen
          onService={() => {
            setGame(prev => ({
              ...prev,
              mortal: prev.maxMortal,
              venial: prev.maxVenial,
              tempt: prev.maxTempt,
            }));
            addLog('🛠️ Servis dokončen! Všechny vrstvy plně opraveny.');
            const nextSt = game.stage + 1;
            setCurrentScreen('game-screen');
            spawnStageDemons(game, nextSt);
          }}
          onBack={() => setCurrentScreen('choice-screen')}
        />
      )}

      {currentScreen === 'win-screen' && (
        <WinScreen onRestart={() => setCurrentScreen('title-screen')} />
      )}

      {currentScreen === 'lose-screen' && (
        <LoseScreen onRestart={() => setCurrentScreen('title-screen')} />
      )}

      {currentScreen === 'story-screen' && (
        <StoryScreen onBack={() => setCurrentScreen('title-screen')} />
      )}

      {currentScreen === 'roadmap-screen' && (
        <RoadmapScreen onBack={() => setCurrentScreen('title-screen')} />
      )}

      {/* Main Gameplay Cockpit Screen */}
      {currentScreen === 'game-screen' && (
        <div id="game-screen" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
          {/* Cockpit Shell Layer with Rust, Rivets & Krteček Sticker */}
          <CockpitBezel
            heroName={game.heroName}
            patronName={game.patronName}
            patronPortraitUrl={PATRONS[game.patron]?.portraitUrl}
            onOpenPatronPortrait={() => setShowPatronPortrait(true)}
            stageName={STAGES[game.stage]?.name || 'Arx Prima'}
            stageNum={game.stage + 1}
            stageTotal={STAGES.length}
            soundEnabled={soundOn}
            onToggleSound={handleToggleSound}
            onOpenLog={() => {
              setPileModal({
                title: 'Záznam boje',
                cards: [],
              });
            }}
          />

          {/* Main Cockpit Interior Area */}
          <div className="relative z-10 flex-1 flex flex-col max-w-2xl mx-auto w-full px-3 sm:px-4 pt-12 pb-2">
            {/* Top Stage Bar */}
            <div className="text-center mb-1">
              <span className="font-['Goldman'] text-xs sm:text-sm text-[#f3d48a] font-bold tracking-wider drop-shadow">
                {STAGES[game.stage]?.name || 'Neznámý sektor'}
              </span>
            </div>

            {/* Central Tactical CRT Screen (Enemy on cockpit screen!) */}
            <CrtMonitor
              currentDemon={game.currentDemon}
              livingDemons={game.encounter.slots.filter(d => d.hp > 0)}
              focusedUid={game.encounter.focusId}
              nextDemonAction={game.nextDemonAction}
              onSelectFocus={(uid) => {
                const target = game.encounter.slots.find(d => d.uid === uid);
                if (target) {
                  setGame(prev => ({
                    ...prev,
                    currentDemon: target,
                    encounter: { ...prev.encounter, focusId: uid },
                  }));
                }
              }}
              onOpenDetails={() => setShowDiagnostic(true)}
              onShowKorozeInfo={(e) => {
                e.stopPropagation();
                addLog('Koroze: každé kolo ubírá zdraví podle stohů.');
              }}
              hitGlitch={crtGlitch}
            />

            {/* 4 Defense Layers Pipeline (Holoklam -> Bublináž -> Kapota -> Reaktor) */}
            <DefenseStrip
              game={game}
              onShowShieldInfo={() => addLog('Holoklam: holografická clona, co pohlcuje první poškození.')}
              onShowTemptInfo={() => addLog('Bublináž: primární štít z protonových bublin.')}
              onShowVenialInfo={() => addLog('Kapota: vnější pancíř a karoserie mecha.')}
              onShowMortalInfo={() => addLog('Reaktor: jádro mecha. Na nule výstup končí!')}
            />
          </div>

          {/* Pilot Thumb Zone: Console & Hand */}
          <PilotConsole
            game={game}
            onPlayCard={handlePlayCard}
            onPlayWithBabiczka={handlePlayWithBabiczka}
            onToggleBabiczka={() => {
              if (game.babiczkaCooldown > 0) return;
              setGame(prev => ({ ...prev, babiczkaTargeting: !prev.babiczkaTargeting }));
            }}
            onEndTurn={handleEndTurn}
            onOpenRuka={() => setPileModal({ title: 'Karty v ruce', cards: game.hand })}
            onOpenBalicek={() => setPileModal({ title: 'Dobírací balíček', cards: game.deck })}
            onOpenZahaz={() => setPileModal({ title: 'Odkládací balíček', cards: game.discard })}
            onShowActionsInfo={() => addLog('Akce: počet bodů na hraní karet pro toto kolo.')}
            onShowPowerInfo={() => addLog('Vyladění: trvalé navýšení útočné síly pro tuto etapu.')}
            onShowBabiczkaInfo={() => addLog('BabiCZka: satelitní zaměření, které zdvojnásobí zranění!')}
          />

          {/* Diagnostic Modal */}
          {showDiagnostic && (
            <DiagnosticModal
              demon={game.currentDemon}
              livingDemons={game.encounter.slots.filter(d => d.hp > 0)}
              onClose={() => setShowDiagnostic(false)}
              onSelectFocus={(uid) => {
                const target = game.encounter.slots.find(d => d.uid === uid);
                if (target) {
                  setGame(prev => ({
                    ...prev,
                    currentDemon: target,
                    encounter: { ...prev.encounter, focusId: uid },
                  }));
                }
              }}
            />
          )}

          {/* Pile Inspector Modal */}
          {pileModal && (
            <PileInspectorModal
              title={pileModal.title}
              cards={pileModal.cards}
              onClose={() => setPileModal(null)}
            />
          )}

          {/* Navigator Comms Portrait Modal */}
          {showPatronPortrait && (
            <NavigatorPortraitModal
              patron={PATRONS[game.patron] || PATRONS.carlo}
              onClose={() => setShowPatronPortrait(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
