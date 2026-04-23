import React from 'react';
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
  ShieldCheck
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 pb-20">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="Spectrum Solar" 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Spectrum Solar is a pioneer in solar energy integration and power electronics since 2000. With over 40,000+ satisfied customers nationwide, we are committed to India's green energy transition.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>MNRE Approved</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Solar Solutions</h5>
            <ul className="space-y-4">
              {[
                { label: 'On-Grid Solar', path: '/solar/on-grid' },
                { label: 'Hybrid Systems', path: '/solar/hybrid' },
                { label: 'Off-Grid Solar', path: '/solar/off-grid' },
                { label: 'Water Heaters', path: '/solar/water-heaters' },
                { label: 'Solar Calculator', path: '/calculator' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-zinc-500 hover:text-yellow-400 text-xs font-semibold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Backup Column */}
          <div className="lg:col-span-2">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Power Backup</h5>
            <ul className="space-y-4">
              {[
                { label: 'Lithium Inbuilt UPS', path: '/power/lithium-ups' },
                { label: 'Online UPS', path: '/power/online-ups' },
                { label: 'Home Inverters', path: '/power/inverters' },
                { label: 'Lithium Batteries', path: '/power/lithium-batteries' },
                { label: 'Tubular Batteries', path: '/power/tubular-batteries' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-zinc-500 hover:text-yellow-400 text-xs font-semibold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Partner With Us</h5>
            <ul className="space-y-4">
              {[
                { label: 'Franchise Model', path: '/opportunities/franchise' },
                { label: 'Dealer Network', path: '/opportunities/dealership' },
                { label: 'Freelance Partner', path: '/opportunities/freelance' },
                { label: 'Careers', path: '/careers' },
                { label: 'Our Projects', path: '/projects' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-zinc-500 hover:text-yellow-400 text-xs font-semibold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Get In Touch</h5>
            <ul className="space-y-6">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-zinc-600 tracking-wider leading-none">Corporate HQ</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">Kannur, Kerala, India</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-zinc-600 tracking-wider leading-none">Sales Support</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">+91 9400 323 111</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-zinc-600 tracking-wider leading-none">Email Us</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">info@spectrumsolar.in</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">
              &copy; {currentYear} Spectrum Solar. All Rights Reserved.
            </p>
            <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-800">
              Awarded Best Solar Energy Industry
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <Link to="/privacy-policy" className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-yellow-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

