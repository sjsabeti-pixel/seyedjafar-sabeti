import React, { useState, useEffect, useRef } from 'react';
import { SymbolDef, SymbolId } from '../types';

interface ReelProps {
  symbols: SymbolDef[];
  result: SymbolId | null;
  isSpinning: boolean;
  delay: number;
}

const REEL_ITEM_HEIGHT = 144; // Corresponds to h-36

const Reel: React.FC<ReelProps> = ({ symbols, result, isSpinning, delay }) => {
  const reelRef = useRef<HTMLDivElement>(null);

  const extendedSymbols = [...symbols, ...symbols, ...symbols];

  const getResultPosition = () => {
    if (!result) return 0;
    const resultIndex = symbols.findIndex(s => s.id === result);
    // Target the symbol in the second set for a smoother stop
    const targetIndex = resultIndex + symbols.length;
    return -(targetIndex * REEL_ITEM_HEIGHT);
  };

  const reelStyle: React.CSSProperties = {
    transition: `transform 3s cubic-bezier(0.25, 1, 0.5, 1)`,
    transform: isSpinning ? `translateY(-${extendedSymbols.length * REEL_ITEM_HEIGHT - REEL_ITEM_HEIGHT * 2}px)` : `translateY(${getResultPosition()}px)`,
    transitionDelay: `${delay}s`,
  };

  return (
    <div className="h-36 w-32 bg-black/30 rounded-lg overflow-hidden border-2 border-slate-700 backdrop-blur-sm">
      <div ref={reelRef} style={reelStyle}>
        {extendedSymbols.map((symbol, index) => (
          <div key={`${symbol.id}-${index}`} className="h-36 w-full flex items-center justify-center text-center p-2">
            <span className={`font-bold text-xl ${symbol.id === 'jackpot' ? 'text-cyan-300' : 'text-slate-200'}`}>
              {symbol.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reel;