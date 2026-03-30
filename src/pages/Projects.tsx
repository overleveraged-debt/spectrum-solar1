import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MapPin, Zap, Building2, Hospital } from 'lucide-react';

const Projects: React.FC = () => {
  useScrollReveal();

  const projects = [
    {
      name: "DSC Centre",
      location: "Kannur",
      capacity: "100 KW",
      type: "Commercial",
      icon: <Building2 className="w-5 h-5" />,
      image: "/images/p01.jpg",
      featured: true
    },
    {
      name: "Koyili Hospital",
      location: "Kannur",
      capacity: "50 KW",
      type: "Healthcare",
      icon: <Hospital className="w-5 h-5" />,
      image: "/images/p02.jpg"
    },
    {
      name: "Ranni Taluk Hospital",
      location: "Ranni",
      capacity: "50 KW",
      type: "Government",
      icon: <Hospital className="w-5 h-5" />,
      image: "/images/p03.jpg"
    },
    {
      name: "LEO Lab",
      location: "Kannur",
      capacity: "35 KW",
      type: "Commercial",
      icon: <Building2 className="w-5 h-5" />,
      image: "/images/p04.jpg"
    }
  ];

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      {/* Projects Mini-Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-24 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/projects-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Solar Projects Portfolio"
          />
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal active opacity-1 translate-y-0 transition-all duration-1000">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Our Portfolio</span>
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[0.85] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            4000+ SUCCESSFUL <br className="hidden md:block" />
            INSTALLATIONS
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            From residential rooftops to massive industrial grids, Spectrum Powers delivers energy excellence across the state.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="reveal opacity-0 translate-y-20 transition-all duration-1000 group cursor-pointer"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-900 mb-8 border border-white/5">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  <div className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                    {project.type}
                  </div>
                  <div className="bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                    {project.capacity}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                   <div className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest">
                      View details <Zap className="w-3 h-3 fill-current" />
                   </div>
                </div>
              </div>

              <div className="px-4">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                   {project.icon}
                   <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.location}, Kerala
                   </span>
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter group-hover:text-yellow-400 transition-colors">
                  {project.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Numbers - Now Back to Dark */}
      <section className="px-6 py-24 bg-zinc-950 text-white border-y border-white/5 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 reveal opacity-0 translate-y-10 transition-all duration-1000">
           <div className="text-center group">
              <div className="text-7xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">50MW+</div>
              <div className="text-zinc-500 text-xs font-black uppercase tracking-widest">Total Installed Capacity</div>
           </div>
           <div className="text-center group">
              <div className="text-7xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">1200+</div>
              <div className="text-zinc-500 text-xs font-black uppercase tracking-widest">Commercial Solutions</div>
           </div>
           <div className="text-center group">
              <div className="text-7xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">2800+</div>
              <div className="text-zinc-500 text-xs font-black uppercase tracking-widest">Residential Projects</div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
