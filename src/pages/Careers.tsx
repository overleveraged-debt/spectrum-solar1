import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  TrendingUp, BookOpen, Briefcase, Heart, Users, ArrowRight,
  ChevronDown, CheckCircle2, Zap, HeadphonesIcon, Settings, PhoneCall
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const faqs = [
  { q: 'What roles are available?', a: 'We have openings in Sales, Engineering, Operations, and Customer Support. Check our open positions below or reach out through the enquiry form.' },
  { q: 'How do I apply?', a: 'Submit your details through our enquiry form and mention the role you are interested in. Our HR team will get back to you within 2–3 business days.' },
  { q: 'Do you hire freshers?', a: 'Absolutely. We welcome freshers across all departments and provide full onboarding and on-the-job training to help you grow quickly.' },
  { q: 'What is the work culture like?', a: 'Collaborative and growth-focused. We believe in open communication, continuous learning, and giving our team the tools they need to succeed.' },
  { q: 'Are there growth opportunities?', a: 'Yes. Many of our senior team members started in junior roles. We actively promote from within and invest in the professional development of our people.' },
  { q: 'Why join Spectrum Solar?', a: "You'll be building a career in one of India's fastest-growing industries, backed by a 24+ year brand with a strong national reputation in renewable energy." },
];

const openPositions = [
  { title: 'Sales Executive', type: 'Full Time', location: 'Pan India', desc: 'Drive customer acquisition for solar and power backup solutions across India. Strong communication skills required.', icon: TrendingUp },
  { title: 'Site Engineer', type: 'Full Time', location: 'Pan India', desc: 'Design, install, and commission solar energy systems at residential and commercial sites. Electrical engineering background preferred.', icon: Settings },
  { title: 'Operations Executive', type: 'Full Time', location: 'Remote / HQ', desc: 'Manage day-to-day operations, coordinate with field teams, and handle project tracking and documentation.', icon: Briefcase },
  { title: 'Customer Support', type: 'Full Time', location: 'Remote / HQ', desc: 'Handle customer queries, coordinate service visits, and ensure post-installation satisfaction for our growing client base.', icon: HeadphonesIcon },
];

const whyItems = [
  { icon: TrendingUp, title: 'Growth Opportunities', desc: 'Clear career progression paths and internal promotions. We invest in your professional development from day one.' },
  { icon: BookOpen, title: 'Learning Environment', desc: 'Regular training sessions, industry workshops, and access to the latest solar technology keep you ahead of the curve.' },
  { icon: Zap, title: 'Industry Exposure', desc: "Work on some of India's most exciting solar and energy storage projects — from residential rooftops to large commercial installations." },
  { icon: Heart, title: 'Meaningful Work', desc: "Every project you work on contributes to a greener India. Build a career that you're proud of — one that makes a real difference." },
];

const Careers: React.FC = () => {
  useScrollReveal();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
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

      {/* ── Hero + Stats (flush, like OnGrid) ── */}
      <section className="relative min-h-[calc(100vh+80px)] flex flex-col overflow-hidden mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/Careers.webp" className="w-full h-full object-cover object-center" alt="Careers at Spectrum Solar" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 rounded-full px-5 py-2 mb-8">
            <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.35em]">Join Our Team</span>
          </div>
          <h1 className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 leading-[0.88] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Build Your <span className="text-yellow-400">Career</span><br />with Spectrum Solar
          </h1>
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium mb-10">
            Be part of a team powering a sustainable future.
          </p>
          <Link to="/contact?type=careers" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-9 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.3)] text-sm">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative z-10 w-full bg-yellow-400 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: '24+', label: 'Years in Business' },
                { value: '10K+', label: 'Installations Done' },
                { value: '4', label: 'Open Positions' },
                { value: 'Nationwide', label: 'Where We Operate' },
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

      {/* ── Introduction ── */}
      <section className="px-6 py-20 md:py-28" data-nav-light>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Who We Are</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-[0.9] mb-6 text-black">
              Careers That<br />Matter
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-6">
              At Spectrum Solar Power, we believe in building careers that make a real difference. With 24+ years of industry leadership and 10,000+ successful installations, we are one of India's most established solar energy companies.
            </p>
            <p className="text-zinc-500 text-base leading-relaxed mb-8">
              Join us and contribute to a greener, more sustainable future — while building a career you're proud of.
            </p>
            <Link
              to="/contact?type=careers"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all text-sm shadow-xl"
            >
              View Open Positions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl border border-black/5" style={{ transitionDelay: '150ms' }}>
            <img src="/images/Careers.webp" alt="Spectrum Solar Team" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="px-6 py-20 md:py-28 bg-zinc-50 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">The Benefits</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              Why Work With Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="reveal group premium-cream-card flex gap-6 p-8 md:p-10 rounded-[2rem]"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors mt-1">
                    <Icon className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-thin uppercase tracking-tight text-black mb-2 group-hover:text-yellow-600 transition-colors">
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

      {/* ── Work Culture ── */}
      <section className="px-6 py-20 md:py-28 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <Users className="w-12 h-12 text-yellow-500 mb-6" />
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Our Culture</span>
            <h2 className="text-4xl md:text-5xl font-thin uppercase tracking-tight leading-[0.9] mb-6 text-black">
              Work Culture
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-6">
              We promote innovation, teamwork, and sustainability. Our team is driven by passion and purpose — every member contributes to a mission bigger than any single project.
            </p>
            <div className="space-y-3">
              {[
                'Open and transparent communication',
                'Collaborative cross-functional teams',
                'Continuous learning and mentorship',
                'Passion-driven, purpose-led work',
                'Inclusive and supportive environment',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-zinc-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4" style={{ transitionDelay: '150ms' }}>
            {[
              { label: 'Innovation', sub: 'Always pushing forward' },
              { label: 'Teamwork', sub: 'Better together' },
              { label: 'Sustainability', sub: 'Our core mission' },
              { label: 'Purpose', sub: 'Work that matters' },
            ].map((c, i) => (
              <div key={i} className="premium-cream-card p-6 rounded-[1.5rem] flex flex-col justify-between min-h-[140px]">
                <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                </div>
                <div>
                  <div className="text-black font-thin uppercase tracking-tight text-lg leading-tight">{c.label}</div>
                  <div className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-1">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="px-6 py-20 md:py-28 bg-zinc-50 border-t border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 md:mb-16">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Now Hiring</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight leading-none text-black">
              Open Positions
            </h2>
          </div>
          <div className="space-y-4">
            {openPositions.map((pos, index) => {
              const Icon = pos.icon;
              return (
                <div
                  key={pos.title}
                  className="reveal group premium-cream-card flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 p-6 sm:p-8 rounded-[2rem]"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-lg font-thin uppercase tracking-tight text-black group-hover:text-yellow-600 transition-colors">
                        {pos.title}
                      </h3>
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-600">
                        {pos.type}
                      </span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{pos.location}</div>
                    <p className="text-zinc-500 text-sm leading-relaxed">{pos.desc}</p>
                  </div>
                  <Link
                    to="/contact?type=careers"
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-yellow-400 hover:text-black transition-all flex-shrink-0 shadow-lg"
                  >
                    Apply <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="px-6 py-20 md:py-28 border-t border-zinc-100" data-nav-light>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16 reveal">
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Questions</span>
            <h2 className="text-3xl md:text-5xl font-thin uppercase tracking-tight mb-4 text-black">Frequently Asked</h2>
            <p className="text-zinc-500 font-light text-base">Everything you need to know about working at Spectrum Solar.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-[1.5rem] overflow-hidden border transition-all duration-300 ${activeFaq === i ? 'border-yellow-400/60 bg-yellow-400/5' : 'border-zinc-200 bg-white'}`}
              >
                <button
                  className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-thin uppercase tracking-tight text-base md:text-lg text-black">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-yellow-500 flex-shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-6 border-t border-yellow-400/20 pt-4">
                    <p className="text-zinc-500 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </div>
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
                <div className="text-black/50 text-[10px] font-black uppercase tracking-[0.4em] mb-3">We Are Growing</div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin uppercase tracking-tight text-black leading-[0.9]">
                  Join Our<br />Growing Team
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                <Link
                  to="/contact?type=careers"
                  className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl text-sm"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+919745660055"
                  className="bg-white/30 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/40 transition-all flex items-center justify-center gap-2 border border-black/10 text-sm"
                >
                  <PhoneCall className="w-4 h-4" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
