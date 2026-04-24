import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, Shield, Users, Zap, Clock, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MapSection from '../components/MapSection';
import SEO from '../components/SEO';

const About: React.FC = () => {
  useScrollReveal();

  const stats = [
    { label: 'Years of Excellence', value: '25+', icon: <Clock className="w-6 h-6" />, sub: 'Since 2000' },
    { label: 'Satisfied Customers', value: '40K+', icon: <Users className="w-6 h-6" />, sub: 'Across India' },
    { label: 'Solar Projects', value: '6,145+', icon: <Zap className="w-6 h-6" />, sub: 'Installed & Running' },
    { label: 'Service Engineers', value: '60+', icon: <Shield className="w-6 h-6" />, sub: 'Certified Experts' },
  ];

  const brands = [
    'brand01.jpg', 'brand02.jpg', 'brand03.jpg', 'brand04.jpg',
    'brand05.jpg', 'brand06.jpg', 'brand07.jpg', 'brand08.jpg',
    'brand09.jpg', 'brand10.jpg', 'brand11.jpg', 'brand12.jpg',
  ];

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      <SEO
        title="About Spectrum Solar | India's Leading Solar Solutions Provider"
        description="With 25+ years of excellence, 40K+ satisfied customers, and 6,145+ solar projects, Spectrum Solar is India's trusted name in renewable energy."
      />
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about-hero.webp"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Spectrum Engineering Team"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Our Story</span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            25 YEARS OF <br className="hidden md:block" />
            ENERGY EXCELLENCE
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Since 2001, powering thousands of homes and businesses with customized sustainable energy solutions.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="reveal text-center md:text-left border-r border-white/5 last:border-0 px-4 md:px-8 first:pl-0 last:pr-0 py-4"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-yellow-500 mb-3 flex justify-center md:justify-start">{stat.icon}</div>
              <div className="text-3xl md:text-5xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-zinc-300 font-black uppercase text-xs tracking-wider mb-1">{stat.label}</div>
              <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Section */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="mb-6">
              <Globe className="w-12 h-12 text-yellow-400" />
            </div>
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl font-thin mb-6 tracking-tight italic uppercase text-white leading-tight">
              Built from the ground up in India.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Founded in 2001, Spectrum Powers has been at the forefront of Kerala's energy revolution. We've grown from a local power electronics firm to a state-wide leader in sustainable energy — serving everything from humble households to 100KW industrial megaprojects.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-white font-black text-2xl mb-0.5">2001</p>
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Founded</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-white font-black text-2xl mb-0.5">Kochi</p>
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Headquarters</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-white font-black text-2xl mb-0.5">18+</p>
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Centers</p>
              </div>
            </div>
          </div>
          <div className="reveal aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl" style={{ transitionDelay: '150ms' }}>
            <img
              src="/images/banner1090x907.jpg"
              alt="Spectrum Solar Heritage"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 md:order-1 aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            <img
              src="/images/Banner04.jpg"
              alt="Premium Solar Panels"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="reveal order-1 md:order-2" style={{ transitionDelay: '150ms' }}>
            <div className="mb-6">
              <Award className="w-12 h-12 text-yellow-400" />
            </div>
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Quality First</span>
            <h2 className="text-4xl md:text-5xl font-thin mb-6 tracking-tight italic uppercase text-white leading-tight">
              Only the world's best brands.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              We use only top-tier international brands for our solar panels and backup systems, ensuring every installation meets the highest safety and performance standards. Kerala Government's Best Solar Energy Industry Award is a testament to our commitment.
            </p>
            <div className="p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 mb-1">Accreditation</p>
              <p className="text-white font-black uppercase tracking-tight">Best Solar Energy Industry Award</p>
              <p className="text-zinc-400 text-[10px] mt-1">Kerala Government State Award Recipient</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Strip */}
      <section className="py-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 reveal">
          <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-3 block text-center">Brands We Install</span>
          <h2 className="text-3xl md:text-4xl font-thin uppercase tracking-tight text-center text-white">
            Trusted Partners.
          </h2>
        </div>

        {/* Scrolling strip */}
        <div className="flex gap-8 overflow-hidden">
          <div className="flex gap-8 animate-scroll flex-shrink-0">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-16 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center p-3 hover:border-yellow-400/30 transition-colors"
              >
                <img
                  src={`/images/${brand}`}
                  alt={`Brand ${i + 1}`}
                  className="w-full h-full object-contain filter invert opacity-50 hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presence Map */}
      <section className="py-24 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 reveal">
            <div>
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Regional Presence</span>
              <h2 className="text-4xl md:text-7xl font-thin uppercase tracking-[-0.04em] leading-[0.9] text-white">
                Powering Every <br />District.
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed md:text-right">
              Explore our extensive network of 18+ service centers and thousands of installations across the state.
            </p>
          </div>
          <div className="reveal">
            <MapSection height="600px" />
          </div>
        </div>
      </section>

      {/* Yellow CTA */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto bg-yellow-400 text-black rounded-[2.5rem] md:rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 reveal">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-thin tracking-tight leading-none italic uppercase mb-4">
              18+ Centers <br />Across India.
            </h2>
            <p className="text-black/70 text-base max-w-md font-bold">
              From Kannur to Thiruvananthapuram — our network ensures you're never far from expert power support.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap shadow-xl group"
          >
            Find an office
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
