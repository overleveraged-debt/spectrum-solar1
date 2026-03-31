import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Zap, TrendingUp, Leaf, Info, ArrowRight, Sun, IndianRupee, Battery, Clock, BatteryCharging } from 'lucide-react';

const SolarCalculatorBody: React.FC = () => {
  useScrollReveal();

  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [roofSpace, setRoofSpace] = useState<number>(500);

  const [recommendedKW, setRecommendedKW] = useState<number>(0);
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [paybackYears, setPaybackYears] = useState<number>(0);
  const [co2Offset, setCo2Offset] = useState<number>(0);
  const [systemCost, setSystemCost] = useState<number>(0);

  useEffect(() => {
    // Kerala KSEB avg blended tariff ≈ ₹7.5/unit
    const monthlyUnits = monthlyBill / 7.5;
    // 1kW produces ~120 units/month in Kerala (avg 4 units/day, 30 days)
    const billBasedKW = monthlyUnits / 120;
    // Roof constraint: 1kW needs ~100 sq.ft (10 sq.m) of shadow-free roof
    const roofBasedKW = roofSpace / 100;
    // Recommended kW is the minimum of what your bill needs and what your roof allows
    const rawKW = Math.min(billBasedKW, roofBasedKW);
    const roundedKW = Math.max(1, Math.round(rawKW * 10) / 10);

    const costPerKW = 65000; // ~₹65,000/kW installed (panels + inverter + structure + installation)
    const totalCost = roundedKW * costPerKW;
    // Annual savings = bill we offset (the recommended kW may not cover full bill if roof is small)
    const monthlyUnitsSaved = roundedKW * 120;
    const annualSaving = Math.min(monthlyBill, monthlyUnitsSaved * 7.5) * 12;

    setRecommendedKW(roundedKW);
    setAnnualSavings(annualSaving);
    setSystemCost(totalCost);
    setPaybackYears(Math.round((totalCost / annualSaving) * 10) / 10);
    setCo2Offset(Math.round(roundedKW * 1.5 * 10) / 10);
  }, [monthlyBill, roofSpace]);

  const paybackPct = Math.min(100, (paybackYears / 10) * 100);
  const co2Pct = Math.min(100, (co2Offset / 10) * 100);

  return (
    <>
      {/* Calculator Body */}
      <section className="px-6 py-20 md:py-32" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT: Inputs */}
            <div className="reveal">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Your Details</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8 md:mb-12">
                Tell us <br />about your home.
              </h2>

              <div className="space-y-10">
                {/* Bill Slider */}
                <div className="space-y-5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Monthly Electricity Bill</label>
                    <span className="text-4xl font-black text-black tracking-tighter">₹{monthlyBill.toLocaleString()}</span>
                  </div>
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="500"
                      max="50000"
                      step="500"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                      style={{ background: `linear-gradient(to right, #eab308 0%, #eab308 ${((monthlyBill - 500) / 49500) * 100}%, #e4e4e7 ${((monthlyBill - 500) / 49500) * 100}%, #e4e4e7 100%)` }}
                    />
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-3">
                      <span>₹500</span>
                      <span>₹50,000+</span>
                    </div>
                  </div>
                </div>

                {/* Roof Slider */}
                <div className="space-y-5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Available Roof Area</label>
                    <span className="text-4xl font-black text-black tracking-tighter">{roofSpace} <span className="text-xl text-zinc-400">Sq.Ft</span></span>
                  </div>
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      step="50"
                      value={roofSpace}
                      onChange={(e) => setRoofSpace(parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                      style={{ background: `linear-gradient(to right, #eab308 0%, #eab308 ${((roofSpace - 100) / 4900) * 100}%, #e4e4e7 ${((roofSpace - 100) / 4900) * 100}%, #e4e4e7 100%)` }}
                    />
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-3">
                      <span>100 Sq.Ft</span>
                      <span>5,000+ Sq.Ft</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    ~{Math.floor(roofSpace / 100)} kW can fit on your roof
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="flex gap-4 text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
                  <Info className="w-5 h-5 shrink-0 text-yellow-500 mt-0.5" />
                  <p className="text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                    Estimates based on Kerala's average solar irradiance (4.5 kWh/m²/day) and current KSEB net-metering slab rates. Your recommended size is the lower of what your bill needs vs. what your roof supports.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Results */}
            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              {/* Hero Result Card */}
              <div className="bg-yellow-400 rounded-[2.5rem] p-8 md:p-10 mb-6 relative overflow-hidden group shadow-2xl shadow-yellow-400/20">
                <div className="absolute top-0 right-0 w-48 h-48 opacity-10 translate-x-8 -translate-y-8">
                  <Sun className="w-full h-full text-black" />
                </div>
                <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Recommended System Size</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">{recommendedKW}</span>
                  <span className="text-3xl font-black text-black/60 uppercase">kW</span>
                </div>
                <div className="mt-6 pt-6 border-t border-black/10 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-black/50 text-[9px] font-black uppercase tracking-widest">Total Investment</p>
                    <p className="text-black font-black text-lg">₹{systemCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-black/50 text-[9px] font-black uppercase tracking-widest">Panels Needed</p>
                    <p className="text-black font-black text-lg">~{Math.ceil(recommendedKW / 0.545)} panels</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Annual Savings */}
                <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                  <TrendingUp className="text-yellow-500 w-6 h-6 mb-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Annual Savings</span>
                  <div className="text-2xl font-black text-black tracking-tighter">₹{annualSavings.toLocaleString()}</div>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase mt-2">Per Year</p>
                </div>

                {/* Payback Period */}
                <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                  <IndianRupee className="text-yellow-500 w-6 h-6 mb-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Payback Period</span>
                  <div className="text-2xl font-black text-black tracking-tighter">{paybackYears} <span className="text-base text-zinc-400">yrs</span></div>
                  <div className="mt-3 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full transition-all duration-700" style={{ width: `${paybackPct}%` }} />
                  </div>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase mt-1.5">Out of 10-year benchmark</p>
                </div>

                {/* CO2 Offset */}
                <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                  <Leaf className="text-yellow-500 w-6 h-6 mb-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">CO₂ Offset</span>
                  <div className="text-2xl font-black text-black tracking-tighter">{co2Offset} <span className="text-base text-zinc-400">T/yr</span></div>
                  <div className="mt-3 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full transition-all duration-700" style={{ width: `${co2Pct}%` }} />
                  </div>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase mt-1.5">Tons of CO₂ saved yearly</p>
                </div>

                {/* 25-Year Savings */}
                <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                  <Zap className="text-yellow-500 w-6 h-6 mb-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">25-Year Value</span>
                  <div className="text-2xl font-black text-black tracking-tighter">₹{(annualSavings * 25).toLocaleString()}</div>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase mt-2">Total lifetime savings</p>
                </div>
              </div>

              {/* CTA */}
              <a
                href="/contact"
                className="mt-6 flex items-center justify-between bg-black text-white rounded-[1.5rem] p-6 group hover:bg-zinc-900 transition-all shadow-xl"
              >
                <div>
                  <span className="text-white font-black uppercase italic tracking-tighter block text-lg">Book Site Audit</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Free Engineer Visit</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <ArrowRight className="w-5 h-5 text-black" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Footer */}
      <section className="px-6 py-24 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-6 text-zinc-100" style={{ WebkitTextStroke: '1px #d4d4d8' }}>
            "Every unit you generate is money you keep."
          </p>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Spectrum Powers — 24 Years of Solar Excellence</p>
        </div>
      </section>
    </>
  );
};

// ─── Power Backup Calculator ─────────────────────────────────────────────────

const PowerCalculator: React.FC = () => {
  useScrollReveal();

  const [loadWatts, setLoadWatts] = useState(1000);
  const [backupHours, setBackupHours] = useState(4);
  const [batteryType, setBatteryType] = useState<'tubular' | 'lithium'>('lithium');

  const batteryVoltage = 12;
  const efficiency = batteryType === 'lithium' ? 0.95 : 0.8;
  const dod = batteryType === 'lithium' ? 0.95 : 0.5;

  const rawAh = (loadWatts * backupHours) / (batteryVoltage * efficiency * dod);
  const recommendedAh = Math.ceil(rawAh / 10) * 10;
  const recommendedKVA = Math.ceil((loadWatts * 1.25) / 500) * 0.5;
  const batteryCost = batteryType === 'lithium' ? recommendedAh * 280 : recommendedAh * 60;
  const inverterCost = recommendedKVA * 8000;
  const totalCost = batteryCost + inverterCost;

  return (
    <div className="px-6 py-16 md:py-24" data-nav-light>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="reveal">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Your Load Details</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8 md:mb-12">
              Size your <br />backup system.
            </h2>
            <div className="space-y-10">
              <div className="space-y-5">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Connected Load</label>
                  <span className="text-4xl font-black text-black tracking-tighter">{loadWatts.toLocaleString()} <span className="text-xl text-zinc-400">W</span></span>
                </div>
                <input type="range" min={100} max={10000} step={100} value={loadWatts}
                  onChange={(e) => setLoadWatts(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  style={{ background: `linear-gradient(to right, #eab308 0%, #eab308 ${((loadWatts - 100) / 9900) * 100}%, #e4e4e7 ${((loadWatts - 100) / 9900) * 100}%, #e4e4e7 100%)` }}
                />
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest"><span>100W</span><span>10,000W</span></div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Add up watts of all devices you need during backup</p>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 block">Hours of Backup Needed</label>
                <div className="grid grid-cols-4 gap-3">
                  {[2, 4, 6, 8].map((h) => (
                    <button key={h} onClick={() => setBackupHours(h)}
                      className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${backupHours === h ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                      {h}h
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 block">Battery Technology</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['lithium', 'tubular'] as const).map((type) => (
                    <button key={type} onClick={() => setBatteryType(type)}
                      className={`py-4 px-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-left ${batteryType === type ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                      <span className="block text-sm">{type === 'lithium' ? 'Lithium LFP' : 'Tubular Lead-Acid'}</span>
                      <span className="text-[9px] opacity-70 block mt-1">{type === 'lithium' ? '10yr life · 4000 cycles' : '4yr life · Low cost'}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
                <Info className="w-5 h-5 shrink-0 text-yellow-500 mt-0.5" />
                <p className="text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                  Based on 12V battery bank with {batteryType === 'lithium' ? '95% DoD and 95% efficiency' : '50% DoD and 80% efficiency'}. Add 20% buffer for real-world safety.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <div className="bg-yellow-400 rounded-[2.5rem] p-8 md:p-10 mb-6 relative overflow-hidden shadow-2xl shadow-yellow-400/20">
              <div className="absolute top-0 right-0 w-48 h-48 opacity-10 translate-x-8 -translate-y-8">
                <Battery className="w-full h-full text-black" />
              </div>
              <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Recommended Battery Capacity</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">{recommendedAh}</span>
                <span className="text-3xl font-black text-black/60 uppercase">Ah</span>
              </div>
              <div className="mt-6 pt-6 border-t border-black/10 grid grid-cols-2 gap-4">
                <div><p className="text-black/50 text-[9px] font-black uppercase tracking-widest">UPS / Inverter Size</p><p className="text-black font-black text-lg">{recommendedKVA} kVA</p></div>
                <div><p className="text-black/50 text-[9px] font-black uppercase tracking-widest">Battery Type</p><p className="text-black font-black text-lg capitalize">{batteryType}</p></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                <BatteryCharging className="text-yellow-500 w-6 h-6 mb-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Battery Cost</span>
                <div className="text-2xl font-black text-black tracking-tighter">₹{batteryCost.toLocaleString()}</div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase mt-2">Approx. installed</p>
              </div>
              <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                <Zap className="text-yellow-500 w-6 h-6 mb-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">UPS / Inverter</span>
                <div className="text-2xl font-black text-black tracking-tighter">₹{inverterCost.toLocaleString()}</div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase mt-2">Equipment cost</p>
              </div>
              <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                <IndianRupee className="text-yellow-500 w-6 h-6 mb-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Total Estimate</span>
                <div className="text-2xl font-black text-black tracking-tighter">₹{totalCost.toLocaleString()}</div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase mt-2">Battery + UPS</p>
              </div>
              <div className="premium-cream-card p-6 rounded-[1.5rem] shadow-sm">
                <Clock className="text-yellow-500 w-6 h-6 mb-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Backup Duration</span>
                <div className="text-2xl font-black text-black tracking-tighter">{backupHours} <span className="text-base text-zinc-400">Hours</span></div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase mt-2">At {loadWatts}W load</p>
              </div>
            </div>
            <a href="/contact" className="mt-6 flex items-center justify-between bg-black text-white rounded-[1.5rem] p-6 group hover:bg-zinc-900 transition-all shadow-xl">
              <div>
                <span className="text-white font-black uppercase italic tracking-tighter block text-lg">Get Exact Quote</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Free assessment visit</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Calculator Page with Tabs ──────────────────────────────────────────

const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'solar' | 'power'>('solar');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'power') setActiveTab('power');
    else setActiveTab('solar');
  }, []);

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mb-0 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/calculator-hero.jpg" className="w-full h-full object-cover scale-[1.05]" alt="Energy Calculator" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Yield & Backup Analytics</span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            Energy <br className="hidden md:block" />Calculator
          </h1>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="sticky top-[70px] z-30 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-3">
            <button onClick={() => setActiveTab('solar')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 ${activeTab === 'solar' ? 'bg-yellow-400 text-black shadow-md' : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'}`}>
              <Sun className="w-4 h-4" /> Solar Calculator
            </button>
            <button onClick={() => setActiveTab('power')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-200 ${activeTab === 'power' ? 'bg-yellow-400 text-black shadow-md' : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'}`}>
              <Battery className="w-4 h-4" /> Power Backup
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'solar' ? <SolarCalculatorBody /> : <PowerCalculator />}
    </div>
  );
};

export default Calculator;
