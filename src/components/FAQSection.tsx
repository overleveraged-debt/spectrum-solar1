import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = [],
  title = "Frequently Asked Questions",
  subtitle,
  badge = "FAQ",
  theme = 'light',
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const isDark = theme === 'dark';

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section 
      className={`py-12 md:py-16 px-4 sm:px-6 border-t ${
        isDark 
          ? 'bg-zinc-950 text-white border-zinc-900' 
          : 'bg-zinc-50/60 text-black border-zinc-100'
      } ${className}`} 
      data-nav-light={!isDark}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-10 reveal">
          {badge && (
            <span className={`text-[10px] font-bold uppercase tracking-[0.35em] mb-2 block ${isDark ? 'text-yellow-400' : 'text-zinc-500'}`}>
              {badge}
            </span>
          )}
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-2 text-xs sm:text-sm font-light max-w-md mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDark
                    ? `bg-zinc-900/80 border ${isOpen ? 'border-yellow-400/50 bg-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'border-zinc-800/80 hover:border-zinc-700'}`
                    : `bg-white border ${isOpen ? 'border-yellow-400/60 shadow-sm' : 'border-zinc-200/80 hover:border-zinc-300'}`
                }`}
              >
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-5 py-4 md:px-6 md:py-4.5 text-left gap-4 cursor-pointer select-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-medium text-xs sm:text-sm tracking-tight pr-2 ${
                    isOpen 
                      ? isDark ? 'text-yellow-400 font-semibold' : 'text-yellow-600 font-semibold'
                      : isDark ? 'text-zinc-200' : 'text-zinc-800'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? 'bg-yellow-400 text-black shadow-sm' 
                      : isDark ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-zinc-900'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`px-5 pb-4 md:px-6 md:pb-5 text-xs sm:text-[13px] leading-relaxed ${
                    isDark ? 'text-zinc-400 border-t border-zinc-800/60' : 'text-zinc-600 border-t border-zinc-100'
                  }`}>
                    <p className="pt-3">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
