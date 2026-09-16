import React from 'react';
import { CardDef, GameState } from '../types/game';
import {
  CARD_KIND_META,
  classifyCardKind,
  resolveCardIntent,
  cardIntentLabel,
  starValueMult,
  starEmoji
} from '../data/cards';

interface PilotConsoleProps {
  game: GameState;
  onPlayCard: (index: number) => void;
  onPlayWithBabiczka: (index: number) => void;
  onToggleBabiczka: () => void;
  onEndTurn: () => void;
  onOpenRuka: () => void;
  onOpenBalicek: () => void;
  onOpenZahaz: () => void;
  onCardHover?: (card: CardDef | null) => void;
  onShowActionsInfo: () => void;
  onShowPowerInfo: () => void;
  onShowBabiczkaInfo: () => void;
}

export const PilotConsole: React.FC<PilotConsoleProps> = ({
  game,
  onPlayCard,
  onPlayWithBabiczka,
  onToggleBabiczka,
  onEndTurn,
  onOpenRuka,
  onOpenBalicek,
  onOpenZahaz,
  onCardHover,
  onShowActionsInfo,
  onShowPowerInfo,
  onShowBabiczkaInfo,
}) => {
  const [fullDesc, setFullDesc] = React.useState(false);

  const isDamageCard = (card: CardDef) => {
    return /Zraň za \d+|Aplikuj \d+ Koroze|veškerou Korozi/.test(card.text);
  };

  return (
    <div
      id="pilot-console-dock"
      className="relative z-20 mt-auto pt-2 pb-3 px-3 sm:px-6 bg-gradient-to-t from-[#090705] via-[#140e0a]/95 to-transparent border-t-2 border-[#6b4a3a] shadow-2xl"
    >
      {/* Top Controls: Circular dials row */}
      <div id="controls-row" className="flex items-center justify-center gap-3 sm:gap-4 mb-2 select-none">
        {/* Full Desc Toggle */}
        <button
          type="button"
          onClick={() => setFullDesc(!fullDesc)}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 transition-all flex items-center justify-center font-bold text-sm shadow-lg ${
            fullDesc
              ? 'bg-[#1fb8ae]/30 border-[#1fb8ae] text-[#1fb8ae] shadow-[0_0_12px_rgba(31,184,174,0.6)]'
              : 'bg-[#16213a] border-[#d9a441] text-[#eafcff]'
          }`}
          title="Přepnout plný text karet v ruce"
        >
          ℹ️✋
        </button>

        {/* Actions Puck (Czech Flag Design) */}
        <div
          id="actions-pin"
          onClick={onShowActionsInfo}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
          title="Zbývající Akce pro toto kolo"
        >
          {/* Top half red */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-[#d7141a]" />
          {/* Bottom half white */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-white" />
          {/* Left triangle blue */}
          <div
            className="absolute inset-y-0 left-0 w-0 h-0 border-t-[28px] border-t-transparent border-b-[28px] border-b-transparent border-l-[32px] border-l-[#11457e]"
          />
          {/* Action number in center */}
          <span
            id="actions-pin-value"
            className="relative z-10 font-mono text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_3px_#000]"
          >
            {game.actions}
          </span>
        </div>

        {/* Vyladění Dial (if > 0) */}
        {game.powerOfGod > 0 && (
          <div
            id="power-pin"
            onClick={onShowPowerInfo}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1b1420] border-2 border-[#29e0c9] shadow-[0_0_12px_rgba(41,224,201,0.5)] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
            title="Vyladění — bonus k poškození"
          >
            <span className="absolute top-0 text-[10px]">🎶</span>
            <span
              id="power-pin-value"
              className="font-mono text-base font-black text-[#29e0c9] pt-2"
            >
              {game.powerOfGod}
            </span>
          </div>
        )}

        {/* BabiCZka Puck */}
        <div className="relative">
          <button
            type="button"
            id="babiczka-btn"
            onClick={onToggleBabiczka}
            disabled={game.babiczkaCooldown > 0}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all flex flex-col items-center justify-center font-bold shadow-xl ${
              game.babiczkaTargeting
                ? 'bg-amber-500/40 border-amber-300 text-amber-100 shadow-[0_0_16px_rgba(245,158,11,0.8)] animate-pulse scale-105'
                : game.babiczkaCooldown > 0
                ? 'bg-black/50 border-gray-600 opacity-40 cursor-not-allowed text-gray-400'
                : 'bg-gradient-to-br from-[#5a4028] to-[#1a120c] border-[#d9a441] text-[#f3d48a] hover:scale-105'
            }`}
            title="BabiCZka — zdvojnásobí zranění vybrané útočné karty"
          >
            <span className="text-xl leading-none">📡</span>
            {game.babiczkaCooldown > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-black/90 text-amber-400 text-[10px] font-mono font-bold px-1 rounded-full border border-amber-500">
                ⏳{game.babiczkaCooldown}
              </span>
            )}
          </button>
          {game.babiczkaTargeting && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-amber-300 bg-black/80 px-2 py-0.5 rounded border border-amber-500">
              VYBER KARTU
            </div>
          )}
        </div>
      </div>

      {/* Hand of Cards */}
      <div
        id="hand"
        className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 px-1 justify-start sm:justify-center items-stretch min-h-[160px]"
      >
        {game.hand.map((card, i) => {
          const affordable = game.actions >= card.cost;
          const isDmg = isDamageCard(card);
          const isLocked = game.lockedCardUid && card.uid === game.lockedCardUid;
          const isBabiczkaEligible = game.babiczkaTargeting && isDmg && affordable;
          const kind = classifyCardKind(card);
          const kindMeta = CARD_KIND_META[kind];
          const intent = resolveCardIntent(card);

          return (
            <div
              key={card.uid || `${card.id}-${i}`}
              onClick={() => {
                if (!affordable || isLocked) return;
                if (game.babiczkaTargeting && isDmg) {
                  onPlayWithBabiczka(i);
                } else {
                  onPlayCard(i);
                }
              }}
              onMouseEnter={() => onCardHover && onCardHover(card)}
              onMouseLeave={() => onCardHover && onCardHover(null)}
              className={`flex-shrink-0 w-36 sm:w-40 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer transition-all select-none relative overflow-hidden border-2 ${
                !affordable || isLocked
                  ? 'opacity-45 grayscale pointer-events-none bg-[#101726] border-slate-700'
                  : isBabiczkaEligible
                  ? 'border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.8)] scale-105 bg-[#1a1c2d]'
                  : 'bg-[#141b2d] border-[#d9a441]/80 hover:border-[#d9a441] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)]'
              }`}
            >
              {/* Category Strip */}
              <div
                className={`-mx-2.5 -mt-2.5 mb-1.5 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-between ${
                  kind === 'attack'
                    ? 'bg-red-800 text-red-100'
                    : kind === 'shield'
                    ? 'bg-cyan-800 text-cyan-100'
                    : kind === 'repair'
                    ? 'bg-amber-800 text-amber-100'
                    : kind === 'draw'
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-emerald-800 text-emerald-100'
                }`}
              >
                <span>{kindMeta.label}</span>
                {intent !== 'focus' && (
                  <span className="text-[8px] opacity-90">{cardIntentLabel(intent)}</span>
                )}
              </div>

              {/* Card Name */}
              <div className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#eafcff] leading-tight mb-1 text-center">
                {card.name}
                {card.stars ? ` ${starEmoji(card.stars)}` : ''}
              </div>

              {/* Card Body: simple or full description */}
              <div className="flex-1 my-1">
                {fullDesc ? (
                  <p className="text-[10px] text-slate-300 leading-snug">
                    {card.text}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-[11px] text-amber-200/90 font-mono font-semibold">
                      {card.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced by Ručičky note */}
              {card.enhanced && (
                <div className="text-[9px] font-bold text-amber-400 font-mono text-center mb-1">
                  ✨ ZČR +{Math.round(Math.min(50, Math.min(3, card.contemplationStacks || 0) * (game.contemplationPerTurn || 20)))}%
                </div>
              )}

              {/* Action Cost Bubble at bottom-left */}
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-700/50">
                <div
                  className="w-6 h-6 rounded-full bg-[#0d121f] border-2 border-[#d9a441] text-[#d9a441] font-mono text-xs font-black flex items-center justify-center shadow-inner"
                  title="Cena v Akcích"
                >
                  {card.cost}
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase">
                  {card.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Industrial Lever / Buttons Row */}
      <div id="btn-row" className="flex flex-wrap gap-2 pt-2 items-center">
        {/* End Turn Button styled as mecha lever */}
        <button
          type="button"
          id="end-turn-btn"
          onClick={onEndTurn}
          className="flex-1 py-2.5 px-4 rounded-xl font-['Goldman'] text-sm sm:text-base font-bold uppercase tracking-wider text-black bg-gradient-to-b from-[#f3d48a] via-[#d9a441] to-[#8a5a12] border-2 border-[#3a2a10] shadow-[0_4px_0_#2b1807,0_6px_14px_rgba(0,0,0,0.8)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 hover:brightness-110"
        >
          <span>⏭️ UKONČIT TAH</span>
        </button>

        {/* Pile viewers */}
        <button
          type="button"
          onClick={onOpenRuka}
          className="px-3 py-2 rounded-lg bg-[#24180f] hover:bg-[#3a2818] border border-[#d9a441]/80 text-[#f3d48a] text-xs font-bold font-mono transition-colors"
        >
          ✋ Ruka ({game.hand.length})
        </button>
        <button
          type="button"
          onClick={onOpenBalicek}
          className="px-3 py-2 rounded-lg bg-[#24180f] hover:bg-[#3a2818] border border-[#d9a441]/80 text-[#f3d48a] text-xs font-bold font-mono transition-colors"
        >
          🎴 Balíček ({game.deck.length})
        </button>
        <button
          type="button"
          onClick={onOpenZahaz}
          className="px-3 py-2 rounded-lg bg-[#24180f] hover:bg-[#3a2818] border border-[#d9a441]/80 text-[#f3d48a] text-xs font-bold font-mono transition-colors"
        >
          🗑️ Zahaz ({game.discard.length})
        </button>
      </div>
    </div>
  );
};
