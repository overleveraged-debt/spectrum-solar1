import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { isScrolled, isOverLightSection } = useNavbarScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLightMode = isOverLightSection;

  const navClass = isScrolled
    ? `glass-nav py-4 ${isLightMode ? 'bg-white/95 border-black/5 shadow-xl' : 'bg-black/80 border-white/5 shadow-2xl'}`
    : `py-6 bg-transparent ${isLightMode ? 'border-b border-black/5' : ''}`;

  const textColor = isLightMode ? 'text-zinc-900' : 'text-zinc-100';
  const ctaClass = isLightMode
    ? 'bg-zinc-950 text-white hover:bg-yellow-400 hover:text-black hover:scale-105'
    : 'bg-white text-zinc-950 hover:bg-yellow-400 hover:scale-105';

  const navLinks = [
    { to: '/calculator', label: 'Calculator' },
    { to: '/services', label: 'Our Products' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Vlog' },
    { to: '/feedback', label: 'Customers' },
    { to: '/about', label: 'About' },
  ];

  const mobileLinks = [
    { to: '/calculator', label: 'Calculator' },
    { to: '/services', label: 'Our Products' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Vlog' },
    { to: '/feedback', label: 'Customers' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <nav id="navbar" className={`fixed w-full z-50 px-4 md:px-6 transition-all duration-500 ${navClass}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Spectrum Powers"
              className="h-7 md:h-10 w-auto transition-all duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center space-x-6 xl:space-x-8 text-[11px] font-black uppercase tracking-[0.2em] ${textColor}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link transition-colors ${location.pathname === link.to ? 'text-yellow-400' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`${ctaClass} px-6 py-2.5 rounded-full transition-all ml-2 border border-transparent font-black`}
            >
              Inquiry
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors ${textColor}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-zinc-950 flex flex-col lg:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Spectrum Powers" className="h-7 w-auto" />
          </Link>
          <button
            className="text-zinc-400 hover:text-white p-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col space-y-1">
            {mobileLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-4 border-b border-white/5 text-2xl font-black italic tracking-tighter uppercase transition-colors group ${
                  location.pathname === link.to ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span>{link.label}</span>
                <span className="text-yellow-400 text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 block bg-yellow-400 text-black px-8 py-5 rounded-full text-sm font-black uppercase tracking-[0.2em] text-center shadow-2xl hover:scale-[1.02] transition-transform"
          >
            Inquiry Now
          </Link>
        </div>

        {/* Mobile Footer info */}
        <div className="px-6 py-6 border-t border-white/5 flex-shrink-0">
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-2">Engineering Headquarters</p>
          <p className="text-white font-bold text-sm">Kochi, Kerala, India</p>
          <p className="text-zinc-400 text-sm">+91 94470 12345</p>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[59] bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
