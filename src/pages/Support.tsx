import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PhoneCall, ChevronDown, Send, ExternalLink, Clock, Headphones } from 'lucide-react';
import { sanityReadClient } from '../lib/sanityClient';
import SmartForm from '../components/SmartForm';

const DEFAULT_FAQS = [
  {
    q: 'What is Net Metering and how does it benefit me?',
    a: 'Net Metering is a KSEB policy that allows your solar system to feed unused electricity back to the grid. Your meter runs backwards, earning you credits that offset your bill — often bringing it to zero or near zero.',
  },
  {
    q: 'How long does a solar installation take?',
    a: 'A standard residential system (3–10kW) typically takes 1–3 working days for installation. Larger commercial or industrial projects may take 1–2 weeks depending on scope and approvals.',
  },
  {
    q: 'Do you provide after-sales service?',
    a: 'Yes. We have 60+ dedicated service engineers across India, available 24/7 for support. All installations include a 1-year comprehensive AMC, with extended plans available.',
  },
  {
    q: 'How long is the warranty on solar panels?',
    a: 'We provide up to 25 years linear performance warranty on solar panels. Our inverters carry 5-year warranty, and lithium batteries are covered for 5–10 years depending on the model.',
  },
  {
    q: 'What government subsidies are available for solar?',
    a: 'The Central Government provides a 30% subsidy on residential on-grid systems up to 3kW (20% for 3–10kW). Additional benefits are available under the KSEB net-metering scheme. Our team handles all paperwork.',
  }
];

const DEFAULT_SUPPORT_DATA = {
  showHero: true,
  heroTitle: "How can we help you?",
  heroSubtitle: "Help Center",
  heroImage: "/images/calculator-hero.jpg",
  phone: '+91 9447 123 456',
  email: 'support@spectrumsolar.com',
  hours: '9:00 AM - 6:00 PM (Mon-Sat)',
  faqsTitle: 'Frequently Asked Questions.',
  ticketTitle: 'Submit a Support Ticket',
  ticketDesc: 'Register a service enquiry or warranty claim directly with our technical support team.',
  faqs: DEFAULT_FAQS
};

const Support: React.FC = () => {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pageData, setPageData] = useState(DEFAULT_SUPPORT_DATA);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "support"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            setPageData(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse support page content", e);
          }
        }
      })
      .catch(err => console.error("Error fetching support data:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const activeFaqs = pageData.faqs || [];

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden min-h-screen">
      {/* Hero */}
      {pageData.showHero !== false && (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
          <div className="absolute inset-0 z-0">
            <img
              src={pageData.heroImage || "/images/calculator-hero.jpg"}
              className="w-full h-full object-cover scale-[1.05]"
              alt="Customer Support Hub"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <span className="text-yellow-400 font-medium tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
              {pageData.heroSubtitle || "Help Center"}
            </span>
            <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              {pageData.heroTitle ? (
                pageData.heroTitle.includes('help you') ? (
                  <>How can we <br />help you?</>
                ) : (
                  pageData.heroTitle
                )
              ) : (
                <>How can we <br />help you?</>
              )}
            </h1>
          </div>
        </section>
      )}

      {/* Support Info Cards */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="reveal p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex items-center justify-center mb-6">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Call Support</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">Speak directly with our service coordinators for immediate technical assistance.</p>
            </div>
            <a href={`tel:${pageData.phone}`} className="inline-flex items-center gap-2 text-yellow-400 font-black text-sm uppercase tracking-wider hover:underline">
              {pageData.phone}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="reveal p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between" style={{ transitionDelay: '100ms' }}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Office Hours</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">Our phone lines are active during standard operating office shifts.</p>
            </div>
            <span className="text-zinc-300 font-black text-xs uppercase tracking-widest block">{pageData.hours}</span>
          </div>

          <div className="reveal p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between" style={{ transitionDelay: '200ms' }}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex items-center justify-center mb-6">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Email Support</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">Send us diagnostic screenshots or documents. We reply within 4 working hours.</p>
            </div>
            <a href={`mailto:${pageData.email}`} className="inline-flex items-center gap-2 text-yellow-400 font-black text-sm uppercase tracking-wider hover:underline">
              {pageData.email}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Support Grid */}
      <section className="px-6 py-24 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* FAQ list */}
          <div className="reveal">
            <span className="text-yellow-400 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Knowledge Base</span>
            <h2 className="text-4xl md:text-5xl font-thin mb-12 tracking-tight uppercase text-white">
              {pageData.faqsTitle || "General FAQs."}
            </h2>
            <div className="space-y-4">
              {activeFaqs.map((faq, idx) => (
                <div key={idx} className="border border-zinc-800 rounded-2xl bg-zinc-900/50 overflow-hidden transition-all duration-350">
                  <button
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="font-black text-sm uppercase tracking-tight text-white">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-yellow-400' : ''}`} />
                  </button>
                  <div className={`transition-all duration-350 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-96 border-t border-zinc-800' : 'max-h-0'}`}>
                    <div className="p-6 text-zinc-400 text-sm leading-relaxed bg-zinc-900">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal p-8 md:p-12 bg-zinc-900 border border-zinc-800 rounded-[2.5rem]" style={{ transitionDelay: '150ms' }}>
            <span className="text-yellow-400 font-medium text-[10px] uppercase tracking-[0.5em] mb-4 block">Support Intake</span>
            <h2 className="text-3xl md:text-4xl font-thin tracking-tight uppercase text-white mb-2">
              {pageData.ticketTitle || "Submit a Ticket."}
            </h2>
            {pageData.ticketDesc && (
              <p className="text-zinc-400 text-xs leading-relaxed mb-8">{pageData.ticketDesc}</p>
            )}
            <div className="text-black bg-zinc-900 rounded-3xl p-1">
              <SmartForm initialType="support" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
