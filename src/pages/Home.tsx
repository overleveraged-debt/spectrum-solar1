import React from 'react';
import { Droplets, Cpu, Layers, ShieldCheck, Waves, TrendingUp, Sun } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';

const Home: React.FC = () => {
  useScrollReveal();

  return (
    <div className="flex flex-col bg-zinc-950 noise-bg">
      <Hero />
      <StatsBar />

      <section id="solutions" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
            <div className="reveal">
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Core Energy</span>
              <h2 className="text-[3rem] sm:text-5xl md:text-7xl font-black tracking-[-0.05em] text-white uppercase leading-[0.9]">Solar <br />Integration.</h2>
            </div>
            <p className="text-zinc-500 max-w-xs text-sm leading-relaxed reveal">Proven expertise in large-scale system integration across Kerala and beyond.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 h-[400px] sm:h-[450px] md:h-[600px] bento-card rounded-[3rem] p-6 sm:p-8 md:p-14 flex flex-col justify-end relative overflow-hidden group reveal">
              <img src="/images/Banner04.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-[2000ms]" alt="Solar Hybrid" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center mb-8 text-black">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 text-white uppercase tracking-[-0.02em] leading-tight text-balance">Government <br />Awarded Grid Integration.</h3>
                <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">High-performance Kerala Gov Awarded solar architecture for industry and home with 24/7 monitoring.</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">Net-Metering</span>
                  <span className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">Hybrid Ready</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="h-[280px] bento-card rounded-[3rem] p-10 flex flex-col justify-between group reveal" style={{ transitionDelay: '150ms' }}>
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                  <Droplets className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-tight">Solar Water Heating</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">Specialized thermal solutions for residential and commercial scales.</p>
                </div>
              </div>
              <div className="flex-1 bento-card rounded-[3rem] p-10 flex flex-col justify-between group reveal" style={{ transitionDelay: '300ms' }}>
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                  <Cpu className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-tight">Power Analytics</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">ERP-Enabled data tracking for every unit installed since 2005.</p>
                  <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em]">System Integrated &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Power Backup & Diverse Systems (White) */}
      <section id="backup" className="py-32 bg-white text-black" data-nav-light>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
            <div className="reveal">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Power Electronics</span>
              <h2 className="text-[3rem] sm:text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase leading-[0.9]">Diverse <br />Portfolio.</h2>
            </div>
            <p className="text-zinc-600 max-w-xs text-sm leading-relaxed reveal tracking-wide">Precision-engineered power conditioning and backup devices with Kerala Heritage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-8 premium-cream-card rounded-2xl reveal">
              <Cpu className="w-8 h-8 mb-6 text-yellow-500" />
              <h4 className="text-lg font-extrabold mb-2 uppercase">UPS Systems</h4>
              <p className="text-zinc-600 text-xs">Online and home UPS units with zero switch-over.</p>
            </div>
            <div className="p-8 premium-cream-card rounded-2xl reveal" style={{ transitionDelay: '100ms' }}>
              <Layers className="w-8 h-8 mb-6 text-yellow-500" />
              <h4 className="text-lg font-extrabold mb-2 uppercase">Batteries</h4>
              <p className="text-zinc-600 text-xs">Lithium and Tubular battery manufacturing.</p>
            </div>
            <div id="integrated" className="p-8 premium-cream-card rounded-2xl reveal" style={{ transitionDelay: '200ms' }}>
              <ShieldCheck className="w-8 h-8 mb-6 text-yellow-500" />
              <h4 className="text-lg font-extrabold mb-2 uppercase">Security & CCTV</h4>
              <p className="text-zinc-600 text-xs">Total integrated surveillance and safety units.</p>
            </div>
            <div className="p-8 premium-cream-card rounded-2xl reveal" style={{ transitionDelay: '300ms' }}>
              <Waves className="w-8 h-8 mb-6 text-yellow-500" />
              <h4 className="text-lg font-extrabold mb-2 uppercase">Water Purifiers</h4>
              <p className="text-zinc-600 text-xs">Advanced purification systems for healthy living.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Network & Opportunities (Dark) */}
      <section id="opportunities" className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 reveal">
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Expansion</span>
              <h2 className="text-[2.5rem] sm:text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-white uppercase leading-none md:leading-tight">Scale with a <br className="hidden md:block" />Market Leader.</h2>
              <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed mb-10">
                Join a network of 20 successful outlets. We offer structured franchise and dealership models with 24 years of supply chain expertise.
              </p>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-400 rounded-xl text-black">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white">ERP-Optimized Operations</p>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase">Full logistical transparency since 2005.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 reveal" style={{ transitionDelay: '200ms' }}>
              <div className="group p-10 border border-zinc-800 rounded-[2rem] hover:border-yellow-400 transition-all cursor-pointer bg-zinc-900/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Franchise <br />(12 Units)</h4>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">Establish a brand center with full technical and marketing support from HQ.</p>
                <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform inline-block">Inquire Area &rarr;</span>
              </div>
              <div className="group p-10 border border-zinc-800 rounded-[2rem] hover:border-yellow-400 transition-all cursor-pointer bg-zinc-900/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Layers className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Official <br />Dealership</h4>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">Distribute our core range of UPS, Batteries, and Water Purifiers in your area.</p>
                <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform inline-block">Join Network &rarr;</span>
              </div>
              <div className="group p-8 border border-zinc-800 rounded-2xl hover:border-yellow-400 transition-all cursor-pointer bg-zinc-900/40 md:col-span-2">
                <h4 className="text-xl font-bold text-white mb-4">Freelance Partnership</h4>
                <p className="text-zinc-500 text-sm mb-6">Expert-level consultation partnerships for energy auditors and engineering professionals.</p>
                <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Register Profile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Visualization Section (Dark) */}
      <section className="py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Statewide Presence</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.05em] text-white uppercase leading-[0.9] mb-8">Kerala's <br />Energy Hook.</h2>
              <div className="space-y-6">
                {[
                  { city: "Kochi", type: "HQ & Distribution" },
                  { city: "Trivandrum", type: "Regional Hub" },
                  { city: "Kannur", type: "Engineering Center" },
                  { city: "Kozhikode", type: "Solar Design Lab" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-zinc-900 group cursor-pointer hover:border-yellow-400 transition-colors">
                    <span className="text-xl font-bold text-white uppercase tracking-tighter">{item.city}</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-yellow-400 transition-colors">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex justify-center items-center reveal" style={{ transitionDelay: '200ms' }}>
              <div className="aspect-square w-full max-w-md bg-zinc-900/50 rounded-full border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/5 to-transparent"></div>
                {/* Minimalist Map Placeholder - Can be replaced with actual SVG later */}
                <div className="relative text-center p-12">
                  <div className="text-yellow-400 font-black text-7xl opacity-10 blur-sm absolute inset-0 flex items-center justify-center select-none uppercase tracking-tighter transition-all group-hover:blur-none">KERALA</div>
                  <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">Network Visualization</p>
                  <div className="mt-8 flex justify-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Testimonials (Light Neutral) */}
      <section id="about" className="py-32 bg-zinc-50 text-black border-y border-zinc-200 noise-bg" data-nav-light>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Our Heritage</span>
              <h2 className="text-[2.5rem] sm:text-4xl md:text-5xl font-bold mb-8 tracking-tighter uppercase leading-none">Spectrum Powers <br className="hidden md:block" />India.</h2>
              <p className="text-zinc-800 mb-8 text-base md:text-lg font-light leading-relaxed max-w-lg">
                Specializing in power electronics and solar system integration, we prioritize a customer-centric approach that drives our high referral rates.
              </p>
              <div className="p-6 bento-card-light rounded-2xl inline-block">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-2">Accreditation</p>
                <p className="text-sm font-black uppercase tracking-tight">Best Solar Energy Industry Award</p>
                <p className="text-[10px] text-zinc-700 mt-1">Kerala Government State Award Recipient</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 reveal">
              <div className="bg-zinc-950 p-10 rounded-xl border border-zinc-800 shadow-2xl">
                <p className="text-zinc-300 text-sm leading-relaxed italic mb-8 border-b border-zinc-800 pb-8">
                  "With a decade of partnership with Spectrum, their ERP-enabled operations ensure we never face a supply delay. Truly professional."
                </p>
                <div className="flex items-center gap-4 pt-6">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center text-[10px] text-white font-bold">SP</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Abraham Thomas</p>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Franchise Owner, Kochi</p>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-950 p-10 rounded-xl border border-zinc-800 shadow-2xl">
                <p className="text-zinc-300 text-sm leading-relaxed italic mb-8 border-b border-zinc-800 pb-8">
                  "High referrals led me here. The Solar + Water Purifier installation was completed in record time. Highly customer-centric."
                </p>
                <div className="flex items-center gap-4 pt-6">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center text-[10px] text-white font-bold">SP</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Saira Khan</p>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Residential Client, Trivandrum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 bg-zinc-950 text-center">
        <div className="max-w-3xl mx-auto px-6 reveal">
          <h2 className="text-[3rem] sm:text-5xl md:text-7xl font-bold tracking-tighter mb-12 text-white uppercase leading-none">24 Years of <br className="hidden md:block" />Reliability.</h2>
          <button className="w-full sm:w-auto bg-yellow-400 text-black px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">Connect with Experts</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
