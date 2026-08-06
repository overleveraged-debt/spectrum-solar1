import { allTestimonials } from '../testimonials';

export const companyDefaults = {
  home: {
    heroTitle: "INTELLIGENT ENERGY SYSTEMS.",
    heroSubtitle: "Spectrum Solar & Power",
    heroVideoUrl: "/videos/home_hero_bg.mp4",
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
    whySpectrumStat3Value: "100%", whySpectrumStat3Label: "Service Rate"
  },
  'solar-solutions': {
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
        badge: 'Most Popular',
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
        features: ['ETC & FPC Options', 'Inner Tank Glass-Lined', 'All-Weather Performance', '5-Year Warranty'],
        specs: [
          { label: 'Capacities', value: '100L – 2000L' },
          { label: 'Outer Tank', value: 'SS / Powder Coated' },
          { label: 'Inner Tank', value: 'Glass Lined / SUS316' },
          { label: 'Heating Back', value: 'Auxiliary Element' }
        ],
        image: '/images/water_heater_hero.webp'
      }
    ]
  },
  'power-backup': {
    showHero: true,
    heroTitle: 'Power Backup Solutions',
    heroSubtitle: 'Energy Storage & Inverters',
    heroImage: '/images/power_backup_banner.jpg',
    heroDesc: 'Lithium UPS, home inverters, online UPS, and deep-cycle battery banks.',
    showProducts: true,
    products: [
      {
        id: 'lithium-ups',
        number: '01',
        title: 'Lithium Inbuilt UPS',
        category: 'Zero-Switch Technology',
        tagline: 'Instant zero-switch backup.',
        description: 'All-in-one wall-mountable lithium UPS systems. Instant zero-switch backup with 5x longer battery lifespan.',
        accentColor: '#facc15',
        badge: 'Next Gen',
        features: ['Instant Switchover (<10ms)', 'LifePO4 Safety Chemistry', '10-Year Maintenance-Free', 'Wall-Mountable Chassis'],
        specs: [
          { label: 'Capacity Range', value: '1kVA – 10kVA' },
          { label: 'Battery Type', value: 'Inbuilt LiFePO4' },
          { label: 'Switchover', value: '< 10ms' },
          { label: 'Warranty', value: '5-Year Complete' }
        ],
        image: '/images/lithium_hero.webp'
      },
      {
        id: 'home-ups',
        number: '02',
        title: 'Home UPS System',
        category: 'Residential Backup',
        tagline: 'Reliable power for every home.',
        description: 'Designed specifically for home appliances, IT equipment, and lighting loads during unexpected grid power cuts.',
        accentColor: '#facc15',
        features: ['Pure Sine Wave Output', 'Smart Battery Charging', 'Overload & Short Circuit Protection', 'Silent Operation'],
        specs: [
          { label: 'Capacity Range', value: '700VA – 5kVA' },
          { label: 'Battery Compatibility', value: 'Tubular / Flat / Lithium' },
          { label: 'Waveform', value: 'Pure Sine Wave' },
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
        badge: 'Mission Critical',
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
        badge: 'Zero Maintenance',
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
  calculators: {
    costPerKW: 65000,
    blendedTariff: 7.5
  },
  careers: {
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
