import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, CheckCircle2, TrendingUp, Sparkles, ShieldCheck, ArrowRight, Zap, Info } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SolarCalculatorProps {
  costPerKW: number;
  blendedTariff: number;
}

const SolarCalculatorBody: React.FC<SolarCalculatorProps> = ({ costPerKW, blendedTariff }) => {
  useScrollReveal();

  const [systemSize, setSystemSize] = useState(5);
  const [panelType, setPanelType] = useState<'mono' | 'bifacial'>('bifacial');

  const dailyUnitsPerKW = panelType === 'bifacial' ? 4.5 : 4.0;
  const dailyUnits = Math.round(systemSize * dailyUnitsPerKW * 10) / 10;
  const monthlyUnits = Math.round(dailyUnits * 30);
  const annualUnits = Math.round(dailyUnits * 365);

  const baseCost = systemSize * costPerKW;
  const subsidyAmount = systemSize <= 2 ? 60000 : systemSize === 3 ? 78000 : 78000;
  const netCost = Math.max(baseCost - subsidyAmount, 15000);

  const monthlySavings = Math.round(monthlyUnits * blendedTariff);
  const annualSavings = Math.round(annualUnits * blendedTariff);

  const paybackYears = (netCost / annualSavings).toFixed(1);
  const lifetimeSavings = Math.round(annualSavings * 25 - netCost);

  return (
    <div id="solar" className="px-6 py-16 md:py-24" data-nav-light>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="reveal">
            <span className="text-zinc-500 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Interactive Sizing & ROI</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-thin uppercase tracking-tight leading-none mb-8 md:mb-12">
              Calculate your <br />solar savings.
            </h2>
            <div className="space-y-10">
              <div className="space-y-5">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">System Capacity</label>
                  <span className="text-4xl font-black text-black tracking-tighter">{systemSize} <span className="text-xl text-zinc-400">kW</span></span>
                </div>
                <input type="range" min={1} max={25} step={1} value={systemSize}
                  onChange={(e) => setSystemSize(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  style={{ background: `linear-gradient(to right, #eab308 0%, #eab308 ${((systemSize - 1) / 24) * 100}%, #e4e4e7 ${((systemSize - 1) / 24) * 100}%, #e4e4e7 100%)` }}
                />
                <div className="flex justify-between text-[10px] font-medium text-zinc-400 uppercase tracking-widest"><span>1 kW (Home)</span><span>25 kW (Commercial)</span></div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 block">Panel Technology</label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setPanelType('bifacial')}
                    className={`py-4 px-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-left ${panelType === 'bifacial' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                    <span className="block text-sm">Bifacial DCR</span>
                    <span className="text-[9px] opacity-70 block mt-1">+15% rear generation · Subsidy eligible</span>
                  </button>
                  <button onClick={() => setPanelType('mono')}
                    className={`py-4 px-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-left ${panelType === 'mono' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                    <span className="block text-sm">Mono PERC</span>
                    <span className="text-[9px] opacity-70 block mt-1">High efficiency · Single glass</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Daily Generation</span>
                  <div className="text-2xl font-black text-black">{dailyUnits} <span className="text-xs font-bold text-zinc-500">kWh</span></div>
                  <p className="text-[9px] font-medium text-zinc-400 uppercase mt-1">~{monthlyUnits} units/month</p>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Annual Generation</span>
                  <div className="text-2xl font-black text-black">{annualUnits.toLocaleString()} <span className="text-xs font-bold text-zinc-500">kWh</span></div>
                  <p className="text-[9px] font-medium text-zinc-400 uppercase mt-1">Based on 300 sunny days</p>
                </div>
              </div>
              <div className="flex gap-4 text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
                <Info className="w-5 h-5 shrink-0 text-yellow-500 mt-0.5" />
                <p className="text-[10px] font-medium leading-relaxed uppercase tracking-wider">
                  Estimates include PM Surya Ghar / MNRE subsidy for residential up to 3kW. Actual generation varies by shadow angle and roof orientation.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <div className="bg-yellow-400 rounded-[2.5rem] p-8 md:p-10 mb-6 relative overflow-hidden shadow-2xl shadow-yellow-400/20">
              <div className="absolute top-0 right-0 w-48 h-48 opacity-10 translate-x-8 -translate-y-8">
                <Sun className="w-full h-full text-black" />
              </div>
              <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Estimated Monthly Savings</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-black">₹</span>
                <span className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">{monthlySavings.toLocaleString()}</span>
              </div>
              <div className="mt-6 pt-6 border-t border-black/10 grid grid-cols-2 gap-4">
                <div><p className="text-black/50 text-[9px] font-black uppercase tracking-widest">Annual Savings</p><p className="text-black font-black text-xl">₹{annualSavings.toLocaleString()}</p></div>
                <div><p className="text-black/50 text-[9px] font-black uppercase tracking-widest">25-Yr Return</p><p className="text-black font-black text-xl">₹{lifetimeSavings.toLocaleString()}</p></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                <TrendingUp className="text-yellow-500 w-6 h-6 mb-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Payback Period</span>
                <div className="text-3xl font-black text-black tracking-tighter">{paybackYears} <span className="text-sm font-bold text-zinc-400">Years</span></div>
                <p className="text-[9px] font-medium text-zinc-400 uppercase mt-2">100% ROI achieved</p>
              </div>
              <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                <ShieldCheck className="text-yellow-500 w-6 h-6 mb-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Govt. Subsidy</span>
                <div className="text-3xl font-black text-black tracking-tighter">₹{(subsidyAmount / 1000).toFixed(0)}k</div>
                <p className="text-[9px] font-medium text-zinc-400 uppercase mt-2">PM Surya Ghar Yojana</p>
              </div>
            </div>
            <Link to="/contact" className="mt-6 flex items-center justify-between bg-black text-white rounded-[1.5rem] p-6 group hover:bg-zinc-900 transition-all shadow-xl">
              <div>
                <span className="text-white font-black uppercase tracking-tighter block text-lg">Get Free Detailed Proposal</span>
                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Custom shadow &amp; roof audit</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Solar Calculator Page ──────────────────────────────────────────────

const Calculator: React.FC = () => {
  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden mb-0 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/calculator-hero.jpg" className="w-full h-full object-cover scale-[1.05]" alt="Solar Calculator" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-medium tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Yield & ROI Analytics</span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            Solar <br className="hidden md:block" />Calculator
          </h1>
        </div>
      </section>

      <SolarCalculatorBody costPerKW={65000} blendedTariff={7.5} />
    </div>
  );
};

export default Calculator;
