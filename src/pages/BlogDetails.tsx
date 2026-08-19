import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Loader2, BookOpen } from 'lucide-react';
import { sanityReadClient } from '../lib/sanityClient';
import SEO from '../components/SEO';

const DEFAULT_POSTS = [
  {
    title: "Why Lithium is the Future of Power Backup",
    excerpt: "Exploring the technical advantages of Lithium Iron Phosphate (LiFePO4) over traditional lead-acid batteries in residential and commercial backup applications.",
    publishedAt: "2024-03-15T00:00:00.000Z",
    author: "Tech Team",
    category: "Innovation",
    readTime: "5 min read",
    coverImage: "/images/Banner01.jpg",
    body: `Traditional lead-acid batteries have dominated the backup market for decades, but modern installations are rapidly switching to Lithium Iron Phosphate (LFP).

LFP batteries offer a significant improvement in cycle life, discharging up to 80-90% of their total capacity without damage. They charge faster, operate safely at high ambient temperatures, and have a footprint that is 70% smaller than a comparable lead-acid bank. With warranties spanning 5-10 years, lithium solutions represent the single most cost-effective and future-proof backup strategy.`
  },
  {
    title: "KSEB Subsidy Guide 2024",
    excerpt: "Everything you need to know about the latest government subsidies for residential solar installations in Kerala — eligibility, amount, and application process.",
    publishedAt: "2024-03-10T00:00:00.000Z",
    author: "Policy Brief",
    category: "Savings",
    readTime: "7 min read",
    coverImage: "/images/Banner02.jpg",
    body: `Under the central government solar rooftop subsidy portal, homeowners in Kerala can claim a direct financial subsidy on residential solar systems.

For systems up to 3kW, KSEB facilitates a 30% direct subsidy. For larger systems (3kW up to 10kW), the subsidy is capped at a lower percentage but still provides significant savings. To apply, citizens must register via the National Portal, select a certified local installer like Spectrum Solar, submit their load requirements, and obtain net metering approval. Our engineers handle the complete paperwork from filing to connection.`
  },
  {
    title: "Maximizing ROI on On-Grid Solar Systems",
    excerpt: "Professional tips on panel orientation and periodic maintenance to ensure peak performance and the fastest possible payback on your investment.",
    publishedAt: "2024-03-05T00:00:00.000Z",
    author: "Engineer Corner",
    category: "Technical",
    readTime: "4 min read",
    coverImage: "/images/banner03.jpg",
    body: `An on-grid solar system is only as profitable as its peak performance. To ensure the fastest return on investment (often under 3-4 years), correct installation guidelines are vital.

Panels must be oriented true south at a tilt angle of approximately 10-15 degrees depending on the latitude of the property in Kerala. Dust and bird droppings can decrease panel output by up to 20%; we recommend periodic cleaning with soft water every two weeks. Active monitoring via the inverter's mobile application will help identify any underperforming strings immediately.`
  }
];

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // First, try querying Sanity
    sanityReadClient.fetch('*[_type == "blog" && slug.current == $slug][0]', { slug })
      .then(res => {
        if (isMounted) {
          if (res) {
            setPost(res);
          } else {
            // Check local fallback defaults
            const localFallback = DEFAULT_POSTS.find(
              p => p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') === slug
            );
            setPost(localFallback || null);
          }
        }
      })
      .catch(err => {
        console.error("Error fetching blog details:", err);
        if (isMounted) {
          const localFallback = DEFAULT_POSTS.find(
            p => p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') === slug
          );
          setPost(localFallback || null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

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

  if (loading) {
    return (
      <div className="bg-zinc-950 text-white min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
        <p className="text-zinc-500 text-sm">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-zinc-950 text-white min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <BookOpen className="w-16 h-16 text-zinc-700" />
        <h2 className="text-3xl font-thin uppercase tracking-tight">Article Not Found</h2>
        <p className="text-zinc-500 max-w-md">
          The blog post you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>
        <Link
          to="/blog"
          className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold py-3 px-6 rounded-2xl transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen pb-20 pt-28">
      <SEO 
        title={`${post.title} | Spectrum Solar Insights`}
        description={post.excerpt || `Read ${post.title} on the Spectrum Solar Knowledge Hub.`}
        keywords={`${post.category || 'Solar'}, solar energy insights, spectrum solar blog, ${post.title.toLowerCase()}`}
        type="article"
      />
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-400 transition-colors text-xs font-semibold uppercase tracking-widest mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>

        {/* Article Meta */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-4">
            <span
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800"
              style={{ color: categoryColor[post.category || 'Innovation'] || '#facc15' }}
            >
              {post.category || 'Innovation'}
            </span>
            <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-medium uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-yellow-400" /> {formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-yellow-400" /> {post.author || 'Tech Team'}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-yellow-400" /> {post.readTime || '5 min read'}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight leading-[1.05] uppercase">
            {post.title}
          </h1>
          
          <p className="text-lg text-zinc-400 leading-relaxed font-light border-l-2 border-yellow-400 pl-4 py-1">
            {post.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        {(post.coverImage || post.image) && (
          <div className="aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/5 mb-12">
            <img
              src={post.coverImage || post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-invert max-w-none text-zinc-300 leading-relaxed font-light text-base space-y-6 whitespace-pre-line">
          {post.body}
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
