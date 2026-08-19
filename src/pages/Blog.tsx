import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, User, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { sanityReadClient } from '../lib/sanityClient';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { usePageContent } from '../hooks/usePageContent';

const DEFAULT_POSTS = [
  {
    title: "Why Lithium is the Future of Power Backup",
    excerpt: "Exploring the technical advantages of Lithium Iron Phosphate (LiFePO4) over traditional lead-acid batteries in residential and commercial backup applications.",
    publishedAt: "2024-03-15T00:00:00.000Z",
    author: "Tech Team",
    category: "Innovation",
    readTime: "5 min read",
    coverImage: "/images/Banner01.jpg",
  },
  {
    title: "KSEB Subsidy Guide 2024",
    excerpt: "Everything you need to know about the latest government subsidies for residential solar installations in Kerala — eligibility, amount, and application process.",
    publishedAt: "2024-03-10T00:00:00.000Z",
    author: "Policy Brief",
    category: "Savings",
    readTime: "7 min read",
    coverImage: "/images/Banner02.jpg",
  },
  {
    title: "Maximizing ROI on On-Grid Solar Systems",
    excerpt: "Professional tips on panel orientation and periodic maintenance to ensure peak performance and the fastest possible payback on your investment.",
    publishedAt: "2024-03-05T00:00:00.000Z",
    author: "Engineer Corner",
    category: "Technical",
    readTime: "4 min read",
    coverImage: "/images/banner03.jpg",
  }
];

const Blog: React.FC = () => {
  const { pageData } = usePageContent('blog');
  const [posts, setPosts] = useState<any[]>(DEFAULT_POSTS);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "blog"] | order(publishedAt desc)')
      .then(res => {
        if (isMounted && res && res.length > 0) {
          setPosts(res);
        }
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Custom scroll reveal trigger to re-observe after posts list changes dynamically
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
    return () => {
      reveals.forEach(el => observer.unobserve(el));
    };
  }, [posts]);

  const formatDate = (isoStr: string) => {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return '';
    }
  };

  const categoryColor: Record<string, string> = {
    Innovation: '#facc15',
    Savings: '#4ade80',
    Technical: '#60a5fa',
  };

  const featured = posts[0] || DEFAULT_POSTS[0];
  const rest = posts.slice(1);

  return (
    <div className="bg-zinc-950 text-white pb-20 overflow-x-hidden">
      <SEO 
        title={pageData.metaTitle || "Solar & Clean Energy Blog | Spectrum Solar Knowledge Hub"}
        description={pageData.metaDescription || "Expert solar guides, subsidy updates, battery technology comparisons, and technical insights from Spectrum Solar engineers."}
        keywords={pageData.metaKeywords || "solar energy blog india, kseb solar subsidy guide, lithium battery vs tubular, solar panel maintenance tips"}
      />
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-24 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/blog-hero.jpg"
            className="w-full h-full object-cover scale-[1.05]"
            alt="Energy Insights"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 font-medium tracking-[0.4em] uppercase text-[10px] mb-8 block drop-shadow-lg">
            Insights & Updates
          </span>
          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight mb-6 leading-[0.9] uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            ENERGY EXCELLENCE <br className="hidden md:block" />
            INSIGHTS
          </h1>
          <p className="text-yellow-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light tracking-wide drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Two decades of technical expertise, distilled into actionable energy insights.
          </p>
        </div>
      </section>

      {/* Section Label */}
      <section className="px-6 pt-24 pb-8">
        <div className="max-w-7xl mx-auto reveal flex items-center justify-between">
          <div>
            <span className="text-yellow-400 font-medium text-[10px] uppercase tracking-[0.5em] mb-3 block">Latest from the Field</span>
            <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-[-0.04em] leading-[0.9]">Our Blog.</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>{posts.length} Articles</span>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="px-6 pb-8">
          <div className="max-w-7xl mx-auto reveal">
            <Link
              to={`/blog/${featured.slug?.current || featured.slug}`}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-yellow-400/30 transition-all duration-500 bg-zinc-900/60 block hover:no-underline"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src={featured.coverImage || featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span
                    className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm"
                    style={{ color: categoryColor[featured.category || 'Innovation'] || '#facc15' }}
                  >
                    {featured.category || 'Innovation'}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-yellow-400 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-medium uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-yellow-400" /> {formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-yellow-400" /> {featured.author || 'Tech Team'}</span>
                  <span>{featured.readTime || '5 min read'}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-thin uppercase tracking-tight mb-5 leading-none group-hover:text-yellow-400 transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-8 font-light text-base">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3 text-yellow-400 font-black uppercase text-[10px] tracking-widest group/link">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Rest of Posts */}
      {rest.length > 0 && (
        <section className="px-6 pb-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post, index) => (
              <Link
                key={index}
                to={`/blog/${post.slug?.current || post.slug}`}
                className="reveal group cursor-pointer rounded-[2rem] overflow-hidden border border-white/5 hover:border-yellow-400/30 transition-all duration-500 bg-zinc-900/40 block hover:no-underline"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.coverImage || post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm"
                      style={{ color: categoryColor[post.category || 'Innovation'] || '#facc15' }}
                    >
                      {post.category || 'Innovation'}
                    </span>
                  </div>
                  <div className="absolute bottom-5 right-5">
                    <span className="text-zinc-400 text-[9px] font-medium uppercase tracking-widest">{post.readTime || '5 min read'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-medium uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-yellow-400" /> {formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-yellow-400" /> {post.author || 'Tech Team'}</span>
                  </div>
                  <h3 className="text-2xl font-thin uppercase tracking-tight mb-3 leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-widest group/link">
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-yellow-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default Blog;
