
import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Card } from '../components/Card';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { 
    Smartphone, 
    Monitor, 
    CreditCard, 
    CheckCircle2,
    Copy,
    ShieldCheck
} from 'lucide-react';

// --- TYPES ---
interface Session {
    id: string;
    device: string;
    type: 'desktop' | 'mobile';
    location: string;
    ip: string;
    lastActive: string;
    current: boolean;
}

const MOCK_SESSIONS: Session[] = [
    { id: 'sess_01', device: 'Chrome / Windows 11', type: 'desktop', location: 'London, UK', ip: '192.168.1.1', lastActive: 'Now', current: true },
    { id: 'sess_02', device: 'Safari / iPhone 15 Pro', type: 'mobile', location: 'London, UK', ip: '192.168.1.45', lastActive: '2h ago', current: false },
];

// --- COMPONENTS ---

const SettingHeader: React.FC<{ icon: React.ElementType, title: string, subtitle?: string }> = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-start gap-4 mb-6 border-b border-[#333] pb-4">
        <div className="p-3 bg-[#14131c] border border-[#333] rounded-xl shadow-inner">
            <Icon className="h-6 w-6 text-neon-surge" />
        </div>
        <div>
            <h2 className="text-lg font-bold font-orbitron text-white uppercase tracking-wider">{title}</h2>
            {subtitle && <p className="text-xs text-text-tertiary font-jetbrains-mono mt-1">{subtitle}</p>}
        </div>
    </div>
);

const SecurityScoreWidget: React.FC<{ score: number }> = ({ score }) => {
    const color = score >= 90 ? 'text-neon-surge' : score >= 70 ? 'text-yellow-500' : 'text-red-500';
    const strokeColor = score >= 90 ? '#00FFC0' : score >= 70 ? '#EAB308' : '#EF4444';
    
    return (
        <div className="relative flex items-center justify-center w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a1a" strokeWidth="8" />
                <circle 
                    cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * score) / 100}
                    className="transition-all duration-1000 ease-out -rotate-90 origin-center drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-black font-orbitron ${color}`}>{score}</span>
                <span className="text-[9px] font-bold uppercase text-text-tertiary tracking-widest">Score</span>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const appContext = useContext(AppContext);
    const toastContext = useContext(ToastContext);
    
    const showToast = toastContext?.showToast || ((msg: string) => console.log(msg));
    const logout = appContext?.logout || (() => {});
    
    // --- STATE ---
    const [settings, setSettings] = useState({
        theme: 'dark',
        language: 'en',
        oddsFormat: 'decimal',
        mfaEnabled: true,
        geoFencing: true,
        autoLogout: '30m',
        analyticsOptIn: false,
        affiliateTracking: true,
        publicProfile: true,
        emailAlerts: true,
        marketingComms: false,
    });

    const [walletAddress, setWalletAddress] = useState('0x71C...9A21');
    const [isWalletLocked, setIsWalletLocked] = useState(true);
    const [tempWalletInput, setTempWalletInput] = useState(walletAddress);
    
    const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
    
    // Danger Zone Modals
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // --- COMPUTED ---
    const securityScore = useMemo(() => {
        let score = 0;
        if (settings.mfaEnabled) score += 40;
        if (settings.geoFencing) score += 20;
        if (isWalletLocked) score += 20;
        if (!settings.publicProfile) score += 10;
        if (settings.autoLogout !== 'never') score += 10;
        return score;
    }, [settings, isWalletLocked]);

    // --- HANDLERS ---

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => {
            const newVal = !prev[key];
            // Only show toast for security relevant toggles to reduce noise
            if (['mfaEnabled', 'geoFencing', 'publicProfile'].includes(key as string)) {
                showToast(`${String(key).toUpperCase()} set to ${newVal ? 'ACTIVE' : 'INACTIVE'}`, 'info');
            }
            return { ...prev, [key]: newVal };
        });
    };

    const handleSelectChange = (key: keyof typeof settings, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        showToast(`PREFERENCE SYNCED: ${value.toUpperCase()}`, 'success');
    };

    const handleWalletEdit = () => {
        if (isWalletLocked) {
            setIsWalletLocked(false);
            setTempWalletInput(''); 
        } else {
            // Basic Validation
            if (tempWalletInput.length < 10) {
                showToast("INVALID ADDRESS: FORMAT REJECTED", "error");
                return;
            }
            setWalletAddress(tempWalletInput);
            setIsWalletLocked(true);
            showToast("VAULT ADDRESS UPDATED & LOCKED", "success");
        }
    };

    const terminateSession = (id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        showToast("SESSION TERMINATED: CONNECTION SEVERED", "warning");
    };

    const handleDeleteAccount = () => {
        logout();
        showToast("ACCOUNT PURGED. SELF-DESTRUCT COMPLETE.", "error");
    };

    return (
        <div className="animate-fadeIn pb-20 font-rajdhani">
            <ConfirmationModal 
                isOpen={isDeleteModalOpen}
                title="INITIATE SELF-DESTRUCT?"
                body="WARNING: This action is irreversible. All ZP, rank progress, and linked data will be permanently erased from the Grid. There is no recovery protocol."
                onConfirm={handleDeleteAccount}
                onClose={() => setIsDeleteModalOpen(false)}
            />

             {/* Header */}
            <header className="mb-12 border-b border-[#333] pb-8 pt-4 relative">
                <div className="absolute top-0 right-0 hidden md:block">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-neon-surge/30 bg-neon-surge/5 text-neon-surge text-[10px] font-jetbrains-mono">
                        <span className="w-2 h-2 bg-neon-surge rounded-full animate-pulse"></span>
                        SYSTEM INTEGRITY: OPTIMAL
                    </div>
                </div>
                <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                    COMMAND <span className="text-neon-surge text-glow">CONSOLE</span>
                </h1>
                <p className="text-text-secondary font-jetbrains-mono text-sm md:text-base max-w-2xl">
                    // OPERATOR CONFIGURATION: SECURITY, PRIVACY, AND PROTOCOL PREFERENCES.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN - MAIN SETTINGS (8) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* 1. INTERFACE PROTOCOLS */}
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#333]">
                        <SettingHeader icon={Monitor} title="Interface Protocols" subtitle="Visual and Operational Preferences" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-3">Visual Theme</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleSelectChange('theme', 'dark')}
                                        className={`relative p-4 rounded-xl border text-left transition-all overflow-hidden group ${settings.theme === 'dark' ? 'bg-[#050505] border-neon-surge shadow-[0_0_15px_rgba(0,255,192,0.1)]' : 'bg-[#1a1a1a] border-[#333] opacity-60 hover:opacity-100'}`}
                                    >
                                        <div className="w-full h-16 bg-[#111] border border-[#333] rounded mb-3 group-hover:border-neon-surge/30 transition-colors relative">
                                            <div className="absolute top-2 left-2 w-8 h-2 bg-[#333] rounded"></div>
                                            <div className="absolute top-5 left-2 w-16 h-2 bg-[#222] rounded"></div>
                                        </div>
                                        <span className="text-xs font-bold font-orbitron text-white uppercase block">Tactical Dark</span>
                                    </button>
                                    <button 
                                        onClick={() => handleSelectChange('theme', 'light')}
                                        className={`relative p-4 rounded-xl border text-left transition-all overflow-hidden group ${settings.theme === 'light' ? 'bg-white border-white' : 'bg-[#1a1a1a] border-[#333] opacity-60 hover:opacity-100'}`}
                                    >
                                        <div className="w-full h-16 bg-[#f0f0f0] border border-[#ddd] rounded mb-3 relative">
                                            <div className="absolute top-2 left-2 w-8 h-2 bg-[#ddd] rounded"></div>
                                            <div className="absolute top-5 left-2 w-16 h-2 bg-[#eee] rounded"></div>
                                        </div>
                                        <span className={`text-xs font-bold font-orbitron uppercase block ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>Flash Light</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">System Language</label>
                                    <Input 
                                        as="select" 
                                        value={settings.language} 
                                        onChange={(e) => handleSelectChange('language', e.target.value)}
                                        className="h-11 bg-[#080808] border-[#333] focus:border-neon-surge"
                                    >
                                        <option value="en">ENGLISH (US)</option>
                                        <option value="es">ESPAÑOL</option>
                                        <option value="fr">FRANÇAIS</option>
                                        <option value="de">DEUTSCH</option>
                                        <option value="jp">日本語</option>
                                    </Input>
                                </div>
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Odds Display Format</label>
                                    <Input 
                                        as="select" 
                                        value={settings.oddsFormat} 
                                        onChange={(e) => handleSelectChange('oddsFormat', e.target.value)}
                                        className="h-11 bg-[#080808] border-[#333] focus:border-neon-surge"
                                    >
                                        <option value="decimal">DECIMAL (1.50)</option>
                                        <option value="fractional">FRACTIONAL (1/2)</option>
                                        <option value="american">AMERICAN (-200)</option>
                                    </Input>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 2. SECURITY MATRIX */}
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#333]">
                        <SettingHeader icon={ShieldCheck} title="Security Matrix" subtitle="Account Hardening & Access Control" />
                        
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#14131c] p-5 rounded-xl border border-[#333] relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${settings.mfaEnabled ? 'bg-neon-surge' : 'bg-red-500'}`}></div>
                                    <Toggle 
                                        checked={settings.mfaEnabled}
                                        onChange={() => handleToggle('mfaEnabled')}
                                        label={<span className="text-white font-bold text-sm font-orbitron">MFA PROTOCOL</span>}
                                        description={<span className="text-xs text-text-tertiary font-rajdhani">Require 2FA token for logins and high-value transactions.</span>}
                                    />
                                </div>
                                <div className="bg-[#14131c] p-5 rounded-xl border border-[#333] relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${settings.geoFencing ? 'bg-neon-surge' : 'bg-yellow-500'}`}></div>
                                    <Toggle 
                                        checked={settings.geoFencing}
                                        onChange={() => handleToggle('geoFencing')}
                                        label={<span className="text-white font-bold text-sm font-orbitron">GEO-FENCING</span>}
                                        description={<span className="text-xs text-text-tertiary font-rajdhani">Auto-lock account if IP originates from high-risk jurisdictions.</span>}
                                    />
                                </div>
                            </div>

                            {/* Active Sessions */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-xs font-jetbrains-mono text-text-tertiary uppercase">Active Sessions</label>
                                    <button onClick={() => setSessions([])} className="text-[10px] text-red-400 hover:text-white uppercase font-bold tracking-wider transition-colors">
                                        Revoke All Access
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {sessions.map(session => (
                                        <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-[#080808] border border-[#333] group hover:border-neon-surge/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-lg bg-[#14131c] border border-[#333] text-[#666] group-hover:text-white transition-colors`}>
                                                    {session.type === 'mobile' ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white font-bold font-orbitron uppercase tracking-wide">{session.device}</p>
                                                    <p className="text-[10px] text-text-tertiary font-jetbrains-mono flex items-center gap-2 mt-0.5">
                                                        <span className="text-[#444]">|</span> {session.location}
                                                        <span className="text-[#444]">|</span> {session.ip}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${session.current ? 'bg-neon-surge/10 text-neon-surge border border-neon-surge/30' : 'text-[#666]'}`}>
                                                    {session.current ? 'CURRENT' : session.lastActive}
                                                </span>
                                                {!session.current && (
                                                    <button 
                                                        onClick={() => terminateSession(session.id)}
                                                        className="p-2 rounded-md hover:bg-red-900/20 text-[#666] hover:text-red-400 transition-colors"
                                                        title="Kill Session"
                                                    >
                                                        <Icons.LogOut className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* RIGHT COLUMN - SIDEBAR (4) */}
                <div className="lg:col-span-4 space-y-8">
                    
                    {/* 3. IDENTITY & WALLET */}
                    <Card className="p-6 bg-[#0c0c0e] border-[#333]">
                        <div className="mb-6 text-center">
                            <SecurityScoreWidget score={securityScore} />
                            <p className="text-xs text-text-secondary font-rajdhani px-4">
                                Boost your <strong className="text-white">ZAP Score</strong> by enabling MFA and locking your withdrawal address.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Wallet */}
                            <div className="p-4 rounded-xl bg-[#14131c] border border-[#333]">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-xs font-jetbrains-mono text-text-tertiary uppercase flex items-center gap-2">
                                        <CreditCard className="h-3 w-3" /> Primary Vault
                                    </label>
                                    {isWalletLocked ? (
                                        <span className="text-[10px] font-bold text-neon-surge flex items-center gap-1 bg-neon-surge/10 px-2 py-0.5 rounded border border-neon-surge/30">
                                            <Icons.Lock className="h-2.5 w-2.5" /> LOCKED
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold text-yellow-500 flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/30">
                                            <Icons.Edit className="h-2.5 w-2.5" /> EDITING
                                        </span>
                                    )}
                                </div>
                                
                                {isWalletLocked ? (
                                    <div className="flex items-center justify-between bg-[#080808] p-3 rounded border border-[#333]">
                                        <code className="text-sm text-white font-mono tracking-wide">{walletAddress}</code>
                                        <button onClick={() => {navigator.clipboard.writeText(walletAddress); showToast("COPIED", "success")}} className="text-[#666] hover:text-white">
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <Input 
                                        value={tempWalletInput} 
                                        onChange={(e) => setTempWalletInput(e.target.value)}
                                        className="bg-[#080808] text-sm font-mono border-yellow-500 focus:border-yellow-500"
                                        placeholder="0x..."
                                    />
                                )}

                                <Button 
                                    onClick={handleWalletEdit}
                                    variant="ghost" 
                                    className={`w-full mt-3 text-xs uppercase font-bold tracking-widest h-9 border ${isWalletLocked ? 'border-[#333] text-text-tertiary hover:text-white' : 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black'}`}
                                >
                                    {isWalletLocked ? 'UNLOCK TO EDIT' : 'SAVE & LOCK ADDRESS'}
                                </Button>
                            </div>

                            {/* Privacy Toggles */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white font-orbitron uppercase">Public Profile</span>
                                    <Toggle 
                                        checked={settings.publicProfile} 
                                        onChange={() => handleToggle('publicProfile')} 
                                        label=""
                                        description=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white font-orbitron uppercase">Affiliate Tracking</span>
                                    <Toggle 
                                        checked={settings.affiliateTracking} 
                                        onChange={() => handleToggle('affiliateTracking')} 
                                        label=""
                                        description=""
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 4. DANGER ZONE */}
                    <div className="rounded-xl border border-red-900/30 bg-red-950/5 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Icons.AlertTriangle className="h-5 w-5 text-red-500" />
                            <h3 className="font-orbitron font-bold text-red-500 text-sm uppercase tracking-wider">Danger Zone</h3>
                        </div>
                        <p className="text-xs text-red-200/60 font-rajdhani mb-6 leading-relaxed">
                            Irreversible actions. Proceed with extreme caution. Account deletion purges all ZP, badges, and history.
                        </p>
                        <button 
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="w-full py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all duration-300"
                        >
                            Initiate Self-Destruct
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
