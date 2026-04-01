import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const allTestimonials = [
  { name: 'Abdul Rahman', location: 'Kannur', initials: 'AR', text: 'Spectrum Powers installed a 5KW Hybrid system at my home. The service team was extremely professional, and my electricity bill has literally dropped to zero.', rating: 5, date: '2 months ago', product: '5KW Hybrid Solar', category: 'Solar' },
  { name: 'Dr. Somashekharan', location: 'Koyili Hospital', initials: 'DS', text: 'Their 50KW installation has been performing flawlessly for over 3 years. One of the most reliable power partners in Kerala. Highly recommended.', rating: 5, date: '1 year ago', product: '50KW Commercial', category: 'Solar' },
  { name: 'Suresh Babu', location: 'Malappuram', initials: 'SB', text: "Switched to their Lithium backup system recently. The transition is so smooth I don't even know when the power goes out. Exceptional quality.", rating: 5, date: '5 months ago', product: 'Lithium UPS', category: 'Backup' },
  { name: 'Priya Menon', location: 'Thrissur', initials: 'PM', text: 'Our factory runs on Spectrum\'s 200kW solar plant now. ROI happened faster than they estimated. Their after-sales team is always available.', rating: 5, date: '8 months ago', product: '200kW On-Grid', category: 'Solar' },
  { name: 'Rajesh Kumar', location: 'Calicut', initials: 'RK', text: 'Home UPS from Spectrum has been rock solid for 2 years. Pure sine wave output — my computers and inverter AC run perfectly. Worth every rupee.', rating: 5, date: '10 months ago', product: 'Home UPS', category: 'Backup' },
  { name: 'Aisha Fathima', location: 'Thiruvananthapuram', initials: 'AF', text: 'Solar water heater installed 3 years back. Zero issues. Saves us about ₹1,500 per month in electricity. Excellent post-sale service too.', rating: 5, date: '3 months ago', product: 'Solar Water Heater', category: 'Solar' },
  { name: 'Thomas Varghese', location: 'Kottayam', initials: 'TV', text: 'They handled everything from KSEB paperwork to commissioning. Hybrid 10KW system now covers our entire household. Professional and trustworthy.', rating: 5, date: '6 months ago', product: '10kW Hybrid', category: 'Solar' },
  { name: 'Mohammed Ashraf', location: 'Palakkad', initials: 'MA', text: 'Installed Online UPS for our server room. True online double conversion — absolutely no interruption. Our IT infrastructure has been flawless since.', rating: 5, date: '4 months ago', product: '20kVA Online UPS', category: 'Backup' },
  { name: 'Anitha Krishnan', location: 'Kozhikode', initials: 'AK', text: 'Best solar company in Kerala without a doubt. Honest advice, premium products, and a team that genuinely cares about long-term performance.', rating: 5, date: '7 months ago', product: '6kW On-Grid', category: 'Solar' },
  { name: 'Vinod Nair', location: 'Ernakulam', initials: 'VN', text: 'Lithium battery bank they installed has transformed our power situation. 8 hours of backup on a fully charged system. Incredible technology.', rating: 5, date: '1 month ago', product: '20kWh Lithium', category: 'Battery' },
  { name: 'Santha Lakshmi', location: 'Kochi', initials: 'SL', text: 'The team was punctual, professional, and cleaned up after the installation. The system has been working perfectly for 18 months without a single issue.', rating: 5, date: '9 months ago', product: '4kW Hybrid', category: 'Solar' },
  { name: 'George Philip', location: 'Muvattupuzha', initials: 'GP', text: 'Franchise partner for 2 years now. Great backend support, quality products, and the brand name opens doors. Highly profitable partnership.', rating: 5, date: '2 years ago', product: 'Franchise Partner', category: 'Other' },
];

const filterOptions = ['All', 'Solar', 'Backup', 'Battery', 'Other'];
const CARDS_PER_PAGE = 6;

const Feedback: React.FC = () => {
  useScrollReveal();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [review, setReview] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);

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
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            Trusted By <br className="hidden md:block" /> Thousands
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter">
            Over 40,000 satisfied customers across Kerala.
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

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentCards.map((t, i) => (
              <div
                key={`${activeFilter}-${currentPage}-${i}`}
                className="group relative p-7 bg-zinc-900/50 border border-white/5 rounded-[2rem] hover:border-yellow-400/20 hover:bg-zinc-900 transition-all duration-500 shadow-lg overflow-hidden"
              >
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
                      <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                      {t.location} · {t.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot pagination */}
          <div className="flex justify-center gap-2">
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

      {/* Leave a Review */}
      <section className="px-6 pb-10 border-t border-white/5 pt-16">
        <div className="max-w-2xl mx-auto reveal">
          <div className="bg-zinc-900 border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <span className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Your Experience</span>
            <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-8 text-white leading-tight">
              Share your story with us.
            </h3>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-125"
                >
                  <Star className={`w-8 h-8 transition-all duration-200 ${(hoveredRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-700'}`} />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-6">
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
              </p>
            )}
            <div className="space-y-4">
              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors text-sm" />
              <input type="text" placeholder="Your city / location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors text-sm" />
              <textarea placeholder="Tell us about your experience..." value={review} onChange={(e) => setReview(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors resize-none text-sm" rows={4} />
              <button className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-yellow-400/20">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
