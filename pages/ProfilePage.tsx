
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ProgressBar } from '../components/ProgressBar';
import { ConfirmationModal } from '../components/ConfirmationModal';

// --- FULL CASINO DATA ---
const ALL_CASINOS = [
    { id: 'duel', name: 'Duel', logo: 'https://files.catbox.moe/p4z3v7.jpg' },
    { id: 'stake', name: 'Stake', logo: 'https://files.catbox.moe/klt24q.jpg' },
    { id: 'whale', name: 'Whale.io', logo: 'https://files.catbox.moe/7zy00k.jpg' },
    { id: 'bcgame', name: 'BC.GAME', logo: 'https://files.catbox.moe/810c57.jpg' },
    { id: 'duelbits', name: 'Duelbits', logo: 'https://files.catbox.moe/e8i1og.jpg' },
    { id: 'gamdom', name: 'Gamdom', logo: 'https://files.catbox.moe/jav4a4.jpg' },
    { id: 'chips', name: 'Chips', logo: 'https://files.catbox.moe/x0zu6m.jpg' },
    { id: 'sportsbet', name: 'Sportsbet.io', logo: 'https://files.catbox.moe/v2jp51.jpg' },
    { id: 'betfury', name: 'BetFury', logo: 'https://files.catbox.moe/tw3eoe.jpg' },
    { id: 'rollbit', name: 'Rollbit', logo: 'https://files.catbox.moe/wpp3nk.jpg' },
    { id: 'rainbet', name: 'Rainbet', logo: 'https://files.catbox.moe/0jft4x.jpg' },
    { id: 'goated', name: 'Goated', logo: 'https://files.catbox.moe/qp4oyy.jpg' },
    { id: 'shuffle', name: 'Shuffle', logo: 'https://files.catbox.moe/pkbfod.png' },
    { id: 'blockbet', name: 'BlockBet', logo: 'https://files.catbox.moe/e6i3yr.jpg' },
    { id: 'razed', name: 'Razed', logo: 'https://files.catbox.moe/xvg0gy.jpg' },
    { id: 'roobet', name: 'Roobet', logo: 'https://files.catbox.moe/of4dut.jpg' },
    { id: 'yeet', name: 'Yeet', logo: 'https://files.catbox.moe/6kol09.jpg' },
    { id: 'moonroll', name: 'Moonroll', logo: 'https://files.catbox.moe/n7pja5.jpg' },
    { id: '500casino', name: '500 Casino', logo: 'https://files.catbox.moe/da6qov.jpg' },
    { id: 'metawin', name: 'MetaWin', logo: 'https://files.catbox.moe/yr8ksr.jpg' },
];

interface LinkedAccount {
    id: string;
    casinoId: string;
    casinoName: string;
    casinoLogo: string;
    username: string;
    email: string;
    verified: boolean;
    public: boolean;
}

const ProfilePage: React.FC = () => {
    const toastContext = useContext(ToastContext);
    const appContext = useContext(AppContext);
    
    if (!toastContext || !appContext) return null;

    const { showToast } = toastContext;

    const [bannerGradient, setBannerGradient] = useState<'green' | 'purple'>('green');
    const [profileImage, setProfileImage] = useState('https://placehold.co/150x150/00FFC0/0A0A0A?text=DG');
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [userBio, setUserBio] = useState("Crypto native since 2017. Hunting for max RTP and fair play. Alpha seeker.");

    // Linkage State
    const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
         { 
             id: '1', 
             casinoId: 'stake', 
             casinoName: 'Stake', 
             casinoLogo: 'https://files.catbox.moe/klt24q.jpg', 
             username: 'DegenG_Official', 
             email: '***@zap.gg', 
             verified: true, 
             public: true 
         }
    ]);
    
    const [linkForm, setLinkForm] = useState({
        targetCasinoId: '',
        username: '',
        email: '',
        attestation: false
    });

    // Custom Selector State
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [casinoSearch, setCasinoSearch] = useState('');
    const selectorRef = useRef<HTMLDivElement>(null);

    // Modal State
    const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);
    const [accountToDisconnect, setAccountToDisconnect] = useState<string | null>(null);

    const mfaStatus = true;
    const walletStatus = true;
    const discordHandle = "@DegenGambler";
    const profileHandle = "DegenGambler";
    const zapScore = 88;

    // Click outside to close selector
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
                setIsSelectorOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleBanner = () => {
        setBannerGradient(prev => prev === 'green' ? 'purple' : 'green');
        showToast("Profile theme updated. Signal lock engaged.", "success");
    };

    const cycleProfileImage = () => {
        const images = [
            'https://placehold.co/150x150/00FFC0/0A0A0A?text=DG',
            'https://placehold.co/150x150/8b5cf6/0A0A0A?text=DG',
            'https://placehold.co/150x150/3b82f6/0A0A0A?text=DG',
            'https://placehold.co/150x150/FF6347/0A0A0A?text=DG',
        ];
        const currentIndex = images.indexOf(profileImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setProfileImage(images[nextIndex]);
        showToast("Profile picture updated. New avatar active.", "success");
    };
    
    const handleBioSave = () => {
        setIsEditingBio(false);
        showToast("Bio updated. Intel broadcast is live.", "success");
    };

    const handleLinkAccount = (e: React.FormEvent) => {
        e.preventDefault();
        
        const casino = ALL_CASINOS.find(c => c.id === linkForm.targetCasinoId);
        if (!casino) {
            showToast("LINKAGE FAILED: Invalid operator target.", "error");
            return;
        }

        if (linkedAccounts.length >= 20) {
            showToast("LINKAGE ERROR: Maximum of 20 accounts reached.", "error");
            return;
        }
        if (!linkForm.targetCasinoId || !linkForm.username || !linkForm.email || !linkForm.attestation) {
             showToast("LINKAGE FAILED: All fields and attestation are mandatory.", "error");
             return;
        }

        // Check for duplicate link
        if (linkedAccounts.some(acc => acc.casinoId === casino.id)) {
             showToast(`LINKAGE ERROR: ${casino.name} account already linked.`, "error");
             return;
        }

        const newAccount: LinkedAccount = {
            id: crypto.randomUUID(),
            casinoId: casino.id,
            casinoName: casino.name,
            casinoLogo: casino.logo,
            username: linkForm.username,
            email: linkForm.email,
            verified: false, 
            public: false
        };

        setLinkedAccounts([...linkedAccounts, newAccount]);
        setLinkForm({ targetCasinoId: '', username: '', email: '', attestation: false });
        showToast(`LINK INITIATED: Verifying ${casino.name} account... Stand by.`, "info");

        setTimeout(() => {
             setLinkedAccounts(prev => prev.map(acc => acc.id === newAccount.id ? { ...acc, verified: true } : acc));
             showToast(`LINK ESTABLISHED: ${casino.name} account verified. Secure line active.`, "success");
        }, 2000);
    };

    const initiateDisconnect = (id: string) => {
        setAccountToDisconnect(id);
        setDisconnectModalOpen(true);
    };

    const confirmDisconnect = () => {
        if (accountToDisconnect) {
            setLinkedAccounts(prev => prev.filter(acc => acc.id !== accountToDisconnect));
            showToast("LINK TERMINATED. Account disconnected.", "info");
        }
        setDisconnectModalOpen(false);
        setAccountToDisconnect(null);
    };

    const togglePublicStatus = (id: string) => {
        const isCurrentlyPublic = linkedAccounts.find(a => a.id === id)?.public;
        setLinkedAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, public: !acc.public } : acc));
        showToast(`Visibility set to ${!isCurrentlyPublic ? 'PUBLIC' : 'PRIVATE'}`, 'info');
    };

    const bannerClasses = bannerGradient === 'green' 
        ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00FFC0]/20 via-[#0A0A0A] to-[#050505]' 
        : 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-[#0A0A0A] to-[#050505]';

    const ZAP_SCORE_COLOR = zapScore >= 90 ? 'text-neon-surge' : zapScore >= 75 ? 'text-yellow-400' : 'text-warning-low';
    const ZAP_SCORE_TEXT = zapScore >= 90 ? 'ELITE' : zapScore >= 75 ? 'VETERAN' : 'PILOT';
    
    const filteredCasinosForSelector = ALL_CASINOS.filter(c => 
        c.name.toLowerCase().includes(casinoSearch.toLowerCase())
    );

    const selectedCasinoForForm = ALL_CASINOS.find(c => c.id === linkForm.targetCasinoId);

    return (
        <div className="bg-foundation min-h-screen font-rajdhani animate-fadeIn">
            <ConfirmationModal 
                isOpen={disconnectModalOpen}
                title="DISCONNECT OPERATOR LINK?"
                body="Warning: Disconnecting this account will remove verified status and historical data association. This action cannot be undone immediately."
                onConfirm={confirmDisconnect}
                onClose={() => setDisconnectModalOpen(false)}
            />

            <div className="container mx-auto max-w-7xl">

                <Card className="relative overflow-hidden p-0 mb-8 group/banner border-[#333333] shadow-2xl bg-[#050505]">
                    {/* Banner Area - Static with Grid */}
                    <div className={`h-64 w-full ${bannerClasses} transition-all duration-1000 relative overflow-hidden`}>
                         {/* Grid Pattern Overlay */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/90"></div>
                         
                         <button 
                            onClick={toggleBanner} 
                            className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-md hover:bg-black/80 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 opacity-0 group-hover/banner:opacity-100 transition-opacity border border-white/10 font-orbitron uppercase tracking-widest hover:border-neon-surge/50"
                        >
                            <Icons.Edit className="h-3 w-3 text-neon-surge" /> Edit Theme
                        </button>
                    </div>

                    {/* Profile Info Overlay */}
                    <div className="px-6 md:px-10 pb-8 -mt-32 relative z-10 flex flex-col md:flex-row gap-8 items-end">
                        
                        {/* Avatar Container */}
                        <div className="relative group/pfp cursor-pointer shrink-0" onClick={cycleProfileImage}>
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border-4 border-[#0c0c0e] shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#0c0c0e] overflow-hidden relative">
                                <img 
                                    src={profileImage} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/pfp:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/pfp:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                                    <Icons.RefreshCw className="h-6 w-6 text-neon-surge animate-spin-slow" />
                                    <span className="text-[10px] font-orbitron uppercase tracking-widest text-white">Cycle Avatar</span>
                                </div>
                            </div>
                            
                            {/* Status Indicator */}
                            <div className="absolute -bottom-2 -right-2 bg-[#0c0c0e] p-1.5 rounded-xl border border-[#333]">
                                 <div className="bg-neon-surge/10 border border-neon-surge/30 p-1.5 rounded-lg shadow-[0_0_15px_rgba(0,255,192,0.4)] flex items-center gap-2 backdrop-blur-md">
                                    <div className="w-2 h-2 bg-neon-surge rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-neon-surge font-orbitron tracking-wider hidden sm:block">ONLINE</span>
                                 </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="flex-1 w-full mb-2">
                            <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tight drop-shadow-lg">{profileHandle}</h1>
                                    <p className="text-neon-surge font-jetbrains-mono text-xs uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                                        <Icons.Shield className="h-3 w-3" /> Level 42 Operator
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                     <div className={`px-4 py-2 rounded-lg bg-[#1a1a1a]/80 border ${zapScore >= 90 ? 'border-neon-surge text-neon-surge shadow-[0_0_15px_rgba(0,255,192,0.2)]' : 'border-yellow-500 text-yellow-500'} backdrop-blur-md`}>
                                        <div className="text-[10px] font-jetbrains-mono uppercase tracking-widest opacity-80">Trust Score</div>
                                        <div className="text-xl font-black font-orbitron text-center">{zapScore}</div>
                                    </div>
                                </div>
                            </div>
                            
                            {isEditingBio ? (
                                <div className='bg-[#111]/90 backdrop-blur-md p-4 rounded-xl border border-[#333] animate-fade-in-up max-w-2xl'>
                                    <label className="text-[10px] font-jetbrains-mono text-neon-surge uppercase mb-2 block">Update Bio Protocol</label>
                                    <textarea
                                        value={userBio}
                                        onChange={(e) => setUserBio(e.target.value)}
                                        className="w-full rounded-md border border-[#444] bg-black/50 p-3 text-sm text-white resize-none font-rajdhani focus:border-neon-surge outline-none mb-3"
                                        rows={3}
                                    />
                                    <div className="flex gap-3">
                                        <Button size="sm" onClick={handleBioSave} className="text-xs h-8">SAVE INTEL</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setIsEditingBio(false)} className="text-xs h-8">CANCEL</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="group/bio relative max-w-2xl">
                                    <p className="text-text-secondary/90 text-sm md:text-base leading-relaxed border-l-2 border-neon-surge/30 pl-4 py-1">
                                        {userBio}
                                    </p>
                                    <button 
                                        onClick={() => setIsEditingBio(true)} 
                                        className='absolute top-0 -right-8 text-text-tertiary hover:text-neon-surge opacity-0 group-hover/bio:opacity-100 p-1 transition-all'
                                    >
                                        <Icons.Edit className='w-3 h-3' />
                                    </button>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 mt-6">
                                 <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`https://zap.gg/profile/${profileHandle}`).then(() => showToast("Profile URL copied to terminal.", "success"))} className="bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-orbitron tracking-wider backdrop-blur-sm">
                                     <Icons.Share className="w-3 h-3 mr-2" /> SHARE
                                 </Button>
                                 <Button variant="primary" size="sm" onClick={() => appContext.setCurrentPage('Settings')} className="text-xs font-orbitron tracking-wider h-9">
                                     <Icons.Settings className="w-3 h-3 mr-2" /> SETTINGS
                                 </Button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decoration Strip */}
                    <div className="h-1.5 w-full bg-[#111] border-t border-[#222] flex">
                        <div className="w-1/3 bg-neon-surge/20"></div>
                        <div className="w-1/3 bg-transparent"></div>
                        <div className="w-1/3 bg-purple-500/20"></div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-8">
                        
                         <Card className="p-6 md:p-8 border-neon-surge/20 bg-[#0c0c0e]">
                            <h2 className="font-orbitron text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-4">
                                <Icons.Zap className="h-5 w-5 text-neon-surge" /> ZAP SCORE MATRIX ({zapScore})
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                 <div className="p-5 bg-[#14131c] rounded-xl border border-[#333333] relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-2 relative z-10">
                                        <p className="text-xs font-jetbrains-mono text-neon-surge uppercase tracking-widest">Integrity</p>
                                        <span className="text-xl font-bold text-white font-orbitron">95%</span>
                                    </div>
                                    <ProgressBar progress={95} className="h-1.5 mb-2" />
                                    <p className="text-[10px] text-text-tertiary font-jetbrains-mono relative z-10">Based on verified fair play audits.</p>
                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-neon-surge/5 rounded-full blur-xl -mr-8 -mb-8 pointer-events-none"></div>
                                </div>
                                 <div className="p-5 bg-[#14131c] rounded-xl border border-[#333333] relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-2 relative z-10">
                                        <p className="text-xs font-jetbrains-mono text-blue-400 uppercase tracking-widest">Activity</p>
                                        <span className="text-xl font-bold text-white font-orbitron">88%</span>
                                    </div>
                                    <ProgressBar progress={88} className="h-1.5 mb-2" />
                                    <p className="text-[10px] text-text-tertiary font-jetbrains-mono relative z-10">Consistent engagement levels.</p>
                                     <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl -mr-8 -mb-8 pointer-events-none"></div>
                                </div>
                                 <div className="p-5 bg-[#14131c] rounded-xl border border-[#333333] relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-2 relative z-10">
                                        <p className="text-xs font-jetbrains-mono text-purple-400 uppercase tracking-widest">VPR Record</p>
                                        <span className="text-xl font-bold text-white font-orbitron">82%</span>
                                    </div>
                                    <ProgressBar progress={82} className="h-1.5 mb-2" />
                                    <p className="text-[10px] text-text-tertiary font-jetbrains-mono relative z-10">Quality of submitted reports.</p>
                                     <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl -mr-8 -mb-8 pointer-events-none"></div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 md:p-8 border-blue-500/20 bg-[#0c0c0e]">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-[#333333] pb-4 gap-4">
                                <div>
                                    <h2 className="font-orbitron text-xl text-white flex items-center gap-3 uppercase tracking-wider">
                                        <Icons.Link className="h-5 w-5 text-blue-500" /> OPERATOR LINKAGE CIRCUIT
                                    </h2>
                                    <p className="text-text-tertiary text-xs mt-1 font-jetbrains-mono">
                                        VERIFY ACCOUNTS TO UNLOCK ELITE VPR STATUS. MAX 20 LINKS.
                                    </p>
                                </div>
                                <div className="px-3 py-1 rounded bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold font-jetbrains-mono">
                                    {linkedAccounts.length} / 20 ACTIVE
                                </div>
                            </div>

                            {linkedAccounts.length > 0 && (
                                <div className="mb-8 grid grid-cols-1 gap-3">
                                    {linkedAccounts.map(account => (
                                        <div key={account.id} className="flex items-center justify-between p-4 bg-[#14131c] rounded-xl border border-[#333333] hover:border-blue-500/50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-black border border-[#333] flex items-center justify-center p-1 shrink-0">
                                                    <img src={account.casinoLogo} alt={account.casinoName} className="w-full h-full object-cover rounded-md" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-white font-bold text-sm font-orbitron uppercase tracking-wide">{account.casinoName}</p>
                                                        {account.verified && <Icons.Verified className="w-3 h-3 text-neon-surge" title="Verified Owner" />}
                                                    </div>
                                                    <p className="text-xs text-text-tertiary font-jetbrains-mono flex items-center gap-1 mt-0.5">
                                                        <span className="opacity-50">HANDLE:</span> {account.username}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <div className={`hidden sm:flex px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${account.verified ? 'bg-neon-surge/10 border-neon-surge/30 text-neon-surge' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'}`}>
                                                    {account.verified ? 'VERIFIED' : 'PENDING'}
                                                </div>
                                                 <div className="w-px h-8 bg-[#333] mx-1"></div>
                                                 <button 
                                                    onClick={() => togglePublicStatus(account.id)}
                                                    className={`p-2 rounded-md transition-colors ${account.public ? 'text-blue-400 bg-blue-900/10 hover:bg-blue-900/20' : 'text-text-tertiary hover:text-white hover:bg-[#222]'}`}
                                                    title={account.public ? "Publicly Visible" : "Private (Hidden)"}
                                                >
                                                    {account.public ? <Icons.Eye className="h-4 w-4" /> : <Icons.EyeOff className="h-4 w-4" />}
                                                </button>
                                                <button 
                                                    onClick={() => initiateDisconnect(account.id)}
                                                    className="p-2 rounded-md text-text-tertiary hover:text-warning-high hover:bg-warning-high/10 transition-colors"
                                                    title="Disconnect Link"
                                                >
                                                    <Icons.Trash className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleLinkAccount} className="bg-[#14131c]/50 p-6 rounded-xl border border-[#333333] relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 rounded-l-xl"></div>
                                <h3 className="text-sm font-orbitron text-white uppercase mb-6 flex items-center gap-2">
                                    <Icons.CornerRightUp className='w-4 h-4 text-blue-500'/> ESTABLISH NEW CONNECTION
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    {/* CUSTOM CASINO SELECTOR */}
                                    <div className="relative" ref={selectorRef}>
                                        <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Target Operator</label>
                                        <button
                                            type="button"
                                            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                                            className="w-full h-11 rounded-md border border-[#333333] bg-black px-3 flex items-center justify-between text-sm text-white focus:border-blue-500 transition-colors"
                                        >
                                            {selectedCasinoForForm ? (
                                                <div className="flex items-center gap-3">
                                                    <img src={selectedCasinoForForm.logo} alt="" className="w-6 h-6 rounded object-cover" />
                                                    <span className="font-orbitron uppercase">{selectedCasinoForForm.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[#666] font-jetbrains-mono uppercase">// SELECT OPERATOR</span>
                                            )}
                                            <Icons.ChevronDown className={`w-4 h-4 text-[#666] transition-transform ${isSelectorOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isSelectorOpen && (
                                            <div className="absolute top-full left-0 w-full mt-2 bg-[#0c0c0e] border border-[#333] rounded-xl shadow-2xl z-50 max-h-64 flex flex-col overflow-hidden animate-fadeIn">
                                                <div className="p-2 border-b border-[#333]">
                                                    <div className="relative">
                                                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#666]" />
                                                        <input 
                                                            type="text" 
                                                            placeholder="FILTER..." 
                                                            className="w-full bg-[#1a1a1a] border border-[#333] rounded px-8 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-jetbrains-mono"
                                                            value={casinoSearch}
                                                            onChange={(e) => setCasinoSearch(e.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>
                                                <div className="overflow-y-auto custom-scrollbar flex-1 p-1">
                                                    {filteredCasinosForSelector.map(c => (
                                                        <button
                                                            key={c.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setLinkForm({...linkForm, targetCasinoId: c.id});
                                                                setIsSelectorOpen(false);
                                                            }}
                                                            className="w-full flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded transition-colors text-left"
                                                        >
                                                            <img src={c.logo} alt="" className="w-8 h-8 rounded object-cover border border-[#333]" />
                                                            <span className="font-orbitron text-sm text-white uppercase">{c.name}</span>
                                                        </button>
                                                    ))}
                                                    {filteredCasinosForSelector.length === 0 && (
                                                        <div className="p-4 text-center text-xs text-[#666] font-jetbrains-mono">NO TARGET FOUND</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Operator Handle</label>
                                        <Input 
                                            placeholder="EXACT USERNAME..." 
                                            value={linkForm.username}
                                            onChange={(e) => setLinkForm({...linkForm, username: e.target.value})}
                                            required
                                            className="h-11 bg-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Registered Email</label>
                                        <Input 
                                            type="email" 
                                            placeholder="ACCOUNT EMAIL..." 
                                            value={linkForm.email}
                                            onChange={(e) => setLinkForm({...linkForm, email: e.target.value})}
                                            required
                                            className="h-11 bg-black"
                                        />
                                    </div>
                                </div>

                                <div className="bg-warning-high/5 border border-warning-high/20 p-3 rounded-lg flex gap-3 items-start mb-6">
                                    <Icons.AlertTriangle className="h-5 w-5 text-warning-high shrink-0 mt-0.5" />
                                    <p className="text-xs text-warning-high/80 font-jetbrains-mono leading-relaxed">
                                        <strong className="block uppercase text-warning-high mb-1">Fraud Prevention Protocol</strong>
                                        False claims or attempting to link accounts you do not own will result in an immediate permanent ban and forfeiture of all Zap Points.
                                    </p>
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer group mb-6 bg-black p-3 rounded-lg border border-[#333333] hover:border-blue-500/50 transition-colors">
                                    <input 
                                        type="checkbox" 
                                        className="mt-1 accent-blue-500"
                                        checked={linkForm.attestation}
                                        onChange={(e) => setLinkForm({...linkForm, attestation: e.target.checked})}
                                    />
                                    <div className="text-xs text-text-tertiary leading-relaxed">
                                        <strong className="text-white block mb-1 font-orbitron uppercase">OWNERSHIP PROTOCOL ATTESTATION</strong>
                                        I confirm that I am the sole, legitimate owner of this account, granting ZAP secure, read-only verification access.
                                    </div>
                                </label>

                                <Button type="submit" className="w-full font-orbitron uppercase tracking-widest bg-blue-600 hover:bg-blue-500 h-12 text-sm shadow-lg shadow-blue-900/20" disabled={!linkForm.attestation}>
                                    LINK ACCOUNT & INITIALIZE VERIFICATION
                                </Button>
                            </form>
                        </Card>

                        <Card className="p-6 md:p-8 bg-[#0c0c0e]">
                            <h3 className="font-orbitron text-xl text-white mb-6 uppercase border-b border-[#333333] pb-3">RECENT GRID ACTIVITY</h3>
                            <div className="space-y-6">
                                {[
                                    { text: 'Completed "High-RTP Scan" Mission, earned +250 ZP.', icon: Icons.Star, color: 'text-neon-surge' },
                                    { text: 'VPR #3041 Verified: Stake payout successfully audited.', icon: Icons.CheckCircle, color: 'text-blue-400' },
                                    { text: 'Posted "Grid Vetting" update in the Alpha Channel.', icon: Icons.MessageSquare, color: 'text-purple-400' },
                                    { text: 'Unlocked "Veteran Pilot" Status.', icon: Icons.Trophy, color: 'text-yellow-400' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 pb-4 border-b border-[#333333] last:border-0 last:pb-0 group">
                                        <div className={`p-3 rounded-full h-fit shrink-0 border border-[#333333] bg-[#14131c] group-hover:border-white/20 transition-colors`}>
                                            <item.icon className={`w-4 h-4 ${item.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm font-orbitron uppercase tracking-wide">{item.text}</p>
                                            <p className="text-xs text-text-tertiary mt-1 font-jetbrains-mono">{i + 1} day{i > 0 ? 's' : ''} ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card className="p-6 md:p-8 border-yellow-500/20 bg-[#0c0c0e]">
                             <h2 className="font-orbitron text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                                <Icons.Trophy className="h-5 w-5 text-yellow-500" /> CORE INTEL
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                 <div className="p-4 text-center bg-[#14131c] rounded-xl border border-[#333333] hover:border-yellow-500/30 transition-colors">
                                    <p className="text-2xl font-jetbrains-mono text-white font-bold">1,240</p>
                                    <p className="text-[10px] text-text-tertiary uppercase font-orbitron tracking-wider mt-1">Zap Points</p>
                                </div>
                                 <div className="p-4 text-center bg-[#14131c] rounded-xl border border-[#333333] hover:border-yellow-500/30 transition-colors">
                                    <p className="text-2xl font-jetbrains-mono text-white font-bold">#1,337</p>
                                    <p className="text-[10px] text-text-tertiary uppercase font-orbitron tracking-wider mt-1">Global Rank</p>
                                </div>
                                 <div className="p-4 text-center bg-[#14131c] rounded-xl border border-[#333333] hover:border-yellow-500/30 transition-colors">
                                    <p className="text-2xl font-jetbrains-mono text-white font-bold">12</p>
                                    <p className="text-[10px] text-text-tertiary uppercase font-orbitron tracking-wider mt-1">Reviews Given</p>
                                </div>
                                <div className="p-4 text-center bg-[#14131c] rounded-xl border border-[#333333] hover:border-yellow-500/30 transition-colors">
                                    <p className="text-2xl font-jetbrains-mono text-white font-bold">98%</p>
                                    <p className="text-[10px] text-text-tertiary uppercase font-orbitron tracking-wider mt-1">RTP Target HIT</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-[#0c0c0e]">
                            <div className="flex justify-between items-center mb-2">
                                 <h3 className="font-orbitron text-lg text-white uppercase">Level 42 Circuit</h3>
                                 <span className="text-neon-surge font-bold font-jetbrains-mono">4,250 / 5,000 XP</span>
                            </div>
                            <ProgressBar progress={85} className="h-3 mb-4" />
                            <p className="text-xs text-text-tertiary font-jetbrains-mono">// 750 XP UNTIL LEVEL 43. UNLOCKS 'VETERAN' BADGE.</p>
                        </Card>

                        <Card className="p-6 bg-[#0c0c0e]">
                             <h2 className="font-orbitron text-lg text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                                <Icons.Shield className="h-5 w-5 text-purple-500" /> SECURITY VETTING
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-[#14131c] rounded-lg border border-[#333333]">
                                    <div>
                                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase mb-1">MFA Status</p>
                                        <p className={`text-sm font-bold font-orbitron ${mfaStatus ? 'text-neon-surge' : 'text-warning-high'}`}>
                                            {mfaStatus ? 'VERIFIED & ACTIVE' : 'INACTIVE // RISK'}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => appContext.setCurrentPage('Settings')} className="font-orbitron uppercase text-[10px] h-8 border border-[#333] hover:border-white">
                                        AUDIT
                                    </Button>
                                </div>

                                 <div className="flex items-center justify-between p-3 bg-[#14131c] rounded-lg border border-[#333333]">
                                    <div>
                                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase mb-1">SSP Wallet</p>
                                        <p className={`text-sm font-bold font-orbitron ${walletStatus ? 'text-neon-surge' : 'text-yellow-500'}`}>
                                            {walletStatus ? 'CONNECTED' : 'NOT CONNECTED'}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => appContext.setCurrentPage('Settings')} className="font-orbitron uppercase text-[10px] h-8 border border-[#333] hover:border-white">
                                        SYNC
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[#14131c] rounded-lg border border-[#333333]">
                                    <div>
                                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase mb-1">Discord Handle</p>
                                        <p className="text-sm font-bold text-white flex items-center gap-2 font-jetbrains-mono">
                                            <Icons.Globe className="w-3 h-3 text-[#7289da]" /> {discordHandle}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-warning-high hover:text-red-300 hover:bg-warning-high/10 h-8 px-2 font-orbitron uppercase text-[10px] border border-transparent hover:border-warning-high/30">
                                        DISCONNECT
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-[#0c0c0e]">
                            <h3 className="font-orbitron text-lg text-white mb-4 uppercase">EARNED BADGES</h3>
                            <div className="grid grid-cols-5 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((badge) => (
                                    <div key={badge} className={`aspect-square p-2 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-110 cursor-default ${badge <= 7 ? 'bg-neon-surge/10 text-neon-surge border border-neon-surge/30 shadow-[0_0_10px_rgba(0,255,192,0.15)]' : 'bg-[#1a1a1a] text-[#333] border border-[#333] opacity-50'}`} title={badge <= 7 ? "Badge Earned" : "Badge Locked"}>
                                        <Icons.Shield className="w-5 h-5" />
                                        <span className='text-[8px] font-jetbrains-mono mt-1'>B{badge}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
                
                <div className="text-center text-xs text-[#666] font-jetbrains-mono uppercase space-y-2 mt-12 pb-12">
                    <p>
                        <strong className="text-white">DATA STREAM 7.1 // </strong> ALL INTEL IS LIVE AND VERIFIED BY ZAP GRID PROTOCOL.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
