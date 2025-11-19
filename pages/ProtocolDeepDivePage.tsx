
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const ProtocolDeepDivePage: React.FC = () => {
  return (
    <div className="animate-fadeIn min-h-screen bg-[#050505] text-white font-rajdhani relative overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon-surge/5 blur-[150px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* HERO */}
        <header className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-full bg-neon-surge/5 mb-8 backdrop-blur-sm animate-fade-up">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
            </span>
            <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.2em] font-bold">System Architecture v4.0</span>
          </div>
          
          <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            THE TRUSTLESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-emerald-400 text-glow">ENGINE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Legacy "Provably Fair" is a half-measure. We replaced server seeds with <strong className="text-white">Verifiable Random Functions (VRF)</strong> and anchored every outcome to a <strong className="text-white">ZK-Rollup</strong>. 
          </p>
        </header>

        {/* ARCHITECTURE VISUALIZATION */}
        <section className="mb-24 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4 mb-8">
                <Icons.Cpu className="h-6 w-6 text-neon-surge" />
                <h2 className="font-orbitron text-2xl font-bold text-white uppercase tracking-widest">Transaction Lifecycle</h2>
            </div>
            
            <div className="relative bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
                {/* Circuit Lines */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-surge/20 to-transparent -translate-y-1/2 hidden md:block"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                    {/* Node 1 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-white transition-colors relative z-10 shadow-lg">
                            <Icons.User className="h-8 w-8 text-text-secondary group-hover:text-white" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-white uppercase mb-1">1. User Signal</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">Signed Request</p>
                    </div>

                    {/* Connector */}
                    <div className="hidden md:flex items-center justify-center">
                        <div className="w-full h-px bg-neon-surge/50 relative">
                            <div className="absolute right-0 -top-1 w-2 h-2 bg-neon-surge rounded-full animate-ping"></div>
                        </div>
                    </div>

                     {/* Node 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-blue-500 transition-colors relative z-10 shadow-lg">
                            <Icons.FileText className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-white uppercase mb-1">2. Smart Contract</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">Logic Execution</p>
                    </div>

                     {/* Connector */}
                     <div className="hidden md:flex items-center justify-center">
                        <div className="w-full h-px bg-neon-surge/50"></div>
                    </div>

                    {/* Node 3 */}
                     <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-xl bg-[#1a1a1a] border border-neon-surge flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,255,192,0.2)] relative z-10">
                            <Icons.RefreshCw className="h-8 w-8 text-neon-surge animate-spin-slow" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-neon-surge uppercase mb-1">3. VRF Oracle</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">True Entropy</p>
                    </div>

                     {/* Connector */}
                     <div className="hidden md:flex items-center justify-center">
                        <div className="w-full h-px bg-neon-surge/50"></div>
                    </div>

                    {/* Node 4 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-purple-500 transition-colors relative z-10 shadow-lg">
                            <Icons.Database className="h-8 w-8 text-purple-500" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-white uppercase mb-1">4. L2 Settlement</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">Immutable Proof</p>
                    </div>
                </div>
            </div>
        </section>

        {/* COMPARATIVE ANALYSIS */}
        <section className="mb-24">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Legacy Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                            <Icons.AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <h2 className="font-orbitron text-2xl font-bold text-text-secondary uppercase">The Legacy Standard</h2>
                    </div>
                    <p className="text-text-tertiary text-sm leading-relaxed border-l-2 border-[#333] pl-4">
                        Used by 99% of crypto casinos (Stake, Roobet, BC.Game). It relies on a "Server Seed" generated by the house. While auditable *post-facto*, it allows for "God Mode" visibility by the operator before the bet is placed.
                    </p>

                    <div className="space-y-4">
                        <Card className="p-4 bg-[#0c0c0e] border-[#333] opacity-80">
                            <h4 className="font-bold text-white text-sm uppercase mb-2 font-orbitron">Server Seed Vulnerability</h4>
                            <p className="text-xs text-text-tertiary">The operator knows the result before you bet. They promise not to change it, but the information asymmetry exists.</p>
                        </Card>
                        <Card className="p-4 bg-[#0c0c0e] border-[#333] opacity-80">
                            <h4 className="font-bold text-white text-sm uppercase mb-2 font-orbitron">Single-Round Audit</h4>
                            <p className="text-xs text-text-tertiary">Verifying one round doesn't prove the system isn't rigging specific high-value bets or altering RTP over millions of spins.</p>
                        </Card>
                         <Card className="p-4 bg-[#0c0c0e] border-[#333] opacity-80">
                            <h4 className="font-bold text-white text-sm uppercase mb-2 font-orbitron">Centralized Database</h4>
                            <p className="text-xs text-text-tertiary">Your betting history lives on their SQL database. It can be deleted, modified, or "lost" during maintenance.</p>
                        </Card>
                    </div>
                </div>

                 {/* ZapWay Column */}
                 <div className="space-y-6 relative">
                    <div className="absolute -inset-4 bg-neon-surge/5 rounded-3xl blur-xl pointer-events-none"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="p-2 bg-neon-surge/10 rounded-lg border border-neon-surge/30">
                            <Icons.Zap className="h-5 w-5 text-neon-surge" />
                        </div>
                        <h2 className="font-orbitron text-2xl font-bold text-white uppercase text-glow">The ZapWay Protocol</h2>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-neon-surge pl-4 relative z-10">
                        A decentralized architecture where the house cannot know or influence the outcome. Randomness is generated externally via VRF, and results are anchored to an immutable Layer 2 ledger.
                    </p>

                    <div className="space-y-4 relative z-10">
                        <Card className="p-5 bg-[#111] border-neon-surge/30 shadow-[0_0_30px_rgba(0,255,192,0.1)] hover:border-neon-surge transition-colors">
                            <h4 className="font-bold text-neon-surge text-sm uppercase mb-2 font-orbitron flex items-center gap-2">
                                <Icons.Lock className="h-3 w-3" /> VRF Autonomy
                            </h4>
                            <p className="text-xs text-text-secondary">Entropy is sourced from a verifiable, tamper-proof oracle (e.g., Chainlink VRF). Neither the player nor the house can predict the result.</p>
                        </Card>
                         <Card className="p-5 bg-[#111] border-neon-surge/30 shadow-[0_0_30px_rgba(0,255,192,0.1)] hover:border-neon-surge transition-colors">
                            <h4 className="font-bold text-neon-surge text-sm uppercase mb-2 font-orbitron flex items-center gap-2">
                                <Icons.Database className="h-3 w-3" /> Immutable History
                            </h4>
                            <p className="text-xs text-text-secondary">Every bet is hashed and batched into a ZK-Proof. Once submitted to L1, the history is mathematically impossible to alter.</p>
                        </Card>
                         <Card className="p-5 bg-[#111] border-neon-surge/30 shadow-[0_0_30px_rgba(0,255,192,0.1)] hover:border-neon-surge transition-colors">
                            <h4 className="font-bold text-neon-surge text-sm uppercase mb-2 font-orbitron flex items-center gap-2">
                                <Icons.Shield className="h-3 w-3" /> Systemic Auditing
                            </h4>
                            <p className="text-xs text-text-secondary">Our protocol continuously verifies the AGGREGATE RTP. If the house edge deviates statistically, the smart contract pauses deposits automatically.</p>
                        </Card>
                    </div>
                </div>

             </div>
        </section>

        {/* TECHNICAL TERMINAL */}
        <section className="max-w-4xl mx-auto">
             <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="font-orbitron text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Icons.Terminal className="h-5 w-5 text-text-tertiary" /> Live Verification Log
                </h2>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
             </div>

             <div className="bg-[#08080a] rounded-lg border border-[#333] p-6 font-jetbrains-mono text-xs overflow-hidden shadow-2xl relative h-80">
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,192,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                 
                 <div className="space-y-2 relative z-10 h-full overflow-y-auto custom-scrollbar">
                     <div className="text-text-tertiary">--- INITIATING ZK-PROOF GENERATION SEQUENCE ---</div>
                     <div className="text-white flex gap-4">
                         <span className="text-neon-surge">10:42:01</span>
                         <span>Fetching Block Header [0x8a1...9f2]</span>
                     </div>
                     <div className="text-white flex gap-4">
                         <span className="text-neon-surge">10:42:02</span>
                         <span>VRF Request Sent > Oracle Node #4</span>
                     </div>
                     <div className="text-white flex gap-4">
                         <span className="text-neon-surge">10:42:03</span>
                         <span>Entropy Received: <span className="text-yellow-500 break-all">294810582058105810...</span></span>
                     </div>
                     <div className="text-white flex gap-4">
                         <span className="text-neon-surge">10:42:03</span>
                         <span>Computing Game Result... <span className="text-blue-400">WIN (2.5x)</span></span>
                     </div>
                     <div className="text-white flex gap-4">
                         <span className="text-neon-surge">10:42:04</span>
                         <span>Generating SNARK Proof...</span>
                     </div>
                     <div className="text-green-500 flex gap-4">
                         <span className="text-neon-surge">10:42:05</span>
                         <span>PROOF VALID. Batch Committed to L1.</span>
                     </div>
                      <div className="text-text-tertiary mt-4">--- WAITING FOR NEXT BATCH ---</div>
                      <div className="animate-pulse text-neon-surge">_</div>
                 </div>
             </div>
             
             <div className="mt-8 text-center">
                 <Button className="bg-white text-black font-orbitron font-black uppercase tracking-widest px-8 hover:scale-105 shadow-neon-glow-md">
                     View Contract Source
                 </Button>
             </div>
        </section>

      </div>
    </div>
  );
};

export default ProtocolDeepDivePage;
