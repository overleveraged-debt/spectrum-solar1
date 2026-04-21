import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Battery, Sun, Thermometer, ShieldCheck, Waves, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  badge?: string;
}

const products: Product[] = [
  {
    id: 'solar',
    number: '01',
    title: 'Solar Grid Integration',
    category: 'Energy Generation',
    tagline: 'Government-Awarded Architecture',
    description: 'Custom-engineered On-Grid, Hybrid, and Lithium Off-Grid systems. 25-year heritage in large-scale solar architecture — from residential rooftops to industrial megawatt arrays.',
    icon: <Sun className="w-8 h-8" />,
    accentColor: '#facc15',
    features: ['Net-Metering Ready', 'Hybrid Capable', 'ERP-Monitored 24/7', 'Grid-Tied & Off-Grid'],
    specs: [
      { label: 'Capacity Range', value: '3kW – 500kW+' },
      { label: 'System Types', value: 'On-Grid / Hybrid / Off-Grid' },
      { label: 'Warranty', value: '25-Year Panel Warranty' },
      { label: 'Monitoring', value: 'Real-Time ERP Dashboard' },
    ],
    badge: 'National Award',
  },
  {
    id: 'ups',
    number: '02',
    title: 'Lithium In-Built UPS',
    category: 'Power Reliability',
    tagline: 'Zero-Switch. Zero Maintenance.',
    description: 'Space-saving UPS systems with integrated lithium-ion cells engineered for seamless, instantaneous power transition. Ideal for homes, offices, and mission-critical operations.',
    icon: <Battery className="w-8 h-8" />,
    accentColor: '#60a5fa',
    features: ['Zero-Switch Time', '10-Year Service Life', 'Compact Form Factor', 'Smart Load Sensing'],
    specs: [
      { label: 'Backup Duration', value: '2 – 8 Hours' },
      { label: 'Technology', value: 'Lithium-Ion Integrated' },
      { label: 'Switch Time', value: '< 10ms' },
      { label: 'Footprint', value: '60% Smaller than Lead-Acid' },
    ],
  },
  {
    id: 'security',
    number: '03',
    title: 'Security & CCTV',
    category: 'Safety Integration',
    tagline: 'Total Site Intelligence.',
    description: 'End-to-end integrated surveillance systems with remote cloud access, AI-powered night vision, and mission-critical uptime. Protecting what matters, around the clock.',
    icon: <ShieldCheck className="w-8 h-8" />,
    accentColor: '#4ade80',
    features: ['IP-Based Systems', '4K Night Vision', 'Cloud Sync', 'Motion Analytics'],
    specs: [
      { label: 'Resolution', value: 'Up to 4K Ultra-HD' },
      { label: 'Storage', value: 'Cloud + Local NVR' },
      { label: 'Access', value: 'Remote Mobile App' },
      { label: 'Uptime SLA', value: '99.9% Guaranteed' },
    ],
  },
  {
    id: 'purifiers',
    number: '04',
    title: 'Advanced Purifiers',
    category: 'Lifestyle',
    tagline: 'Industrial-Grade. Home-Ready.',
    description: 'Industrial-grade water purification systems adapted for residential and commercial environments. RO + UV multi-stage filtration with intelligent flow sensing.',
    icon: <Waves className="w-8 h-8" />,
    accentColor: '#38bdf8',
    features: ['RO + UV Dual Filter', 'pH Balancing', 'Smart Flow Control', 'TDS Real-Time Display'],
    specs: [
      { label: 'Filtration', value: 'RO + UV + Alkaline' },
      { label: 'Flow Rate', value: '15L / Hour' },
      { label: 'Rejection Rate', value: '98% TDS Removal' },
      { label: 'Maintenance', value: 'Annual Service Only' },
    ],
  },
  {
    id: 'heaters',
    number: '05',
    title: 'Solar Water Heaters',
    category: 'Thermal Savings',
    tagline: 'Sun-Powered. Scale-Proof.',
    description: "High-efficiency vacuum tube thermal systems designed for India's diverse climatic conditions. Eliminate water heating costs with zero electricity consumption.",
    icon: <Thermometer className="w-8 h-8" />,
    accentColor: '#fb923c',
    features: ['Vacuum Tube Tech', 'Stainless Steel Tank', 'All-Climate Rated', 'Scale & Corrosion Proof'],
    specs: [
      { label: 'Capacity', value: '100L – 2000L Systems' },
      { label: 'Efficiency', value: '85% Solar Utilization' },
      { label: 'Material', value: '316L Marine-Grade Steel' },
      { label: 'ROI Period', value: '< 2 Years' },
    ],
  },
];

const Services: React.FC = () => {
  useScrollReveal();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/services-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Industrial Solar Infrastructure"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
            Precision Engineering
          </span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            INTEGRATED ENERGY <br className="hidden md:block" />
            ECOSYSTEMS
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Consolidating two decades of expertise into sustainable power solutions.
          </p>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="pt-24 pb-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-20 reveal">
            <div>
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
                Complete Portfolio
              </span>
              <h2 className="text-4xl md:text-7xl font-thin uppercase text-white tracking-tight leading-[0.9]">
                Our <br />Products.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>5 Engineered Solutions</span>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="reveal group" style={{ transitionDelay: `${index * 80}ms` }}>
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
                      <h3 className="text-sm md:text-3xl font-thin uppercase text-white tracking-tight leading-tight">
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

                  {/* Expanded Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activeProduct === product.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-8 md:px-16 pb-10 border-t border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-8">
                        <div>
                          <p className="text-zinc-300 text-base leading-relaxed mb-8 font-light">
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
                        <div>
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
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 mt-6 font-black text-[10px] uppercase tracking-[0.3em] transition-all group/cta"
                            style={{ color: product.accentColor }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Request Quote
                            <ArrowRight className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform" />
                          </Link>
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

      {/* System Selection Guide — Dark */}
      <section className="px-6 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">System Guide</span>
            <h2 className="text-[2rem] sm:text-3xl md:text-4xl font-thin uppercase italic tracking-tight leading-none mb-4 text-white">
              Technical Selection Guide
            </h2>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Matching solutions to requirements</p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-zinc-900">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 uppercase tracking-widest text-[10px]">
                  <th className="px-10 py-8 font-black">System Type</th>
                  <th className="px-10 py-8 font-black">Capacity Range</th>
                  <th className="px-10 py-8 font-black">Primary Application</th>
                  <th className="px-10 py-8 font-black">Backup Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'On-Grid Solar', cap: '3kW – 500kW+', app: 'Grid Bill Reduction', backup: 'Net-Metered' },
                  { type: 'Hybrid Energy', cap: '2kW – 50kW', app: 'Critical Load Backup', backup: '2 – 12 Hours' },
                  { type: 'Off-Grid Lithium', cap: '1kW – 25kW', app: 'Self-Sufficient Power', backup: 'Full Autonomy' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-10 py-8 font-black text-white text-lg italic uppercase">{row.type}</td>
                    <td className="px-10 py-8 font-bold text-zinc-400">{row.cap}</td>
                    <td className="px-10 py-8 text-zinc-500 uppercase text-[10px] font-black tracking-widest">{row.app}</td>
                    <td className="px-10 py-8 font-bold text-yellow-400 uppercase text-[10px]">{row.backup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto border border-yellow-400/20 bg-zinc-900 text-white rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 reveal shadow-2xl">
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-thin uppercase italic tracking-tight leading-none mb-4">
              Ready to Optimize?
            </h2>
            <p className="font-bold text-zinc-500 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Our certified engineers provide a detailed site audit to ensure maximum efficiency.
            </p>
          </div>
          <Link
            to="/contact"
            className="w-full md:w-auto bg-yellow-400 text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap shadow-xl text-center"
          >
            Get Energy Audit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
