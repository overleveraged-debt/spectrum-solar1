import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, Shield, Users, Zap, Clock, Globe } from 'lucide-react';

const About: React.FC = () => {
  useScrollReveal();

  const stats = [
    { label: 'Years of Excellence', value: '24+', icon: <Clock className="w-6 h-6" /> },
    { label: 'Satisfied Customers', value: '40,000+', icon: <Users className="w-6 h-6" /> },
    { label: 'Solar Projects', value: '4,000+', icon: <Zap className="w-6 h-6" /> },
    { label: 'Service Engineers', value: '60+', icon: <Shield className="w-6 h-6" /> },
  ];

  const highlights = [
    {
      title: "Our Heritage",
      description: "Founded in 2001, Spectrum Powers has been at the forefront of Kerala's energy revolution for over two decades. We've grown from a local power electronics firm to a state-wide leader in sustainable energy.",
      icon: <Globe className="w-12 h-12 text-yellow-400" />
    },
    {
      title: "Quality First",
      description: "We use only top-tier international brands for our solar panels and backup systems, ensuring every installation meets the highest safety and performance standards.",
      icon: <Award className="w-12 h-12 text-yellow-400" />
    }
  ];

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      {/* About Mini-Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-24 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Spectrum Engineering Team"
          />
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal active opacity-1 translate-y-0 transition-all duration-1000">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Our Story</span>
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[0.85] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            24 YEARS OF <br className="hidden md:block" />
            ENERGY EXCELLENCE
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Since 2001, Spectrum Powers has been empowering thousands of homes and businesses with customized sustainable power solutions.
          </p>
        </div>
      </section>

      {/* Stats Grid - Now Dark Section */}
      <section className="px-6 py-24 bg-zinc-950 text-white border-y border-white/5 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="reveal opacity-0 translate-y-10 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-yellow-500 mb-4 flex justify-center md:justify-start">{stat.icon}</div>
              <div className="text-4xl font-black mb-1 text-white">{stat.value}</div>
              <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Sections - Alternating */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto space-y-0">
          {/* Heritage on Dark */}
          <div className="flex flex-col md:flex-row items-center gap-16 pb-32">
              <div className="flex-1 reveal opacity-0 translate-y-10 transition-all duration-1000">
                <div className="mb-8">{highlights[0].icon}</div>
                <h2 className="text-4xl font-black mb-6 tracking-tight italic uppercase text-white">{highlights[0].title}</h2>
                <p className="text-zinc-400 text-lg leading-relaxed">{highlights[0].description}</p>
              </div>
              <div className="flex-1 w-full aspect-video bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden group reveal opacity-0 scale-95 transition-all duration-1000 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                   <Zap className="w-20 h-20 text-white/5" />
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Quality - Back to Dark */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <div className="mb-8 text-yellow-400">{highlights[1].icon}</div>
            <h2 className="text-4xl font-black mb-6 tracking-tight italic uppercase text-white">{highlights[1].title}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">{highlights[1].description}</p>
          </div>
          <div className="flex-1 w-full aspect-video bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden group reveal opacity-0 scale-95 transition-all duration-1000 shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
               <Award className="w-20 h-20 text-white/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="px-6 bg-yellow-400 text-black py-24 rounded-[3rem] mx-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none italic uppercase">
            18+ CENTERS <br /> ACROSS KERALA
          </h2>
          <p className="text-black/70 text-lg max-w-xl mx-auto mb-12 font-bold">
            From Kannur to Thiruvananthapuram, our network of sales and service centers ensures you're never far from expert power support.
          </p>
          <a href="/contact" className="inline-block bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Find an office
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
