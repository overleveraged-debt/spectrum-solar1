import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Thermometer, Droplets, Sun, ArrowRight, ShieldCheck, CheckCircle2,
  Home, Hotel, Building2, Hospital, Utensils,
  PhoneCall, Settings, FileText, Wrench, Play, ChevronDown,
  Activity, Clock, Layers, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const SolarWaterHeaters: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Does it work during rainy days?",
      a: "Yes. Solar water heaters are designed with well-insulated storage tanks that retain heat effectively. ETC systems also perform better than FPC systems in low-light or cloudy conditions."
    },
    {
      q: "What is the lifespan of a solar water heater?",
      a: "Typically 10–15 years with minimal maintenance. The evacuated glass tubes and insulated tanks are built for durability even in challenging weather conditions."
    },
    {
      q: "Is maintenance required?",
      a: "Very minimal. Occasional cleaning of the collectors (every 1–2 months) is usually sufficient. No major servicing required for years."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen overflow-x-hidden">
      <SEO 
        title="Solar Water Heaters | Energy Saving Solutions | Spectrum Solar"
        description="Save up to 80% on water heating costs with our high-efficiency solar water heaters. ETC and FPC systems designed for maximum performance in all climates."
      />

      {/* ── HERO + STAT STRIP ── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/water_heater_hero.webp"
            className="w-full h-full object-cover object-center"
            alt="Solar Water Heaters"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8">
          <div className="max-w-7xl mx-auto text-center w-full">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
              <Thermometer className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Solar Thermal Solutions</span>
            </div>

            <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Solar Water<br />
              <span className="text-yellow-400">Heaters</span>
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
              Zero-Cost Hot Water All Year with Solar Energy. Enjoy continuous hot water while saving significantly on electricity bills.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                <ArrowRight className="w-5 h-5" />
                Get Free Quote
              </Link>
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
                { value: "Zero", label: "Electricity Cost" },
                { value: "10–15 Yrs", label: "System Lifespan" },
                { value: "80%+", label: "Bill Savings" },
                { value: "100L–300L+", label: "Capacity Range" },
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
                src="/images/water_heater_intro.webp"
                alt="Solar water heater benefits"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-5">Smart & Sustainable Water Heating</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-[0.9] mb-8">
                Hot Water.<br />
                <span className="text-yellow-400">Zero Cost.</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-6">
                A Solar Water Heater uses sunlight to heat water, making it one of the most cost-effective and environmentally friendly solutions for homes and businesses. It reduces electricity consumption while ensuring a consistent hot water supply year-round.
              </p>
              <p className="text-zinc-500 leading-relaxed font-light mb-10">
                Spectrum Powers offers high-quality ETC and FPC systems designed for durability, efficiency, and long-term performance.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Running Cost", value: "Zero" },
                  { label: "System Lifespan", value: "10–15 Years" },
                  { label: "Works on Cloudy Days", value: "Yes" },
                  { label: "Maintenance", value: "Minimal" },
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
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight">How It Works</h2>
          </div>

          <div className="hidden md:grid grid-cols-4 gap-0 relative reveal">
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-yellow-400/20 via-yellow-400 to-yellow-400/20" />
            {[
              { step: '01', icon: Sun, title: 'Absorb', desc: 'Solar collectors absorb sunlight efficiently.' },
              { step: '02', icon: Thermometer, title: 'Heat', desc: 'Heat is transferred to water in the system.' },
              { step: '03', icon: Droplets, title: 'Store', desc: 'Hot water stored in insulated tank.' },
              { step: '04', icon: Activity, title: 'Use', desc: 'Ready for use anytime you need it.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-6 group">
                <div className="w-24 h-24 rounded-full bg-zinc-950 border-2 border-yellow-400 flex items-center justify-center mb-6 relative z-10 group-hover:bg-yellow-400 group-hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300">
                  <item.icon className="w-8 h-8 text-yellow-400 group-hover:text-black transition-colors" />
                </div>
                <div className="text-yellow-400/50 text-[10px] font-black tracking-widest mb-1">{item.step}</div>
                <h3 className="text-xl font-thin uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-0">
            {[
              { step: '01', icon: Sun, title: 'Absorb', desc: 'Solar collectors absorb sunlight efficiently.' },
              { step: '02', icon: Thermometer, title: 'Heat', desc: 'Heat is transferred to water in the system.' },
              { step: '03', icon: Droplets, title: 'Store', desc: 'Hot water stored in insulated tank.' },
              { step: '04', icon: Activity, title: 'Use', desc: 'Ready for use anytime you need it.' },
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
                  <h3 className="text-lg font-thin uppercase tracking-tight mb-1">{item.title}</h3>
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
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Why Solar Heating</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight">Key Benefits</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 reveal bg-yellow-400 rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] lg:min-h-[400px] group hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] transition-all">
              <Droplets className="w-12 h-12 text-black" />
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-widest mb-2">Zero Running Cost</div>
                <h3 className="text-black text-2xl md:text-3xl font-thin uppercase tracking-tight leading-tight">Hot Water<br />from the Sun</h3>
                <p className="text-black/60 text-sm mt-3 font-medium">After installation, your hot water is powered by sunlight — completely free, forever.</p>
              </div>
            </div>

            {[
              { icon: Thermometer, title: "Significant Savings", desc: "Reduce water heating electricity costs by 80–90% from day one." },
              { icon: Sun, title: "Works Year-Round", desc: "Designed to work even in monsoon and overcast conditions efficiently." },
              { icon: Clock, title: "10–15 Year Lifespan", desc: "Durable systems built for longevity with minimal maintenance needs." },
              { icon: ShieldCheck, title: "Eco-Friendly", desc: "Zero carbon emissions from water heating — clean, green energy use." },
              { icon: Activity, title: "Quick Payback", desc: "Investment typically recovered within 2–3 years through energy savings." },
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

      {/* ── TYPES & COMPARISON TABLE ── */}
      <section className="py-24 md:py-32 px-6 bg-zinc-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">The Numbers</span>
            <h2 className="text-3xl md:text-6xl font-thin uppercase tracking-tight">Solar Heater vs Electric Heater</h2>
          </div>

          <div className="reveal bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 border-b border-white/5">
              <div className="py-4 px-4 md:px-8 text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Feature</div>
              <div className="py-4 px-4 md:px-8 text-center text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-x border-white/5">Electric Heater</div>
              <div className="py-4 px-4 md:px-8 text-center bg-yellow-400/5">
                <span className="text-yellow-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Solar Heater ✦</span>
              </div>
            </div>

            {[
              { feature: "Monthly Running Cost", traditional: "₹800–₹3,000+", solar: "Zero" },
              { feature: "Energy Source", traditional: "Grid electricity", solar: "Free sunlight" },
              { feature: "Carbon Footprint", traditional: "High", solar: "Zero emissions" },
              { feature: "System Lifespan", traditional: "3–5 years", solar: "10–15 years" },
              { feature: "Maintenance", traditional: "Frequent", solar: "Minimal" },
              { feature: "Works in Outage", traditional: "No", solar: "Yes (stored heat)" },
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
                    {row.solar}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Types */}
          <div className="mt-12 reveal">
            <h3 className="text-xl md:text-2xl font-medium uppercase tracking-tight text-center mb-8">Available Models & Capacities</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { type: "ETC", full: "Evacuated Tube Collector", desc: "Best for cloudy conditions. Higher efficiency. Ideal for monsoon seasons.", capacities: "100L | 150L | 200L | 250L | 300L+" },
                { type: "FPC", full: "Flat Plate Collector", desc: "Cost-effective for sunny regions. Sleek aesthetic, low profile on rooftop.", capacities: "100L | 150L | 200L | 250L" },
              ].map((t, i) => (
                <div key={i} className="bg-zinc-950 border border-white/5 rounded-2xl p-6 hover:border-yellow-400/20 transition-colors">
                  <div className="text-yellow-400 text-2xl font-black tracking-tight mb-1">{t.type}</div>
                  <div className="text-white font-black text-sm uppercase tracking-tight mb-2">{t.full}</div>
                  <p className="text-zinc-500 text-sm mb-4">{t.desc}</p>
                  <div className="text-yellow-400/70 text-xs font-bold uppercase tracking-widest">{t.capacities}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 md:mt-12 reveal">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.25)] text-sm">
              Get Free Consultation
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL FEATURES ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal">
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Engineering</span>
              <h2 className="text-4xl md:text-5xl font-thin uppercase tracking-tight mb-6 md:mb-8">System<br />Features</h2>
              <p className="text-zinc-400 leading-relaxed mb-8 md:mb-10">
                Every Spectrum Powers Solar Water Heater is engineered for India's diverse climate — durable through monsoon and efficient throughout the year.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Evacuated Tube Technology", "Flat Plate Option", "Insulated Storage Tank",
                  "Pressurized Systems", "Non-Pressurized Systems", "Anti-Corrosion Coating",
                  "Backup Heating Element", "Low Maintenance Design", "10-Year Warranty",
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
                src="/images/water_heater_tech.webp"
                alt="Solar water heater technical detail"
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
              <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight mb-8 md:mb-10">Perfect For</h2>
              <div className="rounded-[2rem] overflow-hidden aspect-video border border-white/5 shadow-2xl">
                <img
                  src="/images/water_heater_lifestyle.webp"
                  alt="Solar water heater applications"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {[
                { icon: Home, label: "Homes & Apartments", sub: "Daily hot water for families" },
                { icon: Hotel, label: "Hotels & Resorts", sub: "Large capacity for hospitality" },
                { icon: Building2, label: "Hostels & PGs", sub: "Cost-efficient for large groups" },
                { icon: Hospital, label: "Hospitals & Clinics", sub: "Reliable hot water for healthcare" },
                { icon: Utensils, label: "Restaurants & Canteens", sub: "Industrial-capacity heating" },
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
          <h2 className="text-2xl md:text-5xl font-thin italic uppercase tracking-tight mb-6 md:mb-8 leading-tight">
            Hot Water from Sun,<br />Savings for Life.
          </h2>
          <p className="text-zinc-400 text-base md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Traditional water heaters consume a large amount of electricity. By switching to solar, you can significantly reduce your monthly expenses and recover your investment quickly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { icon: Thermometer, text: "No electricity usage" },
              { icon: Clock, text: "Quick payback period" },
              { icon: Layers, text: "Long-term savings" },
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
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight">Installation</h2>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-14 bottom-14 w-[2px] bg-gradient-to-b from-yellow-400/80 via-yellow-400/40 to-transparent hidden md:block -z-10" />
            <div className="space-y-5">
              {[
                { title: "Site Inspection", desc: "Engineer visits to assess roof area, water pressure, and hot water requirements.", icon: Settings },
                { title: "Capacity Selection", desc: "We recommend the right system capacity (100L–300L+) based on family size or business needs.", icon: FileText },
                { title: "System Installation", desc: "Professional installation of collectors, storage tank, plumbing and insulation.", icon: Wrench },
                { title: "Testing & Setup", desc: "Full system testing to ensure optimal performance and water temperature.", icon: Activity },
                { title: "Handover", desc: "Usage training, maintenance guide, and warranty documentation provided.", icon: Play },
              ].map((step, i) => (
                <div key={i} className="reveal flex gap-4 md:gap-6 group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-zinc-950 border-2 border-yellow-400/50 flex items-center justify-center relative z-[1] group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all">
                    <step.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-zinc-950 border border-white/5 rounded-2xl p-5 md:p-6 group-hover:border-yellow-400/20 transition-all">
                    <div className="text-yellow-400/50 text-[9px] font-black uppercase tracking-widest mb-1">Phase {i + 1}</div>
                    <h3 className="text-base md:text-lg font-medium uppercase tracking-tight mb-1">{step.title}</h3>
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
            <h2 className="text-3xl md:text-5xl font-thin uppercase tracking-tight mb-4">Frequently Asked</h2>
            <p className="text-zinc-400 font-light text-base md:text-lg">Everything you need to know about Solar Water Heaters.</p>
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
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Upgrade to Smart Water Heating</div>
                <h2 className="text-3xl md:text-6xl font-thin uppercase tracking-tight text-black leading-[0.9]">
                  Save Every Month<br />on Hot Water.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                <Link to="/contact" className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl text-sm">
                  Get Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
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

export default SolarWaterHeaters;
