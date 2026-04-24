import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Briefcase, MapPin, Users, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const opportunities = [
  {
    id: 'franchise',
    icon: <Rocket className="w-8 h-8" />,
    title: 'Franchise',
    subtitle: 'Own a Spectrum Powers outlet',
    accentColor: '#facc15',
    link: '/opportunities/franchise',
    description:
      'Join India\'s fastest-growing solar franchise network. With 25 years of brand trust, proven business model, full ERP support, and exclusive territory rights — own a business backed by India\'s most awarded solar company.',
    benefits: [
      'Exclusive territory rights',
      'Full brand & marketing support',
      'ERP + inventory management',
      'Training & certification',
      'Priority product allocation',
    ],
    investment: '₹15L – ₹50L (varies by location & size)',
    image: '/images/franchise.webp',
  },
  {
    id: 'dealership',
    icon: <MapPin className="w-8 h-8" />,
    title: 'Dealership',
    subtitle: 'Distribute our product range',
    accentColor: '#60a5fa',
    link: '/opportunities/dealership',
    description:
      'Become an authorised dealer for Spectrum\'s complete product line — solar systems, UPS, inverters, and batteries. Low investment, high margins, and the backing of a brand with 12 franchise units and 20 regional outlets.',
    benefits: [
      'Authorised dealer certificate',
      'Competitive dealer margins',
      'Co-branded marketing material',
      'Technical training included',
      'Product demonstration support',
    ],
    investment: '₹5L – ₹15L (stock & showroom)',
    image: '/images/dealership.webp',
  },
  {
    id: 'freelance',
    icon: <Users className="w-8 h-8" />,
    title: 'Freelance Dealer',
    subtitle: 'Earn on every referral',
    accentColor: '#4ade80',
    link: '/opportunities/freelance',
    description:
      'No investment required. Simply refer customers who buy solar systems or backup solutions — earn a competitive commission on every closed deal. Perfect for electricians, contractors, and real estate professionals.',
    benefits: [
      'Zero investment required',
      'Commission on every deal',
      'Refer from anywhere in India',
      'Mobile tracking dashboard',
      'Monthly payout guaranteed',
    ],
    investment: 'No investment — revenue share model',
    image: '/images/Freelance.webp',
  },
  {
    id: 'jobs',
    icon: <Briefcase className="w-8 h-8" />,
    title: 'Job Opportunities',
    subtitle: 'Grow with Spectrum Powers',
    accentColor: '#fb923c',
    link: '/careers',
    description:
      'We are always looking for passionate engineers, sales professionals, and service technicians to join our 300+ team. Roles available across India — from installation technicians to solar design engineers.',
    benefits: [
      'Competitive salary + incentives',
      'Certified training programs',
      'Career growth path',
      'Medical + PF benefits',
      'Field + office roles available',
    ],
    investment: 'Apply with your CV — we will reach out',
    image: '/images/Careers.webp',
  },
];

const Opportunities: React.FC = () => {
  useScrollReveal();
  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden min-h-screen">
      <SEO 
        title="Business Opportunities & Careers | Spectrum Solar India"
        description="Grow with India's fastest-growing solar network. Explore our Franchise, Dealership, Freelance, and Career opportunities nationwide."
      />
      {/* Hero */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about-hero.webp"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Opportunities at Spectrum Powers"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
            Grow with us
          </span>
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Opportunities
          </h1>
          <p className="text-white/70 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Franchise, dealerships, referral partnerships, and careers — powered by 25 years of trust.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="bg-zinc-900 border-y border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '12+', label: 'Active Franchises' },
            { value: '20+', label: 'Regional Outlets' },
            { value: '300+', label: 'Team Members' },
            { value: '25+', label: 'Years of Trust' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-black text-yellow-400 tracking-tighter">{s.value}</p>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunity Cards */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">What We Offer</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight leading-none mb-4">
              Choose Your Path
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm font-light">
              Whether you invest, sell, refer, or join — there is a place for you in the Spectrum family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp, index) => (
              <Link
                key={opp.id}
                to={opp.link}
                className="reveal group relative border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-500 hover:border-zinc-600 block"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Image with overlay */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                  <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: opp.accentColor + '20', border: `1px solid ${opp.accentColor}40`, color: opp.accentColor }}
                  >
                    {opp.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-[9px] font-black uppercase tracking-widest mb-2 block" style={{ color: opp.accentColor }}>
                    {opp.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-thin uppercase tracking-tight mb-4">{opp.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">{opp.description}</p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {opp.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: opp.accentColor }} />
                        <span className="text-zinc-300 text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Investment line */}
                  <div className="p-4 rounded-2xl mb-6" style={{ background: opp.accentColor + '10', border: `1px solid ${opp.accentColor}20` }}>
                    <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: opp.accentColor }}>
                      Investment / Entry
                    </p>
                    <p className="text-white font-black text-sm">{opp.investment}</p>
                  </div>

                  <div
                    className="inline-flex items-center gap-2 font-black text-[11px] uppercase tracking-[0.3em] transition-all group/cta"
                    style={{ color: opp.accentColor }}
                  >
                    Know More
                    <ArrowRight className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section instead of form */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block">Ready to Begin?</span>
          <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight leading-none mb-8">
            Let's Build the Future<br />of Energy Together.
          </h2>
          <p className="text-zinc-500 text-lg font-light mb-12 max-w-xl mx-auto">
            Our partnerships team is ready to discuss how we can grow together. Visit our enquiry page to start the conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-yellow-400 text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_50px_rgba(250,204,21,0.2)]"
          >
            Go to Enquiry Form <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Opportunities;
