import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calculator as CalcIcon, Zap, TrendingUp, Leaf, Info, ArrowRight } from 'lucide-react';

const SolarCalculator: React.FC = () => {
  useScrollReveal();

  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [roofSpace, setRoofSpace] = useState<number>(500);

  // Results states
  const [recommendedKW, setRecommendedKW] = useState<number>(0);
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [paybackYears, setPaybackYears] = useState<number>(0);
  const [co2Offset, setCo2Offset] = useState<number>(0);

  useEffect(() => {
    // Basic Solar Logic for Kerala (Approximate)
    // 1kW produces ~4 units/day = 120 units/month
    // Avg cost per unit in Kerala slabs (KSEB) ~ 7.5 INR

    const monthlyUnits = monthlyBill / 7.5;
    const peakKWNeeded = monthlyUnits / 120;
    const roundedKW = Math.ceil(peakKWNeeded * 10) / 10;

    const annualSaving = monthlyBill * 12;
    const systemCost = roundedKW * 65000; // ~65k per kW installed

    setRecommendedKW(roundedKW);
    setAnnualSavings(annualSaving);
    setPaybackYears(Math.round((systemCost / annualSaving) * 10) / 10);
    setCo2Offset(Math.round(roundedKW * 1.5 * 10) / 10); // 1.5 tons CO2 per kW/yr
  }, [monthlyBill]);

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      {/* Calculator Mini-Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-20 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/calculator-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Solar ROI Analytics"
          />
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal active opacity-1 translate-y-0 transition-all duration-1000">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Yield Analytics</span>
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[0.85] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            SOLAR SAVINGS <br className="hidden md:block" />
            ROI CALCULATOR
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Discover how much you can save by switching to Spectrum Solar. Based on real-time KSEB tariff models.
          </p>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="px-6 pb-20 md:pb-32" data-nav-light>
        <div className="max-w-3xl mx-auto reveal opacity-0 translate-y-10 transition-all duration-1000">
          <div className="premium-cream-card p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-12">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-600">Average Monthly Bill</label>
                <span className="text-3xl font-black text-black italic">₹{monthlyBill.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <span>₹500</span>
                <span>₹50,000+</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Available Roof Space</label>
                <span className="text-3xl font-black text-black italic">{roofSpace} Sq.Ft</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={roofSpace}
                onChange={(e) => setRoofSpace(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <span>100 Sq.Ft</span>
                <span>5,000+ Sq.Ft</span>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 flex gap-4 text-zinc-500">
              <Info className="w-5 h-5 shrink-0 text-yellow-500/50" />
              <p className="text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                Calculations are estimates based on average annual sunlight in Kerala and current KSEB net-metering policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Full Width White (Matches Page) */}
      <section className="px-6 py-32 bg-zinc-50 border-y border-zinc-200" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal opacity-0 translate-y-10 transition-all duration-1000">
            {/* Recommendation Card */}
            <div className="md:col-span-2 lg:col-span-4 bg-yellow-400 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group shadow-2xl mb-6">
              <div className="text-black text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block opacity-60">Custom Recommendation</span>
                <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none mb-1">{recommendedKW} KW</h3>
                <p className="font-bold text-black/70 italic uppercase text-[10px] sm:text-xs">Optimum System Size for your bill</p>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-black rounded-full flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform duration-500 shadow-2xl shrink-0">
                <Zap className="w-10 h-10 md:w-12 md:h-12 fill-current" />
              </div>
            </div>

            <div className="premium-cream-card p-8 md:p-10 rounded-[2.5rem] shadow-xl group">
              <TrendingUp className="text-yellow-500 w-8 h-8 mb-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-2">Annual Savings</span>
              <div className="text-3xl md:text-4xl font-black italic tracking-tighter text-black">₹{annualSavings.toLocaleString()}</div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase mt-4">95% Grid Independence</p>
            </div>

            <div className="premium-cream-card p-8 md:p-10 rounded-[2.5rem] shadow-xl group">
              <CalcIcon className="text-yellow-500 w-8 h-8 mb-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-2">Payback Period</span>
              <div className="text-3xl md:text-4xl font-black italic tracking-tighter text-black">{paybackYears} Years</div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase mt-4">Full Capital Recovery</p>
            </div>

            <div className="premium-cream-card p-8 md:p-10 rounded-[2.5rem] shadow-xl group">
              <Leaf className="text-yellow-500 w-8 h-8 mb-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-2">Carbon Offset</span>
              <div className="text-3xl md:text-4xl font-black italic tracking-tighter text-black">{co2Offset} Tons</div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase mt-4">Saving our planet</p>
            </div>

            <div className="bg-black border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-center shadow-2xl group cursor-pointer hover:bg-zinc-900 transition-all">
              <a href="/contact" className="flex items-center justify-between">
                <div>
                  <span className="text-white font-black uppercase italic tracking-tighter block text-xl">Detailed Audit</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Book Engineer Visit</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all shadow-sm">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="px-6 py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center reveal opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 opacity-20 text-black italic">"Saving doesn't just benefit you, <br /> it benefits the planet."</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
        </div>
      </section>
    </div>
  );
};

export default SolarCalculator;
