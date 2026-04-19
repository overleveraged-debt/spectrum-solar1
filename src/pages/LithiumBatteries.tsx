import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Zap, Battery, Activity, ArrowRight, ShieldCheck, CheckCircle2,
  Home, Building2, Sun, Server,
  PhoneCall, ChevronDown,
  Clock, Layers, X, Cpu
} from 'lucide-react';



const LithiumBatteries: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long do lithium batteries last?",
      a: "Lithium LFP batteries typically last 8–12 years with 4,000–6,000 charge cycles. This is 3–4 times longer than traditional lead-acid tubular batteries."
    },
    {
      q: "Are they safe?",
      a: "Yes. Lithium LFP (Lithium Iron Phosphate) chemistry is the safest lithium chemistry available. Combined with advanced BMS protection, they are stable, non-flammable and completely safe for indoor installation."
    },
    {
      q: "Can they work with existing inverters?",
      a: "Yes, with compatible inverters. Our team will assess your existing inverter and advise on compatibility. In many cases, a lithium-compatible inverter upgrade provides the best results."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen overflow-x-hidden">

      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/lithium_battery_hero.png" className="w-full h-full object-cover object-center" alt="Lithium Batteries" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8">
          <div className="max-w-7xl mx-auto text-center w-full">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
              <Battery className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Advanced Energy Storage</span>
            </div>
            <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Lithium<br /><span className="text-yellow-400">Batteries</span>
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
              Long-Life, High-Performance Energy Storage. The smarter battery upgrade — longer life, faster charging, and more cycles than ever before.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                <ArrowRight className="w-5 h-5" />Get Free Quote
              </a>
              <a href="tel:+919745660055" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-9 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                <PhoneCall className="w-5 h-5" />Call Now
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: "4000+", label: "Charge Cycles" },
                { value: "8–12 Yrs", label: "Battery Lifespan" },
                { value: "95%+", label: "Energy Efficiency" },
                { value: "Safe", label: "LFP Chemistry" },
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

      {/* INTRO */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40 border border-white/5 order-2 lg:order-1">
              <img src="/images/lithium_battery_support.png" alt="Lithium battery storage" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="reveal order-1 lg:order-2" style={{ transitionDelay: '150ms' }}>
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-5">The Future of Energy Storage</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-[0.9] mb-8">
                Smarter.<br /><span className="text-yellow-400">Longer-Lasting.</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-6">
                Lithium batteries (LFP) offer superior energy storage with longer lifespan, faster charging, higher efficiency and safer operation compared to traditional lead-acid alternatives. They are ideal for solar systems, UPS and backup power.
              </p>
              <p className="text-zinc-500 leading-relaxed font-light mb-10">
                Spectrum Powers offers premium lithium battery solutions engineered for reliability — whether you're upgrading an existing UPS or building a new solar energy system.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Chemistry", value: "Lithium LFP" },
                  { label: "Cycle Life", value: "4,000+ cycles" },
                  { label: "Lifespan", value: "8–12 Years" },
                  { label: "Efficiency", value: "95%+" },
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

      {/* BENEFITS */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Why Lithium</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight">Key Benefits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 reveal bg-yellow-400 rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] lg:min-h-[400px] group hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] transition-all">
              <Battery className="w-12 h-12 text-black" />
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-widest mb-2">Longest Life</div>
                <h3 className="text-black text-2xl md:text-3xl font-thin uppercase tracking-tight leading-tight">3x Longer<br />Battery Life.</h3>
                <p className="text-black/60 text-sm mt-3 font-medium">4,000+ cycles vs 1,200 cycles for tubular — lithium batteries last 3–4× longer making them a smarter investment.</p>
              </div>
            </div>
            {[
              { icon: Zap, title: "Fast Charging", desc: "Charges significantly faster than lead-acid batteries — less waiting, more power." },
              { icon: ShieldCheck, title: "Safe LFP Chemistry", desc: "Non-flammable, thermally stable — safest lithium chemistry for indoor use." },
              { icon: Activity, title: "Smart BMS", desc: "Built-in Battery Management System monitors and protects health 24/7." },
              { icon: Clock, title: "Maintenance-Free", desc: "Zero maintenance required — no water top-ups, no terminal cleaning." },
              { icon: Layers, title: "Lightweight & Compact", desc: "60% lighter than lead-acid of same capacity — easy to install anywhere." },
            ].map((benefit, i) => (
              <div key={i} className="reveal bg-zinc-900 border border-white/5 rounded-[2rem] p-6 md:p-7 flex flex-col gap-4 hover:border-yellow-400/30 hover:bg-zinc-900/80 transition-all group" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-11 h-11 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-medium uppercase tracking-tight text-base mb-1">{benefit.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 md:py-32 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">The Numbers</span>
            <h2 className="text-3xl md:text-6xl font-thin uppercase tracking-tight">Lithium vs Tubular Lead-Acid</h2>
          </div>
          <div className="reveal bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 border-b border-white/5">
              <div className="py-4 px-4 md:px-8 text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Feature</div>
              <div className="py-4 px-4 md:px-8 text-center text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-x border-white/5">Tubular Battery</div>
              <div className="py-4 px-4 md:px-8 text-center bg-yellow-400/5">
                <span className="text-yellow-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Lithium LFP ✦</span>
              </div>
            </div>
            {[
              { feature: "Lifespan", traditional: "3–4 years", solar: "8–12 years" },
              { feature: "Charge Cycles", traditional: "~1,200 cycles", solar: "4,000+ cycles" },
              { feature: "Charging Time", traditional: "8–10 hours", solar: "2–4 hours" },
              { feature: "Maintenance", traditional: "Monthly top-ups", solar: "Zero maintenance" },
              { feature: "Weight", traditional: "Heavy (50–60kg)", solar: "Lightweight" },
              { feature: "Depth of Discharge", traditional: "50% max", solar: "90–100%" },
              { feature: "Efficiency", traditional: "70–80%", solar: "95%+" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/5 last:border-0">
                <div className="py-4 px-4 md:px-8 text-xs md:text-sm font-semibold text-zinc-300">{row.feature}</div>
                <div className="py-4 px-4 md:px-8 text-center border-x border-white/5">
                  <span className="flex items-center justify-center gap-1 text-xs md:text-sm text-zinc-500">
                    <X className="w-3 h-3 text-red-500/70 flex-shrink-0" />
                    <span className="hidden sm:inline">{row.traditional}</span>
                  </span>
                </div>
                <div className="py-4 px-4 md:px-8 text-center bg-yellow-400/5">
                  <span className="flex items-center justify-center gap-1 text-xs md:text-sm text-white font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                    {row.solar}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 md:mt-12 reveal">
            <a href="/contact" className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.25)] text-sm">
              Upgrade to Lithium — Free Consultation<ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* TECHNICAL FEATURES */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Engineering</span>
              <h2 className="text-4xl md:text-5xl font-thin uppercase tracking-tight mb-6 md:mb-8">Advanced<br />Technology</h2>
              <p className="text-zinc-400 leading-relaxed mb-8 md:mb-10">Premium lithium LFP cells with integrated BMS for safe, efficient, long-lasting energy storage.</p>
              <div className="flex flex-wrap gap-3">
                {["Lithium LFP Chemistry","Smart BMS Inbuilt","4000+ Charge Cycles","Maintenance-Free","Fast Charging","Wide Temperature Range","Modular Design","Remote Monitoring","10-Year Warranty"].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:border-yellow-400/40 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all cursor-default">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,0.8)] flex-shrink-0" />{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl border border-white/5" style={{ transitionDelay: '150ms' }}>
              <img src="/images/lithium_battery_tech.png" alt="Lithium battery cell detail" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PERFECT FOR */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 md:gap-12 items-start">
            <div className="lg:col-span-3 reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Applications</span>
              <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight mb-8 md:mb-10">Perfect For</h2>
              <div className="rounded-[2rem] overflow-hidden aspect-video border border-white/5 shadow-2xl">
                <img src="/images/lithium_battery_lifestyle.png" alt="Lithium battery home installation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {[
                { icon: Home, label: "Home UPS Systems", sub: "Long-lasting backup for the family" },
                { icon: Sun, label: "Solar Energy Storage", sub: "Hybrid and off-grid solar systems" },
                { icon: Server, label: "Data Centers & Servers", sub: "Reliable backup for critical systems" },
                { icon: Building2, label: "Commercial Buildings", sub: "Office and multi-floor backup" },
                { icon: Cpu, label: "Industrial Applications", sub: "Heavy-duty reliable energy storage" },
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

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Questions</span>
            <h2 className="text-3xl md:text-5xl font-thin uppercase tracking-tight mb-4">Frequently Asked</h2>
            <p className="text-zinc-400 font-light text-base md:text-lg">Everything you need to know about Lithium Batteries.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 ${activeFaq === i ? 'border-yellow-400/40' : 'border-white/5'}`}>
                <button className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
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

      {/* CTA */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto reveal">
          <div className="relative bg-yellow-400 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-black/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-black/5 rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Upgrade your battery</div>
                <h2 className="text-3xl md:text-6xl font-thin uppercase tracking-tight text-black leading-[0.9]">
                  Upgrade to Lithium.<br />Upgrade for Life.
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

export default LithiumBatteries;
