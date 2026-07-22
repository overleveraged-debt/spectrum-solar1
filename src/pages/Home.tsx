import React, { useState, useEffect, useCallback } from 'react';
import { Droplets, Cpu, Layers, ShieldCheck, Waves, TrendingUp, Sun, Star, CheckCircle2, Quote, ArrowRight, ChevronLeft, ChevronRight, Zap, Leaf, ExternalLink, BatteryCharging } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import LoadingScreen from '../components/LoadingScreen';
import SEO from '../components/SEO';

import { allTestimonials } from '../data/testimonials';
import { sanityReadClient } from '../lib/sanityClient';

const DEFAULT_HOME_DATA = {
  // Hero Section
  showHero: true,
  heroTitle: 'Precision Since 2002.',
  heroVideoPoster: '/images/Banner01.jpg',
  heroVideoUrl: 'https://m1xmbxx46bhiywtx.public.blob.vercel-storage.com/hero-bg.mp4',

  // Stats Bar
  showStatsBar: true,
  stat1Value: '25+',
  stat1Label: 'Years Industry Lead',
  stat2Value: '20',
  stat2Label: 'Regional Outlets',
  stat3Value: '12',
  stat3Label: 'Franchise Units',
  stat4Value: 'ERP',
  stat4Label: 'Enabled since 2005',

  // Solar Section
  showSolarSection: true,
  solarSectionSubtitle: 'Solar Solutions',
  solarSectionTitle: 'Solar Systems.',
  solarSectionImage: '/images/home_solar_banner.webp',
  
  // 4 Solar Boxes
  solarBox1Title: 'On-Grid Solar',
  solarBox1Sub: 'Grid-Tied',
  solarBox1Desc: 'Zero electricity bills with net metering. Fastest ROI. Best for homes & offices.',
  solarBox2Title: 'Hybrid Solar',
  solarBox2Sub: 'Grid + Battery',
  solarBox2Desc: 'Day & night power. Solar generation + lithium backup for seamless reliability.',
  solarBox3Title: 'Lithium Off-Grid',
  solarBox3Sub: 'Off-Grid',
  solarBox3Desc: 'Complete energy independence. For remote sites, islands & hospitals.',
  solarBox4Title: 'Solar Water Heaters',
  solarBox4Sub: 'Thermal Savings',
  solarBox4Desc: 'High-efficiency vacuum tube systems. 100L to 2000L for any scale.',

  // Backup Section
  showBackupSection: true,
  backupSectionSubtitle: 'Power Backup',
  backupSectionTitle: 'Backup Systems.',
  backupSectionImage: '/images/home_backup_banner.webp',
  // 6 Backup Boxes
  backupBox1Title: 'Lithium UPS',
  backupBox1Sub: 'Pure Sine Wave',
  backupBox2Title: 'Home UPS',
  backupBox2Sub: 'Zero Interruption',
  backupBox3Title: 'Inverters',
  backupBox3Sub: 'All Capacities',
  backupBox4Title: 'Online UPS',
  backupBox4Sub: 'IT & Server',
  backupBox5Title: 'Lithium Batteries',
  backupBox5Sub: '4000+ Cycles',
  backupBox6Title: 'Tubular Batteries',
  backupBox6Sub: 'Lead-Acid Value',
  
  // Why Spectrum Section
  showWhySpectrum: true,
  whySpectrumSubtitle: 'Why Spectrum',
  whySpectrumTitle: "India's Most Trusted Solar Partner.",
  whySpectrumDesc: '25 years. 6,145+ Solar Installations. Government-awarded excellence. Engineered for India\'s diverse climate.',
  whySpectrumBgImage: '/images/nature-kerala.webp',
  
  // Why Go Solar Section
  showWhyGoSolar: true,
  whyGoSolarSubtitle: 'The Solar Advantage',
  whyGoSolarTitle: 'Why Go Solar?',
  whyGoSolarImage: '/images/home_why_solar.webp',
  
  // Our Heritage Section
  showHeritage: true,
  heritageSubtitle: 'Our Heritage',
  heritageTitle: 'Spectrum Powers India.',
  heritageImage: '/images/home_heritage_banner.webp',
  heritageDesc: 'Specializing in power electronics and solar system integration, we prioritize a customer-centric approach that drives our high referral rates.',
  heritageAccreditationTitle: 'Best Solar Energy Industry Award',
  heritageAccreditationDesc: 'National Solar Excellence Award Recipient',
  
  // Testimonials fallback list
  testimonials: [
    { 
      name: 'Abdul Rahman', 
      product: '5KW Hybrid Solar', 
      text: 'Spectrum Powers installed a 5KW Hybrid system at my home. The service team was extremely professional, and my electricity bill has literally dropped to zero.', 
      initials: 'AR', 
      date: '2 months ago', 
      isVerified: true
    },
    { 
      name: 'Dr. Somashekharan', 
      product: '50KW Commercial', 
      text: 'Their 50KW installation has been performing flawlessly for over 3 years. One of the most reliable power partners we have worked with. Highly recommended.', 
      initials: 'DS', 
      date: '1 year ago', 
      isVerified: true
    },
    { 
      name: 'Suresh Babu', 
      product: 'Lithium UPS', 
      text: "Switched to their Lithium backup system recently. The transition is so smooth I don't even know when the power goes out. Exceptional quality.", 
      initials: 'SB', 
      date: '5 months ago', 
      isVerified: true
    }
  ],

  // Contact Section
  showContactCTA: true,
  contactSubtitle: 'Since 2002',
  contactTitle: '25 Years of Reliability.',
  contactDesc: '4.9 Overall Rating from 10,000+ Verified Reviews. India\'s most trusted solar and power solutions provider.',
  contactBgImage: '/images/banner1090x909.jpg',
  
  showCalculator: true,
  showPerfectFor: true,
  showTestimonials: true,
};

const homeTestimonials = allTestimonials.slice(0, 5);

interface CarouselProps {
  testimonials?: Array<{
    name: string;
    product: string;
    text: string;
    initials?: string;
    isVerified?: boolean;
    date?: string;
  }>;
}

const HomeTestimonialCarousel: React.FC<CarouselProps> = ({ testimonials }) => {
  const items = testimonials && testimonials.length > 0 ? testimonials : homeTestimonials;
  const [idx, setIdx] = useState(0);

  // Reset index to 0 if the list of testimonials changes length
  useEffect(() => {
    setIdx(0);
  }, [items.length]);

  const next = useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next, items.length]);

  const t = items[idx];
  if (!t) return null;

  const initialsVal = t.initials || t.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'CL';
  const dateVal = t.date || 'Recently';
  const isVerifiedVal = t.isVerified !== false;

  return (
    <div className="relative">
      <div key={idx} className="relative p-7 md:p-9 bg-zinc-900/60 border border-white/5 rounded-[2rem] shadow-lg overflow-hidden" style={{ animation: 'fadeIn 0.4s ease-out' }}>
        <Quote className="absolute -top-2 -right-2 w-20 h-20 text-yellow-400/[0.05]" />
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-5 inline-block">{t.product}</span>
        <p className="text-zinc-300 leading-relaxed mb-6 italic text-base font-light min-h-[80px]">"{t.text}"</p>
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-400 font-black text-xs">{initialsVal}</span>
          </div>
          <div>
            <div className="font-black uppercase text-sm tracking-tight flex items-center gap-2 text-white">
              {t.name}
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                {isVerifiedVal && <span className="text-[8px] text-zinc-500 font-medium tracking-widest uppercase">Google Verified</span>}
              </div>
            </div>
            <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mt-0.5">{dateVal}</div>
          </div>
        </div>
      </div>
      {/* Controls */}
      {items.length > 1 && (
        <div className="flex items-center gap-3 mt-4">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`rounded-full transition-all duration-200 ${i === idx ? 'w-5 h-2 bg-yellow-400' : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'}`} />
          ))}
          <div className="ml-auto flex gap-2">
            <button onClick={prev} className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={next} className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 mt-4">
        <Link to="/feedback" className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-400 hover:gap-2 transition-all">
          Read all reviews <ArrowRight className="w-3 h-3" />
        </Link>
        <a href="https://maps.app.goo.gl/kukTmitZZYJ9z69w8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-yellow-400 hover:gap-2 transition-all">
          Write a Google Review <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

const Home: React.FC = () => {
  const [pageData, setPageData] = useState(DEFAULT_HOME_DATA);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(true); // Start as true so the page renders freely; LoadingScreen handles its own cinematic timing

  useEffect(() => {
    // Safety timer: fade out the loading splash screen even if the CDN video fails or takes too long to load (e.g. offline/DNS issues)
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "home"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            if (parsed.heroVideoUrl && parsed.heroVideoUrl.startsWith('/videos/')) {
              delete parsed.heroVideoUrl; // Fallback to CDN URL if Sanity has old broken relative path
            }
            setPageData(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse home page data from Sanity", e);
          }
        }
      })
      .catch(err => console.error("Error fetching homepage content:", err));

    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "testimonials"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            if (parsed.testimonials) {
              setTestimonialsList(parsed.testimonials);
            }
          } catch (e) {
            console.error("Failed to parse testimonials data from Sanity", e);
          }
        }
      })
      .catch(err => console.error("Error fetching testimonials content:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  useScrollReveal();

  // Organization Schema for Nationwide presence
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Spectrum Solar",
    "url": "https://spectrum-solar1.vercel.app",
    "logo": "https://spectrum-solar1.vercel.app/logo.png",
    "description": "India's trusted leader in solar energy and power backup solutions, serving nationwide.",
    "foundingDate": "2002",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };

  return (
    <div className="flex flex-col bg-zinc-950 noise-bg overflow-x-hidden">
      <SEO 
        title="Spectrum Solar | India's Trusted Solar Energy & Power Backup Brand"
        description="Empowering India with sustainable energy. 25+ years of excellence in solar installations, power backups, and nationwide franchise opportunities."
        schema={orgSchema}
      />
      <LoadingScreen isVisible={!isVideoLoaded} />
      {pageData.showHero !== false && (
        <>
          <Hero 
            onLoaded={() => setIsVideoLoaded(true)} 
            title={pageData.heroTitle}
            videoUrl={pageData.heroVideoUrl}
            videoPoster={pageData.heroVideoPoster}
          />
          
          {/* Mobile CTA: Below Hero video, before Stats */}
          <div className="md:hidden px-5 pb-8 pt-0 bg-zinc-950">
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-[2.5rem] p-6 border border-white/5 reveal shadow-2xl relative z-10 mt-4">
              <h1 className="text-2xl font-thin mb-5 tracking-[0.05em] leading-[1.1] text-white uppercase italic text-center">
                {pageData.heroTitle ? (
                  pageData.heroTitle.includes('Since 2002.') ? (
                    <>Precision <span className="text-yellow-400">Since 2002.</span></>
                  ) : (
                    pageData.heroTitle
                  )
                ) : (
                  <>Precision <span className="text-yellow-400">Since 2002.</span></>
                )}
              </h1>
              <div className="flex flex-col gap-3">
                <Link to="/solar" className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black px-6 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300 shadow-lg shadow-yellow-400/20">
                  Solar Solutions <Sun className="w-4 h-4" />
                </Link>
                <Link to="/power" className="w-full flex items-center justify-center gap-3 bg-zinc-950 text-white border border-white/10 px-6 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300">
                  Power Backup Solutions <BatteryCharging className="w-4 h-4 text-yellow-400" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {pageData.showStatsBar !== false && (
        <StatsBar 
          stat1Value={pageData.stat1Value}
          stat1Label={pageData.stat1Label}
          stat2Value={pageData.stat2Value}
          stat2Label={pageData.stat2Label}
          stat3Value={pageData.stat3Value}
          stat3Label={pageData.stat3Label}
          stat4Value={pageData.stat4Value}
          stat4Label={pageData.stat4Label}
        />
      )}

      {/* Core Solar Solutions Section */}
      {pageData.showSolarSection !== false && (
        <section id="solutions" className="py-24 md:py-32 bg-white text-black" data-nav-light>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-6">
              <div className="reveal">
                <span className="text-yellow-600 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">
                  {pageData.solarSectionSubtitle}
                </span>
                <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-thin tracking-[-0.02em] text-black uppercase leading-[0.9]">
                  {pageData.solarSectionTitle === 'Solar Systems.' ? (
                    <>Solar <br />Systems.</>
                  ) : (
                    pageData.solarSectionTitle
                  )}
                </h2>
              </div>
              <Link to="/solar" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:gap-3 transition-all reveal">
                All Solar Products <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="reveal rounded-[2rem] overflow-hidden mb-10" style={{ height: 'clamp(450px, 80vw, 420px)' }}>
              <img
                src={pageData.solarSectionImage}
                alt="Solar panels on modern home"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 reveal">
              {[
                { id: 'on-grid', icon: Sun, title: pageData.solarBox1Title, sub: pageData.solarBox1Sub, desc: pageData.solarBox1Desc, badge: 'Most Popular', color: '#ca8a04', to: '/solar/on-grid' },
                { id: 'hybrid', icon: Zap, title: pageData.solarBox2Title, sub: pageData.solarBox2Sub, desc: pageData.solarBox2Desc, badge: null, color: '#ca8a04', to: '/solar/hybrid' },
                { id: 'off-grid', icon: Leaf, title: pageData.solarBox3Title, sub: pageData.solarBox3Sub, desc: pageData.solarBox3Desc, badge: null, color: '#ca8a04', to: '/solar/off-grid' },
                { id: 'water-heaters', icon: Droplets, title: pageData.solarBox4Title, sub: pageData.solarBox4Sub, desc: pageData.solarBox4Desc, badge: null, color: '#ca8a04', to: '/solar/water-heaters' },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.id}
                    to={p.to}
                    className="group relative p-6 md:p-8 premium-cream-card rounded-[2rem] hover:border-yellow-400/50 transition-all duration-400 flex flex-col justify-between min-h-[240px] overflow-hidden hover:shadow-xl"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300" style={{ backgroundColor: p.color + '15', border: `1px solid ${p.color}30` }}>
                        <Icon className="w-5 h-5" style={{ color: p.color }} />
                      </div>
                      {p.badge && <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 inline-block" style={{ color: p.color, backgroundColor: p.color + '15', border: `1px solid ${p.color}30` }}>{p.badge}</span>}
                      <h3 className="text-lg font-light text-black uppercase tracking-tight mb-2">{p.title}</h3>
                      <span className="text-[9px] font-black uppercase tracking-widest mb-3 block" style={{ color: p.color }}>{p.sub}</span>
                      <p className="text-zinc-500 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest mt-6 transition-all group-hover:gap-2" style={{ color: p.color }}>
                      Learn More <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Power Backup Section */}
      {pageData.showBackupSection !== false && (
        <section id="backup" className="py-24 md:py-32 bg-zinc-950 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-6">
              <div className="reveal">
                <span className="text-yellow-400 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">
                  {pageData.backupSectionSubtitle}
                </span>
                <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-thin tracking-[-0.02em] uppercase leading-[0.9]">
                  {pageData.backupSectionTitle === 'Backup Systems.' ? (
                    <>Backup <br />Systems.</>
                  ) : (
                    pageData.backupSectionTitle
                  )}
                </h2>
              </div>
              <Link to="/power" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-400 hover:gap-3 transition-all reveal">
                All Power Products <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="reveal rounded-[2rem] overflow-hidden mb-10" style={{ height: 'clamp(450px, 80vw, 380px)' }}>
              <img
                src={pageData.backupSectionImage}
                alt="Modern backup power systems"
                className="w-full h-full object-cover object-[center_30%]"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 reveal">
              {[
                { id: 'lithium-ups', icon: Cpu, title: pageData.backupBox1Title, sub: pageData.backupBox1Sub, to: '/power/lithium-ups' },
                { id: 'home-ups', icon: Zap, title: pageData.backupBox2Title, sub: pageData.backupBox2Sub, to: '/power/home-ups' },
                { id: 'inverters', icon: TrendingUp, title: pageData.backupBox3Title, sub: pageData.backupBox3Sub, to: '/power/inverters' },
                { id: 'online-ups', icon: ShieldCheck, title: pageData.backupBox4Title, sub: pageData.backupBox4Sub, to: '/power/online-ups' },
                { id: 'lithium-batteries', icon: Layers, title: pageData.backupBox5Title, sub: pageData.backupBox5Sub, to: '/power/lithium-batteries' },
                { id: 'tubular-batteries', icon: Waves, title: pageData.backupBox6Title, sub: pageData.backupBox6Sub, to: '/power/tubular-batteries' },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.id}
                    to={p.to}
                    className="group p-5 bg-zinc-900/40 border border-white/5 rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col gap-3 hover:-translate-y-1 hover:bg-zinc-900/60"
                  >
                    <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight text-white leading-tight">{p.title}</h4>
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-0.5 block">{p.sub}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-yellow-400 mt-auto">
                      View <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Full-Bleed Nature Photo Background — Why Spectrum */}
      {pageData.showWhySpectrum !== false && (
        <section className="relative py-28 md:py-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={pageData.whySpectrumBgImage} className="w-full h-full object-cover" alt="Kerala Nature" />
            <div className="absolute inset-0 bg-black/65" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-2xl reveal">
              <span className="text-yellow-400 font-medium text-[10px] uppercase tracking-[0.5em] mb-6 block">
                {pageData.whySpectrumSubtitle}
              </span>
              <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight leading-none text-white mb-8">
                {pageData.whySpectrumTitle === "India's Most Trusted Solar Partner." ? (
                  <>India's Most Trusted <br />Solar Partner.</>
                ) : (
                  pageData.whySpectrumTitle
                )}
              </h2>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-10">
                {pageData.whySpectrumDesc}
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[{ v: '6,145+', l: 'Installations' }, { v: '25yr', l: 'Track Record' }, { v: '100%', l: 'Service Rate' }].map((s, i) => (
                  <div key={i} className="border-l border-yellow-400/40 pl-4">
                    <div className="text-3xl font-black text-yellow-400 tracking-tighter">{s.v}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The Solar Advantage (Why Go Solar) */}
      {pageData.showWhyGoSolar !== false && (
        <section className="bg-white pt-20 md:pt-28 pb-12 overflow-hidden text-black" data-nav-light>
          <div className="max-w-7xl mx-auto px-6">
            <div className="reveal mb-8">
              <span className="text-yellow-600 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">
                {pageData.whyGoSolarSubtitle}
              </span>
              <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-thin tracking-[-0.02em] text-black uppercase leading-[0.9]">
                {pageData.whyGoSolarTitle === 'Why Go Solar?' ? (
                  <>Why <br />Go Solar?</>
                ) : (
                  pageData.whyGoSolarTitle
                )}
              </h2>
            </div>
            <div className="reveal rounded-[2rem] overflow-hidden" style={{ height: 'clamp(480px, 80vw, 520px)' }}>
              <img
                src={pageData.whyGoSolarImage}
                alt="Solar panels powering a beautiful home"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-12 reveal">
              {[
                { icon: Sun, title: 'Zero Electricity Bills', desc: 'Net-metered solar plants can reduce your KSEB bill to ₹0. Pay for the system once, generate free power for 25 years.' },
                { icon: Leaf, title: 'Clean & Sustainable', desc: 'Every kW of solar installed avoids hundreds of kg of CO₂ per year. Power your home without harming the planet.' },
                { icon: TrendingUp, title: 'Fast ROI — 3 to 5 Years', desc: 'With government subsidies and KSEB net metering, most systems pay for themselves in under 5 years.' },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="group p-6 premium-cream-card rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
                    <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center transition-colors group-hover:bg-yellow-400/20">
                      <Icon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-black font-thin text-base uppercase tracking-tight leading-tight mb-2">{b.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed font-light">{b.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-600 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      Solar Solutions <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* About & Testimonials */}
      {pageData.showHeritage !== false && (
        <section id="about" className="py-20 md:py-32 bg-zinc-950 text-white border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="reveal mb-12">
              <span className="text-yellow-400 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">
                {pageData.heritageSubtitle}
              </span>
              <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-thin tracking-[-0.02em] text-white uppercase leading-[0.9]">
                {pageData.heritageTitle === 'Spectrum Powers India.' ? (
                  <>Spectrum Powers <br />India.</>
                ) : (
                  pageData.heritageTitle
                )}
              </h2>
            </div>

            <div className="reveal rounded-[2rem] overflow-hidden mb-16" style={{ height: 'clamp(480px, 80vw, 480px)' }}>
              <img
                src={pageData.heritageImage}
                alt="Spectrum Engineering Heritage"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div className="reveal">
                <p className="text-zinc-400 mb-8 text-base md:text-lg font-light leading-relaxed max-w-lg">
                  {pageData.heritageDesc}
                </p>
                <div className="p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl inline-block">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-yellow-400 mb-2">Accreditation</p>
                  <p className="text-sm font-black uppercase tracking-tight text-white">
                    {pageData.heritageAccreditationTitle}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    {pageData.heritageAccreditationDesc}
                  </p>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: '150ms' }}>
                {pageData.showTestimonials !== false && (
                  <HomeTestimonialCarousel testimonials={testimonialsList} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA — Solar Image Background */}
      {pageData.showContactCTA !== false && (
        <section id="contact" className="relative py-32 text-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={pageData.contactBgImage} alt="Solar Installation" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 reveal">
            <span className="text-yellow-400 font-medium text-[10px] uppercase tracking-[0.5em] mb-6 block">
              {pageData.contactSubtitle}
            </span>
            <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-thin tracking-tight mb-4 text-white uppercase leading-none">
              {pageData.contactTitle === '25 Years of Reliability.' ? (
                <>25 Years of <br className="hidden md:block" />Reliability.</>
              ) : (
                pageData.contactTitle
              )}
            </h2>
            <p className="text-white/60 text-base md:text-lg font-light mb-10 max-w-md mx-auto">
              {pageData.contactDesc}
            </p>
            <Link to="/contact" className="inline-block w-full sm:w-auto bg-yellow-400 text-black px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-105 hover:bg-yellow-300 transition-all shadow-2xl">Connect with Experts</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
