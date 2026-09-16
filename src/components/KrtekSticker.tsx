import React, { useState } from 'react';
import { playKrtekChirp } from '../utils/sound';

interface KrtekStickerProps {
  className?: string;
  onTap?: () => void;
}

export const KrtekSticker: React.FC<KrtekStickerProps> = ({ className = '', onTap }) => {
  const [clicked, setClicked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playKrtekChirp();
    setClicked(true);
    setShowTooltip(true);
    setTimeout(() => setClicked(false), 600);
    setTimeout(() => setShowTooltip(false), 3200);
    if (onTap) onTap();
  };

  return (
    <div
      id="krtek-sticker-wrapper"
      className={`relative select-none cursor-pointer group transition-transform ${className}`}
      onClick={handleClick}
      title="Samolepka Krtečka — Radimova šťastná samolepka pro štěstí na cestu"
    >
      {/* Speech bubble / easter egg popup */}
      {showTooltip && (
        <div
          id="krtek-tooltip"
          className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 bg-[#16213a]/95 border-2 border-[#d9a441] text-[#eafcff] text-xs font-semibold px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap animate-bounce"
          style={{ textShadow: '0 1px 2px #000' }}
        >
          <span>🖤 Ahoj! Krteček ti kryje záda! 🇨🇿</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-[#d9a441]" />
        </div>
      )}

      {/* Realistic distressed die-cut sticker badge */}
      <div
        id="krtek-sticker"
        className={`relative inline-block transform transition-all duration-200 ${
          clicked ? 'scale-110 -rotate-3' : '-rotate-6 hover:-rotate-3 hover:scale-105'
        }`}
        style={{
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.85)) drop-shadow(0 1px 2px rgba(177,80,46,0.5))'
        }}
      >
        {/* Paper frame with peeling corner and wear */}
        <div className="relative p-1.5 bg-[#f5efe6] rounded-2xl border-2 border-[#d4c5b3] shadow-inner overflow-hidden">
          {/* Peeling top-right corner highlight */}
          <div
            className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-[#dfd4c4] to-[#f5efe6] shadow-sm pointer-events-none"
            style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
          />

          {/* Sticker image */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <img
              src="/src/assets/images/krtek_sticker_1789581106628.jpg"
              alt="Samolepka Krtečka"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain pointer-events-none filter contrast-105"
            />
            {/* Scratched sticker gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-60" />
          </div>

          {/* Authentic stamped vintage text label underneath */}
          <div className="text-center mt-1">
            <span
              className="block font-mono text-[8px] uppercase tracking-wider font-bold text-[#8a5a12] leading-none"
              style={{ letterSpacing: '0.08em' }}
            >
              KRTEK • ŠTĚSTÍ
            </span>
          </div>

          {/* Slight rust smudge on the sticker corner */}
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#b1502e]/30 rounded-full blur-[1px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
