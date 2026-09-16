import React from 'react';
import { DemonInstance } from '../types/game';
import { keywordName } from '../data/demonsAndStages';

interface CrtMonitorProps {
  currentDemon: DemonInstance | null;
  livingDemons: DemonInstance[];
  focusedUid: string | null;
  nextDemonAction: any;
  onSelectFocus: (uid: string) => void;
  onOpenDetails: () => void;
  onShowKorozeInfo: (e: React.MouseEvent) => void;
  hitGlitch?: boolean;
}

export const CrtMonitor: React.FC<CrtMonitorProps> = ({
  currentDemon,
  livingDemons,
  focusedUid,
  nextDemonAction,
  onSelectFocus,
  onOpenDetails,
  onShowKorozeInfo,
  hitGlitch = false,
}) => {
  if (!currentDemon) {
    return (
      <div
        id="crt-monitor-empty"
        className="relative my-2 p-4 rounded-xl border-4 border-[#3a2a1c] bg-[#050e08] shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(0,0,0,0.9)] text-center overflow-hidden"
      >
        <div className="text-emerald-400/60 font-mono text-xs uppercase tracking-widest animate-pulse">
          ŽÁDNÁ ENTITA NENÍ DETEKOVÁNA // SKENER TICHÝ
        </div>
      </div>
    );
  }

  const d = currentDemon;
  const isRaging = (d.rageMult || 1) > 1;
  const hpPct = d.maxHp > 0 ? Math.max(0, Math.min(100, (d.hp / d.maxHp) * 100)) : 0;
  const stunPct = d.stunThreshold > 0 ? Math.max(0, Math.min(100, ((d.stunBar || 0) / d.stunThreshold) * 100)) : 0;

  // Determine Action Chip Label
  let chipType = 'attack';
  let chipLabel = '⚔️ ÚTOK';
  let chipDesc = '';
  if (d.stunned) {
    chipType = 'stun';
    chipLabel = '💫 OCHROMENA';
    chipDesc = 'Vynechává tento tah';
  } else if (nextDemonAction) {
    const t = nextDemonAction.type;
    if (t === 'attack') {
      chipType = 'attack';
      chipLabel = '⚔️ ÚTOK';
      chipDesc = `Zásah: ~${Math.round((d.baseTempt || 0) * (1 + (d.anger || 0) * 0.08) * (d.rageMult || 1))} Bublináž`;
    } else if (t === 'enrage') {
      chipType = 'enrage';
      chipLabel = '😡 ROZZUŘENÍ';
      chipDesc = '+8 Agrese';
    } else if (t === 'hate') {
      chipType = 'hate';
      chipLabel = '💉 TRVALÁ ZLOBA';
      chipDesc = 'Oprava & nárůst max. zdraví';
    } else if (t === 'scout') {
      chipType = 'scout';
      chipLabel = '🔍 PRŮZKUM';
      chipDesc = '40 % útok + zuřivost';
    } else if (t === 'reprisal') {
      chipType = 'reprisal';
      chipLabel = '↩️ ODVETA';
      chipDesc = 'Odplata za přímý zásah';
    } else if (t === 'bulwark') {
      chipType = 'bulwark';
      chipLabel = '🛡️ VAL';
      chipDesc = 'Pohltí 1. zásah a odrazí';
    }
  }

  return (
    <div
      id="crt-monitor-chassis"
      className="relative my-2 rounded-2xl p-3 sm:p-4 bg-gradient-to-b from-[#2b2219] via-[#1a140f] to-[#120e0a] border-4 border-[#6b4a3a] shadow-[0_8px_25px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,220,160,0.25),0_0_0_2px_#000]"
    >
      {/* Heavy industrial hex bolts in corners */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#d9a441] via-[#6b4a3a] to-[#1a120c] border border-black shadow-inner flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-black/80 rotate-45" />
      </div>
      <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#d9a441] via-[#6b4a3a] to-[#1a120c] border border-black shadow-inner flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-black/80 -rotate-45" />
      </div>
      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#d9a441] via-[#6b4a3a] to-[#1a120c] border border-black shadow-inner flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-black/80 rotate-12" />
      </div>
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#d9a441] via-[#6b4a3a] to-[#1a120c] border border-black shadow-inner flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-black/80 -rotate-30" />
      </div>

      {/* Stamped bezel label */}
      <div className="flex items-center justify-between px-2 mb-1.5 text-[9px] font-mono tracking-widest text-[#d9a441]/80 uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
          TS-84 TACTICAL CRT // ARX-PRIMA
        </span>
        <span className="text-[#ff8a70] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          TARGET LOCKED
        </span>
      </div>

      {/* Multi-entity roster tabs if encounter has >1 demon */}
      {livingDemons.length > 1 && (
        <div
          id="encounter-roster"
          className="flex gap-1.5 mb-2 overflow-x-auto pb-1"
        >
          {livingDemons.map((target, idx) => {
            const isTarget = target.uid === focusedUid;
            return (
              <button
                key={target.uid}
                type="button"
                onClick={() => onSelectFocus(target.uid)}
                className={`flex-1 min-w-[100px] text-left px-2 py-1 rounded-md text-[10px] font-mono border transition-all ${
                  isTarget
                    ? 'bg-[#1e3a24] border-[#7dff8a] text-[#c8ffd0] shadow-[0_0_10px_rgba(125,255,138,0.3)]'
                    : 'bg-[#0d140f]/80 border-[#3a4d3e] text-[#8aa890] hover:border-[#5a7d60]'
                }`}
              >
                <div className="truncate font-bold font-sans">{target.name}</div>
                <div className="flex items-center justify-between text-[9px] opacity-85">
                  <span>HP {target.hp}/{target.maxHp}</span>
                  {isTarget && <span className="text-emerald-400">● CÍL</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* CRT Screen Tube Area */}
      <div
        id="demon-area"
        onClick={onOpenDetails}
        className={`relative rounded-xl p-3 sm:p-4 min-h-[140px] cursor-pointer transition-all overflow-hidden border-2 select-none ${
          isRaging
            ? 'border-[#ff3b5c] shadow-[0_0_20px_rgba(255,59,92,0.5),inset_0_0_25px_rgba(255,59,92,0.2)]'
            : 'border-[#2a4530] shadow-[inset_0_0_30px_rgba(0,0,0,0.9),0_0_15px_rgba(16,185,129,0.15)]'
        } ${hitGlitch ? 'brightness-150 contrast-125' : ''}`}
        style={{
          background: isRaging
            ? 'radial-gradient(120% 90% at 50% 25%, rgba(90,20,20,0.55), rgba(8,3,5,0.95) 75%)'
            : 'radial-gradient(120% 90% at 50% 25%, rgba(20,55,30,0.55), rgba(3,10,6,0.95) 75%)'
        }}
        title="Klepnutím otevřeš diagnostiku a vlastnosti nepřítele"
      >
        {/* CRT Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, rgba(0,0,0,0.4) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(16,185,129,0.03) 0 2px, transparent 2px 4px)'
          }}
        />

        {/* Animated CRT Beam Glare */}
        <div
          className="absolute inset-x-0 h-16 pointer-events-none z-10 opacity-30 bg-gradient-to-b from-emerald-300/15 to-transparent animate-[crtSweep_5s_linear_infinite]"
        />

        {/* Corner HUD reticle marks */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-500/50 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-500/50 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-500/50 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-500/50 pointer-events-none" />

        {/* Action Chip Header */}
        <div className="relative z-20 flex justify-center mb-2">
          <div
            id="demon-action-chip"
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide uppercase shadow-md border ${
              chipType === 'stun'
                ? 'bg-gradient-to-r from-emerald-800 to-green-950 text-emerald-200 border-emerald-400/50'
                : chipType === 'enrage' || chipType === 'hate'
                ? 'bg-gradient-to-r from-amber-700 to-red-950 text-amber-200 border-amber-400/50'
                : chipType === 'scout'
                ? 'bg-gradient-to-r from-teal-800 to-cyan-950 text-teal-200 border-teal-400/50'
                : chipType === 'reprisal'
                ? 'bg-gradient-to-r from-orange-800 to-amber-950 text-orange-200 border-orange-400/50'
                : chipType === 'bulwark'
                ? 'bg-gradient-to-r from-cyan-800 to-blue-950 text-cyan-200 border-cyan-400/50'
                : 'bg-gradient-to-r from-red-800 to-red-950 text-white border-red-500/50'
            }`}
          >
            <span>{chipLabel}</span>
            {chipDesc && <span className="opacity-80 text-[10px] lowercase font-sans font-normal">• {chipDesc}</span>}
          </div>
        </div>

        {/* Enemy Name & Archetype */}
        <div className="relative z-20 text-center mb-2">
          <div
            id="demon-name"
            className={`font-['Goldman'] text-lg sm:text-xl font-bold tracking-wide ${
              isRaging ? 'text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]' : 'text-emerald-300 drop-shadow-[0_0_8px_rgba(110,231,183,0.6)]'
            }`}
          >
            {d.name}
          </div>
          <div className="text-[11px] font-mono text-emerald-400/75 uppercase tracking-wider flex items-center justify-center gap-2 mt-0.5">
            <span>[{keywordName(d.keyword)}]</span>
            <span>ÚROVEŇ {d.level}</span>
            {isRaging && <span className="text-red-400 font-bold">⚠️ ZUŘIVOST</span>}
          </div>
        </div>

        {/* Traits & Koroze Badges */}
        <div id="demon-traits-row" className="relative z-20 flex flex-wrap items-center justify-center gap-1.5 mb-2.5">
          {/* Koroze Badge */}
          <button
            type="button"
            onClick={onShowKorozeInfo}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border transition-all ${
              (d.corrosion || 0) > 0
                ? 'bg-amber-950/70 border-amber-500/60 text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                : 'bg-black/30 border-amber-800/40 text-amber-400/60'
            }`}
          >
            <span>🧪</span>
            <span>Koroze {(d.corrosion || 0) > 0 ? d.corrosion : '0'}</span>
            <span className="w-3.5 h-3.5 rounded-full border border-amber-400/50 flex items-center justify-center text-[9px] italic">i</span>
          </button>

          {/* Traits */}
          {(d.traits || []).map(traitKey => (
            <span
              key={traitKey}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-200"
            >
              {traitKey}
            </span>
          ))}

          {/* Diagnostic Prompt */}
          <span className="text-[10px] text-emerald-400/70 font-mono underline hover:text-emerald-300 ml-1">
            [Podrobnosti ℹ️]
          </span>
        </div>

        {/* Dual Health & Stun Progress Bars */}
        <div className="relative z-20 grid grid-cols-2 gap-2">
          {/* Health Bar */}
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-[10px] font-mono text-red-300/90 font-bold px-1">
              <span>ZDRAVÍ</span>
              <span>{d.hp} / {d.maxHp}</span>
            </div>
            <div className="relative h-5 rounded bg-black/70 border border-red-900/60 overflow-hidden shadow-inner">
              <div
                id="demon-hp-bar"
                className="h-full bg-gradient-to-r from-red-800 via-red-600 to-rose-500 transition-all duration-300 rounded-sm"
                style={{ width: `${hpPct}%` }}
              />
              <div
                id="demon-hp-bar-preview"
                className="absolute inset-y-0 opacity-0 pointer-events-none bg-white/40"
              />
            </div>
          </div>

          {/* Stun Bar (Omráčení) */}
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-[10px] font-mono text-emerald-300/90 font-bold px-1">
              <span>OMRÁČENÍ</span>
              <span>{d.stunBar || 0} / {d.stunThreshold}</span>
            </div>
            <div className="relative h-5 rounded bg-black/70 border border-emerald-900/60 overflow-hidden shadow-inner">
              <div
                id="demon-stun-bar"
                className="h-full bg-gradient-to-r from-emerald-800 via-emerald-600 to-green-400 transition-all duration-300 rounded-sm"
                style={{ width: `${stunPct}%` }}
              />
              <div
                id="demon-stun-bar-preview"
                className="absolute inset-y-0 opacity-0 pointer-events-none bg-emerald-200/40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
