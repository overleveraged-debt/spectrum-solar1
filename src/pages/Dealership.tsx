import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Briefcase, CheckCircle2, ArrowRight, BarChart3, Users, GraduationCap, Megaphone, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const whyItems = [
  { number: '01', title: 'High-Demand Product Range', desc: 'Dealers get access to top-quality solar panels, inverters, batteries, hybrid & off-grid systems, solar water heaters, and UPS — all from a trusted brand.', icon: Store },
  { number: '02', title: 'Strong Profit Margins', desc: 'Our dealership model ensures competitive pricing, attractive margins, and consistent demand that keeps your business growing month after month.', icon: BarChart3 },
  { number: '03', title: 'Marketing & Branding Support', desc: 'Dealers receive product brochures, digital marketing support, and the full brand credibility of Spectrum Solar to win customers faster.', icon: Megaphone },
  { number: '04', title: 'Wide Customer Base', desc: 'Sell to households, shops & businesses, schools & institutions, and factories & industries — demand spans every segment nationwide.', icon: Users },
  { number: '05', title: 'Training & Product Knowledge', desc: 'We offer regular technical and sales training to ensure your team stays current and serves customers effectively.', icon: GraduationCap },
];

const products = [
  'Solar Panels', 'Solar Inverters', 'Lithium & Lead Acid Batteries',
  'Hybrid & Off-Grid Systems', 'Solar Water Heaters', 'UPS & Inverters',
];

const responsibilities = [
  'Promote Spectrum products in your region',
  'Manage local customer inquiries',
  'Maintain product availability',
  'Coordinate installation if required',
  'Represent the Spectrum brand with integrity',
];

const benefits = [
  'Authorised dealer certificate', 'Competitive dealer margins',
  'Co-branded marketing material', 'Technical training included',
  'Product demonstration support', 'Priority product allocation',
  'Regional support team access', 'Growing brand network backing',
];

const Dealership: React.FC = () => {
  useScrollReveal();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why become a Spectrum Solar Dealer in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dealers get access to high-demand solar products, strong profit margins, and full marketing support from a recognized national brand."
        }
      },
      {
        "@type": "Question",
        "name": "What products can a dealer sell?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Solar Panels, Solar Inverters, Lithium & Lead Acid Batteries, Hybrid & Off-Grid Systems, Solar Water Heaters, and UPS."
        }
      }
    ]
  };

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      <SEO 
        title="Solar Dealership Network India | Partner with Spectrum Solar"
        description="Become an authorized solar dealer in India. High-demand products, strong margins, and full marketing support from Spectrum Solar."
        schema={faqSchema}
      />

      {/* ── Hero + Stats (flush, like OnGrid) ── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/dealership_hero.webp" className="w-full h-full object-cover object-center" alt="Dealership Opportunity" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
            <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Dealership Opportunity</span>
          </div>
          <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Solar <span className="text-yellow-400">Dealership</span><br />in India
          </h1>
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
            Become a Certified Dealer of Spectrum Solar Products
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact?type=dealership" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(250,204,21,0.3)] text-sm">
              <ArrowRight className="w-5 h-5" /> Become a Dealer
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: '24+', label: 'Years of Trust' },
                { value: '10K+', label: 'Installations Done' },
                { value: '20+', label: 'Regional Outlets' },
                { value: 'Nationwide', label: 'Coverage Area' },
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

      {/* ── Why Dealer ── */}
      <section className="px-6 py-20 md:py-28" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Why Partner With Us</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              Why Become a<br />Spectrum Dealer?
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

      {/* ── Products + Responsibilities ── */}
      <section className="px-6 py-20 md:py-28 bg-zinc-50 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">The Details</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              Your Role as a Dealer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal premium-cream-card p-8 md:p-10 rounded-[2rem]">
              <Briefcase className="w-10 h-10 text-yellow-500 mb-6" />
              <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-3 block">What You Sell</span>
              <h3 className="text-2xl md:text-3xl font-thin uppercase tracking-tight mb-6 text-black">Product Range</h3>
              <ul className="space-y-3">
                {products.map((product) => (
                  <li key={product} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-zinc-700 text-sm">{product}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal premium-cream-card p-8 md:p-10 rounded-[2rem]" style={{ transitionDelay: '100ms' }}>
              <Store className="w-10 h-10 text-yellow-500 mb-6" />
              <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-3 block">Your Role</span>
              <h3 className="text-2xl md:text-3xl font-thin uppercase tracking-tight mb-6 text-black">Dealer Responsibilities</h3>
              <ul className="space-y-3">
                {responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700 text-sm">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="px-6 py-20 md:py-28 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Dealer Perks</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              What You Receive
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
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Join Our Network</div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight text-black leading-[0.9]">
                  Register as an<br />Authorized Dealer
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                <Link to="/contact?type=dealership" className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl text-sm">
                  Register Now <ArrowRight className="w-4 h-4" />
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

export default Dealership;
