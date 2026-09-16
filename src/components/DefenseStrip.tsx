import React from 'react';
import { GameState } from '../types/game';

interface DefenseStripProps {
  game: GameState;
  onShowShieldInfo: () => void;
  onShowTemptInfo: () => void;
  onShowVenialInfo: () => void;
  onShowMortalInfo: () => void;
}

export const DefenseStrip: React.FC<DefenseStripProps> = ({
  game,
  onShowShieldInfo,
  onShowTemptInfo,
  onShowVenialInfo,
  onShowMortalInfo,
}) => {
  const maxS = game.senzory || 20;
  const maxT = game.maxTempt || 20;
  const maxV = game.maxVenial || 20;
  const maxM = game.maxMortal || 20;

  const curS = Math.min(maxS, game.shield || 0);
  const curT = Math.min(maxT, game.tempt || 0);
  const curV = Math.min(maxV, game.venial || 0);
  const curM = Math.min(maxM, game.mortal || 0);

  const pctS = Math.max(0, Math.min(100, (curS / maxS) * 100));
  const pctT = Math.max(0, Math.min(100, (curT / maxT) * 100));
  const pctV = Math.max(0, Math.min(100, (curV / maxV) * 100));
  const pctM = Math.max(0, Math.min(100, (curM / maxM) * 100));

  return (
    <div
      id="defense-strip-module"
      className="rounded-xl p-2.5 bg-gradient-to-b from-[#241a12] via-[#16110c] to-[#0d0a07] border-2 border-[#8a6744] shadow-[inset_0_1px_0_rgba(255,220,160,0.18),0_4px_12px_rgba(0,0,0,0.7)]"
    >
      {/* 4 defense segments pipeline */}
      <div
        id="defense-strip"
        className="flex items-stretch h-9 sm:h-10 rounded-lg overflow-hidden border border-[#6b4a3a] bg-[#120e0a] shadow-inner relative"
      >
        {/* 1. Holoklam */}
        <div
          id="stat-shield"
          onClick={onShowShieldInfo}
          className="flex-1 relative cursor-pointer border-r border-[#d9a441]/40 bg-gradient-to-b from-cyan-950/40 to-black/60 group overflow-hidden"
          title="Holoklam — holografická clona mecha"
        >
          <div
            id="shield-bar"
            className="h-full bg-gradient-to-r from-teal-700 via-cyan-500 to-cyan-300 transition-all duration-300 ml-auto relative opacity-90 shadow-[0_0_12px_rgba(41,224,201,0.5)]"
            style={{ width: `${pctS}%` }}
          />
          {/* T-rex ghost hologram */}
          <div className="absolute inset-0 flex items-center justify-end pr-1 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity">
            <svg className="h-6 w-9 text-cyan-200" viewBox="0 0 64 40" fill="currentColor">
              <path d="M3 24c2-11 12-19 26-18 9 .6 16 4 24 12l7 6-6 1-8-2c3 4 10 6 13 5-3 6-16 10-31 6-8-2-14-6-17-10z" />
            </svg>
          </div>
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 z-20 text-[#d9a441] font-bold text-xs pointer-events-none select-none">
            ›
          </span>
        </div>

        {/* 2. Protonová bublináž */}
        <div
          id="stat-tempt"
          onClick={onShowTemptInfo}
          className="flex-1 relative cursor-pointer border-r border-[#d9a441]/40 bg-gradient-to-b from-purple-950/40 to-black/60 overflow-hidden"
          title="Protonová bublináž — primární energetický štít"
        >
          <div
            id="tempt-bar"
            className="h-full bg-gradient-to-r from-purple-800 via-fuchsia-600 to-pink-400 transition-all duration-300 ml-auto opacity-90 shadow-[0_0_10px_rgba(217,70,239,0.4)]"
            style={{ width: `${pctT}%` }}
          />
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 z-20 text-[#d9a441] font-bold text-xs pointer-events-none select-none">
            ›
          </span>
        </div>

        {/* 3. Kapota */}
        <div
          id="stat-venial"
          onClick={onShowVenialInfo}
          className="flex-1 relative cursor-pointer border-r border-[#d9a441]/40 bg-gradient-to-b from-amber-950/40 to-black/60 overflow-hidden"
          title="Kapota — karoserie a pancíř mecha"
        >
          <div
            id="venial-bar"
            className="h-full bg-gradient-to-r from-amber-800 via-amber-500 to-yellow-300 transition-all duration-300 ml-auto opacity-90 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
            style={{ width: `${pctV}%` }}
          />
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 z-20 text-[#d9a441] font-bold text-xs pointer-events-none select-none">
            ›
          </span>
        </div>

        {/* 4. Reaktor */}
        <div
          id="stat-mortal"
          onClick={onShowMortalInfo}
          className="flex-1 relative cursor-pointer bg-gradient-to-b from-rose-950/40 to-black/60 overflow-hidden"
          title="Reaktor — jádro a život mecha"
        >
          <div
            id="mortal-bar"
            className="h-full bg-gradient-to-r from-red-900 via-red-600 to-orange-500 transition-all duration-300 ml-auto opacity-90 shadow-[0_0_12px_rgba(239,68,68,0.5)] animate-pulse"
            style={{ width: `${pctM}%` }}
          />
        </div>
      </div>

      {/* Legend & numeric counters underneath */}
      <div id="defense-legend" className="flex text-center mt-1 text-[11px] font-mono select-none">
        <button
          type="button"
          onClick={onShowShieldInfo}
          className="flex-1 text-cyan-300 hover:text-cyan-100 flex flex-col items-center"
        >
          <span className="text-[10px] font-bold text-cyan-400">🎭 Holoklam</span>
          <span className="font-bold">{curS}/{maxS}</span>
        </button>

        <button
          type="button"
          onClick={onShowTemptInfo}
          className="flex-1 text-fuchsia-300 hover:text-fuchsia-100 flex flex-col items-center"
        >
          <span className="text-[10px] font-bold text-fuchsia-400">🫧 Bublináž</span>
          <span className="font-bold">{curT}/{maxT}</span>
        </button>

        <button
          type="button"
          onClick={onShowVenialInfo}
          className="flex-1 text-amber-300 hover:text-amber-100 flex flex-col items-center"
        >
          <span className="text-[10px] font-bold text-amber-400">🧰 Kapota</span>
          <span className="font-bold">{curV}/{maxV}</span>
        </button>

        <button
          type="button"
          onClick={onShowMortalInfo}
          className="flex-1 text-red-400 hover:text-red-200 flex flex-col items-center"
        >
          <span className="text-[10px] font-bold text-red-500">☢️ Reaktor</span>
          <span className="font-bold">{curM}/{maxM}</span>
        </button>
      </div>
    </div>
  );
};
