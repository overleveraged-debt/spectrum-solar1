import React, { useState, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Sun, Zap, Leaf, Thermometer, Battery, Server, BatteryCharging, Layers, Cpu, Waves, TrendingUp, Users, Briefcase, Image, BookOpen, FolderOpen } from 'lucide-react';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { Link, useLocation } from 'react-router-dom';

// ─── Nav structure with correct hash deep-links ───────────────────────────────

interface NavChild {
  label: string;
  to: string;
  sub?: string;
  icon?: React.ElementType;
  color?: string;
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
      { label: 'On-Grid Solar System',      to: '/solar#on-grid',       sub: 'Grid-Tied · Net Metering',   icon: Sun,          color: '#facc15' },
      { label: 'Hybrid Solar System',        to: '/solar#hybrid',        sub: 'Grid + Battery',             icon: Zap,          color: '#facc15' },
      { label: 'Lithium Off-Grid System',    to: '/solar#off-grid',      sub: 'Complete Independence',      icon: Leaf,         color: '#facc15' },
      { label: 'Solar Water Heaters',        to: '/solar#water-heaters', sub: 'Thermal Solutions',          icon: Thermometer,  color: '#facc15' },
    ],
  },
  {
    label: 'Power Backup',
    to: '/power',
    children: [
      { label: 'Lithium Inbuilt UPS',  to: '/power#lithium-ups',       sub: 'Zero-Switch Technology',   icon: Battery,        color: '#facc15' },
      { label: 'Home UPS System',      to: '/power#home-ups',          sub: 'Residential Backup',       icon: Zap,            color: '#facc15' },
      { label: 'Inverters',            to: '/power#inverters',         sub: 'Power Conversion',         icon: BatteryCharging,color: '#facc15' },
      { label: 'Online UPS',           to: '/power#online-ups',        sub: 'Critical Load Protection', icon: Server,         color: '#facc15' },
      { label: 'Lithium Batteries',    to: '/power#lithium-batteries', sub: 'LFP Energy Storage',       icon: Layers,         color: '#facc15' },
      { label: 'Tubular Batteries',    to: '/power#tubular-batteries', sub: 'Lead-Acid Value',          icon: Cpu,            color: '#facc15' },
    ],
  },
  {
    label: 'Calculator',
    to: '/calculator',
    children: [
      { label: 'Solar ROI Calculator',       to: '/calculator#solar',  icon: Sun,     color: '#facc15', sub: 'Savings & Payback' },
      { label: 'Power Backup Calculator',    to: '/calculator#power',  icon: Battery, color: '#facc15', sub: 'Battery & UPS Sizing' },
    ],
  },
  {
    label: 'Opportunities',
    to: '/opportunities',
    children: [
      { label: 'Franchise',         to: '/opportunities', icon: TrendingUp, color: '#facc15', sub: '12 Active Units' },
      { label: 'Dealership',        to: '/opportunities', icon: Briefcase,  color: '#facc15', sub: 'Regional Distribution' },
      { label: 'Referral Partner',  to: '/opportunities', icon: Users,      color: '#facc15', sub: 'Commission Based' },
      { label: 'Careers',           to: '/opportunities', icon: Waves,      color: '#facc15', sub: 'Join Our Team' },
    ],
  },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'About Us',      to: '/about',     icon: Users,       color: '#facc15', sub: '25 Years of Excellence' },
      { label: 'Testimonials',  to: '/feedback',  icon: BookOpen,    color: '#facc15', sub: '40,000+ Happy Customers' },
      { label: 'Gallery',       to: '/gallery',   icon: Image,       color: '#facc15', sub: 'Installation Portfolio' },
      { label: 'Projects',      to: '/projects',  icon: FolderOpen,  color: '#facc15', sub: 'Case Studies' },
    ],
  },
];

const singleLinks: NavGroup[] = [{ label: 'Blog', to: '/blog' }];

// ─── Component ────────────────────────────────────────────────────────────────

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
    if (group.children?.some((c) => location.pathname === c.to.split('#')[0])) return true;
    return false;
  };

  return (
    <>
      <nav id="navbar" className={`fixed w-full z-50 px-4 md:px-6 transition-all duration-500 ${navClass}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img src="/logo.png" alt="Spectrum Powers" className="h-7 md:h-9 w-auto transition-all duration-500 group-hover:scale-110" />
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-1 xl:gap-2 text-[10px] font-black uppercase tracking-[0.18em] ${textColor}`}>
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
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === group.label ? 'rotate-180' : ''}`} />
                </Link>

                {/* Dropdown Panel */}
                {group.children && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 origin-top ${
                      activeDropdown === group.label
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                    style={{ minWidth: '220px' }}
                    onMouseEnter={() => handleMouseEnter(group.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-2">
                      {group.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <Link
                            key={child.label}
                            to={child.to}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-yellow-400 hover:bg-white/5 transition-all duration-150 group/item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {Icon && (
                              <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover/item:scale-110"
                                style={{ backgroundColor: (child.color ?? '#facc15') + '18' }}
                              >
                                <Icon className="w-3 h-3" style={{ color: child.color ?? '#facc15' }} />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-widest leading-tight truncate">{child.label}</p>
                              {child.sub && (
                                <p className="text-[8px] font-bold uppercase tracking-widest truncate mt-0.5 opacity-50">{child.sub}</p>
                              )}
                            </div>
                            <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" style={{ color: child.color ?? '#facc15' }} />
                          </Link>
                        );
                      })}
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
            <Link to="/contact" className={`${ctaClass} px-5 py-2.5 rounded-full transition-all ml-1 border border-transparent font-black text-[10px]`}>
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
          className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ─── Premium Mobile Menu ─────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[60] w-full max-w-sm bg-zinc-950 flex flex-col lg:hidden transition-transform duration-300 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/8 flex-shrink-0 bg-zinc-900/60">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Spectrum Powers" className="h-7 w-auto" />
          </Link>
          <button
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label} className="border-b border-white/5">
              <button
                className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
                  isGroupActive(group) ? 'text-yellow-400' : 'text-white'
                }`}
                onClick={() => setExpandedMobile(expandedMobile === group.label ? null : group.label)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${isGroupActive(group) ? 'bg-yellow-400' : 'bg-zinc-700'}`} />
                  <span className="text-base font-black uppercase tracking-tight">{group.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedMobile === group.label ? 'rotate-180 text-yellow-400' : 'text-zinc-600'
                  }`}
                />
              </button>

              {/* Accordion children */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedMobile === group.label ? 'max-h-[600px]' : 'max-h-0'
                }`}
              >
                <div className="px-4 pb-3 space-y-0.5">
                  {group.children?.map((child) => {
                    const Icon = child.icon;
                    return (
                      <Link
                        key={child.label}
                        to={child.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-white/5 transition-all group/mi"
                      >
                        {Icon && (
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: (child.color ?? '#facc15') + '18' }}
                          >
                            <Icon className="w-4 h-4" style={{ color: child.color ?? '#facc15' }} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-black uppercase tracking-tight text-white group-hover/mi:text-yellow-400 transition-colors truncate">
                            {child.label}
                          </p>
                          {child.sub && (
                            <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5 truncate" style={{ color: child.color ?? '#facc15', opacity: 0.8 }}>
                              {child.sub}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 ml-auto flex-shrink-0 text-zinc-700 group-hover/mi:text-yellow-400 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Blog */}
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-6 py-4 border-b border-white/5 text-white hover:text-yellow-400 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-yellow-400 transition-colors" />
              <span className="text-base font-black uppercase tracking-tight">Blog</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors" />
          </Link>

          {/* CTAs */}
          <div className="px-6 pt-6 pb-4 space-y-3">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-yellow-400 text-black px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] text-center shadow-xl hover:bg-yellow-300 transition-all active:scale-[0.98]"
            >
              Get Free Enquiry
            </Link>
            <Link
              to="/calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] text-center hover:bg-white/10 transition-all active:scale-[0.98]"
            >
              Calculate Savings
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/5 flex-shrink-0 bg-zinc-900/40">
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-1">Engineering HQ</p>
          <p className="text-white font-bold text-sm">Kochi, Kerala, India</p>
          <p className="text-yellow-400 text-sm font-black mt-0.5">+91 97456 60055</p>
        </div>
      </div>
    </>
  );
};

export default Header;
