
import React from 'react';
import { Icons } from '../components/icons'; // Assuming standard Lucide icons wrapper
import { Card } from '../components/Card';

const ReviewMethodologyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-text-secondary font-rajdhani relative overflow-hidden">
            {/* Background Noise & Scanlines */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%]"></div>

            <div className="relative z-10 max-w-6xl mx-auto pb-20 px-6">
                
                {/* HERO SECTION */}
                <header className="text-center mb-20 pt-20 animate-fade-up">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-sm bg-neon-surge/5 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,192,0.1)]">
                         <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
                        </span>
                        <span className="text-xs font-jetbrains-mono text-neon-surge uppercase tracking-[0.2em] font-bold">
                            Protocol V4.0 Active
                        </span>
                    </div>
                    
                    <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-8 leading-none">
                        INSTITUTIONAL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge via-white to-cyan-400 animate-gradient-x">
                            INTEGRITY
                        </span>
                    </h1>
                    
                    <p className="text-text-secondary font-rajdhani text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto border-l-2 border-neon-surge pl-6 text-left md:text-center md:border-none md:pl-0">
                        The ZapWay Protocol is built on a single axiom: <span className="text-white font-bold">Trust is obsolete.</span> We demand cryptographic proof. Our methodology is a defensive architecture ensuring every transaction meets institutional compliance.
                    </p>
                </header>

                {/* CORE PILLARS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                     
                     {/* Card 1: ZK-Rollup */}
                     <Card className="bg-[#0A0A0A] border-[#222] hover:border-neon-surge hover:shadow-[0_0_30px_rgba(0,255,192,0.1)] p-8 group transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Icons.Cpu className="h-12 w-12 text-neon-surge" />
                        </div>
                        <div className="relative z-10">
                            <div className="p-3 bg-neon-surge/10 rounded-sm w-fit mb-6 border border-neon-surge/20 group-hover:bg-neon-surge group-hover:text-black transition-colors">
                                <Icons.Lock className="h-6 w-6 text-neon-surge group-hover:text-black" />
                            </div>
                            <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-3">ZK-Rollup Finality</h3>
                            <p className="text-sm text-zinc-400 font-jetbrains-mono leading-relaxed">
                                Layer 2 Zero-Knowledge proofs anchor every game outcome to the blockchain . Results are immutable and verifiable instantly.
                            </p>
                        </div>
                     </Card>

                     {/* Card 2: Ethical XAI */}
                     <Card className="bg-[#0A0A0A] border-[#222] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] p-8 group transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Icons.Activity className="h-12 w-12 text-cyan-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="p-3 bg-cyan-900/10 rounded-sm w-fit mb-6 border border-cyan-500/20 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                                <Icons.Eye className="h-6 w-6 text-cyan-400 group-hover:text-black" />
                            </div>
                            <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-3">Ethical XAI</h3>
                            <p className="text-sm text-zinc-400 font-jetbrains-mono leading-relaxed">
                                Explainable AI framework monitors for risk patterns and enforces responsible gaming interventions automatically.
                            </p>
                        </div>
                     </Card>

                     {/* Card 3: ISO Security */}
                     <Card className="bg-[#0A0A0A] border-[#222] hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] p-8 group transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Icons.Shield className="h-12 w-12 text-purple-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="p-3 bg-purple-900/10 rounded-sm w-fit mb-6 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-black transition-colors">
                                <Icons.Server className="h-6 w-6 text-purple-400 group-hover:text-black" />
                            </div>
                            <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-3">ISO 27001 Security</h3>
                            <p className="text-sm text-zinc-400 font-jetbrains-mono leading-relaxed">
                                Data handling mapped to ISO 27001 standards. Encryption, access control, and breach protocols are enterprise-grade.
                            </p>
                        </div>
                     </Card>
                </div>

                {/* DEEP DIVE SECTIONS */}
                <div className="space-y-24">

                    {/* SECTION 1: VERIFIABILITY */}
                    <div className="flex flex-col lg:flex-row gap-12 items-start animate-fade-up" style={{ animationDelay: '0.3s' }}>
                         <div className="flex-1">
                             <h2 className="font-orbitron text-3xl font-bold text-white mb-8 flex items-center gap-4 border-b border-[#333] pb-6">
                                <span className="text-neon-surge font-jetbrains-mono text-lg">01 //</span> 
                                CORE MANDATE: VERIFIABILITY
                            </h2>
                            <div className="space-y-6">
                                <div className="bg-[#0f0f0f] p-8 rounded-sm border border-[#222] hover:border-neon-surge/30 transition-colors">
                                    <h3 className="font-bold text-white text-lg mb-4 font-orbitron uppercase text-neon-surge flex items-center gap-2">
                                        <Icons.Terminal className="w-5 h-5" /> Proof of Fairness
                                    </h3>
                                    <ul className="space-y-4 text-sm text-zinc-400 font-jetbrains-mono">
                                        <li className="flex gap-4 items-start">
                                            <Icons.Check className="h-5 w-5 text-neon-surge shrink-0" />
                                            <span><strong className="text-white">Objective:</strong> Ensure RNG is truly random and tamper-proof via VRF Oracles.</span>
                                        </li>
                                         <li className="flex gap-4 items-start">
                                            <Icons.Check className="h-5 w-5 text-neon-surge shrink-0" />
                                            <span><strong className="text-white">Mechanism:</strong> Server Seed + Client Seed + Nonce = Hashed Output.</span>
                                        </li>
                                         <li className="flex gap-4 items-start">
                                            <Icons.Check className="h-5 w-5 text-neon-surge shrink-0" />
                                            <span><strong className="text-white">Output:</strong> The Verifiable Provenance Record (VPR). An immutable receipt.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                         </div>

                         {/* VISUAL SIDEBAR: VPR FLOW */}
                         <div className="w-full lg:w-1/3 bg-[#0A0A0A] border border-neon-surge/30 rounded-sm p-1 relative overflow-hidden shadow-[0_0_30px_rgba(0,255,192,0.05)]">
                            <div className="bg-[#050505] p-6 relative z-10 h-full">
                                <h4 className="font-orbitron text-sm text-neon-surge uppercase mb-6 tracking-widest flex items-center justify-between">
                                    VPR ARCHITECTURE
                                    <span className="w-2 h-2 bg-neon-surge rounded-full animate-pulse"></span>
                                </h4>
                                
                                <div className="space-y-0 relative font-jetbrains-mono text-xs">
                                    {/* Step 1 */}
                                    <div className="flex justify-between items-center py-4 border-b border-[#222] group hover:bg-white/5 px-2 transition-colors cursor-crosshair">
                                        <span className="text-zinc-500 group-hover:text-white transition-colors">01. INPUT</span>
                                        <span className="text-white font-bold">SEED PAIR</span>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="flex justify-between items-center py-4 border-b border-[#222] group hover:bg-white/5 px-2 transition-colors cursor-crosshair">
                                        <span className="text-zinc-500 group-hover:text-white transition-colors">02. PROCESS</span>
                                        <span className="text-cyan-400 font-bold">VRF ORACLE</span>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="flex justify-between items-center py-4 border-b border-[#222] group hover:bg-white/5 px-2 transition-colors cursor-crosshair">
                                        <span className="text-zinc-500 group-hover:text-white transition-colors">03. FINALITY</span>
                                        <span className="text-purple-400 font-bold">ZK-PROOF (L2)</span>
                                    </div>
                                    {/* Status */}
                                    <div className="flex justify-between items-center pt-4 px-2">
                                        <span className="text-zinc-500">STATUS</span>
                                        <span className="text-neon-surge bg-neon-surge/10 px-2 py-1 rounded text-[10px] font-bold border border-neon-surge/20">IMMUTABLE</span>
                                    </div>
                                </div>
                            </div>
                            {/* Animated Gradient Border */}
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,192,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
                         </div>
                    </div>

                    {/* SECTION 2: ETHICAL COMPLIANCE */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
                         <div className="flex-1">
                             <h2 className="font-orbitron text-3xl font-bold text-white mb-6 flex items-center gap-4 border-b border-[#333] pb-6">
                                <span className="text-cyan-400 font-jetbrains-mono text-lg">02 //</span> 
                                ETHICAL COMPLIANCE (XAI)
                            </h2>
                            <p className="text-zinc-400 mb-8 font-rajdhani text-lg">
                                Compliance is not a cost—it is a competitive advantage. Our Ethical AI framework ensures we meet regulatory mandates like MiCA and GDPR Article 22.
                            </p>
                             <div className="bg-[#0f0f0f] p-8 rounded-sm border border-[#222] hover:border-cyan-400/30 transition-colors">
                                <h3 className="font-bold text-white text-lg mb-4 font-orbitron uppercase text-cyan-400 flex items-center gap-2">
                                    <Icons.Cpu className="w-5 h-5" /> Automated Intervention
                                </h3>
                                <ul className="space-y-4 text-sm text-zinc-400 font-jetbrains-mono">
                                    <li className="flex gap-4">
                                        <Icons.Activity className="h-5 w-5 text-cyan-400 shrink-0" />
                                        <span><strong className="text-white">Mechanism:</strong> Continuous analysis of volatility exposure, session duration, and deposit frequency.</span>
                                    </li>
                                     <li className="flex gap-4">
                                        <Icons.ShieldAlert className="h-5 w-5 text-cyan-400 shrink-0" />
                                        <span><strong className="text-white">Action:</strong> If Risk Score &gt; Threshold, the protocol auto-executes a cooling-off period.</span>
                                    </li>
                                </ul>
                            </div>
                         </div>
                    </div>

                    {/* SECTION 3: ISO TABLE */}
                    <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
                         <h2 className="font-orbitron text-3xl font-bold text-white mb-8 flex items-center gap-4 border-b border-[#333] pb-6">
                            <span className="text-purple-500 font-jetbrains-mono text-lg">03 //</span> 
                            ISO 27001 BENCHMARKS
                        </h2>
                        <Card className="p-0 overflow-hidden bg-[#0A0A0A] border-[#222]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm font-jetbrains-mono">
                                    <thead className="bg-[#111] text-xs text-zinc-500 uppercase tracking-wider border-b border-[#333]">
                                        <tr>
                                            <th className="p-6 font-normal">Control Area</th>
                                            <th className="p-6 font-normal">Implementation</th>
                                            <th className="p-6 font-normal text-right">Benchmark</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#222]">
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="p-6 font-bold text-white group-hover:text-purple-400 transition-colors">Encryption</td>
                                            <td className="p-6 text-zinc-400">AES-256 for storage. TLS 1.3 for transit.</td>
                                            <td className="p-6 text-right text-purple-500">GDPR Art. 32</td>
                                        </tr>
                                         <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="p-6 font-bold text-white group-hover:text-purple-400 transition-colors">Access Control</td>
                                            <td className="p-6 text-zinc-400">Least Privilege Principle (LPP). No single point of failure.</td>
                                            <td className="p-6 text-right text-purple-500">ISO 27001 A.9.2</td>
                                        </tr>
                                         <tr className="hover:bg-white/5 transition-colors group">
                                            <td className="p-6 font-bold text-white group-hover:text-purple-400 transition-colors">Incident Response</td>
                                            <td className="p-6 text-zinc-400">72-hour Breach Notification Protocol (BNP).</td>
                                            <td className="p-6 text-right text-purple-500">ISO 27001 A.16</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                </div>

                {/* FOOTER QUOTE */}
                <div className="mt-32 text-center border-t border-[#222] pt-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
                     <p className="font-orbitron text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
                        "The ZapWay Methodology is not a promise. <br />
                        It is the <span className="text-neon-surge bg-neon-surge/10 px-2">verifiable source code</span> for institutional integrity."
                    </p>
                    <div className="mt-8 inline-block h-1 w-20 bg-neon-surge rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ReviewMethodologyPage;
