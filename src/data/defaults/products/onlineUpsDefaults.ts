export const onlineUpsDefaults = {
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
    { icon: "Zap", title: "Zero Transfer Time", desc: "Double conversion ensures no power gap whatsoever during outages." },
    { icon: "ShieldCheck", title: "Isolated Load Power", desc: "Galvanic isolation and double conversion filter all voltage spikes and noise." },
    { icon: "Clock", title: "Active Power Factor Correction", desc: "High input power factor lowers electricity consumption and heat generation." },
    { icon: "Layers", title: "SNMP & Remote Monitoring", desc: "Real-time network monitoring alerts administrators of battery or power status." },
    { icon: "Activity", title: "Redundant Parallel Capability", desc: "Connect multiple units in parallel for scalable capacity or N+1 redundancy." }
  ],
  advancedFeatures: [
    "True Double Conversion Tech",
    "Zero Switch Transfer (0ms)",
    "Pure Sine Wave Output",
    "Active Input Power Correction",
    "Wide Input Voltage Range",
    "Galvanic Isolation Transformer",
    "Emergency Power Off (EPO)",
    "SNMP Network Card Support"
  ],
  perfectFor: [
    { label: "Hospitals & Medical Labs", sub: "Zero-delay power for life-critical diagnostic equipment" },
    { label: "Data Centers & IT Servers", sub: "Clean double-conversion power preventing server reboots" },
    { label: "Industrial Automation Lines", sub: "Protect CNC machines and PLC controllers from power sags" },
    { label: "Broadcasting & Telecom Hubs", sub: "Continuous clean signal without electrical line noise" },
    { label: "Financial Institutions & ATMs", sub: "Non-stop uptime for transaction processing servers" }
  ],
  installationSteps: [
    { title: "Critical Load Assessment", desc: "Determining exact kVA/KW rating, power factor, and runtime requirements." },
    { title: "Battery Bank Setup", desc: "Assembling high-rate battery racks and inter-battery bus bar wiring." },
    { title: "Online UPS Integration", desc: "Hardwiring input/output distribution panels with isolation transformers." },
    { title: "0ms Switchover Test", desc: "Simulating grid utility blackouts under full IT server load conditions." }
  ],
  faqs: [
    { q: "Why is an Online UPS better for servers?", a: "Because it continuously regulates voltage with true zero millisecond transfer time." }
  ]
};
