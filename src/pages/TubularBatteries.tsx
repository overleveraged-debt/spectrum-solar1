import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Zap, Battery, Activity, ArrowRight, ShieldCheck, CheckCircle2,
  Home, Building2, Sun, Server, Layers,
  PhoneCall, ChevronDown,
  Clock, X
} from 'lucide-react';



const TubularBatteries: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long do tubular batteries last?",
      a: "Tubular batteries typically last 4–8 years depending on usage, maintenance, and operating conditions. With proper care and regular maintenance, they can reach or exceed the upper end of their rated lifespan."
    },
    {
      q: "Do they need maintenance?",
      a: "Yes, tubular batteries require periodic maintenance — primarily distilled water top-ups every 1–2 months and terminal cleaning. Regular equalization charging also helps maintain performance."
    },
    {
      q: "Are they good for areas with long power cuts?",
      a: "Yes. Tubular batteries are specifically designed for deep discharge cycles, making them ideal for areas with long and frequent power cuts. They handle deep discharges better than flat plate batteries."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen overflow-x-hidden">

      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/tubular_battery_hero.png" className="w-full h-full object-cover object-center" alt="Tubular Batteries" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8">
          <div className="max-w-7xl mx-auto text-center w-full">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
              <Battery className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Deep Cycle Energy Storage</span>
            </div>
            <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Tubular<br /><span className="text-yellow-400">Batteries</span>
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
              Proven, Reliable Power Storage for Long Backup Needs. India's trusted deep-cycle battery technology — built for long-duration performance.
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
                { value: "4–8 Yrs", label: "Battery Lifespan" },
                { value: "Deep", label: "Cycle Performance" },
                { value: "1200+", label: "Charge Cycles" },
                { value: "Trusted", label: "Proven Technology" },
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
            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40 border border-white/5">
              <img src="/images/tubular_battery_support.png" alt="Tubular battery bank" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-5">Proven Deep-Cycle Performance</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                Built for Long<br /><span className="text-yellow-400">Power Cuts.</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-6">
                Tubular batteries are lead-acid batteries engineered with a unique tubular plate design that allows for deep discharge performance. They deliver superior backup hours for homes and businesses in regions with extended power outages.
              </p>
              <p className="text-zinc-500 leading-relaxed font-light mb-10">
                Spectrum Powers stocks premium tubular batteries from trusted brands, with expert sizing and installation for maximum performance and longevity.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Technology", value: "Tubular Plate" },
                  { label: "Ideal For", value: "Long Backup" },
                  { label: "Maintenance", value: "Monthly Care" },
                  { label: "Lifespan", value: "4–8 Years" },
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
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Why Tubular Batteries</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Key Benefits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 reveal bg-yellow-400 rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] lg:min-h-[400px] group hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] transition-all">
              <Battery className="w-12 h-12 text-black" />
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-widest mb-2">Deep Discharge</div>
                <h3 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">More Backup<br />Per Charge.</h3>
                <p className="text-black/60 text-sm mt-3 font-medium">Designed for deep discharge cycles — ideal for regions with 6–12+ hour power cuts daily.</p>
              </div>
            </div>
            {[
              { icon: Zap, title: "Long Backup Hours", desc: "Engineered to deliver power over extended discharge periods." },
              { icon: Clock, title: "Proven Reliability", desc: "Battle-tested technology trusted across millions of Indian homes." },
              { icon: ShieldCheck, title: "Heat Resistant", desc: "Performs well even in Kerala's high ambient temperature conditions." },
              { icon: Activity, title: "Wide Compatibility", desc: "Works with all major inverter and UPS brands available in market." },
              { icon: Layers, title: "Cost-Effective", desc: "Best value solution for long backup without the lithium price premium." },
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

      {/* COMPARISON */}
      <section className="py-24 md:py-32 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">The Numbers</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Tubular vs Flat Plate Battery</h2>
          </div>
          <div className="reveal bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 border-b border-white/5">
              <div className="py-4 px-4 md:px-8 text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Feature</div>
              <div className="py-4 px-4 md:px-8 text-center text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-x border-white/5">Flat Plate</div>
              <div className="py-4 px-4 md:px-8 text-center bg-yellow-400/5">
                <span className="text-yellow-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Tubular ✦</span>
              </div>
            </div>
            {[
              { feature: "Lifespan", traditional: "2–3 years", solar: "4–8 years" },
              { feature: "Cycle Life", traditional: "~500 cycles", solar: "1,200+ cycles" },
              { feature: "Deep Discharge", traditional: "Not ideal", solar: "Designed for it" },
              { feature: "Heat Tolerance", traditional: "Moderate", solar: "High resistance" },
              { feature: "Ideal Usage", traditional: "Short power cuts", solar: "Long power cuts" },
              { feature: "Value for Long Term", traditional: "Lower", solar: "Higher" },
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
              Get Right Battery for Your Needs<ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
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
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8">Technical<br />Specifications</h2>
              <p className="text-zinc-400 leading-relaxed mb-8 md:mb-10">Engineered tubular plate design delivers superior performance for deep-discharge applications in Kerala's environment.</p>
              <div className="flex flex-wrap gap-3">
                {["Tubular Positive Plate","Deep Cycle Design","Wide AH Range (100–200AH+)","Multiple Voltage Options","Heat-Resistant Casing","Long Life Electrolyte","Overcharge Protection","Low Self-Discharge","Trusted Brand Partners"].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:border-yellow-400/40 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all cursor-default">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,0.8)] flex-shrink-0" />{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="reveal rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl border border-white/5" style={{ transitionDelay: '150ms' }}>
              <img src="/images/tubular_battery_support.png" alt="Tubular battery detail" className="w-full h-full object-cover" />
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
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-10">Perfect For</h2>
              <div className="rounded-[2rem] overflow-hidden aspect-video border border-white/5 shadow-2xl">
                <img src="/images/tubular_battery_support.png" alt="Tubular battery applications" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {[
                { icon: Home, label: "Homes with Frequent Cuts", sub: "Long backup for daily family use" },
                { icon: Building2, label: "Offices & Commercial", sub: "Reliable backup at lower cost" },
                { icon: Sun, label: "Solar Off-Grid Systems", sub: "Deep-cycle performance for solar" },
                { icon: Server, label: "Telecom & Industrial", sub: "Robust capacity for demanding use" },
                { icon: Zap, label: "Pair with Any Inverter", sub: "Universal compatibility across brands" },
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
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Frequently Asked</h2>
            <p className="text-zinc-400 font-light text-base md:text-lg">Everything you need to know about Tubular Batteries.</p>
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
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Proven power storage</div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-black leading-[0.9]">
                  Reliable Backup<br />You Can Trust.
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

export default TubularBatteries;
