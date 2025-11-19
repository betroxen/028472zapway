
import React, { useState } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';

const FeatureCard = ({ 
    icon: Icon, 
    title, 
    subtitle,
    desc, 
    accentColor = "text-neon-surge", 
    borderColor = "border-[#1F1F1F]", 
    hoverBorderColor = "hover:border-neon-surge/50",
    delay = "0s"
}: { 
    icon: React.FC<any>, 
    title: string, 
    subtitle?: string,
    desc: string, 
    accentColor?: string, 
    borderColor?: string, 
    hoverBorderColor?: string,
    delay?: string
}) => (
    <div 
        className={`group relative p-8 bg-[#0A0A0A] border ${borderColor} rounded-sm transition-all duration-500 ${hoverBorderColor} hover:shadow-[0_0_30px_rgba(0,255,192,0.05)] overflow-hidden animate-fade-up flex flex-col h-full`}
        style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform ease-in-out" style={{ transitionDuration: '1s' }}></div>
        
        <div className="relative z-10 flex-1">
            <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-sm bg-[#121212] border border-[#2A2A2A] group-hover:border-neon-surge/30 transition-colors`}>
                    <Icon className={`h-6 w-6 ${accentColor}`} />
                </div>
                <span className="font-jetbrains-mono text-[10px] text-[#444] uppercase tracking-widest group-hover:text-neon-surge transition-colors">
                    // SYSTEM_READY
                </span>
            </div>
            
            <h3 className="font-orbitron text-xl font-bold text-white mb-1 uppercase tracking-wide group-hover:text-shadow-neon transition-all">
                {title}
            </h3>
             {subtitle && (
                <p className="font-jetbrains-mono text-xs text-neon-surge uppercase tracking-wider mb-4 opacity-80">
                    {subtitle}
                </p>
            )}
            <p className="font-rajdhani text-text-secondary text-base leading-relaxed border-l-2 border-[#222] pl-4 group-hover:border-neon-surge/30 transition-colors">
                {desc}
            </p>
        </div>
    </div>
);

const AboutUsPage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani animate-fadeIn pb-20 relative">
             {/* Background Noise/Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* HERO SECTION */}
            <section className="relative max-w-5xl mx-auto text-center pt-20 mb-32 px-4 z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-neon-surge/5 border border-neon-surge/30 rounded-sm text-neon-surge font-jetbrains-mono text-xs uppercase tracking-[0.3em] mb-8 backdrop-blur-sm animate-fade-up">
                    <span className="w-2 h-2 bg-neon-surge animate-pulse rounded-full"></span>
                    DIRECTIVE: GAMBLE SMARTER, NOT HARDER
                </div>
                
                <h1 className="font-orbitron text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    INTEGRITY IS <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge via-white to-neon-surge animate-gradient-x">THE CODE.</span>
                </h1>
                
                <div className="space-y-6 text-lg md:text-2xl text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <p>
                        The old gambling model relies on <span className="text-red-500 font-bold line-through opacity-70">blind trust</span>. <br/>
                        ZapWay replaces it with <strong className="text-white border-b-2 border-neon-surge">verifiable math</strong>.
                    </p>
                    <p className="text-base md:text-lg text-text-tertiary font-jetbrains-mono max-w-2xl mx-auto mt-6">
                        Built on cryptographic truth, not corporate promises. ZapWay is the core infrastructure for the next era of iGaming and on-chain finance.
                    </p>
                </div>
            </section>

            {/* STACK SECTION */}
            <section className="max-w-7xl mx-auto mb-32 px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#222] pb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    <div>
                        <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">The ZapWay Stack</h2>
                        <p className="text-neon-surge font-jetbrains-mono text-sm uppercase tracking-[0.2em]">
                            // Eliminating Trust. Engineering Proof.
                        </p>
                    </div>
                    <p className="text-text-tertiary text-sm font-rajdhani max-w-md text-right hidden md:block">
                        Each layer of ZapWay’s tech stack converts trust into math, creating a transparent and tamper-proof system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={Icons.Zap}
                        title="ZK-Rollup Finality"
                        desc="Every wager. Every outcome. On-chain. Immutable. Outcomes are cryptographically proven and recorded. Trust nothing — verify everything."
                        accentColor="text-cyan-400"
                        hoverBorderColor="hover:border-cyan-400/50"
                        delay="0.4s"
                    />
                    <FeatureCard 
                        icon={Icons.RefreshCw}
                        title="Decentralized VRF"
                        desc="Game randomness is secured by Verifiable Random Function (VRF) oracles. Each play has proof of fairness backed by chain auditability."
                        accentColor="text-purple-400"
                        hoverBorderColor="hover:border-purple-400/50"
                        delay="0.5s"
                    />
                    <FeatureCard 
                        icon={Icons.Shield}
                        title="MPC Custody"
                        desc="Player assets and treasuries are protected by Multi-Party Computation (MPC). No single failure point. No centralized custody. Distributed security."
                        accentColor="text-yellow-400"
                        hoverBorderColor="hover:border-yellow-400/50"
                        delay="0.6s"
                    />
                </div>
            </section>

            {/* PROTECTION SECTION */}
            <section className="max-w-7xl mx-auto mb-32 px-4 relative z-10">
                 <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#222] pb-6 animate-fade-up" style={{ animationDelay: '0.7s' }}>
                    <div>
                        <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">Institutional Strength</h2>
                        <p className="text-neon-surge font-jetbrains-mono text-sm uppercase tracking-[0.2em]">
                            // Player Protection Protocols
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={Icons.Cpu}
                        title="Explainable AI (XAI)"
                        desc="Our ethical AI system enforces responsible gaming in real time. Every action is transparent, traceable, and GDPR Article 22 compliant."
                        accentColor="text-neon-surge"
                        delay="0.8s"
                    />
                    <FeatureCard 
                        icon={Icons.FileCheck}
                        title="VASP-Grade Compliance"
                        desc="ZapWay operates under dual VASP and iGaming licenses — meeting enterprise-grade AML and CTF obligations with zero tolerance for illicit activity."
                         accentColor="text-neon-surge"
                        delay="0.9s"
                    />
                    <FeatureCard 
                        icon={Icons.Verified}
                        title="Verifiable Player Records"
                        subtitle="(VPR)"
                        desc="Every player can inspect cryptographic proofs of game results within their dashboard — transparency, personalized and immutable."
                         accentColor="text-neon-surge"
                        delay="1.0s"
                    />
                </div>
            </section>

            {/* MISSION & TOGGLE */}
            <section className="max-w-4xl mx-auto text-center px-4 relative z-10">
                <div className="mb-16 animate-fade-up" style={{ animationDelay: '1.1s' }}>
                     <div className="inline-block p-6 border border-[#222] bg-[#0A0A0A] rounded-sm relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1 bg-neon-surge"></div>
                        <h2 className="font-orbitron text-3xl font-black text-white uppercase mb-4">Our Mission</h2>
                        <p className="text-lg text-text-secondary font-medium leading-relaxed">
                            ZapWay partners with licensed operators to embed <span className="text-white">Verifiable Fairness</span> directly into their platforms.
                            <br /><br />
                            <span className="font-jetbrains-mono text-sm text-neon-surge uppercase tracking-widest">
                                // We’re not rebuilding iGaming — we’re rewriting its logic.
                            </span>
                        </p>
                    </div>
                    <div className="mt-8">
                        <p className="font-orbitron text-2xl font-bold text-white uppercase tracking-widest animate-pulse">
                            Join the new standard. Join ZapWay.
                        </p>
                    </div>
                </div>

                {/* DOSSIER TOGGLE */}
                <Button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    variant="ghost"
                    className="group relative w-full md:w-auto border border-neon-surge text-neon-surge hover:bg-neon-surge hover:text-black font-orbitron uppercase tracking-[0.15em] py-6 px-12 transition-all duration-300 text-sm md:text-base overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        {isExpanded ? (
                             <>
                                <Icons.X className="h-5 w-5" /> CLOSE OPERATIONAL DOSSIER
                             </>
                        ) : (
                            <>
                                <Icons.FileText className="h-5 w-5" /> ACCESS FULL OPERATIONAL DOSSIER
                            </>
                        )}
                    </span>
                    {/* Button Glitch Effect */}
                    <div className="absolute inset-0 bg-neon-surge/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
            </section>

            {/* EXPANDABLE DOSSIER CONTENT */}
             <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="max-w-5xl mx-auto mt-24 pt-16 px-4 sm:px-8 border-t border-neon-surge/30 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4 text-neon-surge">
                            <Icons.Lock className="h-6 w-6" />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-16 font-rajdhani text-text-secondary pb-20">
                             {/* Deep Dive Content */}
                            
                            <div className="space-y-12">
                                 <article>
                                    <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <Icons.Terminal className="h-6 w-6 text-neon-surge" />
                                        CORE DIRECTIVE
                                    </h3>
                                    <div className="bg-[#0A0A0A] p-6 border-l-2 border-neon-surge">
                                        <p className="text-lg leading-relaxed mb-4">
                                            <strong className="text-white">Integrity is the Code.</strong><br/>
                                            The old gambling model relies on blind trust. ZapWay replaces that with verifiable math. Built on cryptographic truth, not corporate promises, ZapWay is the core infrastructure for the next era of iGaming and on-chain finance.
                                        </p>
                                    </div>
                                </article>

                                <article>
                                    <h3 className="font-orbitron text-2xl font-bold text-white mb-6">TECHNICAL ARCHITECTURE DEEP DIVE</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-[#0A0A0A] p-6 border border-[#222] rounded-sm">
                                            <h4 className="font-bold text-white mb-2 uppercase font-orbitron text-sm text-cyan-400">ZK-Rollup Finality</h4>
                                            <p className="text-sm leading-relaxed">
                                                Every wager, move, and payout is finalized on a Layer 2 ZK-Rollup. Outcomes are cryptographically proven and immutably recorded on-chain. This ensures that the casino cannot alter results retroactively without breaking the cryptographic chain, which is mathematically impossible.
                                            </p>
                                        </div>
                                        <div className="bg-[#0A0A0A] p-6 border border-[#222] rounded-sm">
                                             <h4 className="font-bold text-white mb-2 uppercase font-orbitron text-sm text-purple-400">Decentralized VRF</h4>
                                            <p className="text-sm leading-relaxed">
                                                Game randomness is secured by Verifiable Random Function (VRF) oracles. Each play generates a proof of fairness backed by chain auditability. Unlike traditional RNGs hidden on a server, VRF provides a mathematical proof that the number generated was indeed random and unpredictable.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                                
                                <article>
                                    <h3 className="font-orbitron text-2xl font-bold text-white mb-6">INSTITUTIONAL COMPLIANCE</h3>
                                    <div className="space-y-6">
                                        <div className="flex gap-4 items-start">
                                            <Icons.Cpu className="h-6 w-6 text-neon-surge shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-bold text-white uppercase font-orbitron">Explainable AI (XAI)</h4>
                                                <p className="text-sm leading-relaxed mt-1">
                                                    Our ethical AI system enforces responsible gaming in real time. Every automated intervention (limits, cooldowns) is transparent, traceable, and GDPR Article 22 compliant, ensuring user rights are never violated by "black box" algorithms.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                             <Icons.FileCheck className="h-6 w-6 text-neon-surge shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-bold text-white uppercase font-orbitron">VASP-Grade Compliance</h4>
                                                <p className="text-sm leading-relaxed mt-1">
                                                    ZapWay operates under dual VASP and iGaming licenses — meeting enterprise-grade AML and CTF obligations with zero tolerance for illicit activity. We are a fortress, not a gateway for bad actors.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            <div className="text-center border-t border-[#222] pt-12">
                                <p className="font-jetbrains-mono text-xs text-[#666] uppercase tracking-widest mb-4">
                                    END OF DOSSIER
                                </p>
                                <Button 
                                    onClick={() => setIsExpanded(false)}
                                    variant="ghost"
                                    className="text-neon-surge hover:text-white text-xs uppercase tracking-widest"
                                >
                                    COLLAPSE SECTION
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUsPage;
