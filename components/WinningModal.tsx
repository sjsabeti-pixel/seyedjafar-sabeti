import React from 'react';
import { PrizeDef } from '../types';

interface WinningModalProps {
  prize: PrizeDef | null;
  onClose: () => void;
}

const WinningModal: React.FC<WinningModalProps> = ({ prize, onClose }) => {
  if (!prize) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 border-4 border-cyan-400 rounded-2xl shadow-2xl p-6 md:p-8 text-center relative animate-pulse-win w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-4xl md:text-5xl font-black text-cyan-300 mb-4">
          شما برنده شدید!
        </h2>
        
        <p className="text-3xl md:text-4xl font-bold text-white my-12">
          {prize.name}
        </p>

        <button
          onClick={onClose}
          className="bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-xl hover:bg-cyan-400 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          ادامه
        </button>
      </div>
    </div>
  );
};

export default WinningModal;