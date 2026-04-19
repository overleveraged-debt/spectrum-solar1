import React, { useState } from 'react';
import { X, Send, HelpCircle, PhoneCall, ExternalLink } from 'lucide-react';

const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'faq'>('form');

  const faqs = [
    { q: "What is Net Metering?", a: "Net Metering allows you to send excess solar energy back to the grid and receive credits on your KSEB bill." },
    { q: "Do you provide after-sales service?", a: "Yes, we have 60+ dedicated service engineers across Kerala for 24/7 support." },
    { q: "How long is the warranty?", a: "We provide up to 25 years warranty on solar panels and 3-10 years on backup systems." }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-['Plus_Jakarta_Sans']">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-[0_20px_50px_rgba(250,204,21,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 ${isOpen ? 'bg-zinc-900 text-white rotate-90' : 'bg-yellow-400 text-black'}`}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <img
            src="https://img.icons8.com/parakeet-line/48/sun.png"
            alt="Support"
            className="w-10 h-10"
          />
        )}
      </button>

      {/* Popup Modal */}
      <div className={`absolute bottom-20 right-0 w-[400px] max-w-[calc(100vw-4rem)] max-h-[calc(100vh-8rem)] flex flex-col bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>

        {/* Header */}
        <div className="p-8 pb-4 border-b border-white/5">
          <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter mb-2">Support Hub</h3>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">How can we help you today?</p>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-white/5 mx-8 mt-6 rounded-full">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'form' ? 'bg-yellow-400 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            Submit Ticket
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'faq' ? 'bg-yellow-400 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            Quick FAQ
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto no-scrollbar">
          {activeTab === 'form' ? (
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors" />
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors" />
              <textarea placeholder="Tell us more about the issue..." rows={3} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors resize-none" />
              <button className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-full flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors">
                Send Ticket <Send className="w-3 h-3" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <h4 className="text-white text-[11px] font-black uppercase tracking-tighter mb-2 flex items-center gap-2">
                    <HelpCircle className="w-3 h-3 text-yellow-400" /> {faq.q}
                  </h4>
                  <p className="text-zinc-500 text-[10px] font-bold leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Quick Contact */}
        <div className="p-8 bg-white/5 rounded-b-[2.5rem] border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white text-[10px] font-black uppercase tracking-tighter block leading-none">WhatsApp</span>
              <span className="text-zinc-600 text-[9px] font-bold block">Instant help</span>
            </div>
          </div>
          <a href="https://wa.me/919447123456" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white transition-colors">
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default SupportWidget;
