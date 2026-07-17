import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { allTestimonials } from '../data/testimonials';
import { usePageContent } from '../hooks/usePageContent';

const TestimonialCarousel: React.FC = () => {
  const { pageData } = usePageContent('testimonials');
  const list = pageData.testimonials || allTestimonials;
  const testimonials = list.slice(0, 5); // Use first 5 for carousel

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % (testimonials.length || 1));
  }, [testimonials.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % (testimonials.length || 1));
  };

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[activeIndex] || testimonials[0];
  const initials = current.initials || current.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div 
      className="relative w-full max-w-xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-zinc-950 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden h-[380px] flex flex-col justify-between">
        <div className="absolute top-6 right-8 text-zinc-900 group-hover:text-yellow-400 transition-colors">
          <Quote className="w-16 h-16 opacity-20" />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <p className="text-zinc-300 text-lg md:text-xl font-light italic leading-relaxed mb-8 transition-all duration-500 transform animate-fade-in">
            "{current.text}"
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-8 border-t border-zinc-900">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-white font-black">
              {initials}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                {current.name}
                {current.isVerified !== false && <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500" />}
              </p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-medium mt-0.5">
                {current.product}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 right-8 flex gap-1.5 align-center">
          {testimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-yellow-400 w-4' : 'bg-zinc-800'}`}
            />
          ))}
        </div>
      </div>

      {/* Side Navigation Buttons */}
      <div className="absolute top-1/2 -left-4 sm:-left-6 -translate-y-1/2 z-10">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:text-yellow-400 hover:border-yellow-400 transition-all shadow-xl"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 z-10">
        <button 
          onClick={nextSlide}
          className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:text-yellow-400 hover:border-yellow-400 transition-all shadow-xl"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;
