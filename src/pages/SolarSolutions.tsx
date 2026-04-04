import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLocation } from 'react-router-dom';
import { Sun, Zap, Thermometer, CheckCircle2, ArrowRight, Leaf } from 'lucide-react';

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
    id: 'on-grid',
    number: '01',
    title: 'On-Grid Solar System',
    category: 'Grid-Tied',
    tagline: 'Net-metered. Zero electricity bills.',
    description:
      'Grid-connected solar systems that feed excess power back to the KSEB grid through net metering. The most cost-effective way to slash your electricity bill to zero with a fast ROI — ideal for homes, offices, and factories.',
    icon: <Sun className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    badge: 'Most Popular',
    features: [
      'Net-Metering with KSEB',
      'Real-time ERP Monitoring',
      '25-Year Panel Warranty',
      'Government Subsidy Eligible',
    ],
    specs: [
      { label: 'Capacity Range', value: '3kW – 500kW+' },
      { label: 'Grid Feed', value: 'Net-Metered' },
      { label: 'Warranty', value: '25-Year Panel' },
      { label: 'ROI Period', value: '3 – 5 Years' },
    ],
    image: '/images/sol_on_grid.jpg',
  },
  {
    id: 'hybrid',
    number: '02',
    title: 'Hybrid Solar System',
    category: 'Grid + Battery',
    tagline: 'Solar power + backup. Day and night.',
    description:
      'The best of both worlds — solar generation during the day with a lithium or VRLA battery bank for uninterrupted power during outages or night hours. Ideal for homes and businesses in areas with frequent power cuts.',
    icon: <Zap className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'Day + Night Power',
      'Grid + Battery Hybrid',
      'Instant Switchover (<10ms)',
      'Smart Energy Management',
    ],
    specs: [
      { label: 'Capacity Range', value: '2kW – 50kW' },
      { label: 'Backup', value: '2 – 12 Hours' },
      { label: 'Battery', value: 'Lithium / VRLA' },
      { label: 'Switch Time', value: '< 10ms' },
    ],
    image: '/images/sol_hybrid.jpg',
  },
  {
    id: 'off-grid',
    number: '03',
    title: 'Lithium Off-Grid System',
    category: 'Off-Grid',
    tagline: 'Total energy independence.',
    description:
      'Fully autonomous solar+lithium battery systems designed for locations without reliable grid access. Hospitals, remote estates, islands, and industries requiring absolute power independence.',
    icon: <Leaf className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'Zero Grid Dependency',
      'Lithium LFP Batteries',
      'All-Weather Rated',
      '10-Year Battery Warranty',
    ],
    specs: [
      { label: 'Capacity', value: '1kW – 25kW' },
      { label: 'Autonomy', value: 'Full Off-Grid' },
      { label: 'Battery Tech', value: 'LFP Lithium' },
      { label: 'Cycles', value: '4000+ Charge Cycles' },
    ],
    image: '/images/sol_off_grid.jpg',
  },
  {
    id: 'water-heaters',
    number: '04',
    title: 'Solar Water Heaters',
    category: 'Thermal Savings',
    tagline: 'Sun-powered. Scale-proof.',
    description:
      "High-efficiency vacuum tube thermal systems designed for India's diverse climatic conditions. Available in 100L to 2000L capacities for homes, hotels, hospitals, and industrial applications.",
    icon: <Thermometer className="w-5 h-5 md:w-7 md:h-7" />,
    accentColor: '#facc15',
    features: [
      'Vacuum Tube Technology',
      'Stainless Steel Tank 316L',
      'All-Climate Rated',
      'Scale & Corrosion Proof',
    ],
    specs: [
      { label: 'Capacity', value: '100L – 2000L' },
      { label: 'Efficiency', value: '85% Solar Utilization' },
      { label: 'Material', value: '316L Marine-Grade Steel' },
      { label: 'ROI Period', value: '< 2 Years' },
    ],
    image: '/images/sol_water_heater.jpg',
  },
];

const SolarSolutions: React.FC = () => {
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
            src="/images/services-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Solar Panels Installation"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
            25 Years of Solar Excellence
          </span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Solar <br className="hidden md:block" />
            Solutions
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            From rooftop to industrial — engineered for Kerala's climate.
          </p>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="pt-24 pb-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-20 reveal">
            <div>
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
                Solar Portfolio
              </span>
              <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-[-0.04em] leading-[0.9]">
                Solar <br />Solutions.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span>4 Engineered Systems</span>
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
                  {/* Accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-500"
                    style={{ backgroundColor: activeProduct === product.id ? product.accentColor : 'transparent' }}
                  />

                  {/* Row */}
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

                  {/* Expanded Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activeProduct === product.id ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-14 pb-10 border-t border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-8">
                        {/* Description + Features */}
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

                        {/* Specs */}
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
                          {product.id === 'on-grid' && (
                            <a
                              href="/solar/on-grid"
                              className="w-full mt-4 bg-yellow-400 text-black px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Full Details
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          )}
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
              Ready to Go Solar?
            </h2>
            <p className="font-bold text-zinc-500 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Our certified solar engineers provide a free site audit to design the perfect system for your needs.
            </p>
          </div>
          <a
            href="/contact"
            className="w-full md:w-auto bg-yellow-400 text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap shadow-xl text-center"
          >
            Get Free Site Audit
          </a>
        </div>
      </section>
    </div>
  );
};

export default SolarSolutions;
