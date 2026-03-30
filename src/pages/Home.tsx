import React, { useState, useEffect, useCallback } from 'react';
import { Droplets, Cpu, Layers, ShieldCheck, Waves, TrendingUp, Sun, Star, CheckCircle2, Quote, ArrowRight, ChevronLeft, ChevronRight, Zap, Leaf, BatteryCharging } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import LoadingScreen from '../components/LoadingScreen';

const homeTestimonials = [
  { name: 'Abdul Rahman', location: 'Kannur', initials: 'AR', date: '2 months ago', product: '5KW Hybrid Solar', text: 'Spectrum Powers installed a 5KW Hybrid system at my home. The service team was extremely professional, and my electricity bill has literally dropped to zero.', rating: 5 },
  { name: 'Dr. Somashekharan', location: 'Koyili Hospital', initials: 'DS', date: '1 year ago', product: '50KW Commercial', text: 'Their 50KW installation has been performing flawlessly for over 3 years. One of the most reliable power partners in Kerala. Highly recommended.', rating: 5 },
  { name: 'Priya Menon', location: 'Thrissur', initials: 'PM', date: '8 months ago', product: '200kW On-Grid', text: 'Our factory runs on Spectrum\'s 200kW solar plant now. ROI happened faster than they estimated. Their after-sales team is always available.', rating: 5 },
  { name: 'Suresh Babu', location: 'Malappuram', initials: 'SB', date: '5 months ago', product: 'Lithium UPS', text: "Switched to their Lithium backup system recently. The transition is so smooth I don't even know when the power goes out. Exceptional quality.", rating: 5 },
  { name: 'Anitha Krishnan', location: 'Kozhikode', initials: 'AK', date: '7 months ago', product: '6kW On-Grid', text: 'Best solar company in Kerala without a doubt. Honest advice, premium products, and a team that genuinely cares about long-term performance.', rating: 5 },
];

const HomeTestimonialCarousel: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx((i) => (i + 1) % homeTestimonials.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + homeTestimonials.length) % homeTestimonials.length), []);

  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next]);

  const t = homeTestimonials[idx];
  return (
    <div className="relative">
      <div key={idx} className="relative p-7 md:p-9 bg-zinc-900/60 border border-white/5 rounded-[2rem] shadow-lg overflow-hidden" style={{ animation: 'fadeIn 0.4s ease-out' }}>
        <Quote className="absolute -top-2 -right-2 w-20 h-20 text-yellow-400/[0.05]" />
        <div className="flex gap-1 mb-4">
          {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-5 inline-block">{t.product}</span>
        <p className="text-zinc-300 leading-relaxed mb-6 italic text-base font-light min-h-[80px]">"{t.text}"</p>
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-400 font-black text-xs">{t.initials}</span>
          </div>
          <div>
            <div className="font-black uppercase text-sm tracking-tight flex items-center gap-2 text-white">{t.name} <CheckCircle2 className="w-4 h-4 text-yellow-400" /></div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{t.location} · {t.date}</div>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-3 mt-4">
        {homeTestimonials.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`rounded-full transition-all duration-200 ${i === idx ? 'w-5 h-2 bg-yellow-400' : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'}`} />
        ))}
        <div className="ml-auto flex gap-2">
          <button onClick={prev} className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={next} className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <Link to="/feedback" className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-400 hover:gap-2 transition-all">
        Read all 40,000+ reviews <ArrowRight className="w-3 h-3" />
      </Link>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

const Home: React.FC = () => {

  useScrollReveal();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className={`flex flex-col bg-zinc-950 noise-bg ${!isVideoLoaded ? 'h-screen overflow-hidden' : ''}`}>
      <LoadingScreen isVisible={!isVideoLoaded} />
      <Hero onLoaded={() => setIsVideoLoaded(true)} />
      <StatsBar />

      {/* Core Solar Solutions Section */}
      <section id="solutions" className="py-24 md:py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="reveal">
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Solar Solutions</span>
              <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-black tracking-[-0.05em] text-white uppercase leading-[0.9]">Solar <br />Systems.</h2>
            </div>
            <Link to="/solar" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-400 hover:gap-3 transition-all reveal">
              All Solar Products <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
            {[
              { id: 'on-grid', icon: Sun, title: 'On-Grid Solar', sub: 'Grid-Tied', desc: 'Zero electricity bills with net metering. Fastest ROI. Best for homes & offices.', badge: 'Most Popular', color: '#facc15' },
              { id: 'hybrid', icon: Zap, title: 'Hybrid Solar', sub: 'Grid + Battery', desc: 'Day & night power. Solar generation + lithium backup for seamless reliability.', badge: null, color: '#a78bfa' },
              { id: 'off-grid', icon: Leaf, title: 'Lithium Off-Grid', sub: 'Off-Grid', desc: 'Complete energy independence. For remote sites, islands & hospitals.', badge: null, color: '#4ade80' },
              { id: 'water-heaters', icon: Droplets, title: 'Solar Water Heaters', sub: 'Thermal Savings', desc: 'High-efficiency vacuum tube systems. 100L to 2000L for any scale.', badge: null, color: '#fb923c' },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  to={`/solar#${p.id}`}
                  className="group relative p-6 md:p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] hover:border-opacity-60 transition-all duration-400 flex flex-col justify-between min-h-[240px] overflow-hidden hover:bg-zinc-900"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = p.color + '60')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300" style={{ backgroundColor: p.color + '15', border: `1px solid ${p.color}30` }}>
                      <Icon className="w-5 h-5" style={{ color: p.color }} />
                    </div>
                    {p.badge && <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 inline-block" style={{ color: p.color, backgroundColor: p.color + '15', border: `1px solid ${p.color}30` }}>{p.badge}</span>}
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{p.title}</h3>
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

      {/* Power Backup Section */}
      <section id="backup" className="py-24 md:py-32 bg-white text-black" data-nav-light>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="reveal">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Power Backup</span>
              <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase leading-[0.9]">Backup <br />Systems.</h2>
            </div>
            <Link to="/power" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:gap-3 transition-all reveal">
              All Power Products <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 reveal">
            {[
              { id: 'lithium-ups', icon: Cpu, title: 'Lithium UPS', sub: 'Pure Sine Wave' },
              { id: 'home-ups', icon: Zap, title: 'Home UPS', sub: 'Zero Interruption' },
              { id: 'inverters', icon: TrendingUp, title: 'Inverters', sub: 'All Capacities' },
              { id: 'online-ups', icon: ShieldCheck, title: 'Online UPS', sub: 'IT & Server' },
              { id: 'lithium-batteries', icon: Layers, title: 'Lithium Batteries', sub: '4000+ Cycles' },
              { id: 'tubular-batteries', icon: Waves, title: 'Tubular Batteries', sub: 'Lead-Acid Value' },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  to={`/power#${p.id}`}
                  className="group p-5 premium-cream-card rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col gap-3 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-yellow-600 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-tight text-black leading-tight">{p.title}</h4>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mt-0.5 block">{p.sub}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-yellow-600 mt-auto">
                    View <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>



      {/* Full-Bleed Nature Photo Background — Why Spectrum */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/nature-kerala.jpg" className="w-full h-full object-cover" alt="Kerala Nature" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl reveal">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block">Why Spectrum</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-8">India's Most Trusted <br />Solar Partner.</h2>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-10">24 years. 40,000+ installations. Government-awarded excellence. Engineered for Kerala's unique climate.</p>
            <div className="grid grid-cols-3 gap-6">
              {[{ v: '40K+', l: 'Installations' }, { v: '24yr', l: 'Track Record' }, { v: '100%', l: 'Service Rate' }].map((s, i) => (
                <div key={i} className="border-l border-yellow-400/40 pl-4">
                  <div className="text-3xl font-black text-yellow-400 tracking-tighter">{s.v}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About & Testimonials */}
      <section id="about" className="py-20 md:py-32 bg-zinc-950 text-white border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Heritage text */}
            <div className="reveal">
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Our Heritage</span>
              <h2 className="text-[2.5rem] sm:text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
                Spectrum Powers <br className="hidden md:block" />India.
              </h2>
              <p className="text-zinc-400 mb-8 text-base md:text-lg font-light leading-relaxed max-w-lg">
                Specializing in power electronics and solar system integration, we prioritize a customer-centric approach that drives our high referral rates.
              </p>
              <div className="p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl inline-block">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 mb-2">Accreditation</p>
                <p className="text-sm font-black uppercase tracking-tight text-white">Best Solar Energy Industry Award</p>
                <p className="text-[10px] text-zinc-400 mt-1">Kerala Government State Award Recipient</p>
              </div>
            </div>

            {/* Right: Testimonial Carousel */}
            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <HomeTestimonialCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Installation Gallery — Improved Design */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Our Installations</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                Real Projects. <br className="hidden md:block" />Real Results.
              </h2>
            </div>
            <div className="flex gap-3">
              <a href="/solar" className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-zinc-950 text-yellow-400 border border-yellow-400/20 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                Solar Solutions <Sun className="w-3.5 h-3.5" />
              </a>
              <a href="/power" className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-zinc-950 text-yellow-400 border border-yellow-400/20 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                Power Systems <BatteryCharging className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 reveal">
            {[
              { src: '/images/p01.jpg', label: 'Kannur', cap: '5kW On-Grid' },
              { src: '/images/p02.jpg', label: 'Calicut', cap: '50kVA UPS' },
              { src: '/images/p03.jpg', label: 'Thrissur', cap: '3kW Hybrid' },
              { src: '/images/p04.jpg', label: 'Kochi', cap: '100kVA UPS' },
              { src: '/images/p05.jpg', label: 'Palakkad', cap: '20kWh Lithium' },
              { src: '/images/p06.jpg', label: 'Kozhikode', cap: '30kW Solar' },
              { src: '/images/p07.jpg', label: 'Ernakulam', cap: '200kW On-Grid' },
              { src: '/images/banner1090x907.jpg', label: 'Trivandrum', cap: '500kW Plant' },
            ].map((item, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? undefined : '4/3', minHeight: i === 0 ? '300px' : undefined }}>
                <img src={item.src} alt={item.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-yellow-400 text-[9px] font-black uppercase tracking-widest">{item.label}</p>
                  <p className="text-white font-black text-sm uppercase tracking-tight">{item.cap}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center md:hidden">
            <Link to="/gallery" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-full">View All Projects <ArrowRight className="w-3 h-3" /></Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 bg-zinc-950 text-center">
        <div className="max-w-3xl mx-auto px-6 reveal">
          <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-bold tracking-tighter mb-8 md:mb-12 text-white uppercase leading-none">24 Years of <br className="hidden md:block" />Reliability.</h2>
          <Link to="/contact" className="inline-block w-full sm:w-auto bg-yellow-400 text-black px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">Connect with Experts</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
