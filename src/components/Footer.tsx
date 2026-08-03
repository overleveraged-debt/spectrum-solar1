import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Award,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { CONTACT_INFO } from '../data/config';
import { usePageContent } from '../hooks/usePageContent';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(prev => prev === section ? null : section);
  };
  
  // Fetch footer configurations
  const { pageData: footerData } = usePageContent('footer');
  // Fetch support configurations to get the unified phone/email contact details
  const { pageData: supportData } = usePageContent('support');

  // Unified contact details
  const phoneVal = supportData.phone || CONTACT_INFO.phoneText;
  const emailVal = supportData.email || CONTACT_INFO.email;

  // Footer text and links
  const brandPitch = footerData.brandPitch || "Spectrum Solar is a pioneer in solar energy integration and power electronics since 2002. With over 40,000+ satisfied customers nationwide, we are committed to India's green energy transition.";
  const instagram = footerData.instagram || "#";
  const facebook = footerData.facebook || "#";
  const linkedin = footerData.linkedin || "#";
  const twitter = footerData.twitter || "#";
  const isoCert = footerData.isoCert || "ISO 9001:2015";
  const mnreApproved = footerData.mnreApproved || "MNRE Approved";

  return (
    <footer className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-16 pb-20">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="Spectrum Solar" 
                width="164"
                height="40"
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {brandPitch}
            </p>
            <div className="flex items-center gap-4">
              {instagram !== "" && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Spectrum Solar Instagram" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {facebook !== "" && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Spectrum Solar Facebook" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {linkedin !== "" && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Spectrum Solar LinkedIn" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {twitter !== "" && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Spectrum Solar Twitter" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-6 pt-4">
              {isoCert && (
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>{isoCert}</span>
                </div>
              )}
              {mnreApproved && (
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span>{mnreApproved}</span>
                </div>
              )}
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2 border-b md:border-b-0 border-white/5 pb-4 md:pb-0">
            <button 
              onClick={() => toggleSection('solar')}
              className="w-full flex items-center justify-between md:cursor-default text-left py-2 md:py-0"
              aria-label="Toggle Solar Solutions Navigation"
            >
              <h3 className="font-thin text-base tracking-widest text-white md:font-black md:text-[10px] md:tracking-[0.3em] md:mb-8">Solar Solutions</h3>
              <ChevronDown className={`w-4 h-4 text-zinc-400 md:hidden transition-transform duration-300 ${openSection === 'solar' ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 md:max-h-none ${openSection === 'solar' ? 'max-h-[300px] mt-4 md:mt-0' : 'max-h-0 md:max-h-none'}`}>
              <ul className="space-y-4">
                {[
                  { label: 'On-Grid Solar', path: '/solar/on-grid' },
                  { label: 'Hybrid Systems', path: '/solar/hybrid' },
                  { label: 'Off-Grid Solar', path: '/solar/off-grid' },
                  { label: 'Water Heaters', path: '/solar/water-heaters' },
                  { label: 'Solar Calculator', path: '/calculator' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-zinc-400 hover:text-yellow-400 text-sm font-light md:text-xs md:font-medium transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Backup Column */}
          <div className="lg:col-span-2 border-b md:border-b-0 border-white/5 pb-4 md:pb-0">
            <button 
              onClick={() => toggleSection('power')}
              className="w-full flex items-center justify-between md:cursor-default text-left py-2 md:py-0"
              aria-label="Toggle Power Backup Navigation"
            >
              <h3 className="font-thin text-base tracking-widest text-white md:font-black md:text-[10px] md:tracking-[0.3em] md:mb-8">Power Backup</h3>
              <ChevronDown className={`w-4 h-4 text-zinc-400 md:hidden transition-transform duration-300 ${openSection === 'power' ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 md:max-h-none ${openSection === 'power' ? 'max-h-[300px] mt-4 md:mt-0' : 'max-h-0 md:max-h-none'}`}>
              <ul className="space-y-4">
                {[
                  { label: 'Lithium Inbuilt UPS', path: '/power/lithium-ups' },
                  { label: 'Online UPS', path: '/power/online-ups' },
                  { label: 'Home Inverters', path: '/power/inverters' },
                  { label: 'Lithium Batteries', path: '/power/lithium-batteries' },
                  { label: 'Tubular Batteries', path: '/power/tubular-batteries' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-zinc-400 hover:text-yellow-400 text-sm font-light md:text-xs md:font-medium transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 border-b md:border-b-0 border-white/5 pb-4 md:pb-0">
            <button 
              onClick={() => toggleSection('partner')}
              className="w-full flex items-center justify-between md:cursor-default text-left py-2 md:py-0"
              aria-label="Toggle Partner With Us Navigation"
            >
              <h3 className="font-thin text-base tracking-widest text-white md:font-black md:text-[10px] md:tracking-[0.3em] md:mb-8">Partner With Us</h3>
              <ChevronDown className={`w-4 h-4 text-zinc-400 md:hidden transition-transform duration-300 ${openSection === 'partner' ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 md:max-h-none ${openSection === 'partner' ? 'max-h-[300px] mt-4 md:mt-0' : 'max-h-0 md:max-h-none'}`}>
              <ul className="space-y-4">
                {[
                  { label: 'Franchise Model', path: '/opportunities/franchise' },
                  { label: 'Dealer Network', path: '/opportunities/dealership' },
                  { label: 'Freelance Partner', path: '/opportunities/freelance' },
                  { label: 'Careers', path: '/careers' },
                  { label: 'Our Projects', path: '/projects' },
                  { label: 'Help & Support', path: '/support' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-zinc-400 hover:text-yellow-400 text-sm font-light md:text-xs md:font-medium transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <button 
              onClick={() => toggleSection('contact')}
              className="w-full flex items-center justify-between md:cursor-default text-left py-2 md:py-0"
              aria-label="Toggle Get In Touch Navigation"
            >
              <h3 className="font-thin text-base tracking-widest text-white md:font-black md:text-[10px] md:tracking-[0.3em] md:mb-8">Get In Touch</h3>
              <ChevronDown className={`w-4 h-4 text-zinc-400 md:hidden transition-transform duration-300 ${openSection === 'contact' ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 md:max-h-none ${openSection === 'contact' ? 'max-h-[300px] mt-4 md:mt-0' : 'max-h-0 md:max-h-none'}`}>
              <ul className="space-y-6">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-none">Headquarters</p>
                    <p className="text-zinc-400 text-xs leading-relaxed">Kochi</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-none">Sales Support</p>
                    <a href={`tel:${phoneVal.replace(/\s+/g, '')}`} className="text-zinc-400 hover:text-yellow-400 text-xs leading-relaxed transition-colors block">
                      {phoneVal}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-none">Email Us</p>
                    <a href={`mailto:${emailVal}`} className="text-zinc-400 hover:text-yellow-400 text-xs leading-relaxed transition-colors block">
                      {emailVal}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              &copy; {currentYear} Spectrum Solar. All Rights Reserved.
            </p>
            {isoCert && (
              <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Awarded Best Solar Energy Industry
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-8">
            <Link to="/privacy-policy" className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-yellow-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
