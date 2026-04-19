import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

import { allTestimonials } from '../data/testimonials';

const filterOptions = ['All', 'Solar', 'Backup', 'Battery', 'Other'];
const CARDS_PER_PAGE = 6;

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial: t }) => (
  <div className="group relative p-7 bg-zinc-900/50 border border-white/5 rounded-[2rem] hover:border-yellow-400/20 hover:bg-zinc-900 transition-all duration-500 shadow-lg overflow-hidden h-full">
    <Quote className="absolute -top-2 -right-2 w-20 h-20 text-white/[0.03] group-hover:text-yellow-400/[0.06] transition-colors duration-500" />
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-4 h-4 ${s <= t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-700'}`} />
      ))}
    </div>
    <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-4 inline-block">
      {t.product}
    </span>
    <p className="text-zinc-300 leading-relaxed mb-5 italic text-sm font-light">"{t.text}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
      <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
        <span className="text-yellow-400 font-black text-xs">{t.initials}</span>
      </div>
      <div>
        <div className="font-black uppercase text-sm tracking-tight flex items-center gap-2 text-white">
          {t.name}
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-yellow-400" />
            {t.isVerified && <span className="text-[8px] text-zinc-500 font-bold tracking-widest uppercase">Google Verified</span>}
          </div>
        </div>
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
          {t.date}
        </div>
      </div>
    </div>
  </div>
);

const Feedback: React.FC = () => {
  useScrollReveal();

  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const filtered = activeFilter === 'All'
    ? allTestimonials
    : allTestimonials.filter((t) => t.category === activeFilter);

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const currentCards = filtered.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE);

  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 0));

  const handleFilterChange = (f: string) => {
    setActiveFilter(f);
    setCurrentPage(0);
    setMobileIndex(0);
  };

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img src="/images/feedback-hero.jpg" className="w-full h-full object-cover scale-[1.05]" alt="Customer Testimonials" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Social Proof</span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            Trusted By <br className="hidden md:block" /> Thousands
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter">
            Over 40,000 satisfied customers across India.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-3 gap-8 reveal">
          {[{ value: '40,000+', label: 'Happy Customers' }, { value: '4.9 / 5', label: 'Average Rating' }, { value: '25 Yrs', label: 'Track Record' }].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
              <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Filter + Navigation Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-12 reveal">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === f
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                disabled={currentPage >= totalPages - 1}
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentCards.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-10">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
              >
                {filtered.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-1">
                    <TestimonialCard testimonial={t} />
                  </div>
                ))}
              </div>

              {/* Mobile Nav Arrows */}
              <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-2 pointer-events-none">
                <button
                  onClick={() => setMobileIndex((p) => Math.max(p - 1, 0))}
                  disabled={mobileIndex === 0}
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm pointer-events-auto disabled:opacity-0 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setMobileIndex((p) => Math.min(p + 1, filtered.length - 1))}
                  disabled={mobileIndex === filtered.length - 1}
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm pointer-events-auto disabled:opacity-0 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIndex(i)}
                  className={`transition-all duration-300 ${
                    i === mobileIndex ? 'w-5 h-1.5 bg-yellow-400 rounded-full' : 'w-1.5 h-1.5 bg-zinc-800 rounded-full'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Pagination */}
          <div className="hidden md:flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === currentPage ? 'w-6 h-2 bg-yellow-400' : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="px-6 pb-20 border-t border-white/5 pt-16">
        <div className="max-w-4xl mx-auto reveal text-center">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Your Experience</span>
            <h3 className="text-3xl md:text-5xl font-thin italic uppercase tracking-tight mb-8 text-white leading-tight">
              Share your story on Google.
            </h3>
            <p className="text-zinc-500 text-lg mb-10 max-w-2xl mx-auto">
              Your feedback helps us improve and helps others make informed decisions about their clean energy journey.
            </p>
            <a 
              href="https://maps.app.goo.gl/kukTmitZZYJ9z69w8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-yellow-400 text-black font-black uppercase tracking-[0.2em] px-12 py-6 rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-yellow-400/20 group"
            >
              Write a Review 
              <Star className="w-5 h-5 fill-black group-hover:rotate-12 transition-transform" />
            </a>
            <div className="flex items-center justify-center gap-8 mt-16 opacity-30 grayscale">
               <img src="/images/google-logo.png" alt="Google" className="h-6 object-contain" />
               <img src="/images/maps-logo.png" alt="Google Maps" className="h-6 object-contain" />
            </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
