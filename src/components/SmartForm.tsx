import React, { useState, useEffect } from 'react';
import { Send, User, Phone, Mail, MessageSquare, Building2, MapPin, Linkedin, Wallet, Zap, Briefcase } from 'lucide-react';

export type InquiryType = 'solar' | 'backup' | 'franchise' | 'dealership' | 'freelance' | 'careers' | 'general';

interface SmartFormProps {
  initialType?: InquiryType;
}

import { sanityClient } from '../lib/sanityClient';

const SmartForm: React.FC<SmartFormProps> = ({ initialType = 'general' }) => {
  const [type, setType] = useState<InquiryType>(initialType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ email: '', phone: '' });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    details: '',
    propertyType: 'Residential',
    monthlyBill: 'Below ₹2,000',
    targetLocation: '',
    investmentCapacity: '₹5L - ₹10L',
    position: '',
    linkedinUrl: ''
  });

  // Sync state if prop changes (e.g. user navigates between different contact links)
  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (name === 'email' || name === 'phone') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email.trim());

    // Validate Indian phone number (10 digits, optional +91 or 0 prefix, starts with 6-9)
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    const isPhoneValid = phoneRegex.test(formData.phone.replace(/[\s-+]+/g, ''));

    let newErrors = { email: '', phone: '' };
    if (!isEmailValid) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }
    if (!isPhoneValid) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!isEmailValid || !isPhoneValid) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({ email: '', phone: '' });

    try {
      const timestamp = new Date().toISOString();

      if (type === 'careers') {
        // Save as jobApplication
        await sanityClient.create({
          _type: 'jobApplication',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          position: formData.position || 'Not Specified',
          coverLetter: formData.details,
          resumeUrl: formData.linkedinUrl, // LinkedIn profile acts as resume link
          createdAt: timestamp
        });

        // Trigger pre-filled email alert
        const subject = encodeURIComponent(`New Job Application: ${formData.name} - ${formData.position}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPosition: ${formData.position}\nLinkedIn: ${formData.linkedinUrl}\n\nCover Letter / Details:\n${formData.details}`
        );
        window.location.href = `mailto:support@spectrumsolar.com?subject=${subject}&body=${body}`;
      } else {
        // Build description with any extra properties
        let extraInfo = '';
        if (type === 'solar' || type === 'backup') {
          extraInfo = `\nProperty Type: ${formData.propertyType}\nAvg Monthly Bill: ${formData.monthlyBill}`;
        } else if (type === 'franchise' || type === 'dealership') {
          extraInfo = `\nTarget Location: ${formData.targetLocation}\nInvestment Capacity: ${formData.investmentCapacity}`;
        }

        // Save as enquiry
        await sanityClient.create({
          _type: 'enquiry',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: type,
          description: `${formData.details}${extraInfo}`,
          createdAt: timestamp
        });

        // Trigger pre-filled email alert
        const subject = encodeURIComponent(`New Website Enquiry: ${formData.name} (${type.toUpperCase()})`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInquiry For: ${type}${extraInfo}\n\nAdditional Details:\n${formData.details}`
        );
        window.location.href = `mailto:support@spectrumsolar.com?subject=${subject}&body=${body}`;
      }

      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form data
      setFormData({
        name: '',
        phone: '',
        email: '',
        details: '',
        propertyType: 'Residential',
        monthlyBill: 'Below ₹2,000',
        targetLocation: '',
        investmentCapacity: '₹5L - ₹10L',
        position: '',
        linkedinUrl: ''
      });
    } catch (error) {
      console.error("Failed to submit form to Sanity:", error);
      setIsSubmitting(false);
      alert("Submission failed. Please check your network or try again.");
    }
  };

  if (submitted) {
    return (
      <div className="premium-cream-card rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl">
        <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Zap className="w-10 h-10 fill-current" />
        </div>
        <h3 className="text-3xl font-thin uppercase tracking-tight mb-4 text-black">Message Saved!</h3>
        <p className="text-zinc-600 font-light mb-8 max-w-sm mx-auto">
          Your inquiry has been stored in the dashboard and pre-filled in your mail client. Expect our callback within 24 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-yellow-600 font-black uppercase text-[10px] tracking-widest hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="premium-cream-card rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-zinc-200/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
              <User className="w-3 h-3 text-zinc-400" /> Full Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-450 focus:bg-white transition-all text-sm shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
              <Phone className="w-3 h-3 text-zinc-400" /> Phone Number
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={`w-full bg-white border rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:bg-white transition-all text-sm shadow-sm
                ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 focus:border-yellow-450'}
              `}
            />
            {errors.phone && (
              <span className="text-[10px] text-red-500 font-bold ml-5 block animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Email & Inquiry Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
              <Mail className="w-3 h-3 text-zinc-400" /> Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full bg-white border rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:bg-white transition-all text-sm shadow-sm
                ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 focus:border-yellow-450'}
              `}
            />
            {errors.email && (
              <span className="text-[10px] text-red-500 font-bold ml-5 block animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.email}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
              <MessageSquare className="w-3 h-3 text-zinc-400" /> Inquiry For
            </label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as InquiryType)}
              className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-450 focus:bg-white transition-all appearance-none cursor-pointer text-sm shadow-sm"
            >
              <option value="general">General Inquiry</option>
              <option value="solar">Solar Installation</option>
              <option value="backup">Power Backup / UPS</option>
              <option value="franchise">Franchise Inquiry</option>
              <option value="dealership">Dealership Inquiry</option>
              <option value="freelance">Freelance Partner</option>
              <option value="careers">Job Application</option>
            </select>
          </div>
        </div>

        {/* Dynamic Fields: Solar / Backup */}
        {(type === 'solar' || type === 'backup') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
                <Building2 className="w-3 h-3 text-zinc-400" /> Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-450 focus:bg-white transition-all text-sm shadow-sm"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Institutional</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
                <Zap className="w-3 h-3 text-zinc-400" /> Avg. Monthly Bill
              </label>
              <select
                name="monthlyBill"
                value={formData.monthlyBill}
                onChange={handleChange}
                className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-450 focus:bg-white transition-all text-sm shadow-sm"
              >
                <option>Below ₹2,000</option>
                <option>₹2,000 - ₹5,000</option>
                <option>₹5,000 - ₹10,000</option>
                <option>Above ₹10,000</option>
              </select>
            </div>
          </div>
        )}

        {/* Dynamic Fields: Franchise / Dealership */}
        {(type === 'franchise' || type === 'dealership') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
                <MapPin className="w-3 h-3 text-zinc-400" /> Target City/Location
              </label>
              <input
                required
                type="text"
                name="targetLocation"
                value={formData.targetLocation}
                onChange={handleChange}
                placeholder="City Name"
                className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-450 focus:bg-white transition-all text-sm shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
                <Wallet className="w-3 h-3 text-zinc-400" /> Investment Capacity
              </label>
              <select
                name="investmentCapacity"
                value={formData.investmentCapacity}
                onChange={handleChange}
                className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-450 focus:bg-white transition-all text-sm shadow-sm"
              >
                <option>₹5L - ₹10L</option>
                <option>₹10L - ₹25L</option>
                <option>Above ₹25L</option>
              </select>
            </div>
          </div>
        )}

        {/* Dynamic Fields: Careers */}
        {type === 'careers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
                <Briefcase className="w-3 h-3 text-zinc-400" /> Position Interested
              </label>
              <input
                required
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Site Engineer"
                className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-450 focus:bg-white transition-all text-sm shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
                <Linkedin className="w-3 h-3 text-zinc-400" /> LinkedIn Profile Link
              </label>
              <input
                required
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-white border border-zinc-200 rounded-full px-7 py-4 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-450 focus:bg-white transition-all text-sm shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Message Area */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-5">
            <MessageSquare className="w-3 h-3 text-zinc-400" /> Additional Details
          </label>
          <textarea
            rows={4}
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder={
              type === 'careers' ? "Tell us why you want to join the green energy revolution..." :
              type === 'solar' ? "Please describe your site (roof type, orientation, etc.)..." :
              "Any specific questions or requirements?"
            }
            className="w-full bg-white border border-zinc-200 rounded-[1.5rem] px-7 py-5 text-black placeholder:text-zinc-400 focus:outline-none focus:border-yellow-450 focus:bg-white transition-all resize-none text-sm shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <button 
          disabled={isSubmitting}
          className={`w-full font-black uppercase tracking-[0.2em] py-5 rounded-full transition-all flex items-center justify-center gap-4 shadow-xl group
            ${isSubmitting ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' : 'bg-black text-white hover:bg-yellow-400 hover:text-black active:scale-[0.98]'}
          `}
        >
          {isSubmitting ? 'Sending Inquiry...' : 'Submit Request'}
          {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </button>

        <p className="text-[9px] text-center text-zinc-500 font-medium uppercase tracking-widest px-10">
          By submitting, you agree to our <a href="/privacy-policy" className="text-zinc-600 underline hover:text-yellow-600 transition-colors">Privacy Policy</a> and <a href="/terms-conditions" className="text-zinc-600 underline hover:text-yellow-600 transition-colors">Terms of Service</a>.
        </p>
      </form>
    </div>
  );
};

export default SmartForm;
