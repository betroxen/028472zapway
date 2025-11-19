
import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { Toggle } from './Toggle';

// --- TYPES ---
type Step = 1 | 2 | 3 | 4 | 5;
type Priority = 'STANDARD' | 'ELEVATED' | 'CRITICAL';
type Category = 'PAYOUT' | 'TERMS' | 'SUPPORT' | 'UX' | 'KYC' | 'FRAUD';

interface ReviewFormData {
  operator: string;
  incidentDate: string;
  category: Category;
  priority: Priority;
  ratingPayout: number;
  ratingTerms: number;
  ratingSupport: number;
  ratingUX: number;
  summary: string;
  txId: string;
  evidenceUrl: string;
  attestTrue: boolean;
  attestTerms: boolean;
}

const INITIAL_DATA: ReviewFormData = {
  operator: '',
  incidentDate: new Date().toISOString().split('T')[0],
  category: 'PAYOUT',
  priority: 'STANDARD',
  ratingPayout: 3,
  ratingTerms: 3,
  ratingSupport: 3,
  ratingUX: 3,
  summary: '',
  txId: '',
  evidenceUrl: '',
  attestTrue: false,
  attestTerms: false,
};

const CASINOS = [
    { name: 'Duel', logo: 'https://files.catbox.moe/p4z3v7.jpg' },
    { name: 'Stake', logo: 'https://files.catbox.moe/klt24q.jpg' },
    { name: 'Whale.io', logo: 'https://files.catbox.moe/7zy00k.jpg' },
    { name: 'BC.GAME', logo: 'https://files.catbox.moe/810c57.jpg' },
    { name: 'Duelbits', logo: 'https://files.catbox.moe/e8i1og.jpg' },
    { name: 'Gamdom', logo: 'https://files.catbox.moe/jav4a4.jpg' },
    { name: 'Chips', logo: 'https://files.catbox.moe/x0zu6m.jpg' },
    { name: 'Sportsbet.io', logo: 'https://files.catbox.moe/v2jp51.jpg' },
    { name: 'BetFury', logo: 'https://files.catbox.moe/tw3eoe.jpg' },
    { name: 'Rollbit', logo: 'https://files.catbox.moe/wpp3nk.jpg' },
    { name: 'Rainbet', logo: 'https://files.catbox.moe/0jft4x.jpg' },
    { name: 'Goated', logo: 'https://files.catbox.moe/qp4oyy.jpg' },
    { name: 'Shuffle', logo: 'https://files.catbox.moe/pkbfod.png' },
    { name: 'BlockBet', logo: 'https://files.catbox.moe/e6i3yr.jpg' },
    { name: 'Razed', logo: 'https://files.catbox.moe/xvg0gy.jpg' },
    { name: 'Roobet', logo: 'https://files.catbox.moe/of4dut.jpg' },
    { name: 'Yeet', logo: 'https://files.catbox.moe/6kol09.jpg' },
    { name: 'Moonroll', logo: 'https://files.catbox.moe/n7pja5.jpg' },
    { name: '500 Casino', logo: 'https://files.catbox.moe/da6qov.jpg' },
    { name: 'MetaWin', logo: 'https://files.catbox.moe/yr8ksr.jpg' },
];

export const ReviewModal: React.FC = () => {
  const appContext = useContext(AppContext);
  const toastContext = useContext(ToastContext);
  
  if (!appContext || !toastContext) return null;
  const { isReviewModalOpen, closeReviewModal } = appContext;
  const { showToast } = toastContext;

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<ReviewFormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // --- SCORING LOGIC ---
  const calculatedScore = useMemo(() => {
    // Weighted Average: Payout (35%), Terms (25%), Support (20%), UX (20%)
    const score = (
      (formData.ratingPayout * 0.35) +
      (formData.ratingTerms * 0.25) +
      (formData.ratingSupport * 0.20) +
      (formData.ratingUX * 0.20)
    );
    return score.toFixed(1); // 1.0 to 5.0
  }, [formData.ratingPayout, formData.ratingTerms, formData.ratingSupport, formData.ratingUX]);

  const rewardForecast = useMemo(() => {
    let zp = 100; // Base
    if (formData.summary.length > 100) zp += 50; // Detail bonus
    if (formData.evidenceUrl) zp += 150; // Evidence bonus
    if (formData.txId) zp += 100; // Blockchain proof bonus
    return zp;
  }, [formData.summary, formData.evidenceUrl, formData.txId]);

  const filteredCasinos = useMemo(() => {
    return CASINOS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // --- HANDLERS ---
  const handleNext = () => {
    // Validation Gates
    if (step === 1 && !formData.operator) {
      showToast("TARGET IDENTIFICATION REQUIRED: Select an operator.", "error");
      return;
    }
    if (step === 3 && formData.summary.length < 50) {
       showToast("DATA CONTRACT INVALID: Summary must be > 50 chars.", "error");
       return;
    }
    if (step < 5) setStep(prev => (prev + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => (prev - 1) as Step);
  };

  const handleSubmit = () => {
    if (!formData.attestTrue || !formData.attestTerms) {
      showToast("ATTESTATION FAILED: You must sign the data contract.", "error");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`VPR SUBMITTED. REWARD: +${rewardForecast} ZP PENDING AUDIT.`, "success");
      closeReviewModal();
      setStep(1);
      setFormData(INITIAL_DATA);
    }, 2000);
  };

  const handleRatingChange = (field: keyof ReviewFormData, value: number) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isReviewModalOpen) return null;

  // --- RENDER HELPERS ---
  const renderStars = (field: keyof ReviewFormData, value: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRatingChange(field, star)}
          className={`transition-transform hover:scale-110 focus:outline-none ${star <= value ? 'text-neon-surge' : 'text-[#333]'}`}
        >
          <Icons.Star className={`w-6 h-6 ${star <= value ? 'fill-neon-surge' : ''}`} />
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn p-4">
      <div className="w-full max-w-3xl bg-[#0c0c0e] border border-neon-surge/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,192,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* HEADER */}
        <div className="p-6 border-b border-[#333] bg-[#111] flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-orbitron text-xl text-white uppercase tracking-wider flex items-center gap-3">
              <Icons.FileText className="text-neon-surge h-6 w-6" /> VPR SUBMISSION PROTOCOL
            </h2>
            <p className="text-[10px] font-jetbrains-mono text-text-tertiary mt-1">
              VALIDATED PLAYER REPORT // STEP {step} OF 5
            </p>
          </div>
          <button onClick={closeReviewModal} className="text-text-tertiary hover:text-white">
            <Icons.X className="h-6 w-6" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-1 w-full bg-[#222]">
            <div className="h-full bg-neon-surge transition-all duration-500 shadow-[0_0_10px_#00FFC0]" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
            
            {/* Step 1: Target ID */}
            {step === 1 && (
                <div className="space-y-8 animate-fade-in-up">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg flex gap-3 items-start">
                        <Icons.Target className="text-blue-400 h-6 w-6 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-orbitron text-sm text-blue-300 uppercase mb-1">PHASE 1: TARGET ACQUISITION</h4>
                            <p className="text-xs text-blue-200 font-rajdhani">Identify the operator and timeframe. Accuracy is critical for blockchain cross-referencing.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Select Target Operator</label>
                            <div className="relative mb-4">
                                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4" />
                                <Input 
                                    placeholder="SEARCH DATABASE..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-10 text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto custom-scrollbar p-1">
                                {filteredCasinos.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => setFormData({...formData, operator: c.name})}
                                        className={`flex flex-col items-center p-3 rounded-lg border transition-all group ${formData.operator === c.name ? 'bg-neon-surge/10 border-neon-surge shadow-[0_0_15px_rgba(0,255,192,0.2)]' : 'bg-foundation-light border-[#333] hover:border-white/30'}`}
                                    >
                                        <img 
                                            src={c.logo} 
                                            alt={c.name} 
                                            className={`w-10 h-10 rounded-md object-cover mb-2 border ${formData.operator === c.name ? 'border-neon-surge' : 'border-transparent'}`}
                                        />
                                        <span className={`text-[10px] font-bold uppercase font-orbitron text-center ${formData.operator === c.name ? 'text-neon-surge' : 'text-text-secondary group-hover:text-white'}`}>
                                            {c.name}
                                        </span>
                                    </button>
                                ))}
                                {filteredCasinos.length === 0 && (
                                    <div className="col-span-full text-center py-4 text-xs text-text-tertiary font-mono">
                                        NO TARGET FOUND.
                                    </div>
                                )}
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Incident Date</label>
                            <Input 
                                type="date" 
                                value={formData.incidentDate} 
                                onChange={(e) => setFormData({...formData, incidentDate: e.target.value})}
                                className="h-12 bg-[#111]"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Signal & Focus */}
            {step === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                     <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg flex gap-3 items-start">
                        <Icons.Activity className="text-purple-400 h-6 w-6 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-orbitron text-sm text-purple-300 uppercase mb-1">PHASE 2: SIGNAL TYPE</h4>
                            <p className="text-xs text-purple-200 font-rajdhani">Categorize the report. Misuse of "Critical" priority for non-security issues will result in a trust score penalty.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Primary Category</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['PAYOUT', 'TERMS', 'SUPPORT', 'UX', 'KYC', 'FRAUD'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setFormData({...formData, category: cat as Category})}
                                        className={`p-3 rounded-lg border text-xs font-bold font-orbitron uppercase transition-all ${formData.category === cat ? 'bg-neon-surge text-black border-neon-surge' : 'bg-foundation-light text-text-tertiary border-[#333] hover:border-white'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div>
                            <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Priority Level</label>
                            <div className="flex flex-col gap-3">
                                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.priority === 'STANDARD' ? 'bg-foundation-light border-white' : 'border-[#333]'}`}>
                                    <input type="radio" name="priority" className="accent-neon-surge" checked={formData.priority === 'STANDARD'} onChange={() => setFormData({...formData, priority: 'STANDARD'})} />
                                    <div>
                                        <span className="text-white font-bold text-sm block">STANDARD</span>
                                        <span className="text-text-tertiary text-xs">General feedback, feature requests, minor UX issues.</span>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.priority === 'ELEVATED' ? 'bg-yellow-900/20 border-yellow-500' : 'border-[#333]'}`}>
                                    <input type="radio" name="priority" className="accent-yellow-500" checked={formData.priority === 'ELEVATED'} onChange={() => setFormData({...formData, priority: 'ELEVATED'})} />
                                    <div>
                                        <span className="text-yellow-500 font-bold text-sm block">ELEVATED</span>
                                        <span className="text-text-tertiary text-xs">Delayed payouts (>24h), KYC friction, unexpected errors.</span>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.priority === 'CRITICAL' ? 'bg-red-900/20 border-red-500' : 'border-[#333]'}`}>
                                    <input type="radio" name="priority" className="accent-red-500" checked={formData.priority === 'CRITICAL'} onChange={() => setFormData({...formData, priority: 'CRITICAL'})} />
                                    <div>
                                        <span className="text-red-500 font-bold text-sm block flex items-center gap-2"><Icons.AlertTriangle className="w-3 h-3" /> CRITICAL</span>
                                        <span className="text-text-tertiary text-xs">Account lockouts, potential fraud, confiscated funds. Evidence mandatory.</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Data Contract */}
            {step === 3 && (
                <div className="space-y-8 animate-fade-in-up">
                     <div className="flex justify-between items-center mb-4 p-4 bg-foundation-light border border-[#333] rounded-lg">
                         <div>
                             <span className="text-xs text-text-tertiary font-jetbrains-mono uppercase block">Estimated Impact</span>
                             <span className="text-lg text-white font-bold font-orbitron">ZAP SCORE: {calculatedScore} / 5.0</span>
                         </div>
                          {formData.priority === 'CRITICAL' && parseFloat(calculatedScore) > 3.5 && (
                             <div className="text-xs text-warning-high font-bold uppercase bg-warning-high/10 px-3 py-1 rounded border border-warning-high/30 animate-pulse">
                                 Risk Flag: High Rating + Critical Priority?
                             </div>
                         )}
                     </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Payout Efficiency (35%)</label>
                            {renderStars('ratingPayout', formData.ratingPayout)}
                        </div>
                         <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Terms Transparency (25%)</label>
                            {renderStars('ratingTerms', formData.ratingTerms)}
                        </div>
                         <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Support Quality (20%)</label>
                            {renderStars('ratingSupport', formData.ratingSupport)}
                        </div>
                         <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">User Experience (20%)</label>
                            {renderStars('ratingUX', formData.ratingUX)}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Situation Report (Min 50 chars)</label>
                        <Input 
                            as="textarea" 
                            rows={5} 
                            value={formData.summary}
                            onChange={(e) => setFormData({...formData, summary: e.target.value})}
                            placeholder="Provide factual, objective details. Avoid emotional language."
                            className={formData.summary.length > 0 && formData.summary.length < 50 ? 'border-warning-high' : ''}
                        />
                        <p className="text-right text-[10px] text-text-tertiary mt-1">{formData.summary.length} chars</p>
                    </div>
                </div>
            )}

            {/* Step 4: Evidence */}
            {step === 4 && (
                <div className="space-y-8 animate-fade-in-up">
                     <div className="bg-neon-surge/10 border border-neon-surge/30 p-4 rounded-lg flex gap-3 items-start">
                        <Icons.Shield className="text-neon-surge h-6 w-6 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-orbitron text-sm text-white uppercase mb-1">PHASE 4: PROOF OF WORK</h4>
                            <p className="text-xs text-text-secondary font-rajdhani">Immutable evidence separates signal from noise. Validated proof increases your Reward by up to 250 ZP.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                         <div>
                            <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Blockchain Transaction ID (TxID)</label>
                            <Input 
                                placeholder="0x..." 
                                value={formData.txId}
                                onChange={(e) => setFormData({...formData, txId: e.target.value})}
                            />
                             <p className="text-[10px] text-text-tertiary mt-1">Allows for automated chain verification.</p>
                        </div>
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Evidence URL (Screenshot/Log)</label>
                            <Input 
                                placeholder="https://img.host/..." 
                                value={formData.evidenceUrl}
                                onChange={(e) => setFormData({...formData, evidenceUrl: e.target.value})}
                            />
                        </div>
                         <div className="border-2 border-dashed border-[#333] rounded-lg p-8 text-center hover:border-neon-surge/50 transition-colors cursor-pointer bg-foundation-light/30">
                            <Icons.Camera className="h-8 w-8 text-text-tertiary mx-auto mb-2" />
                            <p className="text-xs text-text-secondary font-jetbrains-mono uppercase">Drag & Drop Files (Simulator)</p>
                        </div>
                    </div>
                </div>
            )}

             {/* Step 5: Attestation */}
             {step === 5 && (
                <div className="space-y-8 animate-fade-in-up">
                    <div className="text-center mb-8">
                         <Icons.Lock className="h-12 w-12 text-neon-surge mx-auto mb-4" />
                         <h3 className="font-orbitron text-2xl text-white uppercase">FINAL SEAL</h3>
                         <p className="text-text-secondary text-sm max-w-md mx-auto mt-2">
                             By transmitting this VPR, you are writing to the immutable ZAP ledger. Truth is the only currency here.
                         </p>
                    </div>

                    <div className="bg-foundation-light p-6 rounded-xl border border-[#333] space-y-4">
                        <Toggle 
                            checked={formData.attestTrue}
                            onChange={(v) => setFormData({...formData, attestTrue: v})}
                            label={<span className="font-bold text-white text-sm uppercase">TRUTH ATTESTATION</span>}
                            description={<span className="text-xs text-text-tertiary">I certify that this report is based on my genuine experience and all provided data is unmanipulated.</span>}
                        />
                        <div className="h-px bg-[#333] w-full"></div>
                        <Toggle 
                             checked={formData.attestTerms}
                            onChange={(v) => setFormData({...formData, attestTerms: v})}
                            label={<span className="font-bold text-white text-sm uppercase">LIABILITY ACCEPTANCE</span>}
                            description={<span className="text-xs text-text-tertiary">I understand that false reporting may result in a permanent ban and forfeiture of all ZP rewards.</span>}
                        />
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/20 to-transparent p-4 rounded-lg border-l-2 border-yellow-500">
                         <div className="flex justify-between items-center">
                             <span className="text-xs font-jetbrains-mono text-yellow-500 uppercase">ESTIMATED REWARD</span>
                             <span className="text-xl font-bold font-orbitron text-white">+{rewardForecast} ZP</span>
                         </div>
                    </div>
                </div>
            )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 border-t border-[#333] bg-[#111] flex justify-between items-center shrink-0">
          {step > 1 ? (
             <Button variant="ghost" onClick={handleBack} disabled={isSubmitting}>BACK</Button>
          ) : (
             <div></div> // Spacer
          )}

          {step < 5 ? (
             <Button onClick={handleNext} className="px-8 uppercase tracking-widest font-bold shadow-neon-glow-sm">PROCEED &rarr;</Button>
          ) : (
             <Button onClick={handleSubmit} loading={isSubmitting} className="px-8 uppercase tracking-widest font-bold shadow-neon-glow-md w-full md:w-auto bg-neon-surge text-black hover:bg-white">
                {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT REPORT'}
             </Button>
          )}
        </div>

      </div>
    </div>
  );
};
