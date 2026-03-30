import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { isScrolled, isOverLightSection } = useNavbarScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLightMode = isOverLightSection;
  
  const navClass = isScrolled 
    ? `glass-nav py-4 ${isLightMode ? 'bg-white/95 border-black/5 shadow-xl' : 'bg-black/80 border-white/5 shadow-2xl'}` 
    : `py-8 bg-transparent ${isLightMode ? 'border-b border-black/5' : ''}`;
  
  const textColor = isLightMode ? 'text-zinc-900' : 'text-zinc-100';
  const ctaClass = isLightMode 
    ? 'bg-zinc-950 text-white hover:bg-yellow-400 hover:text-black hover:scale-105' 
    : 'bg-white text-zinc-950 hover:bg-yellow-400 hover:scale-105';

  return (
    <>
      <nav id="navbar" className={`fixed w-full z-50 px-6 transition-all duration-500 ${navClass}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Spectrum Powers" 
              className="h-8 md:h-10 w-auto transition-all duration-500 group-hover:scale-110" 
            />
          </Link>
          
          <div className={`hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-[0.2em] ${textColor}`}>
            <Link to="/calculator" className={`nav-link transition-colors ${location.pathname === '/calculator' ? 'text-yellow-400' : ''}`}>Calculator</Link>
            <Link to="/services" className="nav-link transition-colors">Solar</Link>
            <Link to="/services" className="nav-link transition-colors">Power Backup</Link>
            <Link to="/projects" className="nav-link transition-colors">Projects</Link>
            <Link to="/blog" className="nav-link transition-colors">Vlog</Link>
            <Link to="/feedback" className="nav-link transition-colors">Customers</Link>
            <Link to="/about" className="nav-link transition-colors">About</Link>
            <Link to="/contact" className={`${ctaClass} px-7 py-3 rounded-full transition-all ml-4 border border-transparent font-black`}>
              Inquiry
            </Link>
          </div>

          <button 
            className={`lg:hidden transition-colors ${textColor}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-zinc-950 flex flex-col p-8 lg:hidden transition-transform duration-400 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Spectrum Powers" 
              className="h-8 w-auto" 
            />
          </Link>
          <button 
            className="text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        <div className="flex flex-col space-y-6 text-3xl font-black italic tracking-tighter uppercase text-white">
          <Link to="/calculator" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Calculator</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Solar Systems</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Power Backup</Link>
          <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Projects</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Engineering</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-block bg-yellow-400 text-black px-8 py-5 rounded-full text-sm font-black uppercase tracking-[0.2em] text-center shadow-2xl">
            Inquiry Now
          </Link>
        </div>
        <div className="mt-auto pt-10 border-t border-white/5">
           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-4">Engineering Headquarters</p>
           <p className="text-white font-bold">Kochi, Kerala, India <br /> +91 94470 12345</p>
        </div>
      </div>
    </>
  );
};

export default Header;
