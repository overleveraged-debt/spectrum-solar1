import { allTestimonials } from './testimonials';

export const defaultPagesData: Record<string, any> = {
  home: {
    showHero: true,
    heroTitle: 'Precision Since 2002.',
    heroVideoPoster: '/images/Banner01.jpg',
    heroVideoUrl: '/videos/hero-bg.mp4',
    showStatsBar: true,
    stat1Value: '25+',
    stat1Label: 'Years Industry Lead',
    stat2Value: '20',
    stat2Label: 'Regional Outlets',
    stat3Value: '12',
    stat3Label: 'Franchise Units',
    stat4Value: 'ERP',
    stat4Label: 'Enabled since 2005',
    showSolarSection: true,
    solarSectionSubtitle: 'Solar Solutions',
    solarSectionTitle: 'Solar Systems.',
    solarSectionImage: '/images/home_solar_banner.jpg',
    solarBox1Title: 'On-Grid Solar',
    solarBox1Sub: 'Grid-Tied',
    solarBox1Desc: 'Zero electricity bills with net metering. Fastest ROI. Best for homes & offices.',
    solarBox2Title: 'Hybrid Solar',
    solarBox2Sub: 'Grid + Battery',
    solarBox2Desc: 'Day & night power. Solar generation + lithium backup for seamless reliability.',
    solarBox3Title: 'Lithium Off-Grid',
    solarBox3Sub: 'Off-Grid',
    solarBox3Desc: 'Complete energy independence. For remote sites, islands & hospitals.',
    solarBox4Title: 'Solar Water Heaters',
    solarBox4Sub: 'Thermal Savings',
    solarBox4Desc: 'High-efficiency vacuum tube systems. 100L to 2000L for any scale.',
    showBackupSection: true,
    backupSectionSubtitle: 'Power Backup',
    backupSectionTitle: 'Backup Systems.',
    backupSectionImage: '/images/home_backup_banner.jpeg',
    backupBox1Title: 'Lithium UPS',
    backupBox1Sub: 'Pure Sine Wave',
    backupBox2Title: 'Home UPS',
    backupBox2Sub: 'Zero Interruption',
    backupBox3Title: 'Inverters',
    backupBox3Sub: 'All Capacities',
    backupBox4Title: 'Online UPS',
    backupBox4Sub: 'IT & Server',
    backupBox5Title: 'Lithium Batteries',
    backupBox5Sub: '4000+ Cycles',
    backupBox6Title: 'Tubular Batteries',
    backupBox6Sub: 'Lead-Acid Value',
    showWhySpectrum: true,
    whySpectrumSubtitle: 'Why Spectrum',
    whySpectrumTitle: "India's Most Trusted Solar Partner.",
    whySpectrumDesc: '25 years. 6,145+ Solar Installations. Government-awarded excellence. Engineered for India\'s diverse climate.',
    whySpectrumBgImage: '/images/nature-kerala.jpg',
    showWhyGoSolar: true,
    whyGoSolarSubtitle: 'The Solar Advantage',
    whyGoSolarTitle: 'Why Go Solar?',
    whyGoSolarImage: '/images/home_why_solar.jpg',
    showHeritage: true,
    heritageSubtitle: 'Our Heritage',
    heritageTitle: 'Spectrum Powers India.',
    heritageImage: '/images/home_heritage_banner.jpg',
    heritageDesc: 'Specializing in power electronics and solar system integration, we prioritize a customer-centric approach that drives our high referral rates.',
    heritageAccreditationTitle: 'Best Solar Energy Industry Award',
    heritageAccreditationDesc: 'National Solar Excellence Award Recipient',
    showTestimonials: true,
    testimonials: allTestimonials,
    showContactCTA: true,
    contactSubtitle: 'Since 2002',
    contactTitle: '25 Years of Reliability.',
    contactDesc: '4.9 Overall Rating from 10,000+ Verified Reviews.',
    contactBgImage: '/images/banner1090x909.jpg',
  },
  about: {
    showHero: true,
    heroTitle: '25 YEARS OF ENERGY EXCELLENCE',
    heroSubtitle: 'Our Story',
    heroImage: '/images/about-hero.webp',
    heroDesc: 'Since 2001, powering thousands of homes and businesses with customized sustainable energy solutions.',
    showStats: true,
    stat1Value: '25+',
    stat1Label: 'Years of Excellence',
    stat1Sub: 'Since 2000',
    stat2Value: '40K+',
    stat2Label: 'Satisfied Customers',
    stat2Sub: 'Across India',
    stat3Value: '6,145+',
    stat3Label: 'Solar Projects',
    stat3Sub: 'Installed & Running',
    stat4Value: '60+',
    stat4Label: 'Service Engineers',
    stat4Sub: 'Certified Experts',
    showHeritage: true,
    heritageSubtitle: 'Our Heritage',
    heritageTitle: 'Built from the ground up in India.',
    heritageDesc: "Founded in 2001, Spectrum Powers has been at the forefront of Kerala's energy revolution.",
    heritageFounded: '2001',
    heritageHeadquarters: 'Kochi',
    heritageCenters: '18+',
    heritageImage: '/images/banner1090x907.jpg',
    showQuality: true,
    qualitySubtitle: 'Quality First',
    qualityTitle: "Only the world's best brands.",
    qualityDesc: "We use only top-tier international brands...",
    qualityAwardTitle: 'Best Solar Energy Industry Award',
    qualityAwardDesc: 'Kerala Government State Award Recipient',
    qualityImage: '/images/Banner04.jpg',
    showPresence: true,
    presenceSubtitle: 'Regional Presence',
    presenceTitle: 'Powering Every District.',
    presenceDesc: 'Explore our extensive network...',
    showCTA: true,
    ctaTitle: '18+ Centers Across India.',
    ctaDesc: "From Kannur to Thiruvananthapuram — our network ensures you're never far from expert power support."
  },
  'power-backup': {
    showHero: true,
    heroTitle: 'Power Backup Solutions',
    heroSubtitle: 'Power Backup Specialists',
    heroImage: '/images/banner1090x908.jpg',
    heroDesc: "UPS, inverters, and batteries — built for India's power conditions.",
    showProducts: true,
    products: []
  },
  'solar-solutions': {
    showHero: true,
    heroTitle: 'Solar Solutions',
    heroSubtitle: 'Solar Solutions Specialists',
    heroImage: '/images/home_solar_banner.jpg',
    heroDesc: 'On-grid, hybrid, and off-grid solar systems built for maximum ROI.',
    showProducts: true,
    products: []
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
  // Default product details data
  'on-grid': {
    advancedFeatures: [
          "Mono PERC Solar Panels",
          "String / Micro Inverters",
          "Net Metering Compatible",
          "Lightning Protection",
          "Surge Protection",
          "AC/DC Wiring with Grounding",
          "Remote Monitoring",
          "App-Based Dashboard",
          "Govt Subsidy Ready",
          "KSEB Approved"
    ],
    benefits: [
          {
                "icon": "Zap",
                "title": "90% Bill Reduction",
                "desc": "Drastically reduce or completely eliminate your monthly grid electricity bills."
          },
          {
                "icon": "Sun",
                "title": "Highest Solar Yield",
                "desc": "Direct conversion to AC power without battery storage losses ensures maximum efficiency."
          },
          {
                "icon": "ShieldCheck",
                "title": "25-Year Performance",
                "desc": "Tier-1 solar panels backed by a 25-year linear performance warranty."
          },
          {
                "icon": "Clock",
                "title": "Fastest ROI Payback",
                "desc": "Recover your initial system investment in just 3 to 4 years through energy savings."
          },
          {
                "icon": "Layers",
                "title": "Low Maintenance",
                "desc": "No batteries means zero battery replacement costs and minimal system maintenance."
          },
          {
                "icon": "Leaf",
                "title": "Clean & Green Energy",
                "desc": "Reduce carbon emissions and contribute to a cleaner environment daily."
          }
    ],
    showHero: true,
    heroSubtitle: 'Grid-Tied Solutions',
    heroTitle: 'On-Grid Solar System',
    heroImage: '/images/sol_on_grid.jpg',
    heroDesc: 'Zero electricity bills with KSEB net metering. High returns. Fast payback.',
    stat1Value: '25 Yrs', stat1Label: 'Panel Warranty',
    stat2Value: '3-5 Yrs', stat2Label: 'ROI Period',
    stat3Value: '0 Bill', stat3Label: 'Electricity Bill',
    stat4Value: 'Subsidy', stat4Label: 'Eligible',
    description: 'Grid-connected solar systems that feed excess power back to the grid. The most popular choice for homes and commercial complexes.',
    features: ['Net Metering Compliant', 'No Battery Replacement Costs', 'Remote ERP Web Monitoring'],
    specs: [{ label: 'Capacity', value: '3kW - 100kW+' }, { label: 'Inverter', value: 'On-Grid String Inverter' }],
    faqs: [{ q: 'How does Net Metering work?', a: 'Excess power is exported to KSEB. You only pay for net consumption.' }]
  },
  'hybrid': {
    showHero: true,
    showHowItWorks: true,
    heroSubtitle: 'Grid + Battery',
    heroTitle: 'Hybrid Solar System',
    heroImage: '/images/sol_hybrid.jpg',
    heroDesc: 'Solar power by day, energy backup by night. Maximum flexibility and grid outage protection.',
    stat1Value: 'Day/Night', stat1Label: 'Power Supply',
    stat2Value: '10ms', stat2Label: 'Switchover',
    stat3Value: 'Smart', stat3Label: 'BMS Protection',
    stat4Value: 'Dual', stat4Label: 'Grid + Battery',
    description: 'A hybrid system combines solar panels, grid connection, and energy storage batteries for total reliability.',
    features: ['Uninterrupted Backup', 'Smart Load Management', 'Lithium/Lead-Acid Compatible'],
    specs: [{ label: 'Capacity', value: '2kW - 50kW' }],
    faqs: [{ q: 'What happens during a power cut?', a: 'The hybrid system instantly switches to battery storage in <10ms.' }],
    howItWorksSteps: [
      { step: '01', icon: 'Sun', title: 'Generate', desc: 'Solar panels convert sunlight into DC electricity.' },
      { step: '02', icon: 'Zap', title: 'Convert', desc: 'Inverter converts DC to usable AC power.' },
      { step: '03', icon: 'Home', title: 'Consume', desc: 'Power used directly in your home or business.' },
      { step: '04', icon: 'Battery', title: 'Store', desc: 'Excess energy stored in lithium batteries.' },
      { step: '05', icon: 'Activity', title: 'Backup', desc: 'Battery powers your home during outages instantly.' }
    ]
  },
  'off-grid': {
    advancedFeatures: [
          "Off-Grid Solar Inverter",
          "Lithium LFP Battery Bank",
          "High-Efficiency Solar Panels",
          "MPPT Charge Controller",
          "Integrated Smart BMS",
          "AC/DC Distribution Board",
          "Dual Charging Option",
          "Heavy-Duty Surge Protection",
          "Pure Sine Wave Output"
    ],
    benefits: [
          {
                "icon": "Zap",
                "title": "100% Grid Independence",
                "desc": "No electricity bills, no grid failures, no dependence on power utilities."
          },
          {
                "icon": "Sun",
                "title": "Ideal for Remote Sites",
                "desc": "Power remote homes, farmhouses, agricultural pumps, and eco-resorts anywhere."
          },
          {
                "icon": "ShieldCheck",
                "title": "Industrial Reliability",
                "desc": "LFP lithium batteries and heavy-duty hybrid inverters for stable performance."
          },
          {
                "icon": "Clock",
                "title": "Seamless Smart BMS",
                "desc": "Integrated Battery Management System monitors cell voltage and temperature."
          },
          {
                "icon": "Layers",
                "title": "Expandable Power Pack",
                "desc": "Easily scale your battery storage capacity as your loads increase."
          },
          {
                "icon": "Leaf",
                "title": "Zero Carbon Footprint",
                "desc": "Generate and store your own clean solar energy with zero emissions."
          }
    ],
    showHero: true,
    showHowItWorks: true,
    heroSubtitle: 'Complete Independence',
    heroTitle: 'Lithium Off-Grid System',
    heroImage: '/images/sol_off_grid.jpg',
    heroDesc: 'Autonomous clean energy storage. Ideal for remote cabins, schools, and areas with no grid connectivity.',
    stat1Value: '100%', stat1Label: 'Off-Grid Autonomy',
    stat2Value: '4000+', stat2Label: 'LFP Battery Cycles',
    stat3Value: 'Zero', stat3Label: 'Grid Dependence',
    stat4Value: 'IP65', stat4Label: 'All-Weather Rated',
    description: 'Fully autonomous power generation and storage using high-durability Lithium LFP battery technology.',
    features: ['Independent Power Grid', 'Zero monthly utility costs', 'Heavy-duty off-grid inverters'],
    specs: [{ label: 'Capacity', value: '1kW - 25kW' }],
    faqs: [{ q: 'Do I need a backup generator?', a: 'Usually no, as the battery bank is sized to cover 2-3 days of autonomy.' }],
    howItWorksSteps: [
      { step: '01', icon: 'Sun', title: 'Generate', desc: 'Solar panels convert sunlight into electricity.' },
      { step: '02', icon: 'Battery', title: 'Store', desc: 'Energy stored in lithium battery bank.' },
      { step: '03', icon: 'Zap', title: 'Convert', desc: 'Inverter converts DC to AC for appliances.' },
      { step: '04', icon: 'Home', title: 'Power', desc: 'Your home or business runs 24/7.' },
      { step: '05', icon: 'Leaf', title: 'Independent', desc: 'Fully self-sufficient, zero grid dependency.' }
    ]
  },
  'water-heaters': {
    showHero: true,
    showHowItWorks: true,
    heroSubtitle: 'Thermal Savings',
    heroTitle: 'Solar Water Heaters',
    heroImage: '/images/sol_water_heater.jpg',
    heroDesc: 'Hot water from the sun. Highly insulated inner tanks. Extreme thermal efficiency.',
    stat1Value: 'ETC/FPC', stat1Label: 'Collector Options',
    stat2Value: '5 Yrs', stat2Label: 'Warranty Coverage',
    stat3Value: '100L+', stat3Label: 'Capacity Range',
    stat4Value: 'SUS316', stat4Label: 'Stainless Tank',
    description: 'Advanced solar thermal collectors heat water efficiently, storing it in highly insulated SUS304/SUS316 stainless steel tanks.',
    features: ['High-efficiency vacuum tubes', 'Rust-proof outer shell', 'Auxiliary electric heater fallback'],
    specs: [{ label: 'Capacity', value: '100L - 2000L' }],
    faqs: [{ q: 'Does it work on cloudy days?', a: 'Yes, vacuum tubes can absorb diffused solar radiation even on overcast days.' }],
    howItWorksSteps: [
      { step: '01', icon: 'Sun', title: 'Absorb', desc: 'Solar collectors absorb sunlight efficiently.' },
      { step: '02', icon: 'Thermometer', title: 'Heat', desc: 'Heat is transferred to water in the system.' },
      { step: '03', icon: 'Droplets', title: 'Store', desc: 'Hot water stored in insulated tank.' },
      { step: '04', icon: 'Activity', title: 'Use', desc: 'Ready for use anytime you need it.' }
    ]
  },
  'lithium-ups': {
    advancedFeatures: [
          "Integrated LifePO4 Cells",
          "Smart Inbuilt BMS",
          "Pure Sine Wave Inverter",
          "Rapid Smart Charger",
          "Overload & Short Circuit Cut",
          "Wall-Mount Compact Chassis",
          "Zero Active Maintenance",
          "LED Status Interface",
          "Eco-Friendly Safe Design"
    ],
    benefits: [
          {
                "icon": "Zap",
                "title": "True Zero Switchover",
                "desc": "Transition to backup power happens in under 10 milliseconds — zero reboot risk."
          },
          {
                "icon": "Sun",
                "title": "Space-Saving Design",
                "desc": "Wall-mountable, compact chassis replaces heavy, messy external lead-acid batteries."
          },
          {
                "icon": "ShieldCheck",
                "title": "LFP Cell Safety",
                "desc": "Advanced Lithium Iron Phosphate chemistry prevents thermal runaway risks."
          },
          {
                "icon": "Clock",
                "title": "10-Year Service Life",
                "desc": "Over 4,000 charge cycles offer a decade of maintenance-free operation."
          },
          {
                "icon": "Layers",
                "title": "Intelligent Charging",
                "desc": "Smart BMS adjusts charging current based on battery temperature and voltage."
          },
          {
                "icon": "Leaf",
                "title": "Eco-Friendly Tech",
                "desc": "Zero lead, zero acid, and zero toxic fumes make it perfectly safe for indoor use."
          }
    ],
    showHero: true,
    showHowItWorks: true,
    heroSubtitle: 'Zero-Switch Technology',
    heroTitle: 'Lithium Inbuilt UPS System',
    heroImage: '/images/lithium_hero.webp',
    heroDesc: 'Smart, Compact & Long-Lasting Power Backup. One unit. Zero downtime. Zero maintenance.',
    stat1Value: '4000+', stat1Label: 'Charge Cycles',
    stat2Value: '<10ms', stat2Label: 'Switch Time',
    stat3Value: '10 Yrs', stat3Label: 'Battery Life',
    stat4Value: 'Zero', stat4Label: 'Maintenance',
    description: 'Space-saving UPS systems with integrated lithium-ion cells for seamless, instantaneous power transition.',
    features: ['Instant Switchover (<10ms)', 'LifePO4 Safety Chemistry', '10-Year maintenance-free life'],
    specs: [{ label: 'Backup Duration', value: '2 – 8 Hours' }],
    faqs: [{ q: 'Is maintenance required?', a: 'No, lithium UPS systems are 100% maintenance-free.' }],
    howItWorksSteps: [
      { step: '01', icon: 'Zap', title: 'Charge', desc: 'Grid charges the lithium battery at high speed.' },
      { step: '02', icon: 'Battery', title: 'Store', desc: 'Energy stored efficiently with BMS protection.' },
      { step: '03', icon: 'Activity', title: 'Switch', desc: 'Power cut detected. Backup activates in <10ms.' },
      { step: '04', icon: 'CheckCircle2', title: 'Run', desc: 'Appliances continue without a flicker.' }
    ]
  },
  'home-ups': {
    advancedFeatures: [
          "Pure Sine Wave Inverter",
          "Microcontroller Based Design",
          "Multi-Stage Smart Charging",
          "Wide Input Voltage Window",
          "Overload & Short Circuit Protection",
          "Easy Battery Select Option",
          "LED Status Indications",
          "Thermal Management System",
          "Silent Ventilation Fan"
    ],
    benefits: [
          {
                "icon": "Zap",
                "title": "No Interruption in Daily Life",
                "desc": "Switches to battery power in milliseconds — your family doesn't even notice the power cut."
          },
          {
                "icon": "Home",
                "title": "Supports Home Appliances",
                "desc": "Lights, fans, TV, Wi-Fi and more — all kept running during outages."
          },
          {
                "icon": "ShieldCheck",
                "title": "Safe & Stable Voltage",
                "desc": "Pure sine wave output protects all sensitive electronics in your home."
          },
          {
                "icon": "Layers",
                "title": "Customizable Capacity",
                "desc": "Sized perfectly for your home's load — from basic to advanced setups."
          },
          {
                "icon": "Clock",
                "title": "Affordable Solution",
                "desc": "Best value power backup for residential use with long-lasting performance."
          },
          {
                "icon": "Activity",
                "title": "Smart Charging",
                "desc": "Intelligent battery charging system extends battery lifespan significantly."
          }
    ],
    showHero: true,
    showHowItWorks: true,
    heroSubtitle: 'Residential Backup',
    heroTitle: 'Home UPS System',
    heroImage: '/images/pwr_home_ups.jpg',
    heroDesc: 'Designed specifically for residential loads — fans, lights, routers, and essential appliances.',
    stat1Value: 'Pure Sine', stat1Label: 'Wave Output',
    stat2Value: '95%+', stat2Label: 'System Efficiency',
    stat3Value: 'Low', stat3Label: 'Maintenance',
    stat4Value: 'Smart', stat4Label: 'Appliance Protect',
    description: 'Pure sine wave home UPS systems protect sensitive electronics while keeping your lights and fans running smoothly.',
    features: ['Pure Sine Wave output', 'Dual battery compatibility', 'Overload protection alerts'],
    specs: [{ label: 'Capacity', value: '600VA - 5kVA' }],
    faqs: [{ q: 'What can it run?', a: 'Lights, fans, TV, laptop chargers, and Wi-Fi routers.' }],
    howItWorksSteps: [
      { step: '01', icon: 'Zap', title: 'Charge', desc: 'Electricity charges the UPS battery.' },
      { step: '02', icon: 'Battery', title: 'Store', desc: 'UPS stores energy efficiently in battery.' },
      { step: '03', icon: 'Activity', title: 'Detect', desc: 'Power cut detected instantly.' },
      { step: '04', icon: 'Clock', title: 'Switch', desc: 'UPS instantly supplies backup power.' },
      { step: '05', icon: 'Home', title: 'Run', desc: 'Appliances continue running smoothly.' }
    ]
  },
  'inverters': {
    advancedFeatures: [
          "DSP Microcontroller Inverter",
          "High Surge Capacity Design",
          "Dual Mode Charging Support",
          "Automatic Voltage Regulation",
          "Complete Short Circuit Protection",
          "LED Display Interface",
          "Wide Input Charging Range",
          "Silent Temperature Fan",
          "Compatible with Multi-Batteries"
    ],
    benefits: [
          {
                "icon": "Zap",
                "title": "High Surge Capability",
                "desc": "Starts heavy inductive loads like motors, pumps, and laser printers easily."
          },
          {
                "icon": "Sun",
                "title": "Dual Charging Modes",
                "desc": "Supports both quick charging and normal charging to adapt to grid schedules."
          },
          {
                "icon": "ShieldCheck",
                "title": "Comprehensive Protection",
                "desc": "Integrated safeguards against overload, short circuits, and reverse polarity."
          },
          {
                "icon": "Clock",
                "title": "DSP Microcontroller",
                "desc": "Digital Signal Processing technology ensures fast, precise conversion and regulation."
          },
          {
                "icon": "Layers",
                "title": "Wide Voltage Window",
                "desc": "Charges batteries even at low input voltage down to 90V, ideal for rural grids."
          },
          {
                "icon": "Leaf",
                "title": "Silent Smart Cooling",
                "desc": "Temperature-controlled cooling fan runs only when needed, minimizing noise."
          }
    ],
    showHero: true,
    showHowItWorks: true,
    heroSubtitle: 'Power Conversion',
    heroTitle: 'Home & Commercial Inverters',
    heroImage: '/images/pwr_inverter.jpg',
    heroDesc: 'Efficient, durable, and field-proven power conversion systems.',
    stat1Value: 'DSP', stat1Label: 'Micro Controller',
    stat2Value: '97%', stat2Label: 'Peak Efficiency',
    stat3Value: 'OVP/UVP', stat3Label: 'Built-in Protection',
    stat4Value: 'Wide', stat4Label: 'Input Voltage range',
    description: 'High-performance DSP-controlled power inverters for home, office, and small shops.',
    features: ['Micro-controller design', 'Wide input charging window', 'Automatic voltage regulation'],
    specs: [{ label: 'Range', value: '600VA - 10kVA' }],
    faqs: [{ q: 'What is the warranty?', a: 'Our general inverters carry a 2-year warranty.' }],
    howItWorksSteps: [
      { step: '01', icon: 'Battery', title: 'Store', desc: 'Battery stores DC power during normal supply.' },
      { step: '02', icon: 'Activity', title: 'Detect', desc: 'Inverter detects grid failure instantly.' },
      { step: '03', icon: 'Zap', title: 'Convert', desc: 'DC from battery converted to clean AC.' },
      { step: '04', icon: 'ShieldCheck', title: 'Protect', desc: 'Stable, regulated output protects appliances.' },
      { step: '05', icon: 'Clock', title: 'Sustain', desc: 'Continuous stable power until grid returns.' }
    ]
  },
  'online-ups': {
    advancedFeatures: [
          "True Double Conversion Tech",
          "Zero Switch Transfer (0ms)",
          "Pure Sine Wave Output",
          "Active Input Power Correction",
          "Galvanic Isolation Options",
          "LCD System Interface",
          "Network Management Ready",
          "Industrial Overload Capacity",
          "Modular Backup Options"
    ],
    benefits: [
          {
                "icon": "Server",
                "title": "Zero Transfer. Zero Downtime.",
                "desc": "Equipment receives continuous clean power 24/7 — no switching, no gaps, no disruption ever."
          },
          {
                "icon": "Zap",
                "title": "Zero Transfer Time",
                "desc": "Double conversion ensures no power gap whatsoever during outages."
          },
          {
                "icon": "ShieldCheck",
                "title": "Complete Protection",
                "desc": "Protects against surges, sags, harmonics, voltage fluctuations and spikes."
          },
          {
                "icon": "Layers",
                "title": "Clean Power Output",
                "desc": "Pure sine wave output — zero distortion for the most sensitive equipment."
          },
          {
                "icon": "Activity",
                "title": "Voltage Regulation",
                "desc": "Continuous voltage regulation independent of input quality."
          },
          {
                "icon": "Clock",
                "title": "High Reliability",
                "desc": "Industrial-grade components for maximum uptime in critical environments."
          }
    ],
    showHero: true,
    showHowItWorks: true,
    heroSubtitle: 'Critical Load Protection',
    heroTitle: 'True Online UPS',
    heroImage: '/images/pwr_online_ups.jpg',
    heroDesc: 'True double-conversion online UPS systems for server rooms, medical diagnostics, and industrial lines.',
    stat1Value: '0ms', stat1Label: 'Transfer Time',
    stat2Value: '0.99', stat2Label: 'Input Power Factor',
    stat3Value: 'True', stat3Label: 'Double Conversion',
    stat4Value: 'SNMP', stat4Label: 'Network Card Ready',
    description: 'Provides clean, stabilized voltage always regenerated from the battery bank, completely isolating load from grid noise.',
    features: ['True double conversion', 'Galvanic isolation options', 'Modular scalability'],
    specs: [{ label: 'Range', value: '1kVA - 200kVA' }],
    faqs: [{ q: 'Why is online UPS better than offline?', a: 'Zero milliseconds switchover prevents data loss or rebooting of medical gear.' }],
    howItWorksSteps: [
      { step: '01', icon: 'Activity', title: 'AC to DC', desc: 'Incoming utility AC power is rectified to DC power.' },
      { step: '02', icon: 'Battery', title: 'Charge', desc: 'DC power keeps the battery bank fully charged.' },
      { step: '03', icon: 'Zap', title: 'DC to AC', desc: 'Inverter converts DC back to clean, stable AC.' },
      { step: '04', icon: 'ShieldCheck', title: 'Regulate', desc: 'Zero transfer time (0ms) double-conversion filters spikes.' },
      { step: '05', icon: 'CheckCircle2', title: 'Protect', desc: 'Connected critical loads receive perfect 230V sine wave.' }
    ]
  },
  'lithium-batteries': {
    advancedFeatures: [
          "Advanced LifePO4 Chemistry",
          "Smart Integrated BMS",
          "4000+ Lifetime Charge Cycles",
          "95% Depth of Discharge",
          "Built-In Short Circuit Safety",
          "Compact Lightweight Build",
          "Zero Maintenance Overhead",
          "Active Cell Balancing Tech",
          "Non-Toxic Eco-Friendly"
    ],
    showHero: true,
    heroSubtitle: 'Energy Storage',
    heroTitle: 'LFP Lithium Batteries',
    heroImage: '/images/pwr_lithium_battery.webp',
    heroDesc: 'Lighter. Longer. Smarter. LFP energy storage packs for solar grids and backup UPS.',
    stat1Value: '4000+', stat1Label: 'Charge Cycles',
    stat2Value: '10 Yrs', stat2Label: 'Service Life',
    stat3Value: 'Smart', stat3Label: 'BMS Protection',
    stat4Value: '95%', stat4Label: 'Depth of Discharge',
    description: 'Premium Lithium Iron Phosphate (LifePO4) storage batteries with integrated BMS monitors.',
    features: ['Advanced LFP chemistry', 'Maintenance-free cells', 'Built-in thermal protection'],
    specs: [{ label: 'Chemistry', value: 'LifePO4' }],
    faqs: [{ q: 'Are lithium batteries safe?', a: 'Yes, LFP chemistry is highly stable and does not thermal runaway like other lithium cells.' }]
  },
  'tubular-batteries': {
    advancedFeatures: [
          "Tall Tubular Container",
          "Thick Cast Positive Plate Grid",
          "Low Antimony Grid Alloy",
          "High Acid Reserve Design",
          "Easy Visual Level Indicators",
          "Deep Discharge Recovery Tech",
          "Robust Leak-Proof Vent Plugs",
          "Excellent Heat Dissipation",
          "99% Lead Recyclability"
    ],
    showHero: true,
    heroSubtitle: 'Lead-Acid Storage',
    heroTitle: 'Tall Tubular Batteries',
    heroImage: '/images/pwr_tubular_battery.webp',
    heroDesc: 'Proven lead-acid storage battery for long backup runs. Extreme temperature resilience.',
    stat1Value: 'Tall', stat1Label: 'Tubular Plates',
    stat2Value: 'Low', stat2Label: 'Water Topping',
    stat3Value: 'Robust', stat3Label: 'Grid Alloy Design',
    stat4Value: 'Proven', stat4Label: 'Valued Choice',
    description: 'Heavy duty tall tubular battery designed to withstand deep discharges and long power outage cycles in Indian conditions.',
    features: ['Extra-tall tubular containers', 'Ultra-low antimony grids', 'Easy visual float indicators'],
    specs: [{ label: 'Capacity', value: '100Ah - 220Ah' }],
    faqs: [{ q: 'How often do I top up water?', a: 'Usually once in 6–9 months depending on usage.' }]
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
  'privacy-policy': {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: April 2026',
    sections: [
      { title: '1. Introduction', text: 'Spectrum Solar ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, submit inquiries, or use our nationwide services across India.' },
      { title: '2. Information We Collect', text: 'We may collect the following types of information:\n- Personal Data: Name, email address, phone number, and physical address when you fill out contact forms, dealership inquiries, or freelance applications.\n- Usage Data: Information about your interaction with our website, such as IP addresses, browser types, and pages visited, collected via cookies and analytics tools.\n- Technical Data: Information required to provide solar audits and assessments, including property details and energy consumption patterns provided by you.' },
      { title: '3. How We Use Your Information', text: 'Your data is used to:\n- Respond to your inquiries, schedule site audits, and provide quotations.\n- Process franchise, dealership, and freelance partnership applications.\n- Improve our website performance, marketing strategies, and customer service.\n- Send necessary administrative updates or promotional offers (which you can opt out of at any time).' },
      { title: '4. Data Sharing and Disclosure', text: 'We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates. We may disclose your data if required by law or to protect our legal rights.' },
      { title: '5. Data Security', text: 'We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our Site.' },
      { title: '6. Third-Party Websites', text: 'You may find advertising or other content on our site that links to the sites and services of our partners or suppliers. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.' },
      { title: '7. Your Rights', text: 'You have the right to request access to, correction of, or deletion of your personal data. If you wish to exercise any of these rights, please contact us using the details below.' },
      { title: '8. Contact Us', text: 'If you have any questions about this Privacy Policy or our data practices, please contact us at:\n\nSpectrum Solar (HQ)\nSpectrum Tower, Near KSEB, Kannur 670001\nEmail: legal@spectrumsolar.in' }
    ]
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    lastUpdated: 'Last Updated: April 2026',
    sections: [
      { title: '1. Acceptance of Terms', text: 'By accessing and using the website (spectrumsolar.in) and services provided by Spectrum Solar, you accept and agree to be bound by the terms and provision of this agreement.' },
      { title: '2. Services and Products', text: 'Spectrum Solar provides solar energy systems, power backup solutions, and related installation services across India. All products, specifications, and data are subject to change without notice to improve reliability, function, or design. Warranties provided on products (e.g., 25-year panel warranty) are subject to the original manufacturer\'s terms and conditions.' },
      { title: '3. Quotations and Pricing', text: 'All quotations provided via our website or personnel are estimates based on initial data. Final pricing is subject to a physical site audit. Prices are exclusive of applicable taxes unless stated otherwise. Spectrum Solar reserves the right to adjust pricing based on raw material costs and site-specific complexities prior to final contract signing.' },
      { title: '4. Partnership Programs (Franchise, Dealership, Freelance)', text: 'Applications for Franchise, Dealership, and Freelance partnerships submitted through this website are subject to review and approval by Spectrum Solar management. Submitting an inquiry does not guarantee approval. Approved partners must sign a separate legal agreement governing the specific terms, margins, and operational guidelines of the partnership.' },
      { title: '5. Intellectual Property', text: 'All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Spectrum Solar and is protected by applicable intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.' },
      { title: '6. Limitation of Liability', text: 'Spectrum Solar shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website, or for the cost of procurement of substitute services.' },
      { title: '7. Governing Law', text: 'These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Kerala, India.' },
      { title: '8. Contact Information', text: 'If you have any questions about these Terms & Conditions, please contact us at:\n\nSpectrum Solar (HQ)\nSpectrum Tower, Near KSEB, Kannur 670001\nEmail: legal@spectrumsolar.in' }
    ]
  },
  'blogs': [
    {
      title: "Why Lithium is the Future of Power Backup",
      excerpt: "Exploring the technical advantages of Lithium Iron Phosphate (LiFePO4) over traditional lead-acid batteries in residential and commercial backup applications.",
      publishedAt: "2024-03-15T00:00:00.000Z",
      author: "Tech Team",
      category: "Innovation",
      readTime: "5 min read",
      coverImage: "/images/Banner01.jpg",
      body: `Traditional lead-acid batteries have dominated the backup market for decades, but modern installations are rapidly switching to Lithium Iron Phosphate (LFP).

LFP batteries offer a significant improvement in cycle life, discharging up to 80-90% of their total capacity without damage. They charge faster, operate safely at high ambient temperatures, and have a footprint that is 70% smaller than a comparable lead-acid bank. With warranties spanning 5-10 years, lithium solutions represent the single most cost-effective and future-proof backup strategy.`
    },
    {
      title: "KSEB Subsidy Guide 2024",
      excerpt: "Everything you need to know about the latest government subsidies for residential solar installations in Kerala — eligibility, amount, and application process.",
      publishedAt: "2024-03-10T00:00:00.000Z",
      author: "Policy Brief",
      category: "Savings",
      readTime: "7 min read",
      coverImage: "/images/Banner02.jpg",
      body: `Under the central government solar rooftop subsidy portal, homeowners in Kerala can claim a direct financial subsidy on residential solar systems.

For systems up to 3kW, KSEB facilitates a 30% direct subsidy. For larger systems (3kW up to 10kW), the subsidy is capped at a lower percentage but still provides significant savings. To apply, citizens must register via the National Portal, select a certified local installer like Spectrum Solar, submit their load requirements, and obtain net metering approval. Our engineers handle the complete paperwork from filing to connection.`
    },
    {
      title: "Maximizing ROI on On-Grid Solar Systems",
      excerpt: "Professional tips on panel orientation and periodic maintenance to ensure peak performance and the fastest possible payback on your investment.",
      publishedAt: "2024-03-05T00:00:00.000Z",
      author: "Engineer Corner",
      category: "Technical",
      readTime: "4 min read",
      coverImage: "/images/banner03.jpg",
      body: `An on-grid solar system is only as profitable as its peak performance. To ensure the fastest return on investment (often under 3-4 years), correct installation guidelines are vital.

Panels must be oriented true south at a tilt angle of approximately 10-15 degrees depending on the latitude of the property in Kerala. Dust and bird droppings can decrease panel output by up to 20%; we recommend periodic cleaning with soft water every two weeks. Active monitoring via the inverter's mobile application will help identify any underperforming strings immediately.`
    }
  ],
  'testimonials': {
    testimonials: allTestimonials
  },
  'footer': {
    brandPitch: "Spectrum Solar is a pioneer in solar energy integration and power electronics since 2002. With over 40,000+ satisfied customers nationwide, we are committed to India's green energy transition.",
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    isoCert: "ISO 9001:2015",
    mnreApproved: "MNRE Approved"
  }
};
