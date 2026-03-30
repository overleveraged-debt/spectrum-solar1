import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Battery, Sun, Thermometer, ShieldCheck, BarChart3, ChevronRight } from 'lucide-react';

const Services: React.FC = () => {
  useScrollReveal();

  const services = [
    {
      title: "Solar Solutions",
      category: "Sustainability",
      description: "Custom-engineered On-Grid, Hybrid, and Lithium Off-Grid systems designed for maximum ROI and energy independence.",
      icon: <Sun className="w-10 h-10 text-yellow-500" />,
      features: ["On-Grid Systems", "Hybrid Inverters", "Lithium Off-Grid"],
      color: "bg-yellow-400/10",
      className: "md:col-span-2 md:row-span-2"
    },
    {
      title: "Power Backup",
      category: "Reliability",
      description: "Advanced UPS and inverter systems powered by world-class Lithium battery technology for zero downtime.",
      icon: <Battery className="w-8 h-8 text-yellow-500" />,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Energy Audits",
      category: "Efficiency",
      description: "Professional technical analysis to optimize your energy consumption and reduce waste.",
      icon: <BarChart3 className="w-8 h-8 text-yellow-500" />,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Maintenance",
      category: "Support",
      description: "24/7 priority support with 60+ service engineers across Kerala.",
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Solar Water Heaters",
      category: "Savings",
      description: "High-efficiency thermal systems for residential and industrial applications.",
      icon: <Thermometer className="w-8 h-8 text-yellow-500" />,
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      {/* Services Mini-Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-24 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/services-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Industrial Solar Infrastructure"
          />
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal active opacity-1 translate-y-0 transition-all duration-1000">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Precision Engineering</span>
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[0.85] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            INTEGRATED ENERGY <br className="hidden md:block" />
            ECOSYSTEMS
          </h1>
          <p className="text-yellow-400 text-base md:text-2xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Consolidating two decades of expertise into sustainable power solutions for a zero-carbon future.
          </p>
        </div>
      </section>

      {/* Bento Grid - Now Light Cards */}
      <section className="px-6 mb-20 md:mb-32" data-nav-light>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[20rem]">
          {services.map((service, index) => (
            <div
              key={index}
              className={`reveal opacity-0 scale-95 transition-all duration-700 group relative p-8 md:p-10 rounded-[2.5rem] premium-cream-card ${service.className}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <div className="mb-6">{service.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700 mb-2 block">{service.category}</span>
                  <h3 className="text-2xl font-black mb-3 italic uppercase text-black">{service.title}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed max-w-sm font-medium">
                    {service.description}
                  </p>
                </div>

                {service.features && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {service.features.map((f, i) => (
                      <span key={i} className="text-[9px] font-bold uppercase py-1.5 px-4 bg-zinc-100 border border-zinc-300 text-zinc-700 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-6 flex items-center gap-2 group/btn cursor-pointer">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black group-hover/btn:text-yellow-600 transition-colors">Details</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* System Selection Guide */}
      <section className="px-6 py-32 bg-zinc-50 border-y border-zinc-200 mb-32" data-nav-light>
        <div className="max-w-7xl mx-auto reveal opacity-0 translate-y-10 transition-all duration-1000">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[2rem] sm:text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none mb-4 text-black">Technical Selection Guide</h2>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Matching solutions to requirements</p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] md:rounded-[2.5rem] border border-zinc-200 shadow-2xl bg-white">
            {/* Mobile Scroll Hint */}
            <div className="md:hidden flex items-center justify-center gap-2 py-3 bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">
              <span>Swipe to view specs</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr className="bg-zinc-100 border-b border-zinc-300 text-zinc-600 uppercase tracking-widest text-[10px]">
                  <th className="px-10 py-8 font-black">System Type</th>
                  <th className="px-10 py-8 font-black">Capacity Range</th>
                  <th className="px-10 py-8 font-black">Primary Application</th>
                  <th className="px-10 py-8 font-black">Backup Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors">
                  <td className="px-10 py-10 font-black text-black text-xl italic uppercase">On-Grid Solar</td>
                  <td className="px-10 py-10 font-bold text-zinc-600">3kW - 500kW+</td>
                  <td className="px-10 py-10 text-zinc-600 uppercase text-[10px] font-black tracking-widest">Grid Bill Reduction</td>
                  <td className="px-10 py-10 font-bold text-zinc-700 uppercase text-[10px]">Net-Metered</td>
                </tr>
                <tr className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors">
                  <td className="px-10 py-10 font-black text-black text-xl italic uppercase">Hybrid Energy</td>
                  <td className="px-10 py-10 font-bold text-zinc-600">2kW - 50kW</td>
                  <td className="px-10 py-10 text-zinc-600 uppercase text-[10px] font-black tracking-widest">Critical Load Backup</td>
                  <td className="px-10 py-10 font-bold text-zinc-700 uppercase text-[10px]">2 - 12 Hours</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-10 py-10 font-black text-black text-xl italic uppercase">Off-Grid Lithium</td>
                  <td className="px-10 py-10 font-bold text-zinc-600">1kW - 25kW</td>
                  <td className="px-10 py-10 text-zinc-600 uppercase text-[10px] font-black tracking-widest">Self-Sufficient Power</td>
                  <td className="px-10 py-10 font-bold text-zinc-700 uppercase text-[10px]">Full Autonomy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section - Stays Premium but on Light */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto bg-black text-white rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 reveal opacity-0 translate-y-10 transition-all duration-1000 shadow-2xl">
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">Ready to Optimize?</h2>
            <p className="font-bold text-zinc-500 max-w-md mx-auto md:mx-0 text-sm md:text-base">Our certified engineers provide a detailed site audit to ensure maximum efficiency.</p>
          </div>
          <a href="/contact" className="w-full md:w-auto bg-yellow-400 text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap shadow-xl text-center">
            Get energy audit
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
