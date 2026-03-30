import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const Feedback: React.FC = () => {
  useScrollReveal();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [review, setReview] = useState('');

  const testimonials = [
    {
      name: "Abdul Rahman",
      location: "Kannur",
      initials: "AR",
      text: "Spectrum Powers installed a 5KW Hybrid system at my home. The service team was extremely professional, and my electricity bill has literally dropped to zero.",
      rating: 5,
      date: "2 months ago",
      product: "5KW Hybrid Solar",
    },
    {
      name: "Dr. Somashekharan",
      location: "Koyili Hospital",
      initials: "DS",
      text: "Their 50KW installation has been performing flawlessly for over 3 years. One of the most reliable power partners in Kerala. Highly recommended.",
      rating: 5,
      date: "1 year ago",
      product: "50KW Commercial",
    },
    {
      name: "Suresh Babu",
      location: "Malappuram",
      initials: "SB",
      text: "Switched to their Lithium backup system recently. The transition is so smooth I don't even know when the power goes out. Exceptional quality.",
      rating: 5,
      date: "5 months ago",
      product: "Lithium UPS",
    },
  ];

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/feedback-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Customer Testimonials"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Social Proof</span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            TRUSTED BY <br className="hidden md:block" />
            THOUSANDS
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Over 40,000 satisfied customers across Kerala. Their words drive our pursuit of excellence.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-3 gap-8 reveal">
          {[
            { value: '40,000+', label: 'Happy Customers' },
            { value: '4.9 / 5', label: 'Average Rating' },
            { value: '24 Yrs', label: 'Track Record' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-1">
                {stat.value}
              </div>
              <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Leave a Review Form */}
          <div className="lg:col-span-4 reveal">
            <div className="sticky top-32 bg-zinc-900 border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
              <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Your Experience</span>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-8 text-white leading-tight">
                Share your <br />story with us.
              </h3>

              {/* Star Rating */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 transition-all duration-200 ${
                        (hoveredRating || rating) >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
                </p>
              )}

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                />
                <input
                  type="text"
                  placeholder="Your city / location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                />
                <textarea
                  placeholder="Tell us about your experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors resize-none text-sm"
                  rows={4}
                />
                <button className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-yellow-400/20">
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="lg:col-span-8 reveal" style={{ transitionDelay: '150ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem] hover:border-yellow-400/20 hover:bg-zinc-900 transition-all duration-500 shadow-lg overflow-hidden"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Large Quote Decoration */}
                  <Quote className="absolute -top-2 -right-2 w-24 h-24 text-white/[0.03] group-hover:text-yellow-400/[0.06] transition-colors duration-500" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Product Tag */}
                  <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-4 inline-block">
                    {t.product}
                  </span>

                  <p className="text-zinc-300 leading-relaxed mb-6 italic text-base font-light">
                    "{t.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-11 h-11 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 font-black text-sm">{t.initials}</span>
                    </div>
                    <div>
                      <div className="font-black uppercase text-sm tracking-tight flex items-center gap-2 text-white">
                        {t.name}
                        <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                        {t.location} · {t.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* "More stories" placeholder card */}
              <div className="group cursor-pointer p-8 border border-dashed border-white/10 rounded-[2rem] hover:border-yellow-400/30 transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-2">40,000+ Reviews</p>
                <p className="text-zinc-600 text-[10px] font-medium uppercase tracking-wider">
                  Be the next to share your experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
