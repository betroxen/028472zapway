
import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

export const BonusCalculatorPage = () => {
  // Input States
  const [deposit, setDeposit] = useState<number | ''>(100);
  const [bonusPercent, setBonusPercent] = useState<number | ''>(100);
  const [wagering, setWagering] = useState<number | ''>(35);
  const [wagerType, setWagerType] = useState<'bonus' | 'deposit_bonus'>('bonus');

  // Validation Errors
  const [errors, setErrors] = useState<{deposit?: string; bonusPercent?: string; wagering?: string}>({});

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState({
    bonusAmount: 0,
    totalFunds: 0,
    totalWager: 0,
    riskLevel: { text: "AWAITING INPUT", color: "text-[#8d8c9e]", border: "border-[#333]", bg: "bg-[#1A1A1A]", animate: "" }
  });

  // Risk Analysis Helper
  const getRiskAnalysis = (wagerVal: number) => {
    if (wagerVal > 40) return { text: "HIGH RISK // AGGRESSIVE TERMS", color: "text-red-500", border: "border-red-500", bg: "bg-red-950/20", animate: "animate-pulse" };
    if (wagerVal >= 25) return { text: "MODERATE RISK", color: "text-yellow-500", border: "border-yellow-500", bg: "bg-yellow-950/20", animate: "" };
    return { text: "LOW RISK // OPTIMAL", color: "text-neon-surge", border: "border-neon-surge", bg: "bg-neon-surge/10", animate: "" };
  };

  // Input validation logic
  const validateInputs = () => {
    const newErrors: {deposit?: string; bonusPercent?: string; wagering?: string} = {};
    if (deposit === '' || deposit < 0) newErrors.deposit = 'Deposit must be zero or positive';
    if (bonusPercent === '' || bonusPercent < 0) newErrors.bonusPercent = 'Bonus percent must be zero or positive';
    if (wagering === '' || wagering < 0) newErrors.wagering = 'Wagering multiplier must be zero or positive';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculation logic with validation and kinetic feedback
  const handleAnalyze = () => {
    if (!validateInputs()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const dep = Number(deposit) || 0;
      const pct = Number(bonusPercent) || 0;
      const wag = Number(wagering) || 0;

      const bonusAmount = (dep * pct) / 100;
      const totalFunds = dep + bonusAmount;

      let totalWager = 0;
      if (wagerType === 'bonus') {
        totalWager = bonusAmount * wag;
      } else {
        totalWager = totalFunds * wag;
      }

      // Calculate effective risk based on bonus amount relative to total funds for deposit+bonus types
      const effectiveRiskWager = wagerType === 'deposit_bonus' ? wag * (totalFunds / (bonusAmount || 1)) : wag;

      setResults({
        bonusAmount,
        totalFunds,
        totalWager,
        riskLevel: getRiskAnalysis(effectiveRiskWager)
      });

      setIsAnalyzing(false);
    }, 400);
  };

  // Initial analysis on component mount
  useEffect(() => {
    handleAnalyze();
  }, []);

  return (
    <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 animate-fadeIn" role="main">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Icons.Calculator className="text-neon-surge h-8 w-8" aria-hidden="true" />
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
            BONUS PROTOCOL ANALYZER
          </h1>
        </div>
        <p className="text-neon-surge font-jetbrains-mono text-sm uppercase tracking-widest ml-11" aria-live="polite">
          // DETERMINE THE TRUE COST OF OPERATOR INCENTIVES
        </p>
      </header>

      <form className="grid grid-cols-1 lg:grid-cols-5 gap-8" onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }} noValidate>
        {/* Inputs */}
        <Card className="lg:col-span-2 p-6 bg-[#0c0c0e] border-[#333]" aria-label="Input variables">
          <h2 className="font-orbitron text-lg text-white uppercase mb-6 flex items-center gap-2 border-b border-[#333] pb-3">
            <Icons.Settings className="h-5 w-5 text-neon-surge" aria-hidden="true" /> INPUT VARIABLES
          </h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="deposit" className="block text-xs font-jetbrains-mono text-[#8d8c9e] uppercase mb-2">Deposit Amount ($)</label>
              <Input
                id="deposit"
                type="number"
                min="0"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value === '' ? '' : Number(e.target.value))}
                className="font-jetbrains-mono text-lg"
                placeholder="100"
                aria-invalid={!!errors.deposit}
                aria-describedby="deposit-error"
              />
              {errors.deposit && <p id="deposit-error" className="text-xs text-red-500 mt-1">{errors.deposit}</p>}
            </div>

            <div>
              <label htmlFor="bonusPercent" className="block text-xs font-jetbrains-mono text-[#8d8c9e] uppercase mb-2">Bonus Percentage (%)</label>
              <Input
                id="bonusPercent"
                type="number"
                min="0"
                value={bonusPercent}
                onChange={(e) => setBonusPercent(e.target.value === '' ? '' : Number(e.target.value))}
                className="font-jetbrains-mono text-lg"
                placeholder="100"
                aria-invalid={!!errors.bonusPercent}
                aria-describedby="bonusPercent-error"
              />
              {errors.bonusPercent && <p id="bonusPercent-error" className="text-xs text-red-500 mt-1">{errors.bonusPercent}</p>}
            </div>

            <div>
              <label htmlFor="wagering" className="block text-xs font-jetbrains-mono text-[#8d8c9e] uppercase mb-2">Wagering Requirement (x)</label>
              <Input
                id="wagering"
                type="number"
                min="0"
                value={wagering}
                onChange={(e) => setWagering(e.target.value === '' ? '' : Number(e.target.value))}
                className="font-jetbrains-mono text-lg"
                placeholder="35"
                aria-invalid={!!errors.wagering}
                aria-describedby="wagering-error"
              />
              {errors.wagering && <p id="wagering-error" className="text-xs text-red-500 mt-1">{errors.wagering}</p>}
            </div>

            <fieldset>
              <legend className="block text-xs font-jetbrains-mono text-[#8d8c9e] uppercase mb-3">Wagering Scope</legend>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Select wagering scope">
                <button
                  type="button"
                  aria-pressed={wagerType === 'bonus'}
                  onClick={() => setWagerType('bonus')}
                  className={`p-3 rounded-md border font-orbitron uppercase text-xs transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-surge ${
                    wagerType === 'bonus'
                      ? 'bg-neon-surge border-neon-surge text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]'
                      : 'bg-[#14131c] border-[#333] text-[#8d8c9e] hover:text-white'
                  }`}
                >
                  [ BONUS ONLY ]
                </button>
                <button
                  type="button"
                  aria-pressed={wagerType === 'deposit_bonus'}
                  onClick={() => setWagerType('deposit_bonus')}
                  className={`p-3 rounded-md border font-orbitron uppercase text-xs transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-surge ${
                    wagerType === 'deposit_bonus'
                      ? 'bg-neon-surge border-neon-surge text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]'
                      : 'bg-[#14131c] border-[#333] text-[#8d8c9e] hover:text-white'
                  }`}
                >
                  [ DEPOSIT + BONUS ]
                </button>
              </div>
            </fieldset>

            <Button
              type="submit"
              className="w-full mt-4 font-orbitron uppercase tracking-widest py-6 text-sm shadow-[0_0_20px_rgba(0,255,192,0.2)]"
              disabled={isAnalyzing || Object.keys(errors).length > 0}
              aria-live="polite"
              aria-busy={isAnalyzing}
            >
              {isAnalyzing ? <Icons.Loader2 className="h-5 w-5 animate-spin mx-auto" aria-hidden="true" /> : 'ANALYZE WAGERING PROTOCOL'}
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 flex flex-col">
          <Card
            className={`h-full p-6 md:p-8 bg-[#121212] border-[#333] relative overflow-hidden flex flex-col justify-center transition-all duration-300 ${
              isAnalyzing ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Background grid for terminal effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,192,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" aria-hidden="true"></div>

            {/* Risk Meter */}
            <div
              className={`mb-8 p-4 rounded-lg border-2 flex items-center justify-between ${results.riskLevel.bg} ${results.riskLevel.border} ${results.riskLevel.animate} transition-all duration-500`}
            >
              <span className="font-orbitron uppercase text-sm text-white flex items-center gap-2">
                <Icons.AlertTriangle className={`h-5 w-5 ${results.riskLevel.color}`} aria-hidden="true" /> THREAT ASSESSMENT
              </span>
              <span className={`font-jetbrains-mono font-bold uppercase tracking-wider ${results.riskLevel.color}`}>
                {results.riskLevel.text}
              </span>
            </div>

            {/* Primary Metric */}
            <section className="mb-10 text-center p-6 bg-[#0A0A0A] rounded-xl border border-[#333] shadow-2xl" aria-label="Total wagering required">
              <p className="text-[#8d8c9e] font-orbitron uppercase tracking-widest text-sm mb-3">TOTAL WAGERING REQUIRED</p>
              <p className="font-jetbrains-mono text-4xl md:text-6xl text-white font-bold tracking-tight">
                <span className="text-neon-surge">$</span>
                {results.totalWager.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </section>

            {/* Secondary Metrics */}
            <section aria-label="Additional bonus calculation metrics" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#14131c] p-4 rounded-lg border border-[#333] flex justify-between items-center">
                <span className="text-xs font-jetbrains-mono text-[#8d8c9e] uppercase">INITIAL STACK DEPLOYED</span>
                <span className="font-jetbrains-mono text-xl text-white">${results.totalFunds.toLocaleString()}</span>
              </div>
              <div className="bg-[#14131c] p-4 rounded-lg border border-[#333] flex justify-between items-center">
                <span className="text-xs font-jetbrains-mono text-[#8d8c9e] uppercase">ACQUIRED INTEL VALUE</span>
                <span className="font-jetbrains-mono text-xl text-neon-surge">+${results.bonusAmount.toLocaleString()}</span>
              </div>
            </section>
          </Card>
        </div>
      </form>
    </div>
  );
};
