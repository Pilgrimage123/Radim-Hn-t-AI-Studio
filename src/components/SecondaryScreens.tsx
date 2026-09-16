import React from 'react';
import { CardDef, HeroDef, PartakDef, PatronDef, ScreenId } from '../types/game';
import { HERO_STATS, PARTACI, PATRONS } from '../data/heroesAndPatrons';
import { classifyCardKind, CARD_KIND_META, starEmoji, starPriceMult } from '../data/cards';
export * from './GameAuxScreens';

export const FlavorScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div
      id="flavor-screen"
      onClick={onContinue}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-black text-[#d9a441] overflow-hidden cursor-pointer select-none"
    >
      <div className="absolute top-4 text-center font-['Goldman'] text-xs tracking-widest text-[#d9a441]/80">
        ARX PRIMA • KABINA RH-07 • NEPTUN
      </div>

      <div className="max-w-xl text-center font-['Goldman'] text-lg sm:text-2xl leading-relaxed space-y-6 animate-[pulse_4s_ease-in-out_infinite] px-4">
        <p>Bývali Čechové, bývali rekové… Jako poslední ze svého slavného plemene vyrazíš k Arx Prima, nejvyšší hoře Neptunu, do sídla excentrického boháče posedlého písmenem Y.</p>
        <p>Nahodíš si rezavějícího mecha a dáš dohromady malý tým, který ti bude krýt záda.</p>
        <p>Tvůj mech – kráčející průzkumník i bojový robot, uvnitř asi tak prostorný jako obývák v paneláku – jde za jediným cílem: poslední basou plzeňského piva na vrcholu.</p>
        <p>Bez boje se neobejdeš a jen modravá metanová oblaka vědí, jaká překvapení tě na umělé hoře vydupané z oceánu čekají.</p>
      </div>

      <div className="absolute bottom-6 text-sm text-slate-400 font-mono animate-bounce">
        Klepnutím pokračuj →
      </div>
    </div>
  );
};

interface TitleScreenProps {
  onContinueRun?: () => void;
  hasSavedRun?: boolean;
  onNewGame: () => void;
  onQuickStart: (random: boolean) => void;
  onOpenTutorial: () => void;
  onOpenMovie: () => void;
  onOpenScreen: (screen: ScreenId) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onContinueRun,
  hasSavedRun,
  onNewGame,
  onQuickStart,
  onOpenTutorial,
  onOpenMovie,
  onOpenScreen,
}) => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div
      id="title-screen"
      className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[#0b0a08] overflow-hidden text-center select-none"
    >
      {/* Background cockpit illustration */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125 brightness-75"
        style={{
          backgroundImage: 'url("/src/assets/images/mecha_cockpit_bg_1789581095669.jpg")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#140f0b]/80 to-black/95" />

      {/* Main Title Banner */}
      <div className="relative z-10 max-w-lg w-full px-4 mb-6">
        <div className="text-3xl sm:text-4xl mb-2">🇨🇿🍺</div>
        <h1 className="font-['Goldman'] text-2xl sm:text-4xl font-bold tracking-wider text-[#d9a441] drop-shadow-[0_0_15px_rgba(217,164,65,0.6)] leading-tight mb-2">
          Radim Hnát, poslední Čech
        </h1>
        <p className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-widest mb-6">
          Retro sci-fi expedice na Arx Prima // Mech BOZhena 2026
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
          {hasSavedRun && onContinueRun && (
            <button
              type="button"
              onClick={onContinueRun}
              className="py-3 px-4 rounded-xl font-['Goldman'] text-sm sm:text-base font-bold uppercase text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 shadow-lg"
            >
              ▶️ Pokračovat ve výstupu
            </button>
          )}

          <button
            type="button"
            onClick={onNewGame}
            className="py-3 px-4 rounded-xl font-['Goldman'] text-sm sm:text-base font-bold uppercase text-black bg-gradient-to-r from-[#f3d48a] via-[#d9a441] to-[#b88628] hover:brightness-110 shadow-lg"
          >
            🏔️ Vyrazit na horu
          </button>

          <button
            type="button"
            onClick={() => onQuickStart(false)}
            className="py-2.5 px-4 rounded-xl font-['Goldman'] text-xs sm:text-sm font-bold uppercase text-white bg-[#241a12] border border-[#d9a441] hover:bg-[#342418] shadow"
          >
            ⚡ Rychlý start
          </button>

          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="py-1.5 text-xs font-mono text-slate-400 hover:text-white"
          >
            {showMore ? '▲ Méně voleb' : '▼ Více možností'}
          </button>

          {showMore && (
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-700/50">
              <button
                type="button"
                onClick={onOpenTutorial}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-[#1a1c2d] border border-cyan-500/60 text-cyan-300 hover:bg-[#262940]"
              >
                🎓 Tutoriál
              </button>
              <button
                type="button"
                onClick={onOpenMovie}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-[#1a1c2d] border border-cyan-500/60 text-cyan-300 hover:bg-[#262940]"
              >
                🎬 Video tutoriál
              </button>
              <button
                type="button"
                onClick={() => onQuickStart(true)}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-[#241a12] border border-slate-600 text-slate-300 hover:bg-[#342418]"
              >
                🎲 Rychlý start (náhoda)
              </button>
              <button
                type="button"
                onClick={() => onOpenScreen('story-screen')}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-[#241a12] border border-slate-600 text-slate-300 hover:bg-[#342418]"
              >
                📖 Příběh
              </button>
              <button
                type="button"
                onClick={() => onOpenScreen('options-screen')}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-[#241a12] border border-slate-600 text-slate-300 hover:bg-[#342418]"
              >
                ⚙️ Volby
              </button>
              <button
                type="button"
                onClick={() => onOpenScreen('roadmap-screen')}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-[#241a12] border border-slate-600 text-slate-300 hover:bg-[#342418]"
              >
                📋 Plán změn
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const HeroSelectScreen: React.FC<{
  onSelect: (id: string) => void;
  onBack: () => void;
}> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#0b0a08] text-[#eafcff] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-['Goldman'] text-2xl sm:text-3xl text-[#d9a441] text-center mb-1">
          Vyber mecha
        </h2>
        <p className="text-xs sm:text-sm text-center text-slate-400 mb-6">
          Každý mech na tu horu kráčí trochu jinak. Vyber si, čí nohy dnes rozhýbeš.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {Object.entries(HERO_STATS).map(([id, hero]) => (
            <div
              key={id}
              className="p-3.5 rounded-xl bg-[#1a1410] border-2 border-[#8a6744] hover:border-[#d9a441] transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{hero.icon}</span>
                  <span className="font-['Goldman'] font-bold text-base text-[#f3d48a]">{hero.nameCz}</span>
                </div>
                <p className="text-xs text-slate-300 mb-3 leading-snug">{hero.desc}</p>
                <div className="grid grid-cols-3 gap-1 text-center font-mono text-xs bg-black/40 p-1.5 rounded-lg border border-slate-800 mb-3">
                  <div>
                    <div className="font-bold text-[#d9a441]">{hero.maxActions}</div>
                    <div className="text-[9px] text-slate-400">AKCE</div>
                  </div>
                  <div>
                    <div className="font-bold text-fuchsia-400">{hero.maxTempt}</div>
                    <div className="text-[9px] text-slate-400">BUBLINY</div>
                  </div>
                  <div>
                    <div className="font-bold text-cyan-400">{hero.senzory}</div>
                    <div className="text-[9px] text-slate-400">SENZORY</div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelect(id)}
                className="w-full py-2 rounded-lg font-['Goldman'] text-xs font-bold uppercase bg-gradient-to-r from-[#d9a441] to-[#b88628] text-black hover:brightness-110"
              >
                Vybrat {hero.nameCz}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold font-mono"
          >
            ⬅️ Zpět
          </button>
        </div>
      </div>
    </div>
  );
};

export const PatronSelectScreen: React.FC<{
  onSelect: (id: string) => void;
  onBack: () => void;
}> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#0b0a08] text-[#eafcff] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-['Goldman'] text-2xl sm:text-3xl text-[#d9a441] text-center mb-1">
          Vyber navigátora
        </h2>
        <p className="text-xs sm:text-sm text-center text-slate-400 mb-6">
          Navigátor sedí na druhém konci sluneční soustavy a šeptá ti do sluchátka. V mechu s tebou není.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {Object.entries(PATRONS).map(([id, p]) => (
            <div
              key={id}
              className="p-3.5 rounded-xl bg-[#1a1410] border-2 border-[#8a6744] hover:border-[#d9a441] flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="font-['Goldman'] font-bold text-base text-[#f3d48a] mb-1">{p.nameCz}</div>
                <div className="text-xs font-semibold text-emerald-300 mb-2 font-mono">{p.bonusCz}</div>
                <p className="text-xs text-slate-400 italic mb-2">{p.flavourCz}</p>
                <div className="text-[10px] font-mono text-slate-400 mb-3">Spolehlivost spojení: {p.reliability}/30</div>
              </div>
              <button
                type="button"
                onClick={() => onSelect(id)}
                className="w-full py-2 rounded-lg font-['Goldman'] text-xs font-bold uppercase bg-gradient-to-r from-[#d9a441] to-[#b88628] text-black hover:brightness-110"
              >
                Zvolit {p.nameCz}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold font-mono"
          >
            ⬅️ Zpět
          </button>
        </div>
      </div>
    </div>
  );
};

export const PartakSelectScreen: React.FC<{
  onSelect: (id: string) => void;
  onBack: () => void;
}> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#0b0a08] text-[#eafcff] overflow-y-auto flex flex-col justify-center items-center">
      <div className="max-w-md w-full">
        <h2 className="font-['Goldman'] text-2xl sm:text-3xl text-[#d9a441] text-center mb-1">
          Vyber parťáka
        </h2>
        <p className="text-xs sm:text-sm text-center text-slate-400 mb-6">
          Parťák s tebou skutečně sedí v kokpitu mecha a zajímá se, jestli přežijete.
        </p>

        <div className="space-y-4 mb-6">
          {Object.entries(PARTACI).map(([id, p]) => (
            <div
              key={id}
              className="p-4 rounded-xl bg-[#1a1410] border-2 border-[#d9a441] shadow-xl"
            >
              <div className="font-['Goldman'] font-bold text-lg text-[#f3d48a] mb-1">{p.nameCz}</div>
              <div className="text-xs font-semibold text-emerald-300 mb-2 font-mono">{p.bonusCz}</div>
              <p className="text-xs text-slate-300 italic mb-4">{p.flavourCz}</p>
              <button
                type="button"
                onClick={() => onSelect(id)}
                className="w-full py-2.5 rounded-lg font-['Goldman'] text-sm font-bold uppercase bg-gradient-to-r from-[#d9a441] to-[#b88628] text-black hover:brightness-110"
              >
                Nastoupit s {p.nameCz}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold font-mono"
          >
            ⬅️ Zpět
          </button>
        </div>
      </div>
    </div>
  );
};
