import React from 'react';

interface LeverProps {
  onSpin: () => void;
  isSpinning: boolean;
}

const Lever: React.FC<LeverProps> = ({ onSpin, isSpinning }) => {
  return (
    <button
      onClick={onSpin}
      disabled={isSpinning}
      className="relative w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white font-bold text-4xl shadow-lg border-b-8 border-red-800 transition-all duration-150 ease-in-out transform hover:from-red-400 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75 active:border-b-2 active:translate-y-1 disabled:from-red-700 disabled:to-red-900 disabled:border-red-900 disabled:text-gray-400 disabled:cursor-not-allowed disabled:filter disabled:grayscale-50"
      aria-label="بچرخون"
    >
      <span className="absolute inset-0 rounded-full" style={{boxShadow: 'inset 0 4px 8px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.4)'}}></span>
      <span className="relative">
        بچرخون
      </span>
    </button>
  );
};

export default Lever;
