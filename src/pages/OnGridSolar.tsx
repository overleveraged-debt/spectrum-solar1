import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Sun, Zap, ArrowRight, ShieldCheck, CheckCircle2,
  Home, Building2, GraduationCap, Hospital, Factory,
  PhoneCall, Settings, FileText, Wrench, Play, ChevronDown,
  Activity, Battery, TrendingUp, Leaf, X
} from 'lucide-react';

const OnGridSolar: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is net metering?",
      a: "Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. It allows you to export excess electricity generated during the day and get bill credits, effectively reducing your overall energy costs."
    },
    {
      q: "What is the lifespan of an on-grid system?",
      a: "Our high-efficiency Mono PERC solar panels come with a 25+ year performance lifespan. Inverters typically last 10–15 years and can be easily replaced, ensuring decades of reliable power generation."
    },
    {
      q: "Is maintenance required?",
      a: "Very minimal maintenance is required. Since there are no moving parts and no batteries involved in a standard on-grid system, periodic cleaning of the solar panels (every few months) to remove dust is usually sufficient."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen overflow-x-hidden">

      {/* ── HERO + STAT STRIP (integrated) ───────────────────────────────── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ongrid_hero_wide.png"
            className="w-full h-full object-cover object-center"
            alt="On-Grid Solar System"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-950" />
        </div>

        {/* Hero content — fills remaining height */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8">
          <div className="max-w-7xl mx-auto text-center w-full">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Grid-Connected · Net Metering</span>
            </div>

            <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              On-Grid<br />
              <span className="text-yellow-400">Solar System</span>
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
              Reduce electricity bills to near zero. Feed excess power to the grid. Start earning from the sun.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                <ArrowRight className="w-5 h-5" />
                Get Free Quote
              </a>
              <a href="tel:+919745660055" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-9 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                <PhoneCall className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* ── STAT STRIP — anchored to hero bottom ── */}
        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: "90%", label: "Bill Reduction" },
                { value: "25 Yrs", label: "Panel Warranty" },
                { value: "3–4 Yrs", label: "ROI Period" },
                { value: "1000+", label: "Kerala Installations" },
              ].map((stat, i) => (
                <div key={i} className={`py-6 md:py-8 px-4 text-center ${i < 3 ? 'border-r border-black/10' : ''}`}>
                  <div className="text-2xl md:text-4xl font-black text-black tracking-tighter leading-none">{stat.value}</div>
                  <div className="text-black/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO — SPLIT LAYOUT ─────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Content — left on this page for variety */}
            <div className="reveal order-2 lg:order-1">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-5">Smart Solar Solution</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                Grid-tied.<br />
                <span className="text-yellow-400">Always Saving.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed font-light mb-6">
                An On-Grid Solar System connects directly to the electricity grid. You use solar power during the day and automatically export excess energy back to KSEB — earning credits through net metering.
              </p>
              <p className="text-zinc-500 leading-relaxed font-light mb-10">
                This makes it the most cost-effective and fastest-ROI solar solution available — with zero battery costs and minimal maintenance.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "System Capacity Range", value: "3kW – 500kW+" },
                  { label: "Grid Connection", value: "Net-Metered" },
                  { label: "Panel Warranty", value: "25 Years" },
                  { label: "ROI Period", value: "3–4 Years" },
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-4 hover:border-yellow-400/20 transition-colors">
                    <div className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">{s.label}</div>
                    <div className="text-white font-black text-xl tracking-tight">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40 border border-white/5 order-1 lg:order-2" style={{ transitionDelay: '150ms' }}>
              <img
                src="/images/ongrid_intro.png"
                alt="On-Grid Solar installation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — FLOW STEPPER ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Mechanism</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">How It Works</h2>
          </div>

          {/* Desktop flow */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative reveal">
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-yellow-400/20 via-yellow-400 to-yellow-400/20" />
            {[
              { step: '01', icon: Sun, title: 'Generate', desc: 'Solar panels convert sunlight into DC electricity.' },
              { step: '02', icon: Zap, title: 'Convert', desc: 'Inverter converts DC to AC for home use.' },
              { step: '03', icon: Activity, title: 'Consume', desc: 'Power is used in your home or business first.' },
              { step: '04', icon: TrendingUp, title: 'Export', desc: 'Excess power exported to KSEB grid for credits.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-6 group">
                <div className="w-24 h-24 rounded-full bg-zinc-950 border-2 border-yellow-400 flex items-center justify-center mb-6 relative z-10 group-hover:bg-yellow-400 group-hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300">
                  <item.icon className="w-8 h-8 text-yellow-400 group-hover:text-black transition-colors" />
                </div>
                <div className="text-yellow-400/50 text-[10px] font-black tracking-widest mb-1">{item.step}</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile flow */}
          <div className="md:hidden space-y-0">
            {[
              { step: '01', icon: Sun, title: 'Generate', desc: 'Solar panels convert sunlight into DC electricity.' },
              { step: '02', icon: Zap, title: 'Convert', desc: 'Inverter converts DC to AC for home use.' },
              { step: '03', icon: Activity, title: 'Consume', desc: 'Power is used in your home or business first.' },
              { step: '04', icon: TrendingUp, title: 'Export', desc: 'Excess power exported to KSEB grid for credits.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  {i < 3 && <div className="w-[2px] flex-1 bg-yellow-400/30 my-2" />}
                </div>
                <div className="pb-10">
                  <div className="text-yellow-400/50 text-[9px] font-black tracking-widest mb-0.5">{item.step}</div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Wide image below stepper */}
          <div className="reveal rounded-[2rem] overflow-hidden border border-white/10 mt-16 shadow-2xl aspect-video xl:aspect-[21/9]">
            <img
              src="/images/ongrid_working.png"
              alt="On-Grid Solar Energy Flow"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── BENTO BENEFITS GRID ──────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Advantages</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Key Benefits</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {/* Large hero card */}
            <div className="col-span-2 lg:col-span-1 lg:row-span-2 reveal bg-yellow-400 rounded-[2rem] p-8 flex flex-col justify-between min-h-[280px] lg:min-h-0 group hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] transition-all">
              <TrendingUp className="w-12 h-12 text-black" />
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-widest mb-2">Maximum ROI</div>
                <h3 className="text-black text-3xl font-black uppercase tracking-tight leading-tight">Save Up to<br />90% on Bills</h3>
                <p className="text-black/60 text-sm mt-3 font-medium">Break even in 3–4 years. Then enjoy 20+ years of near-free electricity.</p>
              </div>
            </div>

            {[
              { icon: Battery, title: "No Battery Cost", desc: "On-grid systems require no battery storage — lower upfront costs and simpler maintenance." },
              { icon: Activity, title: "Real-Time Monitoring", desc: "Track your generation, consumption and exports from any device, 24/7." },
              { icon: Leaf, title: "Eco Certified", desc: "Government subsidy eligible. Reduce your carbon footprint while saving money." },
              { icon: ShieldCheck, title: "25-Year Warranty", desc: "Industry-leading panel warranty backed by the world's top manufacturers." },
              { icon: Sun, title: "Net Metering", desc: "Export excess power → earn credits → reduce your KSEB bill to near zero." },
            ].map((benefit, i) => (
              <div key={i} className="reveal bg-zinc-900 border border-white/5 rounded-[2rem] p-7 flex flex-col gap-4 hover:border-yellow-400/30 hover:bg-zinc-900/80 transition-all group" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-11 h-11 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight text-base mb-1">{benefit.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH COMPARISON ────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-zinc-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">The Numbers</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Grid Solar vs Grid Power</h2>
          </div>

          <div className="reveal bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 border-b border-white/5">
              <div className="py-5 px-8 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Category</div>
              <div className="py-5 px-8 text-center text-zinc-500 text-[10px] font-black uppercase tracking-widest border-x border-white/5">Normal Grid Power</div>
              <div className="py-5 px-8 text-center bg-yellow-400/5">
                <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">On-Grid Solar ✦</span>
              </div>
            </div>

            {[
              { feature: "Monthly Electricity Bill", traditional: "₹3,000–₹20,000+", solar: "Near Zero" },
              { feature: "25-Year Total Cost", traditional: "₹9L – ₹60L+", solar: "One-time investment" },
              { feature: "Carbon Footprint", traditional: "High — grid energy", solar: "Zero emissions" },
              { feature: "Government Subsidy", traditional: "None", solar: "Up to 40% available" },
              { feature: "System Lifespan", traditional: "Ongoing dependency", solar: "25+ Year panels" },
              { feature: "Energy Independence", traditional: "100% grid dependent", solar: "Day-time independent" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                <div className="py-5 px-8 text-sm font-semibold text-zinc-300">{row.feature}</div>
                <div className="py-5 px-8 text-center border-x border-white/5">
                  <span className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                    <X className="w-3.5 h-3.5 text-red-500/70 flex-shrink-0" />
                    {row.traditional}
                  </span>
                </div>
                <div className="py-5 px-8 text-center bg-yellow-400/5">
                  <span className="flex items-center justify-center gap-2 text-sm text-white font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                    {row.solar}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <a href="/contact" className="inline-flex items-center gap-3 bg-yellow-400 text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.25)]">
              Calculate My Savings — Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL FEATURES — PILL TAGS ───────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl border border-white/5">
              <img
                src="/images/ongrid_perfect.png"
                alt="On-grid solar technical detail"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Engineering</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">Technical<br />Features</h2>
              <p className="text-zinc-400 leading-relaxed mb-10">
                Every Spectrum Powers on-grid system is built with certified, premium components for decades of reliable power generation.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Mono PERC Solar Panels",
                  "String / Micro Inverters",
                  "Net Metering Compatible",
                  "Lightning Protection",
                  "Surge Protection",
                  "AC/DC Wiring with Grounding",
                  "Remote Monitoring",
                  "App-Based Dashboard",
                  "Govt Subsidy Ready",
                  "KSEB Approved",
                ].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:border-yellow-400/40 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all cursor-default">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERFECT FOR — SPLIT LAYOUT ───────────────────────────────────── */}
      <section className="py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Applications</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">Perfect For</h2>
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] border border-white/5 shadow-2xl">
                <img
                  src="/images/ongrid_applications_demo.png"
                  alt="Solar panel installations"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: Home, label: "Homes & Apartments", sub: "Zero electricity bills for your family" },
                { icon: Building2, label: "Offices & Shops", sub: "Slash your operating costs dramatically" },
                { icon: GraduationCap, label: "Schools & Colleges", sub: "Power institutions with clean energy" },
                { icon: Hospital, label: "Hospitals & Hotels", sub: "Reliable power for critical operations" },
                { icon: Factory, label: "Industrial Buildings", sub: "Large-scale savings at 500kW+" },
              ].map((item, i) => (
                <div key={i} className="reveal flex items-center gap-4 bg-zinc-950 border border-white/5 rounded-2xl p-5 hover:border-yellow-400/30 hover:bg-zinc-900/60 transition-all group" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-black text-sm uppercase tracking-tight">{item.label}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTALLATION TIMELINE ────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Process</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Our Installation Process</h2>
          </div>

          <div className="relative">
            <div className="absolute left-[27px] top-14 bottom-14 w-[2px] bg-gradient-to-b from-yellow-400/80 via-yellow-400/40 to-transparent hidden md:block" />
            <div className="space-y-6">
              {[
                { title: "Site Inspection", desc: "Our certified engineer visits your property and assesses your roof, shadow-free area, and existing load requirements.", icon: Settings },
                { title: "System Design", desc: "Custom system design based on your monthly bill, roof area and energy goals — optimal panel and inverter sizing.", icon: FileText },
                { title: "Approval & Documentation", desc: "We handle all KSEB net-metering applications, structural approvals and government subsidy paperwork.", icon: ShieldCheck },
                { title: "Installation", desc: "Professional panel mounting, cable management and inverter installation by our certified engineers.", icon: Wrench },
                { title: "Testing & Activation", desc: "Full system commissioning, performance testing and a personal demonstration of your monitoring app.", icon: Play },
              ].map((step, i) => (
                <div key={i} className="reveal flex gap-6 group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-zinc-950 border-2 border-yellow-400/50 flex items-center justify-center relative z-10 group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all">
                    <step.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-zinc-900 border border-white/5 rounded-2xl p-6 group-hover:border-yellow-400/20 transition-all">
                    <div className="text-yellow-400/50 text-[9px] font-black uppercase tracking-widest mb-1">Phase {i + 1}</div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-1">{step.title}</h3>
                    <p className="text-zinc-500 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-zinc-900/40 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Questions</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Frequently Asked</h2>
            <p className="text-zinc-400 font-light text-lg">Everything you need to know about On-Grid Solar.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`reveal bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 ${activeFaq === i ? 'border-yellow-400/40' : 'border-white/5'}`}
              >
                <button
                  className="w-full text-left px-8 py-6 flex items-center justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-yellow-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-6 border-t border-yellow-400/20 pt-4">
                    <p className="text-zinc-400 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto reveal">
          <div className="relative bg-yellow-400 rounded-[3rem] p-12 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Start saving today</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-[0.9]">
                  Ready to go<br />solar?
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="/contact"
                  className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-xl"
                >
                  Get Free Site Audit
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="tel:+919745660055"
                  className="bg-white/30 text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/40 transition-all flex items-center gap-2 border border-black/10"
                >
                  <PhoneCall className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OnGridSolar;
