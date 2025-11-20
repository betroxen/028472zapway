
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { sha512, generateFloat, generateMines, generatePlinkoPath } from '../lib/crypto';

// --- KINETIC VISUAL COMPONENTS ---

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 1.5 + 0.5,
                    color: Math.random() > 0.9 ? '#00FFC0' : '#333333' // Occasional neon particle
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                // Basic movement
                p.x += p.vx;
                p.y += p.vy;

                // Mouse repulsion (Magnetic Effect)
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 150;

                if (distance < maxDist) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDist - distance) / maxDist;
                    const repulsionStrength = 2;
                    p.vx -= forceDirectionX * force * repulsionStrength;
                    p.vy -= forceDirectionY * force * repulsionStrength;
                }

                // Friction to return to normal speed
                p.vx *= 0.98;
                p.vy *= 0.98;
                
                // Minimum ambient movement
                if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.05;
                if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.05;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            
            // Draw connecting lines for nearby particles
            ctx.strokeStyle = 'rgba(0, 255, 192, 0.05)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
};

const ScrambleText = ({ text, className, revealSpeed = 50 }: { text: string, className?: string, revealSpeed?: number }) => {
    const [display, setDisplay] = useState(text);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(prev => 
                text.split('').map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }
            
            iterations += 1/3; // Slow down the reveal
        }, revealSpeed);

        return () => clearInterval(interval);
    }, [text, revealSpeed]);

    return <span className={`${className} font-jetbrains-mono`}>{display}</span>;
};

// --- MAIN PAGE ---

const ProvablyFairPage: React.FC = () => {
    // --- VERIFIER STATE ---
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
    
    // --- HASHING EFFECT ---
    useEffect(() => {
        if (serverSeed) {
            const hash = sha512(serverSeed);
            setHashedServerSeed(hash);
        }
    }, [serverSeed]);

    // --- VERIFICATION LOGIC ---
    const logResult = (type: string, content: React.ReactNode) => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
        setVerifierLog(prev => [{ timestamp, type, result: content }, ...prev].slice(0, 10));
    };

    const executeVerify = () => {
        try {
            if (gameType === 'DICE') {
                const float = generateFloat(serverSeed, clientSeed, nonce, cursor);
                const roll = (float * 10001) / 100;
                logResult('DICE', <span className="animate-fade-in">ROLLED: <strong className="text-neon-surge">{roll.toFixed(2)}</strong></span>);
            } else if (gameType === 'FLOAT') {
                const float = generateFloat(serverSeed, clientSeed, nonce, cursor);
                logResult('FLOAT', <span className="animate-fade-in">RAW: <strong className="text-neon-surge">{float.toFixed(8)}</strong></span>);
            } else if (gameType === 'PLINKO') {
                const bucket = generatePlinkoPath(serverSeed, clientSeed, nonce, plinkoRows);
                logResult(`PLINKO [${plinkoRows}]`, <span className="animate-fade-in">BUCKET: <strong className="text-neon-surge">{bucket}</strong></span>);
            } else if (gameType === 'MINES') {
                const mines = generateMines(serverSeed, clientSeed, nonce, minesCount);
                logResult(`MINES [${minesCount}]`, <span className="animate-fade-in break-all">TILES: <strong className="text-neon-surge">{mines.join(', ')}</strong></span>);
            }
        } catch (e) {
            logResult('ERROR', <span className="text-warning-high">INVALID SEED FORMAT</span>);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani relative overflow-hidden selection:bg-neon-surge selection:text-black">
            <InteractiveBackground />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                
                {/* HERO */}
                <header className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-sm bg-neon-surge/5 mb-8 backdrop-blur-sm animate-fade-up">
                         <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
                        </span>
                        <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.2em] font-bold">System Integrity: 100%</span>
                    </div>
                    
                    <h1 className="font-orbitron text-5xl md:text-8xl font-black text-white uppercase tracking-tight leading-none mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        TRUST IS <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#333] to-[#111] absolute blur-sm select-none" aria-hidden="true">DEAD</span>
                        <span className="relative z-10 line-through decoration-red-600 decoration-4 decoration-wavy opacity-50 mr-4">DEAD</span>
                        <span className="text-neon-surge text-glow">MATH.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto animate-fade-up font-jetbrains-mono" style={{ animationDelay: '0.2s' }}>
                        Cryptography replaces the Casino Manager. <br/>
                        ZapWay gives you the tools to verify every outcome, every time.
                    </p>
                </header>

                {/* EDUCATIONAL MODULE */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                    <div className="space-y-8 animate-fade-up">
                        <h2 className="text-3xl font-orbitron font-bold text-white uppercase tracking-wide border-l-4 border-neon-surge pl-6">The Digital Envelope</h2>
                        <div className="space-y-6 text-text-secondary leading-relaxed">
                            <div className="bg-[#0c0c0e] p-6 rounded-xl border border-[#333] hover:border-neon-surge/30 transition-colors">
                                <h3 className="text-white font-bold uppercase font-orbitron mb-2 text-sm">1. The Shuffle (Server Seed)</h3>
                                <p className="text-sm">We generate a random outcome and lock it in a "digital box" (Hashing). We give you the fingerprint (Hash) of this box so you know we can't swap it later.</p>
                            </div>
                            <div className="bg-[#0c0c0e] p-6 rounded-xl border border-[#333] hover:border-neon-surge/30 transition-colors">
                                <h3 className="text-white font-bold uppercase font-orbitron mb-2 text-sm">2. The Cut (Client Seed)</h3>
                                <p className="text-sm">You verify the box is locked. Then, you choose a random number (Client Seed) to influence the result. Since we don't know your number, we can't rig the outcome.</p>
                            </div>
                            <div className="bg-[#0c0c0e] p-6 rounded-xl border border-[#333] hover:border-neon-surge/30 transition-colors">
                                <h3 className="text-white font-bold uppercase font-orbitron mb-2 text-sm">3. The Proof (Verification)</h3>
                                <p className="text-sm">After the game, we give you the key. You open the box (reveal the unhashed Server Seed) and verify it matches the fingerprint you held from the start.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-full min-h-[400px] bg-[#0c0c0e] rounded-2xl border border-neon-surge/20 overflow-hidden flex items-center justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,192,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_8s_infinite]"></div>
                        
                        {/* Visual Representation */}
                        <div className="relative z-10 text-center space-y-8">
                            <div className="w-24 h-24 mx-auto bg-[#1a1a1a] rounded-2xl border-2 border-neon-surge flex items-center justify-center shadow-[0_0_30px_rgba(0,255,192,0.2)]">
                                <Icons.Lock className="w-10 h-10 text-neon-surge animate-pulse" />
                            </div>
                            <div className="h-16 w-px bg-neon-surge/50 mx-auto"></div>
                            <div className="bg-[#111] px-6 py-3 rounded-full border border-[#333] font-jetbrains-mono text-xs text-text-tertiary">
                                SHA-512 ( Seed + Salt )
                            </div>
                        </div>
                    </div>
                </section>

                {/* VERIFIER CONSOLE */}
                <section className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-end justify-between mb-6">
                         <h2 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wide flex items-center gap-3">
                            <Icons.Terminal className="w-6 h-6 text-neon-surge" /> Tactical Verifier
                        </h2>
                         <div className="hidden md:flex items-center gap-2 text-[10px] font-jetbrains-mono text-text-tertiary uppercase">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Client-Side Execution
                        </div>
                    </div>

                    <Card className="bg-[#0c0c0e]/90 backdrop-blur-md border-neon-surge/30 p-0 overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                            
                            {/* INPUTS PANEL */}
                            <div className="lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r border-[#333] bg-[#080808] flex flex-col">
                                <div className="space-y-8 flex-1">
                                    
                                    <div>
                                        <label className="flex justify-between text-xs font-orbitron text-text-tertiary uppercase tracking-widest mb-3">
                                            <span>Game Protocol</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['DICE', 'PLINKO', 'MINES', 'FLOAT'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => setGameType(type as any)}
                                                    className={`py-3 px-4 rounded text-xs font-bold font-orbitron uppercase transition-all duration-200 border ${gameType === type ? 'bg-neon-surge text-black border-neon-surge shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'bg-[#14131c] text-text-tertiary border-[#333] hover:border-white hover:text-white'}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-orbitron text-neon-surge uppercase tracking-widest mb-3">
                                            Revealed Server Seed
                                        </label>
                                        <Input 
                                            value={serverSeed}
                                            onChange={(e) => setServerSeed(e.target.value)}
                                            className="font-jetbrains-mono text-xs bg-[#111] border-[#333] h-12 focus:border-neon-surge text-white"
                                            placeholder="Paste unhashed seed..."
                                        />
                                        {/* Computed Hash Display */}
                                        <div className="mt-2 p-3 bg-[#050505] rounded border border-[#333] overflow-hidden">
                                            <div className="text-[9px] text-text-tertiary uppercase mb-1 font-orbitron">Calculated Hash (SHA-512)</div>
                                            <div className="text-[10px] font-jetbrains-mono text-text-secondary break-all leading-tight opacity-80">
                                                <ScrambleText text={hashedServerSeed || 'Waiting for input...'} revealSpeed={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-orbitron text-text-tertiary uppercase tracking-widest mb-3">
                                            Client Seed
                                        </label>
                                        <Input 
                                            value={clientSeed}
                                            onChange={(e) => setClientSeed(e.target.value)}
                                            className="font-jetbrains-mono text-xs bg-[#111] border-[#333] h-12 focus:border-neon-surge text-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-orbitron text-text-tertiary uppercase tracking-widest mb-3">Nonce</label>
                                            <Input 
                                                type="number" 
                                                value={nonce}
                                                onChange={(e) => setNonce(Number(e.target.value))}
                                                className="font-jetbrains-mono bg-[#111] border-[#333] h-12 focus:border-neon-surge text-white"
                                            />
                                        </div>
                                        {gameType === 'PLINKO' && (
                                            <div>
                                                <label className="block text-xs font-orbitron text-text-tertiary uppercase tracking-widest mb-3">Rows</label>
                                                <Input 
                                                    type="number" 
                                                    value={plinkoRows}
                                                    onChange={(e) => setPlinkoRows(Number(e.target.value))}
                                                    className="font-jetbrains-mono bg-[#111] border-[#333] h-12 focus:border-neon-surge text-white"
                                                />
                                            </div>
                                        )}
                                        {gameType === 'MINES' && (
                                             <div>
                                                <label className="block text-xs font-orbitron text-text-tertiary uppercase tracking-widest mb-3">Mines</label>
                                                <Input 
                                                    type="number" 
                                                    value={minesCount}
                                                    onChange={(e) => setMinesCount(Number(e.target.value))}
                                                    className="font-jetbrains-mono bg-[#111] border-[#333] h-12 focus:border-neon-surge text-white"
                                                />
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <Button 
                                    onClick={executeVerify} 
                                    className="w-full mt-8 h-14 font-orbitron font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,255,192,0.2)] hover:scale-[1.02] transition-transform bg-neon-surge text-black hover:bg-white"
                                >
                                    Run Verification
                                </Button>
                            </div>

                            {/* OUTPUT LOG TERMINAL */}
                            <div className="lg:col-span-7 bg-[#050505] p-8 font-jetbrains-mono text-xs flex flex-col relative">
                                <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                                    <Icons.Zap className="w-32 h-32 text-neon-surge" />
                                </div>
                                
                                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 relative z-10">
                                    {verifierLog.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-[#333] space-y-4">
                                            <div className="w-16 h-16 border-2 border-[#222] border-t-neon-surge rounded-full animate-spin"></div>
                                            <span className="uppercase tracking-widest">AWAITING EXECUTION...</span>
                                        </div>
                                    ) : (
                                        verifierLog.map((log, i) => (
                                            <div key={i} className={`p-4 rounded border-l-2 transition-all duration-500 ${i === 0 ? 'bg-[#111] border-neon-surge shadow-lg' : 'border-[#333] opacity-60'}`}>
                                                <div className="flex items-center justify-between mb-2 text-[10px] text-text-tertiary uppercase">
                                                    <span>TS: {log.timestamp}</span>
                                                    <span className="font-bold text-white">{log.type}</span>
                                                </div>
                                                <div className="text-sm text-white break-all font-medium">
                                                    {log.result}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Terminal Footer */}
                                <div className="mt-4 pt-4 border-t border-[#222] flex items-center gap-2 text-neon-surge/50 text-[10px] uppercase tracking-wider">
                                    <span className="animate-pulse">_</span> SYSTEM READY
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* HOW TO */}
                <div className="mt-24 text-center">
                     <h3 className="text-xl font-orbitron font-bold text-white uppercase mb-8">Verification in 3 Steps</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                         <div className="p-6 rounded-xl border border-[#333] bg-[#0a0a0a] hover:border-neon-surge/30 transition-colors group">
                             <div className="text-4xl font-black text-[#222] group-hover:text-neon-surge transition-colors mb-4 font-orbitron">01</div>
                             <p className="text-sm text-text-secondary font-rajdhani">Copy the <strong className="text-white">Unhashed Server Seed</strong> from a completed game details.</p>
                         </div>
                         <div className="p-6 rounded-xl border border-[#333] bg-[#0a0a0a] hover:border-neon-surge/30 transition-colors group">
                             <div className="text-4xl font-black text-[#222] group-hover:text-neon-surge transition-colors mb-4 font-orbitron">02</div>
                             <p className="text-sm text-text-secondary font-rajdhani">Paste it into the console above along with your <strong className="text-white">Client Seed</strong> & Nonce.</p>
                         </div>
                         <div className="p-6 rounded-xl border border-[#333] bg-[#0a0a0a] hover:border-neon-surge/30 transition-colors group">
                             <div className="text-4xl font-black text-[#222] group-hover:text-neon-surge transition-colors mb-4 font-orbitron">03</div>
                             <p className="text-sm text-text-secondary font-rajdhani">Check the output. If it matches your game result, the round was <strong className="text-white">Fair</strong>.</p>
                         </div>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default ProvablyFairPage;
