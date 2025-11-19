
import React, { useContext, useState } from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { AppContext } from '../context/AppContext';

// --- Types ---
type NotificationType = 'system' | 'warning' | 'error' | 'bonus';

interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

// --- Mock Data ---
const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, type: 'warning', title: 'Volatility Spike', message: 'Market volatility index high. Adjust leverage accordingly.', timestamp: '10m ago', read: false },
    { id: 2, type: 'bonus', title: 'Mission Complete', message: 'Weekly wager target hit. +500 ZP credited to vault.', timestamp: '1h ago', read: false },
    { id: 3, type: 'system', title: 'System Update v4.2', message: 'ZK-Rollup verifier patch deployed successfully.', timestamp: '3h ago', read: true },
    { id: 4, type: 'error', title: 'Network Latency', message: 'Solana congestion detected. Withdrawals may be delayed.', timestamp: '5h ago', read: true },
];

// --- Components ---

const NotificationItem: React.FC<{ note: Notification }> = ({ note }) => {
    const iconMap = {
        system: { icon: Icons.Terminal, color: 'text-neon-surge', border: 'border-neon-surge/20', bg: 'bg-neon-surge/5' },
        warning: { icon: Icons.AlertTriangle, color: 'text-warning-low', border: 'border-warning-low/20', bg: 'bg-warning-low/5' },
        error: { icon: Icons.Activity, color: 'text-warning-high', border: 'border-warning-high/20', bg: 'bg-warning-high/5' },
        bonus: { icon: Icons.Gift, color: 'text-purple-400', border: 'border-purple-400/20', bg: 'bg-purple-400/5' },
    };

    const style = iconMap[note.type];
    const Icon = style.icon;

    return (
        <div className={`flex gap-4 p-4 rounded-lg border ${style.border} ${style.bg} mb-3 transition-all hover:translate-x-1 group relative overflow-hidden`}>
            <div className={`mt-1 shrink-0 ${style.color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 relative z-10">
                <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-xs font-bold uppercase font-orbitron ${style.color} tracking-widest`}>{note.title}</h4>
                    <span className="text-[10px] font-mono text-text-tertiary shrink-0 opacity-70">{note.timestamp}</span>
                </div>
                <p className="text-xs text-text-secondary font-rajdhani leading-relaxed truncate group-hover:whitespace-normal transition-all">{note.message}</p>
            </div>
            {!note.read && <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-neon-surge animate-pulse"></div>}
        </div>
    );
};

const NotificationFeed = () => {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <Card className="h-full flex flex-col bg-[#0A0A0A] border border-[#222] overflow-hidden shadow-2xl group">
            <div className="p-5 border-b border-[#222] bg-[#0F0F0F] flex justify-between items-center relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-neon-surge"></div>
                <div className="flex items-center gap-3">
                    <Icons.Bell className="w-5 h-5 text-neon-surge" />
                    <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest">Live Intel Stream</h3>
                </div>
                <button onClick={markAllRead} className="text-[10px] font-jetbrains-mono text-text-tertiary hover:text-white uppercase border border-[#333] px-2 py-1 rounded hover:border-neon-surge transition-all">
                    [ MARK READ ]
                </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-[#050505]">
                {notifications.map(note => (
                    <NotificationItem key={note.id} note={note} />
                ))}
                 <div className="text-center mt-6 mb-2">
                    <span className="text-[10px] font-jetbrains-mono text-text-tertiary uppercase tracking-widest opacity-30 flex items-center justify-center gap-2">
                         <span className="w-16 h-px bg-[#333]"></span> END OF LOG <span className="w-16 h-px bg-[#333]"></span>
                    </span>
                </div>
            </div>
        </Card>
    );
};

const StatWidget = ({ title, value, subtext, icon: Icon, trend }: { title: string, value: string, subtext?: string, icon: React.ElementType, trend?: 'up' | 'down' | 'neutral' }) => (
    <div className="relative group overflow-hidden p-6 bg-[#0A0A0A] border border-[#222] rounded-xl transition-all duration-300 hover:border-neon-surge/30 hover:shadow-[0_0_30px_rgba(0,255,192,0.05)]">
        {/* Hover Glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl group-hover:bg-neon-surge/10 transition-all duration-500"></div>
        
        <div className="relative z-10 flex justify-between items-start">
            <div>
                <h3 className="text-xs font-jetbrains-mono text-[#666] uppercase tracking-widest mb-2 group-hover:text-[#888] transition-colors">{title}</h3>
                <div className="flex items-baseline gap-2">
                     <span className="text-3xl font-orbitron font-bold text-white tracking-tight group-hover:text-shadow-neon transition-all">{value}</span>
                </div>
                {subtext && (
                    <div className="flex items-center gap-2 mt-2">
                        {trend === 'up' && <Icons.TrendingUp className="w-3 h-3 text-neon-surge" />}
                        <p className={`text-[10px] font-mono ${trend === 'up' ? 'text-neon-surge' : 'text-text-tertiary'}`}>{subtext}</p>
                    </div>
                )}
            </div>
            <div className={`p-3 rounded-lg border border-[#333] bg-[#111] text-[#444] group-hover:text-neon-surge group-hover:border-neon-surge/30 transition-all duration-300`}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
    </div>
);

const ActivityRow = ({ game, wager, payout, time, result }: { game: string, wager: string, payout: string, time: string, result: 'win' | 'loss' }) => (
    <div className="flex items-center justify-between p-4 border-b border-[#222] last:border-0 hover:bg-[#0F0F0F] transition-colors text-sm group cursor-default">
        <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${result === 'win' ? 'bg-neon-surge shadow-[0_0_8px_#00FFC0]' : 'bg-[#333]'}`}></div>
            <span className="font-bold text-white font-orbitron text-xs tracking-widest uppercase">{game}</span>
        </div>
        <div className="font-jetbrains-mono text-text-secondary text-xs tracking-wide">{wager}</div>
        <div className={`font-jetbrains-mono font-bold text-xs tracking-wide ${result === 'win' ? 'text-neon-surge' : 'text-text-tertiary'}`}>{payout}</div>
        <div className="text-[10px] text-[#444] font-jetbrains-mono hidden sm:block">{time}</div>
        <button className="opacity-0 group-hover:opacity-100 text-[9px] text-neon-surge border border-neon-surge/30 px-3 py-1 rounded hover:bg-neon-surge hover:text-black transition-all uppercase font-bold tracking-wider">
            VERIFY
        </button>
    </div>
);

const DashboardPage: React.FC = () => {
    const appContext = useContext(AppContext);

    const user = {
        balanceUSD: "$12,450.50",
        balanceBTC: "0.4200 BTC",
        zapPoints: "4,250",
        zapScore: 92,
        securityLevel: "TIER 3",
    };

    return (
        <div className="animate-fadeIn min-h-screen pb-20 relative font-rajdhani">
            
             {/* Background FX */}
             <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-surge/5 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
             </div>

             <div className="relative z-10 max-w-[1600px] mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6 pt-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-surge/30 bg-neon-surge/5 rounded-full text-neon-surge text-[10px] font-bold font-jetbrains-mono uppercase tracking-widest mb-4 backdrop-blur-sm">
                            <span className="w-2 h-2 bg-neon-surge rounded-full animate-pulse"></span>
                            Command Center Online
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-orbitron text-white uppercase tracking-tight leading-none">
                            Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-white text-glow">Dashboard</span>
                        </h1>
                    </div>
                    <div className="flex gap-2">
                         <div className="px-4 py-2 bg-[#0A0A0A] border border-[#333] rounded-lg text-right">
                             <p className="text-[10px] font-jetbrains-mono text-[#666] uppercase">Network Status</p>
                             <p className="text-xs font-bold text-neon-surge font-orbitron">OPTIMAL</p>
                         </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* --- MAIN COLUMN (8) --- */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* 1. COMMAND STATS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                             <StatWidget 
                                title="Total Balance" 
                                value={user.balanceUSD} 
                                subtext={user.balanceBTC} 
                                icon={Icons.Wallet} 
                                trend="up" 
                            />
                            <StatWidget 
                                title="Zap Points (ZP)" 
                                value={user.zapPoints} 
                                subtext="Next Reward: 5,000 ZP" 
                                icon={Icons.Zap} 
                                trend="up" 
                            />
                            <StatWidget 
                                title="ZAP Score" 
                                value={user.zapScore.toString()} 
                                subtext="Elite Operator Status" 
                                icon={Icons.Shield} 
                                trend="neutral" 
                            />
                        </div>

                        {/* 2. LIVE RTP INTELLIGENCE */}
                        <Card className="bg-[#0A0A0A] border border-[#222] p-0 relative overflow-hidden group shadow-2xl">
                            <div className="p-6 border-b border-[#222] bg-[#0F0F0F] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neon-surge/10 rounded border border-neon-surge/30">
                                        <Icons.Activity className="h-5 w-5 text-neon-surge animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="font-orbitron text-lg font-bold text-white uppercase tracking-wider">Live RTP Intelligence</h3>
                                        <p className="text-[10px] font-jetbrains-mono text-[#666]">REAL-TIME VERIFIED METRICS</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => appContext?.setCurrentPage('Live RTP Tracker')} className="text-xs font-orbitron uppercase tracking-wider border border-[#333] hover:border-white">
                                    View Full Feed &rarr;
                                </Button>
                            </div>
                            
                            <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 bg-[#050505]">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-jetbrains-mono uppercase">
                                        <span className="text-[#888] font-bold">PLINKO</span>
                                        <span className="text-neon-surge font-bold">99.2%</span>
                                    </div>
                                    <ProgressBar progress={99.2} className="h-1.5 bg-[#111]" />
                                    <p className="text-[10px] text-[#444] text-right font-mono flex justify-end gap-2 items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neon-surge"></span> STABLE
                                    </p>
                                </div>
                                 <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-jetbrains-mono uppercase">
                                        <span className="text-[#888] font-bold">MINES</span>
                                        <span className="text-yellow-500 font-bold">98.5%</span>
                                    </div>
                                    <div className="w-full bg-[#111] rounded-full h-1.5">
                                        <div className="bg-yellow-500 h-1.5 rounded-full shadow-[0_0_10px_#FACC15]" style={{ width: '98.5%' }}></div>
                                    </div>
                                    <p className="text-[10px] text-[#444] text-right font-mono flex justify-end gap-2 items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span> VOLATILE
                                    </p>
                                </div>
                                 <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-jetbrains-mono uppercase">
                                        <span className="text-[#888] font-bold">SLOTS</span>
                                        <span className="text-blue-500 font-bold">97.8%</span>
                                    </div>
                                    <div className="w-full bg-[#111] rounded-full h-1.5">
                                        <div className="bg-blue-500 h-1.5 rounded-full shadow-[0_0_10px_#60A5FA]" style={{ width: '97.8%' }}></div>
                                    </div>
                                    <p className="text-[10px] text-[#444] text-right font-mono flex justify-end gap-2 items-center">
                                         <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> COOLING
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* 3. TACTICAL LAUNCHERS */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <button 
                                onClick={() => appContext?.setCurrentPage('Mines Game')}
                                className="group relative h-40 rounded-2xl overflow-hidden border border-[#222] bg-[#0A0A0A] hover:border-neon-surge hover:shadow-[0_0_40px_rgba(0,255,192,0.1)] transition-all duration-500"
                            >
                                 <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black opacity-50 group-hover:opacity-30 transition-opacity"></div>
                                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,192,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] group-hover:animate-[shimmer_3s_infinite]"></div>
                                 
                                 <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                                     <div className="p-4 rounded-full bg-[#111] border border-[#333] group-hover:border-neon-surge group-hover:bg-neon-surge/10 transition-all duration-500 mb-4">
                                         <Icons.Mine className="h-8 w-8 text-white group-hover:text-neon-surge transition-colors" />
                                     </div>
                                     <span className="font-orbitron font-black text-white uppercase tracking-[0.2em] text-sm group-hover:text-neon-surge transition-colors">Deploy Mines</span>
                                     <span className="text-[10px] text-[#666] font-jetbrains-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                         STRATEGIC GRID // PROVABLY FAIR
                                     </span>
                                 </div>
                            </button>
                            
                            <button 
                                 onClick={() => appContext?.setCurrentPage('Plinko Game')}
                                className="group relative h-40 rounded-2xl overflow-hidden border border-[#222] bg-[#0A0A0A] hover:border-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500"
                            >
                                 <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black opacity-50 group-hover:opacity-30 transition-opacity"></div>
                                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] group-hover:animate-[shimmer_3s_infinite]"></div>
                                 
                                 <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                                     <div className="p-4 rounded-full bg-[#111] border border-[#333] group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all duration-500 mb-4">
                                         <Icons.Gem className="h-8 w-8 text-white group-hover:text-purple-500 transition-colors" />
                                     </div>
                                     <span className="font-orbitron font-black text-white uppercase tracking-[0.2em] text-sm group-hover:text-purple-500 transition-colors">Launch Plinko</span>
                                     <span className="text-[10px] text-[#666] font-jetbrains-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                         HIGH VARIANCE // 1000x POTENTIAL
                                     </span>
                                 </div>
                            </button>
                        </div>

                         {/* 4. TACTICAL LOG */}
                         <Card className="bg-[#0A0A0A] border border-[#222] p-0 overflow-hidden shadow-2xl">
                             <div className="p-5 border-b border-[#222] bg-[#0F0F0F] flex justify-between items-center">
                                <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Icons.FileText className="w-4 h-4 text-text-tertiary" /> Tactical Ledger
                                </h3>
                                <span className="text-[10px] font-jetbrains-mono text-[#444] uppercase">LAST 24H ACTIVITY</span>
                            </div>
                            <div>
                                <ActivityRow game="MINES" wager="$50.00" payout="+$124.50" time="2m ago" result="win" />
                                <ActivityRow game="PLINKO" wager="$25.00" payout="-$25.00" time="15m ago" result="loss" />
                                <ActivityRow game="STAKE (Ext)" wager="$100.00" payout="+$210.00" time="1h ago" result="win" />
                                <ActivityRow game="MINES" wager="$10.00" payout="-$10.00" time="3h ago" result="loss" />
                            </div>
                            <div className="p-3 text-center border-t border-[#222] bg-[#050505]">
                                <button className="text-[10px] font-orbitron uppercase text-text-tertiary hover:text-white tracking-widest transition-colors hover:underline decoration-neon-surge">
                                    View Full Transaction History
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* --- SIDEBAR COLUMN (4) --- */}
                    <div className="lg:col-span-4 space-y-8 flex flex-col">
                        
                        {/* 1. NOTIFICATION FEED */}
                        <div className="flex-1 min-h-[400px]">
                            <NotificationFeed />
                        </div>

                        {/* 2. GUARDIAN STATUS */}
                        <Card className="p-6 bg-[#0A0A0A] border border-[#222] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-neon-surge/10 transition-all"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-[#111] border border-[#333] rounded">
                                        <Icons.Shield className="h-5 w-5 text-neon-surge" />
                                    </div>
                                    <h4 className="font-orbitron text-sm font-bold text-white uppercase tracking-wider">XAI Guardian</h4>
                                </div>
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-3xl font-jetbrains-mono font-bold text-white">SAFE</span>
                                    <span className="text-[10px] font-mono text-neon-surge border border-neon-surge/30 px-2 py-1 rounded bg-neon-surge/10">RISK: 12/100</span>
                                </div>
                                <ProgressBar progress={12} className="h-2 mb-4 bg-[#111]" />
                                <p className="text-[11px] text-[#888] leading-relaxed font-rajdhani">
                                    No interventions active. Your play patterns are within the safe tactical range.
                                </p>
                                <Button variant="ghost" size="sm" className="w-full mt-6 border border-[#333] hover:border-neon-surge hover:text-white text-[#666] text-[10px] h-10 uppercase font-orbitron tracking-widest">
                                    Manage Limits
                                </Button>
                            </div>
                        </Card>

                         {/* 3. MISSION CARD */}
                        <div className="rounded-xl p-6 bg-gradient-to-br from-[#1a1a1a] to-black border border-purple-500/30 relative overflow-hidden group cursor-pointer hover:border-purple-500/60 transition-all shadow-2xl">
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_4s_infinite]"></div>
                             <div className="relative z-10">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="bg-purple-500/20 border border-purple-500/50 text-purple-300 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider font-orbitron">Priority Mission</span>
                                    <Icons.Target className="h-5 w-5 text-purple-500" />
                                </div>
                                <h4 className="font-orbitron text-xl font-bold text-white mb-2">PROTOCOL ALPHA</h4>
                                <p className="text-xs text-purple-200/80 mb-6 font-rajdhani leading-relaxed">Verify 5 Plinko seeds to earn the "Auditor" badge + 500 ZP.</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase group-hover:text-white transition-colors font-jetbrains-mono">
                                    Accept Mission <Icons.ArrowRight className="h-3 w-3" />
                                </div>
                             </div>
                        </div>

                    </div>
                </div>
             </div>
        </div>
    );
};

export default DashboardPage;
