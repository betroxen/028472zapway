
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

const CommercialDisclosurePage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            {/* Summary Section */}
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                COMMERCIAL DISCLOSURE: <span className="text-neon-surge">TRANSPARENCY MANDATE</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Directive: Integrity is the Code. Financial relationships must be as transparent as our ZK-Rollup finality.
            </p>

            <div className="mt-8 mb-10 p-6 md:p-8 bg-gradient-to-br from-foundation-light to-[#0c0c0e] border border-neon-surge/20 rounded-xl space-y-5 font-rajdhani shadow-neon-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Verified className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">INTEGRITY FIRST</h3>
                        <p className="text-sm leading-relaxed">We may earn commissions, but our mathematical integrity, data, and review scores are never for sale. We get paid, but we don't cheat.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                         <Icons.Link className="h-6 w-6 text-neon-surge" />
                    </div>
                     <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">TRANSPARENT PARTNERSHIPS</h3>
                        <p className="text-sm leading-relaxed">Affiliate links and featured placements are compensated. This funds our protocol development at zero cost to you.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                         <Icons.FileCheck className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">CLEAR RESPONSIBILITY</h3>
                        <p className="text-sm leading-relaxed">ZAP guarantees the code's fairness. Partners are responsible for their platform's operations and support.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                     <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.dollarSign className="h-6 w-6 text-neon-surge" />
                    </div>
                     <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">NO FINANCIAL ADVICE</h3>
                        <p className="text-sm leading-relaxed">We provide high-signal data, not investment counsel. You are solely responsible for managing crypto volatility risks.</p>
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
                        <p className="text-text-tertiary text-xs text-center font-jetbrains-mono">Effective Date: 2025-11-13</p>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. OUR CORE PRINCIPLE: MATH IS NON-NEGOTIABLE</h2>
                            <p>ZapWay Corp. LTD. ("ZapWay," "We") builds infrastructure for the future of gaming. We are paid by our partners, but no commercial relationship—past, present, or future—will ever compromise the mathematical integrity of our Provably Fair protocols, our VRF-based RNG, or the L2 ZK-Rollup finality that guarantees your outcome. We get paid, but we don't cheat.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. AFFILIATE AND COMPENSATION DISCLOSURE</h2>
                            <p>ZapWay operates through commercial partnerships and affiliate relationships. This section details how those relationships work and how they fund our operation:</p>
                             <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                                <div>
                                    <h3 className="font-bold text-text-primary">2.1. Affiliate Linking and Compensation</h3>
                                     <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li><strong className="text-text-primary">What is an Affiliate Link?</strong> When you click a link on our website or within our platform directing you to a third-party casino, service provider, or data provider (a "Partner"), we may track that click. If you then register an account or conduct a transaction with that Partner, ZapWay may receive a commission or fee.</li>
                                        <li><strong className="text-text-primary">Zero Cost to You:</strong> Crucially, this compensation is paid by the Partner and does not result in any additional cost, markup, or reduction in odds/payouts for the User. Your terms of play are entirely governed by the Partner and our Provably Fair contract.</li>
                                        <li><strong className="text-text-primary">Payment for Visibility:</strong> We may receive compensation for featuring Partners, placing them in specific review rankings, or running dedicated advertising campaigns on our platform.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">2.2. Advertising and Review Integrity</h3>
                                     <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li><strong className="text-text-primary">Commercial Influence:</strong> Featured rankings, banners, and promotional content on ZapWay are often paid placements. We reserve the right to accept compensation for promotional material.</li>
                                        <li><strong className="text-text-primary">Editorial Independence:</strong> While a Partner may pay for placement, all technical analysis, performance data, and integrity audits related to their use of ZapWay's VRF or ZK-Rollup infrastructure remain objective and uncompromised. We report on the math, not the marketing.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. DISTINCTION BETWEEN CORE INFRASTRUCTURE AND PARTNERS</h2>
                            <p>It is essential that Users understand the distinction between the service ZapWay provides and the services provided by our Partners:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><strong className="text-text-primary">ZapWay's Responsibility (The Code):</strong> We are responsible for the integrity, fairness, and verifiability of the Provably Fair algorithms, the security of the MPC Custody system, and the compliance of our XAI Responsible Gaming interventions.</li>
                                <li><strong className="text-text-primary">Partner's Responsibility (The Game):</strong> Our Partners (casinos, exchanges, etc.) are solely responsible for game design, user experience, bonuses, payout processing, KYC/AML obligations (unless utilizing a ZapWay service), and general operational risk. ZapWay is not liable for Partner disputes outside of verifiable game outcome failures.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. FINANCIAL AND INVESTMENT DISCLAIMER</h2>
                            <p>ZapWay is not a financial advisor, broker, or investment entity. We are a technology service provider focused on game integrity.</p>
                             <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><strong className="text-text-primary">Crypto Risk:</strong> Digital assets are highly volatile and inherently risky. Any information provided by ZapWay regarding the crypto market, including asset movements or market analysis, is for informational purposes only. You are solely responsible for any loss or gain associated with cryptocurrency value fluctuations.</li>
                                <li><strong className="text-text-primary">No Investment Advice:</strong> Nothing on this site constitutes investment, financial, tax, or legal advice. Consult a professional advisor before making any financial decisions.</li>
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

export default CommercialDisclosurePage;
