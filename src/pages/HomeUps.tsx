import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Zap, Battery, Home, ArrowRight, ShieldCheck, CheckCircle2,
  Monitor, Tv, Users, Building2,
  PhoneCall, Settings, FileText, Wrench, Play, ChevronDown,
  Activity, Clock, Layers, X
} from 'lucide-react';


const HomeUps: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does backup last?",
      a: "Backup duration depends on battery capacity and load usage. We custom-size your system based on the appliances you need to run and for how long."
    },
    {
      q: "Is it safe for home use?",
      a: "Yes, modern home UPS systems include comprehensive safety features — overload protection, short circuit protection, and automatic switching — making them completely safe for residential use."
    },
    {
      q: "Can it run all appliances?",
      a: "Essential appliances can be supported based on system capacity. We design systems to run lights, fans, TV, Wi-Fi, and more. Heavy loads like ACs require larger capacity systems."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen overflow-x-hidden">

      {/* ── HERO + STAT STRIP ── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/home_ups_hero.png"
            className="w-full h-full object-cover object-center"
            alt="Home UPS System"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8">
          <div className="max-w-7xl mx-auto text-center w-full">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
              <Home className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Residential Backup Power</span>
            </div>

            <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Home UPS<br />
              <span className="text-yellow-400">System</span>
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
              Reliable Power Backup for Everyday Comfort. Keep your lights, fans, and essential appliances running without interruption during power cuts.
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

        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: "Instant", label: "Backup Switching" },
                { value: "Silent", label: "Operation" },
                { value: "Safe", label: "Stable Voltage" },
                { value: "Custom", label: "Load Sizing" },
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

      {/* ── INTRO ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40 border border-white/5">
              <img
                src="/images/home_ups_support.png"
                alt="Home UPS system installed"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-5">Comfort & Continuity for Your Home</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                Power That Keeps<br />
                <span className="text-yellow-400">Your Home Running.</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-6">
                A Home UPS System provides uninterrupted power supply during outages by storing energy in batteries and supplying it instantly when needed. It ensures your daily routine is not disturbed.
              </p>
              <p className="text-zinc-500 leading-relaxed font-light mb-10">
                Spectrum Powers offers customized UPS solutions based on your home's power requirements — ensuring optimal performance and efficiency for every family.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Switching Time", value: "Instant" },
                  { label: "Output Type", value: "Pure Sine Wave" },
                  { label: "Noise Level", value: "Silent" },
                  { label: "Customization", value: "Load-Based" },
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

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Mechanism</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">How Home UPS Works</h2>
          </div>

          <div className="hidden md:grid grid-cols-5 gap-0 relative reveal">
            <div className="absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-yellow-400/20 via-yellow-400 to-yellow-400/20" />
            {[
              { step: '01', icon: Zap, title: 'Charge', desc: 'Electricity charges the UPS battery.' },
              { step: '02', icon: Battery, title: 'Store', desc: 'UPS stores energy efficiently in battery.' },
              { step: '03', icon: Activity, title: 'Detect', desc: 'Power cut detected instantly.' },
              { step: '04', icon: Clock, title: 'Switch', desc: 'UPS instantly supplies backup power.' },
              { step: '05', icon: Home, title: 'Run', desc: 'Appliances continue running smoothly.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 group">
                <div className="w-24 h-24 rounded-full bg-zinc-950 border-2 border-yellow-400 flex items-center justify-center mb-6 relative z-10 group-hover:bg-yellow-400 group-hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300">
                  <item.icon className="w-8 h-8 text-yellow-400 group-hover:text-black transition-colors" />
                </div>
                <div className="text-yellow-400/50 text-[10px] font-black tracking-widest mb-1">{item.step}</div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-0">
            {[
              { step: '01', icon: Zap, title: 'Charge', desc: 'Electricity charges the UPS battery.' },
              { step: '02', icon: Battery, title: 'Store', desc: 'UPS stores energy efficiently in battery.' },
              { step: '03', icon: Activity, title: 'Detect', desc: 'Power cut detected instantly.' },
              { step: '04', icon: Clock, title: 'Switch', desc: 'UPS instantly supplies backup power.' },
              { step: '05', icon: Home, title: 'Run', desc: 'Appliances continue running smoothly.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-yellow-400 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  {i < 4 && <div className="w-[2px] flex-1 bg-yellow-400/30 my-2" />}
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

      {/* ── BENTO BENEFITS ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Why Home UPS</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Key Benefits</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 reveal bg-yellow-400 rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] lg:min-h-[400px] group hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] transition-all">
              <Zap className="w-12 h-12 text-black" />
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-widest mb-2">Instant Response</div>
                <h3 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">No Interruption<br />in Daily Life</h3>
                <p className="text-black/60 text-sm mt-3 font-medium">Switches to battery power in milliseconds — your family doesn't even notice the power cut.</p>
              </div>
            </div>

            {[
              { icon: Home, title: "Supports Home Appliances", desc: "Lights, fans, TV, Wi-Fi and more — all kept running during outages." },
              { icon: ShieldCheck, title: "Safe & Stable Voltage", desc: "Pure sine wave output protects all sensitive electronics in your home." },
              { icon: Layers, title: "Customizable Capacity", desc: "Sized perfectly for your home's load — from basic to advanced setups." },
              { icon: Clock, title: "Affordable Solution", desc: "Best value power backup for residential use with long-lasting performance." },
              { icon: Activity, title: "Smart Charging", desc: "Intelligent battery charging system extends battery lifespan significantly." },
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

      {/* ── BACKUP CAPACITY GUIDE + COMPARISON ── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">The Numbers</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Choose the Right UPS</h2>
          </div>

          {/* Capacity Guide */}
          <div className="reveal grid md:grid-cols-3 gap-4 mb-12">
            {[
              { tier: "Basic", icon: "💡", items: "Lights & Fans", capacity: "600VA–850VA", desc: "Keeps 4–6 lights and 2–3 fans running" },
              { tier: "Medium", icon: "📺", items: "Lights + TV + Wi-Fi", capacity: "1kVA–2kVA", desc: "For typical family needs during cuts" },
              { tier: "Advanced", icon: "❄️", items: "Includes AC + more", capacity: "3kVA–5kVA+", desc: "Complete home backup including heavy loads" },
            ].map((t, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${i === 1 ? 'bg-yellow-400 border-yellow-400' : 'bg-zinc-950 border-white/5'}`}>
                <div className="text-3xl mb-3">{t.icon}</div>
                <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${i === 1 ? 'text-black/50' : 'text-yellow-400'}`}>{t.tier}</div>
                <div className={`font-black text-lg uppercase tracking-tight mb-2 ${i === 1 ? 'text-black' : 'text-white'}`}>{t.items}</div>
                <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${i === 1 ? 'text-black/70' : 'text-yellow-400/70'}`}>{t.capacity}</div>
                <p className={`text-sm ${i === 1 ? 'text-black/60' : 'text-zinc-500'}`}>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="reveal bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 border-b border-white/5">
              <div className="py-4 px-4 md:px-8 text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Feature</div>
              <div className="py-4 px-4 md:px-8 text-center text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-x border-white/5">No Backup</div>
              <div className="py-4 px-4 md:px-8 text-center bg-yellow-400/5">
                <span className="text-yellow-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Home UPS ✦</span>
              </div>
            </div>
            {[
              { feature: "During Power Cuts", traditional: "Complete darkness", ups: "All essentials run" },
              { feature: "Switching Time", traditional: "Manual generators", ups: "Instant automatic" },
              { feature: "Noise Level", traditional: "Generator noise", ups: "Silent operation" },
              { feature: "Fuel Cost", traditional: "Generator fuel daily", ups: "Zero fuel needed" },
              { feature: "Safety", traditional: "Risk of damage", ups: "Protected output" },
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
                    {row.ups}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12 reveal">
            <a href="/contact" className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.25)] text-sm">
              Get Custom UPS Solution — Free
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL FEATURES ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Engineering</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8">Advanced<br />Features</h2>
              <p className="text-zinc-400 leading-relaxed mb-8 md:mb-10">
                Spectrum Powers Home UPS systems are engineered with cutting-edge technology for maximum reliability and appliance safety.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Pure Sine Wave Output", "Smart Battery Charging", "Overload Protection",
                  "Short Circuit Protection", "Automatic Switching", "Energy-Efficient",
                  "LED Status Indicators", "Low Battery Alarm", "Compact Design",
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
                src="/images/home_ups_support.png"
                alt="Home UPS system detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PERFECT FOR ── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 md:gap-12 items-start">
            <div className="lg:col-span-3 reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Applications</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-10">Perfect For</h2>
              <div className="rounded-[2rem] overflow-hidden aspect-video border border-white/5 shadow-2xl">
                <img
                  src="/images/home_ups_support.png"
                  alt="Home UPS usage scenarios"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {[
                { icon: Home, label: "Independent Houses", sub: "Full-home backup solutions" },
                { icon: Building2, label: "Apartments", sub: "Compact, wall-friendly units" },
                { icon: Users, label: "Families with Daily Power Needs", sub: "Non-stop routine for the family" },
                { icon: Monitor, label: "Work-From-Home Setups", sub: "No dropped calls or lost work" },
                { icon: Tv, label: "Entertainment & Home Appliances", sub: "Keep TV, music and AC running" },
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

      {/* ── EXPERIENCE QUOTE ── */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10 reveal">
          <div className="text-7xl md:text-8xl text-yellow-400/20 font-black leading-none mb-4">"</div>
          <h2 className="text-2xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 leading-tight">
            Stay Comfortable<br />During Power Cuts
          </h2>
          <p className="text-zinc-400 text-base md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            With Spectrum Powers Home UPS Systems, enjoy uninterrupted comfort — whether you're working, relaxing, or spending time with family. No interruption. No noise. No fuel.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { icon: Zap, text: "No interruption" },
              { icon: Clock, text: "Smooth switching" },
              { icon: Battery, text: "Silent operation" },
            ].map((pill, i) => (
              <div key={i} className="flex items-center gap-2 bg-zinc-900/80 border border-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
                <pill.icon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-xs md:text-sm font-black uppercase tracking-wider">{pill.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALLATION TIMELINE ── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 md:mb-20 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Process</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Installation</h2>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-14 bottom-14 w-[2px] bg-gradient-to-b from-yellow-400/80 via-yellow-400/40 to-transparent hidden md:block -z-10" />
            <div className="space-y-5">
              {[
                { title: "Requirement Analysis", desc: "Engineer assesses your home's load profile and power cut frequency.", icon: Settings },
                { title: "Load Calculation", desc: "We calculate exactly which appliances to support and for how long.", icon: FileText },
                { title: "System Selection", desc: "Right UPS capacity and battery selected for your specific needs.", icon: Activity },
                { title: "Installation & Setup", desc: "Clean installation with proper wiring, earthing and safety testing.", icon: Wrench },
                { title: "Testing & Support", desc: "Full commissioning, hand-over demo and ongoing support program.", icon: Play },
              ].map((step, i) => (
                <div key={i} className="reveal flex gap-4 md:gap-6 group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-zinc-950 border-2 border-yellow-400/50 flex items-center justify-center relative z-[1] group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all">
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

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Questions</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Frequently Asked</h2>
            <p className="text-zinc-400 font-light text-base md:text-lg">Everything you need to know about Home UPS Systems.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 ${activeFaq === i ? 'border-yellow-400/40' : 'border-white/5'}`}>
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

      {/* ── FINAL CTA ── */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto reveal">
          <div className="relative bg-yellow-400 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-black/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-black/5 rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Power your home</div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-black leading-[0.9]">
                  Power Without<br />Interruptions.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                <a href="/contact" className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl text-sm">
                  Get Free Consultation <ArrowRight className="w-4 h-4" />
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

export default HomeUps;
