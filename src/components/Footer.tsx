import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-20 md:pt-32 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-20">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <img 
                src="/logo.png" 
                alt="Spectrum Powers" 
                className="h-10 w-auto" 
              />
            </div>
            <p className="text-zinc-600 text-sm max-w-xs mb-8 md:mb-0">Power Electronics & Solar System Integration Leader in India.</p>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8 text-zinc-500">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Solutions</h5>
              <ul className="space-y-4 text-xs font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Solar Systems</li>
                <li className="hover:text-white cursor-pointer transition-colors">UPS & Batteries</li>
                <li className="hover:text-white cursor-pointer transition-colors">Water Purifiers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security & CCTV</li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Network</h5>
              <ul className="space-y-4 text-xs font-medium">
                <li className="hover:text-white transition-colors">
                  <Link to="/opportunities/franchise">Franchise Model</Link>
                </li>
                <li className="hover:text-white transition-colors">
                  <Link to="/opportunities/dealership">Dealer Network</Link>
                </li>
                <li className="hover:text-white transition-colors">
                  <Link to="/careers">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Regional HQ</h5>
              <p className="text-xs leading-relaxed">Kerala, India<br />Operations since 2000<br />+91 94470 12345</p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-800 text-center md:text-left leading-relaxed">
          &copy; {new Date().getFullYear()} Spectrum Powers. <br className="md:hidden" /> Awarded State Best Solar Energy Industry.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
