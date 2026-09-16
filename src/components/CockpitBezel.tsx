import React from 'react';
import { KrtekSticker } from './KrtekSticker';

interface CockpitBezelProps {
  heroName: string;
  stageName: string;
  stageNum: number;
  stageTotal: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLog: () => void;
}

export const CockpitBezel: React.FC<CockpitBezelProps> = ({
  heroName,
  stageName,
  stageNum,
  stageTotal,
  soundEnabled,
  onToggleSound,
  onOpenLog,
}) => {
  return (
    <div
      id="cockpit-bezel-layer"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* 1. Realistic Background Atmosphere with Generated Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125 brightness-90"
        style={{
          backgroundImage: 'url("/src/assets/images/mecha_cockpit_bg_1789581095669.jpg")'
        }}
      />

      {/* Dark Vignette & Shadow Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0a07]/90 via-[#140f0b]/75 to-[#090705]/95 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(177,80,46,0.3)] pointer-events-none" />

      {/* Top Armored Bulkhead with Heavy Rivets */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-12 bg-gradient-to-b from-[#3a2a1c] via-[#241a12] to-[#140e0a] border-b-2 border-[#8a6744] shadow-md flex items-center justify-between px-3 sm:px-6 pointer-events-auto z-10">
        {/* Row of rivets along top plate */}
        <div className="absolute top-1 inset-x-0 flex justify-around opacity-75 pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-br from-[#e0b86a] via-[#6b4a3a] to-[#2a1a10] border border-black shadow-[inset_0_0.5px_0_rgba(255,255,255,0.4)]"
            />
          ))}
        </div>

        {/* Hazard yellow-black tape line */}
        <div
          className="absolute bottom-0 inset-x-0 h-1.5 opacity-80"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #d9a441 0 8px, #1a120c 8px 16px)'
          }}
        />

        {/* Pilot ID Stamped Plate */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
          <span className="font-['Goldman'] text-[11px] sm:text-xs text-[#f3d48a] tracking-wider uppercase drop-shadow-[0_1px_1px_#000]">
            KABINA RH-07 • {heroName || 'BOZHENA 2026'}
          </span>
        </div>

        {/* Stage & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenLog}
            className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono bg-[#2a1c12] hover:bg-[#3a281a] border border-[#8a6744] text-[#f3d48a] transition-colors"
            title="Otevřít záznam boje"
          >
            📜 Záznam
          </button>
          <button
            type="button"
            onClick={onToggleSound}
            className="p-1 rounded text-xs bg-[#2a1c12] hover:bg-[#3a281a] border border-[#8a6744] text-[#f3d48a] transition-colors"
            title={soundEnabled ? 'Ztlumit zvuk' : 'Zapnout zvuk'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      {/* Left Wall Bulkhead Pillar with Hydraulic Conduits */}
      <div className="absolute top-10 bottom-0 left-0 w-3 sm:w-5 bg-gradient-to-r from-[#422e1e] via-[#2a1c12] to-[#160f0a] border-r border-[#6b4a3a] shadow-2xl flex flex-col justify-between py-6 items-center z-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-br from-[#d9a441] to-[#3a2418] border border-black/80"
          />
        ))}
      </div>

      {/* Right Wall Bulkhead Pillar with Rivets */}
      <div className="absolute top-10 bottom-0 right-0 w-3 sm:w-5 bg-gradient-to-l from-[#422e1e] via-[#2a1c12] to-[#160f0a] border-l border-[#6b4a3a] shadow-2xl flex flex-col justify-between py-6 items-center z-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-br from-[#d9a441] to-[#3a2418] border border-black/80"
          />
        ))}
      </div>

      {/* Pilsner Urquell can/bottle holder easter egg in bottom-right corner! */}
      <div className="absolute bottom-24 right-4 hidden md:flex flex-col items-center pointer-events-auto group z-20">
        <div className="relative p-1 rounded-lg bg-[#1a120c] border border-[#8a6744] shadow-lg text-center cursor-pointer hover:scale-105 transition-transform"
             title="Záložní Plzeň — pro případ nejvyšší nouze">
          <div className="text-xl">🍺</div>
          <span className="font-mono text-[8px] text-[#d9a441] uppercase block font-bold">
            PLZEŇ 0.5L
          </span>
        </div>
      </div>

      {/* KRTEK STICKER: placed on the mecha dashboard panel (pointer-events-auto) */}
      <div className="absolute top-14 right-4 sm:right-8 z-30 pointer-events-auto">
        <KrtekSticker />
      </div>

      {/* Atmospheric Rust Stains */}
      <div
        className="absolute top-28 left-4 w-12 h-24 opacity-30 pointer-events-none rounded-full blur-[2px]"
        style={{
          background: 'radial-gradient(ellipse at center, #b1502e 0%, #7c2d12 40%, transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-32 right-8 w-16 h-28 opacity-25 pointer-events-none rounded-full blur-[3px]"
        style={{
          background: 'radial-gradient(ellipse at center, #9a3412 0%, #451a03 50%, transparent 70%)'
        }}
      />
    </div>
  );
};
