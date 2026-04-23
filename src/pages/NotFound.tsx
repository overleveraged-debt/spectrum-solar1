import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import SEO from '../components/SEO';
import { Home, Search, ArrowRight } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6 pt-20">
      <SEO 
        title="Page Not Found | Spectrum Solar" 
        description="The page you are looking for does not exist. Return to Spectrum Solar to explore our nationwide solar solutions."
      />
      
      <div className="relative mb-8">
        <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-zinc-900 opacity-20">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="w-16 h-16 text-yellow-400 animate-pulse" />
        </div>
      </div>

      <h2 className="text-3xl md:text-5xl font-thin text-white uppercase tracking-tight mb-4">
        Page Not Found
      </h2>
      <p className="text-zinc-400 text-lg max-w-lg mb-10 font-light">
        The page you're looking for might have been moved, renamed, or doesn't exist. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <RouterLink 
          to="/" 
          className="flex items-center justify-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-yellow-300 transition-all text-sm"
        >
          <Home className="w-4 h-4" /> Back to Home
        </RouterLink>
        
        <RouterLink 
          to="/opportunities" 
          className="flex items-center justify-center gap-2 bg-zinc-900 text-white border border-zinc-800 px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-zinc-800 transition-all text-sm"
        >
          View Opportunities <ArrowRight className="w-4 h-4" />
        </RouterLink>
      </div>
    </div>
  );
};

export default NotFound;
