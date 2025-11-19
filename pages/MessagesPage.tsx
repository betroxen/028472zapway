
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, onSnapshot, setLogLevel } from 'firebase/firestore';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ConfirmationModal } from '../components/ConfirmationModal';


// FIX: Declare global variables to inform TypeScript that they are injected at runtime.
declare global {
    interface Window {
        __app_id?: string;
        __firebase_config?: string;
        __initial_auth_token?: string;
    }
}

// --- GLOBAL CONSTANTS (MANDATORY CANVAS VARIABLES) ---
const appId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof window.__firebase_config !== 'undefined' ? window.__firebase_config : '{}');
const initialAuthToken = typeof window.__initial_auth_token !== 'undefined' ? window.__initial_auth_token : null;
const API_KEY = ""; // Must be empty string
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

// --- TYPES ---
interface Message {
    id: number;
    sender: 'me' | 'them';
    text: string;
    time: string;
    type?: 'text' | 'system' | 'code';
}

interface Contact {
    id: number;
    name: string;
    status: 'online' | 'offline' | 'busy';
    lastSeen: string;
    lastMessage: string;
    time: string;
    unread: number;
    role: 'AI AGENT' | 'OFFICIAL' | 'SYSTEM';
    avatarIcon: React.ElementType;
}

interface Notification {
    id: number;
    message: string;
    type: 'system' | 'warning' | 'error' | 'success';
    timestamp: string;
}

// --- CHAT DATA ---
const CONTACTS_DATA: Contact[] = [
    {
        id: 1,
        name: "ZAP AGENT",
        status: 'online',
        lastSeen: 'LIVE',
        lastMessage: "Tactical assistance ready.",
        time: "NOW",
        unread: 1,
        role: 'AI AGENT',
        avatarIcon: Icons.Cpu
    },
    {
        id: 2,
        name: "SUPPORT HQ",
        status: 'busy',
        lastSeen: '14M AGO',
        lastMessage: "Ticket #9432 escalated.",
        time: "14m",
        unread: 0,
        role: 'OFFICIAL',
        avatarIcon: Icons.Shield
    },
    {
        id: 3,
        name: "COMPLIANCE BOT",
        status: 'offline',
        lastSeen: '2H AGO',
        lastMessage: "KYC Documents Verified.",
        time: "2h",
        unread: 0,
        role: 'SYSTEM',
        avatarIcon: Icons.FileCheck
    }
];

const INITIAL_ZAP_AGENT_HISTORY: Message[] = [
    {
        id: 1,
        sender: 'them',
        text: "INITIALIZING ZAP AGENT V4.2...\nCONNECTION ESTABLISHED.\n\nGreetings, Operator. I am your tactical intelligence unit. I can assist with odds analysis, VPR verification, and platform navigation. State your directive.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'code'
    }
];

const STATIC_SUPPORT_HISTORY: Message[] = [
    { id: 1, sender: 'them', text: "Operator, we've received your inquiry regarding the delayed withdrawal on Roobet.", time: "10:42 AM", type: 'text' },
    { id: 2, sender: 'me', text: "Yes, txID is 0x492...a12. It's been 4 hours.", time: "10:45 AM", type: 'text' },
    { id: 3, sender: 'them', text: "Tracking now... Confirmed on-chain congestion. We have boosted the gas fee from our relayer. Expect confirmation in <10 mins.", time: "10:50 AM", type: 'text' },
];

// --- COMPONENTS ---

const ThinkingIndicator = () => (
    <div className="flex flex-col items-start animate-fadeIn my-2">
        <div className="flex items-center gap-2 bg-[#0c0c0e] border border-neon-surge/30 px-4 py-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-xs font-jetbrains-mono text-neon-surge">
            <Icons.Loader2 className="w-3 h-3 animate-spin" />
            <span className="animate-pulse">PROCESSING DATA STREAM...</span>
        </div>
    </div>
);

const MessageBubble: React.FC<{ msg: Message }> = ({ msg }) => {
    const isMe = msg.sender === 'me';
    const isCode = msg.type === 'code';

    if (isMe) {
        return (
            <div className="flex flex-col items-end animate-fade-in-up">
                <div className="max-w-[85%] bg-[#0066CC]/20 border border-[#0066CC]/40 text-blue-100 px-4 py-3 rounded-2xl rounded-tr-sm backdrop-blur-sm shadow-[0_0_15px_rgba(0,102,204,0.1)]">
                    <p className="text-sm font-rajdhani font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[9px] font-jetbrains-mono text-blue-400/60 mt-1 uppercase tracking-wider">
                     YOU // {msg.time}
                </span>
            </div>
        );
    }

    // AI / Support Styles
    return (
        <div className="flex flex-col items-start animate-fade-in-up w-full">
             <div className={`max-w-[90%] ${isCode ? 'w-full' : ''}`}>
                <div className={`
                    relative overflow-hidden px-5 py-4 rounded-2xl rounded-tl-none border backdrop-blur-sm shadow-lg
                    ${isCode 
                        ? 'bg-[#050505] border-neon-surge/30 text-neon-surge font-jetbrains-mono text-xs' 
                        : 'bg-[#14131c] border-[#333] text-text-secondary font-rajdhani text-sm'}
                `}>
                     {/* Decor for AI messages */}
                    {isCode && (
                         <div className="absolute top-0 left-0 w-1 h-full bg-neon-surge"></div>
                    )}
                    
                    <div className="leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                    </div>
                </div>
             </div>
            <span className={`text-[9px] font-jetbrains-mono mt-1 uppercase tracking-wider flex items-center gap-2 ${isCode ? 'text-neon-surge/60' : 'text-text-tertiary'}`}>
                {isCode && <Icons.Cpu className="w-3 h-3" />}
                {isCode ? 'AI_CORE' : 'OPERATOR'} // {msg.time}
            </span>
        </div>
    );
};

// --- MAIN PAGE ---

const MessagesPage = () => {
    const [activeContactId, setActiveContactId] = useState<number | null>(1);
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
    const [messageInput, setMessageInput] = useState('');
    const [chatHistory, setChatHistory] = useState<Message[]>(INITIAL_ZAP_AGENT_HISTORY);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Firebase & Persistence
    const [db, setDb] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [saveHistory, setSaveHistory] = useState(true);
    
    // Logs & Modals
    const [systemLogs, setSystemLogs] = useState<Notification[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', body: '', action: () => {} });

    const activeContact = CONTACTS_DATA.find(c => c.id === activeContactId);

    // --- UTILS ---
    const addLog = useCallback((message: string, type: 'system' | 'warning' | 'error' | 'success' = 'system') => {
        setSystemLogs(prev => [{
            id: Date.now(),
            message,
            type,
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        }, ...prev].slice(0, 50));
    }, []);

    const getHistoryRef = useCallback((dbInstance: any, uid: string) => {
        return doc(dbInstance, `artifacts/${appId}/users/${uid}/chat_history/zap_agent_v2`);
    }, []);

    // --- EFFECTS ---

    // 1. Init Firebase
    useEffect(() => {
        const init = async () => {
            if (!Object.keys(firebaseConfig).length) {
                setIsAuthReady(true);
                addLog('PERSISTENCE MODULE NOT FOUND. RUNNING IN LOCAL MODE.', 'warning');
                return;
            }
            try {
                const app = initializeApp(firebaseConfig);
                const dbInstance = getFirestore(app);
                const authInstance = getAuth(app);
                setDb(dbInstance);
                
                await setPersistence(authInstance, browserSessionPersistence);
                if (initialAuthToken) await signInWithCustomToken(authInstance, initialAuthToken);
                else await signInAnonymously(authInstance);

                onAuthStateChanged(authInstance, (user) => {
                    const uid = user?.uid || 'anon';
                    setUserId(uid);
                    setIsAuthReady(true);
                    addLog(`UPLINK ESTABLISHED. ID: ${uid.slice(0,6)}...`, 'success');
                });
            } catch (err) {
                console.error(err);
                setIsAuthReady(true);
                addLog('CRITICAL: FIRELINK CONNECTION FAILED.', 'error');
            }
        };
        init();
    }, [addLog]);

    // 2. Load History
    useEffect(() => {
        if (!db || !userId || !saveHistory || activeContactId !== 1) return;
        const ref = getHistoryRef(db, userId);
        const unsub = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                try {
                    setChatHistory(JSON.parse(snap.data().history));
                    addLog('VPR HISTORY SYNCED.', 'system');
                } catch {
                    addLog('HISTORY CORRUPTION DETECTED.', 'error');
                }
            }
        });
        return () => unsub();
    }, [db, userId, saveHistory, activeContactId, getHistoryRef, addLog]);

    // 3. Auto-Scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isLoading]);

    // --- HANDLERS ---

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || isLoading) return;

        const newMsg: Message = {
            id: Date.now(),
            sender: 'me',
            text: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };

        setChatHistory(prev => {
            const updated = [...prev, newMsg];
            // Save to DB if active
            if (activeContactId === 1 && db && userId && saveHistory) {
                 setDoc(getHistoryRef(db, userId), { 
                     history: JSON.stringify(updated), 
                     lastUpdated: new Date().toISOString() 
                });
            }
            return updated;
        });
        
        setMessageInput('');

        // AI Response Logic
        if (activeContactId === 1) {
            setIsLoading(true);
            try {
                const systemPrompt = "You are ZAP AGENT, a tactical AI for a crypto gaming dashboard. Be concise, robotic but helpful. Use terminology like 'Operator', 'Signal', 'Alpha'. Format responses cleanly.";
                const response = await fetch(GEMINI_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: messageInput }] }],
                        systemInstruction: { parts: [{ text: systemPrompt }] }
                    })
                });
                const data = await response.json();
                const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "SIGNAL INTERFERENCE. RE-TRANSMIT.";
                
                const aiMsg: Message = {
                    id: Date.now() + 1,
                    sender: 'them',
                    text: aiText,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type: 'code'
                };

                setChatHistory(prev => {
                     const updated = [...prev, aiMsg];
                     if (db && userId && saveHistory) {
                         setDoc(getHistoryRef(db, userId), { history: JSON.stringify(updated) });
                     }
                     return updated;
                });
                addLog('AI RESPONSE RECEIVED.', 'success');

            } catch (err) {
                addLog('AI CORE UNREACHABLE.', 'error');
            } finally {
                setIsLoading(false);
            }
        } else {
            // Mock reply for support
            setTimeout(() => {
                 const supportMsg: Message = {
                    id: Date.now() + 1,
                    sender: 'them',
                    text: "Message received, Operator. An agent will review your case shortly.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type: 'text'
                };
                setChatHistory(prev => [...prev, supportMsg]);
            }, 1000);
        }
    };

    const handleContactSelect = (id: number) => {
        setActiveContactId(id);
        setMobileView('chat');
        if (id === 1) {
            // History handled by effect/state persistence logic or reset if no auth
            if (!db) setChatHistory(INITIAL_ZAP_AGENT_HISTORY); 
        } else {
            setChatHistory(STATIC_SUPPORT_HISTORY);
        }
    };

    const handlePurge = () => {
        setModalConfig({
            title: 'PURGE COMM LOGS?',
            body: 'WARNING: This will permanently delete the encrypted history for this channel. This action cannot be undone.',
            action: async () => {
                setChatHistory([INITIAL_ZAP_AGENT_HISTORY[0]]);
                if (db && userId && activeContactId === 1) {
                    await deleteDoc(getHistoryRef(db, userId));
                }
                addLog('COMM LOGS PURGED.', 'warning');
                setIsModalOpen(false);
            }
        });
        setIsModalOpen(true);
    };

    // --- RENDER ---

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col font-rajdhani animate-fadeIn">
            <ConfirmationModal 
                isOpen={isModalOpen}
                title={modalConfig.title}
                body={modalConfig.body}
                onConfirm={modalConfig.action}
                onClose={() => setIsModalOpen(false)}
            />

            {/* HEADER */}
            <div className="flex items-end justify-between mb-4 px-1">
                <div>
                    <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                        <Icons.MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-neon-surge" />
                        TACTICAL COMMS
                    </h1>
                    <p className="text-xs text-text-tertiary font-jetbrains-mono mt-1">
                        <span className="text-neon-surge animate-pulse">●</span> SECURE CHANNEL ENCRYPTED
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <div className="bg-[#0c0c0e] border border-[#333] px-3 py-1 rounded text-[10px] font-jetbrains-mono text-text-secondary">
                        LATENCY: <span className="text-neon-surge">12ms</span>
                    </div>
                </div>
            </div>

            {/* MAIN CONTAINER */}
            <div className="flex flex-1 overflow-hidden rounded-xl border border-[#333] bg-[#050505] shadow-2xl relative">
                
                {/* CONTACTS SIDEBAR */}
                <div className={`absolute inset-0 md:static md:w-72 bg-[#080808] border-r border-[#333] flex flex-col z-20 transition-transform duration-300 ${mobileView === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className="p-4 border-b border-[#333]">
                        <div className="relative">
                            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666] w-3 h-3" />
                            <Input className="h-9 pl-9 text-xs bg-[#0c0c0e] border-[#333] focus:border-neon-surge" placeholder="SEARCH CHANNELS..." />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {CONTACTS_DATA.map(contact => (
                            <button
                                key={contact.id}
                                onClick={() => handleContactSelect(contact.id)}
                                className={`w-full p-4 flex gap-3 items-center border-l-2 transition-all hover:bg-[#0c0c0e] ${activeContactId === contact.id ? 'bg-[#0c0c0e] border-neon-surge' : 'border-transparent'}`}
                            >
                                <div className={`w-10 h-10 rounded bg-[#111] border border-[#333] flex items-center justify-center shrink-0 ${activeContactId === contact.id ? 'border-neon-surge/50 text-neon-surge' : 'text-[#666]'}`}>
                                    <contact.avatarIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <div className="flex justify-between items-center">
                                        <span className={`font-orbitron text-xs font-bold uppercase tracking-wide ${activeContactId === contact.id ? 'text-white' : 'text-[#888]'}`}>
                                            {contact.name}
                                        </span>
                                        <span className="text-[9px] font-jetbrains-mono text-[#555]">{contact.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-[10px] text-[#666] truncate max-w-[80%]">
                                            {contact.status === 'online' ? <span className="text-neon-surge">[SIGNAL ACTIVE]</span> : '[OFFLINE]'}
                                        </span>
                                        {contact.unread > 0 && <div className="w-1.5 h-1.5 rounded-full bg-neon-surge animate-pulse"></div>}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="p-3 border-t border-[#333] bg-[#0a0a0a]">
                        <div className="flex items-center gap-2 text-[10px] font-jetbrains-mono text-[#555]">
                            <Icons.Wifi className="w-3 h-3 text-neon-surge" /> 
                            NET: SECURE
                        </div>
                    </div>
                </div>

                {/* CHAT AREA */}
                <div className={`absolute inset-0 md:static flex-1 flex flex-col bg-[#080808] relative z-10 transition-transform duration-300 ${mobileView === 'chat' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
                    {/* Chat Header */}
                    <div className="h-14 border-b border-[#333] flex items-center justify-between px-4 bg-[#0a0a0a]/95 backdrop-blur shadow-sm">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setMobileView('list')} className="md:hidden text-[#888] hover:text-white">
                                <Icons.ChevronLeft className="w-6 h-6" />
                            </button>
                            {activeContact && (
                                <div>
                                    <h2 className="font-orbitron text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        {activeContact.name}
                                        {activeContact.role === 'AI AGENT' && <Icons.Cpu className="w-3 h-3 text-neon-surge" />}
                                    </h2>
                                    <p className="text-[9px] font-jetbrains-mono text-[#666] uppercase">
                                        STATUS: {activeContact.status} // ID: {activeContact.id}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                             <Button variant="ghost" size="sm" onClick={handlePurge} className="text-[#666] hover:text-warning-high p-1 h-auto">
                                 <Icons.Trash className="w-4 h-4" />
                             </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(0deg,transparent_24%,#222_25%,#222_26%,transparent_27%,transparent_74%,#222_75%,#222_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,#222_25%,#222_26%,transparent_27%,transparent_74%,#222_75%,#222_76%,transparent_77%,transparent)] bg-[size:50px_50px] pointer-events-none"></div>
                        
                        {chatHistory.map(msg => (
                            <MessageBubble key={msg.id} msg={msg} />
                        ))}
                        {isLoading && <ThinkingIndicator />}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-[#0a0a0a] border-t border-[#333]">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <div className="flex-1 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-surge/50 rounded-l"></div>
                                <Input 
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder={activeContactId === 1 ? "ENTER DIRECTIVE..." : "TYPE MESSAGE..."}
                                    className="pl-4 h-12 bg-[#111] border-none focus:ring-1 focus:ring-neon-surge/50 font-jetbrains-mono text-sm text-white rounded-l-none"
                                    disabled={isLoading}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={!messageInput.trim() || isLoading}
                                className="h-12 px-6 bg-neon-surge text-black font-bold font-orbitron tracking-wider hover:bg-white shadow-[0_0_15px_rgba(0,255,192,0.3)]"
                            >
                                SEND <Icons.ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>
                </div>

                {/* RIGHT LOGS (Desktop Only) */}
                <div className="hidden lg:flex w-64 bg-[#050505] border-l border-[#333] flex-col">
                    <div className="p-3 border-b border-[#333] bg-[#0a0a0a]">
                        <h3 className="font-orbitron text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-2">
                            <Icons.Terminal className="w-3 h-3" /> SYSTEM LOGS
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 font-jetbrains-mono text-[9px] custom-scrollbar">
                        {systemLogs.length === 0 && <div className="text-[#444] text-center mt-10 italic">-- NO ACTIVITY --</div>}
                        {systemLogs.map(log => (
                            <div key={log.id} className={`p-2 rounded border ${log.type === 'error' ? 'bg-red-900/10 border-red-900/30 text-red-400' : log.type === 'warning' ? 'bg-yellow-900/10 border-yellow-900/30 text-yellow-400' : log.type === 'success' ? 'bg-green-900/10 border-green-900/30 text-green-400' : 'bg-[#0c0c0e] border-[#222] text-[#888]'}`}>
                                <span className="opacity-50 block mb-0.5">[{log.timestamp}]</span>
                                {log.message}
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-[#333] space-y-2">
                         <div className="flex items-center justify-between text-[10px] font-jetbrains-mono text-[#666]">
                             <span>AUTO-SAVE</span>
                             <span className={`uppercase font-bold ${saveHistory ? 'text-neon-surge' : 'text-red-500'}`}>{saveHistory ? 'ON' : 'OFF'}</span>
                         </div>
                         <div className="flex items-center justify-between text-[10px] font-jetbrains-mono text-[#666]">
                             <span>ENCRYPTION</span>
                             <span className="text-neon-surge font-bold">AES-256</span>
                         </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MessagesPage;
