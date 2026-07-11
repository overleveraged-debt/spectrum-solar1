import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SEO from '../components/SEO';
import { sanityReadClient } from '../lib/sanityClient';
import { defaultPagesData } from '../data/pageDefaults';

const DEFAULT_PRIVACY_DATA = defaultPagesData['privacy-policy'];

const PrivacyPolicy: React.FC = () => {
  useScrollReveal();
  const [pageData, setPageData] = useState(DEFAULT_PRIVACY_DATA);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "privacy-policy"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            setPageData((prev: any) => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse privacy policy data", e);
          }
        }
      })
      .catch(err => console.error("Error fetching privacy policy data:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const sections = pageData.sections || [];

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden min-h-screen">
      <SEO 
        title={`${pageData.title || 'Privacy Policy'} | Spectrum Solar India`}
        description="Read the Privacy Policy of Spectrum Solar to understand how we collect, use, and protect your personal data and information across our nationwide services."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-zinc-50 border-b border-zinc-200" data-nav-light>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-thin tracking-tight uppercase mb-4">{pageData.title || 'Privacy Policy'}</h1>
          <p className="text-zinc-500 font-light text-sm md:text-base">{pageData.lastUpdated || 'Last Updated: April 2026'}</p>
        </div>
      </section>

      {/* Content */}
      <section className="pt-16 pb-20" data-nav-light>
        <div className="max-w-4xl mx-auto px-6 prose prose-zinc prose-a:text-yellow-600">
          {sections.map((sec: any, idx: number) => (
            <div key={idx} className="mb-10">
              <h2 className="text-2xl font-medium mb-4 uppercase tracking-tight">{sec.title}</h2>
              <p className="mb-6 text-zinc-650 font-light leading-relaxed whitespace-pre-line">
                {sec.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
