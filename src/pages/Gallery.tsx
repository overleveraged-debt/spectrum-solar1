import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    src: '/images/p01.jpg',
    category: 'residential',
    title: 'Residential Rooftop Solar',
    location: 'Kannur, Kerala',
    capacity: '5kW On-Grid',
  },
  {
    id: 2,
    src: '/images/p02.jpg',
    category: 'commercial',
    title: 'Commercial UPS Installation',
    location: 'Calicut, Kerala',
    capacity: '50kVA Online UPS',
  },
  {
    id: 3,
    src: '/images/p03.jpg',
    category: 'residential',
    title: 'Home Hybrid Solar System',
    location: 'Thrissur, Kerala',
    capacity: '3kW Hybrid',
  },
  {
    id: 4,
    src: '/images/p04.jpg',
    category: 'industrial',
    title: 'Industrial Power Backup',
    location: 'Kochi, Kerala',
    capacity: '100kVA Online UPS',
  },
  {
    id: 5,
    src: '/images/p05.jpg',
    category: 'residential',
    title: 'Lithium Battery Bank',
    location: 'Palakkad, Kerala',
    capacity: '20kWh Lithium Storage',
  },
  {
    id: 6,
    src: '/images/p06.jpg',
    category: 'commercial',
    title: 'Hospital Power Solution',
    location: 'Kozhikode, Kerala',
    capacity: '30kW + UPS Hybrid',
  },
  {
    id: 7,
    src: '/images/p07.jpg',
    category: 'industrial',
    title: 'Factory Solar Installation',
    location: 'Ernakulam, Kerala',
    capacity: '200kW On-Grid',
  },
  {
    id: 8,
    src: '/images/banner1090x907.jpg',
    category: 'commercial',
    title: 'Large-Scale Solar Farm',
    location: 'Trivandrum, Kerala',
    capacity: '500kW On-Grid',
  },
  {
    id: 9,
    src: '/images/banner1090x908.jpg',
    category: 'industrial',
    title: 'Industrial Solar Rooftop',
    location: 'Kollam, Kerala',
    capacity: '150kW Industrial',
  },
  {
    id: 10,
    src: '/images/banner1090x909.jpg',
    category: 'residential',
    title: 'Villa Solar + Storage',
    location: 'Munnar, Kerala',
    capacity: '8kW Hybrid + 20kWh',
  },
  {
    id: 11,
    src: '/images/banner1200x1000.jpg',
    category: 'commercial',
    title: 'Resort Solar Integration',
    location: 'Alappuzha, Kerala',
    capacity: '25kW Solar + Battery',
  },
];

const filters = ['All', 'Residential', 'Commercial', 'Industrial'];

const Gallery: React.FC = () => {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === activeFilter.toLowerCase());

  return (
    <div className="bg-white text-zinc-950 pb-20 overflow-x-hidden min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/projects-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Our Work Gallery"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block drop-shadow-lg">
            Our Installations
          </span>
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Gallery
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto font-light">
            11 projects across Kerala — from rooftops to industrial plants.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pt-12 pb-6 sticky top-[70px] z-30 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-zinc-950 text-yellow-400'
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {filtered.length} Projects
          </span>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="reveal break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl bg-zinc-100"
                style={{ transitionDelay: `${index * 60}ms` }}
                onClick={() => setLightboxItem(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: '200px' }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className={`text-[8px] font-black uppercase tracking-widest mb-1 ${
                    item.category === 'residential' ? 'text-yellow-400' :
                    item.category === 'commercial' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {item.category}
                  </span>
                  <h3 className="text-white font-black text-sm uppercase tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-white/60 text-[10px] font-bold mt-1">{item.location} · {item.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightboxItem(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxItem(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxItem.src}
              alt={lightboxItem.title}
              className="w-full max-h-[70vh] object-cover rounded-2xl"
            />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight">{lightboxItem.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{lightboxItem.location} · {lightboxItem.capacity}</p>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex-shrink-0 ${
                lightboxItem.category === 'residential' ? 'bg-yellow-400/10 text-yellow-400' :
                lightboxItem.category === 'commercial' ? 'bg-blue-400/10 text-blue-400' : 'bg-green-400/10 text-green-400'
              }`}>
                {lightboxItem.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-zinc-950 text-white text-center reveal">
        <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Want a project like this?</span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
          Let's Build Yours.
        </h2>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 bg-yellow-400 text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
        >
          Get a Free Quote
        </a>
      </section>
    </div>
  );
};

export default Gallery;
