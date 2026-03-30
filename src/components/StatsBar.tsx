import React, { useState, useEffect, useRef } from 'react';
import { Award, Store, Users, ShieldCheck } from 'lucide-react';

const StatItem = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => {
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value) || 0;
  const isNaNValue = isNaN(parseInt(value));
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(domRef.current!);
      }
    });
    observer.observe(domRef.current!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isNaNValue) return;
    
    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, targetValue, isNaNValue]);

  return (
    <div ref={domRef} className="flex flex-col items-center group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all duration-500">
        <Icon className="w-5 h-5 text-yellow-400" />
      </div>
      <p className="text-4xl font-black tracking-tighter text-white">
        {isNaNValue ? value : `${count}${value.includes('+') ? '+' : ''}`}
      </p>
      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-2">{label}</p>
    </div>
  );
};

const StatsBar: React.FC = () => {
  return (
    <div className="py-20 bg-zinc-950 border-b border-zinc-900 overflow-hidden relative">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-center">
          <StatItem value="24+" label="Years Industry Lead" icon={Award} />
          <StatItem value="20" label="Regional Outlets" icon={Store} />
          <StatItem value="12" label="Franchise Units" icon={Users} />
          <StatItem value="ERP" label="Enabled since 2005" icon={ShieldCheck} />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
