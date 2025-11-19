
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

const TermsOfServicePage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            {/* Summary Section */}
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                TERMS OF SERVICE: <span className="text-neon-surge">THE ZAPWAY PACT</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Our agreement is built on cryptographic proof, not empty promises. This is the operational framework for every user on the Grid.
            </p>

            <div className="mt-8 mb-10 p-6 md:p-8 bg-gradient-to-br from-foundation-light to-[#0c0c0e] border border-neon-surge/20 rounded-xl space-y-5 font-rajdhani shadow-neon-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Shield className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">THE PACT</h3>
                        <p className="text-sm leading-relaxed">Your use of ZAP is governed by these Terms. By connecting, you agree to our framework of integrity, security, and compliance.</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                         <Icons.User className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">OPERATOR ACCESS</h3>
                         <p className="text-sm leading-relaxed">You must be of legal age in your jurisdiction. You are solely responsible for ensuring your operations on the Grid are lawful.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                     <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Zap className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">UNFAIR ADVANTAGE</h3>
                        <p className="text-sm leading-relaxed">We provide institutional-grade infrastructure built on ZK-Rollups. Trust is obsolete; we rely on cryptographic proof.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-warning-high/10 p-2 rounded-lg shrink-0 border border-warning-high/20">
                        <Icons.AlertTriangle className="h-6 w-6 text-warning-high" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">ZERO TOLERANCE</h3>
                        <p className="text-sm leading-relaxed">Strict ban on manipulation, botting, and fraud. Violations trigger immediate termination and asset forfeiture.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                     <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.TrendingUp className="h-6 w-6 text-neon-surge" />
                    </div>
                     <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">RISK ACKNOWLEDGEMENT</h3>
                        <p className="text-sm leading-relaxed">Digital assets are volatile. You accept the inherent risks of smart contracts and markets. Your capital, your responsibility.</p>
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
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. DEFINITIONS & AGREEMENT</h2>
                            <p>This Agreement governs your use of services provided by ZapWay Corp. LTD, a company incorporated under the laws of Costa Rica ("ZapWay," "We," "Us," "Our"). By accessing, using, or registering for our Services, you ("User," "You") agree to be legally bound by these Terms of Service ("Terms") and any documents referenced herein, including our AML Policy and Responsible Gaming Policy. If you do not agree to these Terms, you must cease all use of the Services immediately.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. ELIGIBILITY & ACCEPTANCE</h2>
                            <p>By accepting these Terms, You affirm that:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li>You are at least eighteen (18) years of age, or the legal age of majority in Your jurisdiction, whichever is higher.</li>
                                <li>You are not restricted by law from using the Services. You are solely responsible for determining the legality of using the Services in your country or jurisdiction.</li>
                                <li>You acknowledge that this action constitutes an electronic signature with the same legal force and effect as a handwritten signature.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. THE ZAPWAY EDGE (SERVICES & TECHNOLOGY)</h2>
                            <p>ZapWay provides a secure, provably fair, and transparent digital gaming platform ("Services"). Our foundation utilizes next-generation blockchain technology, including Layer 2 (L2) ZK-Rollups, Verifiable Random Functions (VRF), and Multi-Party Computation (MPC), to ensure transactional integrity and verifiable randomness for all game outcomes.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. TECHNICAL ACKNOWLEDGMENT & RISK</h2>
                            <p>You accept and agree to the following, recognizing the inherent risks of decentralized systems:</p>
                            <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                                <div>
                                    <h3 className="font-bold text-text-primary">4.1. ZK-Rollup Finality</h3>
                                    <p>You acknowledge and accept that all transactions, wagers, and final game outcomes are recorded and finalized on our Layer 2 ZK-Rollup architecture. The L2 finality is the sole binding and accepted record of all activity.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">4.2. VRF and Determinism</h3>
                                    <p>You accept that all game outcomes are determined by a decentralized Verifiable Random Function (VRF). You agree that the cryptographic proof of fairness provided by the VRF is the only acceptable proof of a non-manipulated outcome.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">4.3. Smart Contract Risk</h3>
                                    <p>Our platform operates via complex, non-custodial smart contracts. You acknowledge and accept the inherent, non-mitigable risks associated with smart contract technology, including potential bugs, exploits, or failures, which may result in irreversible loss of funds. ZapWay bears no liability for losses resulting from smart contract failure.</p>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">5. PROHIBITED CONDUCT & ACCOUNT INTEGRITY</h2>
                            <p>You agree to use the Services only for lawful purposes. Prohibited conduct includes, but is not limited to:</p>
                             <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><span className="font-bold text-text-primary">Manipulation:</span> Any attempt to manipulate, exploit, or bypass the VRF, smart contracts, or underlying cryptographic mechanisms.</li>
                                <li><span className="font-bold text-text-primary">Botting/Automation:</span> Use of automated scripts, bots, or any program designed to interact with the Services without human input.</li>
                                <li><span className="font-bold text-text-primary">Fraud:</span> Any engagement in money laundering, fraud, or other illegal financial activities.</li>
                            </ul>
                            <p className="mt-2 font-bold text-warning-low">Consequence: Any violation of this Section will result in the immediate and permanent termination of your account, forfeiture of all associated funds, and reporting to relevant legal and regulatory authorities.</p>
                        </section>
                         <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">6. FINANCIAL RISK & VOLATILITY</h2>
                             <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                                <div>
                                    <h3 className="font-bold text-text-primary">6.1. Volatility Risk</h3>
                                    <p>The value of digital assets (cryptocurrencies) is highly volatile and subject to extreme market fluctuations. ZapWay is not responsible for any losses arising from the depreciation or fluctuation of digital asset value held or wagered on the platform.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">6.2. Gambling Risk</h3>
                                    <p>You understand and accept that gambling involves a substantial risk of losing funds. ZapWay provides a transparent platform but does not guarantee profit or prevent loss. You access and use the Services at your sole risk.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">6.3. Transaction Accuracy</h3>
                                    <p>You are solely responsible for the accuracy of all blockchain addresses used for deposits and withdrawals. ZapWay is not liable for funds sent to incorrect, non-existent, or non-recoverable addresses.</p>
                                </div>
                            </div>
                        </section>
                         <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">7. INTELLECTUAL PROPERTY</h2>
                            <p>All proprietary technology, code (including ZK-Rollup and VRF implementation), algorithms, software, trademarks, logos, and the "Gamble Smarter, Not Harder" ethos are the exclusive property of ZapWay Corp. LTD or its licensors. Any unauthorized copying, reverse engineering, or use of this intellectual property is strictly prohibited and will result in legal action.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">8. RESPONSIBLE GAMING & XAI CONSENT (MiCA COMPLIANCE)</h2>
                            <p>You acknowledge and provide explicit consent that ZapWay utilizes an Explainable AI (XAI) system to monitor your activity for the purpose of enforcing Responsible Gaming (RG) mandates, in compliance with regulations such as MiCA (Markets in Crypto-Assets Regulation). This system may automatically implement RG interventions, including, but not limited to, setting mandatory wager limits, temporary account suspension, or permanent self-exclusion. Any automated decision is auditable and subject to the appeal process outlined in our Responsible Gaming Policy.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">9. LIMITATION OF LIABILITY</h2>
                            <p className="uppercase">TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZAPWAY, ITS OFFICERS, DIRECTORS, AND EMPLOYEES, SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICES, INCLUDING, WITHOUT LIMITATION, LOSSES DUE TO: SMART CONTRACT FAILURE, VRF MALFUNCTION, HACKING, OR DIGITAL ASSET MARKET VOLATILITY.</p>
                        </section>
                         <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">10. INDEMNIFICATION</h2>
                            <p>You agree to indemnify, defend, and hold harmless ZapWay, its affiliates, directors, agents, and employees from and against any and all claims, liabilities, losses, damages, costs, and expenses (including reasonable legal fees) arising from your use or misuse of the Services, your violation of these Terms, or your infringement of any third-party rights.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">11. GOVERNING LAW & DISPUTE RESOLUTION</h2>
                            <p>This Agreement shall be governed by and construed in accordance with the laws of Costa Rica, without regard to its conflict of law principles.</p>
                            <p className="mt-2"><span className="font-bold text-text-primary">Mandatory Binding Arbitration:</span> Any dispute, controversy, or claim arising out of or relating to this contract, including the breach, termination, or invalidity thereof, shall be settled by binding arbitration administered by a recognized international arbitration body (e.g., ICC). The seat of arbitration shall be San José, Costa Rica. You and ZapWay expressly waive any right to commence or participate in any class action lawsuit or class-wide arbitration against ZapWay related to this Agreement.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">12. CHANGES TO THE TERMS OF SERVICE</h2>
                            <p>ZapWay reserves the right to modify or replace these Terms at any time. We will provide notice of material changes by posting the updated Terms on our platform. Your continued use of the Services after the effective date of any modification constitutes your binding acceptance of the revised Terms.</p>
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

export default TermsOfServicePage;
