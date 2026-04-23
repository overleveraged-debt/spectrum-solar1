import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TrendingUp, CheckCircle2, ArrowRight, Star, MapPin, Zap, BarChart3, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const whyItems = [
  { number: '01', title: "Kerala's Fast-Growing Solar Market", desc: 'Solar adoption is rising across homes, businesses, and industries — creating massive demand for premium solar solutions across every district.', icon: TrendingUp },
  { number: '02', title: 'Strong Brand Recognition', desc: "With decades of trust, government awards, and thousands of happy clients, Spectrum Solar is the leading name in Kerala's renewable energy space.", icon: Star },
  { number: '03', title: 'Low Investment – High Growth Model', desc: 'Our franchise model is designed for maximum profitability with minimal risk and strong, consistent returns from day one.', icon: BarChart3 },
  { number: '04', title: 'Full Training & Support', desc: 'Product training, technical guidance, installation support, and dedicated sales & operational assistance every step of the way.', icon: Headphones },
  { number: '05', title: 'State-Wide Presence', desc: 'Join our growing network of 20+ outlets and 12 franchise units. Expand under a brand Kerala already trusts.', icon: MapPin },
];

const products = [
  'On-Grid Solar Systems', 'Hybrid Solar Systems', 'Lithium Off-Grid Systems',
  'Solar Water Heaters', 'Lithium LFP & Lead Acid Batteries', 'UPS & Inverters', 'Energy Audit Services',
];

const benefits = [
  'Highly profitable business model', 'Exclusive territory rights',
  'Verified leads from Spectrum Solar', 'Dedicated regional support team',
  'Marketing materials & branding support', 'Product & technical training included',
  'ERP & inventory management support', 'Priority product allocation',
];

const Franchise: React.FC = () => {
  useScrollReveal();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why start a Spectrum Solar Franchise in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spectrum Solar offers an exciting Franchise Opportunity with decades of trust, high growth model, full training, and a nationwide presence."
        }
      },
      {
        "@type": "Question",
        "name": "What products are included in the franchise?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On-Grid Solar Systems, Hybrid Solar Systems, Lithium Off-Grid Systems, Solar Water Heaters, Lithium LFP & Lead Acid Batteries, and UPS & Inverters."
        }
      }
    ]
  };

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      <SEO 
        title="Start a Solar Franchise in India | Low Investment | Spectrum Solar"
        description="Partner with India's most trusted solar energy brand. High growth, low investment franchise opportunities with full training and support nationwide."
        schema={faqSchema}
      />

      {/* ── Hero + Stats (flush, like OnGrid) ── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/franchise.jpeg" className="w-full h-full object-cover object-center" alt="Franchise Opportunity" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
            <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Business Opportunity</span>
          </div>
          <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Spectrum Solar<br /><span className="text-yellow-400">Franchise</span> in Kerala
          </h1>
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
            Partner With Kerala's Most Trusted Solar Energy Brand
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact?type=franchise" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(250,204,21,0.3)] text-sm">
              <ArrowRight className="w-5 h-5" /> Apply for Franchise
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: '24+', label: 'Years of Leadership' },
                { value: '10K+', label: 'Successful Installations' },
                { value: '20+', label: 'Regional Outlets' },
                { value: '12', label: 'Active Franchise Units' },
              ].map((s, i) => (
                <div key={s.label} className={`py-6 px-4 text-center ${i < 3 ? 'border-r border-black/10' : ''}`}>
                  <div className="text-2xl md:text-4xl font-black text-black tracking-tighter leading-none">{s.value}</div>
                  <div className="text-black/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Franchise ── */}
      <section className="px-6 py-20 md:py-28" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              Why Start a<br />Spectrum Franchise?
            </h2>
          </div>

          <div className="space-y-4">
            {whyItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="reveal group premium-cream-card flex flex-col sm:flex-row gap-5 sm:gap-8 p-6 sm:p-8 rounded-[2rem]"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-start gap-5 flex-shrink-0">
                    <span className="text-5xl font-black text-black/[0.06] group-hover:text-yellow-400/20 transition-colors leading-none w-14 text-right flex-shrink-0 hidden sm:block">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                      <Icon className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-thin uppercase tracking-tight text-black mb-2 group-hover:text-yellow-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Products + Image ── */}
      <section className="px-6 py-20 md:py-28 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Product Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-thin uppercase tracking-tight leading-[0.9] mb-6 text-black">
              What You Can Sell<br />as a Partner
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-8">
              As a Spectrum Solar Franchise Partner, you get access to our complete product ecosystem — one of the most comprehensive solar and backup ranges in Kerala.
            </p>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>
                  <span className="text-zinc-700 text-sm">{product}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl border border-black/5" style={{ transitionDelay: '150ms' }}>
            <img src="/images/Banner04.jpg" alt="Spectrum Products" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="px-6 py-20 md:py-28 bg-zinc-50 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">What You Get</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              Franchise Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="reveal premium-cream-card flex items-start gap-3 p-6 rounded-[1.5rem]"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-700 text-sm leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pt-20 pb-4 md:pt-28" data-nav-light>
        <div className="max-w-7xl mx-auto reveal">
          <div className="relative bg-yellow-400 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-black/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-black/5 rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
              <div>
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Ready to Begin?</div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight text-black leading-[0.9]">
                  Apply to Become a<br />Franchise Partner
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                <Link to="/contact?type=franchise" className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl text-sm">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/opportunities" className="bg-white/30 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/40 transition-all flex items-center justify-center gap-2 border border-black/10 text-sm">
                  All Opportunities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Franchise;
