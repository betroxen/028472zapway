
import React, { useContext } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { AppContext } from '../context/AppContext';

interface HomePageProps {
  onRegisterClick: () => void;
}

// --- LAYOUT HELPERS ---

const SectionContainer: React.FC<{ 
    className?: string; 
    children: React.ReactNode; 
    id?: string;
}> = ({ className = "", children, id }) => (
  <section id={id} className={`py-16 md:py-24 lg:py-32 px-4 sm:px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionHeader: React.FC<{ 
    title: string; 
    subtitle?: string; 
    description?: string;
    centered?: boolean;
}> = ({ title, subtitle, description, centered = false }) => (
  <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto' : 'text-left'} max-w-4xl animate-fade-up`}>
    {subtitle && (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-surge/10 border border-neon-surge/30 text-neon-surge text-xs font-jetbrains-mono uppercase tracking-[0.2em] mb-6 font-bold ${centered ? 'mx-auto' : ''}`}>
        <span className="w-2 h-2 rounded-full bg-neon-surge animate-pulse"></span>
        {subtitle}
      </div>
    )}
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-black text-white uppercase tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
      {title}
    </h2>
    {description && (
      <p className={`text-text-secondary text-lg md:text-xl font-rajdhani leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
        {description}
      </p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType; title: string; description: string; delay: string }) => (
  <div 
    className="group relative p-6 sm:p-8 bg-[#0e0e10] border border-[#222] rounded-2xl hover:border-neon-surge/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(0,255,192,0.15)] flex flex-col h-full animate-fade-up overflow-hidden"
    style={{ animationDelay: delay, animationFillMode: 'backwards' }}
  >
    {/* Hover Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#151515] to-[#0e0e10] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative z-10">
      <div className="mb-6 inline-flex p-4 rounded-xl bg-[#1a1a1a] border border-[#333] group-hover:bg-neon-surge group-hover:border-neon-surge transition-all duration-300 shadow-lg">
        <Icon className="h-8 w-8 text-neon-surge group-hover:text-black transition-colors duration-300" />
      </div>
      <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-neon-surge transition-colors">
        {title}
      </h3>
      <p className="font-rajdhani text-text-secondary text-base md:text-lg leading-relaxed border-l-2 border-[#333] pl-4 group-hover:border-neon-surge/50 transition-colors">
        {description}
      </p>
    </div>
  </div>
);

// --- SECTIONS ---

const HeroSection: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-24 pb-24 px-4 sm:px-8">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:60px_60px] animate-moving-grid"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#0A0A0A] border border-white/10 rounded-full mb-10 animate-fade-up backdrop-blur-md shadow-[0_0_30px_rgba(0,255,192,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-surge"></span>
            </span>
            <span className="text-neon-surge font-jetbrains-mono text-xs uppercase tracking-[0.3em] font-bold">System Operational</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-orbitron font-black tracking-tighter text-white leading-[0.9] mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          TRUST IS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-neon-surge to-[#009973] text-glow">OBSOLETE</span>
        </h1>

        <p className="mx-auto max-w-[320px] sm:max-w-xl md:max-w-3xl text-lg md:text-2xl text-text-secondary leading-relaxed mb-12 font-rajdhani font-medium animate-fade-up" style={{ animationDelay: '0.2s' }}>
          The first provably fair gaming protocol engineered on <span className="text-white font-bold">ZK-Rollups</span>. We prove every outcome with cryptographic finality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={onRegisterClick} 
              aria-label="Initialize Account"
              className="h-14 md:h-16 px-8 md:px-12 bg-neon-surge text-black text-base md:text-lg font-black font-orbitron uppercase tracking-[0.15em] rounded-xl shadow-[0_0_40px_rgba(0,255,192,0.4)] hover:shadow-[0_0_60px_rgba(0,255,192,0.6)] hover:scale-105 hover:bg-white transition-all duration-300"
            >
                Enter The Grid
            </Button>
            <Button 
              variant="ghost"
              aria-label="View Protocol Data"
              className="h-14 md:h-16 px-8 md:px-12 border border-white/20 text-white hover:bg-white/5 hover:border-neon-surge hover:text-neon-surge text-base md:text-lg font-bold font-orbitron uppercase tracking-[0.15em] rounded-xl transition-all duration-300"
              onClick={() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' })}
            >
                Protocol Data
            </Button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
    </section>
  );
};

const MarqueeSection = () => {
  const items = ["STAKE", "ROOBET", "DUEL", "ROLLBIT", "BC.GAME", "GAMDOM", "SHUFFLE", "RAZED", "RAINBET", "METAWIN"];
  return (
    <section className="bg-[#050505] border-y border-white/5 py-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none"></div>
      <div className="flex w-max animate-slide gap-16 md:gap-32 opacity-50 hover:opacity-100 transition-opacity duration-500">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-3xl md:text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none hover:from-neon-surge hover:to-neon-surge/50 transition-colors cursor-default">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

const TheStackSection = () => {
  const context = useContext(AppContext);
  
  return (
    <SectionContainer id="stack" className="bg-[#0C0C0E] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-surge/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10">
        <SectionHeader 
          title="THE ZAPWAY STACK" 
          subtitle="Infrastructure v4.0" 
          description="We replaced the 'House Edge' black box with a transparent, immutable tech stack. This is how we guarantee fairness without permission."
          centered 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={Icons.Cpu}
            title="ZK-Rollup Finality"
            description="Every wager is batched and proved on Layer 2. The casino cannot alter the outcome once the bet is signed. Mathematical immutability."
            delay="0.1s"
          />
          <FeatureCard 
            icon={Icons.RefreshCw}
            title="Decentralized VRF"
            description="Verifiable Random Functions generate entropy on-chain. No hidden server seeds. No 'god mode' for operators. Pure, auditable chaos."
            delay="0.2s"
          />
          <FeatureCard 
            icon={Icons.Shield}
            title="MPC Custody"
            description="Your funds are secured by Multi-Party Computation. No single point of failure. No centralized custody. Enterprise-grade security protocol."
            delay="0.3s"
          />
        </div>

        <div className="text-center">
          <Button 
            variant="ghost"
            onClick={() => context?.setCurrentPage('Protocol Deep Dive')}
            className="text-neon-surge hover:text-white border-b border-neon-surge/30 hover:border-neon-surge pb-1 rounded-none px-0 font-jetbrains-mono text-sm uppercase tracking-widest"
          >
            Read Technical Whitepaper &rarr;
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

// New Text-Heavy Section 1: Philosophy
const CorePhilosophySection = () => {
    return (
        <SectionContainer className="bg-[#050505]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 animate-fade-up">
                    <SectionHeader 
                        title="THE ALGORITHM DOESN'T LIE" 
                        subtitle="CORE PHILOSOPHY"
                        description="Traditional casinos operate in the shadows. We operate in the light of the blockchain. Every transaction, every spin, every card drawn is verifiable."
                    />
                    <div className="space-y-8">
                        <p className="text-text-secondary text-lg font-rajdhani leading-relaxed max-w-xl">
                            In an industry plagued by opacity, <strong className="text-white">transparency is the ultimate weapon</strong>. By anchoring our logic to public ledgers, we strip the house of its ability to cheat. You don't have to trust us; you just have to trust the code.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                             <Button 
                                className="bg-neon-surge text-black h-12 px-8 font-bold uppercase tracking-wide rounded-lg shadow-[0_0_15px_rgba(0,255,192,0.3)] hover:scale-105 transition-transform"
                                aria-label="Audit Our Code"
                            >
                                Audit The Code
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="order-1 lg:order-2 relative h-[400px] bg-[#0C0C0E] rounded-2xl border border-[#222] p-8 overflow-hidden group animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,192,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]"></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <Icons.Code className="h-16 w-16 text-neon-surge opacity-80" />
                        <div>
                             <div className="font-jetbrains-mono text-xs text-neon-surge mb-2">// SMART CONTRACT_V2</div>
                             <div className="font-jetbrains-mono text-sm text-text-tertiary leading-relaxed">
                                 function verifyOutcome(bytes32 seed, uint256 nonce) public view returns (uint256) &#123;<br/>
                                 &nbsp;&nbsp;return uint256(keccak256(abi.encodePacked(seed, nonce)));<br/>
                                 &#125;
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

const InstitutionalSection = () => {
  return (
    <SectionContainer className="bg-[#0C0C0E] relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1">
          <SectionHeader 
            title="INSTITUTIONAL GRADE PROTECTION" 
            subtitle="XAI GUARDIAN" 
            description="Our proprietary AI doesn't just monitor gameplay; it enforces Responsible Gaming mandates in real-time. Automated interventions protect your bankroll."
          />
          
          <div className="space-y-8">
            <article className="border-l-2 border-neon-surge pl-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-2">Explainable AI (XAI)</h3>
              <p className="font-rajdhani text-text-secondary text-lg leading-relaxed max-w-lg">
                Automated interventions for high-risk patterns protect your bankroll and your health. Decisions are transparent and auditable.
              </p>
            </article>
            <article className="border-l-2 border-[#333] pl-6 hover:border-neon-surge transition-colors duration-300 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-2">VASP Compliance</h3>
              <p className="font-rajdhani text-text-secondary text-lg leading-relaxed max-w-lg">
                We operate under strict AML/CTF frameworks. Verified operators, sanitized liquidity pools, and zero tolerance for illicit actors.
              </p>
            </article>
            <div className="pt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
               <Button 
                  className="bg-transparent border border-white/20 text-white hover:bg-neon-surge hover:text-black hover:border-neon-surge h-14 px-8 font-bold font-orbitron uppercase tracking-wider transition-all rounded-lg"
                  aria-label="View Compliance Docs"
                >
                  View Compliance Docs
                </Button>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative flex justify-center animate-fade-up">
           <div className="absolute inset-0 bg-neon-surge/10 blur-[100px] rounded-full pointer-events-none"></div>
           <div className="relative bg-[#050505] border border-[#333] rounded-3xl p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 w-full max-w-md aspect-square flex items-center justify-center">
              <div className="bg-[#0C0C0E] rounded-2xl overflow-hidden border border-[#222] w-full h-full flex items-center justify-center relative">
                  <Icons.Shield className="w-48 h-48 text-neon-surge animate-pulse-glow drop-shadow-[0_0_30px_rgba(0,255,192,0.5)]" />
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                      <span className="inline-block px-4 py-2 rounded bg-neon-surge/10 border border-neon-surge/50 text-neon-surge font-jetbrains-mono text-xs font-bold">
                          SYSTEM STATUS: SECURE
                      </span>
                  </div>
              </div>
           </div>
        </div>

      </div>
    </SectionContainer>
  );
};

const FinalCTA = ({ onRegisterClick }: { onRegisterClick: () => void }) => (
  <SectionContainer className="bg-[#050505] border-t border-[#222] relative overflow-hidden text-center">
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,#1f1f1f_1px,transparent_1px),linear-gradient(#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto py-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-orbitron text-white uppercase mb-8 tracking-tighter animate-fade-up">
            READY TO <span className="text-neon-surge text-glow">EXECUTE?</span>
          </h2>
          <p className="text-xl md:text-2xl font-rajdhani text-text-secondary mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
            The old system relies on luck. ZapWay relies on logic. <br className="hidden md:block" />
            Join the network that rewrote the rules of engagement.
          </p>
          
          <div className="flex justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                onClick={onRegisterClick}
                aria-label="Initialize Account"
                className="h-16 md:h-20 px-12 md:px-16 text-lg md:text-xl bg-neon-surge text-black font-black font-orbitron uppercase tracking-[0.2em] rounded-full shadow-[0_0_50px_rgba(0,255,192,0.5)] hover:shadow-[0_0_80px_rgba(0,255,192,0.7)] hover:scale-105 transition-all duration-300 animate-pulse-glow-shadow"
              >
                Initialize Account
              </Button>
          </div>

          <p className="mt-12 text-xs font-jetbrains-mono text-text-tertiary uppercase tracking-widest animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Secure Connection • No Credit Card Required • Web3 Ready
          </p>
      </div>
  </SectionContainer>
);

const HomePage: React.FC<HomePageProps> = ({ onRegisterClick }) => {
  return (
    <div className="animate-fadeIn bg-[#050505] overflow-hidden">
      <HeroSection onRegisterClick={onRegisterClick} />
      <MarqueeSection />
      <TheStackSection />
      <CorePhilosophySection />
      <InstitutionalSection />
      <FinalCTA onRegisterClick={onRegisterClick} />
    </div>
  );
};

export default HomePage;
