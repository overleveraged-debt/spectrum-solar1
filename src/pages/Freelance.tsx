import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Users, CheckCircle2, ArrowRight, Banknote, MapPin, Zap, UserCheck, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const howItWorks = [
  { step: '01', title: 'Join as a Freelance Partner', desc: "Register with us for free — no investment, no paperwork hassle. Just fill out the form and we'll onboard you within 24 hours." },
  { step: '02', title: 'Refer Customers', desc: 'Refer customers who need solar installation, power backup solutions, or energy audit services anywhere in India.' },
  { step: '03', title: 'We Handle Everything', desc: "Our expert team handles consultation, site survey, installation, and after-sales service — you don't have to do a thing." },
  { step: '04', title: 'Earn Your Commission', desc: 'You earn an attractive commission for every successful conversion. Quick payouts, no delays.' },
];

const referItems = [
  'Home solar installations', 'Commercial & industrial solar projects',
  'Solar water heaters', 'Lithium & lead acid batteries',
  'UPS & inverters', 'Energy audit & maintenance services',
];

const whoCanJoin = [
  { label: 'Students', icon: UserCheck },
  { label: 'Freelancers & Marketers', icon: Briefcase },
  { label: 'Business Networking Groups', icon: Users },
  { label: 'Real Estate Agents', icon: MapPin },
  { label: 'Electricians & Technicians', icon: Zap },
  { label: 'Anyone with a Network in India', icon: Users },
];

const benefits = [
  'No investment required', 'Work from anywhere in India',
  'Unlimited earning potential', 'Quick payouts on every deal',
  'Training & support provided', 'No experience required',
  'Flexible working hours', 'Join a 24+ year trusted brand',
];

const Freelance: React.FC = () => {
  useScrollReveal();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the Spectrum Solar Freelance Partner program work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Join for free, refer customers across India for solar installations, and earn an attractive commission. We handle all the technical work and support."
        }
      },
      {
        "@type": "Question",
        "name": "Who can join the freelance solar program?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Students, freelancers, real estate agents, electricians, and anyone with a network in India can join with zero investment."
        }
      }
    ]
  };

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      <SEO 
        title="Freelance Solar Partner Program India | Refer & Earn"
        description="Earn attractive commissions with zero investment. Refer solar customers across India and partner with Spectrum Solar's trusted network."
        schema={faqSchema}
      />

      {/* ── Hero + Stats (flush, like OnGrid) ── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/Freelance.jpeg" className="w-full h-full object-cover object-center" alt="Freelance Opportunity" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
            <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Earn From Anywhere</span>
          </div>
          <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            <span className="text-yellow-400">Freelance</span><br />with Spectrum Solar
          </h1>
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
            No investment. No experience required. Just refer &amp; earn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact?type=freelance" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(250,204,21,0.3)] text-sm">
              <ArrowRight className="w-5 h-5" /> Join Free – Start Earning
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: '₹0', label: 'Investment Required' },
                { value: '24+', label: 'Years of Trust' },
                { value: '∞', label: 'Earning Potential' },
                { value: 'Kerala', label: 'Coverage Area' },
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

      {/* ── How It Works ── */}
      <section className="px-6 py-20 md:py-28" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Simple Process</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              How the Freelance<br />Model Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="reveal group premium-cream-card p-8 md:p-10 rounded-[2rem]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="text-5xl font-black text-black/[0.06] group-hover:text-yellow-400/20 transition-colors leading-none mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-thin uppercase tracking-tight text-black mb-3 group-hover:text-yellow-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to Refer + Who Can Join ── */}
      <section className="px-6 py-20 md:py-28 bg-zinc-50 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="reveal premium-cream-card p-8 md:p-10 rounded-[2rem]">
            <Zap className="w-10 h-10 text-yellow-500 mb-6" />
            <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-3 block">Refer These</span>
            <h3 className="text-2xl md:text-3xl font-thin uppercase tracking-tight mb-6 text-black">What You Can Refer</h3>
            <ul className="space-y-3">
              {referItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-zinc-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal premium-cream-card p-8 md:p-10 rounded-[2rem]" style={{ transitionDelay: '100ms' }}>
            <Users className="w-10 h-10 text-yellow-500 mb-6" />
            <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mb-3 block">Open to Everyone</span>
            <h3 className="text-2xl md:text-3xl font-thin uppercase tracking-tight mb-6 text-black">Who Can Join?</h3>
            <div className="space-y-3">
              {whoCanJoin.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-yellow-400/20">
                  <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-yellow-500" />
                  </div>
                  <span className="text-zinc-700 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="px-6 py-20 md:py-28 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Partner Perks</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              Benefits of Joining
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
          <div className="relative bg-yellow-400 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-black/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-black/5 rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
              <div>
                <Banknote className="w-12 h-12 text-black mb-4" />
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Your Network = Your Net Worth</div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight text-black leading-[0.9]">
                  Join as a Freelance<br />Partner &amp; Start Earning
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                <Link to="/contact?type=freelance" className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl text-sm">
                  Join Now – Free <ArrowRight className="w-4 h-4" />
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

export default Freelance;
