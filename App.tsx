import React, { useState, useEffect, useMemo } from 'react';
import { SymbolId, PrizeDef, SymbolDef } from './types';
import { SYMBOLS, PRIZES, SYMBOL_MAP } from './constants';
import Reel from './components/Reel';
import WinningModal from './components/WinningModal';
import Lever from './components/Lever';

const SPIN_COST = 50000;
const REEL_COUNT = 3;

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState<SymbolId[]>(['jackpot', 'jackpot', 'jackpot']);
  const [winningPrize, setWinningPrize] = useState<PrizeDef | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showNoWinResult, setShowNoWinResult] = useState<boolean>(false);


  // Create a visually-enhanced symbol list for the reels to increase excitement.
  // This adds more jackpot symbols to the visual reel strip without changing win odds.
  const visualSymbols = useMemo(() => {
    const jackpotSymbol = SYMBOL_MAP['jackpot'];
    if (!jackpotSymbol) return SYMBOLS; // Fallback

    const enhancedSymbols: SymbolDef[] = [...SYMBOLS];
    // Add 4 extra jackpot symbols for visual flair
    for (let i = 0; i < 4; i++) {
        enhancedSymbols.push(jackpotSymbol);
    }

    // Shuffle the array for a more random appearance on the reel
    return enhancedSymbols.sort(() => Math.random() - 0.5);
  }, []);


  // Preload logo image
  useEffect(() => {
      const img = new Image();
      const jackpotSymbol = SYMBOL_MAP['jackpot'];
      if (jackpotSymbol && React.isValidElement(jackpotSymbol.component) && jackpotSymbol.component.type === 'img') {
          img.src = jackpotSymbol.component.props.src;
      }
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setShowPlaceholder(false);
    setIsSpinning(true);

    // Determine the outcome based on new probabilities
    const r = Math.random() * 100;
    let newResults: SymbolId[];

    if (r < 2) { // 2% for Jackpot
        newResults = ['jackpot', 'jackpot', 'jackpot'];
    } else if (r < 9) { // 7% for Weekly Hookah
        newResults = ['weekly_hookah', 'weekly_hookah', 'weekly_hookah'];
    } else if (r < 14) { // 5% for Cash 1M
        newResults = ['cash_1m', 'cash_1m', 'cash_1m'];
    } else if (r < 19) { // 5% for Cash 500k
        newResults = ['cash_500k', 'cash_500k', 'cash_500k'];
    } else if (r < 34) { // 15% for Hookah
        newResults = ['hookah', 'hookah', 'hookah'];
    } else if (r < 39) { // 5% for Omelet
        newResults = ['omelet', 'omelet', 'omelet'];
    } else if (r < 44) { // 5% for Sausage Egg
        newResults = ['sausage_egg', 'sausage_egg', 'sausage_egg'];
    } else if (r < 52) { // 8% for Coffee
        newResults = ['coffee', 'coffee', 'coffee'];
    } else { // 48% for No Win
        // Generate a guaranteed losing combination
        const allSymbolIds = SYMBOLS.map(s => s.id);
        let tempResults: SymbolId[];
        
        do {
            tempResults = Array.from({ length: REEL_COUNT }, () => allSymbolIds[Math.floor(Math.random() * allSymbolIds.length)]);
        } while (PRIZES.some(p =>
            p.combination[0] === tempResults[0] &&
            p.combination[1] === tempResults[1] &&
            p.combination[2] === tempResults[2]
        ));
        newResults = tempResults;
    }

    setTimeout(() => {
      setResults(newResults);
      setIsSpinning(false);
      checkWin(newResults);
    }, 3500); // Wait for spin animation to roughly finish
  };

  const checkWin = (currentResults: SymbolId[]) => {
    const prize = PRIZES.find(p =>
      p.combination[0] === currentResults[0] &&
      p.combination[1] === currentResults[1] &&
      p.combination[2] === currentResults[2]
    );

    if (prize) {
        setTimeout(() => setWinningPrize(prize), 500);
    } else {
        // No win, show the results in a large format
        setTimeout(() => {
            setShowNoWinResult(true);
        }, 500); // 0.5-second delay to let reels settle
    }
  };

  const handleCloseModal = () => {
    setWinningPrize(null);
    setShowPlaceholder(true);
  };
  
  const handleCloseNoWin = () => {
    setShowNoWinResult(false);
    setShowPlaceholder(true);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen w-screen flex flex-col lg:flex-row items-center justify-center lg:justify-around p-4 overflow-hidden bg-cover bg-center" style={{
        backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.8)), url(https://images.pexels.com/photos/15781335/pexels-photo-15781335/free-photo-of-empty-traditional-restaurant-in-iran.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
    }}>
      <WinningModal prize={winningPrize} onClose={handleCloseModal} />
      
      {/* No-Win Result Display */}
      {showNoWinResult && (
          <div 
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-4 flex-col"
              onClick={handleCloseNoWin}
          >
              <div className="text-center mb-6">
                    <h3 className="text-4xl font-black text-slate-300 mb-2">
                      متاسفانه برنده نشدید!
                    </h3>
                    <p className="text-xl text-slate-400">این هم نتیجه شما:</p>
              </div>
              <div className="flex justify-center items-center gap-4">
                  {results.map((symbolId, index) => (
                      <div key={index} className="bg-slate-800/50 border-2 border-slate-600 rounded-xl p-4 min-w-[120px] text-center">
                          <span className="text-2xl font-bold text-slate-200">{SYMBOL_MAP[symbolId]?.name}</span>
                      </div>
                  ))}
              </div>
              <button
                onClick={handleCloseNoWin}
                className="mt-12 bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-teal-500 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-500"
              >
                  دوباره امتحان کن
              </button>
          </div>
      )}
      
      {/* Left Panel (Info) */}
      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center text-center [perspective:1000px] order-2 lg:order-1">
         <header className="text-center mb-4">
            <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-teal-500" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.5)' }}>
            قهوه خانه لیالی نجف
            </h1>
            <p className="text-teal-200/80 text-2xl mt-2">هزینه هر بار چرخش: {SPIN_COST.toLocaleString('fa-IR')} تومان</p>
        </header>

        {showPlaceholder && (
            <div className="text-center my-4">
                <span className="text-4xl lg:text-5xl font-bold text-amber-400 tracking-wider animate-pulse-gold">
                    ۱۱۰ میلیون تومان جایزه در انتظار شماست
                </span>
                <p className="text-2xl lg:text-3xl text-slate-200 mt-3">
                    امروز قطعا روز برد شماست
                </p>
            </div>
        )}

        <div className="w-full max-w-md bg-slate-800/60 rounded-xl p-6 backdrop-blur-sm mt-8 transform [transform-style:preserve-3d] rotate-x-[-12deg] skew-y-[-4deg] transition-all duration-500 ease-out hover:rotate-x-0 hover:skew-y-0 shadow-2xl shadow-black/50 border-t border-l border-cyan-400/20 border-b-4 border-r-4 border-blue-900/60">
            <h2 className="text-4xl font-bold text-center mb-4 text-teal-300">لیست جوایز</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-center">
                {PRIZES.map(prize => (
                    <div key={prize.id} className="bg-black/30 rounded-lg p-2 flex items-center justify-center">
                        <p className={`text-xl font-semibold ${prize.id === 'p1' ? 'text-amber-400' : 'text-slate-200'}`}>{prize.name}</p>
                    </div>
                ))}
            </div>
        </div>

        <footer className="text-slate-500 text-lg mt-8">
            طراحی شده برای قهوه خانه سنتی لیالی نجف
        </footer>
      </div>

      {/* Right Panel (Machine) */}
       <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
          <div 
              className="bg-gradient-to-b from-blue-900 via-gray-900 to-black border-8 border-teal-600 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-6" 
              style={{boxShadow: 'inset 0 0 25px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)'}}
          >
              <div 
                  className="flex justify-center items-center gap-4 relative bg-black/50 p-3 rounded-lg shadow-inner"
                  style={{boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)'}}
              >
                  <div className="absolute top-1/2 -translate-y-1/2 h-1 w-[95%] bg-cyan-400/70 blur-[1px] z-10 rounded-full"></div>
                  
                  {Array.from({ length: REEL_COUNT }).map((_, i) => (
                      <Reel
                      key={i}
                      symbols={visualSymbols}
                      result={results[i]}
                      isSpinning={isSpinning}
                      delay={i * 0.15}
                      />
                  ))}
              </div>
              <div className="w-48 h-8 bg-gradient-to-t from-gray-600 to-gray-800 rounded-t-lg shadow-inner" style={{boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.7)'}}></div>
          </div>

          <div className="my-8">
              <Lever onSpin={handleSpin} isSpinning={isSpinning} />
          </div>
      </div>
    </div>
  );
};

export default App;