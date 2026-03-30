import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  useScrollReveal();

  const posts = [
    {
      title: "Why Lithium is the Future of Power Backup",
      excerpt: "Exploring the technical advantages of Lithium Iron Phosphate (LiFePO4) over traditional lead-acid batteries.",
      date: "March 15, 2024",
      author: "Tech Team",
      category: "Innovation",
      image: "/images/Banner01.jpg"
    },
    {
      title: "KSEB Subsidy Guide 2024",
      excerpt: "Everything you need to know about the latest government subsidies for residential solar installations in Kerala.",
      date: "March 10, 2024",
      author: "Policy Brief",
      category: "Savings",
      image: "/images/Banner02.jpg"
    },
    {
      title: "Maximizing ROI on On-Grid Solar Systems",
      excerpt: "Professional tips on panel orientation and periodic maintenance to ensure peak performance.",
      date: "March 05, 2024",
      author: "Engineer Corner",
      category: "Technical",
      image: "/images/banner03.jpg"
    }
  ];

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      {/* Blog Mini-Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-24 pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/blog-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Energy Insights"
          />
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal active opacity-1 translate-y-0 transition-all duration-1000">
          <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">Insights & Updates</span>
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[0.85] italic uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            ENERGY EXCELLENCE <br className="hidden md:block" />
            INSIGHTS BLOG
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-black uppercase italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Sharing two decades of technical expertise and the latest trends in renewable energy to power your future.
          </p>
        </div>
      </section>

      {/* Featured Posts Grid - Now Back to Dark */}
      <section className="px-6 py-32 bg-zinc-900/50 border-y border-white/5 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {posts.map((post, index) => (
            <article 
              key={index}
              className="reveal opacity-0 translate-y-10 transition-all duration-1000 group cursor-pointer"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-100 mb-8 shadow-2xl border border-zinc-200">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                   <span className="bg-yellow-400 text-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      {post.category}
                   </span>
                </div>
              </div>
              
              <div className="px-4">
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                   <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-yellow-400" /> {post.date}</span>
                   <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-yellow-400" /> {post.author}</span>
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 leading-[1.1] group-hover:text-yellow-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-2 italic font-medium">
                   {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-white font-black uppercase text-[10px] tracking-widest group/link">
                   Read Case Study <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform text-yellow-400" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter - Back to Dark */}
      <section className="px-6 mb-20">
          <div className="max-w-5xl mx-auto bg-zinc-900 border border-white/5 rounded-[3.5rem] p-16 text-center reveal opacity-0 translate-y-10 transition-all duration-1000 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">Energy in your inbox</h2>
            <p className="text-zinc-400 font-bold mb-10">Join 5000+ subscribers for the latest Kerala energy policies and tech tips.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
               <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-yellow-400 transition-colors" />
               <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg">
                  Subscribe
               </button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default Blog;
