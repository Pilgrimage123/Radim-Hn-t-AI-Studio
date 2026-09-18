import React, { useEffect } from 'react';
import { CardDef, DemonInstance, PatronDef } from '../types/game';
import { keywordName, TRAITS } from '../data/demonsAndStages';
import { classifyCardKind, CARD_KIND_META, resolveCardIntent, cardIntentLabel } from '../data/cards';

interface DiagnosticModalProps {
  demon: DemonInstance | null;
  onClose: () => void;
  livingDemons: DemonInstance[];
  onSelectFocus: (uid: string) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  demon,
  onClose,
  livingDemons,
  onSelectFocus
}) => {
  if (!demon) return null;
  const d = demon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#1b1420] border-2 border-[#d9a441] rounded-2xl p-5 shadow-2xl text-[#eafcff]"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-white"
        >
          &times;
        </button>

        <h3 className="font-['Goldman'] text-xl text-[#d9a441] mb-1">
          {d.name}
        </h3>
        <p className="text-xs text-slate-300 mb-3">{d.desc}</p>

        {livingDemons.length > 1 && (
          <div className="mb-3 p-2 rounded bg-black/40 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Přepnout cíl na scéně:</span>
            <div className="flex flex-wrap gap-1.5">
              {livingDemons.map(target => (
                <button
                  key={target.uid}
                  type="button"
                  onClick={() => onSelectFocus(target.uid)}
                  className={`text-xs px-2 py-0.5 rounded border ${
                    target.uid === d.uid
                      ? 'bg-emerald-800 border-emerald-400 text-white font-bold'
                      : 'bg-slate-800 border-slate-600 text-slate-300'
                  }`}
                >
                  {target.name} ({target.hp}/{target.maxHp})
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-2 bg-black/40 p-2 rounded-lg border border-slate-700/50">
            <div><strong>Archetyp:</strong> {keywordName(d.keyword)}</div>
            <div><strong>Úroveň:</strong> {d.level}</div>
            <div><strong>Zdraví:</strong> {d.hp} / {d.maxHp}</div>
            <div><strong>Práh Omráčení:</strong> {d.stunThreshold}</div>
            <div><strong>Agrese:</strong> {d.anger}</div>
            <div><strong>Koroze:</strong> {d.corrosion || 0} stohů</div>
          </div>

          <div>
            <h4 className="font-bold text-[#d9a441] text-xs uppercase mb-1">Základní útoky</h4>
            <div className="bg-black/30 p-2 rounded border border-slate-800 space-y-0.5 text-xs">
              <div>• Protonová bublináž: {d.baseTempt}</div>
              <div>• Kapota: {d.baseVenial}</div>
              {d.baseMortal > 0 && <div>• Reaktor: {d.baseMortal}</div>}
              {d.rageMult > 1 && <div className="text-red-400">• Násobič zuřivosti: ×{d.rageMult.toFixed(2)}</div>}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#d9a441] text-xs uppercase mb-1">Vlastnosti (Traits)</h4>
            <div className="space-y-1.5">
              {(d.traits || []).map(k => {
                const t = TRAITS[k];
                if (!t) return null;
                return (
                  <div key={k} className="bg-black/40 p-2 rounded border border-slate-700">
                    <span className="font-bold text-emerald-300">{t.name}: </span>
                    <span className="text-slate-300 text-xs">{t.desc}</span>
                  </div>
                );
              })}
              {(!d.traits || d.traits.length === 0) && (
                <div className="text-slate-400 italic">Žádné zvláštní vlastnosti.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PileInspectorModalProps {
  title: string;
  cards: CardDef[];
  onClose: () => void;
}

export const PileInspectorModal: React.FC<PileInspectorModalProps> = ({
  title,
  cards,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#16213a] border-2 border-[#d9a441] rounded-2xl p-4 sm:p-6 shadow-2xl text-[#eafcff]"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-white"
        >
          &times;
        </button>

        <h3 className="font-['Goldman'] text-xl text-[#d9a441] mb-4 text-center">
          {title} ({cards.length})
        </h3>

        {cards.length === 0 ? (
          <p className="text-center text-slate-400 italic py-8">Žádné karty v tomto balíčku.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {cards.map((c, i) => {
              const kind = classifyCardKind(c);
              const meta = CARD_KIND_META[kind];
              const intent = resolveCardIntent(c);
              return (
                <div
                  key={c.uid || i}
                  className="p-2 rounded-xl bg-[#1a1420] border border-[#d9a441]/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[8px] uppercase font-mono font-bold text-amber-300/80 mb-1">
                      <span>{meta.label}</span>
                      {intent !== 'focus' && <span>{cardIntentLabel(intent)}</span>}
                    </div>
                    <div className="font-bold text-xs text-white mb-1">{c.name}</div>
                    <div className="text-[10px] text-slate-300 leading-snug">{c.text}</div>
                  </div>
                  <div className="mt-2 pt-1 border-t border-slate-700 flex justify-between items-center text-[10px] font-mono">
                    <span className="w-5 h-5 rounded-full bg-black border border-[#d9a441] text-[#d9a441] font-bold flex items-center justify-center">
                      {c.cost}
                    </span>
                    <span className="text-slate-400 uppercase">{c.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

interface NavigatorPortraitModalProps {
  patron: PatronDef | null;
  onClose: () => void;
}

export const NavigatorPortraitModal: React.FC<NavigatorPortraitModalProps> = ({
  patron,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!patron) return null;

  return (
    <div
      id="navigator-portrait-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="navigator-portrait-modal-card"
        className="relative w-full max-w-sm sm:max-w-md bg-[#130f1a] border-2 border-[#d9a441] rounded-2xl p-4 sm:p-5 shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_30px_rgba(217,164,65,0.3)] text-[#eafcff] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Rivet bar & Close button */}
        <div className="flex items-center justify-between border-b border-[#8a6744]/60 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[10px] sm:text-xs text-[#d9a441] tracking-wider uppercase font-bold">
              COMMS SPOJENÍ // DÁLKOVÝ PŘENOS
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2a1c12] border border-[#8a6744] text-[#f3d48a] hover:bg-[#3a281a] hover:text-white transition-colors text-lg font-bold"
            title="Zavřít portrét (Esc)"
          >
            &times;
          </button>
        </div>

        {/* Portrait Image Frame - properly sized and proportioned */}
        <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#d9a441] bg-black shadow-[0_0_20px_rgba(217,164,65,0.25)] mb-3 group">
          {patron.portraitUrl ? (
            <img
              src={patron.portraitFullUrl || patron.portraitUrl}
              alt={patron.nameCz}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter contrast-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1410] text-slate-400 p-4 text-center">
              <span className="text-4xl mb-2">📻</span>
              <span className="font-mono text-xs">Audio spojení bez obrazu</span>
            </div>
          )}

          {/* CRT scanline texture effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)'
            }}
          />

          {/* Iridescent gloss corner sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/10 to-transparent pointer-events-none" />

          {/* Live stream transmission status pill */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 border border-emerald-500/60 backdrop-blur-sm flex items-center gap-1.5 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-bold">
              HD LIVE STREAM
            </span>
          </div>

          {/* Reliability tag bottom right */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 border border-[#d9a441]/60 text-[9px] font-mono text-[#f3d48a]">
            PING: {patron.reliability}/30
          </div>
        </div>

        {/* Navigator Details */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 className="font-['Goldman'] text-lg sm:text-xl text-[#f3d48a] font-bold">
              {patron.nameCz}
            </h3>
            <span className="font-mono text-[10px] text-slate-400 uppercase">
              Navigátorka • Venuše
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-[#8a6744]/70">
            <div className="text-xs font-mono font-bold text-emerald-300 mb-1">
              ⚡ Bonus: {patron.bonusCz}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{patron.flavourCz}"
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-2 border-t border-[#8a6744]/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg font-['Goldman'] text-xs font-bold uppercase bg-gradient-to-r from-[#d9a441] to-[#b88628] text-black hover:brightness-110 shadow"
          >
            Rozumím, pokračovat
          </button>
        </div>
      </div>
    </div>
  );
};
