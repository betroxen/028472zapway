import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { sha512, generateFloat, generateMines, generatePlinkoPath } from '../lib/crypto';


// Ensure CryptoJS is recognized from global scope (loaded via index.html)
declare global {
    interface Window {
        CryptoJS: any;
    }
}

const ProvablyFairPage: React.FC = () => {
    // --- 1. VISUALS STATE ---
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- 2. VERIFIER STATE ---
    const [serverSeed, setServerSeed] = useState('a1b2c3d4e5f6789012345678901234567890123456789012345678901234');
    const [clientSeed, setClientSeed] = useState('zap_player_42');
    const [nonce, setNonce] = useState<number>(1);
    const [cursor, setCursor] = useState<number>(0);
    const [gameType, setGameType] = useState<'DICE' | 'PLINKO' | 'FLOAT' | 'MINES'>('DICE');

    // Game Specific Inputs
    const [plinkoRows, setPlinkoRows] = useState(16);
    const [minesCount, setMinesCount] = useState(3);

    const [hashedServerSeed, setHashedServerSeed] = useState('');
    const [verifierLog, setVerifierLog] = useState<{ timestamp: string, type: string, result: React.ReactNode }[]>([]);

    // --- 3. KINETIC EFFECTS ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const particles: any[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * (canvas.width || window.innerWidth),
                y: Math.random() * (canvas.height || window.innerHeight),
                size: Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.fillStyle = `rgba(0, 255, 192, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        
        setupCanvas();
        animate();

        const handleResize = () => {
            setupCanvas();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    // --- 4. HASHING ---
    useEffect(() => {
        if (serverSeed) {
             setHashedServerSeed(sha512(serverSeed));
        }
    }, [serverSeed]);

    const logResult = (type: string, content: React.ReactNode) => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
        setVerifierLog(prev => [{ timestamp, type, result: content }, ...prev].slice(0, 5));
    };

    // --- 5. GAME VERIFIERS ---
    const verifyDice = () => {
        try {
            const float = generateFloat(serverSeed, clientSeed, nonce, cursor);
            const roll = (float * 10001) / 100; // Standard 0-100 Dice formula
            logResult('DICE', <span className="animate-glitch-reveal">ROLLED: <strong className="text-neon-surge text-xl">{roll.toFixed(2)}</strong></span>);
        } catch (e) {
            logResult('ERROR', <span className="text-warning-high">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const verifyFloat = () => {
        try {
            const float = generateFloat(serverSeed, clientSeed, nonce, cursor);
            logResult('FLOAT', <span className="animate-glitch-reveal">VALUE: <strong className="text-neon-surge">{float.toFixed(10)}</strong></span>);
        } catch (e) {
             logResult('ERROR', <span className="text-warning-high">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const verifyPlinko = () => {
        try {
            const bucket = generatePlinkoPath(serverSeed, clientSeed, nonce, plinkoRows);
            logResult(`PLINKO (${plinkoRows})`, <span className="animate-glitch-reveal">LANDED BUCKET: <strong className="text-neon-surge text-xl">{bucket}</strong> / {plinkoRows}</span>);
        } catch (e) {
             logResult('ERROR', <span className="text-warning-high">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const verifyMines = () => {
        try {
            const minesPositions = generateMines(serverSeed, clientSeed, nonce, minesCount);
            logResult(`MINES (${minesCount})`, (
                <div className="animate-glitch-reveal">
                    <div className="mb-2">MINE LOCATIONS (0-24):</div>
                    <div className="flex flex-wrap gap-1.5">
                        {minesPositions.map(pos => (
                            <span key={pos} className="bg-warning-high/10 text-warning-low border border-warning-high/20 px-1.5 py-0.5 rounded-sm font-bold font-jetbrains-mono text-xs">
                                {pos}
                            </span>
                        ))}
                    </div>
                </div>
            ));
        } catch (e) {
             logResult('ERROR', <span className="text-warning-high">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const executeVerify = () => {
        switch (gameType) {
            case 'DICE': verifyDice(); break;
            case 'FLOAT': verifyFloat(); break;
            case 'PLINKO': verifyPlinko(); break;
            case 'MINES': verifyMines(); break;
        }
    };

    return (
        <div className="bg-foundation text-text-secondary font-jetbrains-mono relative overflow-hidden animate-fadeIn">
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />
            <div className="container mx-auto max-w-6xl p-4 py-12 md:py-20 relative z-10">
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-neon-surge/5 border border-neon-surge/30 rounded-full mb-6 animate-fade-up">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-surge"></span>
                        </span>
                        <span className="text-neon-surge font-jetbrains-mono text-xs uppercase tracking-widest font-bold">CLIENT-SIDE VERIFIER LIVE</span>
                    </div>
                    <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4 tracking-tight animate-depth-in">
                        TRUST IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-white">CODE</span>.
                    </h1>
                    <p className="text-lg text-text-secondary font-rajdhani max-w-2xl mx-auto animate-fade-up">
                        Don't take our word for it. Verify every outcome yourself. Zero server calls. Just pure, auditable math running right in your browser.
                    </p>
                </header>
                <Card className="bg-[#0c0c0e]/90 backdrop-blur-xl border-neon-surge/30 p-0 overflow-hidden shadow-[0_0_50px_rgba(0,255,192,0.1)] animate-fade-up relative">
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(0,255,192,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scanline_8s_linear_infinite] opacity-50 mix-blend-screen"></div>
                    <div className="bg-[#14131c]/50 p-4 border-b border-[#333] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Icons.Terminal className="h-5 w-5 text-neon-surge" />
                            <span className="font-orbitron text-white text-sm uppercase tracking-widest">CRYPTOGRAPHIC AUDIT CONSOLE v2.1</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-warning-high/20 border border-warning-high/50"></div>
                            <div className="w-3 h-3 rounded-full bg-warning-low/20 border border-warning-low/50"></div>
                            <div className="w-3 h-3 rounded-full bg-neon-surge/20 border border-neon-surge/50 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                        <div className="lg:col-span-5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#333] bg-foundation/50">
                             <div className="space-y-6">
                                <div>
                                    <label className="text-neon-surge text-xs uppercase font-orbitron tracking-wider mb-2 block">Server Seed (Unhashed)</label>
                                    <Input 
                                        value={serverSeed}
                                        onChange={(e) => setServerSeed(e.target.value)}
                                        className="font-jetbrains-mono text-xs bg-foundation border-[#333] focus:border-neon-surge h-11"
                                        placeholder="Paste revealed server seed..."
                                    />
                                     <div className="mt-2 p-2 bg-black/30 rounded border border-[#333] text-[10px] font-jetbrains-mono text-text-tertiary break-all">
                                        <span className="text-neon-surge mr-2">[LIVE HASH]</span> 
                                        {hashedServerSeed || '...'}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-neon-surge text-xs uppercase font-orbitron tracking-wider mb-2 block">Client Seed</label>
                                    <Input 
                                        value={clientSeed}
                                        onChange={(e) => setClientSeed(e.target.value)}
                                        className="font-jetbrains-mono text-xs bg-foundation border-[#333] focus:border-neon-surge h-11"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-text-tertiary text-xs uppercase font-orbitron tracking-wider mb-2 block">Nonce</label>
                                        <Input 
                                            type="number" 
                                            value={nonce}
                                            onChange={(e) => setNonce(Number(e.target.value))}
                                            className="font-jetbrains-mono bg-foundation border-[#333] focus:border-neon-surge"
                                        />
                                    </div>
                                     <div>
                                        <label className="text-text-tertiary text-xs uppercase font-orbitron tracking-wider mb-2 block">Cursor</label>
                                        <Input 
                                            type="number" 
                                            value={cursor}
                                            onChange={(e) => setCursor(Number(e.target.value))}
                                            className="font-jetbrains-mono bg-foundation border-[#333] focus:border-neon-surge"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-foundation border border-[#333] rounded-lg">
                                {['DICE', 'PLINKO', 'MINES', 'FLOAT'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setGameType(type as any)}
                                        className={`flex-1 py-2.5 text-xs font-orbitron uppercase rounded-md transition-all ${gameType === type ? 'bg-neon-surge text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'text-text-tertiary hover:text-white'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <div className="mb-8 min-h-[60px]">
                                {gameType === 'PLINKO' && (
                                     <div className="animate-fadeIn">
                                        <label className="text-text-tertiary text-xs uppercase font-orbitron tracking-wider mb-2 block">Rows</label>
                                        <select 
                                            value={plinkoRows} onChange={(e) => setPlinkoRows(Number(e.target.value))}
                                            className="w-full h-10 bg-foundation border border-[#333] rounded px-3 text-sm text-white font-jetbrains-mono focus:border-neon-surge"
                                        >
                                            {[8, 10, 12, 14, 16].map(r => <option key={r} value={r}>{r} ROWS</option>)}
                                        </select>
                                    </div>
                                )}
                                {gameType === 'MINES' && (
                                     <div className="animate-fadeIn">
                                        <label className="text-text-tertiary text-xs uppercase font-orbitron tracking-wider mb-2 block">Mines Count (1-24)</label>
                                        <Input 
                                            type="number" min="1" max="24"
                                            value={minesCount} onChange={(e) => setMinesCount(Math.min(24, Math.max(1, Number(e.target.value))))}
                                            className="font-jetbrains-mono bg-foundation border-[#333] focus:border-neon-surge"
                                        />
                                    </div>
                                )}
                                {(gameType === 'DICE' || gameType === 'FLOAT') && (
                                    <div className="text-text-tertiary text-xs font-jetbrains-mono flex items-center h-full opacity-50 uppercase">
                                        // NO ADDITIONAL PARAMETERS REQUIRED
                                    </div>
                                )}
                            </div>
                            <Button 
                                onClick={executeVerify} 
                                size="lg" 
                                className="w-full py-6 font-orbitron uppercase tracking-[0.2em] text-base shadow-[0_0_30px_rgba(0,255,192,0.25)] animate-pulse-glow"
                            >
                                RUN VERIFICATION PROTOCOL
                            </Button>
                            <div className="mt-8 flex-1 bg-black/50 rounded-lg border border-[#333] p-4 font-jetbrains-mono text-sm overflow-y-auto custom-scrollbar shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative">
                                {verifierLog.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-[#333] uppercase tracking-widest">
                                        AWAITING EXECUTION...
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {verifierLog.map((log, i) => (
                                            <div key={i} className={`flex gap-3 ${i === 0 ? 'opacity-100' : 'opacity-60'}`}>
                                                <span className="text-[#666] shrink-0">[{log.timestamp}]</span>
                                                <span className={`font-bold shrink-0 ${log.type === 'ERROR' ? 'text-warning-high' : 'text-neon-surge'}`}>{log.type}&gt;</span>
                                                <span className="text-text-primary break-all">{log.result}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4 flex gap-2 text-neon-surge items-center">
                                    <span>&gt;</span><span className="animate-pulse bg-neon-surge w-2 h-4"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="p-6 bg-[#14131c]/80 border-[#333] hover:border-neon-surge/50 group card-lift">
                        <Icons.Lock className="h-8 w-8 text-neon-surge mb-4" />
                        <h3 className="font-orbitron text-white uppercase tracking-wider mb-2">1. The Commitment</h3>
                        <p className="text-sm text-text-secondary leading-relaxed font-rajdhani">
                            Before you bet, we generate a <strong className="text-white">Server Seed</strong> and show you its SHA-512 hash. This commits us to the outcome before you even press play.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c]/80 border-[#333] hover:border-neon-surge/50 group card-lift">
                        <Icons.Users className="h-8 w-8 text-neon-surge mb-4" />
                        <h3 className="font-orbitron text-white uppercase tracking-wider mb-2">2. Your Influence</h3>
                        <p className="text-sm text-text-secondary leading-relaxed font-rajdhani">
                            You provide a <strong className="text-white">Client Seed</strong>. We combine this with our seed to generate the result. Since we don't know your seed in advance, we can't rig the outcome.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c]/80 border-[#333] hover:border-neon-surge/50 group card-lift">
                        <Icons.Eye className="h-8 w-8 text-neon-surge mb-4" />
                        <h3 className="font-orbitron text-white uppercase tracking-wider mb-2">3. The Reveal</h3>
                        <p className="text-sm text-text-secondary leading-relaxed font-rajdhani">
                            After the game, we reveal the unhashed Server Seed. You can paste it into the verifier above to prove it matches the initial hash and generated the exact same result.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProvablyFairPage;