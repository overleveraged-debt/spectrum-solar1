import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote, User, CheckCircle2 } from 'lucide-react';

const Feedback: React.FC = () => {
  useScrollReveal();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const testimonials = [
    {
      name: "Abdul Rahman",
      location: "Kannur",
      text: "Spectrum Powers installed a 5KW Hybrid system at my home. The service team was extremely professional, and my electricity bill has literally dropped to zero.",
      rating: 5,
      date: "2 months ago"
    },
    {
      name: "Dr. Somashekharan",
      location: "Koyili Hospital",
      text: "Their 50KW installation has been performing flawlessly for over 3 years. One of the most reliable power partners in Kerala.",
      rating: 5,
      date: "1 year ago"
    },
    {
      name: "Suresh Babu",
      location: "Malappuram",
      text: "Switched to their Lithium backup system recently. The transition is so smooth I don't even know when the power goes out.",
      rating: 5,
      date: "5 months ago"
    }
  ];

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      {/* Feedback Mini-Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-24 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/feedback-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Customer Testimonials"
          />
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal active opacity-1 translate-y-0 transition-all duration-1000">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Social Proof</span>
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[0.85] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            TRUSTED BY <br className="hidden md:block" />
            THOUSANDS
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Over 40,000 satisfied customers across Kerala. Your feedback helps us maintain energy excellence and drive innovation.
          </p>
        </div>
      </section>

      {/* Main Content - Back to Dark */}
      <section className="px-6 py-32 bg-zinc-950 border-y border-white/5 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Submit Feedback */}
          <div className="lg:col-span-4 reveal opacity-0 translate-x-[-20px] transition-all duration-1000">
             <div className="sticky top-32 bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-white text-center">Leave a Review</h3>
                <div className="flex justify-center gap-2 mb-8 text-white">
                   {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                         key={star}
                         className={`w-8 h-8 cursor-pointer transition-all ${
                            (hoveredRating || rating) >= star ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-zinc-800'
                         }`}
                         onMouseEnter={() => setHoveredRating(star)}
                         onMouseLeave={() => setHoveredRating(0)}
                         onClick={() => setRating(star)}
                      />
                   ))}
                </div>
                <div className="space-y-4">
                   <textarea 
                      placeholder="How has your solar experience been?" 
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-5 text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none mb-4"
                      rows={5}
                   ></textarea>
                   <button className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                      Submit Review
                   </button>
                </div>
             </div>
          </div>

          {/* Testimonial Wall - Dark Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 reveal opacity-0 translate-x-[20px] transition-all duration-1000">
             {testimonials.map((t, i) => (
                <div key={i} className="p-10 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] relative group hover:bg-zinc-900 transition-all duration-500 shadow-xl">
                   <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-yellow-400/10 transition-colors" />
                   <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                         <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                   </div>
                   <p className="text-zinc-300 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                   <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center border border-white/5">
                         <User className="text-zinc-500 w-6 h-6" />
                      </div>
                      <div>
                         <div className="font-black uppercase text-sm tracking-tight flex items-center gap-2 text-white">
                            {t.name} <CheckCircle2 className="w-4 h-4 text-yellow-400 shadow-sm" />
                         </div>
                         <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                            {t.location} • {t.date}
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Feedback;
