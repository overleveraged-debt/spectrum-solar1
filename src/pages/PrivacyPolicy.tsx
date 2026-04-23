import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-white text-black pb-20 overflow-x-hidden min-h-screen">
      <SEO 
        title="Privacy Policy | Spectrum Solar India"
        description="Read the Privacy Policy of Spectrum Solar to understand how we collect, use, and protect your personal data and information across our nationwide services."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-thin tracking-tight uppercase mb-4">Privacy Policy</h1>
          <p className="text-zinc-500 font-light text-sm md:text-base">Last Updated: April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6 prose prose-zinc prose-a:text-yellow-600">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">1. Introduction</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            Spectrum Solar ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, submit inquiries, or use our nationwide services across India.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">2. Information We Collect</h2>
          <p className="mb-4 text-zinc-600 font-light leading-relaxed">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-6 text-zinc-600 font-light leading-relaxed space-y-2">
            <li><strong>Personal Data:</strong> Name, email address, phone number, and physical address when you fill out contact forms, dealership inquiries, or freelance applications.</li>
            <li><strong>Usage Data:</strong> Information about your interaction with our website, such as IP addresses, browser types, and pages visited, collected via cookies and analytics tools.</li>
            <li><strong>Technical Data:</strong> Information required to provide solar audits and assessments, including property details and energy consumption patterns provided by you.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">3. How We Use Your Information</h2>
          <p className="mb-4 text-zinc-600 font-light leading-relaxed">Your data is used to:</p>
          <ul className="list-disc pl-6 mb-6 text-zinc-600 font-light leading-relaxed space-y-2">
            <li>Respond to your inquiries, schedule site audits, and provide quotations.</li>
            <li>Process franchise, dealership, and freelance partnership applications.</li>
            <li>Improve our website performance, marketing strategies, and customer service.</li>
            <li>Send necessary administrative updates or promotional offers (which you can opt out of at any time).</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">4. Data Sharing and Disclosure</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates. We may disclose your data if required by law or to protect our legal rights.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">5. Data Security</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our site.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">6. Third-Party Websites</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            You may find advertising or other content on our site that links to the sites and services of our partners or suppliers. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">7. Your Rights</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            You have the right to request access to, correction of, or deletion of your personal data. If you wish to exercise any of these rights, please contact us using the details below.
          </p>

          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight mt-10">8. Contact Us</h2>
          <p className="mb-6 text-zinc-600 font-light leading-relaxed">
            If you have any questions about this Privacy Policy or our data practices, please contact us at: <br/><br/>
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

export default PrivacyPolicy;
