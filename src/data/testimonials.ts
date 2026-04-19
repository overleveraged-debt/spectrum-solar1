export interface Testimonial {
  name: string;
  initials: string;
  text: string;
  rating: number;
  date: string;
  product: string;
  category: 'Solar' | 'Backup' | 'Battery' | 'Other';
  isVerified: boolean;
}

export const allTestimonials: Testimonial[] = [
  { 
    name: 'Abdul Rahman', 
    initials: 'AR', 
    text: 'Spectrum Powers installed a 5KW Hybrid system at my home. The service team was extremely professional, and my electricity bill has literally dropped to zero.', 
    rating: 5, 
    date: '2 months ago', 
    product: '5KW Hybrid Solar', 
    category: 'Solar',
    isVerified: true
  },
  { 
    name: 'Dr. Somashekharan', 
    initials: 'DS', 
    text: 'Their 50KW installation has been performing flawlessly for over 3 years. One of the most reliable power partners we have worked with. Highly recommended.', 
    rating: 5, 
    date: '1 year ago', 
    product: '50KW Commercial', 
    category: 'Solar',
    isVerified: true
  },
  { 
    name: 'Suresh Babu', 
    initials: 'SB', 
    text: "Switched to their Lithium backup system recently. The transition is so smooth I don't even know when the power goes out. Exceptional quality.", 
    rating: 5, 
    date: '5 months ago', 
    product: 'Lithium UPS', 
    category: 'Backup',
    isVerified: true
  },
  { 
    name: 'Priya Menon', 
    initials: 'PM', 
    text: 'Our factory runs on Spectrum\'s 200kW solar plant now. ROI happened faster than they estimated. Their after-sales team is always available.', 
    rating: 5, 
    date: '8 months ago', 
    product: '200kW On-Grid', 
    category: 'Solar',
    isVerified: true
  },
  { 
    name: 'Rajesh Kumar', 
    initials: 'RK', 
    text: 'Home UPS from Spectrum has been rock solid for 2 years. Pure sine wave output — my computers and inverter AC run perfectly. Worth every rupee.', 
    rating: 5, 
    date: '10 months ago', 
    product: 'Home UPS', 
    category: 'Backup',
    isVerified: true
  },
  { 
    name: 'Aisha Fathima', 
    initials: 'AF', 
    text: 'Solar water heater installed 3 years back. Zero issues. Saves us about ₹1,500 per month in electricity. Excellent post-sale service too.', 
    rating: 5, 
    date: '3 months ago', 
    product: 'Solar Water Heater', 
    category: 'Solar',
    isVerified: true
  },
  { 
    name: 'Thomas Varghese', 
    initials: 'TV', 
    text: 'They handled everything from KSEB paperwork to commissioning. Hybrid 10KW system now covers our entire household. Professional and trustworthy.', 
    rating: 5, 
    date: '6 months ago', 
    product: '10kW Hybrid', 
    category: 'Solar',
    isVerified: true
  },
  { 
    name: 'Mohammed Ashraf', 
    initials: 'MA', 
    text: 'Installed Online UPS for our server room. True online double conversion — absolutely no interruption. Our IT infrastructure has been flawless since.', 
    rating: 5, 
    date: '4 months ago', 
    product: '20kVA Online UPS', 
    category: 'Backup',
    isVerified: true
  },
  { 
    name: 'Anitha Krishnan', 
    initials: 'AK', 
    text: 'Best solar company without a doubt. Honest advice, premium products, and a team that genuinely cares about long-term performance.', 
    rating: 5, 
    date: '7 months ago', 
    product: '6kW On-Grid', 
    category: 'Solar',
    isVerified: true
  },
  { 
    name: 'Vinod Nair', 
    initials: 'VN', 
    text: 'Lithium battery bank they installed has transformed our power situation. 8 hours of backup on a fully charged system. Incredible technology.', 
    rating: 5, 
    date: '1 month ago', 
    product: '20kWh Lithium', 
    category: 'Battery',
    isVerified: true
  },
  { 
    name: 'Santha Lakshmi', 
    initials: 'SL', 
    text: 'The team was punctual, professional, and cleaned up after the installation. The system has been working perfectly for 18 months without a single issue.', 
    rating: 5, 
    date: '9 months ago', 
    product: '4kW Hybrid', 
    category: 'Solar',
    isVerified: true
  },
  { 
    name: 'George Philip', 
    initials: 'GP', 
    text: 'Franchise partner for 2 years now. Great backend support, quality products, and the brand name opens doors. Highly profitable partnership.', 
    rating: 5, 
    date: '2 years ago', 
    product: 'Franchise Partner', 
    category: 'Other',
    isVerified: true
  },
];
