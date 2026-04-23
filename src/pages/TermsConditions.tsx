import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SEO from '../components/SEO';

const TermsConditions: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden min-h-screen">
      <SEO 
        title="Terms & Conditions | Spectrum Solar India"
        description="Read the Terms and Conditions for using Spectrum Solar's website and services. Information regarding installations, warranties, and partnerships."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-thin tracking-tight uppercase mb-4">Terms & Conditions</h1>
          <p className="text-zinc-500 font-light text-sm md:text-base">Last Updated: April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6 prose prose-zinc prose-a:text-yellow-600">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">1. Acceptance of Terms</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            By accessing and using the website (spectrumsolar.in) and services provided by Spectrum Solar, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">2. Services and Products</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            Spectrum Solar provides solar energy systems, power backup solutions, and related installation services across India. All products, specifications, and data are subject to change without notice to improve reliability, function, or design. Warranties provided on products (e.g., 25-year panel warranty) are subject to the original manufacturer's terms and conditions.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">3. Quotations and Pricing</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            All quotations provided via our website or personnel are estimates based on initial data. Final pricing is subject to a physical site audit. Prices are exclusive of applicable taxes unless stated otherwise. Spectrum Solar reserves the right to adjust pricing based on raw material costs and site-specific complexities prior to final contract signing.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">4. Partnership Programs (Franchise, Dealership, Freelance)</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            Applications for Franchise, Dealership, and Freelance partnerships submitted through this website are subject to review and approval by Spectrum Solar management. Submitting an inquiry does not guarantee approval. Approved partners must sign a separate legal agreement governing the specific terms, margins, and operational guidelines of the partnership.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">5. Intellectual Property</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Spectrum Solar and is protected by applicable intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">6. Limitation of Liability</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            Spectrum Solar shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website, or for the cost of procurement of substitute services.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">7. Governing Law</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Kerala, India.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">8. Contact Information</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            If you have any questions about these Terms & Conditions, please contact us at:<br/><br/>
            <strong>Spectrum Solar (HQ)</strong><br/>
            Spectrum Tower, Near KSEB, Kannur 670001<br/>
            Phone: +91 9400 323 111<br/>
            Email: legal@spectrumsolar.in
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
