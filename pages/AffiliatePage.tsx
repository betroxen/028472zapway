
import React, { useState, useEffect } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Toggle } from '../components/Toggle';

// --- TYPES & DATA ---

type PartnerRole = 'OPERATOR' | 'CREATOR';
type FormStep = 1 | 2 | 3;

const CODE_OF_CONDUCT = [
    { title: "1. Integrity & Transparency", text: "Partners shall engage with honesty, providing truthful and accurate information. No false claims about ZapWay capabilities or incentives." },
    { title: "2. Compliance with Laws", text: "Must comply with all AML/KYC obligations and jurisdictional restrictions. Required licensing must be kept current." },
    { title: "3. Responsible Marketing", text: "No spam, cookie stuffing, or deceptive user acquisition. Promotions must be clear, fair, and compliant with FTC/regulatory guidelines." },
    { title: "4. Confidentiality & Data", text: "Protect confidential info. Respect user privacy and process data strictly according to GDPR/Privacy policies." },
    { title: "5. Conflict of Interest", text: "Disclose conflicts promptly. Collaboration with fraudulent entities is prohibited. Compete ethically." },
    { title: "6. Reporting & Accountability", text: "Submit truthful reports. Report misconduct immediately. Violation results in termination and fund forfeiture." },
    { title: "7. Ongoing Engagement", text: "Commit to active communication. Respect community guidelines and uphold the mission of integrity-driven gaming." }
];

const REWARD_TIERS = [
    { 
        name: 'RECRUIT', 
        req: '< $10k Vol', 
        share: '25% RevShare', 
        perks: ['Standard Tracking', 'Monthly Payouts', 'Basic Assets'] 
    },
    { 
        name: 'VANGUARD', 
        req: '$50k+ Vol', 
        share: '35% RevShare', 
        perks: ['+ CPA Bonuses', 'Weekly Payouts', 'Dedicated Account Mgr', 'NFT Badge'] 
    },
    { 
        name: 'LEGEND', 
        req: '$250k+ Vol', 
        share: '45% + Equity', 
        perks: ['Custom Hybrid Deals', 'Instant Crypto Settle', 'Executive Access', 'Whitelabel Tools'] 
    }
];

// --- COMPONENTS ---

const RoleSelector = ({ active, onSelect }: { active: PartnerRole, onSelect: (r: PartnerRole) => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <button 
            onClick={() => onSelect('OPERATOR')}
            className={`relative p-6 rounded-xl border-2 text-left transition-all duration-300 group overflow-hidden ${active === 'OPERATOR' ? 'bg-[#14131c] border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-[#0c0c0e] border-[#333] hover:border-blue-500/50'}`}
        >
            <div className={`absolute top-0 right-0 p-2 rounded-bl-lg bg-blue-900/30 border-l border-b border-blue-500/30 text-[10px] font-jetbrains-mono uppercase ${active === 'OPERATOR' ? 'text-blue-400' : 'text-gray-500'}`}>
                TYPE: PLATFORM
            </div>
            <Icons.Cpu className={`h-10 w-10 mb-4 ${active === 'OPERATOR' ? 'text-blue-500' : 'text-gray-600'}`} />
            <h3 className={`font-orbitron text-xl font-bold uppercase mb-2 ${active === 'OPERATOR' ? 'text-white' : 'text-gray-400'}`}>Protocol Operator</h3>
            <p className="text-xs font-rajdhani text-text-secondary leading-relaxed">
                For Casinos, Betting Platforms, and DApps seeking institutional vetting and high-value player liquidity.
            </p>
        </button>

        <button 
            onClick={() => onSelect('CREATOR')}
            className={`relative p-6 rounded-xl border-2 text-left transition-all duration-300 group overflow-hidden ${active === 'CREATOR' ? 'bg-[#14131c] border-neon-surge shadow-[0_0_30px_rgba(0,255,192,0.2)]' : 'bg-[#0c0c0e] border-[#333] hover:border-neon-surge/50'}`}
        >
            <div className={`absolute top-0 right-0 p-2 rounded-bl-lg bg-neon-surge/10 border-l border-b border-neon-surge/30 text-[10px] font-jetbrains-mono uppercase ${active === 'CREATOR' ? 'text-neon-surge' : 'text-gray-500'}`}>
                TYPE: AMPLIFIER
            </div>
            <Icons.Share className={`h-10 w-10 mb-4 ${active === 'CREATOR' ? 'text-neon-surge' : 'text-gray-600'}`} />
            <h3 className={`font-orbitron text-xl font-bold uppercase mb-2 ${active === 'CREATOR' ? 'text-white' : 'text-gray-400'}`}>Signal Relay</h3>
            <p className="text-xs font-rajdhani text-text-secondary leading-relaxed">
                For Affiliates, Streamers, and Content Creators verifying the ecosystem and monetizing their audience trust.
            </p>
        </button>
    </div>
);

const IntakeTerminal = ({ role }: { role: PartnerRole }) => {
    const [step, setStep] = useState<FormStep>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        entityName: '',
        website: '',
        contactEmail: '',
        trafficSource: '',
        monthlyVol: '',
        license: '', // Operator only
        codeOfConduct: false,
        amlCheck: false,
    });

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsComplete(true);
        }, 2000);
    };

    if (isComplete) {
        return (
            <div className="bg-[#0c0c0e] border border-neon-surge/50 rounded-xl p-12 text-center animate-fade-in-up shadow-2xl">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-surge/10 border border-neon-surge mb-6">
                    <Icons.CheckCircle className="h-10 w-10 text-neon-surge" />
                </div>
                <h3 className="font-orbitron text-2xl text-white uppercase mb-4">SIGNAL RECEIVED</h3>
                <p className="text-text-secondary font-rajdhani mb-8 max-w-md mx-auto">
                    Your application has been encrypted and queued for manual vetting. Our compliance officers will initiate the handshake protocol via email within 48 hours.
                </p>
                <div className="p-4 bg-[#111] border border-[#333] rounded-lg max-w-sm mx-auto text-xs font-jetbrains-mono text-text-tertiary">
                    REF ID: <span className="text-neon-surge">ZAP-{Math.floor(Math.random() * 10000)}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#14131c] border border-[#333] rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-[#0c0c0e] p-4 border-b border-[#333] flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Icons.Terminal className="h-5 w-5 text-neon-surge" />
                    <span className="font-orbitron text-sm text-white uppercase tracking-widest">PARTNERSHIP INITIALIZATION</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${step >= i ? 'bg-neon-surge' : 'bg-[#333]'}`} />
                    ))}
                </div>
            </div>

            <div className="p-8">
                {/* Step 1: Identity */}
                {step === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                        <h3 className="font-orbitron text-lg text-white uppercase mb-6 border-b border-[#333] pb-2">
                            STEP 1: {role === 'OPERATOR' ? 'ENTITY IDENTIFICATION' : 'SOURCE VERIFICATION'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">
                                    {role === 'OPERATOR' ? 'Legal Entity Name' : 'Channel / Brand Name'}
                                </label>
                                <Input 
                                    value={formData.entityName}
                                    onChange={e => setFormData({...formData, entityName: e.target.value})}
                                    placeholder={role === 'OPERATOR' ? "e.g. ZapWay Corp LTD" : "e.g. CryptoKing TV"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">
                                    Primary URL
                                </label>
                                <Input 
                                    value={formData.website}
                                    onChange={e => setFormData({...formData, website: e.target.value})}
                                    placeholder="https://..."
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">
                                    Secure Contact Email
                                </label>
                                <Input 
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                                    placeholder="partners@domain.com"
                                />
                            </div>
                            {role === 'OPERATOR' ? (
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">
                                        Gaming License Number
                                    </label>
                                    <Input 
                                        value={formData.license}
                                        onChange={e => setFormData({...formData, license: e.target.value})}
                                        placeholder="e.g. Curaçao 365/JAZ"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">
                                        Primary Traffic Source
                                    </label>
                                    <Input 
                                        as="select"
                                        value={formData.trafficSource}
                                        onChange={e => setFormData({...formData, trafficSource: e.target.value})}
                                    >
                                        <option value="">SELECT SOURCE...</option>
                                        <option value="SEO">SEO / Organic</option>
                                        <option value="SOCIAL">Social Media (X, YT, Twitch)</option>
                                        <option value="EMAIL">Email / Newsletter</option>
                                        <option value="PAID">Paid Media</option>
                                    </Input>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button onClick={() => setStep(2)} disabled={!formData.entityName || !formData.contactEmail}>
                                NEXT: VOLUME METRICS &rarr;
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Metrics */}
                {step === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                         <h3 className="font-orbitron text-lg text-white uppercase mb-6 border-b border-[#333] pb-2">
                            STEP 2: {role === 'OPERATOR' ? 'LIQUIDITY & VOLUME' : 'AUDIENCE & REACH'}
                        </h3>
                        
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">
                                {role === 'OPERATOR' ? 'Monthly GGR (Gross Gaming Revenue)' : 'Monthly Active Users / Views'}
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['< $10k', '$10k - $50k', '$50k - $250k', '$250k+'].map((vol) => (
                                    <button
                                        key={vol}
                                        onClick={() => setFormData({...formData, monthlyVol: vol})}
                                        className={`p-3 rounded-lg border text-xs font-bold font-orbitron uppercase transition-all ${formData.monthlyVol === vol ? 'bg-neon-surge text-black border-neon-surge' : 'bg-[#0c0c0e] text-text-tertiary border-[#333] hover:border-white'}`}
                                    >
                                        {vol}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-900/10 border border-blue-500/30 p-4 rounded-lg flex gap-3 items-start">
                            <Icons.Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-200 font-rajdhani leading-relaxed">
                                <strong className="block uppercase mb-1 font-orbitron text-blue-400">VETTING PROTOCOL</strong>
                                ZapWay does not offer "pay-to-play" listings. All applicants undergo a rigorous manual review of their reputation, solvency, and technical stack. Low-quality applications will be rejected without appeal.
                            </p>
                        </div>

                         <div className="flex justify-between mt-6">
                            <Button variant="ghost" onClick={() => setStep(1)}>BACK</Button>
                            <Button onClick={() => setStep(3)} disabled={!formData.monthlyVol}>
                                NEXT: COMPLIANCE CHECK &rarr;
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Code of Conduct */}
                {step === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                        <h3 className="font-orbitron text-lg text-white uppercase mb-6 border-b border-[#333] pb-2">
                            STEP 3: BINDING CODE OF CONDUCT
                        </h3>

                        <div className="bg-[#050505] border border-[#333] rounded-lg h-64 overflow-y-auto custom-scrollbar p-4 space-y-4">
                            {CODE_OF_CONDUCT.map((rule, i) => (
                                <div key={i}>
                                    <h4 className="text-neon-surge text-xs font-bold font-orbitron uppercase mb-1">{rule.title}</h4>
                                    <p className="text-text-secondary text-xs font-rajdhani">{rule.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4">
                             <label className="flex items-start gap-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 accent-neon-surge"
                                    checked={formData.codeOfConduct}
                                    onChange={(e) => setFormData({...formData, codeOfConduct: e.target.checked})}
                                />
                                <div className="text-xs text-text-tertiary leading-relaxed">
                                    <strong className="text-white block mb-0.5 font-orbitron uppercase">I ACCEPT THE CODE OF CONDUCT</strong>
                                    I understand that violation of these standards results in immediate termination and forfeiture of rewards.
                                </div>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 accent-neon-surge"
                                    checked={formData.amlCheck}
                                    onChange={(e) => setFormData({...formData, amlCheck: e.target.checked})}
                                />
                                <div className="text-xs text-text-tertiary leading-relaxed">
                                    <strong className="text-white block mb-0.5 font-orbitron uppercase">COMPLIANCE ATTESTATION</strong>
                                    I confirm my operations adhere to all applicable AML/KYC laws and I am not located in a sanctioned jurisdiction.
                                </div>
                            </label>
                        </div>

                        <div className="flex justify-between mt-6">
                            <Button variant="ghost" onClick={() => setStep(2)} disabled={isSubmitting}>BACK</Button>
                            <Button 
                                onClick={handleSubmit} 
                                loading={isSubmitting}
                                disabled={!formData.codeOfConduct || !formData.amlCheck}
                                className="shadow-neon-glow-md px-8 uppercase tracking-widest font-bold"
                            >
                                {isSubmitting ? 'ENCRYPTING...' : 'SIGN & TRANSMIT'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AffiliatePage: React.FC = () => {
    const [role, setRole] = useState<PartnerRole>('CREATOR');

    return (
        <div className="animate-fadeIn max-w-6xl mx-auto pb-20">
            {/* Hero */}
            <header className="text-center mb-16 pt-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-full bg-neon-surge/5 mb-6 backdrop-blur-sm">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
                    </span>
                    <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.2em] font-bold">Protocol V3.0 Live</span>
                </div>
                <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                    ZAPWAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-blue-500 text-glow">PARTNERSHIP PROTOCOL</span>
                </h1>
                <p className="text-text-secondary font-rajdhani text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    A market-leading, blockchain-aligned ecosystem. Whether you operate the infrastructure or amplify the signal, we provide the trust anchor, transparency, and rewards to scale your impact.
                </p>
            </header>

            {/* Role Fork */}
            <RoleSelector active={role} onSelect={setRole} />

            {/* Dynamic Value Prop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <Card className="p-6 border-[#333] bg-foundation-light">
                    <Icons.Shield className="h-8 w-8 text-neon-surge mb-4" />
                    <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">
                        {role === 'OPERATOR' ? 'Premium Vetting Gate' : 'Integrity-Linked Rewards'}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        {role === 'OPERATOR' 
                            ? "Access strategic high-value players who trust data over marketing. Our seal is a mark of solvency and fairness." 
                            : "Monetize your reputation without selling out. Earn higher commissions for driving high-quality, vetted traffic."}
                    </p>
                </Card>
                <Card className="p-6 border-[#333] bg-foundation-light">
                    <Icons.Activity className="h-8 w-8 text-blue-500 mb-4" />
                    <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">
                        {role === 'OPERATOR' ? 'Real-Time Audits' : 'On-Chain Tracking'}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        {role === 'OPERATOR' 
                            ? "Continuous VPR monitoring validates your platform's performance, turning transparency into a marketing asset." 
                            : "Transparent dashboard links and optional wallet-based tracking ensure you never lose credit for a referral."}
                    </p>
                </Card>
                <Card className="p-6 border-[#333] bg-foundation-light">
                    <Icons.Zap className="h-8 w-8 text-yellow-500 mb-4" />
                    <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">
                        {role === 'OPERATOR' ? 'Zero-Knowledge Proof' : 'Gamified Incentives'}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        {role === 'OPERATOR' 
                            ? "Integration with our ZK-Rollup architecture proves fairness mathematically, reducing user friction and doubt." 
                            : "Unlock NFT badges, seasonal accelerator bonuses, and token-based kickers as you climb the ranks."}
                    </p>
                </Card>
            </div>

            {/* Intake Terminal & Rewards Split */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                
                {/* Left: Intake Form */}
                <div>
                    <IntakeTerminal role={role} />
                </div>

                {/* Right: Rewards & Community */}
                <div className="space-y-8">
                    <div>
                         <h3 className="font-orbitron text-2xl text-white uppercase mb-6 flex items-center gap-3">
                            <Icons.TrendingUp className="h-6 w-6 text-neon-surge" /> 
                            {role === 'OPERATOR' ? 'TRAFFIC TIERS' : 'REWARD STRUCTURE'}
                        </h3>
                        <div className="space-y-4">
                            {REWARD_TIERS.map((tier, i) => (
                                <div key={i} className="group relative p-5 bg-[#14131c] border border-[#333] rounded-xl hover:border-neon-surge/50 transition-all overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-orbitron font-bold text-white text-lg">{tier.name}</h4>
                                            <span className="text-xs font-jetbrains-mono text-text-tertiary uppercase">{tier.req}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-neon-surge font-bold font-orbitron text-xl">{tier.share}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tier.perks.map(perk => (
                                            <span key={perk} className="text-[10px] font-bold uppercase px-2 py-1 bg-[#0c0c0e] border border-[#333] rounded text-text-secondary">
                                                {perk}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-xl">
                        <h3 className="font-orbitron text-lg text-white uppercase mb-4 flex items-center gap-2">
                            <Icons.Users className="h-5 w-5 text-purple-400" /> 
                            THE SIGNAL GRID
                        </h3>
                        <p className="text-sm text-text-secondary font-rajdhani mb-6">
                            Join our dedicated partner channels on Discord. Access 24/7 account support, marketing assets, and seasonal accelerator campaigns.
                        </p>
                        <div className="flex gap-4">
                             <Button variant="ghost" size="sm" className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-orbitron uppercase text-xs">
                                <Icons.Discord className="h-4 w-4 mr-2" /> Join Discord
                             </Button>
                             <Button variant="ghost" size="sm" className="border border-[#333] text-text-tertiary hover:text-white font-orbitron uppercase text-xs">
                                View Media Kit
                             </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AffiliatePage;
