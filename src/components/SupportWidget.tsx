import React, { useState, useEffect } from 'react';
import { X, HelpCircle, ExternalLink, ArrowRight, MessageSquare, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../data/config';
import { sanityReadClient } from '../lib/sanityClient';

const DEFAULT_FAQS = [
  { q: "What is Net Metering?", a: "Net Metering allows you to send excess solar energy back to the grid and receive credits on your KSEB bill." },
  { q: "Do you provide after-sales service?", a: "Yes, we have 60+ dedicated service engineers across Kerala for 24/7 support." },
  { q: "How long is the warranty?", a: "We provide up to 25 years warranty on solar panels and 3-10 years on backup systems." }
];

const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "support"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            if (parsed.faqs && parsed.faqs.length > 0) {
              setFaqs(parsed.faqs.slice(0, 3));
            }
          } catch (e) {
            console.error("Failed to parse support FAQs in widget", e);
          }
        }
      })
      .catch(err => console.error("Error fetching support FAQs for widget:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] font-['Plus_Jakarta_Sans']">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sun Support Hub"
        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 shadow-xl ${isOpen ? 'bg-zinc-900 text-white rotate-90' : 'bg-yellow-400 text-black'}`}
      >
        {/* Soft Pulsing Sun Glow Aura behind button */}
        <span className="absolute inset-0 rounded-full bg-yellow-400 blur-lg opacity-50 animate-pulse -z-10" />
        {isOpen ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <Sun className="w-6 h-6 text-black relative z-10" />
        )}
      </button>

      {/* Popup Modal */}
      <div className={`absolute bottom-[4.25rem] left-0 w-[calc(100vw-3rem)] xs:w-[350px] sm:w-[400px] max-w-[calc(100vw-2.5rem)] max-h-[calc(100svh-9rem)] flex flex-col bg-zinc-900 border border-white/10 rounded-3xl sm:rounded-[2.5rem] shadow-2xl transition-all duration-500 origin-bottom-left overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>

        {/* Header */}
        <div className="p-4 sm:p-6 md:p-8 pb-3 sm:pb-4 border-b border-white/5">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter mb-1">Support Hub</h3>
          <p className="text-zinc-500 text-[9px] sm:text-[10px] md:text-xs font-medium uppercase tracking-widest">How can we help you today?</p>
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto no-scrollbar space-y-5 sm:space-y-6 md:space-y-8">
          {/* Main Action - Enquiry */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1.5 px-1 opacity-50">Quick Actions</h4>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full bg-yellow-400 text-black font-black uppercase tracking-[0.1em] sm:tracking-widest py-3 sm:py-4 px-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-yellow-300 transition-all shadow-xl group text-xs sm:text-sm whitespace-nowrap"
            >
              Book Consultation <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="w-full bg-zinc-800 hover:bg-zinc-750 text-white font-black uppercase tracking-[0.1em] sm:tracking-widest py-3 sm:py-4 px-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all border border-white/5 group text-[10px] sm:text-xs animate-fade-in whitespace-nowrap"
            >
              Submit Support Ticket <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1.5 px-1 opacity-50">Frequently Asked</h4>
            <div className="space-y-2.5 sm:space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-3.5 sm:p-4 md:p-5 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <h4 className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-tighter mb-1 sm:mb-2 flex items-center gap-2">
                    <HelpCircle className="w-3 h-3 text-yellow-400 shrink-0" /> {faq.q}
                  </h4>
                  <p className="text-zinc-500 text-[9px] sm:text-[10px] font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Quick Contact */}
        <div className="p-4 sm:p-6 md:p-8 bg-white/5 rounded-b-3xl sm:rounded-b-[2.5rem] border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-white text-[10px] font-black uppercase tracking-tighter block leading-none">WhatsApp</span>
              <span className="text-zinc-600 text-[9px] font-medium block">Instant help</span>
            </div>
          </div>
          <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Direct WhatsApp Chat with Sales Engineer" className="text-yellow-400 hover:text-white transition-colors p-1">
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default SupportWidget;
