import { allTestimonials } from '../testimonials';
import { opportunitiesDefaults } from './pages/opportunitiesDefaults';
import { franchiseDefaults } from './pages/franchiseDefaults';
import { dealershipDefaults } from './pages/dealershipDefaults';
import { freelanceDefaults } from './pages/freelanceDefaults';

export const companyDefaults = {
  opportunities: opportunitiesDefaults,
  franchise: franchiseDefaults,
  dealership: dealershipDefaults,
  freelance: freelanceDefaults,
  home: {
    metaTitle: "Spectrum Solar | India's Trusted Solar Energy & Power Backup Brand",
    metaDescription: "Empowering India with sustainable energy. 25+ years of excellence in solar installations, power backups, and nationwide franchise opportunities.",
    metaKeywords: "spectrum solar, solar energy kerala, on grid solar panels, power backup, lithium ups, solar water heaters, solar franchise india",
    heroTitle: "INTELLIGENT ENERGY SYSTEMS.",
    heroSubtitle: "Spectrum Solar & Power",
    heroVideoUrl: "/videos/hero-bg.mp4",
    heroVideoPoster: "/images/Banner01.webp",
    heroDesc: "Engineered for 25+ years of uncompromised performance. Slash your utility bills to zero with Tier-1 solar and lithium energy storage.",
    stat1Value: "25 Yrs", stat1Label: "Brand Excellence",
    stat2Value: "40K+", stat2Label: "Clean Installations",
    stat3Value: "₹0 Bill", stat3Label: "Target Grid Cost",
    stat4Value: "99.8%", stat4Label: "Uptime Reliability",
    solarTitle: "Solar Solutions",
    solarSubtitle: "Grid-Tied & Off-Grid Solar",
    powerTitle: "Power Backup Solutions",
    powerSubtitle: "Lithium & Tubular Energy Storage",
    whySpectrumStat1Value: "6,145+", whySpectrumStat1Label: "Installations",
    whySpectrumStat2Value: "25yr", whySpectrumStat2Label: "Track Record",
    whySpectrumStat3Value: "100%", whySpectrumStat3Label: "Service Rate",
    whyGoSolarBoxes: [
      { title: 'Zero Electricity Bills', desc: 'Net-metered solar plants can reduce your KSEB bill to ₹0. Pay for the system once, generate free power for 25 years.' },
      { title: 'Clean & Sustainable', desc: 'Every kW of solar installed avoids hundreds of kg of CO₂ per year. Power your home without harming the planet.' },
      { title: 'Fast ROI — 3 to 5 Years', desc: 'With government subsidies and KSEB net metering, most systems pay for themselves in under 5 years.' }
    ],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Clear answers to commonly asked questions about solar systems, power backup, and subsidies.",
    faqs: [
      {
        q: "How does net metering work with on-grid solar in India?",
        a: "With On-Grid Solar, any surplus electricity your solar panels produce during the daytime is exported to the state electrical grid (e.g. KSEB). Your bi-monthly bill reflects only the net units consumed, drastically reducing your electricity expenses to near zero."
      },
      {
        q: "What is the typical payback period (ROI) for a residential solar plant?",
        a: "Most residential rooftop solar systems achieve a full return on investment (ROI) within 3 to 5 years, while delivering clean, free electricity for 25+ years backed by Tier-1 performance warranties."
      },
      {
        q: "Are central and state government subsidies available?",
        a: "Yes! Government schemes like PM Surya Ghar Muft Bijli Yojana offer substantial direct subsidies for residential rooftop solar plants. Our team assists you with registration, approval paperwork, and subsidy disbursement."
      },
      {
        q: "What is the difference between On-Grid, Hybrid, and Off-Grid solar?",
        a: "On-Grid is directly synchronized with the electrical grid for maximum bill savings without batteries. Hybrid combines grid net metering with lithium battery backup for power cuts. Off-Grid operates completely independently with dedicated battery storage for remote locations."
      },
      {
        q: "What maintenance is required for solar panels and inverters?",
        a: "Solar panels require minimal upkeep — periodic cleaning with water every 2–4 weeks removes accumulated dust. Spectrum Solar provides annual preventive health audits and remote system monitoring to ensure optimal generation."
      }
    ]
  },
  about: {
    metaTitle: "About Spectrum Solar | India's Leading Solar Solutions Provider",
    metaDescription: "With 25+ years of excellence, 40K+ satisfied customers, and 6,145+ solar projects, Spectrum Solar is India's trusted name in renewable energy.",
    metaKeywords: "about spectrum solar, solar company kerala, renewable energy india, solar panel installation history, kochi solar company",
    showHero: true,
    heroTitle: '25 YEARS OF ENERGY EXCELLENCE',
    heroSubtitle: 'Our Story',
    heroImage: '/images/about-hero.webp',
    heroDesc: 'Since 2001, powering thousands of homes and businesses with customized sustainable energy solutions.',
    showStats: true,
    stat1Value: '25+', stat1Label: 'Years of Excellence', stat1Sub: 'Since 2000',
    stat2Value: '40K+', stat2Label: 'Satisfied Customers', stat2Sub: 'Across India',
    stat3Value: '6,145+', stat3Label: 'Solar Projects', stat3Sub: 'Installed & Running',
    stat4Value: '60+', stat4Label: 'Service Engineers', stat4Sub: 'Certified Experts',
    showHeritage: true,
    heritageSubtitle: 'Our Heritage',
    heritageTitle: 'Built from the ground up in India.',
    heritageDesc: "Founded in 2001, Spectrum Powers has been at the forefront of Kerala's energy revolution. We've grown from a local power electronics firm to a state-wide leader in sustainable energy — serving everything from humble households to 100KW industrial megaprojects.",
    heritageFounded: '2001',
    heritageHeadquarters: 'Kochi',
    heritageCenters: '18+',
    heritageImage: '/images/banner1090x907.jpg',
    showQuality: true,
    qualitySubtitle: 'Quality First',
    qualityTitle: "Only the world's best brands.",
    qualityDesc: "We use only top-tier international brands for our solar panels and backup systems, ensuring every installation meets the highest safety and performance standards. Kerala Government's Best Solar Energy Industry Award is a testament to our commitment.",
    qualityAwardTitle: 'Best Solar Energy Industry Award',
    qualityAwardDesc: 'Kerala Government State Award Recipient',
    qualityImage: '/images/Banner04.jpg',
    showCeoMessage: true,
    ceoSubtitle: 'Leadership',
    ceoTitle: 'Message from our CEO.',
    ceoName: 'C.V. Raveendran',
    ceoRole: 'Managing Director',
    ceoMessage: 'Our journey began with a simple belief: that every Indian home and enterprise deserves reliable, clean, and affordable electricity. Over two decades later, that vision drives every panel we install and every customer we serve.',
    presenceSubtitle: 'Coverage',
    presenceTitle: 'Serving across India.',
    presenceDesc: 'Headquartered in Kochi with 18+ regional centers and service engineers covering all major districts.',
    ctaTitle: 'Ready to switch to solar?',
    ctaDesc: 'Schedule a free energy audit with our senior engineers today.'
  },
  'solar-solutions': {
    metaTitle: "Solar Solutions | On-Grid, Hybrid & Off-Grid Solar Systems India",
    metaDescription: "Slash your bills. Explore our premium KSEB net-metered On-Grid systems, Hybrid backups, and off-grid solar equipment. Free site assessment.",
    metaKeywords: "solar solutions india, on grid solar panels, hybrid solar systems kerala, off grid solar power, solar water heaters",
    showHero: true,
    heroTitle: 'Solar Solutions',
    heroSubtitle: 'Solar Solutions Specialists',
    heroImage: '/images/home_solar_banner.webp',
    heroDesc: 'On-grid, hybrid, and off-grid solar systems built for maximum ROI.',
    showProducts: true,
    products: [
      {
        id: 'on-grid',
        number: '01',
        title: 'On-Grid Solar System',
        category: 'Grid-Tied',
        tagline: 'Net-metered. Reduced electricity bills.',
        description: 'Grid-connected solar systems that feed excess power back to the KSEB grid through net metering. The most cost-effective way to slash your bill to zero.',
        accentColor: '#facc15',
        features: ['Net-Metering with KSEB', 'Real-time ERP Monitoring', '25-Year Panel Warranty', 'Government Subsidy Eligible'],
        specs: [
          { label: 'Capacity Range', value: '3kW – 500kW+' },
          { label: 'Grid Feed', value: 'Net-Metered' },
          { label: 'Warranty', value: '25-Year Panel' },
          { label: 'ROI Period', value: '3 – 5 Years' }
        ],
        image: '/images/ongrid_hero_wide.webp'
      },
      {
        id: 'hybrid',
        number: '02',
        title: 'Hybrid Solar System',
        category: 'Grid + Battery',
        tagline: 'Solar power + backup. Day and night.',
        description: 'The best of both worlds — solar generation during the day with a lithium or VRLA battery bank for uninterrupted power during outages.',
        accentColor: '#facc15',
        features: ['Day + Night Power', 'Grid + Battery Hybrid', 'Instant Switchover (<10ms)', 'Smart Energy Management'],
        specs: [
          { label: 'Capacity Range', value: '2kW – 50kW' },
          { label: 'Backup', value: '2 – 12 Hours' },
          { label: 'Battery', value: 'Lithium / VRLA' },
          { label: 'Switch Time', value: '< 10ms' }
        ],
        image: '/images/hybrid_hero.webp'
      },
      {
        id: 'off-grid',
        number: '03',
        title: 'Lithium Off-Grid System',
        category: 'Off-Grid',
        tagline: 'Total energy independence.',
        description: 'Fully autonomous solar+lithium battery systems designed for locations without reliable grid access. Absolute power independence.',
        accentColor: '#facc15',
        features: ['Zero Grid Dependency', 'Lithium LFP Batteries', 'All-Weather Rated', '10-Year Battery Warranty'],
        specs: [
          { label: 'Capacity', value: '1kW – 25kW' },
          { label: 'Autonomy', value: 'Full Off-Grid' },
          { label: 'Battery Tech', value: 'LFP Lithium' },
          { label: 'Cycles', value: '4000+ Charge Cycles' }
        ],
        image: '/images/offgrid_hero.webp'
      },
      {
        id: 'water-heaters',
        number: '04',
        title: 'Solar Water Heaters',
        category: 'Thermal Solutions',
        tagline: 'Hot water. Zero electricity cost.',
        description: 'High-performance solar water heaters utilizing evacuated tube collectors (ETC) or flat plate collectors (FPC).',
        accentColor: '#facc15',
        features: ['Up to 80°C Water', 'ETC & FPC Options', 'Stainless Steel Tank', 'Electric Backup Included'],
        specs: [
          { label: 'Capacities', value: '100L – 500L+ (Resi) / 10,000L (Comm)' },
          { label: 'Collector', value: 'Three-Target ETC / Copper FPC' },
          { label: 'Tank Material', value: 'SS 304L Food Grade' },
          { label: 'Warranty', value: '5 – 10 Years' }
        ],
        image: '/images/solar_hero.webp'
      }
    ]
  },
  'power-backup': {
    metaTitle: "Power Backup Solutions | UPS, Inverters & Batteries India",
    metaDescription: "Never lose power again. Explore our advanced Lithium UPS, Home Inverters, and Tubular Batteries designed for Indian power conditions.",
    metaKeywords: "power backup india, home ups kerala, lithium inverter battery, online ups industrial, tubular battery",
    showHero: true,
    heroTitle: 'Power Backup Solutions',
    heroSubtitle: 'Power Backup Specialists',
    heroImage: '/images/home_backup_banner.webp',
    heroDesc: 'Pure sine wave inverters, lithium UPS systems, and tubular batteries for reliable uninterrupted power.',
    showProducts: true,
    products: [
      {
        id: 'lithium-ups',
        number: '01',
        title: 'Lithium Inbuilt UPS',
        category: 'Next-Gen Backup',
        tagline: 'Wall-mounted. 10-year life. Zero maintenance.',
        description: 'Sleek, wall-mountable home UPS with integrated LiFePO4 battery. Replaces bulky lead-acid setups with a clean, modern, zero-maintenance power station.',
        accentColor: '#facc15',
        features: ['Integrated LiFePO4 Battery', 'Wall Mountable Design', '2-Hour Ultra-Fast Charging', '10-Year Expected Life'],
        specs: [
          { label: 'Capacity Range', value: '1kVA – 5kVA' },
          { label: 'Battery Type', value: 'Inbuilt LiFePO4' },
          { label: 'Charge Time', value: '2 Hours (0–100%)' },
          { label: 'Warranty', value: '5 Years Comprehensive' }
        ],
        image: '/images/lithium_hero.webp'
      },
      {
        id: 'home-ups',
        number: '02',
        title: 'Home UPS System',
        category: 'Pure Sine Wave',
        tagline: 'Reliable. Quiet. Safe for all appliances.',
        description: 'Microcontroller-based pure sine wave UPS systems that protect your sensitive home electronics from voltage fluctuations and power cuts.',
        accentColor: '#facc15',
        features: ['Pure Sine Wave Output', 'Smart Battery Charging', 'Overload & Short Circuit Protection', 'Silent Operation'],
        specs: [
          { label: 'Capacity Range', value: '650VA – 3.5kVA' },
          { label: 'Waveform', value: 'Pure Sine Wave' },
          { label: 'Transfer Time', value: '< 15ms' },
          { label: 'Warranty', value: '2 Years' }
        ],
        image: '/images/home_ups_hero.webp'
      },
      {
        id: 'inverters',
        number: '03',
        title: 'Inverters',
        category: 'Power Conversion',
        tagline: 'High-efficiency energy conversion.',
        description: 'Heavy-duty power inverters built to run high-load appliances like air conditioners, pumps, and motors with maximum efficiency.',
        accentColor: '#facc15',
        features: ['High Surge Capability', 'Mains Voltage Regulation', 'Eco & UPS Modes', 'Wide Input Voltage Window'],
        specs: [
          { label: 'Capacity Range', value: '1.5kVA – 15kVA' },
          { label: 'Topology', value: 'Transformer Based' },
          { label: 'Efficiency', value: '> 88%' },
          { label: 'Warranty', value: '2 Years' }
        ],
        image: '/images/inverter_hero.webp'
      },
      {
        id: 'online-ups',
        number: '04',
        title: 'Online UPS',
        category: 'Critical Protection',
        tagline: 'Double-conversion. Zero millisecond delay.',
        description: 'True Online Double-Conversion UPS engineered for critical IT infrastructure, medical equipment, servers, and industrial automation.',
        accentColor: '#facc15',
        features: ['True Double Conversion', 'Zero Transfer Time (0ms)', 'DSP Controlled Technology', 'SNMP / Remote Monitoring'],
        specs: [
          { label: 'Capacity Range', value: '1kVA – 120kVA' },
          { label: 'Transfer Time', value: '0 ms (Instant)' },
          { label: 'Power Factor', value: '0.9 / 1.0' },
          { label: 'Warranty', value: '2 Years' }
        ],
        image: '/images/online_ups_hero.webp'
      },
      {
        id: 'lithium-batteries',
        number: '05',
        title: 'Lithium Batteries',
        category: 'LFP Storage',
        tagline: 'Fast charge. 4000+ cycle life.',
        description: 'Advanced Lithium Iron Phosphate (LiFePO4) battery packs with integrated Smart BMS. Charges 3x faster than lead-acid with zero maintenance.',
        accentColor: '#facc15',
        features: ['4000+ Cycle Life', 'Integrated Smart BMS', 'Ultra-Fast Charging', '95% Depth of Discharge'],
        specs: [
          { label: 'Capacities', value: '12.8V / 25.6V / 48V (50Ah – 200Ah)' },
          { label: 'Chemistry', value: 'LiFePO4' },
          { label: 'Cycle Life', value: '> 4000 Cycles @ 80% DOD' },
          { label: 'Warranty', value: '5 Years' }
        ],
        image: '/images/lithium_battery_hero.webp'
      },
      {
        id: 'tubular-batteries',
        number: '06',
        title: 'Tubular Batteries',
        category: 'Lead-Acid Storage',
        tagline: 'Proven technology. Unmatched value.',
        description: "India's most trusted battery technology for home UPS systems. Tall tubular plates give superior performance in high ambient temperatures.",
        accentColor: '#facc15',
        features: ['Tall Tubular Plates', 'Heat-Resistant Design', 'Low Water Topping', 'Deep Discharge Recovery'],
        specs: [
          { label: 'Capacity', value: '100Ah – 220Ah' },
          { label: 'Voltage', value: '12V' },
          { label: 'Warranty', value: '3 – 5 Years' },
          { label: 'Life', value: '4 – 6 Years' }
        ],
        image: '/images/tubular_battery_hero.webp'
      }
    ]
  },
  calculator: {
    metaTitle: "Solar ROI Calculator | Estimate Savings & Subsidy | Spectrum Solar",
    metaDescription: "Calculate your estimated solar system size, monthly electricity savings, government subsidy, and payback period in seconds with Spectrum Solar.",
    metaKeywords: "solar calculator india, solar roi calculator kerala, kseb solar savings calculator, solar rooftop subsidy estimation",
    heroTitle: "Solar Calculator",
    heroSubtitle: "Yield & ROI Analytics"
  },
  feedback: {
    metaTitle: "Customer Reviews & Testimonials | Spectrum Solar India",
    metaDescription: "Read verified customer reviews and ratings from 40,000+ happy homes and businesses powered by Spectrum Solar across India.",
    metaKeywords: "spectrum solar reviews, solar customer feedback kerala, verified solar testimonials india",
    heroTitle: "Trusted By Thousands",
    heroSubtitle: "Social Proof"
  },
  gallery: {
    metaTitle: "Solar Installation Gallery | Spectrum Solar Projects",
    metaDescription: "Explore our portfolio of residential, commercial, and industrial solar installations across India. See our engineering excellence in action.",
    metaKeywords: "solar installation photos, solar rooftop gallery kerala, commercial solar projects photos india",
    heroTitle: "Gallery",
    heroSubtitle: "Our Installations",
    galleryItems: [
      { id: 1, src: '/images/p01.jpg', category: 'residential', title: 'Premium Residential Solar', location: 'Kannur', capacity: '5kW On-Grid' },
      { id: 2, src: '/images/p02.jpg', category: 'commercial', title: 'Koyili Hospital', location: 'Kannur', capacity: '50kW Grid-Tied' },
      { id: 3, src: '/images/p03.jpg', category: 'residential', title: 'Home Hybrid System', location: 'Thrissur', capacity: '3kW Hybrid' },
      { id: 4, src: '/images/p04.jpg', category: 'industrial', title: 'DSC Centre', location: 'Kannur', capacity: '100kVA UPS' },
      { id: 5, src: '/images/p05.jpg', category: 'residential', title: 'Lithium Battery Storage', location: 'Palakkad', capacity: '20kWh Lithium' },
      { id: 6, src: '/images/p06.jpg', category: 'commercial', title: 'Ranni Taluk Hospital', location: 'Pathanamthitta', capacity: '30kW + UPS' },
      { id: 7, src: '/images/p07.jpg', category: 'industrial', title: 'LEO Lab Solution', location: 'Kozhikode', capacity: '200kW On-Grid' },
      { id: 8, src: '/images/banner1090x907.jpg', category: 'commercial', title: 'Sreenarayana Hospital', location: 'Ernakulam', capacity: '500kW On-Grid' },
      { id: 9, src: '/images/banner1090x908.jpg', category: 'industrial', title: 'Industrial Solar Plant', location: 'Kollam', capacity: '150kW Industrial' },
      { id: 10, src: '/images/banner1090x909.jpg', category: 'residential', title: 'Villa Solar + Storage', location: 'Munnar', capacity: '8kW + 20kWh' },
      { id: 11, src: '/images/banner1200x1000.jpg', category: 'commercial', title: 'Resort Solar Integration', location: 'Wayanad', capacity: '25kW + Battery' }
    ]
  },
  projects: {
    metaTitle: "Our Solar Portfolio | 6,145+ Installations Across India | Spectrum Solar",
    metaDescription: "Explore Spectrum Solar's extensive portfolio of residential, commercial, hospital, and government solar installations across India.",
    metaKeywords: "solar projects kerala, commercial solar installations, hospital solar plant india, residential rooftop solar portfolio",
    heroTitle: "4000+ SUCCESSFUL INSTALLATIONS",
    heroSubtitle: "From residential rooftops to massive industrial grids, delivering energy excellence across the state.",
    projects: [
      { name: "DSC Centre", location: "Kannur", capacity: "100 KW", type: "Commercial", image: "/images/p01.jpg" },
      { name: "Koyili Hospital", location: "Kannur", capacity: "50 KW", type: "Healthcare", image: "/images/p02.jpg" },
      { name: "Ranni Taluk Hospital", location: "Ranni", capacity: "50 KW", type: "Government", image: "/images/p03.jpg" },
      { name: "LEO Lab", location: "Kannur", capacity: "35 KW", type: "Commercial", image: "/images/p04.jpg" },
      { name: "Commercial Complex", location: "Thrissur", capacity: "25 KW", type: "Commercial", image: "/images/p05.jpg" },
      { name: "Residential Villa", location: "Kochi", capacity: "10 KW", type: "Residential", image: "/images/p06.jpg" }
    ]
  },
  blog: {
    metaTitle: "Solar & Clean Energy Blog | Spectrum Solar Knowledge Hub",
    metaDescription: "Expert solar guides, subsidy updates, battery technology comparisons, and technical insights from Spectrum Solar engineers.",
    metaKeywords: "solar energy blog india, kseb solar subsidy guide, lithium battery vs tubular, solar panel maintenance tips",
    heroTitle: "Energy Excellence Insights",
    heroSubtitle: "Insights & Updates"
  },
  careers: {
    metaTitle: "Careers at Spectrum Solar | Join the Green Energy Revolution in India",
    metaDescription: "Build your career with India's leading solar energy brand. We are hiring for Sales, Engineering, Operations, and more. Apply today!",
    metaKeywords: "solar jobs india, solar engineer jobs kerala, renewable energy careers, spectrum solar hiring",
    showHero: true,
    heroTitle: 'JOIN THE ENERGY REVOLUTION',
    heroSubtitle: 'Careers',
    heroImage: '/images/about-hero.webp',
    heroDesc: "Empower your career with India's most trusted solar solutions brand. We are looking for innovators, builders, and green champions.",
    showStats: true,
    stats: [
      { value: "25 Yrs", label: "Brand Legacy" },
      { value: "40K+", label: "Happy Customers" },
      { value: "18+", label: "Regional Centers" },
      { value: "60+", label: "Service Engineers" }
    ],
    whyTitle: 'Why Join Spectrum?',
    whyItems: [
      { title: 'Growth Opportunities', desc: 'Clear career progression paths and internal promotions. We invest in your professional development from day one.' },
      { title: 'Learning Environment', desc: 'Regular training sessions, industry workshops, and access to the latest solar technology keep you ahead of the curve.' },
      { title: 'Industry Exposure', desc: "Work on some of India's most exciting solar and energy storage projects — from residential rooftops to large commercial installations." },
      { title: 'Meaningful Work', desc: "Every project you work on contributes to a greener India. Build a career that you're proud of — one that makes a real difference." }
    ],
    positionsTitle: 'Open Positions.',
    openPositions: [
      { title: 'Sales Executive', type: 'Full Time', location: 'Pan India', desc: 'Drive customer acquisition for solar and power backup solutions across India. Strong communication skills required.' },
      { title: 'Site Engineer', type: 'Full Time', location: 'Pan India', desc: 'Design, install, and commission solar energy systems at residential and commercial sites. Electrical engineering background preferred.' },
      { title: 'Operations Executive', type: 'Full Time', location: 'Remote / HQ', desc: 'Manage day-to-day operations, coordinate with field teams, and handle project tracking and documentation.' },
      { title: 'Customer Support', type: 'Full Time', location: 'Remote / HQ', desc: 'Handle customer queries, coordinate service visits, and ensure post-installation satisfaction for our growing client base.' }
    ],
    faqsTitle: 'Frequently Asked Questions.',
    faqs: [
      { q: 'What roles are available?', a: 'We have openings in Sales, Engineering, Operations, and Customer Support. Check our open positions below or reach out through the HR enquiry form.' },
      { q: 'How do I apply?', a: 'Submit your details through our enquiry form and mention the role you are interested in. Our HR team will get back to you within 2–3 business days.' },
      { q: 'Do you hire freshers?', a: 'Absolutely. We welcome freshers across all departments and provide full onboarding and on-the-job training to help you grow quickly.' }
    ]
  },
  support: {
    metaTitle: "Support & FAQs | Spectrum Solar Customer Help Center",
    metaDescription: "Get help with your solar and power backup systems. Browse FAQs on net metering, subsidies, warranties, or contact our 24/7 service team.",
    metaKeywords: "solar customer support, solar subsidy faq kerala, net metering help, spectrum solar service contact",
    showHero: true,
    heroTitle: "How can we help you?",
    heroSubtitle: "Help Center",
    heroImage: "/images/calculator-hero.jpg",
    phone: "+91 9447 123 456",
    email: "support@spectrumsolar.com",
    hours: "9:00 AM - 6:00 PM (Mon-Sat)",
    faqsTitle: "Frequently Asked Questions.",
    ticketTitle: "Submit a Support Ticket",
    ticketDesc: "Register a service enquiry or warranty claim directly with our technical support team.",
    faqs: [
      {
        q: "What is Net Metering and how does it benefit me?",
        a: "Net Metering is a KSEB policy that allows your solar system to feed unused electricity back to the grid. Your meter runs backwards, earning you credits that offset your bill — often bringing it to zero or near zero."
      },
      {
        q: "How long does a solar installation take?",
        a: "A standard residential system (3–10kW) typically takes 1–3 working days for installation. Larger commercial or industrial projects may take 1–2 weeks depending on scope and approvals."
      },
      {
        q: "Do you provide after-sales service?",
        a: "Yes. We have 60+ dedicated service engineers across India, available 24/7 for support. All installations include a 1-year comprehensive AMC, with extended plans available."
      },
      {
        q: "How long is the warranty on solar panels?",
        a: "We provide up to 25 years linear performance warranty on solar panels. Our inverters carry 5-year warranty, and lithium batteries are covered for 5–10 years depending on the model."
      },
      {
        q: "What government subsidies are available for solar?",
        a: "The Central Government provides a 30% subsidy on residential on-grid systems up to 3kW (20% for 3–10kW). Additional benefits are available under the KSEB net-metering scheme. Our team handles all paperwork."
      }
    ]
  },
  contact: {
    metaTitle: "Contact Us & Regional Offices | Spectrum Solar India",
    metaDescription: "Connect with Spectrum Solar for solar site audits, technical inquiries, branch addresses, and customer support across India.",
    metaKeywords: "contact spectrum solar, solar company phone number kerala, kochi solar office, solar site audit booking",
    showHero: true,
    heroTitle: 'START YOUR SOLAR JOURNEY',
    heroSubtitle: 'Global Network',
    heroImage: '/images/contact-hero.jpg',
    heroDesc: 'Connect with our senior engineering team for project audits and technical consultations.',
    offices: [
      { city: 'Kannur (HQ)', address: 'Spectrum Tower, Near KSEB, Kannur 670001' },
      { city: 'Kochi', address: 'Solar Hub, Edappally, Kochi 682024' },
      { city: 'Calicut', address: 'Power Plaza, Mavoor Road, Calicut 673001' },
      { city: 'Trivandrum', address: 'Energy Centre, Vazhuthacaud, Trivandrum 695010' }
    ]
  },
  'map-locations': {
    pins: [
      { id: 1, lat: 11.8745, lng: 75.3704, title: 'Kannur Hub', desc: 'DSC Centre (100KW) & 1,200+ Installations', gmapsLink: 'https://maps.app.goo.gl/kannur' },
      { id: 2, lat: 9.9312, lng: 76.2673, title: 'Kochi HQ', desc: 'Central Operations & 2,500+ Residential Projects', gmapsLink: 'https://maps.app.goo.gl/kochi' },
      { id: 3, lat: 10.5276, lng: 76.2144, title: 'Thrissur Regional', desc: 'Commercial Complex (25KW) & Service Center', gmapsLink: 'https://maps.app.goo.gl/thrissur' },
      { id: 4, lat: 8.5241, lng: 76.9366, title: 'Trivandrum South', desc: 'Large-Scale Solar Farm (500KW)', gmapsLink: 'https://maps.app.goo.gl/trivandrum' },
      { id: 5, lat: 11.2588, lng: 75.7804, title: 'Calicut Center', desc: 'Healthcare Specialist Hub (Koyili Hospital)', gmapsLink: 'https://maps.app.goo.gl/calicut' },
      { id: 6, lat: 9.1894, lng: 76.7188, title: 'Pathanamthitta', desc: 'Ranni Taluk Hospital (50KW)', gmapsLink: 'https://maps.app.goo.gl/pathanamthitta' },
      { id: 7, lat: 10.7867, lng: 76.6547, title: 'Palakkad Center', desc: 'Renewable Power Hub', gmapsLink: 'https://maps.app.goo.gl/palakkad' },
      { id: 8, lat: 8.8932, lng: 76.6141, title: 'Kollam Hub', desc: 'Industrial Solar Plant (150KW)', gmapsLink: 'https://maps.app.goo.gl/kollam' }
    ]
  },
  testimonials: {
    testimonials: allTestimonials
  },
  footer: {
    brandPitch: "Spectrum Solar is a pioneer in solar energy integration and power electronics since 2002. With over 40,000+ satisfied customers nationwide, we are committed to India's green energy transition.",
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    isoCert: "ISO 9001:2015",
    mnreApproved: "MNRE Approved"
  }
};
