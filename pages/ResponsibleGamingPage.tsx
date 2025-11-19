
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

const ResponsibleGamingPage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            {/* Summary Section */}
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                RESPONSIBLE GAMING: <span className="text-neon-surge">PLAYER PROTECTION PROTOCOL</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Directive: Gamble Smarter, Not Harder. We treat player protection as a hard-coded compliance requirement, not an optional feature.
            </p>

            <div className="mt-8 mb-10 p-6 md:p-8 bg-gradient-to-br from-foundation-light to-[#0c0c0e] border border-neon-surge/20 rounded-xl space-y-5 font-rajdhani shadow-neon-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Shield className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">MISSION CRITICAL SAFETY</h3>
                        <p className="text-sm leading-relaxed">Your safety is our priority. Our platform is engineered from the ground up to prevent problem gambling and ensure a sustainable environment.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Cpu className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">PROACTIVE XAI INTERVENTION</h3>
                        <p className="text-sm leading-relaxed">Ethical AI monitors for high-risk patterns. It automatically deploys non-negotiable limits to protect you before problems escalate.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                     <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Settings className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">SELF-IMPOSED CONTROLS</h3>
                        <p className="text-sm leading-relaxed">You have absolute power. Set binding financial limits and time-based restrictions. These are enforced at the smart contract level.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-warning-high/10 p-2 rounded-lg shrink-0 border border-warning-high/20">
                         <Icons.AlertTriangle className="h-6 w-6 text-warning-high" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">STRICTLY 18+</h3>
                        <p className="text-sm leading-relaxed">Zero tolerance for underage access. We enforce rigorous age verification. Violations result in permanent ban and fund forfeiture.</p>
                    </div>
                </div>
            </div>
            
            <div className="text-center">
                <Button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    variant="ghost" 
                    className="h-12 px-8 border border-[#333] hover:border-neon-surge hover:bg-neon-surge/10 font-orbitron uppercase tracking-wider text-sm transition-all duration-300 w-full sm:w-auto"
                >
                    {isExpanded ? 'Hide Full Policy' : 'View Full Policy'}
                    <Icons.ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
            </div>

            {/* Full Policy Section (Collapsible) */}
            <div className={`policy-content-wrapper ${isExpanded ? 'expanded' : ''}`}>
                <div className="policy-content">
                    <div className="mt-12 space-y-8 text-sm leading-relaxed border-t border-[#333] pt-10">
                         <p className="text-text-tertiary text-xs text-center font-jetbrains-mono">Effective Date: 2025-11-13 // v2.0</p>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. OUR COMMITMENT TO ENFORCEMENT</h2>
                            <p>ZapWay is fundamentally committed to preventing problem gambling and ensuring a secure, sustainable environment. This Policy outlines the mandatory tools and interventions designed to enforce responsible play, fully compliant with global best practices and regulations like the MiCA Regulation.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. EXPLAINABLE AI (XAI) MANDATORY INTERVENTION</h2>
                            <p>We leverage a proprietary, risk-calibrated Explainable AI (XAI) system to proactively identify and mitigate high-risk patterns before they become irreversible problems.</p>
                            <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                                <div>
                                    <h3 className="font-bold text-text-primary">2.1. XAI Risk Modeling</h3>
                                    <p>The XAI calculates a dynamic risk score based on:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                        <li>Financial Volatility: Sudden, high-volume deposits followed by large, rapid wagers.</li>
                                        <li>Time & Duration: Excessive session length or frequency suggesting loss of control.</li>
                                        <li>Pattern Deviation: Significant, sustained deviation from the User’s established betting profile.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">2.2. Automated Decisions & Non-Negotiable Interventions</h3>
                                    <p>When the XAI system's risk score is exceeded, mandatory, non-negotiable interventions are automatically executed, often at the smart contract level:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                        <li>Wager/Loss Limits: Immediate, system-imposed caps on betting amounts or net losses.</li>
                                        <li>Required Cooling-Off: Mandatory time-outs (e.g., 24 hours to 30 days) where no further deposits or wagers are possible.</li>
                                        <li>Temporary Account Suspension: Complete freezing of activity until human review.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">2.3. Transparency and Article 22 Rights</h3>
                                    <p>As detailed in our Privacy Policy, every XAI decision is auditable. The User will receive a clear, plain-language explanation of the system's rationale. You have the right to request human intervention and contest the automated decision by initiating the appeal process within 48 hours via our dedicated support channel.</p>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. PLAYER SELF-MANAGEMENT TOOLS</h2>
                            <p>Users have the absolute right to impose binding controls on their own accounts. These limits are technically enforced and cannot be overridden by ZapWay.</p>
                             <div className="mt-4 space-y-3">
                                <div>
                                    <h3 className="font-bold text-text-primary">3.1. Financial Limits</h3>
                                    <p>Users can set daily, weekly, or monthly limits on deposits or losses.</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                        <li><span className="font-bold">Limit Decrease:</span> Any request to decrease a limit is processed and effective instantly.</li>
                                        <li><span className="font-bold">Limit Increase:</span> Any request to increase or remove a limit requires a mandatory, non-waivable seven (7) day waiting period to allow for sober reconsideration.</li>
                                    </ul>
                                </div>
                                <div className="pt-2">
                                    <h3 className="font-bold text-text-primary">3.2. Time-Outs and Self-Exclusion</h3>
                                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                        <li><span className="font-bold">Time-Out Periods:</span> Users can initiate short-term breaks (e.g., 24 hours, 7 days, 30 days). Access to gaming functions is blocked immediately.</li>
                                        <li><span className="font-bold">Binding Self-Exclusion:</span> Users can request a binding self-exclusion for a minimum period of six (6) months up to a permanent exclusion.</li>
                                        <li><span className="font-bold">Irreversibility:</span> Once confirmed, self-exclusion is irreversible for the chosen period.</li>
                                        <li><span className="font-bold">Action:</span> We will take all commercially reasonable steps to block the User from accessing the account, prevent the creation of new accounts, and remove the User from all promotional mailing lists.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. UNDERAGE GAMBLING PREVENTION</h2>
                            <p>We operate a zero-tolerance policy against gambling by minors.</p>
                             <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><span className="font-bold text-text-primary">Enforcement:</span> We utilize robust KYC age verification procedures (as outlined in our AML Policy) to confirm the User is at least 18 or the legal age of majority.</li>
                                <li><span className="font-bold text-text-primary">Consequence:</span> Any attempt to circumvent age verification will result in permanent account closure, immediate forfeiture of all funds, and mandatory reporting.</li>
                            </ul>
                        </section>
                         <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">5. TECHNICAL ENFORCEMENT VIA SMART CONTRACTS</h2>
                            <p>A core principle of ZapWay is that regulatory controls must be technologically enforced.</p>
                            <p className="mt-2"><span className="font-bold text-text-primary">Limits as Code:</span> All User-set or XAI-mandated limits (Section 3) are recorded in the underlying Smart Contract parameters. Once committed, these limits are enforced on-chain and cannot be bypassed by the User, the ZapWay team, or system administrators until the mandated cooldown or wait period expires.</p>
                        </section>
                         <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">6. ACCESS TO PROFESSIONAL SUPPORT</h2>
                            <p>If you feel your gaming activity is becoming unmanageable, we urge you to use the self-exclusion tools and seek professional support immediately.</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><span className="font-bold text-text-primary">Internal Support:</span> Contact our dedicated RG Support Team via [Insert Support Email/Live Chat Link].</li>
                                <li><span className="font-bold text-text-primary">External Resources:</span> We provide clear, prominent links to nationally recognized problem gambling support services in our platform interface.</li>
                            </ul>
                        </section>
                        <div className="border-t border-[#333] pt-6 text-xs text-text-tertiary font-jetbrains-mono">
                            <p className="font-bold">Zapway Corp. LTD</p>
                            <p>Registered Address: San Isidro de El General Costa Rica 11901 San José</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsibleGamingPage;
