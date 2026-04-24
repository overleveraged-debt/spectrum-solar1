import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MapPin, Building2, Hospital, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import MapSection from '../components/MapSection';
import SEO from '../components/SEO';

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
    },
    {
      name: "Koyili Hospital",
      location: "Kannur",
      capacity: "50 KW",
      type: "Healthcare",
      icon: <Hospital className="w-5 h-5" />,
      image: "/images/p02.jpg",
    },
    {
      name: "Ranni Taluk Hospital",
      location: "Ranni",
      capacity: "50 KW",
      type: "Government",
      icon: <Hospital className="w-5 h-5" />,
      image: "/images/p03.jpg",
    },
    {
      name: "LEO Lab",
      location: "Kannur",
      capacity: "35 KW",
      type: "Commercial",
      icon: <Building2 className="w-5 h-5" />,
      image: "/images/p04.jpg",
    },
    {
      name: "Commercial Complex",
      location: "Thrissur",
      capacity: "25 KW",
      type: "Commercial",
      icon: <Building2 className="w-5 h-5" />,
      image: "/images/p05.jpg",
    },
    {
      name: "Residential Villa",
      location: "Kochi",
      capacity: "10 KW",
      type: "Residential",
      icon: <Building2 className="w-5 h-5" />,
      image: "/images/p06.jpg",
    },
  ];

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden">
      <SEO 
        title="Our Solar Portfolio | 4000+ Installations Across India"
        description="Explore Spectrum Solar's extensive portfolio of residential, commercial, and government projects. Over 4000 successful installations powering India."
      />
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/projects pg.jpeg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Solar Projects Portfolio"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Our Portfolio</span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            4000+ SUCCESSFUL <br className="hidden sm:block" />
            INSTALLATIONS
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            From residential rooftops to massive industrial grids, delivering energy excellence across the state.
          </p>
        </div>
      </section>

      {/* Section header */}
      <section className="pt-24 pb-4 px-6">
        <div className="max-w-7xl mx-auto reveal">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Featured Work</span>
              <h2 className="text-4xl md:text-7xl font-thin uppercase tracking-[-0.04em] leading-[0.9]">
                Landmark <br />Projects.
              </h2>
            </div>
            <p className="hidden md:block text-zinc-500 text-sm max-w-xs leading-relaxed text-right">
              A selection of our most impactful installations.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 py-16 mb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="reveal group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="rounded-[2rem] overflow-hidden border border-zinc-100 shadow-md hover:shadow-2xl transition-all duration-500 bg-white hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Yellow left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  {/* Tags */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {project.type}
                    </span>
                    <span className="bg-yellow-400 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {project.capacity}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-zinc-400 mb-2 text-[10px] font-bold uppercase tracking-widest">
                    {project.icon}
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-thin uppercase italic tracking-tight group-hover:text-yellow-500 transition-colors">
                      {project.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="px-6 py-24 bg-black text-white mx-6 rounded-[3rem] mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">By The Numbers</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight leading-none">
              Our Impact.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 reveal">
            {[
              { value: '50MW+', label: 'Total Installed Capacity', sub: 'Nationwide installations' },
              { value: '1,200+', label: 'Commercial Solutions', sub: 'Hospitals, offices, factories' },
              { value: '2,800+', label: 'Residential Projects', sub: 'Homes powered by sun' },
            ].map((stat, i) => (
              <div key={i} className="text-center group border-t border-white/10 pt-10">
                <div className="text-6xl md:text-7xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors duration-500 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-zinc-300 font-black uppercase tracking-widest text-sm mb-1">{stat.label}</div>
                <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Map */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">State-wide Footprint</span>
            <h2 className="text-3xl md:text-5xl font-thin uppercase tracking-tight text-black">
              Engineering <br className="md:hidden" /> Excellence Everywhere.
            </h2>
          </div>
          <div className="reveal">
            <MapSection height="550px" theme="light" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 reveal">
          <div>
            <h3 className="text-3xl md:text-4xl font-thin uppercase italic tracking-tight mb-2">
              Want us to build yours?
            </h3>
            <p className="text-zinc-500 text-sm font-medium">
              Get a free feasibility audit from our senior engineers.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all shadow-xl"
          >
            Request Site Audit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
