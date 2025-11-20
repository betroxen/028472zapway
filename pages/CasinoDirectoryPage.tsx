
import React, { useState, useMemo, useEffect, memo } from 'react';
import { 
    Search, 
    ShieldCheck, 
    ShieldAlert, 
    Gem, 
    ExternalLink, 
    Globe, 
    Zap, 
    Activity, 
    X,
    CheckCircle2,
    Timer,
    Landmark,
    ArrowLeft,
    Filter,
    SlidersHorizontal,
    ThumbsUp,
    ThumbsDown,
    CreditCard,
    Server,
    Lock,
    Smartphone,
    Network,
    Wifi,
    BarChart
} from 'lucide-react';

// --- TYPES ---
interface Casino {
    id: string;
    name: string;
    website: string;
    logo: string;
    rating: number;
    status: 'VERIFIED' | 'UNVERIFIED';
    bonus: string;
    established: string;
    withdrawalSpeed: string;
    license: string;
    founder: string;
    companySize: string;
    specialRanking?: 'ETERNAL CROWN' | 'ELITE TIER' | 'VETERAN';
    tags: string[];
    restricted: string[];
    chains: string[];
    languages: string[];
    kycLevel: 'NONE' | 'LOW' | 'HIGH';
    description: string;
    advisory: string;
    zeroEdge: boolean;
    pros: string[];
    cons: string[];
    features: {
        vpnFriendly: boolean;
        fiatOnramp: boolean;
        liveChat: boolean;
        mobileApp: boolean;
        p2pTransfer: boolean;
    };
}

type SortOption = 'RATING_DESC' | 'RATING_ASC' | 'NEWEST' | 'SPEED';

// --- MOCK DATA ---
const CASINOS: Casino[] = [
    { 
        id: 'duel', 
        name: 'Duel', 
        website: 'https://duel.com', 
        logo: 'https://files.catbox.moe/p4z3v7.jpg', 
        rating: 5.0, 
        status: 'VERIFIED', 
        bonus: '50% Rakeback', 
        established: '2023', 
        withdrawalSpeed: 'Instant (L2)', 
        license: 'Curaçao', 
        founder: 'Unknown (DAO)',
        companySize: '50-100',
        specialRanking: 'ETERNAL CROWN', 
        tags: ['Zero Edge', 'No KYC', 'PVP'], 
        restricted: ['USA', 'France'], 
        chains: ['BTC', 'ETH', 'LTC', 'SOL'],
        languages: ['English', 'Spanish', 'Portuguese', 'Japanese'],
        kycLevel: 'NONE',
        description: 'The new standard for PVP gaming. Built on high-frequency L2 rails for instant settlement. Zero-edge original games and massive rakeback rewards.',
        advisory: 'AUDIT PASSED 10/2025. Zero-Edge protocols verified on-chain.',
        zeroEdge: true,
        pros: ['Zero house edge on originals', 'No KYC required for crypto', 'Instant L2 settlements'],
        cons: ['Limited slot selection', 'No sports betting'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'stake', 
        name: 'Stake', 
        website: 'https://stake.com', 
        logo: 'https://files.catbox.moe/klt24q.jpg', 
        rating: 4.9, 
        status: 'VERIFIED', 
        bonus: '$1000 Monthly', 
        established: '2017', 
        withdrawalSpeed: '< 10 Mins', 
        license: 'Curaçao', 
        founder: 'Eddie Miroslav',
        companySize: '500+',
        specialRanking: 'ELITE TIER', 
        tags: ['Sportsbook', 'Originals', 'High Limit'], 
        restricted: ['USA', 'UK', 'Australia'], 
        chains: ['BTC', 'ETH', 'LTC', 'DOGE', 'EOS'],
        languages: ['English', 'German', 'Spanish', 'French', 'Russian', 'Portuguese'],
        kycLevel: 'LOW',
        description: 'The industry titan. Unmatched liquidity, massive sports betting markets, and the original provably fair games that started the revolution.',
        advisory: 'STABLE OPERATION. High liquidity reserves confirmed.',
        zeroEdge: false,
        pros: ['Massive liquidity for high rollers', 'Industry leading sports odds', 'Top-tier VIP program'],
        cons: ['Strict KYC for large withdrawals', 'Restricted in many regions'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'bcgame', 
        name: 'BC.GAME', 
        website: 'https://bc.game', 
        logo: 'https://files.catbox.moe/810c57.jpg', 
        rating: 4.7, 
        status: 'VERIFIED', 
        bonus: '180% Deposit', 
        established: '2017', 
        withdrawalSpeed: '~1 Hour', 
        license: 'Curaçao', 
        founder: 'BlockDance B.V.',
        companySize: '200-500',
        tags: ['Huge Community', 'Rain', 'DeFi'], 
        restricted: ['USA', 'China'], 
        chains: ['BTC', 'ETH', 'BNB', 'SOL', 'TRX'],
        languages: ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese'],
        kycLevel: 'LOW',
        description: 'A massive ecosystem of proprietary games and community features. BC.Game offers one of the most generous deposit match structures in the sector.',
        advisory: 'BONUS TERMS: Wager requirements apply to unlocked BCD.',
        zeroEdge: false,
        pros: ['Supports 50+ cryptocurrencies', 'Huge community & chat rain', 'Daily free spins'],
        cons: ['Complex bonus unlocking', 'Cluttered interface'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: true, p2pTransfer: true }
    },
    { 
        id: 'rollbit', 
        name: 'Rollbit', 
        website: 'https://rollbit.com', 
        logo: 'https://files.catbox.moe/wpp3nk.jpg', 
        rating: 4.4, 
        status: 'VERIFIED', 
        bonus: 'RLB Airdrop', 
        established: '2020', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Bull Gaming',
        companySize: '50-200',
        tags: ['NFT', 'Crypto Futures', '1000x'], 
        restricted: ['USA', 'UK'], 
        chains: ['BTC', 'ETH', 'SOL', 'LTC'],
        languages: ['English'],
        kycLevel: 'LOW',
        description: 'A crypto-native powerhouse blending high-leverage trading, NFT loans, and casino games. High volatility, high reward.',
        advisory: 'FUTURES RISK: 1000x leverage involves extreme liquidation risk.',
        zeroEdge: false,
        pros: ['Crypto futures trading', 'NFT marketplace', 'Innovative features'],
        cons: ['Volatile native token', 'Complex UI for beginners'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'shuffle', 
        name: 'Shuffle', 
        website: 'https://shuffle.com', 
        logo: 'https://files.catbox.moe/pkbfod.png', 
        rating: 4.3, 
        status: 'VERIFIED', 
        bonus: 'SHFL Airdrop', 
        established: '2023', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Noah',
        companySize: '50-100',
        tags: ['Tokenized', 'Airdrop'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH', 'USDC', 'TRX'],
        languages: ['English', 'Japanese'],
        kycLevel: 'LOW',
        description: 'Heavily integrated with its native SHFL token. Offers a sleek UI and aggressive rewards for active token holders.',
        advisory: 'TOKEN VOLATILITY: SHFL price impacts effective rakeback value.',
        zeroEdge: false,
        pros: ['Sleek modern design', 'SHFL token utility', 'Transparent team'],
        cons: ['Token price volatility', 'Limited payment options'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'roobet', 
        name: 'Roobet', 
        website: 'https://roobet.com', 
        logo: 'https://files.catbox.moe/of4dut.jpg', 
        rating: 4.2, 
        status: 'VERIFIED', 
        bonus: 'Snoop Dogg', 
        established: '2019', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Raw Entertainment',
        companySize: '200-500',
        tags: ['Brand', 'Slots'], 
        restricted: ['USA', 'UK'], 
        chains: ['BTC', 'ETH', 'LTC'],
        languages: ['English', 'Spanish', 'Portuguese'],
        kycLevel: 'HIGH',
        description: 'Famous for high-profile partnerships (Snoop Dogg, UFC). Extremely polished but has strict KYC and region blocking.',
        advisory: 'GEO-RESTRICTION: Aggressive VPN detection active.',
        zeroEdge: false,
        pros: ['High-profile partnerships', 'Massive slot library', 'Reliable payouts'],
        cons: ['Strict VPN detection', 'Mandatory KYC'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: false }
    }
];

// --- HELPERS ---
const sortCasinos = (casinos: Casino[], sort: SortOption) => {
    const c = [...casinos];
    switch (sort) {
        case 'RATING_DESC': return c.sort((a, b) => b.rating - a.rating);
        case 'RATING_ASC': return c.sort((a, b) => a.rating - b.rating);
        case 'NEWEST': return c.sort((a, b) => parseInt(b.established) - parseInt(a.established));
        case 'SPEED': return c; // In a real app, parse speed strings to numbers
        default: return c;
    }
};

// --- COMPONENTS ---

const FilterChip = ({ label, active, onClick, icon: Icon }: { label: string, active: boolean, onClick: () => void, icon?: React.ElementType }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border font-orbitron ${active ? 'bg-[#00FFC0] text-black border-[#00FFC0] shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'bg-[#0e0e10] text-zinc-400 border-[#333] hover:border-zinc-500 hover:text-white'}`}
    >
        {Icon && <Icon className={`w-3 h-3 ${active ? 'text-black' : 'text-zinc-500'}`} />}
        {label}
    </button>
);

// MEMOIZED CARD COMPONENT
const CasinoCard = memo(({ casino, onSelect, index }: { casino: Casino; onSelect: (c: Casino) => void; index: number }) => {
    const isCrown = casino.specialRanking === 'ETERNAL CROWN';
    const isElite = casino.specialRanking === 'ELITE TIER';

    return (
        <div 
            onClick={() => onSelect(casino)}
            className="group relative rounded-xl overflow-hidden cursor-pointer flex flex-col bg-[#09090b] border border-white/5 hover:border-[#00FFC0] transition-all duration-500 active:scale-[0.98] hover:shadow-[0_0_30px_rgba(0,255,192,0.15)] h-full animate-fade-up backdrop-blur-sm"
            style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s`, animationFillMode: 'both' }}
        >
            {/* Hover Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(0,255,192,0.05)_50%,transparent_100%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-[#00FFC0] transition-colors z-20 duration-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-[#00FFC0] transition-colors z-20 duration-500"></div>

            {/* Rank/Status Badge */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
                {isCrown && (
                    <div className="bg-[#00FFC0] text-black text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,192,0.4)] flex items-center gap-1 font-orbitron animate-pulse-glow">
                        <Gem className="w-3 h-3" /> Crown
                    </div>
                )}
                {isElite && (
                    <div className="bg-purple-500 text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg flex items-center gap-1 font-orbitron">
                        <Activity className="w-3 h-3" /> Elite
                    </div>
                )}
                 <div className={`px-2 py-1 rounded-sm text-[9px] font-bold uppercase tracking-wider border font-orbitron backdrop-blur-md ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0]/10 text-[#00FFC0] border-[#00FFC0]/30' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'}`}>
                    {casino.status === 'VERIFIED' ? 'Verified' : 'Unverified'}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col h-full relative z-10">

                {/* Header: Logo & Name */}
                <div className="flex items-start gap-4 mb-5">
                    <div className="w-16 h-16 rounded-xl bg-[#18181b] p-0.5 border border-white/10 shrink-0 overflow-hidden group-hover:border-[#00FFC0]/50 transition-colors shadow-lg">
                         <img 
                            src={casino.logo} 
                            alt={casino.name} 
                            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                            loading="lazy"
                        />
                    </div>
                    <div className="overflow-hidden pt-1">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight font-orbitron group-hover:text-[#00FFC0] transition-colors truncate leading-none">
                            {casino.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-[#00FFC0] font-bold text-sm font-mono bg-[#00FFC0]/10 px-1.5 rounded">{casino.rating.toFixed(1)}</span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i < Math.floor(casino.rating) ? 'bg-[#00FFC0]' : 'bg-[#333]'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Stats (Grid) */}
                <div className="grid grid-cols-2 gap-2 mb-5 font-mono">
                     <div className="bg-[#121214] rounded-sm p-2.5 border border-white/5 group-hover:border-white/10 transition-colors">
                        <span className="text-[9px] text-zinc-500 uppercase block mb-1 flex items-center gap-1"><Timer className="w-3 h-3" /> Speed</span>
                        <span className="text-[10px] text-white font-bold truncate block tracking-wide">{casino.withdrawalSpeed}</span>
                     </div>
                     <div className="bg-[#121214] rounded-sm p-2.5 border border-white/5 group-hover:border-white/10 transition-colors">
                        <span className="text-[9px] text-zinc-500 uppercase block mb-1 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> KYC</span>
                        <span className={`text-[10px] font-bold truncate block tracking-wide ${casino.kycLevel === 'NONE' ? 'text-[#00FFC0]' : casino.kycLevel === 'LOW' ? 'text-yellow-500' : 'text-red-500'}`}>
                            {casino.kycLevel}
                        </span>
                     </div>
                </div>

                {/* Bonus Highlight */}
                <div className="mb-5 bg-gradient-to-r from-[#00FFC0]/10 to-transparent border-l-2 border-[#00FFC0] p-3 group-hover:bg-[#00FFC0]/15 transition-colors">
                    <span className="text-[#00FFC0] text-xs font-bold font-rajdhani uppercase tracking-widest block mb-1">Active Bounty</span>
                    <span className="text-white text-sm font-bold font-orbitron tracking-wide">{casino.bonus}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                     {casino.features.vpnFriendly && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5 flex items-center gap-1 font-mono">
                            <Globe className="w-2.5 h-2.5" /> VPN
                        </span>
                    )}
                     {casino.chains.slice(0, 2).map(chain => (
                        <span key={chain} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5 font-mono">
                            {chain}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-2 font-orbitron">
                    <button 
                        className="h-10 rounded-sm bg-transparent hover:bg-white/5 text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 transition-all hover:border-[#00FFC0]/50 hover:text-[#00FFC0]"
                        onClick={(e) => { e.stopPropagation(); onSelect(casino); }}
                    >
                        View Intel
                    </button>
                    <a 
                        href={`${casino.website}?ref=zapway`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-10 rounded-sm bg-[#00FFC0] hover:bg-[#00FFC0]/90 text-black text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,192,0.2)] hover:shadow-[0_0_30px_rgba(0,255,192,0.4)] hover:-translate-y-0.5"
                    >
                        Play <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
});

// CASINO DETAIL VIEW
const CasinoDetail: React.FC<{ casino: Casino; onBack: () => void }> = ({ casino, onBack }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => { 
        window.scrollTo(0,0); 
        const handleScroll = () => setShowHeader(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-32 relative overflow-x-hidden animate-fadeIn font-rajdhani -mx-4 sm:-mx-6 lg:-mx-8">
            
            {/* STICKY HUD HEADER (Slides in on Scroll) */}
            <div className={`fixed top-16 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-lg border-b border-[#00FFC0]/20 transition-all duration-300 transform ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="max-w-[1800px] mx-auto px-6 h-16 flex items-center justify-between pl-[calc(1.5rem+var(--sidebar-width,0px))]">
                    <div className="flex items-center gap-6">
                         <button 
                            onClick={onBack}
                            className="flex items-center gap-2 text-zinc-400 hover:text-[#00FFC0] transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-orbitron font-bold uppercase hidden sm:inline">Back</span>
                        </button>
                        <div className="h-6 w-px bg-white/10"></div>
                        <div className="flex items-center gap-3">
                            <img src={casino.logo} alt="" className="w-8 h-8 rounded border border-white/20" />
                            <div>
                                <span className="font-orbitron font-bold text-sm uppercase tracking-wider block leading-none">{casino.name}</span>
                                <span className="text-[10px] text-[#00FFC0] font-mono">VERIFIED OPERATOR</span>
                            </div>
                        </div>
                    </div>
                     <a 
                        href={`${casino.website}?ref=zapway`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#00FFC0] text-black px-6 py-2 rounded-sm font-black font-orbitron uppercase text-xs hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,255,192,0.3)] flex items-center gap-2"
                    >
                        Deploy <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            {/* CINEMATIC HERO SECTION */}
            <div className="relative min-h-[60vh] w-full overflow-hidden flex items-end pb-12 lg:pb-16 border-b border-white/10 group">
                
                {/* Fixed Return Button - Absolute Positioned for Safety */}
                <div className="absolute top-8 left-8 z-40">
                     <button 
                        onClick={onBack}
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-[#00FFC0] transition-all group shadow-2xl hover:shadow-[0_0_20px_rgba(0,255,192,0.1)]"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#00FFC0] group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold font-orbitron uppercase tracking-widest text-white">Return to Grid</span>
                    </button>
                </div>

                {/* Dynamic Background Mesh */}
                <div className="absolute inset-0 bg-[#050505]">
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,192,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10"></div>
                     {/* Blurred Logo Backdrop */}
                     <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 blur-3xl scale-110 mix-blend-screen transition-transform duration-[20s] group-hover:scale-125"
                        style={{ backgroundImage: `url(${casino.logo})` }}
                     ></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 lg:px-12 pt-24">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-12">
                        {/* Operator Identity */}
                        <div className="w-32 h-32 lg:w-56 lg:h-56 rounded-3xl bg-[#0e0e10] border border-white/10 p-1.5 relative shrink-0 shadow-[0_0_60px_rgba(0,0,0,0.8)] group/logo">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                <img 
                                    src={casino.logo} 
                                    alt="" 
                                    className="w-full h-full object-cover grayscale group-hover/logo:grayscale-0 transition-all duration-700 scale-100 group-hover/logo:scale-110" 
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity"></div>
                            </div>
                             {casino.specialRanking === 'ETERNAL CROWN' && (
                                <div className="absolute -top-4 -right-4 bg-[#00FFC0] text-black p-2.5 rounded-full shadow-[0_0_25px_#00FFC0] animate-bounce-slow z-30 border-4 border-[#050505]">
                                    <Gem className="w-6 h-6" />
                                </div>
                            )}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                     <div className={`px-3 py-1 rounded-sm border text-[10px] font-bold font-mono flex items-center gap-2 uppercase tracking-wider ${casino.status === 'VERIFIED' ? 'border-[#00FFC0]/30 bg-[#00FFC0]/5 text-[#00FFC0]' : 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0] animate-pulse' : 'bg-yellow-500'}`}></div>
                                        {casino.status === 'VERIFIED' ? 'System Verified' : 'Unverified Entity'}
                                    </div>
                                    {casino.kycLevel === 'NONE' && (
                                        <span className="px-3 py-1 rounded-sm bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider font-orbitron">
                                            No KYC Required
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter text-white font-orbitron leading-[0.9] drop-shadow-2xl">
                                    {casino.name}
                                </h1>
                            </div>

                            <p className="text-zinc-300 text-base lg:text-xl font-medium max-w-3xl leading-relaxed border-l-4 border-[#00FFC0] pl-6 py-2">
                                {casino.description}
                            </p>
                        </div>

                        {/* Key Metrics */}
                        <div className="flex gap-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-12">
                             <div>
                                 <p className="text-[10px] font-orbitron text-zinc-500 uppercase tracking-[0.25em] mb-2">Trust Score</p>
                                 <p className="text-5xl lg:text-7xl font-black text-white font-orbitron flex items-baseline gap-1 leading-none">
                                     {casino.rating.toFixed(1)}<span className="text-xl text-[#00FFC0] opacity-80">/5.0</span>
                                 </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-[1800px] mx-auto px-4 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* LEFT COLUMN (8) */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* Tab Navigation */}
                    <div className="flex gap-8 overflow-x-auto no-scrollbar border-b border-white/10 pb-1">
                        {['TACTICAL ANALYSIS', 'COMPLIANCE', 'COMMUNITY FEED'].map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap font-orbitron relative hover:text-white ${activeTab === i ? 'text-[#00FFC0]' : 'text-zinc-500'}`}
                            >
                                {tab}
                                {activeTab === i && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FFC0] shadow-[0_0_15px_#00FFC0]"></div>}
                            </button>
                        ))}
                    </div>

                    {/* TAB: TACTICAL ANALYSIS */}
                    {activeTab === 0 && (
                        <div className="space-y-12 animate-fade-up">
                             
                             {/* Strengths / Weaknesses */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-[#0c0c0e] border border-white/10 rounded-xl p-8 hover:border-[#00FFC0]/30 transition-colors shadow-lg">
                                    <h4 className="text-[#00FFC0] font-bold uppercase tracking-wider text-xs mb-6 flex items-center gap-3 font-orbitron">
                                        <div className="p-1.5 bg-[#00FFC0]/10 rounded"><ThumbsUp className="w-4 h-4" /></div> Key Strengths
                                    </h4>
                                    <ul className="space-y-4">
                                        {casino.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start gap-4 text-sm text-zinc-300 font-mono leading-relaxed">
                                                <CheckCircle2 className="w-4 h-4 text-[#00FFC0] mt-0.5 shrink-0" />
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-[#0c0c0e] border border-white/10 rounded-xl p-8 hover:border-red-500/30 transition-colors shadow-lg">
                                    <h4 className="text-red-500 font-bold uppercase tracking-wider text-xs mb-6 flex items-center gap-3 font-orbitron">
                                        <div className="p-1.5 bg-red-500/10 rounded"><ThumbsDown className="w-4 h-4" /></div> Vulnerabilities
                                    </h4>
                                    <ul className="space-y-4">
                                        {casino.cons.map((con, i) => (
                                            <li key={i} className="flex items-start gap-4 text-sm text-zinc-300 font-mono leading-relaxed">
                                                <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             </div>

                            {/* System Advisory */}
                            <div className={`p-8 rounded-xl border relative overflow-hidden shadow-xl ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0]/5 border-[#00FFC0]/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className={`p-4 rounded-xl shrink-0 border ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0]/10 border-[#00FFC0]/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                                        {casino.status === 'VERIFIED' ? <ShieldCheck className="w-8 h-8 text-[#00FFC0]" /> : <ShieldAlert className="w-8 h-8 text-yellow-500" />}
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-black uppercase tracking-[0.2em] mb-3 font-orbitron ${casino.status === 'VERIFIED' ? 'text-[#00FFC0]' : 'text-yellow-500'}`}>
                                            System Advisory Protocol
                                        </h4>
                                        <p className="text-base text-zinc-300 leading-relaxed font-mono">{casino.advisory}</p>
                                    </div>
                                </div>
                                {/* Background Pattern */}
                                <div className="absolute -right-10 -bottom-10 text-[200px] opacity-5 font-black select-none pointer-events-none">
                                    {casino.status === 'VERIFIED' ? 'SAFE' : 'WARN'}
                                </div>
                            </div>

                            {/* Corporate Data */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-[#08080a] border border-white/10 rounded-xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-white/10 group-hover:bg-[#00FFC0] transition-colors"></div>
                                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-orbitron">
                                        <Landmark className="w-4 h-4" /> Corporate Entity
                                    </h4>
                                    <div className="space-y-5">
                                        <div className="flex justify-between border-b border-white/5 pb-3 font-mono group-hover:border-white/10 transition-colors">
                                            <span className="text-xs text-zinc-500 tracking-wider uppercase">License</span>
                                            <span className="text-xs font-bold text-white">{casino.license}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-3 font-mono group-hover:border-white/10 transition-colors">
                                            <span className="text-xs text-zinc-500 tracking-wider uppercase">Founder</span>
                                            <span className="text-xs font-bold text-white">{casino.founder}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-3 font-mono group-hover:border-white/10 transition-colors">
                                            <span className="text-xs text-zinc-500 tracking-wider uppercase">Operations</span>
                                            <span className="text-xs font-bold text-white">{casino.companySize} Employees</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#08080a] border border-white/10 rounded-xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-white/10 group-hover:bg-[#00FFC0] transition-colors"></div>
                                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6 font-orbitron flex items-center gap-3">
                                        <Server className="w-4 h-4" /> Capabilities
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Object.entries(casino.features).map(([key, val]) => (
                                            <div key={key} className="flex items-center justify-between p-3 rounded bg-[#121214] border border-white/5">
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 font-mono">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                {val ? <CheckCircle2 className="w-4 h-4 text-[#00FFC0]" /> : <X className="w-4 h-4 text-zinc-800" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: COMPLIANCE */}
                    {activeTab === 1 && (
                         <div className="space-y-12 animate-fade-up">
                            {/* KYC Visualizer */}
                            <div className="bg-[#08080a] border border-white/10 rounded-xl p-12 text-center relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFC0]/50 to-transparent"></div>
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8 font-orbitron">Verification Friction Level</h4>
                                
                                <div className="flex items-center justify-center gap-4 mb-10 max-w-lg mx-auto relative">
                                    {/* Progress Line Background */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-[#1a1a1c] -z-10 rounded-full"></div>
                                    
                                    {['NONE', 'LOW', 'HIGH'].map((level, idx) => {
                                        const isActive = casino.kycLevel === level;
                                        const color = level === 'NONE' ? 'bg-[#00FFC0] shadow-[0_0_20px_#00FFC0]' : level === 'LOW' ? 'bg-yellow-500 shadow-[0_0_20px_#EAB308]' : 'bg-red-500 shadow-[0_0_20px_#EF4444]';
                                        return (
                                            <div key={level} className={`flex-1 flex flex-col items-center gap-3 relative z-10 transition-all duration-500 ${isActive ? 'scale-110 opacity-100' : 'opacity-50 scale-90'}`}>
                                                <div className={`w-4 h-4 rounded-full ${isActive ? color : 'bg-[#333]'}`}></div>
                                                <span className={`text-[10px] font-bold uppercase font-orbitron ${isActive ? 'text-white' : 'text-zinc-600'}`}>{level}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                                <div className="bg-[#14131c] border border-white/10 p-6 rounded-lg max-w-2xl mx-auto">
                                    <p className="text-3xl font-black text-white font-orbitron mb-4 uppercase">{casino.kycLevel} INTERVENTION</p>
                                    <p className="text-zinc-400 leading-relaxed text-sm font-mono">
                                        {casino.kycLevel === 'NONE' 
                                            ? 'No personal identification required. Crypto-native wallet connection only. Ideal for privacy-focused operators.' 
                                            : casino.kycLevel === 'LOW' 
                                            ? 'Basic info required. ID only for large cashouts or suspicious activity flags.'
                                            : 'Standard identity verification (ID + Selfie) required for withdrawals exceeding threshold.'}
                                    </p>
                                </div>
                            </div>

                            {/* Restricted Zones */}
                             <div className="bg-[#08080a] border border-white/10 rounded-xl p-8">
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-orbitron">
                                    <Globe className="w-4 h-4" /> Geo-Fencing Protocols
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {casino.restricted.map(r => (
                                        <span key={r} className="px-4 py-2 rounded-md bg-red-900/10 text-red-500 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-2">
                                            <Lock className="w-3 h-3" /> {r}
                                        </span>
                                    ))}
                                </div>
                            </div>
                         </div>
                    )}

                    {/* TAB: FEED (Placeholder) */}
                    {activeTab === 2 && (
                        <div className="bg-[#050505] rounded-xl border border-[#333] overflow-hidden font-mono text-xs shadow-2xl animate-fade-up relative h-96 flex items-center justify-center">
                            <div className="text-center space-y-4 opacity-50">
                                <Activity className="w-16 h-16 mx-auto animate-pulse text-[#00FFC0]" />
                                <div className="text-[#00FFC0] uppercase tracking-widest animate-pulse">Connecting Live Feed...</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN (4) - CTA & STATS */}
                <div className="lg:col-span-4 space-y-8">
                    
                    {/* Bonus Card */}
                    <div className="relative rounded-xl overflow-hidden border border-[#00FFC0]/30 bg-[#00FFC0]/5 p-10 text-center group shadow-neon-glow-md">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FFC0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-[#00FFC0] uppercase tracking-[0.3em] mb-6 font-orbitron">Active Bounty</p>
                            <h3 className="text-5xl font-black text-white italic mb-10 font-orbitron tracking-tighter leading-none drop-shadow-lg">
                                {casino.bonus}
                            </h3>

                            <a 
                                href={`${casino.website}?ref=zapway`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="block w-full py-5 bg-[#00FFC0] text-black font-black uppercase tracking-[0.2em] text-sm rounded-lg hover:bg-white hover:scale-[1.02] transition-all font-orbitron shadow-lg"
                            >
                                Claim Bonus
                            </a>
                        </div>
                    </div>

                    {/* Speed Metric */}
                    <div className="bg-[#08080a] rounded-xl border border-white/10 p-8 hover:border-[#00FFC0]/30 transition-colors">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-orbitron">Payout Speed</span>
                            <Timer className="w-5 h-5 text-[#00FFC0]" />
                        </div>
                        <div className="text-3xl font-black text-white font-rajdhani mb-6">{casino.withdrawalSpeed}</div>
                        <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
                            <div className="h-full bg-[#00FFC0] w-[95%] animate-pulse shadow-[0_0_15px_#00FFC0]"></div>
                        </div>
                    </div>

                    {/* Networks */}
                     <div className="bg-[#08080a] rounded-xl border border-white/10 p-8">
                        <span className="text-xs text-zinc-500 uppercase block mb-6 font-orbitron tracking-[0.2em]">Supported Networks</span>
                        <div className="flex flex-wrap gap-3">
                            {casino.chains.map(c => (
                                <span key={c} className="px-3 py-1.5 bg-[#121214] text-zinc-300 text-[10px] font-bold rounded-md border border-white/10 hover:border-[#00FFC0]/50 hover:text-white transition-colors font-mono">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Footer Action */}
             <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#09090b]/95 border-t border-white/10 z-40 lg:hidden pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl">
                <div className="flex gap-4 items-center max-w-md mx-auto">
                    <div className="flex-1">
                        <p className="text-[9px] text-zinc-500 uppercase font-orbitron tracking-wider">Bonus</p>
                        <p className="text-sm font-bold text-white truncate font-rajdhani">{casino.bonus}</p>
                    </div>
                    <a 
                        href={`${casino.website}?ref=zapway`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-8 py-3 bg-[#00FFC0] text-black font-black uppercase tracking-widest text-xs rounded-md hover:bg-white transition-colors font-orbitron shadow-[0_0_20px_rgba(0,255,192,0.3)]"
                    >
                        Play Now
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
const CasinoDirectoryPage: React.FC = () => {
    const [selectedCasinoId, setSelectedCasinoId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [sortBy, setSortBy] = useState<SortOption>('RATING_DESC');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ vpnFriendly: false, fiatOnramp: false, noKyc: false });

    const filteredCasinos = useMemo(() => {
        let c = CASINOS.filter(casino => {
            if (!casino.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (activeCategory === 'VERIFIED' && casino.status !== 'VERIFIED') return false;
            if (activeCategory === 'NO_KYC' && casino.kycLevel !== 'NONE') return false;
            if (activeCategory === 'CRYPTO' && casino.chains.length === 0) return false;
            if (filters.vpnFriendly && !casino.features.vpnFriendly) return false;
            if (filters.fiatOnramp && !casino.features.fiatOnramp) return false;
            if (filters.noKyc && casino.kycLevel !== 'NONE') return false;
            return true;
        });
        return sortCasinos(c, sortBy);
    }, [searchTerm, activeCategory, filters, sortBy]);

    if (selectedCasinoId) {
        const casino = CASINOS.find(c => c.id === selectedCasinoId);
        if (casino) return <CasinoDetail casino={casino} onBack={() => setSelectedCasinoId(null)} />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pb-20 relative selection:bg-[#00FFC0] selection:text-black animate-fadeIn font-rajdhani">

            {/* Global Noise Texture */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Main Container */}
            <div className="relative z-10 pt-4 lg:pt-8 px-0 lg:px-8">
                <div className="max-w-[1900px] mx-auto lg:bg-[#050505]/50 lg:rounded-[3rem] lg:border border-white/5 min-h-[calc(100vh-4rem)] relative overflow-hidden">

                    {/* LIVE TELEMETRY BAR */}
                    <div className="border-b border-white/5 bg-black/40 backdrop-blur-md px-6 py-2 flex items-center justify-between text-[9px] font-jetbrains-mono uppercase tracking-widest text-zinc-500">
                         <div className="flex items-center gap-4">
                             <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> NETWORK LIVE</span>
                             <span className="hidden sm:inline">LATENCY: 12ms</span>
                         </div>
                         <div className="flex items-center gap-4">
                             <span>NODES: {CASINOS.length}</span>
                             <span className="text-[#00FFC0]">SYNCED</span>
                         </div>
                    </div>

                    {/* HERO HEADER */}
                    <div className="relative pt-16 pb-12 px-6 lg:px-12">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FFC0]/30 bg-[#00FFC0]/5 text-[#00FFC0] text-[10px] font-bold uppercase tracking-[0.25em] mb-6 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,192,0.1)] animate-fade-up">
                                    <Zap className="w-3 h-3" /> Intelligence Grid Online
                                </div>
                                <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] font-orbitron animate-fade-up" style={{ animationDelay: '0.1s' }}>
                                    Operator <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC0] via-white to-[#00FFC0] animate-gradient-x">Database</span>
                                </h1>
                            </div>

                            {/* Stats Ticker */}
                            <div className="flex gap-4 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                                {[
                                    { label: 'Active Nodes', value: CASINOS.length, color: 'text-white', icon: Network },
                                    { label: 'Compliance', value: '98.2%', color: 'text-[#00FFC0]', icon: ShieldCheck },
                                    { label: '24h Volume', value: '$42.5M', color: 'text-blue-400', icon: BarChart }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-[#0e0e10] border border-white/10 p-5 rounded-xl min-w-[160px] hover:border-[#00FFC0]/50 transition-all group shrink-0 cursor-default shadow-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider font-orbitron group-hover:text-[#00FFC0] transition-colors">{stat.label}</p>
                                            <stat.icon className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <p className={`text-2xl font-black font-rajdhani ${stat.color}`}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COMMAND BAR (Sticky) */}
                        <div className="sticky top-20 lg:top-4 z-30 transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                            <div className="bg-[#0e0e10]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col lg:flex-row gap-2 relative overflow-hidden">
                                {/* Scanline */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FFC0]/50 to-transparent"></div>

                                {/* Mobile Search */}
                                <div className="flex lg:hidden gap-2">
                                    <div className="relative flex-1 group">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#00FFC0] transition-colors" />
                                        <input 
                                            type="text" 
                                            placeholder="SEARCH TARGET..." 
                                            className="w-full h-12 pl-10 bg-[#050505] border border-white/5 rounded-lg text-white text-xs font-bold uppercase tracking-wider outline-none placeholder:text-zinc-700 focus:border-[#00FFC0]/40 focus:bg-[#0a0a0a] transition-all font-orbitron"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button 
                                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                        className={`h-12 px-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${isMobileFilterOpen ? 'bg-[#00FFC0] text-black border-[#00FFC0]' : 'bg-[#050505] border-white/5 text-zinc-400'}`}
                                    >
                                        <SlidersHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Desktop Controls */}
                                <div className="hidden lg:flex items-center gap-3 w-full">
                                    <div className="relative flex-1 group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#00FFC0] transition-colors" />
                                        <input 
                                            type="text" 
                                            placeholder="QUERY DATABASE..." 
                                            className="w-full h-14 pl-12 bg-[#050505] border border-white/5 rounded-lg text-white text-xs font-bold uppercase tracking-wider outline-none placeholder:text-zinc-700 focus:border-[#00FFC0]/40 focus:bg-[#0a0a0a] transition-all font-orbitron"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                                    <div className="flex gap-2">
                                        {['ALL', 'VERIFIED', 'NO_KYC', 'CRYPTO'].map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                className={`px-6 py-4 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap border font-orbitron ${activeCategory === cat ? 'bg-[#00FFC0] text-black border-[#00FFC0] shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'bg-[#050505] text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'}`}
                                            >
                                                {cat.replace('_', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                                    
                                    <div className="flex gap-2 items-center">
                                        <select 
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                                            className="h-14 px-6 bg-[#050505] border border-white/5 rounded-lg text-xs text-zinc-400 font-orbitron uppercase focus:outline-none focus:border-[#00FFC0]/40 cursor-pointer font-bold"
                                        >
                                            <option value="RATING_DESC">Highest Trust</option>
                                            <option value="NEWEST">Newest Entry</option>
                                            <option value="SPEED">Fastest Payout</option>
                                        </select>
                                        <button 
                                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                            className={`h-14 px-6 rounded-lg border flex items-center gap-2 transition-colors ${isMobileFilterOpen ? 'bg-[#00FFC0]/10 border-[#00FFC0] text-[#00FFC0]' : 'bg-[#050505] border-white/5 text-zinc-400 hover:text-white'}`}
                                        >
                                            <Filter className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Filter Drawer */}
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileFilterOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                                <div className="bg-[#0e0e10]/95 backdrop-blur-xl border border-white/10 rounded-xl p-6 lg:p-8 shadow-2xl">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 font-orbitron flex items-center gap-2">
                                                <SlidersHorizontal className="w-3 h-3" /> Core Capabilities
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                <FilterChip label="VPN Friendly" icon={Globe} active={filters.vpnFriendly} onClick={() => setFilters(p => ({...p, vpnFriendly: !p.vpnFriendly}))} />
                                                <FilterChip label="Fiat On-Ramp" icon={CreditCard} active={filters.fiatOnramp} onClick={() => setFilters(p => ({...p, fiatOnramp: !p.fiatOnramp}))} />
                                                <FilterChip label="No KYC" icon={ShieldCheck} active={filters.noKyc} onClick={() => setFilters(p => ({...p, noKyc: !p.noKyc}))} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRID AREA */}
                    <div className="px-6 lg:px-12 pb-32 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                            {filteredCasinos.map((casino, i) => (
                                <CasinoCard 
                                    key={casino.id} 
                                    casino={casino} 
                                    index={i} 
                                    onSelect={(c) => setSelectedCasinoId(c.id)} 
                                />
                            ))}
                        </div>

                        {filteredCasinos.length === 0 && (
                            <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-2xl bg-[#0a0a0a]/50 mt-12">
                                <Activity className="w-20 h-20 text-zinc-800 mx-auto mb-8 animate-pulse" />
                                <h3 className="text-3xl font-black text-zinc-700 uppercase tracking-widest font-orbitron">No Signal Found</h3>
                                <p className="text-zinc-600 mt-4 font-mono text-sm">Adjust filters to re-establish connection.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasinoDirectoryPage;
