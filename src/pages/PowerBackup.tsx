import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocation } from 'react-router-dom';
import { Battery, Zap, Server, BatteryCharging, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Product {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 'lithium-ups',
    number: '01',
    title: 'Lithium Inbuilt UPS',
    category: 'Zero-Switch UPS',
    tagline: 'No interruptions. Ever.',
    description:
      'Space-saving UPS systems with integrated lithium-ion cells for seamless, instantaneous power transition. Engineered for homes, offices, and mission-critical environments that cannot tolerate even a millisecond of downtime.',
    icon: <Battery className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    badge: 'Most Advanced',
    features: [
      'Zero-Switch Time (<10ms)',
      '10-Year Service Life',
      '60% Smaller than Lead-Acid',
      'Smart Load Sensing',
    ],
    specs: [
      { label: 'Backup Duration', value: '2 – 8 Hours' },
      { label: 'Technology', value: 'Lithium-Ion Integrated' },
      { label: 'Switch Time', value: '< 10ms' },
      { label: 'Warranty', value: '3 Years' },
    ],
    image: '/images/pwr_lithium_ups.jpg',
  },
  {
    id: 'home-ups',
    number: '02',
    title: 'Home UPS System',
    category: 'Residential Backup',
    tagline: 'Reliable power for every Kerala home.',
    description:
      'Designed specifically for residential loads — fans, lights, routers, and essential appliances. Pure sine wave output protects sensitive electronics. Simple, low-maintenance, and trusted by over 12,000 Kerala households.',
    icon: <Zap className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'Pure Sine Wave Output',
      'Protects All Appliances',
      'Tubular / Lithium Compatible',
      'Low Maintenance',
    ],
    specs: [
      { label: 'Capacity', value: '600VA – 5kVA' },
      { label: 'Output', value: 'Pure Sine Wave' },
      { label: 'Efficiency', value: '95%+' },
      { label: 'Battery', value: 'Tubular / Li-Ion' },
    ],
    image: '/images/pwr_home_ups.jpg',
  },
  {
    id: 'inverters',
    number: '03',
    title: 'Inverters',
    category: 'Power Conversion',
    tagline: 'Efficient. Durable. Proven.',
    description:
      'High-efficiency inverters for residential and commercial use. Available in a wide range from compact 600VA units for homes to heavy-duty 10kVA units for shops, offices, and small industries.',
    icon: <BatteryCharging className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'DSP-Controlled Output',
      'Automatic Voltage Regulation',
      'Overload Protected',
      'LED Display Diagnostics',
    ],
    specs: [
      { label: 'Range', value: '600VA – 10kVA' },
      { label: 'Efficiency', value: '93 – 97%' },
      { label: 'Input Voltage', value: '90V – 290V AC' },
      { label: 'Protection', value: 'OVP / UVP / OLP' },
    ],
    image: '/images/pwr_inverter.jpg',
  },
  {
    id: 'online-ups',
    number: '04',
    title: 'Online UPS',
    category: 'Critical Load Protection',
    tagline: 'Always on. Never fails.',
    description:
      'True Online double-conversion UPS for hospitals, server rooms, labs, and data centers. The power never actually passes through the grid — it is always being regenerated from the battery, ensuring absolutely clean, stable power.',
    icon: <Server className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'Double Conversion Technology',
      'Zero Transfer Time',
      'Clean Sine Wave Always',
      'SNMP Network Card Ready',
    ],
    specs: [
      { label: 'Range', value: '1kVA – 200kVA' },
      { label: 'Transfer Time', value: '0ms (Online)' },
      { label: 'Input PF', value: '0.99' },
      { label: 'Efficiency', value: 'Up to 96%' },
    ],
    image: '/images/pwr_online_ups.jpg',
  },
  {
    id: 'lithium-batteries',
    number: '05',
    title: 'Lithium Batteries',
    category: 'Energy Storage',
    tagline: 'Lighter. Longer. Smarter.',
    description:
      'LFP (Lithium Iron Phosphate) batteries for solar storage, UPS backup, and EV applications. 4000+ cycle life means no replacement for over 10 years. Built-in BMS protects from overcharge, overdischarge, and temperature extremes.',
    icon: <Battery className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'LFP Chemistry (Safest)',
      '4000+ Charge Cycles',
      'Built-in Smart BMS',
      'No Maintenance Required',
    ],
    specs: [
      { label: 'Chemistry', value: 'LFP (Li Iron Phosphate)' },
      { label: 'Cycle Life', value: '4000+ Cycles' },
      { label: 'Warranty', value: '5 – 10 Years' },
      { label: 'DoD', value: '95% Depth of Discharge' },
    ],
    image: '/images/pwr_lithium_battery.jpg',
  },
  {
    id: 'tubular-batteries',
    number: '06',
    title: 'Tubular Batteries',
    category: 'Lead-Acid Storage',
    tagline: 'Proven technology. Unmatched value.',
    description:
      "India's most trusted battery technology for home UPS systems. Tall tubular plates give superior performance in Kerala's hot climate and frequent power cuts. Low water topping frequency and robust construction.",
    icon: <BatteryCharging className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'Tall Tubular Plates',
      'Heat-Resistant Design',
      'Low Water Topping',
      'Deep Discharge Recovery',
    ],
    specs: [
      { label: 'Capacity', value: '100Ah – 220Ah' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '3 – 5 Years' },
      { label: 'Life', value: '4 – 6 Years' },
    ],
    image: '/images/pwr_tubular_battery.jpg',
  },
];

const PowerBackup: React.FC = () => {
  useScrollReveal();
  const { hash } = useLocation();
  const [activeProduct, setActiveProduct] = useState<string | null>(
    hash ? hash.replace('#', '') : null
  );

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setActiveProduct(id);
    }
  }, [hash]);

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/banner1090x908.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Power Backup Systems"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
            Kerala's Power Backup Specialists
          </span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Power Backup <br className="hidden md:block" />
            Solutions
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            UPS, inverters, and batteries — built for Kerala's power conditions.
          </p>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="pt-24 pb-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-20 reveal">
            <div>
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
                Backup Portfolio
              </span>
              <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-[-0.04em] leading-[0.9]">
                Power <br />Backup.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
              <Battery className="w-4 h-4 text-yellow-400" />
              <span>6 Engineered Solutions</span>
            </div>
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id} id={product.id} className="reveal group" style={{ transitionDelay: `${index * 80}ms` }}>
                <div
                  className={`relative border rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                    activeProduct === product.id
                      ? 'border-yellow-400/50 bg-zinc-900'
                      : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 hover:bg-zinc-900/70'
                  }`}
                  onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-500"
                    style={{ backgroundColor: activeProduct === product.id ? product.accentColor : 'transparent' }}
                  />

                  <div className="flex items-center gap-3 md:gap-10 p-4 md:p-8 pl-6 md:pl-10">
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.3em] tabular-nums flex-shrink-0 transition-colors duration-500 hidden sm:block"
                      style={{ color: activeProduct === product.id ? product.accentColor : '#52525b' }}
                    >
                      {product.number}
                    </span>
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                      style={{
                        backgroundColor: activeProduct === product.id ? product.accentColor + '20' : 'rgba(255,255,255,0.04)',
                        color: activeProduct === product.id ? product.accentColor : '#71717a',
                        border: `1px solid ${activeProduct === product.id ? product.accentColor + '40' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      {product.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-3xl font-black uppercase text-white tracking-tight leading-tight">
                        {product.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span
                          className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full flex-shrink-0 transition-all duration-500"
                          style={{
                            color: product.accentColor,
                            backgroundColor: product.accentColor + '15',
                            border: `1px solid ${product.accentColor}30`,
                          }}
                        >
                          {product.category}
                        </span>
                        {product.badge && (
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 flex-shrink-0">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-1 hidden md:block">
                        {product.tagline}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500"
                      style={{
                        borderColor: activeProduct === product.id ? product.accentColor + '60' : 'rgba(255,255,255,0.1)',
                        color: activeProduct === product.id ? product.accentColor : '#52525b',
                        transform: activeProduct === product.id ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Expanded */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activeProduct === product.id ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-14 pb-10 border-t border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-8">
                        <div className="md:col-span-1">
                          <p className="text-zinc-300 text-base leading-relaxed mb-6 font-light">
                            {product.description}
                          </p>
                          <ul className="space-y-3">
                            {product.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: product.accentColor }} />
                                <span className="text-zinc-300 text-sm font-semibold">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="md:col-span-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-5" style={{ color: product.accentColor }}>
                            Technical Specifications
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {product.specs.map((spec, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl"
                                style={{ background: product.accentColor + '08', border: `1px solid ${product.accentColor}20` }}
                              >
                                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">{spec.label}</p>
                                <p className="text-white font-black text-sm leading-tight">{spec.value}</p>
                              </div>
                            ))}
                          </div>
                          <a
                            href="/contact"
                            className="inline-flex items-center gap-2 mt-6 font-black text-[10px] uppercase tracking-[0.3em] transition-all group/cta"
                            style={{ color: product.accentColor }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Request Quote
                            <ArrowRight className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform" />
                          </a>
                        </div>

                        {/* Product Photo */}
                        <div className="md:col-span-1 order-first md:order-last">
                          <div className="rounded-2xl overflow-hidden mb-6 md:mb-0" style={{ height: 'clamp(280px, 40vw, 320px)' }}>
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto border border-yellow-400/20 bg-zinc-900 text-white rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 reveal shadow-2xl">
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
              Never Lose Power Again.
            </h2>
            <p className="font-bold text-zinc-500 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Our engineers will assess your load requirements and recommend the perfect backup solution.
            </p>
          </div>
          <a
            href="/contact"
            className="w-full md:w-auto bg-yellow-400 text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap shadow-xl text-center"
          >
            Get Power Assessment
          </a>
        </div>
      </section>
    </div>
  );
};

export default PowerBackup;
