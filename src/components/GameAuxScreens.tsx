import React from 'react';
import { CardDef } from '../types/game';
import { CARD_DB, classifyCardKind, CARD_KIND_META, starEmoji, starPriceMult } from '../data/cards';

interface ShopScreenProps {
  gracePoints: number;
  onBuyCard: (card: CardDef, price: number) => void;
  onContinue: () => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  gracePoints,
  onBuyCard,
  onContinue,
}) => {
  const [shopCards, setShopCards] = React.useState<Array<{ card: CardDef; price: number; bought: boolean }>>([]);

  React.useEffect(() => {
    // Generate 6 diverse shop cards
    const pool = CARD_DB.filter(c => !c.noShop);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const items = shuffled.slice(0, 6).map(c => {
      const stars = Math.random() < 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
      const modifiedCard = { ...c, stars };
      const price = Math.max(1, Math.floor(8 * (c.priceMult || 1) * starPriceMult(modifiedCard)));
      return { card: modifiedCard, price, bought: false };
    });
    setShopCards(items);
  }, []);

  const handleBuy = (idx: number) => {
    const item = shopCards[idx];
    if (!item || item.bought || gracePoints < item.price) return;
    onBuyCard(item.card, item.price);
    setShopCards(prev => prev.map((it, i) => i === idx ? { ...it, bought: true } : it));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#0b0a08] text-[#eafcff] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-['Goldman'] text-2xl sm:text-3xl text-[#d9a441] text-center mb-1">
          Zásobovací modul
        </h2>
        <p className="text-xs text-center text-slate-400 mb-2">
          Krátká pauza na doplňování výbavy. Kredity: <strong className="text-emerald-400 font-mono text-base">{gracePoints}</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {shopCards.map((item, idx) => {
            const kind = classifyCardKind(item.card);
            const meta = CARD_KIND_META[kind];
            const canAfford = gracePoints >= item.price && !item.bought;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border-2 flex flex-col justify-between transition-all ${
                  item.bought
                    ? 'opacity-40 border-slate-700 bg-black/40'
                    : 'bg-[#1a1410] border-[#8a6744] hover:border-[#d9a441] shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono uppercase font-bold text-amber-300/80 mb-1">
                    <span>{meta.label}</span>
                    {item.card.stars ? <span>{starEmoji(item.card.stars)}</span> : null}
                  </div>
                  <div className="font-bold text-sm text-white mb-1">{item.card.name}</div>
                  <div className="text-xs text-slate-300 leading-snug mb-3">{item.card.text}</div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#d9a441] font-bold">
                    {item.price} Kreditů
                  </span>
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => handleBuy(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${
                      item.bought
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : canAfford
                        ? 'bg-[#d9a441] hover:bg-amber-400 text-black'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {item.bought ? 'Zakoupeno' : 'Koupit'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onContinue}
            className="py-3 px-8 rounded-xl font-['Goldman'] text-sm sm:text-base font-bold uppercase bg-gradient-to-r from-[#d9a441] to-[#b88628] text-black hover:brightness-110 shadow-lg"
          >
            Pokračovat ve výstupu →
          </button>
        </div>
      </div>
    </div>
  );
};

interface ChoiceScreenProps {
  onSelectOption: (type: 'combat' | 'shop' | 'service', label: string) => void;
}

export const ChoiceScreen: React.FC<ChoiceScreenProps> = ({ onSelectOption }) => {
  const choices = [
    { type: 'shop' as const, label: 'Zásobovací modul (Obchod)', emoji: '🛒', desc: 'Možnost nakoupit nové karty do balíčku za Kredity.' },
    { type: 'service' as const, label: 'Servisní zastávka', emoji: '🛠️', desc: 'Oprava Reaktoru, Kapoty a Protonové bublináže.' },
    { type: 'combat' as const, label: 'Trapný tandem', emoji: '🤝', desc: 'Dvě entity na scéně, běžná úroveň.' },
    { type: 'combat' as const, label: 'Otravná partička', emoji: '👥', desc: 'Tři entity v rychlém sledu, solidní zisk Kreditů.' },
    { type: 'combat' as const, label: 'Potulný boss', emoji: '👑', desc: 'Jedna silná elitní entita s velkou odměnou.' }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#0b0a08] text-[#eafcff] overflow-y-auto">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-['Goldman'] text-2xl sm:text-3xl text-[#d9a441] mb-2">
          Cesto má, veď mě dál...
        </h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Další úsek cesty je za tebou. Skenery zachycují několik možných směrů výstupu k vrcholu Arx Prima.
        </p>

        <div className="space-y-3 mb-6">
          {choices.map((c, i) => (
            <div
              key={i}
              onClick={() => onSelectOption(c.type, c.label)}
              className="p-4 rounded-xl bg-[#1a1410] border-2 border-[#8a6744] hover:border-[#d9a441] cursor-pointer text-left transition-all hover:scale-[1.01] shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.emoji}</span>
                <div>
                  <div className="font-['Goldman'] font-bold text-sm text-[#f3d48a]">{c.label}</div>
                  <div className="text-xs text-slate-300">{c.desc}</div>
                </div>
              </div>
              <span className="font-mono text-xs text-[#d9a441] font-bold">Vybrat →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ServiceScreen: React.FC<{
  onService: () => void;
  onBack: () => void;
}> = ({ onService, onBack }) => {
  return (
    <div className="min-h-screen p-6 bg-[#0b0a08] text-[#eafcff] flex flex-col justify-center items-center text-center">
      <div className="max-w-md w-full">
        <div className="text-4xl mb-2">🛠️</div>
        <h2 className="font-['Goldman'] text-2xl text-[#d9a441] mb-2">
          Servisní zastávka
        </h2>
        <p className="text-xs text-slate-400 italic mb-6">
          „Co se pokazí, jde spravit — pokud si na to najdeš čas.“
        </p>

        <div className="p-4 rounded-xl bg-[#1a1410] border border-[#8a6744] mb-6 text-xs text-slate-300 space-y-2 text-left">
          <div>• Plná oprava poškozeného Reaktoru mecha</div>
          <div>• Obnova Kapoty a Protonové bublináže</div>
          <div>• Diagnostika servopohonů a promazání kloubů</div>
        </div>

        <button
          type="button"
          onClick={onService}
          className="w-full py-3 mb-3 rounded-xl font-['Goldman'] text-sm font-bold uppercase bg-gradient-to-r from-emerald-600 to-green-700 text-white hover:brightness-110 shadow-lg"
        >
          Provést servis
        </button>

        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-mono"
        >
          Zpět
        </button>
      </div>
    </div>
  );
};

export const WinScreen: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  return (
    <div className="min-h-screen p-6 bg-[#0b0a08] text-[#eafcff] flex flex-col justify-center items-center text-center">
      <div className="max-w-lg">
        <div className="text-6xl mb-4 animate-bounce">🍺</div>
        <h1 className="font-['Goldman'] text-3xl sm:text-4xl text-[#d9a441] font-bold mb-4 drop-shadow-[0_0_15px_rgba(217,164,65,0.7)]">
          Arx Prima. Vrchol.
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Rezavý mech se zastaví pod obřím Y. Průhledné stěny, zlaté výtahy, knihovna až do metanu — a ve sklepě tygřího slimáka Vyktora Kalta leží to, proč Filarcháj řval jako Titanic: celá basa Plzně, ani láhev nechybí!<br /><br />
          <strong>Artefakt. Pivo. Zakázka splněna. Poslední Čech zvítězil!</strong>
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="py-3 px-8 rounded-xl font-['Goldman'] text-base font-bold uppercase bg-gradient-to-r from-[#d9a441] to-[#b88628] text-black hover:brightness-110 shadow-xl"
        >
          Hrát znovu 🍺
        </button>
      </div>
    </div>
  );
};

export const LoseScreen: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  return (
    <div className="min-h-screen p-6 bg-[#0b0a08] text-[#eafcff] flex flex-col justify-center items-center text-center">
      <div className="max-w-lg">
        <div className="text-6xl mb-4">💥</div>
        <h1 className="font-['Goldman'] text-3xl sm:text-4xl text-red-500 font-bold mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
          REAKTOR KRITICKÝ
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Poplašné světlo zaplaví kokpit rudou. Jádro překročilo mez a povolilo — poslední, co slyšíš, je řev turbín umlkající v tichu.<br /><br />
          <em>Mech je vrak. Basa plzeňského počká na někoho jiného.</em>
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="py-3 px-8 rounded-xl font-['Goldman'] text-base font-bold uppercase bg-gradient-to-r from-red-600 to-rose-700 text-white hover:brightness-110 shadow-xl"
        >
          Zkusit znovu
        </button>
      </div>
    </div>
  );
};

export const StoryScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#0b0a08] text-[#eafcff] overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="font-['Goldman'] text-2xl text-[#d9a441] text-center mb-4">
          📖 Příběh Radima Hnáta
        </h2>
        <div className="bg-[#1a1410] p-4 rounded-xl border border-[#8a6744] text-xs sm:text-sm leading-relaxed space-y-3 text-slate-300">
          <h3 className="font-['Goldman'] text-base text-[#f3d48a]">Mars</h3>
          <p>V kantýně na orbitální stanici se vzduch třpytil prachem z umělých citrusů. Radim se opřel loktem své bionické ruky o pult a sledoval Marťanku s kůží v odstínu zralé meruňky protkávanou stříbrnými žilkami.</p>
          <p>„Co si dnes dopřeješ, pozemšťane?“ zeptala se. Než však stihla dokončit větu, Radimův archaicky velký pager se rozvibroval a rozkřičel. Volal mrož Filarcháj — klient velký nejen vzrůstem — s příznakem „Naléhavé!“.</p>
          <h3 className="font-['Goldman'] text-base text-[#f3d48a] pt-2">Vyktor Kalt a Arx Prima</h3>
          <p>Na samotném vrcholu Arx Prima, nejvyšší hory Neptunu vydupané z ledového metanového oceánu, bydlel Vyktor Kalt — tygří slimák, který nevěděl co s penězi. Měl zlaté výtahy, obří Y na střeše, a především: v chladném sklepě celou basu pravé pozemské Plzně.</p>
          <p>„Hnáte,“ pravil mrož hlasem jako Titanic, „přines mi tu basu. Celou. Ani láhev nechybí.“ Radim přikývl. Mise začala.</p>
        </div>
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
          >
            ⬅️ Zpět
          </button>
        </div>
      </div>
    </div>
  );
};

export const RoadmapScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#0b0a08] text-[#eafcff] overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="font-['Goldman'] text-2xl text-[#d9a441] text-center mb-4">
          📋 Plán změn
        </h2>
        <div className="bg-[#1a1410] p-4 rounded-xl border border-[#8a6744] text-xs leading-relaxed space-y-2 text-slate-300">
          <p className="font-bold text-[#f3d48a]">✅ Dokončeno:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Autentický graficky zpracovaný kokpit mecha s korozí, nýty, analogovými budíky a hydraulikou.</li>
            <li>Taktická CRT obrazovka v centru kokpitu zobrazující nepřítele se scanlines a zaměřovačem.</li>
            <li>Samolepka Krtečka s roztomilou interakcí přímo na panelu kabiny!</li>
            <li>Čtyři vrstvy obrany (Holoklam, Bublináž, Kapota, Reaktor) s reaktivním poškozením a predikcí.</li>
            <li>Deckbuilder soubojový systém se 47 kartami, Vyladěním, Ručičkami a BabiCZkou.</li>
          </ul>
        </div>
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
          >
            ⬅️ Zpět
          </button>
        </div>
      </div>
    </div>
  );
};
