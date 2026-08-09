// Section groups mapping to make form structured and clean
export const pageSectionGroups: Record<string, Array<{
  id: string;
  title: string;
  description: string;
  fields: string[];
}>> = {
  home: [
    {
      id: 'hero',
      title: 'Hero Banner',
      description: 'Configure the primary title, background video, and poster fallback.',
      fields: ['heroTitle', 'heroVideoUrl', 'heroVideoPoster']
    },
    {
      id: 'stats',
      title: 'Statistics Bar (Black Strip)',
      description: 'Configure the 4 key metrics and titles displayed right below the Hero video. Use the toggle to show or hide the bar entirely.',
      fields: [
        'showStatsBar',
        'stat1Value', 'stat1Label',
        'stat2Value', 'stat2Label',
        'stat3Value', 'stat3Label',
        'stat4Value', 'stat4Label'
      ]
    },
    {
      id: 'solar',
      title: 'Solar Systems Section',
      description: 'Configure heading, banner picture, and the 4 interactive solar product cards.',
      fields: [
        'solarSectionSubtitle', 'solarSectionTitle', 'solarSectionImage',
        'solarBox1Title', 'solarBox1Sub', 'solarBox1Desc',
        'solarBox2Title', 'solarBox2Sub', 'solarBox2Desc',
        'solarBox3Title', 'solarBox3Sub', 'solarBox3Desc',
        'solarBox4Title', 'solarBox4Sub', 'solarBox4Desc'
      ]
    },
    {
      id: 'backup',
      title: 'Backup Systems Section',
      description: 'Configure headings, wide banner, and the 6 power backup product cards.',
      fields: [
        'backupSectionSubtitle', 'backupSectionTitle', 'backupSectionImage',
        'backupBox1Title', 'backupBox1Sub',
        'backupBox2Title', 'backupBox2Sub',
        'backupBox3Title', 'backupBox3Sub',
        'backupBox4Title', 'backupBox4Sub',
        'backupBox5Title', 'backupBox5Sub',
        'backupBox6Title', 'backupBox6Sub'
      ]
    },
    {
      id: 'whySpectrum',
      title: 'Why Spectrum Section',
      description: 'Configure background nature image, core taglines, description, and the 3 key metric stats (Installations, Track Record, Service Rate).',
      fields: [
        'whySpectrumSubtitle', 'whySpectrumTitle', 'whySpectrumDesc', 'whySpectrumBgImage',
        'whySpectrumStat1Value', 'whySpectrumStat1Label',
        'whySpectrumStat2Value', 'whySpectrumStat2Label',
        'whySpectrumStat3Value', 'whySpectrumStat3Label'
      ]
    },
    {
      id: 'whyGoSolar',
      title: 'Why Go Solar Section',
      description: 'Configure illustrations, section titles, and benefit advantage cards.',
      fields: ['whyGoSolarSubtitle', 'whyGoSolarTitle', 'whyGoSolarImage', 'whyGoSolarBoxes']
    },
    {
      id: 'heritage',
      title: 'Heritage & Accreditations',
      description: 'Configure heritage block text, awards, and certificates details.',
      fields: ['heritageSubtitle', 'heritageTitle', 'heritageImage', 'heritageDesc', 'heritageAccreditationTitle', 'heritageAccreditationDesc']
    },
    {
      id: 'contact',
      title: 'Contact Call-to-Action',
      description: 'Configure the bottom call-to-action details, descriptions, and backdrop.',
      fields: ['contactSubtitle', 'contactTitle', 'contactDesc', 'contactBgImage']
    }
  ],
  about: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure title, subtitle, backdrop image and intro text paragraph.',
      fields: ['heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'stats',
      title: 'Statistics Grid',
      description: 'Configure the 4 large counters displayed on the about page. Use the toggle to show or hide the grid entirely.',
      fields: [
        'showStats',
        'stat1Value', 'stat1Label', 'stat1Sub',
        'stat2Value', 'stat2Label', 'stat2Sub',
        'stat3Value', 'stat3Label', 'stat3Sub',
        'stat4Value', 'stat4Label', 'stat4Sub'
      ]
    },
    {
      id: 'heritage',
      title: 'Heritage Section',
      description: 'Configure founded date, headquarters, branch count and descriptive copy.',
      fields: ['heritageSubtitle', 'heritageTitle', 'heritageDesc', 'heritageFounded', 'heritageHeadquarters', 'heritageCenters', 'heritageImage']
    },
    {
      id: 'quality',
      title: 'Quality & Accreditations',
      description: 'Configure brand excellence text, state awards, and illustrational photo.',
      fields: ['qualitySubtitle', 'qualityTitle', 'qualityDesc', 'qualityAwardTitle', 'qualityAwardDesc', 'qualityImage']
    },
    {
      id: 'ceoMessage',
      title: 'CEO & Leadership Message',
      description: 'Configure CEO name, title, and quote message.',
      fields: ['showCeoMessage', 'ceoSubtitle', 'ceoTitle', 'ceoName', 'ceoRole', 'ceoMessage']
    },
    {
      id: 'presence',
      title: 'Regional Presence Map',
      description: 'Configure text content next to the interactive presence map.',
      fields: ['presenceSubtitle', 'presenceTitle', 'presenceDesc']
    },
    {
      id: 'cta',
      title: 'Bottom CTA Panel',
      description: 'Configure the call-to-action yellow box at the bottom of the page.',
      fields: ['ctaTitle', 'ctaDesc']
    }
  ],

  'solar-solutions': [
    {
      id: 'hero',
      title: 'Hero Banner',
      description: 'Configure title, subtitle, intro text, and top background image.',
      fields: ['heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'products',
      title: 'Solar Products Overview List',
      description: 'Configure titles, descriptions, features, specifications, and images for all 4 solar systems.',
      fields: ['products']
    }
  ],
  'power-backup': [
    {
      id: 'hero',
      title: 'Hero Banner',
      description: 'Configure title, subtitle, intro text, and top background image.',
      fields: ['heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'products',
      title: 'Power Backup Products Overview List',
      description: 'Configure titles, descriptions, features, specifications, and images for all 6 power backup systems.',
      fields: ['products']
    }
  ],
  opportunities: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure hero headline, subtext, and banner image.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'stats',
      title: 'Statistics Bar (Black Strip)',
      description: 'Configure the 4 key metrics displayed right below the Hero section.',
      fields: [
        'showStatsBar',
        'stat1Value', 'stat1Label',
        'stat2Value', 'stat2Label',
        'stat3Value', 'stat3Label',
        'stat4Value', 'stat4Label'
      ]
    },
    {
      id: 'cards',
      title: 'Opportunity Offerings Cards',
      description: 'Configure titles, descriptions, investments, and links for Franchise, Dealership, Freelance, and Careers cards.',
      fields: ['opportunities']
    }
  ],
  franchise: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure title, badge label, subtitle and banner.',
      fields: ['showHero', 'heroBadge', 'heroTitle', 'heroSubtitle', 'heroImage']
    },
    {
      id: 'why',
      title: 'Why Start a Franchise',
      description: 'Configure benefits and reasons list.',
      fields: ['whySubtitle', 'whyTitle', 'whyItems']
    },
    {
      id: 'products',
      title: 'What You Can Sell as a Partner',
      description: 'Configure product portfolio items available for franchise partners.',
      fields: ['features']
    },
    {
      id: 'franchiseBenefits',
      title: 'Franchise Benefits Cards',
      description: 'Configure benefit cards displayed on the franchise page.',
      fields: ['franchiseBenefits']
    }
  ],
  dealership: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure title, badge label, subtitle and banner.',
      fields: ['showHero', 'heroBadge', 'heroTitle', 'heroSubtitle', 'heroImage']
    },
    {
      id: 'why',
      title: 'Why Become a Dealer',
      description: 'Configure dealer benefits list.',
      fields: ['whySubtitle', 'whyTitle', 'whyItems']
    },
    {
      id: 'products',
      title: 'What You Sell (Product Range)',
      description: 'Configure product checklist items for dealers.',
      fields: ['features']
    },
    {
      id: 'responsibilities',
      title: 'Dealer Responsibilities Checklist',
      description: 'Configure dealer role responsibilities checklist.',
      fields: ['responsibilities']
    },
    {
      id: 'dealershipBenefits',
      title: 'Dealer Perks (What You Receive)',
      description: 'Configure dealer perks checklist cards.',
      fields: ['dealershipBenefits']
    }
  ],
  freelance: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure title, badge label, subtitle and banner.',
      fields: ['showHero', 'heroBadge', 'heroTitle', 'heroSubtitle', 'heroImage']
    },
    {
      id: 'why',
      title: 'Why Join Freelance Model',
      description: 'Configure partner benefits list.',
      fields: ['whySubtitle', 'whyTitle', 'whyItems']
    },
    {
      id: 'referItems',
      title: 'What You Can Refer Checklist',
      description: 'Configure referral options checklist.',
      fields: ['features']
    },
    {
      id: 'whoCanJoin',
      title: 'Who Can Join Checklist',
      description: 'Configure who can join eligibility checklist.',
      fields: ['whoCanJoin']
    },
    {
      id: 'freelanceBenefits',
      title: 'Benefits of Joining Cards',
      description: 'Configure freelance partner perk cards.',
      fields: ['freelanceBenefits']
    }
  ],
  careers: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure title, subtitle, subtext and banner image.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'why',
      title: 'Why Join Us',
      description: 'Configure list of benefits and title.',
      fields: ['whyTitle', 'whyItems']
    },
    {
      id: 'positions',
      title: 'Open Job Positions',
      description: 'Manage open listings.',
      fields: ['positionsTitle', 'openPositions']
    },
    {
      id: 'faqs',
      title: 'Careers FAQs',
      description: 'Manage job FAQs.',
      fields: ['faqsTitle', 'faqs']
    }
  ],
  support: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure title, subtitle and background banner image.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage']
    },
    {
      id: 'contactInfo',
      title: 'Contacts Information',
      description: 'Edit phone numbers, emails, and availability hours.',
      fields: ['phone', 'email', 'hours']
    },
    {
      id: 'faqs',
      title: 'General Support FAQs',
      description: 'Manage help topics.',
      fields: ['faqsTitle', 'faqs']
    }
  ],
  contact: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure page headlines.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'offices',
      title: 'Our Offices List',
      description: 'Manage office cities and addresses.',
      fields: ['offices']
    }
  ],
  'map-locations': [
    {
      id: 'pins',
      title: 'Map Pins Locations',
      description: 'Manage pin locations, hover tooltips, and Google Maps direction links.',
      fields: ['pins']
    }
  ],
  'product-details': [
    {
      id: 'hero',
      title: 'Hero Banner',
      description: 'Configure product title, subtitle, image, and intro paragraph.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'stats',
      title: 'Statistics Strip (Hero Bottom)',
      description: 'Configure 4 key value metrics displayed in the yellow strip.',
      fields: [
        'showStats',
        'stat1Value', 'stat1Label',
        'stat2Value', 'stat2Label',
        'stat3Value', 'stat3Label',
        'stat4Value', 'stat4Label'
      ]
    },
    {
      id: 'details',
      title: 'Product Overview',
      description: 'Configure introductory overview subtitle, headline, and paragraphs.',
      fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description']
    },
    {
      id: 'how-it-works',
      title: 'How It Works / Mechanism Steps',
      description: 'Configure step-by-step visual process.',
      fields: ['showHowItWorks', 'howItWorksSteps']
    },
    {
      id: 'benefits',
      title: 'Key Benefits (Bento Grid)',
      description: 'Configure key bento advantages grid items.',
      fields: ['benefits']
    },
    {
      id: 'advanced-features',
      title: 'Technical Features (Pill Tags)',
      description: 'Configure engineering bullet point tags.',
      fields: ['advancedFeatures']
    },
    {
      id: 'applications',
      title: 'Perfect For (Target Applications)',
      description: 'Configure target application scenarios (label and sub-description).',
      fields: ['perfectFor']
    },
    {
      id: 'installation',
      title: 'Installation Timeline Process',
      description: 'Configure project phases and timing guidelines.',
      fields: ['installationSteps']
    },
    {
      id: 'faqs',
      title: 'Frequently Asked Questions (FAQ)',
      description: 'Configure product-specific accordion questions.',
      fields: ['faqs']
    }
  ],
  'on-grid': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'hybrid': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'off-grid': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'water-heaters': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'lithium-ups': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'home-ups': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'inverters': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'online-ups': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'lithium-batteries': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'tubular-batteries': [
    { id: 'hero', title: 'Hero Banner', description: 'Configure product title, subtitle, image, and intro paragraph.', fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc'] },
    { id: 'stats', title: 'Statistics Strip', description: 'Configure 4 key value metrics displayed in the yellow strip.', fields: ['showStats', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label'] },
    { id: 'details', title: 'Product Overview', description: 'Configure introductory overview subtitle, headline, and paragraphs.', fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'description'] },
    { id: 'how-it-works', title: 'How It Works / Mechanism Steps', description: 'Configure step-by-step visual process.', fields: ['showHowItWorks', 'howItWorksSteps'] },
    { id: 'benefits', title: 'Key Benefits', description: 'Configure key bento advantages grid items.', fields: ['benefits'] },
    { id: 'advanced-features', title: 'Technical Features', description: 'Configure engineering bullet point tags.', fields: ['advancedFeatures'] },
    { id: 'applications', title: 'Perfect For', description: 'Configure target application scenarios.', fields: ['perfectFor'] },
    { id: 'installation', title: 'Installation Timeline Process', description: 'Configure project phases and timing guidelines.', fields: ['installationSteps'] },
    { id: 'faqs', title: 'Frequently Asked Questions (FAQ)', description: 'Configure product-specific accordion questions.', fields: ['faqs'] }
  ],
  'privacy-policy': [
    {
      id: 'general',
      title: 'Privacy Policy Document Content',
      description: 'Configure content headings and description text.',
      fields: ['title', 'lastUpdated', 'sections']
    }
  ],
  'terms-conditions': [
    {
      id: 'general',
      title: 'Terms & Conditions Document Content',
      description: 'Configure content headings and description text.',
      fields: ['title', 'lastUpdated', 'sections']
    }
  ],
  testimonials: [
    {
      id: 'testimonials-list',
      title: 'Manage Client Testimonials',
      description: 'Add, edit, or delete customer reviews displayed across the website.',
      fields: ['testimonials']
    }
  ],
  footer: [
    {
      id: 'general',
      title: 'Footer Layout Content',
      description: 'Configure brand pitch, social links, and MNRE/ISO accreditations.',
      fields: ['brandPitch', 'instagram', 'facebook', 'linkedin', 'twitter', 'isoCert', 'mnreApproved']
    }
  ]
};

// Rich labels, descriptions and placeholders for inputs
export const fieldMeta: Record<string, { label: string; desc?: string; placeholder?: string }> = {
  brandPitch: { label: 'Footer Brand Pitch Description', desc: 'Short introductory tagline displayed right below the logo in the footer.', placeholder: 'Spectrum Solar is a pioneer...' },
  instagram: { label: 'Instagram Profile Link', desc: 'Social media link for Instagram icon.', placeholder: '#' },
  facebook: { label: 'Facebook Page Link', desc: 'Social media link for Facebook icon.', placeholder: '#' },
  linkedin: { label: 'LinkedIn Profile Link', desc: 'Social media link for LinkedIn icon.', placeholder: '#' },
  twitter: { label: 'Twitter / X Profile Link', desc: 'Social media link for Twitter icon.', placeholder: '#' },
  isoCert: { label: 'ISO Certification Label', desc: 'Accreditation tag in footer.', placeholder: 'ISO 9001:2015' },
  mnreApproved: { label: 'MNRE Approval Label', desc: 'Government approval tag in footer.', placeholder: 'MNRE Approved' },
  showHowItWorks: { label: 'Enable How It Works Section', desc: 'Toggle the visibility of the visual step-by-step mechanism on this product page.' },
  title: { label: 'Document/Page Title', desc: 'Header title of this document.', placeholder: 'e.g. Privacy Policy' },
  lastUpdated: { label: 'Last Updated Date Status', desc: 'Indicate revision date at the top.', placeholder: 'e.g. Last Updated: April 2026' },
  sections: { label: 'Policy Sections List', desc: 'List of policy headers and content paragraphs.' },
  showHero: { label: 'Enable Hero Banner Section', desc: 'Show or hide the video/image banner at the top.' },
  heroTitle: { label: 'Hero Headline', desc: 'The main overlay title on the banner.', placeholder: 'e.g. Precision Since 2002.' },
  heroSubtitle: { label: 'Hero Subtitle', desc: 'Tagline displayed right below the primary headline.', placeholder: 'e.g. Powering India...' },
  heroVideoPoster: { label: 'Video Fallback Poster', desc: 'Image shown on slow networks while background video is loading.', placeholder: '/images/Banner01.jpg' },
  heroVideoUrl: { label: 'Background Video File URL', desc: 'Path or link to the background MP4 video.', placeholder: '/videos/hero-bg.mp4' },
  heroImage: { label: 'Hero Background Image', desc: 'The banner photo used behind headers.', placeholder: '/images/about_hero.webp' },
  heroDesc: { label: 'Hero Description text', desc: 'Short introductory tagline overlay.', placeholder: 'Since 2001, powering thousands...' },
  costPerKW: { label: 'Solar Cost per kW (₹)', desc: 'Base pricing variable used for system size multiplier.', placeholder: '65000' },
  blendedTariff: { label: 'Average KSEB blended tariff rate (₹)', desc: 'Blended price per unit to compute monthly savings.', placeholder: '7.5' },
  phone: { label: 'Helpline Phone Link', desc: 'Toll-free or support phone number.', placeholder: '+91 9447...' },
  email: { label: 'Support Email Address', desc: 'Central contact email.', placeholder: 'support@...' },
  hours: { label: 'Working Hours', desc: 'Operating schedule.', placeholder: '9:00 AM - 6:00 PM...' },
  whySpectrumSubtitle: { label: 'Why Spectrum Section Subtitle', placeholder: 'Why Spectrum' },
  whySpectrumTitle: { label: 'Why Spectrum Section Title', placeholder: "India's Most Trusted Solar Partner." },
  whySpectrumDesc: { label: 'Why Spectrum Paragraph Description', placeholder: '24+ years. 6,145+ Solar Installations...' },
  whySpectrumBgImage: { label: 'Why Spectrum Nature Background Image', placeholder: '/images/nature-kerala.webp' },
  whySpectrumStat1Value: { label: 'Stat 1 Metric Value', desc: 'First stat counter (e.g. 6,145+)', placeholder: '6,145+' },
  whySpectrumStat1Label: { label: 'Stat 1 Metric Label', desc: 'First stat label under number (e.g. INSTALLATIONS)', placeholder: 'Installations' },
  whySpectrumStat2Value: { label: 'Stat 2 Metric Value', desc: 'Second stat counter (e.g. 25yr)', placeholder: '25yr' },
  whySpectrumStat2Label: { label: 'Stat 2 Metric Label', desc: 'Second stat label under number (e.g. TRACK RECORD)', placeholder: 'Track Record' },
  whySpectrumStat3Value: { label: 'Stat 3 Metric Value', desc: 'Third stat counter (e.g. 100%)', placeholder: '100%' },
  whySpectrumStat3Label: { label: 'Stat 3 Metric Label', desc: 'Third stat label under number (e.g. SERVICE RATE)', placeholder: 'Service Rate' },
  whyGoSolarBoxes: { label: 'Why Go Solar Advantage Cards', desc: 'Manage the title and description for each advantage card.' },
  whyTitle: { label: 'Careers Grid Title', desc: 'Header for the Careers grid.', placeholder: 'Why Join Spectrum?' },
  description: { label: 'Product Main Overview', desc: 'Paragraph explaining product capabilities.', placeholder: 'Product details...' },
  showStats: { label: 'Enable Statistics Strip', desc: 'Toggle the yellow stat block visibility.' },

  // Overview Headers
  overviewSubtitle: { label: 'Overview Section Subtitle', desc: 'Sleek orange top subtitle for the overview section.', placeholder: 'e.g. Comfort & Continuity for Your Home' },
  overviewTitle: { label: 'Overview Section Headline', desc: 'Large overlay title for the overview section.', placeholder: 'e.g. Power That Keeps Your Home Running.' },
  overviewDesc1: { label: 'Overview Description Paragraph 1', desc: 'First overview text paragraph.', placeholder: 'Product intro details...' },
  overviewDesc2: { label: 'Overview Description Paragraph 2', desc: 'Second overview text paragraph.', placeholder: 'Secondary details...' },

  // Stats Bar / Grid
  showStatsBar: { label: 'Enable Statistics Bar', desc: 'Show or hide the black statistics strip below the video.' },
  stat1Value: { label: 'Stat 1 Value', placeholder: 'e.g. 25+' },
  stat1Label: { label: 'Stat 1 Label', placeholder: 'e.g. Years of Excellence' },
  stat1Sub: { label: 'Stat 1 Tagline', placeholder: 'e.g. Since 2000' },
  stat2Value: { label: 'Stat 2 Value', placeholder: 'e.g. 40K+' },
  stat2Label: { label: 'Stat 2 Label', placeholder: 'e.g. Satisfied Customers' },
  stat2Sub: { label: 'Stat 2 Tagline', placeholder: 'e.g. Across India' },
  stat3Value: { label: 'Stat 3 Value', placeholder: 'e.g. 6,145+' },
  stat3Label: { label: 'Stat 3 Label', placeholder: 'e.g. Solar Projects' },
  stat3Sub: { label: 'Stat 3 Tagline', placeholder: 'e.g. Installed & Running' },
  stat4Value: { label: 'Stat 4 Value', placeholder: 'e.g. 60+' },
  stat4Label: { label: 'Stat 4 Label', placeholder: 'e.g. Service Engineers' },
  stat4Sub: { label: 'Stat 4 Tagline', placeholder: 'e.g. Certified Experts' },
  positionsTitle: { label: 'Job Positions Header Title', desc: 'Title displayed above job positions.', placeholder: 'Open Positions.' },
  faqsTitle: { label: 'Careers FAQ Header Title', desc: 'Title displayed above Careers FAQs.', placeholder: 'Frequently Asked Questions.' },
  stats: { label: 'Careers Statistics Grid', desc: 'Key-value pairs for the yellow statistics strip.' },
  ticketTitle: { label: 'Ticket Form Headline', desc: 'Title displayed above support intake form.', placeholder: 'Submit a Support Ticket' },
  ticketDesc: { label: 'Ticket Form Subtext', desc: 'Short paragraph explaining form purpose.', placeholder: 'Register a service enquiry...' }
};

export const productOptions = [
  { id: 'on-grid', name: 'On-Grid Solar System' },
  { id: 'hybrid', name: 'Hybrid Solar System' },
  { id: 'off-grid', name: 'Lithium Off-Grid System' },
  { id: 'water-heaters', name: 'Solar Water Heaters' },
  { id: 'lithium-ups', name: 'Lithium Inbuilt UPS' },
  { id: 'home-ups', name: 'Home UPS System' },
  { id: 'inverters', name: 'Home & Commercial Inverters' },
  { id: 'online-ups', name: 'True Online UPS' },
  { id: 'lithium-batteries', name: 'LFP Lithium Batteries' },
  { id: 'tubular-batteries', name: 'Tall Tubular Batteries' }
];
