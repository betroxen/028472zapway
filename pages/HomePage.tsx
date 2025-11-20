
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
  <section id={id} className={`py-20 md:py-32 px-4 sm:px-8 ${className}`}>
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
  <div className={`mb-16 md:mb-24 ${centered ? 'text-center mx-auto' : 'text-left'} max-w-4xl animate-fade-up`}>
    {subtitle && (
      <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neon-surge/5 border border-neon-surge/20 text-neon-surge text-xs font-jetbrains-mono uppercase tracking-[0.25em] mb-8 font-bold ${centered ? 'mx-auto' : ''}`}>
        <span className="w-2 h-2 rounded-full bg-neon-surge animate-pulse"></span>
        {subtitle}
      </div>
    )}
    <h2 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-black text-white uppercase tracking-tighter leading-[1.1] mb-8 drop-shadow-2xl">
      {title}
    </h2>
    {description && (
      <p className={`text-text-secondary text-lg md:text-2xl font-rajdhani font-medium leading-relaxed max-w-3xl ${centered ? 'mx-auto' : ''}`}>
        {description}
      </p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType; title: string; description: string; delay: string }) => (
  <div 
    className="group relative p-8 sm:p-10 bg-[#0e0e10] border border-white/5 rounded-3xl hover:border-neon-surge/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,255,192,0.1)] flex flex-col h-full animate-fade-up overflow-hidden card-lift"
    style={{ animationDelay: delay, animationFillMode: 'backwards' }}
  >
    {/* Hover Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e10] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <div className="relative z-10">
      <div className="mb-8 inline-flex p-5 rounded-2xl bg-[#18181b] border border-white/10 group-hover:bg-neon-surge group-hover:border-neon-surge transition-all duration-500 shadow-lg">
        <Icon className="h-10 w-10 text-neon-surge group-hover:text-black transition-colors duration-500" />
      </div>
      <h3 className="font-orbitron text-2xl font-black text-white mb-4 uppercase tracking-wide group-hover:text-neon-surge transition-colors">
        {title}
      </h3>
      <p className="font-rajdhani text-text-secondary text-lg leading-relaxed border-l-2 border-[#333] pl-5 group-hover:border-neon-surge/50 transition-colors">
        {description}
      </p>
    </div>
  </div>
);

// --- SECTIONS ---

const HeroSection: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-32 pb-32 px-4 sm:px-8">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:60px_60px] animate-moving-grid"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-surge/5 rounded-full blur-[150px] pointer-events-none animate-pulse-glow"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#0A0A0A]/80 border border-white/10 rounded-full mb-12 animate-fade-up backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,192,0.15)] hover:border-neon-surge/50 transition-colors cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-surge"></span>
            </span>
            <span className="text-neon-surge font-jetbrains-mono text-xs uppercase tracking-[0.3em] font-bold">Protocol v4.0 Online</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-orbitron font-black tracking-tighter text-white leading-[0.85] mb-10 animate-fade-up drop-shadow-2xl" style={{ animationDelay: '0.1s' }}>
          REVOLUTIONIZE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-neon-surge to-[#009973] text-glow relative z-10">GAMING</span>
        </h1>

        <p className="mx-auto max-w-[340px] sm:max-w-2xl md:max-w-4xl text-lg md:text-3xl text-text-secondary leading-normal mb-16 font-rajdhani font-medium animate-fade-up" style={{ animationDelay: '0.2s' }}>
          The first provably fair protocol engineered on <span className="text-white font-bold border-b-2 border-neon-surge/50">ZK-Rollups</span>. <br className="hidden md:block"/> We prove every outcome with cryptographic finality.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={onRegisterClick} 
              aria-label="Initialize Account"
              className="h-16 md:h-20 px-10 md:px-16 bg-neon-surge text-black text-lg md:text-xl font-black font-orbitron uppercase tracking-[0.2em] rounded-full shadow-[0_0_40px_rgba(0,255,192,0.4)] hover:shadow-[0_0_80px_rgba(0,255,192,0.6)] hover:scale-105 hover:bg-white transition-all duration-500 border-2 border-transparent"
            >
                Enter The Grid
            </Button>
            <Button 
              variant="ghost"
              aria-label="View Protocol Data"
              className="h-16 md:h-20 px-10 md:px-16 border border-white/20 text-white hover:bg-white/5 hover:border-neon-surge hover:text-neon-surge text-lg md:text-xl font-bold font-orbitron uppercase tracking-[0.2em] rounded-full transition-all duration-500"
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
    <section className="bg-[#050505] border-y border-white/5 py-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none"></div>
      <div className="flex w-max animate-slide gap-16 md:gap-32 opacity-40 hover:opacity-100 transition-opacity duration-500">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-4xl md:text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 select-none hover:from-neon-surge hover:to-neon-surge/50 transition-all cursor-default">
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
    <SectionContainer id="stack" className="bg-[#080808] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-surge/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10">
        <SectionHeader 
          title="THE ZAPWAY STACK" 
          subtitle="Infrastructure v4.0" 
          description="We replaced the 'House Edge' black box with a transparent, immutable tech stack. This is how we guarantee fairness without permission."
          centered 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
            className="text-neon-surge hover:text-white border-b-2 border-neon-surge/50 hover:border-neon-surge pb-1 rounded-none px-0 font-jetbrains-mono text-base uppercase tracking-widest hover:bg-transparent"
          >
            Read Technical Whitepaper &rarr;
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

const CorePhilosophySection = () => {
    return (
        <SectionContainer className="bg-[#050505] border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1 animate-fade-up">
                    <SectionHeader 
                        title="THE ALGORITHM DOESN'T LIE" 
                        subtitle="CORE PHILOSOPHY"
                        description="Traditional casinos operate in the shadows. We operate in the light of the blockchain. Every transaction, every spin, every card drawn is verifiable."
                    />
                    <div className="space-y-10">
                        <p className="text-text-secondary text-xl font-rajdhani leading-relaxed max-w-xl border-l-4 border-neon-surge pl-6">
                            In an industry plagued by opacity, <strong className="text-white">transparency is the ultimate weapon</strong>. By anchoring our logic to public ledgers, we strip the house of its ability to cheat. You don't have to trust us; you just have to trust the code.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                             <Button 
                                className="bg-neon-surge text-black h-14 px-10 font-bold font-orbitron uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(0,255,192,0.3)] hover:scale-105 transition-transform hover:bg-white"
                                aria-label="Audit Our Code"
                            >
                                Audit The Code
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="order-1 lg:order-2 relative h-[500px] bg-[#0e0e10] rounded-[2.5rem] border border-white/10 p-10 overflow-hidden group animate-fade-up shadow-2xl" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,192,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_6s_infinite]"></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="w-24 h-24 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                             <Icons.Code className="h-12 w-12 text-neon-surge" />
                        </div>
                        <div className="bg-[#111] p-6 rounded-xl border border-white/10 font-jetbrains-mono text-sm text-text-tertiary leading-relaxed shadow-inner">
                             <div className="text-xs text-neon-surge mb-3 uppercase tracking-widest font-bold">// SMART CONTRACT_V2</div>
                             <span className="text-blue-400">function</span> <span className="text-yellow-400">verifyOutcome</span>(bytes32 seed, uint256 nonce) <span className="text-blue-400">public view returns</span> (uint256) &#123;<br/>
                             &nbsp;&nbsp;<span className="text-purple-400">return</span> uint256(keccak256(abi.encodePacked(seed, nonce)));<br/>
                             &#125;
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

const InstitutionalSection = () => {
  return (
    <SectionContainer className="bg-[#080808] relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        <div className="order-2 lg:order-1">
          <SectionHeader 
            title="INSTITUTIONAL GRADE PROTECTION" 
            subtitle="XAI GUARDIAN" 
            description="Our proprietary AI doesn't just monitor gameplay; it enforces Responsible Gaming mandates in real-time. Automated interventions protect your bankroll."
          />
          
          <div className="space-y-10">
            <article className="border-l-4 border-neon-surge pl-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-orbitron text-2xl font-bold text-white uppercase mb-3 flex items-center gap-3">
                  <Icons.Cpu className="w-6 h-6 text-neon-surge" /> Explainable AI (XAI)
              </h3>
              <p className="font-rajdhani text-text-secondary text-lg leading-relaxed max-w-lg">
                Automated interventions for high-risk patterns protect your bankroll and your health. Decisions are transparent and auditable.
              </p>
            </article>
            <article className="border-l-4 border-[#333] pl-8 hover:border-neon-surge transition-colors duration-500 animate-fade-up group" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-orbitron text-2xl font-bold text-white uppercase mb-3 flex items-center gap-3 group-hover:text-neon-surge transition-colors">
                  <Icons.FileCheck className="w-6 h-6 text-zinc-500 group-hover:text-neon-surge transition-colors" /> VASP Compliance
              </h3>
              <p className="font-rajdhani text-text-secondary text-lg leading-relaxed max-w-lg">
                We operate under strict AML/CTF frameworks. Verified operators, sanitized liquidity pools, and zero tolerance for illicit actors.
              </p>
            </article>
            <div className="pt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
               <Button 
                  className="bg-transparent border border-white/20 text-white hover:bg-neon-surge hover:text-black hover:border-neon-surge h-14 px-10 font-bold font-orbitron uppercase tracking-widest transition-all rounded-full"
                  aria-label="View Compliance Docs"
                >
                  View Compliance Docs
                </Button>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative flex justify-center animate-fade-up">
           <div className="relative bg-[#0e0e10] border border-white/10 rounded-[3rem] p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 w-full max-w-lg aspect-square flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] pointer-events-none"></div>
              <div className="text-center relative z-10">
                  <div className="w-40 h-40 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-neon-surge shadow-[0_0_60px_rgba(0,255,192,0.3)] mb-8 group-hover:scale-110 transition-transform duration-500">
                       <Icons.Shield className="w-20 h-20 text-neon-surge animate-pulse-glow" />
                  </div>
                  <h3 className="text-3xl font-black font-orbitron text-white uppercase mb-2 tracking-wide">System Secure</h3>
                  <div className="inline-block px-6 py-2 rounded-full bg-neon-surge/10 border border-neon-surge/50 text-neon-surge font-jetbrains-mono text-sm font-bold mt-4 uppercase tracking-widest">
                      Status: Optimal
                  </div>
              </div>
           </div>
        </div>

      </div>
    </SectionContainer>
  );
};

const FinalCTA = ({ onRegisterClick }: { onRegisterClick: () => void }) => (
  <SectionContainer className="bg-[#050505] border-t border-[#222] relative overflow-hidden text-center py-32">
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,#1f1f1f_1px,transparent_1px),linear-gradient(#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-black font-orbitron text-white uppercase mb-10 tracking-tighter animate-fade-up leading-[0.9]">
            READY TO <br/><span className="text-neon-surge text-glow">EXECUTE?</span>
          </h2>
          <p className="text-xl md:text-3xl font-rajdhani text-text-secondary mb-16 leading-relaxed max-w-3xl mx-auto animate-fade-up font-medium" style={{ animationDelay: '0.1s' }}>
            The old system relies on luck. ZapWay relies on logic. <br className="hidden md:block" />
            Join the network that rewrote the rules of engagement.
          </p>
          
          <div className="flex justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                onClick={onRegisterClick}
                aria-label="Initialize Account"
                className="h-20 md:h-24 px-16 md:px-20 text-xl md:text-2xl bg-neon-surge text-black font-black font-orbitron uppercase tracking-[0.2em] rounded-full shadow-[0_0_60px_rgba(0,255,192,0.5)] hover:shadow-[0_0_100px_rgba(0,255,192,0.7)] hover:scale-105 transition-all duration-300 animate-pulse-glow-shadow hover:bg-white border-4 border-transparent"
              >
                Initialize Account
              </Button>
          </div>

          <div className="mt-16 flex justify-center gap-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 text-xs font-jetbrains-mono text-text-tertiary uppercase tracking-widest">
                  <Icons.CheckCircle className="w-4 h-4 text-neon-surge" /> Secure Connection
              </div>
              <div className="flex items-center gap-2 text-xs font-jetbrains-mono text-text-tertiary uppercase tracking-widest">
                  <Icons.CheckCircle className="w-4 h-4 text-neon-surge" /> No Credit Card
              </div>
              <div className="flex items-center gap-2 text-xs font-jetbrains-mono text-text-tertiary uppercase tracking-widest">
                  <Icons.CheckCircle className="w-4 h-4 text-neon-surge" /> Web3 Ready
              </div>
          </div>
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
