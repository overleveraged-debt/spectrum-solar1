import React, { useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import SEO from '../components/SEO';
import MapSection from '../components/MapSection';

const galleryItems = [
  { id: 1, src: '/images/p01.jpg', category: 'residential', title: 'Premium Residential Solar', location: 'Kannur', capacity: '5kW On-Grid' },
  { id: 2, src: '/images/p02.jpg', category: 'commercial', title: 'Koyili Hospital', location: 'Kannur', capacity: '50kW Grid-Tied' },
  { id: 3, src: '/images/p03.jpg', category: 'residential', title: 'Home Hybrid System', location: 'Thrissur', capacity: '3kW Hybrid' },
  { id: 4, src: '/images/p04.jpg', category: 'industrial', title: 'DSC Centre', location: 'Kannur', capacity: '100kVA UPS' },
  { id: 5, src: '/images/p05.jpg', category: 'residential', title: 'Lithium Battery Storage', location: 'Palakkad', capacity: '20kWh Lithium' },
  { id: 6, src: '/images/p06.jpg', category: 'commercial', title: 'Ranni Taluk Hospital', location: 'Pathanamthitta', capacity: '30kW + UPS' },
  { id: 7, src: '/images/p07.jpg', category: 'industrial', title: 'LEO Lab Solution', location: 'Kozhikode', capacity: '200kW On-Grid' },
  { id: 8, src: '/images/banner1090x907.jpg', category: 'commercial', title: 'Sreenarayana Hospital', location: 'Ernakulam', capacity: '500kW On-Grid' },
  { id: 9, src: '/images/banner1090x908.jpg', category: 'industrial', title: 'Industrial Solar Plant', location: 'Kollam', capacity: '150kW Industrial' },
  { id: 10, src: '/images/banner1090x909.jpg', category: 'residential', title: 'Villa Solar + Storage', location: 'Munnar', capacity: '8kW + 20kWh' },
  { id: 11, src: '/images/banner1200x1000.jpg', category: 'commercial', title: 'Resort Solar Integration', location: 'Wayanad', capacity: '25kW + Battery' },
];

const filters = ['All', 'Residential', 'Commercial', 'Industrial'];

const categoryColor: Record<string, string> = {
  residential: 'text-yellow-400',
  commercial: 'text-blue-400',
  industrial: 'text-green-400',
};

const Gallery: React.FC = () => {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === activeFilter.toLowerCase());

  const safeIndex = Math.min(currentIndex, filtered.length - 1);
  const safeItem = filtered[safeIndex] ?? filtered[0];

  const goNext = useCallback(() => setCurrentIndex((i) => (i + 1) % filtered.length), [filtered.length]);
  const goPrev = useCallback(() => setCurrentIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);

  const handleFilterChange = (f: string) => {
    setActiveFilter(f);
    setCurrentIndex(0);
  };

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden min-h-screen">
      <SEO 
        title="Solar Installation Gallery | Spectrum Solar Projects"
        description="Explore our portfolio of residential, commercial, and industrial solar installations across India. See our engineering excellence in action."
      />
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/banner1090x907.jpg" className="w-full h-full object-cover scale-[1.05]" alt="Gallery" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Installations</span>
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl font-thin tracking-tight mb-4 leading-[0.9] uppercase text-white">Gallery</h1>
          <p className="text-white/60 text-base max-w-xl mx-auto font-light">Installations across India — from rooftops to industrial plants.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-[70px] z-30 bg-zinc-950/95 backdrop-blur border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${activeFilter === f ? 'bg-yellow-400 text-black' : 'bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white'
                }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-zinc-600">
            {currentIndex + 1} / {filtered.length}
          </span>
        </div>
      </div>

      {/* Main Carousel */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">

            {/* Featured Image */}
            <div className="relative rounded-3xl overflow-hidden group" style={{ aspectRatio: '4/3' }}>
              <img
                key={safeItem.id}
                src={safeItem.src}
                alt={safeItem.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Navigation arrows */}
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-yellow-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-yellow-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Expand button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur"
              >
                <Expand className="w-4 h-4 text-white" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className={`text-[9px] font-black uppercase tracking-widest mb-1 block ${categoryColor[safeItem.category]}`}>
                  {safeItem.category}
                </span>
                <h3 className="text-white font-thin text-xl uppercase tracking-tight leading-tight">{safeItem.title}</h3>
                <p className="text-white/60 text-xs mt-1">{safeItem.location} · {safeItem.capacity}</p>
              </div>
            </div>

            {/* Right: Thumbnail Grid */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-thin uppercase tracking-tight leading-none text-white mb-2">
                  {safeItem.title}
                </h2>
                <p className="text-zinc-500 text-sm">{safeItem.location} · <span className="text-yellow-400 font-bold">{safeItem.capacity}</span></p>
              </div>

              {/* Thumbnail strip — scrollable */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 overflow-y-auto max-h-[340px] pr-1">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-200 ${i === safeIndex
                        ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-zinc-950 scale-[0.98]'
                        : 'opacity-60 hover:opacity-100'
                      }`}
                    style={{ aspectRatio: '1' }}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Dot pagination */}
              <div className="flex items-center gap-2 flex-wrap mt-2">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`rounded-full transition-all duration-200 ${i === safeIndex ? 'w-5 h-2 bg-yellow-400' : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                  />
                ))}
                <div className="ml-auto flex gap-2">
                  <button onClick={goPrev} className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={goNext} className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-yellow-400 hover:text-black rounded-full flex items-center justify-center transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-yellow-400 hover:text-black rounded-full flex items-center justify-center transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={safeItem.src} alt={safeItem.title} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-white font-thin text-xl uppercase">{safeItem.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{safeItem.location} · {safeItem.capacity}</p>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 flex-shrink-0 ${categoryColor[safeItem.category]}`}>
                {safeItem.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Distribution Map */}
      <section className="py-24 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 reveal">
            <div className="text-center md:text-left">
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Geographic Spread</span>
              <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-[-0.04em] leading-[0.9] text-white">
                Mapping Our <br />Impact.
              </h2>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl reveal" style={{ transitionDelay: '100ms' }}>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Serving Since</p>
               <p className="text-xl font-black text-white">2000</p>
            </div>
          </div>
          <div className="reveal">
            <MapSection height="600px" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5 text-center reveal">
        <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Want a project like this?</span>
        <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight leading-none mb-6 text-white">Let's Build Yours.</h2>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
          Get a Free Quote
        </Link>
      </section>
    </div>
  );
};

export default Gallery;
