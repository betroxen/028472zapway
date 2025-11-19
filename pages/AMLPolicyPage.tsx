
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

const AMLPolicyPage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
             {/* Summary Section */}
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                AML & CTF POLICY: <span className="text-neon-surge">INSTITUTIONAL RESILIENCE</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Mandate: Zero-Tolerance for Illicit Funds. We are a fortress against financial crime, not a gateway.
            </p>

            <div className="mt-8 mb-10 p-6 md:p-8 bg-gradient-to-br from-foundation-light to-[#0c0c0e] border border-neon-surge/20 rounded-xl space-y-5 font-rajdhani shadow-neon-card relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.Shield className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">INSTITUTIONAL SECURITY</h3>
                        <p className="text-sm leading-relaxed">Zero-tolerance for money laundering. We adhere to the highest global standards (FATF, VASP) to protect the integrity of the Grid.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.User className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                         <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">RIGOROUS VERIFICATION</h3>
                        <p className="text-sm leading-relaxed">Mandatory, risk-based Know Your Customer (KYC) and Customer Due Diligence (CDD). We verify every operator.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4 relative z-10">
                     <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                        <Icons.BarChart className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">CONTINUOUS MONITORING</h3>
                        <p className="text-sm leading-relaxed">Blockchain analytics continuously screen for suspicious activity. Mixers, darknet sources, and sanctioned wallets are blocked.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-neon-surge/10 p-2 rounded-lg shrink-0">
                         <Icons.Lock className="h-6 w-6 text-neon-surge" />
                    </div>
                    <div>
                        <h3 className="text-white font-orbitron font-bold uppercase text-sm mb-1">SANCTIONS COMPLIANCE</h3>
                        <p className="text-sm leading-relaxed">Real-time screening against international sanctions lists (OFAC, UN, EU). Any match triggers immediate freeze and reporting.</p>
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
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. INTRODUCTION, SCOPE, AND COMPLIANCE GOAL</h2>
                            <p>This Policy outlines ZapWay Corp. LTD.'s commitment to preventing the use of its Services for money laundering (AML), terrorist financing (CTF), or any form of illegal financial activity. This policy is binding on all personnel and all Users. Our primary compliance framework is guided by the Financial Action Task Force (FATF) Recommendations, VASP requirements (e.g., Curaçao LOK framework), and relevant international financial sanctions.</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. AML COMPLIANCE OFFICER (AMLCO)</h2>
                            <p><strong className="text-text-primary">Responsibilities:</strong> The AMLCO is responsible for the overall implementation, enforcement, and continuous review of this Policy. This includes overseeing the integration of blockchain analytics, training personnel, and serving as the mandated liaison with the relevant Financial Intelligence Unit (FIU) and regulatory bodies in our jurisdiction (Costa Rica).</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. KNOW YOUR CUSTOMER (KYC) AND CDD</h2>
                            <p>We apply a strict, risk-based approach (RBA) to Customer Due Diligence (CDD). No pseudonymity is tolerated when statutory thresholds are met.</p>
                            <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                                <div>
                                    <h3 className="font-bold text-text-primary">3.1. Standard Customer Due Diligence (CDD)</h3>
                                    <p>All Users must provide verifiable data based on regulatory risk-thresholds. This includes:</p>
                                     <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li><strong className="text-text-primary">Identity:</strong> Acceptance of current, government-issued photographic identification (e.g., passport, national ID).</li>
                                        <li><strong className="text-text-primary">Proof of Address:</strong> Valid document verifying residential address.</li>
                                        <li><strong className="text-text-primary">Non-Custodial Wallet Acknowledgement:</strong> Explicit User acknowledgment that the public wallet address used to interact with the ZK-Rollup is controlled solely by them.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">3.2. Enhanced Due Diligence (EDD) Triggers</h3>
                                    <p>EDD is initiated for Users or transactions categorized as high-risk, including:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>High-Value Activity: Cumulative transactions exceeding pre-set regulatory thresholds.</li>
                                        <li>High-Risk Jurisdictions: Users operating from or transferring assets to/from high-risk FATF-monitored jurisdictions.</li>
                                        <li>PEPs (Politically Exposed Persons): Mandatory EDD for any User identified as a PEP or associated with a PEP.</li>
                                        <li>Blockchain Clustering: Any deposits originating from or routed through known Mixing Services, Sanctioned Wallets, or Darknet Market cluster addresses.</li>
                                    </ul>
                                    <p className="mt-2">During EDD, we may require verification of the Source of Funds (SOF) and Source of Wealth (SOW).</p>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. TRANSACTION MONITORING (KYT) AND ZK-ROLLUP INTEGRITY</h2>
                             <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                                <div>
                                    <h3 className="font-bold text-text-primary">4.1. Monitoring Criteria</h3>
                                    <p>The KYT system continuously screens for deviations from expected User behavior and financial indicators, including:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Velocity and Volume: Unusual transaction velocity, rapid or large deposits followed by immediate withdrawals (dusting/layering indicators).</li>
                                        <li>Origin Risk: Automated screening of all incoming wallet addresses against recognized risk databases (sanction lists, high-risk entity flags).</li>
                                        <li>Internal Red Flags: Irregular patterns of wagers, attempts to fund multiple accounts from a single source, or attempts to abuse the withdrawal mechanism.</li>
                                        <li>L2 Integrity: Monitoring the L2 finality logs for impossible transactions or deviations that indicate internal or external compromise attempts.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">4.2. Automated Flagging and Investigation</h3>
                                    <p>Automated systems flag transactions that violate pre-determined thresholds. All flags generate a case file that requires mandatory, documented review by the AMLCO or designated compliance staff.</p>
                                </div>
                            </div>
                        </section>
                         <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">5. SANCTIONS AND PROHIBITED JURISDICTIONS</h2>
                            <p>ZapWay enforces a zero-tolerance policy against international sanctions.</p>
                             <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><strong className="text-text-primary">Screening Mandate:</strong> All User data and associated public wallet addresses are screened against international sanctions lists (OFAC, UN, EU, etc.) upon onboarding and continuously thereafter.</li>
                                <li><strong className="text-text-primary">Action:</strong> Any positive match results in the immediate freezing of the account, prohibition of Services access, and mandatory reporting to relevant authorities. Use of the Services from explicitly Prohibited Jurisdictions is technically blocked where feasible.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">6. MPC CUSTODY AND CORPORATE GOVERNANCE</h2>
                            <p>Our use of Multi-Party Computation (MPC) custody for corporate treasuries is a core AML control. MPC ensures that:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><strong className="text-text-primary">Auditable Governance:</strong> All movements of corporate funds are subject to multi-signature authorization thresholds and generate immutable, auditable logs.</li>
                                <li><strong className="text-text-primary">Anti-Collusion:</strong> No single officer or key holder can initiate or authorize a transaction, significantly reducing the risk of internal collusion or single-point-of-failure fraud, thereby enhancing compliance with VASP governance standards.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">7. SUSPICIOUS ACTIVITY REPORTING (SAR)</h2>
                            <p>The AMLCO is solely responsible for investigating flagged activity and, where appropriate, filing a Suspicious Activity Report (SAR) with the relevant Financial Intelligence Unit (FIU) in a timely and confidential manner. Under no circumstances will a User be notified that a SAR has been filed or that their activity is under suspicion (Tipping Off Prohibition).</p>
                        </section>
                        <section>
                            <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">8. RECORD KEEPING AND IMMUTABILITY</h2>
                             <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                                <li><strong className="text-text-primary">Retention Period:</strong> Customer identification, transaction records, CDD/EDD documentation, and internal compliance reports (including SARs) are maintained for a minimum of five (5) years following the termination of the business relationship.</li>
                                <li><strong className="text-text-primary">Blockchain Data:</strong> As detailed in our Privacy Policy, data recorded on the L2 ZK-Rollup ledger is immutable and will persist indefinitely. This immutability serves as a permanent, verifiable audit trail for all transactional activity.</li>
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

export default AMLPolicyPage;
