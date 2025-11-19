
import React from 'react';
import { Icons } from '../components/icons';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';

const GUIDES = [
    {
        title: "Getting Started with Zapway",
        summary: "Welcome to Zapway — your tactical advantage in the merciless war against rigged crypto casinos.",
        content: `Welcome to Zapway — your tactical advantage in the merciless war against rigged crypto casinos. Start by forging your account on our hardened, secure platform. Complete KYC verification swiftly and decisively to unlock full operational access while ensuring compliance. Activate multi-factor authentication (MFA) immediately; security is survival.

Master the dashboard — your command center to monitor live ZAP Scores, edge hunting scans, community veto status, and forensic dispute submissions. Link your blockchain wallet flawlessly for transparent, immutable tracking of your deposits and gameplay.

Leverage real-time analytic weapons at your fingertips. Gather intelligence, evaluate risk, and strike only where the edge is real. Welcome to the frontlines; your hunt begins now.`
    },
    {
        title: "Mastering the ZAP Score",
        summary: "The ZAP Score is your primary battlefield instrument — a 0.0 to 10.0 metric quantifying casino integrity.",
        content: `The ZAP Score is your primary battlefield instrument — a 0.0 to 10.0 metric quantifying casino integrity through relentless data audits, community intel strikes, and regulatory compliance. Watch it fluctuate dynamically: a reflection of operator bloodlines.

High scores? Trustworthy, low-risk arenas where extraction is profitable. Scores dipping below 7.0 mark warning signs—potential traps and exit liquidity. 5.0 or below signals active crime scenes; 0.0 means executed, blacklisted, dead.

Learn to decipher community veto signals — real user-verified proof triggers score freezes and execution orders. Use ZAP Scores with surgical precision to deploy your bankroll only where victory is mathematically assured.`
    },
    {
        title: "Using the Edge Finder Effectively",
        summary: "Edge Finder is your live tactical scanner for crypto gaming +EV opportunities hidden in plain sight.",
        content: `Edge Finder is your live tactical scanner for crypto gaming +EV opportunities. Positive expected value (+EV) means the payout outweighs the odds—a statistical money printer hidden in plain sight.

Dial into the interface to survey top edges across 400+ platforms—volatility indexes, real RTP, bonus toxicity meter—all side by side. Adapt bet sizes in real-time according to volatility to optimize survival and profits.

Track streaks and payout shifts. Avoid toxic bonuses with deadly wagering traps. Execute informed plays that turn the house’s edge into your personal kill zone. This tool pays your dues in pure crypto profit.`
    },
    {
        title: "Responsible Gaming & XAI Monitoring",
        summary: "Zapway’s Explainable AI (XAI) monitors your play patterns against ironclad responsible gaming protocols.",
        content: `Zapway’s Explainable AI (XAI) monitors your play patterns against ironclad responsible gaming protocols. Risk scores analyze wager frequency, session length, and loss rates.

When XAI detects high-risk behavior, it enforces mandatory mitigation: betting caps, loss limits, cooling-off cooldowns, or temporary suspensions. These guardrails protect bankrolls and minds alike.

All XAI decisions are transparent, auditable, and contestable—players retain full rights to appeal. Empower yourself with self-imposed financial limits and access to professional support. Your edge is house, not addiction.`
    },
    {
        title: "Understanding Smart Contract Risks",
        summary: "Zapway operates via autonomous, non-custodial smart contracts — code that executes gameplay transparently on-chain.",
        content: `Zapway operates via autonomous, non-custodial smart contracts — code that executes gameplay, payouts, and rules transparently on-chain. This decentralization eradicates middlemen but carries immutable risks.

Understand that smart contract faults, exploits, or bugs cannot be reversed due to blockchain finality. Keys are your lifeline—guard them zealously against phishing or theft.

Zapway continuously audits contracts for vulnerabilities, but inherent technical uncertainties persist. Playing with knowledge of these perils is part of the degen code; blind trust is the enemy.`
    },
    {
        title: "Navigating Privacy & Data Protection",
        summary: "Protecting your data is non-negotiable in the Zapway war effort. We fully comply with GDPR mandates.",
        content: `Protecting your data is non-negotiable in the Zapway war effort. We fully comply with GDPR and global privacy mandates, collecting only essential personal, behavioral, and technical data to serve and protect you.

You hold expansive rights: access, correction, deletion (when lawful), portability, and objection. Even XAI’s automated decisions are transparently governed and auditable.

For privacy concerns or rights execution, contact our Data Protection Officer without hesitation. Your data sovereignty is a frontline defense.`
    },
    {
        title: "Dispute Resolution & Community Reporting",
        summary: "When the enemy cheats, bring the receipts. Submit immutable evidence via our dispute portal.",
        content: `When the enemy cheats, bring the receipts. Submit immutable evidence—timestamps, blockchain TX IDs, game logs—via our dispute portal. Zapway escalates verified disputes to immediate score freezes and forensic audits.

The swarm’s collective intelligence expedites swift justice—flashing audits, public execution orders, and revenue cuts punish fraudsters. Your validated intel fuels the war machine.

Active contributors earn through the Shared Success Protocol, turning accountability into income. Justice is a weapon, and you are the wielder.`
    }
];

const GuidePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani animate-fadeIn relative overflow-hidden">
            
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-surge to-transparent opacity-70 shadow-[0_0_15px_rgba(0,255,192,0.5)]"></div>

            <div className="container mx-auto max-w-6xl px-4 py-20 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-sm bg-neon-surge/5 mb-8 backdrop-blur-sm">
                        <Icons.BookOpen className="h-4 w-4 text-neon-surge" />
                        <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.3em] font-bold">Field Manuals v2.2 // Classified</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tighter text-white mb-8 leading-none drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        TACTICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-[#00cc99] text-glow">BRIEFINGS</span>
                    </h1>
                    <p className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto font-rajdhani leading-relaxed border-l-2 border-neon-surge/50 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                        Master the protocol. Verification is your weapon. Use these manuals to navigate the Grid, maximize your edge, and secure your assets.
                    </p>
                </div>

                {/* Accordion Grid */}
                <div className="max-w-5xl mx-auto">
                    <Accordion multiple={true} defaultOpen={["guide-0"]}>
                        <div className="flex flex-col gap-8">
                            {GUIDES.map((guide, index) => (
                                <div key={index} className="group relative">
                                    {/* Decorative Side Line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A1A1A] group-hover:bg-neon-surge/50 transition-colors duration-300 rounded-l-lg"></div>
                                    
                                    <AccordionItem value={`guide-${index}`} className="border-none">
                                        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-r-lg overflow-hidden transition-all duration-500 hover:border-neon-surge/40 hover:shadow-[0_0_40px_rgba(0,255,192,0.05)] group-data-[state=open]:border-neon-surge/60 group-data-[state=open]:shadow-[0_0_30px_rgba(0,255,192,0.1)] relative ml-1">
                                            
                                            {/* Scanline Effect on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-neon-surge/0 via-neon-surge/5 to-neon-surge/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform ease-in-out" style={{ transitionDuration: '1.5s' }}></div>

                                            <AccordionTrigger className="w-full hover:bg-[#111] transition-colors duration-300">
                                                <div className="flex items-start gap-6 p-6 md:p-8 w-full text-left relative z-10">
                                                    <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-sm bg-[#121212] items-center justify-center border border-[#2A2A2A] group-hover:border-neon-surge/50 transition-all duration-300 shadow-inner">
                                                        <span className="font-orbitron font-bold text-neon-surge text-xl">
                                                            {(index + 1).toString().padStart(2, '0')}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white uppercase mb-3 group-hover:text-neon-surge transition-colors tracking-wide">
                                                            {guide.title}
                                                        </h3>
                                                        <p className="text-text-tertiary text-sm md:text-base font-rajdhani leading-relaxed group-hover:text-text-secondary transition-colors max-w-3xl">
                                                            {guide.summary}
                                                        </p>
                                                    </div>
                                                    <div className="hidden sm:flex items-center justify-center h-full">
                                                        <Icons.ChevronDown className={`h-6 w-6 text-neon-surge/70 transition-transform duration-300 group-aria-[expanded=true]:rotate-180`} />
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="px-6 pb-8 sm:pl-28 sm:pr-12 relative z-10">
                                                    <div className="p-6 md:p-8 bg-[#080808] border border-[#222] rounded-sm shadow-inner">
                                                        <h4 className="font-jetbrains-mono text-xs text-neon-surge uppercase tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-[#222] pb-4">
                                                            <Icons.Terminal className="h-4 w-4" /> 
                                                            TACTICAL BREAKDOWN
                                                        </h4>
                                                        <div className="text-text-secondary text-base md:text-lg leading-relaxed font-rajdhani whitespace-pre-wrap space-y-4">
                                                            {guide.content.split('\n\n').map((paragraph, idx) => (
                                                                <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                                                            ))}
                                                        </div>
                                                        
                                                        {/* Action Bar */}
                                                        <div className="mt-8 flex items-center justify-end border-t border-[#222] pt-4">
                                                            <button className="text-xs font-orbitron text-neon-surge hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors">
                                                                COPY INTEL <Icons.Share className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </div>
                                    </AccordionItem>
                                </div>
                            ))}
                        </div>
                    </Accordion>
                </div>

                {/* Footer Call to Action */}
                <div className="mt-24 text-center pt-12 border-t border-[#1F1F1F] relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4">
                        <Icons.Zap className="h-8 w-8 text-neon-surge animate-pulse" />
                    </div>
                    <p className="font-jetbrains-mono text-xs text-text-tertiary uppercase tracking-[0.3em] mb-6 opacity-70">
                        INTELLIGENCE ACQUIRED?
                    </p>
                    <h3 className="text-3xl font-orbitron font-black text-white mb-8 uppercase tracking-tight">
                        DEPLOY TO THE <span className="text-neon-surge">ALPHA CHANNEL</span>
                    </h3>
                    <button className="group relative px-10 py-5 bg-transparent border border-neon-surge text-neon-surge font-orbitron font-bold uppercase tracking-[0.2em] rounded-sm overflow-hidden transition-all duration-300 hover:text-black">
                        <span className="absolute inset-0 w-full h-full bg-neon-surge transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative flex items-center gap-3">
                            ACCESS DISCORD GRID <Icons.ArrowRight className="h-5 w-5" />
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default GuidePage;
