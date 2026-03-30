import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

const Contact: React.FC = () => {
   useScrollReveal();

   const offices = [
      { city: "Kannur (HQ)", address: "Spectrum Tower, Near KSEB, Kannur, Kerala 670001" },
      { city: "Kochi", address: "Solar Hub, Edappally, Kochi, Kerala 682024" },
      { city: "Calicut", address: "Power Plaza, Mavoor Road, Calicut, Kerala 673001" },
      { city: "Trivandrum", address: "Energy Centre, Vazhuthacaud, TVM, Kerala 695010" }
   ];

   return (
      <div className="bg-white text-black pb-20 overflow-x-hidden">
         <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-20 pt-24 mt-[-80px]">
            <div className="absolute inset-0 z-0">
               <img
                  src="/images/contact-hero.jpg"
                  className="w-full h-full object-cover scale-[1.05]"
                  alt="Spectrum Engineering Hub"
               />
               <div className="absolute inset-0 bg-black/25"></div>
               <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal active opacity-1 translate-y-0 transition-all duration-1000">
               <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Global Network</span>
               <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[0.85] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
                  START YOUR <br className="hidden md:block" />
                  SOLAR JOURNEY
               </h1>
               <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                  Connect directly with our senior engineering team for project feasibility audits and technical consultations.
               </p>
            </div>
         </section>

         {/* Main Contact Section - 100% Light */}
         <section className="relative px-6 pb-20 md:pb-32" data-nav-light>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

               {/* Contact Form Container */}
               <div className="lg:col-span-7 reveal opacity-0 translate-x-[-20px] transition-all duration-1000">
                  <div className="premium-cream-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                     <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-8 text-black">Send a Message</h3>
                     <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-6">Full Name</label>
                              <input type="text" placeholder="John Doe" className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-8 py-5 text-black placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors" />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-6">Email Address</label>
                              <input type="email" placeholder="john@example.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-8 py-5 text-black placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors" />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-6">Inquiry Type</label>
                           <select className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-8 py-5 text-black focus:outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer">
                              <option>Solar Solutions Inquiry</option>
                              <option>Power Backup System</option>
                              <option>Support & Maintenance</option>
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-6">How can we help?</label>
                           <textarea rows={5} placeholder="Tell us about your project or requirements..." className="w-full bg-zinc-50 border border-zinc-200 rounded-[2rem] px-8 py-6 text-black placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors resize-none"></textarea>
                        </div>
                        <button className="w-full bg-black text-white font-black uppercase tracking-[0.2em] py-6 rounded-full hover:bg-zinc-900 active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-xl">
                           Transmit Message <Send className="w-4 h-4" />
                        </button>
                     </form>
                  </div>
               </div>

               {/* Sidebar Info */}
                <div className="lg:col-span-5 space-y-8 reveal opacity-0 translate-x-[20px] transition-all duration-1000">
                  <div className="premium-cream-card p-10 rounded-[3rem] shadow-sm">
                     <div className="flex items-center gap-6 mb-10">
                        <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-lg">
                           <Phone className="w-8 h-8" />
                        </div>
                        <div>
                           <h4 className="font-black uppercase italic tracking-tighter text-xl leading-none mb-2">Speak to Us</h4>
                           <p className="text-zinc-600 font-bold text-lg">+91 9447 123 456</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                           <Mail className="w-8 h-8" />
                        </div>
                        <div>
                           <h4 className="font-black uppercase italic tracking-tighter text-xl leading-none mb-2">Write to Us</h4>
                           <p className="text-zinc-600 font-bold text-lg">info@spectrumpowers.com</p>
                        </div>
                     </div>
                  </div>

                  <div className="premium-cream-card p-10 rounded-[3rem] shadow-sm">
                     <h4 className="text-xl font-black uppercase italic tracking-tighter mb-8 border-l-4 border-yellow-400 pl-6">Our Centers</h4>
                     <div className="space-y-6">
                        {offices.map((office, i) => (
                           <div key={i} className="flex gap-5 group cursor-default">
                              <div className="w-10 h-10 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-yellow-500 group-hover:bg-yellow-400 group-hover:text-black transition-colors shadow-sm">
                                 <MapPin className="w-5 h-5" />
                              </div>
                              <div>
                                 <h5 className="font-black uppercase text-[11px] text-zinc-900 mb-1">{office.city}</h5>
                                 <p className="text-zinc-500 text-[10px] leading-relaxed font-medium">{office.address}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-yellow-400 p-8 rounded-[2.5rem] shadow-xl group flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                           <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="text-black font-black uppercase italic tracking-tighter text-lg leading-tight">Fast Support</h4>
                           <p className="text-black/60 text-[9px] font-black uppercase tracking-widest mt-0.5">Instant WhatsApp</p>
                        </div>
                     </div>
                     <div className="bg-black text-white px-5 py-2 rounded-full font-black uppercase text-[9px] tracking-widest transition-transform group-hover:translate-x-1">
                        Open
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Contact;
