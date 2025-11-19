
import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import { Icons } from '../components/icons';
import { Input } from '../components/Input';
import { generateMines, generateServerSeed, sha512 } from '../lib/crypto';
import { ToastContext } from '../context/ToastContext';
import { AppContext } from '../context/AppContext';

// --- Constants & Math ---
const GRID_SIZE = 25;
const HOUSE_EDGE = 0.99; // 1% House Edge

const combinations = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k > n / 2) k = n - k;
  let res = 1;
  for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
  return res;
};

const calculateMultiplier = (mines: number, revealed: number): number => {
  if (revealed === 0) return 1.0;
  const multiplier = (HOUSE_EDGE * combinations(GRID_SIZE, revealed)) / combinations(GRID_SIZE - mines, revealed);
  return multiplier;
};

// --- Types ---
type Tile = { isMine: boolean; isRevealed: boolean; };
type GameState = 'idle' | 'in_progress' | 'game_over';
type GameResult = { type: 'win' | 'loss'; profit: number; multiplier: number } | null;

// --- Assets ---
const DiamondIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="url(#diamond-gradient)" stroke="#00FFC0" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 2L7 12L12 22" stroke="#00FFC0" strokeWidth="0.5" strokeOpacity="0.5" />
        <path d="M12 2L17 12L12 22" stroke="#00FFC0" strokeWidth="0.5" strokeOpacity="0.5" />
        <path d="M2 12H22" stroke="#00FFC0" strokeWidth="0.5" strokeOpacity="0.5" />
        <defs>
            <linearGradient id="diamond-gradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FFC0" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#00FFC0" stopOpacity="0.05" />
                <stop offset="1" stopColor="#00FFC0" stopOpacity="0.2" />
            </linearGradient>
        </defs>
    </svg>
);

const BombIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="#330000" stroke="#FF0033" strokeWidth="1.5" />
        <path d="M12 7V17" stroke="#FF0033" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 12H17" stroke="#FF0033" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.5 8.5L15.5 15.5" stroke="#FF0033" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15.5 8.5L8.5 15.5" stroke="#FF0033" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#FF0033" className="animate-pulse" />
    </svg>
);

const MinesGamePage: React.FC = () => {
    const toastContext = useContext(ToastContext);
    const appContext = useContext(AppContext);

    // Game Config State
    const [gameState, setGameState] = useState<GameState>('idle');
    const [betAmount, setBetAmount] = useState<number | ''>(10);
    const [minesCount, setMinesCount] = useState(3);
    const [simBalance, setSimBalance] = useState(10000);
    const [isSimMode, setIsSimMode] = useState(false);
    const [gameResult, setGameResult] = useState<GameResult>(null);

    // Board State
    const [grid, setGrid] = useState<Tile[]>(() => Array(GRID_SIZE).fill({ isMine: false, isRevealed: false }));
    const [hoveredTile, setHoveredTile] = useState<number | null>(null);

    // Provably Fair State
    const [clientSeed, setClientSeed] = useState('zap-client-seed-v1');
    const [serverSeed, setServerSeed] = useState(() => generateServerSeed());
    const [hashedServerSeed, setHashedServerSeed] = useState(() => sha512(serverSeed));
    const [nonce, setNonce] = useState(1);
    const [isPFModalOpen, setIsPFModalOpen] = useState(false);

    // --- Derived Metrics ---
    const revealedCount = useMemo(() => grid.filter(t => t.isRevealed && !t.isMine).length, [grid]);
    const safeRemaining = useMemo(() => GRID_SIZE - minesCount - revealedCount, [minesCount, revealedCount]);
    const currentMultiplier = useMemo(() => calculateMultiplier(minesCount, revealedCount), [minesCount, revealedCount]);
    const nextMultiplier = useMemo(() => calculateMultiplier(minesCount, revealedCount + 1), [minesCount, revealedCount]);
    
    const displayProfit = useMemo(() => {
        if (gameState === 'game_over' && gameResult) {
            return gameResult.profit;
        }
        const bet = Number(betAmount) || 0;
        return (bet * currentMultiplier) - bet;
    }, [gameState, gameResult, betAmount, currentMultiplier]);

    // --- Actions ---

    const handleBet = () => {
        const bet = Number(betAmount);
        if (bet <= 0 || (isSimMode && bet > simBalance)) {
            toastContext?.showToast("Insufficient funds or invalid bet.", "error");
            return;
        }

        // Reset
        if (isSimMode) setSimBalance(prev => prev - bet);
        setGameState('in_progress');
        setGameResult(null);
        
        // Generate Mines
        const mineIndices = generateMines(serverSeed, clientSeed, nonce, minesCount);
        const newGrid = Array(GRID_SIZE).fill(null).map((_, index) => ({
            isMine: mineIndices.includes(index),
            isRevealed: false,
        }));
        setGrid(newGrid);
    };

    const handleTileClick = (index: number) => {
        if (gameState !== 'in_progress' || grid[index].isRevealed) return;

        const newGrid = [...grid];
        newGrid[index] = { ...newGrid[index], isRevealed: true };

        if (newGrid[index].isMine) {
            // GAME OVER: LOSS
            setGameState('game_over');
            // Reveal all mines
            const finalGrid = newGrid.map(tile => tile.isMine ? { ...tile, isRevealed: true } : tile);
            setGrid(finalGrid);
            setGameResult({ type: 'loss', profit: -Number(betAmount), multiplier: 0 });
            
            // Rotate Seed
            rotateSeed();

        } else {
            // SAFE
            setGrid(newGrid);
            // Check for Auto-Win (All safe tiles revealed)
            const safeTiles = GRID_SIZE - minesCount;
            const revealedSafe = newGrid.filter(t => t.isRevealed && !t.isMine).length;
            
            if (revealedSafe === safeTiles) {
                 handleCashout(newGrid);
            }
        }
    };

    const handleCashout = (currentGrid = grid) => {
        if (gameState !== 'in_progress') return;

        const bet = Number(betAmount) || 0;
        const profit = (bet * currentMultiplier) - bet;
        if (isSimMode) setSimBalance(prev => prev + bet + profit);

        setGameState('game_over');
        setGameResult({ type: 'win', profit: profit, multiplier: currentMultiplier });
        
        // Reveal remaining grid safely (visual only)
        const finalGrid = currentGrid.map(tile => ({ ...tile, isRevealed: true }));
        setGrid(finalGrid);

        rotateSeed();
        toastContext?.showToast(`Mission Accomplished. Profit: $${profit.toFixed(2)}`, "success");
    };

    const rotateSeed = () => {
        const newServerSeed = generateServerSeed();
        setServerSeed(newServerSeed);
        setHashedServerSeed(sha512(newServerSeed));
        setNonce(prev => prev + 1);
    };

    const navigateToVerify = () => {
        appContext?.setCurrentPage('Provably Fair');
        setIsPFModalOpen(false);
    };

    // --- Styles & Classes ---
    
    // Dynamic Slider Color
    const sliderColorClass = minesCount < 10 ? 'accent-neon-surge' : minesCount < 15 ? 'accent-yellow-500' : 'accent-warning-high';
    const riskTextClass = minesCount < 10 ? 'text-neon-surge' : minesCount < 15 ? 'text-yellow-500' : 'text-warning-high';

    // Dynamic Grid Border
    const gridContainerClass = useMemo(() => {
        let base = "aspect-square w-full max-w-[800px] mx-auto bg-[#0f0f13] rounded-2xl md:rounded-3xl p-3 md:p-6 relative shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] overflow-hidden group/grid transition-all duration-500";
        if (gameState === 'game_over' && gameResult) {
            if (gameResult.type === 'win') return `${base} border-2 border-neon-surge shadow-[0_0_50px_rgba(0,255,192,0.2)]`;
            return `${base} border-2 border-warning-high shadow-[0_0_50px_rgba(255,0,51,0.2)]`;
        }
        return `${base} border border-[#222]`;
    }, [gameState, gameResult]);

    const renderActionButton = (mobile: boolean) => (
        <div className={mobile ? 'block lg:hidden mt-4' : 'hidden lg:block'}>
             {gameState === 'in_progress' ? (
                 <button 
                    onClick={() => handleCashout()} 
                    disabled={revealedCount === 0}
                    className="w-full relative group overflow-hidden rounded-xl bg-neon-surge py-4 md:py-5 shadow-[0_0_30px_rgba(0,255,192,0.3)] hover:shadow-[0_0_50px_rgba(0,255,192,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                     <div className="relative z-10 flex flex-col items-center">
                         <span className="font-orbitron font-black text-black text-lg md:text-xl tracking-widest uppercase">CASHOUT</span>
                         <span className="font-mono text-black font-bold text-sm tracking-wider">
                             ${(Number(betAmount) * currentMultiplier).toFixed(2)}
                         </span>
                     </div>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 </button>
             ) : (
                 <button 
                    onClick={handleBet}
                    className={`w-full relative group overflow-hidden rounded-xl py-4 md:py-5 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 active:scale-[0.98] ${gameState === 'game_over' ? 'bg-white text-black hover:bg-gray-200' : 'bg-neon-surge text-black hover:brightness-110'}`}
                >
                     <span className="font-orbitron font-black text-lg md:text-xl tracking-widest uppercase relative z-10">
                         {gameState === 'game_over' ? 'REDEPLOY' : 'DEPLOY PROBE'}
                     </span>
                     <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 </button>
             )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-rajdhani p-2 md:p-8 animate-fadeIn relative">
             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,192,0.03),transparent_60%)]"></div>

            {/* HEADER */}
            <div className="max-w-[1600px] mx-auto mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={() => appContext?.setCurrentPage('Dashboard')} className="p-2 rounded-lg border border-[#333] hover:border-neon-surge/50 text-text-tertiary hover:text-white transition-colors bg-[#0c0c0e]">
                        <Icons.ChevronLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-orbitron font-black uppercase tracking-widest text-white flex items-center gap-2">
                            <Icons.Mine className="w-6 h-6 text-neon-surge" /> TACTICAL MINES
                        </h1>
                        <p className="text-[10px] font-jetbrains-mono text-text-tertiary flex items-center gap-2 hidden sm:flex">
                            <span className="w-2 h-2 rounded-full bg-neon-surge animate-pulse"></span>
                            HASH: {hashedServerSeed.substring(0, 16)}...
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <button onClick={() => setIsPFModalOpen(!isPFModalOpen)} className="flex items-center gap-2 px-3 py-2 rounded-md border border-neon-surge/30 bg-neon-surge/5 text-neon-surge text-[10px] md:text-xs font-bold font-orbitron uppercase hover:bg-neon-surge/10 transition-all hover:shadow-[0_0_15px_rgba(0,255,192,0.2)]">
                        <Icons.Lock className="w-3 h-3" /> Provably Fair
                    </button>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#333] bg-[#14131c]">
                        <span className="text-[10px] font-jetbrains-mono text-text-tertiary uppercase hidden sm:inline">SIM BALANCE</span>
                        <span className={`text-xs md:text-sm font-mono font-bold ${isSimMode ? 'text-yellow-500' : 'text-white'}`}>
                            ${simBalance.toLocaleString()}
                        </span>
                        <button onClick={() => setIsSimMode(!isSimMode)} className={`ml-1 w-8 h-4 rounded-full relative transition-colors ${isSimMode ? 'bg-yellow-500' : 'bg-[#333]'}`}>
                             <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-black transition-all shadow-sm ${isSimMode ? 'left-4.5' : 'left-0.5'}`}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN LAYOUT - Mobile Order: Grid First, Controls Second */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
                
                {/* LEFT CONSOLE: CONFIGURATION (Order 2 on Mobile, Order 1 on Desktop) */}
                <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
                    <div className="bg-[#0c0c0e] border border-[#333] rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden group">
                         {/* Decorative Top Line */}
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-surge/50 to-transparent opacity-50"></div>
                         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#333] to-transparent"></div>

                         <div className="space-y-8">
                             {/* Bet Input */}
                             <div className="relative">
                                 <div className="flex justify-between mb-2">
                                     <label className="text-xs font-orbitron text-text-tertiary uppercase tracking-widest flex items-center gap-2">
                                        <Icons.dollarSign className="w-3 h-3" /> Bet Amount
                                     </label>
                                     {isSimMode && <span className="text-xs font-mono text-yellow-500 animate-pulse">SIMULATION MODE</span>}
                                 </div>
                                 <div className="relative group/input">
                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                         <span className="text-text-tertiary font-mono">$</span>
                                     </div>
                                     <Input 
                                        type="number" 
                                        value={betAmount} 
                                        onChange={(e) => setBetAmount(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="pl-7 bg-[#080808] border-[#333] text-white font-mono text-lg h-14 rounded-lg focus:border-neon-surge focus:shadow-[0_0_20px_rgba(0,255,192,0.15)] transition-all"
                                        disabled={gameState === 'in_progress'}
                                     />
                                      <div className="absolute inset-y-0 right-1 flex items-center gap-1">
                                         <button onClick={() => setBetAmount(prev => Math.max(1, Number(prev) / 2))} disabled={gameState === 'in_progress'} className="bg-[#1a1a1a] hover:bg-[#222] text-[10px] font-bold px-2 py-1.5 rounded border border-[#333] text-text-secondary transition-colors font-jetbrains-mono">½</button>
                                         <button onClick={() => setBetAmount(prev => Number(prev) * 2)} disabled={gameState === 'in_progress'} className="bg-[#1a1a1a] hover:bg-[#222] text-[10px] font-bold px-2 py-1.5 rounded border border-[#333] text-text-secondary transition-colors font-jetbrains-mono">2×</button>
                                         <button onClick={() => setBetAmount(simBalance)} disabled={gameState === 'in_progress'} className="bg-[#1a1a1a] hover:bg-[#222] text-[10px] font-bold px-2 py-1.5 rounded border border-[#333] text-text-secondary transition-colors font-jetbrains-mono text-neon-surge">MAX</button>
                                     </div>
                                 </div>
                             </div>

                             {/* Mines Slider */}
                             <div className="p-4 rounded-xl bg-[#14131c] border border-[#333] relative">
                                 <div className="flex justify-between mb-4">
                                     <label className="text-xs font-orbitron text-text-tertiary uppercase tracking-widest">Risk Level</label>
                                     <span className={`text-lg font-bold font-mono ${riskTextClass}`}>{minesCount} MINES</span>
                                 </div>
                                 <div className="relative h-6 flex items-center">
                                     <input 
                                        type="range" 
                                        min="1" 
                                        max="24" 
                                        value={minesCount} 
                                        onChange={(e) => setMinesCount(Number(e.target.value))}
                                        className={`absolute w-full h-full opacity-0 cursor-pointer z-20`}
                                        disabled={gameState === 'in_progress'}
                                     />
                                     {/* Custom Track */}
                                     <div className="w-full h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#333] relative z-10">
                                         <div 
                                            className={`h-full transition-all duration-300 ease-out ${minesCount < 10 ? 'bg-neon-surge' : minesCount < 15 ? 'bg-yellow-500' : 'bg-warning-high'}`} 
                                            style={{ width: `${(minesCount / 24) * 100}%` }}
                                         ></div>
                                     </div>
                                     {/* Custom Thumb */}
                                     <div 
                                        className="absolute h-5 w-5 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] top-1/2 -translate-y-1/2 transition-all duration-300 z-10 pointer-events-none border-2 border-[#0c0c0e]"
                                        style={{ left: `calc(${(minesCount / 24) * 100}% - 10px)` }}
                                     ></div>
                                 </div>
                                 <div className="flex justify-between text-[10px] font-mono text-text-tertiary uppercase mt-3 pt-3 border-t border-[#222]">
                                     <span className="text-neon-surge">Safe: {25 - minesCount}</span>
                                     <span className="text-warning-high">Risk: {((minesCount/25)*100).toFixed(0)}%</span>
                                 </div>
                             </div>

                             {/* Main Action Button - DESKTOP ONLY */}
                             {renderActionButton(false)}
                         </div>
                    </div>
                </div>

                {/* RIGHT: TELEMETRY & GRID (Order 1 on Mobile, Order 2 on Desktop) */}
                <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6 order-1 lg:order-2">
                    
                    {/* TELEMETRY HUD */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <div className="bg-[#0c0c0e] border border-[#333] rounded-xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-surge/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <p className="text-[10px] font-jetbrains-mono text-text-tertiary uppercase tracking-widest mb-1 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" /> Multiplier</p>
                            <p className={`text-xl md:text-2xl font-orbitron font-bold ${gameState === 'in_progress' ? 'text-white' : 'text-text-secondary'}`}>
                                {currentMultiplier.toFixed(2)}x
                            </p>
                        </div>
                         <div className="bg-[#0c0c0e] border border-[#333] rounded-xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-surge/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <p className="text-[10px] font-jetbrains-mono text-text-tertiary uppercase tracking-widest mb-1 flex items-center gap-1"><Icons.ArrowRight className="w-3 h-3" /> Next Tile</p>
                            <p className="text-xl md:text-2xl font-orbitron font-bold text-neon-surge drop-shadow-[0_0_10px_rgba(0,255,192,0.5)]">
                                {nextMultiplier.toFixed(2)}x
                            </p>
                        </div>
                        <div className="bg-[#0c0c0e] border border-[#333] rounded-xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-surge/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <p className="text-[10px] font-jetbrains-mono text-text-tertiary uppercase tracking-widest mb-1 flex items-center gap-1"><Icons.Zap className="w-3 h-3" /> Profit</p>
                            <p className={`text-xl md:text-2xl font-orbitron font-bold ${displayProfit > 0 ? 'text-neon-surge' : displayProfit < 0 ? 'text-warning-high' : 'text-text-secondary'}`}>
                                {displayProfit < 0 ? '-' : displayProfit > 0 ? '+' : ''}
                                <span className="text-sm align-top opacity-50 mr-0.5">$</span>{Math.abs(displayProfit).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-[#0c0c0e] border border-[#333] rounded-xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-surge/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <p className="text-[10px] font-jetbrains-mono text-text-tertiary uppercase tracking-widest mb-1 flex items-center gap-1"><Icons.Shield className="w-3 h-3" /> Safe Left</p>
                            <p className="text-xl md:text-2xl font-orbitron font-bold text-white">
                                {safeRemaining}
                            </p>
                        </div>
                    </div>

                    {/* TACTICAL GRID */}
                    <div className={gridContainerClass}>
                        
                        {/* Circuit Background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                        
                        {/* Idle Scanline */}
                        {gameState === 'idle' && (
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-surge/5 to-transparent h-[20%] animate-[scanline_3s_linear_infinite] pointer-events-none z-0 opacity-30"></div>
                        )}

                        <div className="grid grid-cols-5 gap-2 md:gap-4 h-full relative z-10">
                            {grid.map((tile, index) => {
                                const isInteractable = gameState === 'in_progress' && !tile.isRevealed;
                                
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleTileClick(index)}
                                        disabled={!isInteractable && gameState !== 'in_progress'}
                                        onMouseEnter={() => isInteractable && setHoveredTile(index)}
                                        onMouseLeave={() => setHoveredTile(null)}
                                        className={`relative rounded-xl md:rounded-2xl transition-all duration-150 transform focus:outline-none overflow-hidden
                                            ${!tile.isRevealed 
                                                ? 'bg-[#2a2a30] shadow-[0_4px_0_#1a1a1e] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1e] hover:bg-[#33333a] active:translate-y-1 active:shadow-none active:bg-[#25252a]' 
                                                : 'bg-[#141418] shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] translate-y-1'
                                            }
                                            ${tile.isRevealed && !tile.isMine ? 'border border-neon-surge/30' : 'border border-[#333]'}
                                            ${tile.isRevealed && tile.isMine ? 'border-warning-high/50 bg-warning-high/10' : ''}
                                            ${gameState === 'in_progress' && !tile.isRevealed ? 'cursor-pointer' : 'cursor-default'}
                                        `}
                                    >
                                        {/* Hover Reticle */}
                                        {isInteractable && hoveredTile === index && (
                                            <div className="absolute inset-0 border-2 border-neon-surge/50 rounded-xl md:rounded-2xl animate-pulse pointer-events-none z-20">
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-surge"></div>
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-surge"></div>
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-surge"></div>
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-surge"></div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {tile.isRevealed && !tile.isMine && (
                                                <div className="animate-fade-in-up">
                                                    <DiamondIcon className="w-8 h-8 md:w-14 md:h-14 drop-shadow-[0_0_15px_rgba(0,255,192,0.6)]" />
                                                </div>
                                            )}
                                            {tile.isRevealed && tile.isMine && (
                                                <div className="animate-ping-once">
                                                    <BombIcon className="w-8 h-8 md:w-14 md:h-14 drop-shadow-[0_0_20px_rgba(255,0,51,0.8)]" />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Action Button - MOBILE ONLY (Shown below grid) */}
                    {renderActionButton(true)}
                </div>

            </div>
            
            {/* PROVABLY FAIR MODAL OVERLAY */}
            {isPFModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
                    <div className="bg-[#0c0c0e] border border-neon-surge/30 rounded-2xl p-0 w-full max-w-lg relative shadow-[0_0_40px_rgba(0,255,192,0.2)] overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-surge via-white to-neon-surge animate-pulse"></div>
                        
                        <div className="p-6 border-b border-[#333] bg-[#111] flex justify-between items-center">
                            <h3 className="font-orbitron text-lg text-white uppercase tracking-wider flex items-center gap-2">
                                <Icons.Lock className="text-neon-surge" /> CRYPTOGRAPHIC AUDIT
                            </h3>
                            <button onClick={() => setIsPFModalOpen(false)} className="text-text-tertiary hover:text-white transition-colors"><Icons.X /></button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                             <div className="bg-foundation-light p-4 rounded-lg border border-[#333]">
                                <label className="text-[10px] font-orbitron text-text-tertiary uppercase block mb-2">Active Server Seed (Hashed)</label>
                                <div className="font-jetbrains-mono text-xs text-neon-surge break-all bg-black/50 p-3 rounded border border-neon-surge/20">
                                    {hashedServerSeed}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-orbitron text-text-tertiary uppercase block mb-2">Client Seed</label>
                                    <Input 
                                        value={clientSeed} 
                                        onChange={(e) => setClientSeed(e.target.value)} 
                                        className="h-10 text-xs font-jetbrains-mono bg-[#080808]" 
                                        disabled={gameState === 'in_progress'}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-orbitron text-text-tertiary uppercase block mb-2">Next Nonce</label>
                                    <Input 
                                        value={nonce} 
                                        readOnly 
                                        className="h-10 text-xs font-jetbrains-mono bg-[#080808] opacity-70" 
                                    />
                                </div>
                            </div>

                             <div className="flex gap-3 pt-2">
                                 <button 
                                    onClick={rotateSeed} 
                                    className="flex-1 py-3 border border-[#333] hover:border-neon-surge text-text-secondary hover:text-white font-orbitron uppercase text-xs font-bold rounded-lg transition-all"
                                >
                                    Rotate Seed Pair
                                </button>
                                <button 
                                    onClick={navigateToVerify}
                                    className="flex-1 py-3 bg-neon-surge text-black hover:bg-white font-orbitron uppercase text-xs font-bold rounded-lg transition-all shadow-neon-glow-sm"
                                >
                                    [ VERIFY ROUND ]
                                </button>
                             </div>
                        </div>
                        <div className="p-3 bg-[#111] border-t border-[#333] text-center">
                             <p className="text-[10px] text-text-tertiary font-jetbrains-mono">
                                 ALL OUTCOMES ARE PRE-DETERMINED BY HASH + SEED + NONCE.
                             </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MinesGamePage;
