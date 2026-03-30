import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Phone, Mail, MessageSquare, Send, Clock, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  useScrollReveal();

  const offices = [
    { city: "Kannur (HQ)", address: "Spectrum Tower, Near KSEB, Kannur, Kerala 670001", icon: "🏢" },
    { city: "Kochi", address: "Solar Hub, Edappally, Kochi, Kerala 682024", icon: "🌊" },
    { city: "Calicut", address: "Power Plaza, Mavoor Road, Calicut, Kerala 673001", icon: "⚡" },
    { city: "Trivandrum", address: "Energy Centre, Vazhuthacaud, TVM, Kerala 695010", icon: "🌞" },
  ];

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/contact-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Spectrum Engineering Hub"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Global Network</span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            START YOUR <br className="hidden md:block" />
            SOLAR JOURNEY
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Connect with our senior engineering team for project audits and technical consultations.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-100" data-nav-light>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 items-start sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-black" />
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-zinc-800">We respond within 4 hours</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <a href="tel:+919447123456" className="flex items-center gap-2 text-sm font-black text-zinc-900 hover:text-yellow-500 transition-colors uppercase tracking-wider">
              <Phone className="w-4 h-4" /> +91 9447 123 456
            </a>
            <a href="mailto:info@spectrumpowers.com" className="flex items-center gap-2 text-sm font-black text-zinc-900 hover:text-yellow-500 transition-colors uppercase tracking-wider">
              <Mail className="w-4 h-4" /> info@spectrumpowers.com
            </a>
          </div>
        </div>
      </section>

      {/* Main Form + Sidebar */}
      <section className="px-6 py-20 md:py-28" data-nav-light>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Form */}
          <div className="lg:col-span-7 reveal">
            <div className="mb-10">
              <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Send us a message</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                Let's talk <br />about your project.
              </h2>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9876 543 210"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">Inquiry Type</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer text-sm">
                  <option>Solar System Installation</option>
                  <option>Power Backup & UPS</option>
                  <option>Site Audit Request</option>
                  <option>Service & Maintenance</option>
                  <option>Franchise / Dealership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">How can we help?</label>
                <textarea
                  rows={5}
                  placeholder="Describe your project, site size, current electricity bill, or any specific requirements..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-[1.5rem] px-7 py-5 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none text-sm"
                />
              </div>

              <button className="w-full bg-black text-white font-black uppercase tracking-[0.2em] py-5 rounded-full hover:bg-yellow-400 hover:text-black active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-xl group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6 reveal" style={{ transitionDelay: '150ms' }}>
            {/* Contact Info */}
            <div className="premium-cream-card p-8 rounded-[2rem] shadow-sm">
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-6 text-black">Speak Directly</h4>
              <div className="space-y-6">
                <a href="tel:+919447123456" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Call us</p>
                    <p className="font-black text-black text-lg">+91 9447 123 456</p>
                  </div>
                </a>
                <a href="mailto:info@spectrumpowers.com" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Email us</p>
                    <p className="font-black text-black">info@spectrumpowers.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-yellow-400 p-6 rounded-[2rem] flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform group shadow-xl shadow-yellow-400/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-black font-black uppercase italic tracking-tighter text-lg leading-tight">WhatsApp</p>
                  <p className="text-black/60 text-[9px] font-black uppercase tracking-widest">Instant reply during business hours</p>
                </div>
              </div>
              <div className="bg-black text-white px-4 py-2 rounded-full font-black uppercase text-[9px] tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Open <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Offices */}
            <div className="premium-cream-card p-8 rounded-[2rem] shadow-sm">
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-6 border-l-4 border-yellow-400 pl-4">Our Centers</h4>
              <div className="space-y-5">
                {offices.map((office, i) => (
                  <div key={i} className="flex gap-4 group cursor-default">
                    <div className="w-9 h-9 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-sm group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-colors shadow-sm flex-shrink-0">
                      {office.icon}
                    </div>
                    <div>
                      <p className="font-black uppercase text-[11px] text-zinc-900 mb-0.5">{office.city}</p>
                      <p className="text-zinc-500 text-[10px] leading-relaxed">{office.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
