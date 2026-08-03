import React, { useState, useEffect } from 'react';
import { Sun, BatteryCharging, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onLoaded?: () => void;
  title?: string;
  videoUrl?: string;
  videoPoster?: string;
}

const Hero: React.FC<HeroProps> = ({ onLoaded, title, videoUrl, videoPoster }) => {
  const [scrollY, setScrollY] = useState(0);

  const resolvedSrc = videoUrl || "https://m1xmbxx46bhiywtx.public.blob.vercel-storage.com/spectrum%20small%20(1).mp4";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatHeroTitle = (text: string) => {
    if (!text) return null;
    const words = text.split(' ');
    if (words.length <= 2) {
      return <span className="text-yellow-400">{text}</span>;
    }
    const lastTwo = words.slice(-2).join(' ');
    const remaining = words.slice(0, -2).join(' ');
    return (
      <>
        {remaining} <br /><span className="text-yellow-400">{lastTwo}</span>
      </>
    );
  };

  return (
    <section className="relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <video 
          src={resolvedSrc}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          {...({ fetchpriority: "high" } as any)}
          onCanPlayThrough={() => onLoaded?.()}
          className="w-full h-full object-cover transition-all duration-1000 filter saturate-100 brightness-100 md:saturate-[0.6] md:brightness-[0.35]"
          poster={videoPoster || "/images/Banner01.webp"}
          style={{ transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)` }}
        />
        {/* Desktop: Enhanced Contrast Overlay */}
        <div 
          className="hidden md:block absolute inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3Cturbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        {/* Mobile: Original Video view with subtle legibility tint */}
        <div className="md:hidden absolute inset-0 bg-black/25 z-[1]" />
      </div>

      {/* Hero Content */}
      <div 
        className="relative z-10 text-center px-6 max-w-5xl mt-12 hidden md:block"
        style={{ transform: `translateY(${-scrollY * 0.1}px)`, opacity: 1 - scrollY * 0.002 }}
      >
        <h1 className="text-[2.2rem] sm:text-6xl md:text-8xl lg:text-[5rem] font-thin mb-8 md:mb-12 tracking-[0.05em] leading-[1] md:leading-[0.92] text-white reveal uppercase" style={{ transitionDelay: '150ms' }}>
          {title ? formatHeroTitle(title) : (
            <>
              Precision <br /><span className="text-yellow-400">Since 2002.</span>
            </>
          )}
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 reveal" style={{ transitionDelay: '300ms' }}>
          <Link to="/solar" className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-zinc-950 text-yellow-400 border border-yellow-400/20 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            Solar Solutions <Sun className="w-3.5 h-3.5" />
          </Link>
          <Link to="/power" className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-zinc-950 text-yellow-400 border border-yellow-400/20 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            Power Backup Solutions <BatteryCharging className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </div>
    </section>
  );
};

export default Hero;
