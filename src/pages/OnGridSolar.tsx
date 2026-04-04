import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Sun, Zap, ArrowRight, ShieldCheck, CheckCircle2,
  Home, Building2, GraduationCap, Hospital, Factory,
  PhoneCall, Settings, FileText, Wrench, Play, ChevronDown, Activity, Battery
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
      a: "Our high-efficiency Mono PERC solar panels come with a 25+ year performance lifespan. Inverters typically last 10-15 years and can be easily replaced, ensuring decades of reliable power generation."
    },
    {
      q: "Is maintenance required?",
      a: "Very minimal maintenance is required. Since there are no moving parts and no batteries involved in a standard on-grid system, periodic cleaning of the solar panels (every few months) to remove dust is usually sufficient."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen pb-20 overflow-x-hidden">

      {/* SECTION 1: HERO */}
      <section className="relative h-[80vh] md:h-[85vh] flex items-center justify-center overflow-hidden pt-36 md:pt-32 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ongrid_hero_wide.png"
            className="w-full h-full object-cover scale-[1.05]"
            alt="On-Grid Solar System"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
            <Sun className="w-4 h-4 inline-block mr-2 -mt-0.5" />
            Grid-Connected Solution
          </span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            On-Grid <br className="hidden md:block" />
            Solar System
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] mb-10">
            Reduce Electricity Bills with Smart Grid-Connected Solar Power.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-xl">
              <ArrowRight className="w-5 h-5" />
              Get Free Quote
            </a>
            <a href="tel:+919745660055" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
              <PhoneCall className="w-5 h-5" />
              Call Now
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-black uppercase tracking-widest text-zinc-300 mt-12 drop-shadow-md">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              25+ Years Experience
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              1000+ Installations
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK HIGHLIGHTS */}
      <section className="py-12 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, text: "Save Up to 90% Electricity" },
              { icon: Battery, text: "No Battery Required" },
              { icon: Activity, text: "ROI in 3–4 Years" },
              { icon: Settings, text: "App-Based Monitoring" }
            ].map((highlight, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors reveal border border-white/5" style={{ transitionDelay: `${i * 100}ms` }}>
                <highlight.icon className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="font-bold text-sm lg:text-base">{highlight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DETAILED INTRO */}
      <section className="py-24 px-6 relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="reveal mb-12">
          <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Introduction</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Smart Solar Solution for <br className="hidden md:block" /> Maximum Savings
          </h2>
        </div>

        {/* Wide Image */}
        <div className="reveal rounded-[2rem] overflow-hidden border border-white/10 mb-12" style={{ height: 'clamp(300px, 60vh, 750px)' }}>
          <img
            src="/images/ongrid_intro.png"
            alt="Smart Net Metering Infrastructure"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="reveal text-lg md:text-xl text-zinc-400 leading-relaxed font-light md:max-w-4xl border-l-4 border-yellow-400 pl-6 lg:pl-10">
          <p className="mb-4">
            An On-Grid Solar System is one of the most efficient and widely adopted solar solutions. It connects directly to the electricity grid, allowing you to use solar energy during the day and export excess energy for credits through net metering.
          </p>
          <p>
            This ensures maximum savings with minimal maintenance, making it ideal for modern homes and businesses looking to transition to sustainable energy.
          </p>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-24 bg-zinc-900/50 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="mb-12 reveal">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Mechanism</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">How On-Grid Solar Works</h2>
          </div>

          {/* Wide Image */}
          <div className="reveal rounded-[2rem] overflow-hidden border border-white/10 mb-16 shadow-2xl" style={{ height: 'clamp(300px, 75vh, 900px)' }}>
            <img
              src="/images/ongrid_working.png"
              alt="On-Grid Solar Energy Flow diagram"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { step: '01', title: 'Generation', desc: 'Solar panels generate electricity from sunlight' },
              { step: '02', title: 'Consumption', desc: 'Power is directly used in your home/business' },
              { step: '03', title: 'Export', desc: 'Excess power is exported back to the local grid' },
              { step: '04', title: 'Savings', desc: 'Net metering tracks export & reduces your bill' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center aspect-square reveal p-4 md:p-8 bg-zinc-950 rounded-3xl border border-white/5 shadow-xl hover:border-yellow-400/30 hover:bg-black transition-all group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900 border-2 border-yellow-400/50 flex items-center justify-center text-xs md:text-sm font-black text-yellow-400 mb-4 group-hover:bg-yellow-400/20 group-hover:border-yellow-400 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-sm md:text-lg font-bold uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed max-w-[120px] md:max-w-none">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-2">
        {/* SECTION 5: BENEFITS */}
        <section className="py-24 px-6 lg:border-r border-white/5">
          <div className="max-w-lg mx-auto lg:ml-auto lg:mr-16 reveal">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">Key Benefits</h2>
            <div className="space-y-6">
              {[
                "Save up to 90% on electricity bills",
                "No battery required → lower cost",
                "High ROI within 3–4 years",
                "Real-time monitoring via mobile apps",
                "Long lifespan with minimal maintenance"
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start p-4 hover:bg-white/5 rounded-2xl transition-colors border border-transparent hover:border-white/5">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="font-semibold text-lg text-zinc-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: TECHNICAL SPECIFICATIONS */}
        <section className="py-24 px-6 bg-zinc-900/30">
          <div className="max-w-lg mx-auto lg:mr-auto lg:ml-16 reveal delay-200">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-yellow-400">Technical <br />Features</h2>
            <ul className="space-y-6">
              {[
                "High-efficiency Mono PERC solar panels",
                "Advanced inverters (string/micro)",
                "Lightning & surge protection",
                "Safe AC/DC wiring with grounding",
                "Government-approved net metering"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                  <span className="text-zinc-300 font-medium text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* SECTION 7: IDEAL FOR */}
      <section className="py-24 px-6 border-y border-white/5 relative bg-zinc-950">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Heading */}
          <div className="mb-12 reveal">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Target Applications</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Perfect For</h2>
          </div>

          {/* Wide Image */}
          <div className="reveal rounded-[2rem] overflow-hidden border border-white/10 mb-12 shadow-2xl" style={{ height: 'clamp(250px, 55vh, 650px)' }}>
            <img
              src="/images/ongrid_perfect.png"
              alt="Solar Panel installation locations"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Home, label: "Homes & Apartments" },
              { icon: Building2, label: "Offices & Shops" },
              { icon: GraduationCap, label: "Schools & Colleges" },
              { icon: Hospital, label: "Hospitals & Hotels" },
              { icon: Factory, label: "Industrial Buildings" }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <item.icon className="w-8 h-8 text-yellow-400 mb-4" />
                <span className="font-bold text-sm uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: PROCESS */}
      <section className="py-24 px-6 bg-zinc-900 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Step-by-Step</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Our Installation Process</h2>
          </div>

          <div className="space-y-6">
            {[
              { title: "Site Inspection", icon: Settings },
              { title: "System Design", icon: FileText },
              { title: "Approval & Documentation", icon: ShieldCheck },
              { title: "Installation", icon: Wrench },
              { title: "Testing & Activation", icon: Play }
            ].map((step, i) => (
              <div key={i} className="reveal group bg-zinc-950 p-6 rounded-2xl border border-white/5 flex items-center gap-6 hover:border-yellow-400/30 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/10 transition-colors">
                  <step.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1 block">Phase {i + 1}</span>
                  <h3 className="text-xl font-black uppercase tracking-tight">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-400 font-light text-lg">Everything you need to know about On-Grid Solar.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="reveal bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 transition-all duration-300">
                <button
                  className="w-full text-left px-8 py-6 flex items-center justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-yellow-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-zinc-400 leading-relaxed font-light">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center reveal">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Ready to start saving?</h3>
            <a href="/contact" className="inline-block bg-yellow-400 text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
              Get Free Site Audit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnGridSolar;
