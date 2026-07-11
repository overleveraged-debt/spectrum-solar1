import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Phone, Mail, Clock, Building2, MapPin } from 'lucide-react';
import MapSection from '../components/MapSection';
import SEO from '../components/SEO';
import SmartForm from '../components/SmartForm';
import type { InquiryType } from '../components/SmartForm';
import { CONTACT_INFO } from '../data/config';
import { sanityReadClient } from '../lib/sanityClient';

const DEFAULT_OFFICES = [
  { city: "Kannur (HQ)", address: "Spectrum Tower, Near KSEB, Kannur 670001" },
  { city: "Kochi", address: "Solar Hub, Edappally, Kochi 682024" },
  { city: "Calicut", address: "Power Plaza, Mavoor Road, Calicut 673001" },
  { city: "Trivandrum", address: "Energy Centre, Vazhuthacaud, Trivandrum 695010" }
];

const DEFAULT_CONTACT_DATA = {
  showHero: true,
  heroTitle: 'START YOUR SOLAR JOURNEY',
  heroSubtitle: 'Global Network',
  heroImage: '/images/contact-hero.jpg',
  heroDesc: 'Connect with our senior engineering team for project audits and technical consultations.',
  offices: DEFAULT_OFFICES
};

const Contact: React.FC = () => {
  useScrollReveal();
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as InquiryType) || 'general';
  
  const [pageData, setPageData] = useState(DEFAULT_CONTACT_DATA);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "contact"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            setPageData(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse contact page content", e);
          }
        }
      })
      .catch(err => console.error("Error fetching contact page support data:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const seoData = {
    general: { title: "Contact Us", desc: "Get in touch with Spectrum Solar for expert consultation and support across India." },
    solar: { title: "Get a Solar Quote", desc: "Request a free solar site audit and customized quote for your home or business in India." },
    backup: { title: "Power Backup Consultation", desc: "Talk to our engineers about high-performance UPS and Lithium battery solutions." },
    franchise: { title: "Franchise Application", desc: "Start your journey as a Spectrum Solar franchise partner. Apply today for exclusive territory rights." },
    dealership: { title: "Become a Dealer", desc: "Register to become an authorized dealer of Spectrum Solar products nationwide." },
    freelance: { title: "Freelance Partner Program", desc: "Join our referral network and earn commissions on solar projects across India." },
    careers: { title: "Join Our Team", desc: "Apply for exciting career opportunities in solar engineering, sales, and service." }
  };

  const currentSeo = seoData[initialType] || seoData.general;
  const activeOffices = pageData.offices || [];

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      <SEO 
        title={`${currentSeo.title} | Spectrum Solar India`}
        description={currentSeo.desc}
      />
      {/* Hero */}
      {pageData.showHero !== false && (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
          <div className="absolute inset-0 z-0">
            <img
              src={pageData.heroImage}
              className="w-full h-full object-cover scale-[1.05]"
              alt="Spectrum Engineering Hub"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <span className="text-yellow-400 font-medium tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">{pageData.heroSubtitle}</span>
            <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              {pageData.heroTitle.includes('START YOUR') ? (
                <>START YOUR <br className="hidden md:block" /> SOLAR JOURNEY</>
              ) : (
                pageData.heroTitle
              )}
            </h1>
            <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              {pageData.heroDesc}
            </p>
          </div>
        </section>
      )}

      {/* Grid: Contact Details + Smart Form */}
      <section 
        className={`px-6 py-24 md:py-32 ${pageData.showHero === false ? 'pt-32 md:pt-40' : ''}`}
        data-nav-light
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 reveal">
              <span className="text-zinc-500 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Get In Touch</span>
              <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight text-black leading-none mb-12">
                Connect <br />With Us.
              </h2>
              
              <div className="space-y-8 mb-16">
                <a href={CONTACT_INFO.phoneLink} className="flex items-center gap-6 p-6 premium-cream-card rounded-2xl group hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white/50 border border-yellow-250/20 flex items-center justify-center text-zinc-900 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Call Today</p>
                    <p className="text-zinc-950 font-black text-lg group-hover:text-yellow-600 transition-colors">{CONTACT_INFO.phoneText}</p>
                  </div>
                </a>

                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-6 p-6 premium-cream-card rounded-2xl group hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white/50 border border-yellow-250/20 flex items-center justify-center text-zinc-900 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-zinc-950 font-black text-lg group-hover:text-yellow-600 transition-colors">{CONTACT_INFO.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 p-6 premium-cream-card rounded-2xl hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-xl bg-white/50 border border-yellow-250/20 flex items-center justify-center text-zinc-900">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Support Hours</p>
                    <p className="text-zinc-950 font-black text-lg">9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Offices Grid */}
              <div>
                <p className="text-zinc-500 font-medium text-[10px] uppercase tracking-[0.5em] mb-6">Our Offices</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {activeOffices.map((office, idx) => (
                    <div key={idx} className="p-5 premium-cream-card rounded-2xl hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-center gap-2 text-yellow-600 font-bold mb-2">
                        {idx === 0 ? <Building2 className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        <span className="text-xs font-black uppercase tracking-wider">{office.city}</span>
                      </div>
                      <p className="text-zinc-500 text-xs leading-relaxed">{office.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Smart Form */}
            <div className="lg:col-span-7 reveal" style={{ transitionDelay: '150ms' }}>
              <SmartForm initialType={initialType} />
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 border-t border-zinc-100 bg-zinc-50" data-nav-light>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center reveal">
            <span className="text-zinc-500 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Interactive Map</span>
            <h2 className="text-3xl md:text-5xl font-thin uppercase tracking-tight text-black">
              Statewide Presence.
            </h2>
          </div>
          <div className="reveal">
            <MapSection height="550px" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
