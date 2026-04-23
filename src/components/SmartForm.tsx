import React, { useState, useEffect } from 'react';
import { Send, User, Phone, Mail, MessageSquare, Building2, MapPin, Linkedin, Wallet, Zap, Briefcase } from 'lucide-react';

export type InquiryType = 'solar' | 'backup' | 'franchise' | 'dealership' | 'freelance' | 'careers' | 'general';

interface SmartFormProps {
  initialType?: InquiryType;
}

const SmartForm: React.FC<SmartFormProps> = ({ initialType = 'general' }) => {
  const [type, setType] = useState<InquiryType>(initialType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync state if prop changes (e.g. user navigates between different contact links)
  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="premium-cream-card rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl">
        <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Zap className="w-10 h-10 fill-current" />
        </div>
        <h3 className="text-3xl font-thin uppercase tracking-tight mb-4 text-black">Message Received!</h3>
        <p className="text-zinc-600 font-light mb-8 max-w-sm mx-auto">
          Our engineering team has been notified. Expect a callback or email within the next 24 hours.
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
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
              <User className="w-3 h-3" /> Full Name
            </label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black placeholder:text-zinc-300 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
              <Phone className="w-3 h-3" /> Phone Number
            </label>
            <input
              required
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black placeholder:text-zinc-300 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm"
            />
          </div>
        </div>

        {/* Row 2: Email & Inquiry Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black placeholder:text-zinc-300 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
              <MessageSquare className="w-3 h-3" /> Inquiry For
            </label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as InquiryType)}
              className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 focus:bg-white transition-all appearance-none cursor-pointer text-sm"
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
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
                <Building2 className="w-3 h-3" /> Property Type
              </label>
              <select className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Institutional</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
                <Zap className="w-3 h-3" /> Avg. Monthly Bill
              </label>
              <select className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm">
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
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
                <MapPin className="w-3 h-3" /> Target City/Location
              </label>
              <input
                required
                type="text"
                placeholder="City Name"
                className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
                <Wallet className="w-3 h-3" /> Investment Capacity
              </label>
              <select className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm">
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
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
                <Briefcase className="w-3 h-3" /> Position Interested
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Site Engineer"
                className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
                <Linkedin className="w-3 h-3" /> LinkedIn Profile Link
              </label>
              <input
                required
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-white border border-zinc-100/50 rounded-full px-7 py-4 text-black focus:outline-none focus:border-yellow-400 focus:bg-white transition-all text-sm"
              />
            </div>
          </div>
        )}

        {/* Message Area */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-5">
            <MessageSquare className="w-3 h-3" /> Additional Details
          </label>
          <textarea
            rows={4}
            placeholder={
              type === 'careers' ? "Tell us why you want to join the green energy revolution..." :
              type === 'solar' ? "Please describe your site (roof type, orientation, etc.)..." :
              "Any specific questions or requirements?"
            }
            className="w-full bg-white border border-zinc-100/50 rounded-[1.5rem] px-7 py-5 text-black placeholder:text-zinc-300 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all resize-none text-sm"
          />
        </div>

        {/* Submit Button */}
        <button 
          disabled={isSubmitting}
          className={`w-full font-black uppercase tracking-[0.2em] py-5 rounded-full transition-all flex items-center justify-center gap-4 shadow-xl group
            ${isSubmitting ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' : 'bg-black text-white hover:bg-yellow-400 hover:text-black active:scale-[0.98]'}
          `}
        >
          {isSubmitting ? 'Sending Inqury...' : 'Submit Request'}
          {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </button>

        <p className="text-[9px] text-center text-zinc-400 font-bold uppercase tracking-widest px-10">
          By submitting, you agree to our <a href="/privacy-policy" className="text-zinc-600 underline">Privacy Policy</a> and <a href="/terms-conditions" className="text-zinc-600 underline">Terms of Service</a>.
        </p>
      </form>
    </div>
  );
};

export default SmartForm;
