import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HelpCircle, PhoneCall, ChevronDown, Send, ExternalLink, Clock, Shield, Headphones } from 'lucide-react';

const faqs = [
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
    a: 'Yes. We have 60+ dedicated service engineers across Kerala, available 24/7 for support. All installations include a 1-year comprehensive AMC, with extended plans available.',
  },
  {
    q: 'How long is the warranty on solar panels?',
    a: 'We provide up to 25 years linear performance warranty on solar panels. Our inverters carry 5-year warranty, and lithium batteries are covered for 5–10 years depending on the model.',
  },
  {
    q: 'What government subsidies are available for solar in Kerala?',
    a: 'The Central Government provides a 30% subsidy on residential on-grid systems up to 3kW (20% for 3–10kW). Additional benefits are available under the KSEB net-metering scheme. Our team handles all paperwork.',
  },
  {
    q: 'Can I expand my system capacity in the future?',
    a: 'Yes. All our systems are designed with scalability in mind. You can add panels, batteries, or upgrade your inverter as your energy needs grow, without replacing the entire system.',
  },
  {
    q: 'What is the difference between a UPS and an inverter?',
    a: 'A UPS (Uninterruptible Power Supply) switches instantly (< 10ms) with no noticeable interruption — ideal for computers, servers, and sensitive equipment. A standard inverter may have a 20–100ms switch time, suitable for general home loads.',
  },
  {
    q: 'How do I know what size solar system I need?',
    a: 'Use our online Solar Calculator to estimate your system size based on your monthly bill and roof space. Alternatively, our engineers can visit your site for a free, no-obligation assessment.',
  },
  {
    q: 'Is maintenance required for solar panels?',
    a: 'Minimal maintenance is needed. Panels should be cleaned every 2–3 months to remove dust. Our ERP monitoring alerts your service team if performance drops, and our engineers will respond within 24 hours.',
  },
  {
    q: 'What payment options are available?',
    a: 'We accept cash, bank transfer, EMI (via loan partners), and subsidy-linked financing. We partner with leading banks for solar loans at competitive interest rates.',
  },
];

const Support: React.FC = () => {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/contact-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Support Desk"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
            We're Here For You
          </span>
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Support Desk
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto font-light">
            60+ engineers. 24-hour response. Pan-Kerala coverage.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="pt-12 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
            {[
              {
                icon: <PhoneCall className="w-6 h-6" />,
                title: 'Call Us',
                detail: '+91 97456 60055',
                sub: 'Available 8AM – 8PM',
                action: 'tel:+919745660055',
                actionLabel: 'Call Now',
                color: '#4ade80',
              },
              {
                icon: <Headphones className="w-6 h-6" />,
                title: 'WhatsApp Support',
                detail: '+91 94470 12345',
                sub: 'Instant response guaranteed',
                action: 'https://wa.me/919447012345',
                actionLabel: 'Open WhatsApp',
                color: '#facc15',
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: '24-Hour SLA',
                detail: 'Field Response',
                sub: 'Engineers dispatched within 24hrs',
                action: '#ticket',
                actionLabel: 'Raise Ticket',
                color: '#60a5fa',
              },
            ].map((c, i) => (
              <div
                key={i}
                className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col gap-4 hover:border-zinc-600 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: c.color + '15', color: c.color, border: `1px solid ${c.color}30` }}
                >
                  {c.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{c.title}</p>
                  <p className="text-white font-black text-lg">{c.detail}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{c.sub}</p>
                </div>
                <a
                  href={c.action}
                  target={c.action.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors mt-auto"
                  style={{ color: c.color }}
                >
                  {c.actionLabel}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
              Quick Answers
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 reveal">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  openFaq === i ? 'border-yellow-400/30 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: openFaq === i ? '#facc15' : '#52525b' }}
                    />
                    <span className={`font-black text-sm md:text-base uppercase tracking-tight ${openFaq === i ? 'text-yellow-400' : 'text-white'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180 text-yellow-400' : 'text-zinc-600'
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-60' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed pl-14">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Form */}
      <section id="ticket" className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto reveal">
          <div className="text-center mb-12">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
              Raise a Ticket
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
              Submit a Support Request
            </h2>
            <p className="text-zinc-500 text-sm">Our team will respond within 24 hours.</p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors placeholder-zinc-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors placeholder-zinc-600"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors placeholder-zinc-600"
              />
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
              >
                <option value="">Issue Type</option>
                <option value="solar">Solar System Issue</option>
                <option value="ups">UPS / Inverter Issue</option>
                <option value="battery">Battery Issue</option>
                <option value="billing">Billing & Warranty</option>
                <option value="installation">Installation Query</option>
                <option value="other">Other</option>
              </select>
            </div>
            <textarea
              name="description"
              placeholder="Describe your issue in detail..."
              rows={5}
              value={form.description}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-400/50 transition-colors placeholder-zinc-600 resize-none"
            />
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="text-zinc-500 text-xs">
                Your data is secure and used only for resolving your support request.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black px-8 py-5 rounded-full font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
            >
              Submit Support Ticket <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Support;
