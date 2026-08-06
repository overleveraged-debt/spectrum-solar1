export const productDefaults = {
  'on-grid': {
    showHero: true,
    heroSubtitle: "Grid-Connected · Net Metering",
    heroTitle: "On-Grid Solar System",
    heroImage: "/images/ongrid_hero_wide.webp",
    heroDesc: "Significantly lower your monthly electricity bills. Feed excess power back to the grid and maximize your solar returns.",
    showStats: true,
    stat1Value: "90%", stat1Label: "Bill Reduction",
    stat2Value: "25 Yrs", stat2Label: "Panel Warranty",
    stat3Value: "3–4 Yrs", stat3Label: "ROI Period",
    stat4Value: "6,145+", stat4Label: "Installations",
    description: "Grid-connected solar systems that feed excess power back to the KSEB grid through net metering. The most cost-effective way to slash your bill to zero.",
    overviewSubtitle: "Smart Solar Solution",
    overviewTitle: "Grid-Tied. Always Saving.",
    overviewDesc1: "Grid-connected solar systems that feed excess power back to the KSEB grid through net metering. The most cost-effective way to slash your bill to zero.",
    overviewDesc2: "This makes it the most cost-effective and fastest-ROI solar solution available — with zero battery costs and minimal maintenance.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Sun', title: 'Generate', desc: 'Solar panels convert sunlight into DC electricity.' },
      { step: '02', icon: 'Zap', title: 'Convert', desc: 'Inverter converts DC to usable AC power.' },
      { step: '03', icon: 'Home', title: 'Consume', desc: 'Power used directly in your home or business.' },
      { step: '04', icon: 'TrendingUp', title: 'Export', desc: 'Excess electricity fed back to grid.' },
      { step: '05', icon: 'CheckCircle2', title: 'Save', desc: 'Net meter credits lower your bill to zero.' }
    ],
    benefits: [
      { icon: 'Zap', title: "90% Bill Reduction", desc: "Drastically reduce or completely eliminate your monthly grid electricity bills." },
      { icon: 'Sun', title: "Highest Solar Yield", desc: "Direct conversion to AC power without battery storage losses ensures maximum efficiency." },
      { icon: 'ShieldCheck', title: "25-Year Performance", desc: "Tier-1 solar panels backed by a 25-year linear performance warranty." },
      { icon: 'Clock', title: "Fastest ROI Payback", desc: "Recover your initial system investment in just 3 to 4 years through energy savings." },
      { icon: 'Layers', title: "Low Maintenance", desc: "No batteries means zero battery replacement costs and minimal system maintenance." },
      { icon: 'Leaf', title: "Clean & Green Energy", desc: "Reduce carbon emissions and contribute to a cleaner environment daily." }
    ],
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
    perfectFor: [
      { label: "Independent Houses & Villas", sub: "Reduce monthly residential bills to near zero" },
      { label: "Commercial & Office Buildings", sub: "Offset high daytime commercial grid rates" },
      { label: "Educational Institutions", sub: "Schools, colleges and universities solar ROI" },
      { label: "Hospitals & Diagnostic Centers", sub: "Reliable power generation during daytime peaks" },
      { label: "Manufacturing & Industrial Units", sub: "Lower operations costs on large roof spaces" }
    ],
    faqs: [
      { q: "What is net metering?", a: "Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. It allows you to export excess electricity generated during the day and get bill credits, effectively reducing your overall energy costs." },
      { q: "What is the lifespan of an on-grid system?", a: "Our high-efficiency Mono PERC solar panels come with a 25+ year performance lifespan. Inverters typically last 10–15 years and can be easily replaced, ensuring decades of reliable power generation." },
      { q: "Is maintenance required?", a: "Very minimal maintenance is required. Since there are no moving parts and no batteries involved in a standard on-grid system, periodic cleaning of the solar panels (every few months) to remove dust is usually sufficient." }
    ]
  },

  'hybrid': {
    showHero: true,
    heroSubtitle: "Solar + Battery + Grid",
    heroTitle: "Hybrid Solar System",
    heroImage: "/images/hybrid_hero.webp",
    heroDesc: "Solar Power + Battery Backup for 24/7 Electricity. Experience uninterrupted power with solar savings and grid reliability.",
    showStats: true,
    stat1Value: "24/7", stat1Label: "Power Availability",
    stat2Value: "< 10ms", stat2Label: "Switchover Time",
    stat3Value: "10 Yrs", stat3Label: "Battery Warranty",
    stat4Value: "3,200+", stat4Label: "Hybrid Systems",
    description: "A hybrid system combines solar panels, grid connection, and energy storage batteries for total reliability.",
    overviewSubtitle: "Reliable Solar with Smart Backup",
    overviewTitle: "Solar + Battery. Always On.",
    overviewDesc1: "A Hybrid Solar System combines solar panels, battery storage, and grid connectivity to deliver uninterrupted electricity.",
    overviewDesc2: "Ideal for homes and businesses facing frequent power cuts — complete energy reliability in one system.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Sun', title: 'Generate', desc: 'Solar panels convert sunlight into DC electricity.' },
      { step: '02', icon: 'Zap', title: 'Convert', desc: 'Inverter converts DC to usable AC power.' },
      { step: '03', icon: 'Home', title: 'Consume', desc: 'Power used directly in your home or business.' },
      { step: '04', icon: 'Battery', title: 'Store', desc: 'Excess energy stored in lithium batteries.' },
      { step: '05', icon: 'Activity', title: 'Backup', desc: 'Battery powers your home during outages instantly.' }
    ],
    benefits: [
      { icon: 'Zap', title: 'Uninterrupted 24/7 Power', desc: 'Instant switchover (<10ms) ensures continuous electricity during outages.' },
      { icon: 'Battery', title: 'Smart Battery Storage', desc: 'Store excess solar energy generated during the day for night-time use.' },
      { icon: 'TrendingUp', title: 'Grid Savings + Backup', desc: 'Export power when battery is full and grid is active to maximize returns.' }
    ],
    perfectFor: [
      { label: "Residences in Frequent Outage Areas", sub: "Never lose power during grid blackouts" },
      { label: "Commercial Establishments", sub: "Keep critical IT and point-of-sale systems running" },
      { label: "Luxury Homes & Estates", sub: "Quiet, automated energy independence" }
    ],
    faqs: [
      { q: "How fast does a hybrid system switch during power cuts?", a: "Switchover happens in less than 10 milliseconds — imperceptible to computers and sensitive electronics." },
      { q: "Can a hybrid system work without grid power?", a: "Yes. In off-grid mode, the system draws energy directly from solar panels and battery storage." }
    ]
  },

  'off-grid': {
    showHero: true,
    heroSubtitle: "Complete Independence",
    heroTitle: "Lithium Off-Grid System",
    heroImage: "/images/offgrid_hero.webp",
    heroDesc: "Fully autonomous solar + lithium battery systems designed for complete energy independence from the grid.",
    showStats: true,
    stat1Value: "Zero", stat1Label: "Grid Dependency",
    stat2Value: "4,000+", stat2Label: "Battery Cycles",
    stat3Value: "100%", stat3Label: "Autonomous Power",
    stat4Value: "1,850+", stat4Label: "Off-Grid Projects",
    description: "Fully autonomous power generation and storage using high-durability Lithium LFP battery technology.",
    overviewSubtitle: "Power Without Grid Dependency",
    overviewTitle: "No Grid. No Limits.",
    overviewDesc1: "A Lithium Off-Grid Solar System is a completely independent power solution that does not rely on the electricity grid.",
    overviewDesc2: "Ensures stable, eco-friendly energy whether in a remote location, farm, or off-grid retreat.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Sun', title: 'Generate', desc: 'Solar panels convert sunlight into electricity.' },
      { step: '02', icon: 'Battery', title: 'Store', desc: 'Energy stored in lithium battery bank.' },
      { step: '03', icon: 'Zap', title: 'Convert', desc: 'Inverter converts DC to AC for appliances.' },
      { step: '04', icon: 'Home', title: 'Power', desc: 'Your home or business runs 24/7.' },
      { step: '05', icon: 'Leaf', title: 'Independent', desc: 'Fully self-sufficient, zero grid dependency.' }
    ],
    benefits: [
      { icon: 'Zap', title: "100% Grid Independence", desc: "No electricity bills, no grid failures, no dependence on power utilities." },
      { icon: 'Sun', title: "Ideal for Remote Sites", desc: "Power remote homes, farmhouses, agricultural pumps, and eco-resorts anywhere." },
      { icon: 'ShieldCheck', title: "Industrial Reliability", desc: "LFP lithium batteries and heavy-duty hybrid inverters for stable performance." },
      { icon: 'Clock', title: "Seamless Smart BMS", desc: "Integrated Battery Management System monitors cell voltage and temperature." },
      { icon: 'Layers', title: "Expandable Power Pack", desc: "Easily scale your battery storage capacity as your loads increase." },
      { icon: 'Leaf', title: "Zero Carbon Footprint", desc: "Generate and store your own clean solar energy with zero emissions." }
    ],
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
    perfectFor: [
      { label: "Remote Farmhouses & Estates", sub: "Reliable electricity where grid lines are unavailable" },
      { label: "Eco Resorts & Homestays", sub: "Silent, green power for guests with zero generator noise" },
      { label: "Telecom & Remote Monitoring Sites", sub: "24/7 continuous power for critical infrastructure" }
    ],
    faqs: [
      { q: "What happens on rainy or cloudy days?", a: "The system is sized with 2–3 days of battery autonomy to keep your loads powered seamlessly." }
    ]
  },

  'water-heaters': {
    showHero: true,
    heroSubtitle: "Thermal Solutions",
    heroTitle: "Solar Water Heaters",
    heroImage: "/images/water_heater_hero.webp",
    heroDesc: "High-performance solar water heaters utilizing ETC or FPC collectors for zero-cost hot water.",
    showStats: true,
    stat1Value: "Zero", stat1Label: "Running Cost",
    stat2Value: "15 Yrs", stat2Label: "System Lifespan",
    stat3Value: "80%", stat3Label: "Hot Water Savings",
    stat4Value: "12,000+", stat4Label: "Heaters Installed",
    description: "Advanced solar thermal collectors heat water efficiently, storing it in highly insulated SUS304/SUS316 stainless steel tanks.",
    overviewSubtitle: "Smart & Sustainable Water Heating",
    overviewTitle: "Hot Water. Zero Cost.",
    overviewDesc1: "Uses sunlight to heat water, making it one of the most cost-effective solutions for homes and hotels.",
    overviewDesc2: "Spectrum Powers offers high-quality ETC and FPC systems built for long-term durability and efficiency.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Sun', title: 'Absorb', desc: 'Solar collectors absorb sunlight efficiently.' },
      { step: '02', icon: 'Thermometer', title: 'Heat', desc: 'Heat is transferred to water in the system.' },
      { step: '03', icon: 'Droplets', title: 'Store', desc: 'Hot water stored in insulated tank.' },
      { step: '04', icon: 'Activity', title: 'Use', desc: 'Ready for use anytime you need it.' }
    ],
    perfectFor: [
      { label: "Residential Households & Apartments", sub: "Daily hot water for bathing and kitchen needs" },
      { label: "Hotels & Hostels", sub: "Large-volume hot water heating with fast payback" }
    ],
    faqs: [
      { q: "Do solar water heaters work on cloudy days?", a: "Yes. ETC evacuated tubes absorb diffused sunlight, and systems include auxiliary electric heating elements for monsoon backups." }
    ]
  },

  'lithium-ups': {
    showHero: true,
    heroSubtitle: "Zero-Switch Technology",
    heroTitle: "Lithium Inbuilt UPS",
    heroImage: "/images/lithium_ups_hero.webp",
    heroDesc: "All-in-one wall-mountable lithium UPS systems. Instant zero-switch backup with 5x longer battery lifespan.",
    showStats: true,
    stat1Value: "< 10ms", stat1Label: "Switch Time",
    stat2Value: "4,000+", stat2Label: "Charge Cycles",
    stat3Value: "Zero", stat3Label: "Maintenance",
    stat4Value: "5,400+", stat4Label: "Units Deployed",
    description: "Space-saving UPS systems with integrated lithium-ion cells for seamless, instantaneous power transition.",
    overviewSubtitle: "Next-Generation Solution",
    overviewTitle: "All-in-one. Always On.",
    overviewDesc1: "Integrates the inverter and lithium battery into one compact, wall-mountable unit. Faster charging, longer life.",
    overviewDesc2: "Delivers advanced lithium UPS systems engineered for space-saving installation and reliable performance.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Zap', title: 'Charge', desc: 'Grid charges the lithium battery at high speed.' },
      { step: '02', icon: 'Battery', title: 'Store', desc: 'Energy stored efficiently with BMS protection.' },
      { step: '03', icon: 'Activity', title: 'Switch', desc: 'Power cut detected. Backup activates in <10ms.' },
      { step: '04', icon: 'CheckCircle2', title: 'Run', desc: 'Appliances continue without a flicker.' }
    ],
    benefits: [
      { icon: "Zap", title: "True Zero Switchover", desc: "Transition to backup power happens in under 10 milliseconds — zero reboot risk." },
      { icon: "Sun", title: "Space-Saving Design", desc: "Wall-mountable, compact chassis replaces heavy, messy external lead-acid batteries." },
      { icon: "ShieldCheck", title: "LFP Cell Safety", desc: "Advanced Lithium Iron Phosphate chemistry prevents thermal runaway risks." },
      { icon: "Clock", title: "10-Year Service Life", desc: "Over 4,000 charge cycles offer a decade of maintenance-free operation." }
    ],
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
    perfectFor: [
      { label: "Apartments & Modern Homes", sub: "Sleek wall-mounted design with zero footprint" },
      { label: "IT Workstations & Home Offices", sub: "Zero transfer time keeps PCs from rebooting" }
    ],
    faqs: [
      { q: "How long do lithium UPS batteries last?", a: "Lithium LFP batteries last 8–10 years (4,000+ charge cycles) compared to 2–3 years for tubular batteries." }
    ]
  },

  'home-ups': {
    showHero: true,
    heroSubtitle: "Residential Backup",
    heroTitle: "Home UPS System",
    heroImage: "/images/home_ups_hero.webp",
    heroDesc: "Reliable residential UPS systems providing clean pure sine-wave electricity during power cuts.",
    showStats: true,
    stat1Value: "Pure", stat1Label: "Sine Wave Output",
    stat2Value: "Instant", stat2Label: "Auto Switch",
    stat3Value: "100%", stat3Label: "Appliance Safe",
    stat4Value: "15,000+", stat4Label: "Homes Powered",
    description: "Pure sine wave home UPS systems protect sensitive electronics while keeping your lights and fans running smoothly.",
    overviewSubtitle: "Comfort & Continuity for Your Home",
    overviewTitle: "Power That Keeps Your Home Running.",
    overviewDesc1: "Provides uninterrupted power supply during outages by storing energy in batteries and supplying it instantly.",
    overviewDesc2: "Spectrum Powers offers customized UPS solutions based on your home's exact power requirements.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Zap', title: 'Charge', desc: 'Electricity charges the UPS battery.' },
      { step: '02', icon: 'Battery', title: 'Store', desc: 'UPS stores energy efficiently in battery.' },
      { step: '03', icon: 'Activity', title: 'Detect', desc: 'Power cut detected instantly.' },
      { step: '04', icon: 'Clock', title: 'Switch', desc: 'UPS instantly supplies backup power.' },
      { step: '05', icon: 'Home', title: 'Run', desc: 'Appliances continue running smoothly.' }
    ],
    benefits: [
      { icon: "Zap", title: "No Interruption in Daily Life", desc: "Switches to battery power in milliseconds — your family doesn't even notice the power cut." },
      { icon: "Home", title: "Supports Home Appliances", desc: "Lights, fans, TV, Wi-Fi and more — all kept running during outages." },
      { icon: "ShieldCheck", title: "Safe & Stable Voltage", desc: "Pure sine wave output protects all sensitive electronics in your home." }
    ],
    advancedFeatures: [
      "Pure Sine Wave Inverter",
      "Microcontroller Based Design",
      "Multi-Stage Smart Charging",
      "Wide Input Voltage Window",
      "Overload & Short Circuit Protection"
    ],
    perfectFor: [
      { label: "Residential Homes & Apartments", sub: "Keep lights, fans, TVs, and refrigerators running during power cuts" }
    ],
    faqs: [
      { q: "What capacity UPS do I need for my home?", a: "A standard 1kVA system powers lights, fans, and TV. For refrigerators and ACs, 2kVA to 5kVA systems are recommended." }
    ]
  },

  'inverters': {
    showHero: true,
    heroSubtitle: "Power Conversion",
    heroTitle: "Home & Commercial Inverters",
    heroImage: "/images/inverter_hero.webp",
    heroDesc: "High-efficiency pure sine wave inverters engineered for homes, shops, and commercial establishments.",
    showStats: true,
    stat1Value: "99%", stat1Label: "Conversion Efficiency",
    stat2Value: "Pure", stat2Label: "Sine Wave Output",
    stat3Value: "Auto", stat3Label: "Grid Switchover",
    stat4Value: "20,000+", stat4Label: "Inverters Installed",
    description: "High-performance DSP-controlled power inverters for home, office, and small shops.",
    overviewSubtitle: "Smart Power Conversion Solutions",
    overviewTitle: "Smart Conversion. Reliable Power.",
    overviewDesc1: "Converts stored DC power from batteries into usable AC power for your appliances with total surge protection.",
    overviewDesc2: "Advanced digital inverter technology ensures silent, efficient performance across all load capacities.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Battery', title: 'Store', desc: 'Battery stores DC power during normal supply.' },
      { step: '02', icon: 'Activity', title: 'Detect', desc: 'Inverter detects grid failure instantly.' },
      { step: '03', icon: 'Zap', title: 'Convert', desc: 'DC from battery converted to clean AC.' },
      { step: '04', icon: 'ShieldCheck', title: 'Protect', desc: 'Stable, regulated output protects appliances.' },
      { step: '05', icon: 'Clock', title: 'Sustain', desc: 'Continuous stable power until grid returns.' }
    ],
    benefits: [
      { icon: "Zap", title: "High Surge Capability", desc: "Starts heavy inductive loads like motors, pumps, and laser printers easily." },
      { icon: "Sun", title: "Dual Charging Modes", desc: "Supports both quick charging and normal charging to adapt to grid schedules." }
    ],
    advancedFeatures: [
      "DSP Microcontroller Inverter",
      "High Surge Capacity Design",
      "Dual Mode Charging Support",
      "Automatic Voltage Regulation"
    ],
    perfectFor: [
      { label: "Shops & Commercial Stores", sub: "Continuous power for lighting, billing computers, and displays" }
    ],
    faqs: [
      { q: "What is the difference between an Inverter and a UPS?", a: "A UPS has faster switchover time (<10ms) designed for computers, while standard inverters switch in 15–20ms." }
    ]
  },

  'online-ups': {
    showHero: true,
    heroSubtitle: "Critical Load Protection",
    heroTitle: "True Online UPS",
    heroImage: "/images/online_ups_hero.webp",
    heroDesc: "Double conversion Online UPS systems providing zero transfer time and total surge protection for mission-critical equipment.",
    showStats: true,
    stat1Value: "0ms", stat1Label: "Transfer Time",
    stat2Value: "Double", stat2Label: "Conversion Tech",
    stat3Value: "100%", stat3Label: "Voltage Regulation",
    stat4Value: "1,200+", stat4Label: "Critical Systems",
    description: "Provides clean, stabilized voltage always regenerated from the battery bank, completely isolating load from grid noise.",
    overviewSubtitle: "Ultimate Power Protection Solution",
    overviewTitle: "Zero Delay. Total Protection.",
    overviewDesc1: "Provides continuous power by constantly running loads off the inverter via double conversion.",
    overviewDesc2: "Ideal for data centers, medical diagnostic equipment, servers, and sensitive industrial machines.",
    showHowItWorks: true,
    howItWorksSteps: [
      { step: '01', icon: 'Activity', title: 'AC to DC', desc: 'Incoming utility AC power is rectified to DC power.' },
      { step: '02', icon: 'Battery', title: 'Charge', desc: 'DC power keeps the battery bank fully charged.' },
      { step: '03', icon: 'Zap', title: 'DC to AC', desc: 'Inverter converts DC back to clean, stable AC.' },
      { step: '04', icon: 'ShieldCheck', title: 'Regulate', desc: 'Zero transfer time (0ms) double-conversion filters spikes.' },
      { step: '05', icon: 'CheckCircle2', title: 'Protect', desc: 'Connected critical loads receive perfect 230V sine wave.' }
    ],
    benefits: [
      { icon: "Server", title: "Zero Transfer. Zero Downtime.", desc: "Equipment receives continuous clean power 24/7 — no switching, no gaps, no disruption ever." },
      { icon: "Zap", title: "Zero Transfer Time", desc: "Double conversion ensures no power gap whatsoever during outages." }
    ],
    advancedFeatures: [
      "True Double Conversion Tech",
      "Zero Switch Transfer (0ms)",
      "Pure Sine Wave Output",
      "Active Input Power Correction"
    ],
    perfectFor: [
      { label: "Hospitals & Medical Labs", sub: "Zero-delay power for life-critical diagnostic equipment" },
      { label: "Data Centers & IT Servers", sub: "Clean double-conversion power preventing server reboots" }
    ],
    faqs: [
      { q: "Why is an Online UPS better for servers?", a: "Because it continuously regulates voltage with true zero millisecond transfer time." }
    ]
  },

  'lithium-batteries': {
    showHero: true,
    heroSubtitle: "LFP Energy Storage",
    heroTitle: "LFP Lithium Batteries",
    heroImage: "/images/lithium_battery_hero.webp",
    heroDesc: "High-density Lithium Iron Phosphate (LiFePO4) battery packs for solar power systems and energy backup.",
    showStats: true,
    stat1Value: "4,000+", stat1Label: "Charge Cycles",
    stat2Value: "10 Yrs", stat2Label: "Design Lifespan",
    stat3Value: "1/3rd", stat3Label: "Weight of Lead-Acid",
    stat4Value: "8,500+", stat4Label: "Packs Shipped",
    description: "Premium Lithium Iron Phosphate (LifePO4) storage batteries with integrated BMS monitors.",
    overviewSubtitle: "The Future of Energy Storage",
    overviewTitle: "Smarter. Longer-Lasting.",
    overviewDesc1: "LFP technology delivers fast 2-hour charging, high depth of discharge, and zero maintenance.",
    overviewDesc2: "Spectrum Powers supplies premium lithium battery banks engineered for solar and UPS integration.",
    advancedFeatures: [
      "Advanced LifePO4 Chemistry",
      "Smart Integrated BMS",
      "4000+ Lifetime Charge Cycles",
      "95% Depth of Discharge"
    ],
    perfectFor: [
      { label: "Solar Energy Storage", sub: "High cycle life ideal for daily solar charge/discharge" }
    ],
    faqs: [
      { q: "Are lithium batteries safe for indoors?", a: "Yes. LiFePO4 (LFP) chemistry is non-combustible, thermal-runaway safe, and completely sealed with no toxic fumes." }
    ]
  },

  'tubular-batteries': {
    showHero: true,
    heroSubtitle: "Lead-Acid Value",
    heroTitle: "Tall Tubular Batteries",
    heroImage: "/images/tubular_battery_hero.webp",
    heroDesc: "Heavy-duty deep cycle tall tubular batteries designed for long power outages and high power demands.",
    showStats: true,
    stat1Value: "Deep", stat1Label: "Cycle Discharge",
    stat2Value: "Heavy", stat2Label: "Duty Alloy Grid",
    stat3Value: "5 Yrs", stat3Label: "Warranty",
    stat4Value: "25,000+", stat4Label: "Batteries Sold",
    description: "Heavy duty tall tubular battery designed to withstand deep discharges and long power outage cycles in Indian conditions.",
    overviewSubtitle: "Proven Deep-Cycle Performance",
    overviewTitle: "Built for Long Power Cuts.",
    overviewDesc1: "Tubular plate design ensures high resistance to deep discharge and harsh temperature conditions.",
    overviewDesc2: "Ideal for long backup hours in homes, offices, and rural locations across India.",
    advancedFeatures: [
      "Tall Tubular Container",
      "Thick Cast Positive Plate Grid",
      "Low Antimony Grid Alloy",
      "High Acid Reserve Design"
    ],
    perfectFor: [
      { label: "Long Power Outage Zones", sub: "Rugged lead-acid backups built for extended 6-12 hour power outages" }
    ],
    faqs: [
      { q: "How often do tubular batteries need distilled water topping?", a: "Typically every 3–6 months depending on usage." }
    ]
  }
};
