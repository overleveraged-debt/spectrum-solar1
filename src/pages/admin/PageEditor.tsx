import React, { useState, useEffect } from 'react';
import { sanityClient } from '../../lib/sanityClient';
import { Save, Upload, Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, ChevronRight, Plus, Trash2 } from 'lucide-react';
import ProductsEditor from './editors/ProductsEditor';
import MapPinsEditor from './editors/MapPinsEditor';
import BenefitsEditor from './editors/BenefitsEditor';
import PerfectForEditor from './editors/PerfectForEditor';
import TestimonialsEditor from './editors/TestimonialsEditor';
import StatsEditor from './editors/StatsEditor';
import WhyItemsEditor from './editors/WhyItemsEditor';
import PositionsEditor from './editors/PositionsEditor';
import OfficesEditor from './editors/OfficesEditor';
import SectionsEditor from './editors/SectionsEditor';
import ComparisonSectionEditor from './editors/ComparisonSectionEditor';
import HowItWorksStepsEditor from './editors/HowItWorksStepsEditor';
import InstallationStepsEditor from './editors/InstallationStepsEditor';
import AdvancedFeaturesEditor from './editors/AdvancedFeaturesEditor';
import FaqsEditor from './editors/FaqsEditor';
import { defaultPagesData } from '../../data/pageDefaults';
import { KERALA_GEOJSON } from '../../data/keralaGeojson';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Setup marker options icon
L.Marker.prototype.options.icon = DefaultIcon;

const EXPANDING_TEXTAREA_CLASS = "w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all duration-300 h-9 focus:h-28 resize-none py-2.5 overflow-y-auto";

// Custom Yellow Icon for Spectrum Pins
const yellowIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #facc15; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 15px #facc15;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

interface PageEditorProps {
  pageId: string;
  onDirtyChange?: (isDirty: boolean) => void;
}

// Section groups mapping to make form structured and clean
const pageSectionGroups: Record<string, Array<{
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
      description: 'Configure background nature image, core taglines, and description.',
      fields: ['whySpectrumSubtitle', 'whySpectrumTitle', 'whySpectrumDesc', 'whySpectrumBgImage']
    },
    {
      id: 'whyGoSolar',
      title: 'Why Go Solar Section',
      description: 'Configure illustrations and titles explaining solar advantages.',
      fields: ['whyGoSolarSubtitle', 'whyGoSolarTitle', 'whyGoSolarImage']
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
      description: 'Configure CEO photo, name, title, and quote message.',
      fields: ['showCeoMessage', 'ceoSubtitle', 'ceoTitle', 'ceoName', 'ceoRole', 'ceoImage', 'ceoMessage']
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
  calculators: [
    {
      id: 'params',
      title: 'Calculators Pricing Parameters',
      description: 'Modify variables used to compute ROI and payback periods.',
      fields: ['costPerKW', 'blendedTariff']
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
      id: 'stats',
      title: 'Careers Statistics',
      description: 'Configure value/label pairs displayed in the stats bar.',
      fields: ['showStats', 'stats']
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
const fieldMeta: Record<string, { label: string; desc?: string; placeholder?: string }> = {
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

const productOptions = [
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

export default function PageEditor({ pageId, onDirtyChange }: PageEditorProps) {
  const [selectedProduct, setSelectedProduct] = useState('on-grid');
  const [data, setData] = useState<any>(null);
  const [originalData, setOriginalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Track open accordion group
  const [openGroup, setOpenGroup] = useState<string | null>('hero');

  // Track open card index for editors
  const [activePinIdx, setActivePinIdx] = useState<number | null>(0);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const [activeProdCardIdx, setActiveProdCardIdx] = useState<number | null>(null);


  // Determine active document ID
  const activeFetchId = pageId === 'product-details' ? selectedProduct : pageId;

  const isDirty = data && originalData ? JSON.stringify(data) !== JSON.stringify(originalData) : false;

  useEffect(() => {
    if (onDirtyChange) {
      onDirtyChange(isDirty);
    }
  }, [isDirty, onDirtyChange]);

  // Prevent browser reload/close when dirty
  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes in your page editor. Are you sure you want to leave?';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Fetch page content
  useEffect(() => {
    let isMounted = true;
    const fetchPageContent = async () => {
      setLoading(true);
      setStatus(null);
      try {
        const query = `*[_type == "pageContent" && pageId == $pageId][0]`;
        const result = await sanityClient.fetch(query, { pageId: activeFetchId });
        
        if (isMounted) {
          if (result && result.content) {
            const parsed = JSON.parse(result.content);
            const defaults = defaultPagesData[activeFetchId] || {};
            const combined = { ...defaults, ...parsed };
            if (Array.isArray(defaults.benefits) && Array.isArray(parsed.benefits)) {
              combined.benefits = defaults.benefits.map((defItem: any, idx: number) => parsed.benefits[idx] || defItem);
            }
            if (Array.isArray(defaults.perfectFor) && Array.isArray(parsed.perfectFor)) {
              combined.perfectFor = defaults.perfectFor.map((defItem: any, idx: number) => parsed.perfectFor[idx] || defItem);
            }
            if (Array.isArray(defaults.howItWorksSteps) && Array.isArray(parsed.howItWorksSteps)) {
              combined.howItWorksSteps = defaults.howItWorksSteps.map((defItem: any, idx: number) => parsed.howItWorksSteps[idx] || defItem);
            }
            setData(combined);
            setOriginalData(combined);
          } else {
            const defaults = defaultPagesData[activeFetchId] || {};
            setData(defaults);
            setOriginalData(defaults);
          }
        }
      } catch (err) {
        console.error('Failed to fetch from Sanity', err);
        if (isMounted) {
          const defaults = defaultPagesData[activeFetchId] || {};
          setData(defaults);
          setOriginalData(defaults);
          setStatus({
            type: 'error',
            message: 'Could not connect to Sanity CMS. Using offline fallback.'
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPageContent();
    return () => {
      isMounted = false;
    };
  }, [pageId, activeFetchId]);

  // Handle saving
  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await sanityClient.createOrReplace({
        _type: 'pageContent',
        _id: `page-${activeFetchId}`,
        pageId: activeFetchId,
        pageName: `${activeFetchId.charAt(0).toUpperCase() + activeFetchId.slice(1)} Config`,
        content: JSON.stringify(data),
      });
      setOriginalData(data);
      setStatus({ type: 'success', message: 'Page settings saved successfully!' });
    } catch (err: any) {
      console.error(err);
      setStatus({
        type: 'error',
        message: err.message || 'Failed to save changes. Make sure Sanity Write Token is set.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (key: string, value: any) => {
    setData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(key);
    setStatus(null);

    try {
      const asset = await sanityClient.assets.upload('image', file, {
        filename: file.name,
      });

      setData((prev: any) => ({ ...prev, [key]: asset.url }));
      setStatus({ type: 'success', message: 'Image uploaded successfully!' });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to upload image. Write token is required.' });
    } finally {
      setUploadingImage(null);
    }
  };

  const renderProductsEditor = () => (
    <ProductsEditor
      products={data.products || []}
      activeIdx={activeProdCardIdx ?? 0}
      setActiveIdx={setActiveProdCardIdx}
      onChange={(newList) => handleFieldChange('products', newList)}
      textareaClass={EXPANDING_TEXTAREA_CLASS}
    />
  );

  const renderWhyItemsEditor = () => (
    <WhyItemsEditor whyItems={data.whyItems || []} onChange={(newList) => handleFieldChange('whyItems', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderStatsListEditor = () => (
    <StatsEditor stats={data.stats || []} onChange={(newList) => handleFieldChange('stats', newList)} />
  );

  const renderPositionsEditor = () => (
    <PositionsEditor positions={data.openPositions || []} onChange={(newList) => handleFieldChange('openPositions', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderOfficesEditor = () => (
    <OfficesEditor offices={data.offices || []} onChange={(newList) => handleFieldChange('offices', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderFaqsEditor = () => (
    <FaqsEditor faqs={data.faqs || []} activeFaqIdx={activeFaqIdx} setActiveFaqIdx={setActiveFaqIdx} onChange={(newList) => handleFieldChange('faqs', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderHowItWorksStepsEditor = () => (
    <HowItWorksStepsEditor howItWorksSteps={data.howItWorksSteps || []} onChange={(newList) => handleFieldChange('howItWorksSteps', newList)} />
  );

  const renderBenefitsListEditor = () => (
    <BenefitsEditor benefits={data.benefits || []} onChange={(newList) => handleFieldChange('benefits', newList)} />
  );

  const renderPerfectForListEditor = () => (
    <PerfectForEditor perfectFor={data.perfectFor || []} onChange={(newList) => handleFieldChange('perfectFor', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderComparisonSectionEditor = () => (
    <ComparisonSectionEditor tiers={data.comparisonTiers || []} rows={data.comparisonRows || []} onTiersChange={(newList) => handleFieldChange('comparisonTiers', newList)} onRowsChange={(newList) => handleFieldChange('comparisonRows', newList)} />
  );

  const renderInstallationTimelineEditor = () => (
    <InstallationStepsEditor installationSteps={data.installationSteps || []} onChange={(newList) => handleFieldChange('installationSteps', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderAdvancedFeaturesListEditor = () => (
    <AdvancedFeaturesEditor advancedFeatures={data.advancedFeatures || []} onChange={(newList) => handleFieldChange('advancedFeatures', newList)} />
  );

  const renderSectionsEditor = () => (
    <SectionsEditor sections={data.sections || []} onChange={(newList) => handleFieldChange('sections', newList)} />
  );

  const renderTestimonialsEditor = () => (
    <TestimonialsEditor testimonials={data.testimonials || []} onChange={(newList) => handleFieldChange('testimonials', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderPinsEditor = () => (
    <MapPinsEditor pins={data.pins || []} activePinIdx={activePinIdx} setActivePinIdx={setActivePinIdx} onChange={(newList: any[]) => handleFieldChange('pins', newList)} />
  );

  const renderOverviewCardsEditor = () => {
    const list = data.overviewCards || [];
    return (
      <div className="space-y-4 md:col-span-2">
        <label className="text-sm font-bold text-white block">Overview Highlight Spec Cards (Max 4)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => {
            const item = list[idx] || { label: `Spec ${idx + 1}`, value: "Value" };
            return (
              <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Label</label>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...item, label: e.target.value };
                      handleFieldChange('overviewCards', newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                    placeholder="e.g. Output"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Value</label>
                  <input
                    type="text"
                    value={item.value || ''}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...item, value: e.target.value };
                      handleFieldChange('overviewCards', newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                    placeholder="e.g. Pure Sine Wave"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSpecsListEditor = () => {
    const list = data.specs || [];
    return (
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Technical Specifications Table</label>
        {list.map((item: any, idx: number) => (
          <div key={idx} className="grid grid-cols-12 gap-2 bg-zinc-950 p-3 rounded-2xl border border-zinc-900 items-center">
            <div className="col-span-5">
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], label: e.target.value };
                  handleFieldChange('specs', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none font-bold"
                placeholder="Spec Label (e.g. Capacity)"
              />
            </div>
            <div className="col-span-5">
              <input
                type="text"
                value={item.value || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], value: e.target.value };
                  handleFieldChange('specs', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="Spec Value (e.g. 10kW)"
              />
            </div>
            <div className="col-span-2 text-right">
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('specs', newList);
                }}
                className="text-rose-400 text-xs font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { label: 'Property', value: 'Details' }];
            handleFieldChange('specs', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors"
        >
          + Add Spec Row
        </button>
      </div>
    );
  };

  const renderFeaturesListEditor = () => {
    const list = data.features || [];
    return (
      <div className="space-y-4 md:col-span-2">
        <label className="text-sm font-bold text-white block">Key Features Checklist ({list.length})</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 p-3 rounded-2xl relative">
              <input
                type="text"
                value={feature || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = e.target.value;
                  handleFieldChange('features', newList);
                }}
                className="flex-1 bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="e.g. Pure Sine Wave output"
              />
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('features', newList);
                }}
                className="text-rose-400 hover:text-rose-350 text-xs font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const newList = [...list, 'New Feature Item'];
            handleFieldChange('features', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add Feature Checkpoint
        </button>
      </div>
    );
  };

  const renderField = (key: string, val: any) => {
    const isBoolean = typeof val === 'boolean';
    const isImage = (typeof val === 'string' && (val.startsWith('http') || val.includes('/images/') || val.includes('.webp') || val.includes('.png') || val.includes('.jpg'))) ||
                    key.toLowerCase().includes('image') ||
                    key.toLowerCase().includes('img') ||
                    key.toLowerCase().includes('photo') ||
                    key.toLowerCase().includes('banner');
    const isVideo = key.toLowerCase().includes('video') || key.toLowerCase().includes('vid');

    const meta = fieldMeta[key] || {
      label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
      desc: '',
      placeholder: ''
    };

    const isTextArea = (key.toLowerCase().includes('text') || key.toLowerCase().includes('desc')) && !key.toLowerCase().includes('title') && !key.toLowerCase().includes('subtitle');
    const isFullWidth = isTextArea || isImage || isVideo;
    const colSpanClass = isFullWidth ? 'md:col-span-2' : 'col-span-1';

    if (isBoolean) {
      return (
        <div key={key} className={`flex items-center justify-between p-5 bg-zinc-950 border border-zinc-900 rounded-2xl ${colSpanClass}`}>
          <div>
            <label className="font-semibold text-sm block text-white">{meta.label}</label>
            {meta.desc && <span className="text-xs text-zinc-500 mt-1 block">{meta.desc}</span>}
          </div>
          <button
            onClick={() => handleFieldChange(key, !val)}
            className={`w-14 h-8 rounded-full transition-all duration-300 relative p-1 ${
              val ? 'bg-yellow-400' : 'bg-zinc-800'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-zinc-950 transition-all duration-300 transform ${
                val ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      );
    }

    if (isImage) {
      return (
        <div key={key} className={`space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl ${colSpanClass}`}>
          <div>
            <label className="font-semibold text-sm text-zinc-300 block">{meta.label}</label>
            {meta.desc && <span className="text-xs text-zinc-500 mt-1 block">{meta.desc}</span>}
          </div>
          <div className="flex items-center gap-6 pt-2">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-black border border-zinc-880 flex-shrink-0 flex items-center justify-center">
              {val ? (
                <img src={val} alt={meta.label} className="w-full h-full object-cover" />
              ) : (
                <span className="text-zinc-700 text-xs">No Image</span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(key, e)}
                  className="hidden"
                  id={`file-upload-${key}`}
                  disabled={uploadingImage !== null}
                />
                <label
                  htmlFor={`file-upload-${key}`}
                  className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs py-2 px-4 rounded-xl cursor-pointer transition-colors"
                >
                  {uploadingImage === key ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>Upload Photo</span>
                </label>
              </div>
              <input
                type="text"
                value={val || ''}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 text-zinc-400 text-xs rounded-xl py-2 px-3 focus:border-zinc-700 outline-none"
                placeholder={meta.placeholder || 'Image path or URL'}
              />
            </div>
          </div>
        </div>
      );
    }

    if (isVideo) {
      return (
        <div key={key} className={`space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl ${colSpanClass}`}>
          <div>
            <label className="font-semibold text-sm text-zinc-300 block">{meta.label}</label>
            {meta.desc && <span className="text-xs text-zinc-500 mt-1 block">{meta.desc}</span>}
          </div>
          <input
            type="text"
            value={val || ''}
            onChange={(e) => handleFieldChange(key, e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-3 px-4 text-sm focus:border-yellow-400/50 outline-none transition-colors"
            placeholder={meta.placeholder || 'Enter video file link...'}
          />
        </div>
      );
    }

    return (
      <div key={key} className={`space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl ${colSpanClass}`}>
        <div>
          <label className="font-semibold text-sm text-zinc-300 block">{meta.label}</label>
          {meta.desc && <span className="text-xs text-zinc-500 mt-1 block">{meta.desc}</span>}
        </div>
        {isTextArea ? (
          <textarea
            value={val || ''}
            onChange={(e) => handleFieldChange(key, e.target.value)}
            rows={4}
            className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-3 px-4 text-sm focus:border-yellow-400/50 outline-none transition-colors"
            placeholder={meta.placeholder}
          />
        ) : (
          <input
            type="text"
            value={val || ''}
            onChange={(e) => handleFieldChange(key, e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-3 px-4 text-sm focus:border-yellow-400/50 outline-none transition-colors"
            placeholder={meta.placeholder}
          />
        )}
      </div>
    );
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
        <p className="text-zinc-400 text-sm">Fetching configuration data...</p>
      </div>
    );
  }

  const groups = (pageSectionGroups[pageId] || []).filter(group => {
    if (pageId === 'product-details') {
      const noHowItWorks = ['on-grid', 'lithium-batteries', 'tubular-batteries'];
      if (noHowItWorks.includes(selectedProduct) && group.id === 'how-it-works') {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Product Detail Selection Dropdown */}
      {pageId === 'product-details' && (
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <label className="text-sm font-bold text-white block">Selected Product Page</label>
            <span className="text-xs text-zinc-500 mt-1 block">Choose which individual product description and specs you want to configure.</span>
          </div>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3.5 px-5 text-sm focus:border-yellow-400/50 outline-none w-full md:w-80 cursor-pointer font-semibold"
          >
            {productOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Top Banner Status */}
      {status && (
        <div
          className={`flex items-start gap-3 p-4 rounded-2xl border ${
            status.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}
      {/* Accordion Groups List */}
      {pageId === 'map-locations' ? (
        <div className="bg-zinc-900/60 p-8 border border-zinc-800 rounded-[2.5rem] space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="font-bold text-lg text-white">Map Pins Locations</h3>
            <p className="text-xs text-zinc-500 mt-1">Configure pin points, hover details, and Google Maps links directly on the interactive map below.</p>
          </div>
          {renderPinsEditor()}
        </div>
      ) : (
        <div className="border border-zinc-800 rounded-[2rem] bg-zinc-900 divide-y divide-zinc-800 overflow-hidden">
          {groups.map((group) => {
            const isOpen = openGroup === group.id;
            const toggleFieldKey = group.fields.find(field => field.startsWith('show'));
            const toggleVal = toggleFieldKey ? (data[toggleFieldKey] ?? true) : true;
            
            return (
              <div key={group.id} className="bg-zinc-900 transition-all duration-300">
                <button
                  onClick={() => setOpenGroup(isOpen ? null : group.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-zinc-850/50 transition-colors text-left"
                >
                  <div>
                    <h3 className="font-bold text-base text-white">{group.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{group.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {toggleFieldKey && (
                      <div 
                        className="flex items-center gap-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${toggleVal ? 'text-yellow-400' : 'text-zinc-600'}`}>
                          {toggleVal ? 'Visible' : 'Hidden'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleFieldChange(toggleFieldKey, !toggleVal)}
                          className={`w-11 h-6.5 rounded-full transition-all duration-300 relative p-0.5 flex items-center ${
                            toggleVal ? 'bg-yellow-400' : 'bg-zinc-800'
                          }`}
                          style={{ width: '44px', height: '24px' }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-zinc-950 transition-all duration-300 transform ${
                              toggleVal ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    )}
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 border-t border-zinc-850/50 bg-zinc-900 space-y-6">
                    <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                      {group.fields.filter((fieldKey) => fieldKey !== toggleFieldKey).length === 0 ? (
                        <div className="text-zinc-500 text-xs py-2 italic">
                          This section is controlled entirely by the visibility toggle switch above. There are no additional settings for this section.
                        </div>
                      ) : (
                        group.fields
                          .filter((fieldKey) => fieldKey !== toggleFieldKey)
                          .map((fieldKey) => {
                            if (fieldKey === 'sections') {
                              return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderSectionsEditor()}</div>;
                            }
                            if (fieldKey === 'testimonials') {
                              return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderTestimonialsEditor()}</div>;
                            }
                          if (fieldKey === 'pins') {
                            return <div key={fieldKey} className="space-y-2">{renderPinsEditor()}</div>;
                          }
                          if (fieldKey === 'products') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderProductsEditor()}</div>;
                          }
                          if (fieldKey === 'stats') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderStatsListEditor()}</div>;
                          }
                          if (fieldKey === 'whyItems') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderWhyItemsEditor()}</div>;
                          }
                          if (fieldKey === 'openPositions') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderPositionsEditor()}</div>;
                          }
                          if (fieldKey === 'offices') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderOfficesEditor()}</div>;
                          }
                          if (fieldKey === 'faqs') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderFaqsEditor()}</div>;
                          }
                          if (fieldKey === 'benefits') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderBenefitsListEditor()}</div>;
                          }
                          if (fieldKey === 'perfectFor') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderPerfectForListEditor()}</div>;
                          }
                          if (fieldKey === 'comparisonTiers') {
                            return null; // Rendered inside the comparisonRows block
                          }
                          if (fieldKey === 'comparisonRows') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderComparisonSectionEditor()}</div>;
                          }
                          if (fieldKey === 'installationSteps') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderInstallationTimelineEditor()}</div>;
                          }
                          if (fieldKey === 'advancedFeatures') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderAdvancedFeaturesListEditor()}</div>;
                          }
                          if (fieldKey === 'overviewCards') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderOverviewCardsEditor()}</div>;
                          }
                          if (fieldKey === 'howItWorksSteps') {
                            return <div key={fieldKey} className="space-y-2">{renderHowItWorksStepsEditor()}</div>;
                          }
                          if (fieldKey === 'specs') {
                            return <div key={fieldKey} className="space-y-2">{renderSpecsListEditor()}</div>;
                          }
                          if (fieldKey === 'features') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderFeaturesListEditor()}</div>;
                          }
                          return renderField(fieldKey, data[fieldKey]);
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          {isDirty && (
            <span className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider animate-pulse">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Unsaved Changes
            </span>
          )}
          <span className="text-[11px] text-zinc-500 font-medium">
            💡 <strong className="text-zinc-400 font-semibold">Note:</strong> After saving, please allow up to 3–5 minutes for live website updates to propagate across all cached pages.
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center gap-2 ${
            isDirty
              ? 'bg-yellow-400 hover:bg-yellow-500 text-zinc-950 shadow-lg shadow-yellow-400/20 scale-[1.02]'
              : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-500 cursor-not-allowed opacity-60'
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Configuration...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Page Layout</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
