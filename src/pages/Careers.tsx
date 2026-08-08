import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  TrendingUp, BookOpen, Heart, ArrowRight,
  ChevronDown, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { sanityReadClient } from '../lib/sanityClient';

const DEFAULT_WHY_ITEMS = [
  { title: 'Growth Opportunities', desc: 'Clear career progression paths and internal promotions. We invest in your professional development from day one.' },
  { title: 'Learning Environment', desc: 'Regular training sessions, industry workshops, and access to the latest solar technology keep you ahead of the curve.' },
  { title: 'Industry Exposure', desc: "Work on some of India's most exciting solar and energy storage projects — from residential rooftops to large commercial installations." },
  { title: 'Meaningful Work', desc: "Every project you work on contributes to a greener India. Build a career that you're proud of — one that makes a real difference." }
];

const DEFAULT_POSITIONS = [
  { title: 'Sales Executive', type: 'Full Time', location: 'Pan India', desc: 'Drive customer acquisition for solar and power backup solutions across India. Strong communication skills required.' },
  { title: 'Site Engineer', type: 'Full Time', location: 'Pan India', desc: 'Design, install, and commission solar energy systems at residential and commercial sites. Electrical engineering background preferred.' },
  { title: 'Operations Executive', type: 'Full Time', location: 'Remote / HQ', desc: 'Manage day-to-day operations, coordinate with field teams, and handle project tracking and documentation.' },
  { title: 'Customer Support', type: 'Full Time', location: 'Remote / HQ', desc: 'Handle customer queries, coordinate service visits, and ensure post-installation satisfaction for our growing client base.' }
];

const DEFAULT_FAQS = [
  { q: 'What roles are available?', a: 'We have openings in Sales, Engineering, Operations, and Customer Support. Check our open positions below or reach out through the HR enquiry form.' },
  { q: 'How do I apply?', a: 'Submit your details through our enquiry form and mention the role you are interested in. Our HR team will get back to you within 2–3 business days.' },
  { q: 'Do you hire freshers?', a: 'Absolutely. We welcome freshers across all departments and provide full onboarding and on-the-job training to help you grow quickly.' }
];

const DEFAULT_CAREERS_DATA = {
  showHero: true,
  heroTitle: 'JOIN THE ENERGY REVOLUTION',
  heroSubtitle: 'Careers',
  heroImage: '/images/about-hero.webp',
  heroDesc: "Empower your career with India's most trusted solar solutions brand. We are looking for innovators, builders, and green champions.",
  showStats: true,
  stats: [
    { value: "25 Yrs", label: "Brand Legacy" },
    { value: "40K+", label: "Happy Customers" },
    { value: "18+", label: "Regional Centers" },
    { value: "60+", label: "Service Engineers" }
  ],
  whyTitle: 'Why Join Spectrum?',
  whyItems: DEFAULT_WHY_ITEMS,
  positionsTitle: 'Open Positions.',
  openPositions: DEFAULT_POSITIONS,
  faqsTitle: 'Frequently Asked Questions.',
  faqs: DEFAULT_FAQS
};

const resolveIcon = (index: number) => {
  switch (index % 4) {
    case 0: return <TrendingUp className="w-6 h-6" />;
    case 1: return <BookOpen className="w-6 h-6" />;
    case 2: return <Zap className="w-6 h-6" />;
    case 3: return <Heart className="w-6 h-6" />;
    default: return <TrendingUp className="w-6 h-6" />;
  }
};

const Careers: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [pageData, setPageData] = useState(DEFAULT_CAREERS_DATA);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "careers"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            setPageData(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse careers page data", e);
          }
        }
      })
      .catch(err => console.error("Error fetching careers data:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const activeFaqs: { q: string; a: string }[] = pageData.faqs || [];
  const activeWhyItems: { title: string; desc: string }[] = pageData.whyItems || [];
  const activePositions: { title: string; type: string; location: string; desc: string }[] = pageData.openPositions || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": activeFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      <SEO 
        title="Careers at Spectrum Solar | Join the Green Energy Revolution in India"
        description="Build your career with India's leading solar energy brand. We are hiring for Sales, Engineering, Operations, and more. Apply today!"
        schema={faqSchema}
      />

      {/* Hero Section */}
      {pageData.showHero !== false && (
        <section className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden mt-[-80px]">
          <div className="absolute inset-0 z-0">
            <img
              src={pageData.heroImage}
              className="w-full h-full object-cover object-center"
              alt="Spectrum Engineering Team"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-8">
            <div className="max-w-7xl mx-auto text-center w-full">
              <span className="text-yellow-400 font-medium tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
                {pageData.heroSubtitle}
              </span>
              <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
                {pageData.heroTitle.includes('ENERGY REVOLUTION') ? (
                  <>JOIN THE <br />ENERGY REVOLUTION</>
                ) : (
                  pageData.heroTitle
                )}
              </h1>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-light tracking-wide mb-10">
                {pageData.heroDesc || "Empower your career with India's most trusted solar solutions brand. We are looking for innovators, builders, and green champions."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#positions" className="bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-xl">
                  View Openings
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}



      {/* Why Section */}
      <section className="px-6 py-24 md:py-32 bg-white" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24 reveal">
            <span className="text-zinc-500 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Work Culture</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight text-black">
              {pageData.whyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeWhyItems.map((item, index) => (
              <div
                key={index}
                className="reveal p-8 rounded-3xl premium-cream-card hover:scale-[1.02] transition-all duration-300 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-white/50 border border-yellow-250/20 rounded-2xl flex items-center justify-center text-zinc-900 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300 mb-6 shadow-sm">
                  {resolveIcon(index)}
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-zinc-900">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section id="positions" className="px-6 py-24 md:py-32 bg-zinc-50 border-y border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24 reveal">
            <span className="text-zinc-500 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Opportunities</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight text-black">
              {pageData.positionsTitle || "Open Positions."}
            </h2>
          </div>

          {activePositions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activePositions.map((pos, index) => {
                return (
                  <div
                    key={index}
                    className="reveal p-8 premium-cream-card rounded-3xl flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/70 text-yellow-700 rounded-full border border-yellow-200/50">
                          {pos.type}
                        </span>
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                          {pos.location}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-950 mb-3">{pos.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-8">{pos.desc}</p>
                    </div>
                    <Link
                      to={`/contact?type=careers&role=${encodeURIComponent(pos.title)}`}
                      className="w-full bg-zinc-950 text-white py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-yellow-400 hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      Apply For Role
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 bg-white border border-zinc-100 rounded-3xl">
              <p className="text-zinc-500 font-medium">No open positions at this time. Please check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 md:py-32 bg-white" data-nav-light>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-24 reveal">
            <span className="text-zinc-500 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Hiring Process</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight text-black">
              {pageData.faqsTitle || "Frequently Asked Questions."}
            </h2>
          </div>

          <div className="space-y-4">
            {activeFaqs.map((faq, index) => (
              <div
                key={index}
                className="reveal premium-cream-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-black text-sm uppercase tracking-tight text-zinc-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-yellow-500' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="p-6 text-zinc-650 text-sm leading-relaxed bg-white/50 border-t border-yellow-250/20">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
