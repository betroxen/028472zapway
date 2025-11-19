
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

const ReviewMethodologyPage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-5xl mx-auto pb-20">
            {/* Hero */}
            <header className="text-center mb-16 pt-10">
                 <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-full bg-neon-surge/5 mb-6 backdrop-blur-sm">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
                    </span>
                    <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.2em] font-bold">Protocol V4.0 Active</span>
                </div>
                <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                    INSTITUTIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-blue-500 text-glow">INTEGRITY</span>
                </h1>
                <p className="text-text-secondary font-rajdhani text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    The ZapWay Protocol is built on a single axiom: <span className="text-white font-bold">Trust is obsolete.</span> We demand cryptographic proof. Our methodology is a defensive architecture ensuring every transaction meets institutional, cryptographic, and ethical compliance standards.
                </p>
            </header>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                 <Card className="bg-[#0c0c0e] border-[#333] hover:border-neon-surge/50 p-6 group">
                    <div className="p-3 bg-neon-surge/10 rounded-lg w-fit mb-4 border border-neon-surge/20 group-hover:bg-neon-surge/20 transition-colors">
                        <Icons.Lock className="h-8 w-8 text-neon-surge" />
                    </div>
                    <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">ZK-Rollup Finality</h3>
                    <p className="text-sm text-text-secondary font-rajdhani leading-relaxed">
                        We use Layer 2 Zero-Knowledge proofs to anchor every game outcome to the blockchain. Results are immutable and verifiable instantly.
                    </p>
                 </Card>
                 <Card className="bg-[#0c0c0e] border-[#333] hover:border-blue-500/50 p-6 group">
                    <div className="p-3 bg-blue-900/10 rounded-lg w-fit mb-4 border border-blue-500/20 group-hover:bg-blue-900/20 transition-colors">
                        <Icons.Cpu className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">Ethical XAI</h3>
                    <p className="text-sm text-text-secondary font-rajdhani leading-relaxed">
                        Our Explainable AI framework monitors for risk patterns and enforces responsible gaming interventions automatically and transparently.
                    </p>
                 </Card>
                 <Card className="bg-[#0c0c0e] border-[#333] hover:border-purple-500/50 p-6 group">
                    <div className="p-3 bg-purple-900/10 rounded-lg w-fit mb-4 border border-purple-500/20 group-hover:bg-purple-900/20 transition-colors">
                        <Icons.Shield className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">ISO 27001 Security</h3>
                    <p className="text-sm text-text-secondary font-rajdhani leading-relaxed">
                        Data handling is mapped to ISO 27001 standards. Encryption, access control, and breach protocols are enterprise-grade.
                    </p>
                 </Card>
            </div>

            {/* Deep Dive Sections */}
            <div className="space-y-12">
                
                {/* Section 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                     <div className="flex-1">
                         <h2 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                            <span className="text-neon-surge">01 //</span> CORE MANDATE: VERIFIABILITY
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-foundation-light p-6 rounded-xl border border-[#333]">
                                <h3 className="font-bold text-white text-base mb-2 font-orbitron uppercase text-neon-surge">A. Proof of Fairness (ZK-Rollup)</h3>
                                <ul className="space-y-3 text-sm text-text-secondary font-rajdhani">
                                    <li className="flex gap-3">
                                        <Icons.Check className="h-4 w-4 text-neon-surge shrink-0 mt-0.5" />
                                        <span><strong>Objective:</strong> Ensure RNG is truly random and tamper-proof.</span>
                                    </li>
                                     <li className="flex gap-3">
                                        <Icons.Check className="h-4 w-4 text-neon-surge shrink-0 mt-0.5" />
                                        <span><strong>Mechanism:</strong> Server Seed + Client Seed + Nonce = Hashed Output. Finalized on L2.</span>
                                    </li>
                                     <li className="flex gap-3">
                                        <Icons.Check className="h-4 w-4 text-neon-surge shrink-0 mt-0.5" />
                                        <span><strong>Output:</strong> The Verifiable Provenance Record (VPR). An immutable receipt for every wager.</span>
                                    </li>
                                </ul>
                            </div>
                            
                             <div className="bg-foundation-light p-6 rounded-xl border border-[#333]">
                                <h3 className="font-bold text-white text-base mb-2 font-orbitron uppercase text-neon-surge">B. Protocol Enforcement</h3>
                                <p className="text-sm text-text-secondary font-rajdhani">
                                    ZapWay enforces a transparent cycle. The final verification step is the ZK-Rollup commitment, ensuring that once a bet is placed, the seed cannot be retroactively altered by the operator to change the outcome.
                                </p>
                            </div>
                        </div>
                     </div>
                     {/* Visual Sidebar 1 */}
                     <div className="w-full md:w-1/3 bg-[#0c0c0e] border border-neon-surge/30 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,192,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]"></div>
                        <h4 className="font-orbitron text-sm text-neon-surge uppercase mb-4 relative z-10">VPR ARCHITECTURE</h4>
                        <div className="space-y-4 relative z-10 font-jetbrains-mono text-xs">
                            <div className="flex justify-between border-b border-[#333] pb-2">
                                <span className="text-text-tertiary">INPUT</span>
                                <span className="text-white">SEED PAIR</span>
                            </div>
                             <div className="flex justify-between border-b border-[#333] pb-2">
                                <span className="text-text-tertiary">PROCESS</span>
                                <span className="text-white">VRF ORACLE</span>
                            </div>
                             <div className="flex justify-between border-b border-[#333] pb-2">
                                <span className="text-text-tertiary">FINALITY</span>
                                <span className="text-white">ZK-PROOF (L2)</span>
                            </div>
                             <div className="flex justify-between pt-2">
                                <span className="text-text-tertiary">STATUS</span>
                                <span className="text-neon-surge font-bold">IMMUTABLE</span>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Section 2 */}
                 <div className="flex flex-col md:flex-row gap-8 items-start">
                     <div className="flex-1">
                         <h2 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                            <span className="text-blue-500">02 //</span> ETHICAL COMPLIANCE (XAI)
                        </h2>
                        <p className="text-text-secondary mb-6 font-rajdhani">
                            Compliance is not a cost—it is a competitive advantage. Our Ethical AI framework ensures we meet regulatory mandates like MiCA and GDPR Article 22.
                        </p>
                         <div className="space-y-6">
                            <div className="bg-foundation-light p-6 rounded-xl border border-[#333]">
                                <h3 className="font-bold text-white text-base mb-2 font-orbitron uppercase text-blue-500">A. Automated Intervention</h3>
                                <ul className="space-y-3 text-sm text-text-secondary font-rajdhani">
                                    <li className="flex gap-3">
                                        <Icons.Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                        <span><strong>Mechanism:</strong> Continuous analysis of volatility exposure, session duration, and deposit frequency.</span>
                                    </li>
                                     <li className="flex gap-3">
                                        <Icons.Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                        <span><strong>Action:</strong> If Risk Score > Threshold, the protocol auto-executes a cooling-off period or limit.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Section 3: Table */}
                <div className="pt-8">
                     <h2 className="font-orbitron text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                        <span className="text-purple-500">03 //</span> ISO 27001 BENCHMARKS
                    </h2>
                    <Card className="p-0 overflow-hidden bg-foundation/50 border-[#333]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm font-jetbrains-mono">
                                <thead className="bg-foundation-light text-xs text-text-tertiary uppercase tracking-wider border-b border-[#333]">
                                    <tr>
                                        <th className="p-4 pl-6">Control Area</th>
                                        <th className="p-4">Implementation</th>
                                        <th className="p-4 pr-6">Benchmark</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    <tr className="hover:bg-foundation-light transition-colors">
                                        <td className="p-4 pl-6 font-bold text-white">Encryption</td>
                                        <td className="p-4 text-text-secondary">AES-256 for storage. TLS 1.3 for transit.</td>
                                        <td className="p-4 pr-6 text-purple-400">GDPR Art. 32</td>
                                    </tr>
                                     <tr className="hover:bg-foundation-light transition-colors">
                                        <td className="p-4 pl-6 font-bold text-white">Access Control</td>
                                        <td className="p-4 text-text-secondary">Least Privilege Principle (LPP). No single point of failure.</td>
                                        <td className="p-4 pr-6 text-purple-400">ISO 27001 A.9.2</td>
                                    </tr>
                                     <tr className="hover:bg-foundation-light transition-colors">
                                        <td className="p-4 pl-6 font-bold text-white">Incident Response</td>
                                        <td className="p-4 text-text-secondary">72-hour Breach Notification Protocol (BNP).</td>
                                        <td className="p-4 pr-6 text-purple-400">ISO 27001 A.16</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

            </div>

            {/* Footer Quote */}
            <div className="mt-20 text-center border-t border-[#333] pt-12">
                 <p className="font-orbitron text-xl md:text-2xl font-bold text-white max-w-3xl mx-auto">
                    "The ZapWay Methodology is not a promise—it is the <span className="text-neon-surge">verifiable source code</span> for institutional integrity."
                </p>
            </div>
        </div>
    );
};

export default ReviewMethodologyPage;
