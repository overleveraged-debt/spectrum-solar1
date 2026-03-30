import React, { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { Link, useLocation } from 'react-router-dom';

interface NavChild {
  label: string;
  to: string;
}

interface NavGroup {
  label: string;
  to: string;
  children?: NavChild[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Solar Solutions',
    to: '/solar',
    children: [
      { label: 'On-Grid Solar System', to: '/solar' },
      { label: 'Hybrid Solar System', to: '/solar' },
      { label: 'Lithium Off-Grid System', to: '/solar' },
      { label: 'Solar Water Heaters', to: '/solar' },
      { label: 'Energy Audit & Maintenance', to: '/solar' },
    ],
  },
  {
    label: 'Power Backup',
    to: '/power',
    children: [
      { label: 'Lithium Inbuilt UPS', to: '/power' },
      { label: 'Home UPS System', to: '/power' },
      { label: 'Inverters', to: '/power' },
      { label: 'Online UPS', to: '/power' },
      { label: 'Lithium Batteries', to: '/power' },
      { label: 'Tubular Batteries', to: '/power' },
    ],
  },
  {
    label: 'Calculator',
    to: '/calculator',
    children: [
      { label: 'Solar Calculator', to: '/calculator' },
      { label: 'Power Backup Calculator', to: '/calculator' },
    ],
  },
  {
    label: 'Opportunities',
    to: '/opportunities',
    children: [
      { label: 'Franchise', to: '/opportunities' },
      { label: 'Dealership', to: '/opportunities' },
      { label: 'Freelance Dealer', to: '/opportunities' },
      { label: 'Job Opportunities', to: '/opportunities' },
    ],
  },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Testimonials', to: '/feedback' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Projects', to: '/projects' },
    ],
  },
];

const singleLinks: NavGroup[] = [
  { label: 'Blog', to: '/blog' },
];

const Header: React.FC = () => {
  const { isScrolled, isOverLightSection } = useNavbarScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isLightMode = isOverLightSection;
  const navClass = isScrolled
    ? `glass-nav py-3 ${isLightMode ? 'bg-white/95 border-black/5 shadow-xl' : 'bg-black/90 border-white/5 shadow-2xl'}`
    : `py-5 bg-transparent ${isLightMode ? 'border-b border-black/5' : ''}`;
  const textColor = isLightMode ? 'text-zinc-900' : 'text-zinc-100';
  const ctaClass = isLightMode
    ? 'bg-zinc-950 text-white hover:bg-yellow-400 hover:text-black hover:scale-105'
    : 'bg-white text-zinc-950 hover:bg-yellow-400 hover:scale-105';

  const handleMouseEnter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const isGroupActive = (group: NavGroup) => {
    if (location.pathname === group.to) return true;
    if (group.children?.some((c) => location.pathname === c.to)) return true;
    return false;
  };

  return (
    <>
      <nav id="navbar" className={`fixed w-full z-50 px-4 md:px-6 transition-all duration-500 ${navClass}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Spectrum Powers"
              className="h-7 md:h-9 w-auto transition-all duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-1 xl:gap-2 text-[10px] font-black uppercase tracking-[0.18em] ${textColor}`}>
            {/* Dropdown Groups */}
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(group.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={group.to}
                  className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isGroupActive(group)
                      ? 'text-yellow-400'
                      : isLightMode
                      ? 'hover:text-zinc-950 hover:bg-black/5'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === group.label ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Dropdown Panel */}
                {group.children && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 origin-top ${
                      activeDropdown === group.label
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                    onMouseEnter={() => handleMouseEnter(group.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-2">
                      {group.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl text-zinc-400 hover:text-yellow-400 hover:bg-white/5 transition-all duration-150 group/item"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/item:bg-yellow-400 transition-colors flex-shrink-0" />
                          <span className="text-[10px] font-black uppercase tracking-widest leading-tight">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Single links */}
            {singleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-yellow-400'
                    : isLightMode
                    ? 'hover:text-zinc-950 hover:bg-black/5'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA */}
            <Link
              to="/contact"
              className={`${ctaClass} px-5 py-2.5 rounded-full transition-all ml-1 border border-transparent font-black text-[10px]`}
            >
              Enquiry
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

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[59] bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-zinc-950 flex flex-col lg:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Header */}
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

        {/* Mobile Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col">
            {/* Dropdown groups — accordion */}
            {navGroups.map((group, i) => (
              <div key={group.label} className="border-b border-white/5">
                <button
                  className={`w-full flex items-center justify-between py-4 text-xl font-black italic tracking-tighter uppercase transition-colors ${
                    isGroupActive(group) ? 'text-yellow-400' : 'text-white'
                  }`}
                  onClick={() =>
                    setExpandedMobile(expandedMobile === group.label ? null : group.label)
                  }
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedMobile === group.label ? 'rotate-180 text-yellow-400' : 'text-zinc-500'
                    }`}
                  />
                </button>
                {/* Accordion children */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedMobile === group.label ? 'max-h-80' : 'max-h-0'
                  }`}
                >
                  <div className="pl-4 pb-3 space-y-1">
                    {group.children?.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-2.5 text-zinc-400 hover:text-yellow-400 transition-colors group/mc"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/mc:bg-yellow-400 transition-colors flex-shrink-0" />
                        <span className="text-xs font-black uppercase tracking-widest">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Single links */}
            {singleLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-4 border-b border-white/5 text-xl font-black italic tracking-tighter uppercase transition-colors group ${
                  location.pathname === link.to ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`}
                style={{ transitionDelay: `${(navGroups.length + i) * 30}ms` }}
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
            Enquiry Now
          </Link>
        </div>

        {/* Mobile Footer */}
        <div className="px-6 py-6 border-t border-white/5 flex-shrink-0">
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-2">Engineering Headquarters</p>
          <p className="text-white font-bold text-sm">Kochi, Kerala, India</p>
          <p className="text-zinc-400 text-sm">+91 97456 60055</p>
        </div>
      </div>
    </>
  );
};

export default Header;
