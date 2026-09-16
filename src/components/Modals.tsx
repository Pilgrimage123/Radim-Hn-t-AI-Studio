import React from 'react';
import { CardDef, DemonInstance } from '../types/game';
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
