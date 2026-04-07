import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Battery, Zap, ArrowRight, ShieldCheck, CheckCircle2,
  Home, Building2, MonitorSmartphone, Monitor, ShoppingBag,
  PhoneCall, Settings, FileText, Wrench, Play, ChevronDown,
  Clock, Layers, Activity, X
} from 'lucide-react';

const LithiumUps: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does a lithium battery last?",
      a: "Typically 5–10 years depending on usage. Lithium LFP batteries offer up to 4000+ charge cycles, significantly outlasting traditional lead-acid batteries."
    },
    {
      q: "Is maintenance required?",
      a: "No, lithium UPS systems are 100% maintenance-free. There is no need for water topping, cleaning corrosion, or periodic checkups like traditional tubular batteries."
    },
    {
      q: "Can it run heavy appliances?",
      a: "Yes, depending on system capacity. We engineer systems capable of handling everything from standard routers and lights to heavy IT setups and critical business loads."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen overflow-x-hidden">

      {/* ── HERO + STAT STRIP (integrated) ───────────────────────────────── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/lithium_hero.png"
            className="w-full h-full object-cover object-center"
            alt="Lithium Inbuilt UPS System"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
        </div>

        {/* Hero content — fills remaining height */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8">
          <div className="max-w-7xl mx-auto text-center w-full">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
              <Battery className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Zero-Switch Technology</span>
            </div>

            <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Lithium Inbuilt<br />
              <span className="text-yellow-400">UPS System</span>
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
              Smart, Compact & Long-Lasting Power Backup. One unit. Zero downtime. Zero maintenance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="/contact" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                <ArrowRight className="w-5 h-5" />
                Get Free Quote
              </a>
              <a href="tel:+919745660055" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-9 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                <PhoneCall className="w-5 h-5" />
                Call Now
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-yellow-400" />Lithium Technology</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-yellow-400" />Compact Design</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-yellow-400" />Zero Maintenance</div>
            </div>
          </div>
        </div>

        {/* ── STAT STRIP — anchored to hero bottom ── */}
        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: "4000+", label: "Charge Cycles" },
                { value: "<10ms", label: "Switch Time" },
                { value: "10 Yrs", label: "Battery Life" },
                { value: "Zero", label: "Maintenance" },
              ].map((stat, i) => (
                <div key={i} className={`py-6 px-4 text-center ${i < 3 ? 'border-r border-black/10' : ''}`}>
                  <div className="text-2xl md:text-4xl font-black text-black tracking-tighter leading-none">{stat.value}</div>
                  <div className="text-black/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO — SPLIT LAYOUT ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40 border border-white/5">
              <img
                src="/images/lithium_intro.png"
                alt="Lithium UPS technician with homeowner"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-5">Next-Generation Solution</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                All-in-one.<br />
                <span className="text-yellow-400">Always On.</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-6">
                A Lithium Inbuilt UPS System integrates the inverter and lithium battery into one compact, wall-mountable unit. Faster charging, longer life, zero maintenance.
              </p>
              <p className="text-zinc-500 leading-relaxed font-light mb-10">
                Spectrum Powers delivers advanced lithium UPS systems engineered for efficiency, reliability, and space-saving installation — trusted by homes and businesses across Kerala.
              </p>

              {/* Mini stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Lifespan", value: "5–10+ Years" },
                  { label: "Charge Cycles", value: "4,000+" },
                  { label: "Switch Time", value: "< 10ms" },
                  { label: "Maintenance", value: "Zero" },
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-4 hover:border-yellow-400/20 transition-colors">
                    <div className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">{s.label}</div>
                    <div className="text-white font-black text-xl tracking-tight">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — FLOW STEPPER ──────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Mechanism</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">How It Works</h2>
          </div>

          {/* Desktop flow */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative reveal">
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-yellow-400/20 via-yellow-400 to-yellow-400/20" />
            {[
              { step: '01', icon: Zap, title: 'Charge', desc: 'Grid charges the lithium battery at high speed.' },
              { step: '02', icon: Battery, title: 'Store', desc: 'Energy stored efficiently with BMS protection.' },
              { step: '03', icon: Activity, title: 'Switch', desc: 'Power cut detected. Backup activates in <10ms.' },
              { step: '04', icon: CheckCircle2, title: 'Run', desc: 'Appliances continue without a flicker.' },
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

          {/* Mobile flow — vertical */}
          <div className="md:hidden space-y-0">
            {[
              { step: '01', icon: Zap, title: 'Charge', desc: 'Grid charges the lithium battery at high speed.' },
              { step: '02', icon: Battery, title: 'Store', desc: 'Energy stored efficiently with BMS protection.' },
              { step: '03', icon: Activity, title: 'Switch', desc: 'Power cut detected. Backup activates in <10ms.' },
              { step: '04', icon: CheckCircle2, title: 'Run', desc: 'Appliances continue without a flicker.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  {i < 3 && <div className="w-[2px] flex-1 bg-yellow-400/30 my-2" />}
                </div>
                <div className="pb-8 pt-1">
                  <div className="text-yellow-400/50 text-[9px] font-black tracking-widest mb-0.5">{item.step}</div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO BENEFITS GRID ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Why Lithium</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Key Benefits</h2>
          </div>

          {/* Mobile: simple grid; Desktop: bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large hero card — full width on mobile, spans lg col */}
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 reveal bg-yellow-400 rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] lg:min-h-[400px] group hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] transition-all">
              <Zap className="w-12 h-12 text-black" />
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-widest mb-2">Instant Response</div>
                <h3 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">Zero Delay<br />Backup</h3>
                <p className="text-black/60 text-sm mt-3 font-medium">Switches to battery power in under 10 milliseconds — imperceptible to any device.</p>
              </div>
            </div>

            {[
              { icon: Clock, title: "5–10+ Year Life", desc: "4,000+ charge cycles — no replacement for a decade." },
              { icon: Layers, title: "Compact Unit", desc: "Inverter + battery in one sleek, wall-mountable form factor." },
              { icon: Settings, title: "Zero Maintenance", desc: "No water topping, no terminal cleaning. Ever." },
              { icon: ShieldCheck, title: "Smart BMS", desc: "Built-in Battery Management System protects against overcharge, overdischarge & heat." },
              { icon: Activity, title: "Pure Sine Wave", desc: "Clean power output — safe for all sensitive electronics." },
            ].map((benefit, i) => (
              <div key={i} className="reveal bg-zinc-900 border border-white/5 rounded-[2rem] p-6 md:p-7 flex flex-col gap-4 hover:border-yellow-400/30 hover:bg-zinc-900/80 transition-all group" style={{ transitionDelay: `${i * 80}ms` }}>
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
      <section className="py-24 md:py-32 px-6 bg-zinc-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">The Upgrade</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Why Switch to Lithium?</h2>
          </div>

          <div className="reveal bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-white/5">
              <div className="py-4 px-4 md:px-8 text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Feature</div>
              <div className="py-4 px-4 md:px-8 text-center text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-x border-white/5">Traditional</div>
              <div className="py-4 px-4 md:px-8 text-center bg-yellow-400/5">
                <span className="text-yellow-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Lithium ✦</span>
              </div>
            </div>

            {[
              { feature: "Charging Time", traditional: "10–12 Hours", lithium: "2–4 Hours" },
              { feature: "Battery Lifespan", traditional: "3–4 Years", lithium: "5–10+ Years" },
              { feature: "Charge Cycles", traditional: "~500", lithium: "4,000+" },
              { feature: "Maintenance", traditional: "Monthly top-up", lithium: "Zero" },
              { feature: "Form Factor", traditional: "Bulky units", lithium: "All-in-one" },
              { feature: "Switch Time", traditional: "20–30ms", lithium: "< 10ms" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/5 last:border-0">
                <div className="py-4 px-4 md:px-8 text-xs md:text-sm font-semibold text-zinc-300">{row.feature}</div>
                <div className="py-4 px-4 md:px-8 text-center border-x border-white/5">
                  <span className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm text-zinc-500">
                    <X className="w-3 h-3 text-red-500/70 flex-shrink-0" />
                    <span className="hidden sm:inline">{row.traditional}</span>
                  </span>
                </div>
                <div className="py-4 px-4 md:px-8 text-center bg-yellow-400/5">
                  <span className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm text-white font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                    {row.lithium}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12 reveal">
            <a href="/contact" className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.25)] text-sm">
              Upgrade Now — Free Assessment
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── ADVANCED FEATURES — PILL TAGS ───────────────────────────────── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Engineering</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8">Advanced<br />Features</h2>
              <p className="text-zinc-400 leading-relaxed mb-8 md:mb-10">
                Every Spectrum Powers Lithium UPS system is engineered with cutting-edge components and intelligent management software for maximum reliability.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Inbuilt Lithium Battery", "Smart BMS", "Pure Sine Wave Output",
                  "Rapid Charging", "Overload Protection", "Short Circuit Protection",
                  "Silent Operation", "Wall Mountable", "LED Diagnostics",
                ].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:border-yellow-400/40 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all cursor-default">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,0.8)] flex-shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl border border-white/5" style={{ transitionDelay: '150ms' }}>
              <img
                src="/images/lithium_tech.png"
                alt="Lithium UPS unit close up"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PERFECT FOR — SPLIT LAYOUT ───────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 md:gap-12 items-start">
            {/* Left: heading + image */}
            <div className="lg:col-span-3 reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Applications</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-10">Perfect For</h2>
              <div className="rounded-[2rem] overflow-hidden aspect-video border border-white/5 shadow-2xl">
                <img
                  src="/images/lithium_lifestyle.png"
                  alt="Ideal installation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right: icon card stack */}
            <div className="lg:col-span-2 space-y-3">
              {[
                { icon: Home, label: "Modern Homes & Apartments", sub: "Seamless backup for every room" },
                { icon: MonitorSmartphone, label: "Work-From-Home Setups", sub: "No dropped calls. No lost work." },
                { icon: Building2, label: "Offices & Small Businesses", sub: "Mission-critical uptime" },
                { icon: ShoppingBag, label: "Retail Stores", sub: "Never lose a billing moment" },
                { icon: Monitor, label: "IT & Digital Workspaces", sub: "Protect servers and workstations" },
              ].map((item, i) => (
                <div key={i} className="reveal flex items-center gap-4 bg-zinc-950 border border-white/5 rounded-2xl p-4 md:p-5 hover:border-yellow-400/30 hover:bg-zinc-900/60 transition-all group" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-11 h-11 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
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

      {/* ── EXPERIENCE — CINEMATIC QUOTE ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10 reveal">
          <div className="text-7xl md:text-8xl text-yellow-400/20 font-black leading-none mb-4">"</div>
          <h2 className="text-2xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 leading-tight">
            Seamless Backup for<br />Modern Living
          </h2>
          <p className="text-zinc-400 text-base md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            From lights and fans to laptops and Wi-Fi — enjoy uninterrupted power without noise, delay, or maintenance.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { icon: Zap, text: "Instant switching" },
              { icon: Battery, text: "Silent performance" },
              { icon: Clock, text: "Reliable backup" },
            ].map((pill, i) => (
              <div key={i} className="flex items-center gap-2 bg-zinc-900/80 border border-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
                <pill.icon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-xs md:text-sm font-black uppercase tracking-wider">{pill.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALLATION TIMELINE ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 md:mb-20 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Process</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Installation</h2>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-14 bottom-14 w-[2px] bg-gradient-to-b from-yellow-400/80 via-yellow-400/40 to-transparent hidden md:block" />
            <div className="space-y-5">
              {[
                { title: "Requirement Analysis", desc: "Our engineer reviews your power consumption and load requirements.", icon: Activity },
                { title: "System Selection", desc: "We design and select the ideal system capacity for your needs.", icon: FileText },
                { title: "Installation & Setup", desc: "Clean, professional installation with full cable management.", icon: Wrench },
                { title: "Testing & Demonstration", desc: "Full load testing and a walkthrough of the system features.", icon: Play },
                { title: "Support & Service", desc: "Ongoing technical support and health check programs.", icon: Settings },
              ].map((step, i) => (
                <div key={i} className="reveal flex gap-4 md:gap-6 group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-zinc-950 border-2 border-yellow-400/50 flex items-center justify-center relative z-10 group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all">
                    <step.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-zinc-950 border border-white/5 rounded-2xl p-5 md:p-6 group-hover:border-yellow-400/20 transition-all">
                    <div className="text-yellow-400/50 text-[9px] font-black uppercase tracking-widest mb-1">Phase {i + 1}</div>
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-1">{step.title}</h3>
                    <p className="text-zinc-500 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Questions</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Frequently Asked</h2>
            <p className="text-zinc-400 font-light text-base md:text-lg">Everything you need to know about Lithium UPS technology.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`reveal bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 ${activeFaq === i ? 'border-yellow-400/40' : 'border-white/5'}`}>
                <button
                  className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-bold text-base md:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-yellow-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-6 border-t border-yellow-400/20 pt-4">
                    <p className="text-zinc-400 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto reveal">
          <div className="relative bg-yellow-400 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-black/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-black/5 rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Ready to upgrade?</div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-black leading-[0.9]">
                  Upgrade your<br />backup today.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                <a href="/contact" className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl text-sm">
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:+919745660055" className="bg-white/30 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/40 transition-all flex items-center justify-center gap-2 border border-black/10 text-sm">
                  <PhoneCall className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LithiumUps;
