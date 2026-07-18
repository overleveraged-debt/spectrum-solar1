import React, { useState, useEffect } from 'react';
import { sanityClient } from '../../lib/sanityClient';
import { Save, Upload, Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
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
      description: 'Configure the primary title, background video, poster fallback, and visibility.',
      fields: ['showHero', 'heroTitle', 'heroVideoUrl', 'heroVideoPoster']
    },
    {
      id: 'stats',
      title: 'Statistics Bar (Black Strip)',
      description: 'Configure the 4 key metrics and titles displayed right below the Hero video.',
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
        'showSolarSection', 'solarSectionSubtitle', 'solarSectionTitle', 'solarSectionImage',
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
        'showBackupSection', 'backupSectionSubtitle', 'backupSectionTitle', 'backupSectionImage',
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
      description: 'Configure background nature image, core taglines, description, and visibility.',
      fields: ['showWhySpectrum', 'whySpectrumSubtitle', 'whySpectrumTitle', 'whySpectrumDesc', 'whySpectrumBgImage']
    },
    {
      id: 'whyGoSolar',
      title: 'Why Go Solar Section',
      description: 'Configure illustrations, titles, and visibility explaining solar advantages.',
      fields: ['showWhyGoSolar', 'whyGoSolarSubtitle', 'whyGoSolarTitle', 'whyGoSolarImage']
    },
    {
      id: 'heritage',
      title: 'Heritage & Accreditations',
      description: 'Configure heritage block text, awards, certificates details, and visibility.',
      fields: ['showHeritage', 'heritageSubtitle', 'heritageTitle', 'heritageImage', 'heritageDesc', 'heritageAccreditationTitle', 'heritageAccreditationDesc']
    },

    {
      id: 'contact',
      title: 'Contact Call-to-Action',
      description: 'Configure the bottom call-to-action details, descriptions, backdrop, and visibility.',
      fields: ['showContactCTA', 'contactSubtitle', 'contactTitle', 'contactDesc', 'contactBgImage']
    }
  ],
  about: [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Configure title, subtitle, backdrop image and intro text paragraph.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'stats',
      title: 'Statistics Grid',
      description: 'Configure the 4 large counters displayed on the about page.',
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
      fields: ['showHeritage', 'heritageSubtitle', 'heritageTitle', 'heritageDesc', 'heritageFounded', 'heritageHeadquarters', 'heritageCenters', 'heritageImage']
    },
    {
      id: 'quality',
      title: 'Quality & Accreditations',
      description: 'Configure brand excellence text, state awards, and illustrational photo.',
      fields: ['showQuality', 'qualitySubtitle', 'qualityTitle', 'qualityDesc', 'qualityAwardTitle', 'qualityAwardDesc', 'qualityImage']
    },
    {
      id: 'presence',
      title: 'Regional Presence Map',
      description: 'Configure text content next to the interactive presence map.',
      fields: ['showPresence', 'presenceSubtitle', 'presenceTitle', 'presenceDesc']
    },
    {
      id: 'cta',
      title: 'Bottom CTA Panel',
      description: 'Configure the call-to-action yellow box at the bottom of the page.',
      fields: ['showCTA', 'ctaTitle', 'ctaDesc']
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
      title: 'Product Overview & Features',
      description: 'Configure ultimate product summary details and visual specifications.',
      fields: ['overviewSubtitle', 'overviewTitle', 'overviewDesc1', 'overviewDesc2', 'overviewCards']
    },
    {
      id: 'how-it-works',
      title: 'How It Works Section',
      description: 'Configure and toggle the visibility of the "How It Works" step-by-step visual section on this page.',
      fields: ['showHowItWorks', 'howItWorksSteps']
    },
    {
      id: 'benefits',
      title: 'Key Benefits',
      description: 'Configure key bento advantages grid items.',
      fields: ['benefits']
    },

    {
      id: 'advanced-features',
      title: 'Advanced Features Tag Checkpoints',
      description: 'Configure engineering bullet point tags.',
      fields: ['advancedFeatures']
    },
    {
      id: 'applications',
      title: 'Perfect For',
      description: 'Configure target application scenarios (icons, titles, and descriptions).',
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
  ]
};

// Rich labels, descriptions and placeholders for inputs
const fieldMeta: Record<string, { label: string; desc?: string; placeholder?: string }> = {
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
  { id: 'hybrid-solar', name: 'Hybrid Solar System' },
  { id: 'off-grid', name: 'Lithium Off-Grid System' },
  { id: 'water-heater', name: 'Solar Water Heaters' },
  { id: 'lithium-ups', name: 'Lithium Inbuilt UPS' },
  { id: 'home-ups', name: 'Home UPS System' },
  { id: 'inverters', name: 'Home & Commercial Inverters' },
  { id: 'online-ups', name: 'True Online UPS' },
  { id: 'lithium-battery', name: 'LFP Lithium Batteries' },
  { id: 'tubular-battery', name: 'Tall Tubular Batteries' }
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

  // Track open pin location card index (for map locations editor)
  const [activePinIdx, setActivePinIdx] = useState<number | null>(0);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);


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

  // Render product list dynamically
  const renderProductsEditor = () => {
    const list = data.products || [];
    return (
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Products Catalog Items</label>
        {list.map((prod: any, idx: number) => (
          <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
              <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider">Card #{idx + 1} ({prod.title || 'Untitled'})</span>
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('products', newList);
                }}
                className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Title</label>
                <input
                  type="text"
                  value={prod.title || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], title: e.target.value };
                    handleFieldChange('products', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Category</label>
                <input
                  type="text"
                  value={prod.category || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], category: e.target.value };
                    handleFieldChange('products', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-semibold block">Tagline</label>
              <input
                type="text"
                value={prod.tagline || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], tagline: e.target.value };
                  handleFieldChange('products', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-semibold block">Description</label>
              <textarea
                value={prod.description || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], description: e.target.value };
                  handleFieldChange('products', newList);
                }}
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Image Path</label>
                <input
                  type="text"
                  value={prod.image || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], image: e.target.value };
                    handleFieldChange('products', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Badge (optional)</label>
                <input
                  type="text"
                  value={prod.badge || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], badge: e.target.value };
                    handleFieldChange('products', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-semibold block">Features List (Comma Separated)</label>
              <input
                type="text"
                value={(prod.features || []).join(', ')}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], features: e.target.value.split(',').map(s => s.trim()) };
                  handleFieldChange('products', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { id: `prod-${Date.now()}`, number: String(list.length + 1).padStart(2, '0'), title: 'New Item', category: 'General', tagline: 'Tagline', description: 'Desc', image: '/images/pwr_inverter.jpg', features: ['Feature 1'] }];
            handleFieldChange('products', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product Card
        </button>
      </div>
    );
  };

  // Why items editor
  const renderWhyItemsEditor = () => {
    const list = data.whyItems || [];
    return (
      <div className="space-y-4">
        {/* Table Header Row */}
        {list.length > 0 && (
          <div className="hidden md:flex items-center gap-4 px-5 text-[10px] font-black uppercase tracking-wider text-zinc-500">
            <div className="flex-1">Benefit Card Title</div>
            <div className="flex-[3]">Benefit Description</div>
            <div className="w-16 text-right">Action</div>
          </div>
        )}

        <div className="space-y-2">
          {list.map((item: any, idx: number) => (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-4 relative animate-fade-in">
              <div className="flex-1 space-y-1 md:space-y-0">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Benefit Card Title</label>
                <input
                  type="text"
                  placeholder="e.g. Growth Opportunities"
                  value={item.title || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], title: e.target.value };
                    handleFieldChange('whyItems', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="flex-[3] space-y-1 md:space-y-0">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Benefit Description</label>
                <textarea
                  placeholder="Benefit description..."
                  value={item.desc || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], desc: e.target.value };
                    handleFieldChange('whyItems', newList);
                  }}
                  className={EXPANDING_TEXTAREA_CLASS}
                />
              </div>

              <div className="w-16 flex items-center justify-end mt-2 md:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    const newList = [...list];
                    newList.splice(idx, 1);
                    handleFieldChange('whyItems', newList);
                  }}
                  className="text-rose-400 hover:text-rose-300 text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            const newList = [...list, { title: 'New Benefit', desc: 'Benefit description' }];
            handleFieldChange('whyItems', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Benefit Item
        </button>
      </div>
    );
  };

  const renderStatsListEditor = () => {
    const list = data.stats || [];
    return (
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Careers Statistics List</label>
        
        {/* Table Header Row */}
        {list.length > 0 && (
          <div className="hidden md:flex items-center gap-4 px-5 text-[10px] font-black uppercase tracking-wider text-zinc-500">
            <div className="flex-1">Statistic Value (e.g. 25 Yrs)</div>
            <div className="flex-1">Statistic Label (e.g. Brand Legacy)</div>
            <div className="w-16 text-right">Action</div>
          </div>
        )}

        <div className="space-y-2">
          {list.map((item: any, idx: number) => (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-4 relative animate-fade-in">
              <div className="flex-1 space-y-1 md:space-y-0">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Stat Value</label>
                <input
                  type="text"
                  placeholder="e.g. 25 Yrs"
                  value={item.value || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], value: e.target.value };
                    handleFieldChange('stats', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="flex-1 space-y-1 md:space-y-0">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Stat Label</label>
                <input
                  type="text"
                  placeholder="e.g. Brand Legacy"
                  value={item.label || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], label: e.target.value };
                    handleFieldChange('stats', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="w-16 flex items-center justify-end mt-2 md:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    const newList = [...list];
                    newList.splice(idx, 1);
                    handleFieldChange('stats', newList);
                  }}
                  className="text-rose-400 hover:text-rose-300 text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            const newList = [...list, { value: '', label: '' }];
            handleFieldChange('stats', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Statistic Item
        </button>
      </div>
    );
  };

  // Open Positions editor
  const renderPositionsEditor = () => {
    const list = data.openPositions || [];
    return (
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Job Openings Listings</label>
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                handleFieldChange('openPositions', newList);
              }}
              className="absolute top-4 right-4 text-rose-400 text-xs font-semibold"
            >
              Remove
            </button>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  handleFieldChange('openPositions', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="Job Title"
              />
              <input
                type="text"
                value={item.type || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], type: e.target.value };
                  handleFieldChange('openPositions', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="Job Type (e.g. Full Time)"
              />
              <input
                type="text"
                value={item.location || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], location: e.target.value };
                  handleFieldChange('openPositions', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="Location"
              />
            </div>
            <textarea
              value={item.desc || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], desc: e.target.value };
                handleFieldChange('openPositions', newList);
              }}
              className={EXPANDING_TEXTAREA_CLASS}
              placeholder="Job Description paragraph"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { title: 'New Position', type: 'Full Time', location: 'Pan India', desc: 'Short job desc' }];
            handleFieldChange('openPositions', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors"
        >
          + Add Job Listing
        </button>
      </div>
    );
  };

  // Offices list editor
  const renderOfficesEditor = () => {
    const list = data.offices || [];
    return (
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Regional Offices Locations</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item: any, idx: number) => (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-905 rounded-3xl space-y-3 relative">
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('offices', newList);
                }}
                className="absolute top-4 right-4 text-rose-400 text-xs font-semibold hover:text-rose-300 transition-colors"
              >
                Remove
              </button>
              <input
                type="text"
                value={item.city || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], city: e.target.value };
                  handleFieldChange('offices', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                placeholder="City Name"
              />
              <input
                type="text"
                value={item.address || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], address: e.target.value };
                  handleFieldChange('offices', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                placeholder="Full Address"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { city: 'New Office', address: 'Street Address' }];
            handleFieldChange('offices', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors"
        >
          + Add Office Location
        </button>
      </div>
    );
  };

  // General FAQs Editor
  const renderFaqsEditor = () => {
    const list = data.faqs || [];
    return (
      <div className="space-y-4 md:col-span-2">
        <label className="text-sm font-bold text-white block">Frequently Asked Questions (FAQs) ({list.length})</label>
        <div className="space-y-3">
          {list.map((item: any, idx: number) => {
            const isExpanded = activeFaqIdx === idx;
            return (
              <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative transition-all">
                <div 
                  onClick={() => setActiveFaqIdx(isExpanded ? null : idx)}
                  className="flex items-center justify-between cursor-pointer pr-16"
                >
                  <span className="text-xs font-bold text-zinc-300 truncate">
                    {item.q || `FAQ Item ${idx + 1} (Empty)`}
                  </span>
                  <span className="text-[10px] font-black uppercase text-yellow-450">
                    {isExpanded ? 'Collapse ▲' : 'Expand ▼'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newList = [...list];
                    newList.splice(idx, 1);
                    handleFieldChange('faqs', newList);
                    if (activeFaqIdx === idx) setActiveFaqIdx(null);
                  }}
                  className="absolute top-4 right-4 text-rose-400 hover:text-rose-350 text-xs font-semibold"
                >
                  Remove
                </button>
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-zinc-900/50 animate-in fade-in duration-200">
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Question</label>
                      <input
                        type="text"
                        value={item.q || ''}
                        onChange={(e) => {
                          const newList = [...list];
                          newList[idx] = { ...newList[idx], q: e.target.value };
                          handleFieldChange('faqs', newList);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-850 text-white font-bold rounded-xl py-2 px-3 text-xs outline-none"
                        placeholder="Question text"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Answer text</label>
                      <textarea
                        value={item.a || ''}
                        onChange={(e) => {
                          const newList = [...list];
                          newList[idx] = { ...newList[idx], a: e.target.value };
                          handleFieldChange('faqs', newList);
                        }}
                        className={EXPANDING_TEXTAREA_CLASS}
                        placeholder="Answer text"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { q: 'New Question', a: 'New Answer Details.' }];
            handleFieldChange('faqs', newList);
            setActiveFaqIdx(newList.length - 1);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors font-semibold"
        >
          + Add FAQ Entry
        </button>
      </div>
    );
  };

  // How It Works Steps Editor
  const renderHowItWorksStepsEditor = () => {
    const list = data.howItWorksSteps || [];
    const iconOptions = ['Zap', 'Sun', 'Battery', 'Home', 'Activity', 'Thermometer', 'Droplets', 'CheckCircle2', 'Settings', 'ShieldCheck', 'Clock', 'Server', 'Leaf'];
    
    return (
      <div className="space-y-4 md:col-span-2">
        <label className="text-sm font-bold text-white block">Visual Step-by-Step Mechanism ({list.length} steps)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item: any, idx: number) => (
            <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('howItWorksSteps', newList);
                }}
                className="absolute top-4 right-4 text-rose-400 text-xs font-semibold"
              >
                Remove Step
              </button>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Number</label>
                  <input
                    type="text"
                    value={item.step || ''}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...newList[idx], step: e.target.value };
                      handleFieldChange('howItWorksSteps', newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                    placeholder="e.g. 01"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Icon</label>
                  <select
                    value={item.icon || 'Zap'}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...newList[idx], icon: e.target.value };
                      handleFieldChange('howItWorksSteps', newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none cursor-pointer"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], title: e.target.value };
                    handleFieldChange('howItWorksSteps', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                  placeholder="e.g. Charge"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Description</label>
                <textarea
                  value={item.desc || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], desc: e.target.value };
                    handleFieldChange('howItWorksSteps', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                  placeholder="e.g. Grid charges the lithium battery at high speed."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const nextNum = String(list.length + 1).padStart(2, '0');
            const newList = [...list, { step: nextNum, icon: 'Zap', title: 'New Step', desc: 'Description of the step.' }];
            handleFieldChange('howItWorksSteps', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add New Step Entry
        </button>
      </div>
    );
  };

  // Features List Editor (Non-comma separated, clean grid inputs)
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

  // Bento Benefits List Editor
  const renderBenefitsListEditor = () => {
    const list = data.benefits || [];
    const iconOptions = ['Zap', 'Sun', 'Battery', 'Home', 'Activity', 'Thermometer', 'Droplets', 'CheckCircle2', 'Settings', 'ShieldCheck', 'Clock', 'Server', 'Leaf', 'Layers', 'Building2'];

    return (
      <div className="space-y-4 md:col-span-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-white block">Key Benefits List ({list.length})</label>
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Bento Grid Items</span>
        </div>
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                handleFieldChange('benefits', newList);
              }}
              className="absolute top-4 right-4 text-rose-400 text-xs font-semibold hover:underline"
            >
              Remove
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Benefit Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], title: e.target.value };
                    handleFieldChange('benefits', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                  placeholder="e.g. Pure Sine Wave"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Benefit Icon</label>
                <select
                  value={item.icon || 'Zap'}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], icon: e.target.value };
                    handleFieldChange('benefits', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none cursor-pointer"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Benefit Description</label>
              <textarea
                value={item.desc || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], desc: e.target.value };
                  handleFieldChange('benefits', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="Description detail..."
                rows={2}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { icon: 'Zap', title: 'New Benefit', desc: 'Detail about this key benefit.' }];
            handleFieldChange('benefits', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add Benefit Item
        </button>
      </div>
    );
  };

  // Perfect For List Editor
  const renderPerfectForListEditor = () => {
    const list = data.perfectFor || [];
    const iconOptions = ['Zap', 'Sun', 'Battery', 'Home', 'Activity', 'Thermometer', 'Droplets', 'CheckCircle2', 'Settings', 'ShieldCheck', 'Clock', 'Server', 'Leaf', 'Layers', 'Building2'];

    return (
      <div className="space-y-4 md:col-span-2">
        <label className="text-sm font-bold text-white block">Perfect For Application Scenarios ({list.length})</label>
        {list.map((item: any, idx: number) => (
          <div key={idx} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3 bg-zinc-950/40 border border-zinc-900/60 p-3 rounded-2xl">
            <div>
              {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Application Label</label>}
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], label: e.target.value };
                  handleFieldChange('perfectFor', newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="e.g. Home UPS Systems"
              />
            </div>
            <div>
              {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Sub-description / Context</label>}
              <textarea
                value={item.sub || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], sub: e.target.value };
                  handleFieldChange('perfectFor', newList);
                }}
                className={EXPANDING_TEXTAREA_CLASS}
                placeholder="e.g. Sized perfectly for residential use"
              />
            </div>
            <div className={idx === 0 ? "pt-5" : ""}>
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('perfectFor', newList);
                }}
                className="text-rose-400 text-xs font-semibold hover:underline px-2 py-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { icon: 'Home', label: 'New Scenario', sub: 'Sub-description text.' }];
            handleFieldChange('perfectFor', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add Scenario Item
        </button>
      </div>
    );
  };

  // Comparison Section Editor (Sizing Tiers & Rows)
  const renderComparisonSectionEditor = () => {
    const tiers = data.comparisonTiers || [];
    const rows = data.comparisonRows || [];

    return (
      <div className="space-y-6 md:col-span-2">
        {/* Sizing Tiers list */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-white block">Sizing Guide / Capacity Tiers ({tiers.length})</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tiers.map((t: any, idx: number) => (
              <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const newList = [...tiers];
                    newList.splice(idx, 1);
                    handleFieldChange('comparisonTiers', newList);
                  }}
                  className="absolute top-4 right-4 text-rose-450 hover:text-rose-400 text-xs font-semibold"
                >
                  Remove
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Tier Name</label>
                    <input
                      type="text"
                      value={t.tier || ''}
                      onChange={(e) => {
                        const newList = [...tiers];
                        newList[idx] = { ...newList[idx], tier: e.target.value };
                        handleFieldChange('comparisonTiers', newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Emoji Icon</label>
                    <input
                      type="text"
                      value={t.icon || ''}
                      onChange={(e) => {
                        const newList = [...tiers];
                        newList[idx] = { ...newList[idx], icon: e.target.value };
                        handleFieldChange('comparisonTiers', newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none text-center"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Capacity</label>
                    <input
                      type="text"
                      value={t.capacity || ''}
                      onChange={(e) => {
                        const newList = [...tiers];
                        newList[idx] = { ...newList[idx], capacity: e.target.value };
                        handleFieldChange('comparisonTiers', newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Supported Items</label>
                  <input
                    type="text"
                    value={t.items || ''}
                    onChange={(e) => {
                      const newList = [...tiers];
                      newList[idx] = { ...newList[idx], items: e.target.value };
                      handleFieldChange('comparisonTiers', newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Description</label>
                  <input
                    type="text"
                    value={t.desc || ''}
                    onChange={(e) => {
                      const newList = [...tiers];
                      newList[idx] = { ...newList[idx], desc: e.target.value };
                      handleFieldChange('comparisonTiers', newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const newList = [...tiers, { tier: "New Tier", icon: "⚡", items: "Essential devices", capacity: "1kVA", desc: "Sizing details" }];
              handleFieldChange('comparisonTiers', newList);
            }}
            className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
          >
            + Add Sizing Tier
          </button>
        </div>

        {/* Comparison grid rows */}
        <div className="space-y-4 pt-4 border-t border-zinc-900">
          <label className="text-sm font-bold text-white block">Comparison Table Rows ({rows.length})</label>
          <div className="space-y-3">
            {rows.map((r: any, idx: number) => (
              <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative animate-in fade-in duration-200">
                <button
                  type="button"
                  onClick={() => {
                    const newList = [...rows];
                    newList.splice(idx, 1);
                    handleFieldChange('comparisonRows', newList);
                  }}
                  className="absolute top-4 right-4 text-rose-450 hover:text-rose-400 text-xs font-semibold"
                >
                  Remove
                </button>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Feature / Row Name</label>
                    <input
                      type="text"
                      value={r.feature || ''}
                      onChange={(e) => {
                        const newList = [...rows];
                        newList[idx] = { ...newList[idx], feature: e.target.value };
                        handleFieldChange('comparisonRows', newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                      placeholder="e.g. Noise Level"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Without This Product</label>
                    <input
                      type="text"
                      value={r.traditional || ''}
                      onChange={(e) => {
                        const newList = [...rows];
                        newList[idx] = { ...newList[idx], traditional: e.target.value };
                        handleFieldChange('comparisonRows', newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                      placeholder="e.g. Generator noise"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-yellow-450 mb-1 block">With Spectrum Product</label>
                    <input
                      type="text"
                      value={r.ups || ''}
                      onChange={(e) => {
                        const newList = [...rows];
                        newList[idx] = { ...newList[idx], ups: e.target.value };
                        handleFieldChange('comparisonRows', newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                      placeholder="e.g. Silent operation"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const newList = [...rows, { feature: "New Feature", traditional: "Traditional fallback", ups: "Our solution benefit" }];
              handleFieldChange('comparisonRows', newList);
            }}
            className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
          >
            + Add Comparison Row
          </button>
        </div>
      </div>
    );
  };

  // Installation timeline process editor
  const renderInstallationTimelineEditor = () => {
    const list = data.installationSteps || [];

    return (
      <div className="space-y-4 md:col-span-2">
        <label className="text-sm font-bold text-white block">Installation Process Timeline ({list.length} steps)</label>
        <div className="space-y-3">
          {list.map((step: any, idx: number) => (
            <div key={idx} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3 bg-zinc-950/40 border border-zinc-900/60 p-3 rounded-2xl">
              <div>
                {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Title</label>}
                <input
                  type="text"
                  value={step.title || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], title: e.target.value };
                    handleFieldChange('installationSteps', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                  placeholder="e.g. Phase Title"
                />
              </div>
              <div>
                {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Description</label>}
                <textarea
                  value={step.desc || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], desc: e.target.value };
                    handleFieldChange('installationSteps', newList);
                  }}
                  className={EXPANDING_TEXTAREA_CLASS}
                  placeholder="Phase details..."
                />
              </div>
              <div className={idx === 0 ? "pt-5" : ""}>
                <button
                  type="button"
                  onClick={() => {
                    const newList = [...list];
                    newList.splice(idx, 1);
                    handleFieldChange('installationSteps', newList);
                  }}
                  className="text-rose-450 hover:text-rose-400 text-xs font-semibold px-2 py-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { title: "New Phase", desc: "Phase description details." }];
            handleFieldChange('installationSteps', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add Timeline Step
        </button>
      </div>
    );
  };

  // Advanced Features List Editor (Sleek text elements)
  const renderAdvancedFeaturesListEditor = () => {
    const list = data.advancedFeatures || [];
    return (
      <div className="space-y-4 md:col-span-2">
        <label className="text-sm font-bold text-white block">Advanced Technical Features List ({list.length})</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 p-3 rounded-2xl relative">
              <input
                type="text"
                value={item || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = e.target.value;
                  handleFieldChange('advancedFeatures', newList);
                }}
                className="flex-1 bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="e.g. Overload Protection Alerts"
              />
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('advancedFeatures', newList);
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
            const newList = [...list, 'New Tech Feature'];
            handleFieldChange('advancedFeatures', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add Tech Feature
        </button>
      </div>
    );
  };

  // Overview Spec Cards Editor (Exactly 4 cards)
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

  // Policy Sections Editor (Privacy Policy & Terms of Service)
  const renderSectionsEditor = () => {
    const list = data.sections || [];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2">
          <label className="text-sm font-bold text-white block">Document Paragraph Sections ({list.length})</label>
          <button
            type="button"
            onClick={() => {
              const newList = [...list, { title: 'New Section Title', text: 'Section body paragraph content...' }];
              handleFieldChange('sections', newList);
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow shadow-yellow-400/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Section</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item: any, idx: number) => (
            <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4 relative">
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  handleFieldChange('sections', newList);
                }}
                className="absolute top-5 right-5 text-rose-400 text-xs font-semibold hover:text-rose-300 transition-colors"
              >
                Remove
              </button>
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Section Header Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], title: e.target.value };
                    handleFieldChange('sections', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white font-bold rounded-xl py-2.5 px-3 text-xs outline-none focus:border-yellow-400/30"
                  placeholder="e.g. 1. Introduction"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Section Body Paragraph</label>
                <textarea
                  value={item.text || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], text: e.target.value };
                    handleFieldChange('sections', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30 transition-all duration-300 h-9 focus:h-28 resize-none py-2.5 overflow-y-auto"
                  placeholder="Write the policy details here..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Specs List Editor
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

  const renderTestimonialsEditor = () => {
    const list = data.testimonials || [];
    return (
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Client Reviews List</label>
        
        {/* Table Header Row */}
        {list.length > 0 && (
          <div className="hidden md:flex items-center gap-4 px-5 text-[10px] font-black uppercase tracking-wider text-zinc-500">
            <div className="flex-1">Client Name</div>
            <div className="flex-1">Product Purchased</div>
            <div className="flex-[3]">Review Paragraph</div>
            <div className="w-16 text-right">Action</div>
          </div>
        )}

        <div className="space-y-2">
          {list.map((t: any, idx: number) => (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-4 relative animate-fade-in">
              <div className="flex-1 space-y-1 md:space-y-0">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Abdul Rahman"
                  value={t.name || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], name: e.target.value };
                    handleFieldChange('testimonials', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="flex-1 space-y-1 md:space-y-0">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Product Purchased</label>
                <input
                  type="text"
                  placeholder="e.g. 5KW Hybrid Solar"
                  value={t.product || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], product: e.target.value };
                    handleFieldChange('testimonials', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>
              <div className="flex-[3] space-y-1 md:space-y-0">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Review Paragraph</label>
                <textarea
                  placeholder="e.g. Extremely professional team..."
                  value={t.text || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], text: e.target.value };
                    handleFieldChange('testimonials', newList);
                  }}
                  className={EXPANDING_TEXTAREA_CLASS}
                />
              </div>

              <div className="w-16 flex items-center justify-end mt-2 md:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    const newList = [...list];
                    newList.splice(idx, 1);
                    handleFieldChange('testimonials', newList);
                  }}
                  className="text-rose-400 hover:text-rose-300 text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            const newList = [...list, { name: '', product: '', text: '', initials: '', date: 'Recently', isVerified: true }];
            handleFieldChange('testimonials', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Testimonial
        </button>
      </div>
    );
  };

  const renderPinsEditor = () => {
    const list = data.pins || [];

    const keralaMaskGeojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-180, -90],
            [-180, 90],
            [180, 90],
            [180, -90],
            [-180, -90]
          ],
          ...KERALA_GEOJSON.geometry.coordinates.map((poly: any) => poly[0])
        ]
      }
    };

    // Local Leaflet Event Handler component to capture click & double click events
    const MapEventsHandler = () => {
      useMapEvents({
        click(e) {
          if (activePinIdx !== null && activePinIdx >= 0 && activePinIdx < list.length) {
            const newList = [...list];
            newList[activePinIdx] = {
              ...newList[activePinIdx],
              lat: parseFloat(e.latlng.lat.toFixed(6)),
              lng: parseFloat(e.latlng.lng.toFixed(6))
            };
            handleFieldChange('pins', newList);
          }
        },
        dblclick(e) {
          const newPin = {
            id: Date.now(),
            lat: parseFloat(e.latlng.lat.toFixed(6)),
            lng: parseFloat(e.latlng.lng.toFixed(6)),
            title: 'New Center',
            desc: 'Details of new location...',
            gmapsLink: ''
          };
          const newList = [...list, newPin];
          handleFieldChange('pins', newList);
          setActivePinIdx(newList.length - 1);
        }
      });
      return null;
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-zinc-950 p-5 border border-zinc-900 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Interactive Preview Map
              </span>
              <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider bg-yellow-400/5 px-2 py-0.5 rounded border border-yellow-400/10">
                {activePinIdx !== null && list[activePinIdx]
                  ? `Active: ${list[activePinIdx].title || 'New Pin'}`
                  : 'No active pin selected'}
              </span>
            </div>
            <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-zinc-800 relative z-10">
              <MapContainer
                center={[10.5, 76.4]}
                zoom={8}
                maxBounds={[[8.0, 74.5], [13.0, 77.8]]}
                minZoom={7.5}
                maxBoundsViscosity={1.0}
                style={{ height: '100%', width: '100%', background: '#09090b' }}
                scrollWheelZoom={true}
                doubleClickZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <GeoJSON
                  data={keralaMaskGeojson as any}
                  style={{
                    fillColor: '#000000',
                    fillOpacity: 0.5,
                    weight: 0,
                    color: 'transparent'
                  }}
                />
                <GeoJSON
                  data={KERALA_GEOJSON as any}
                  style={{
                    color: '#facc15',
                    weight: 1.5,
                    fillColor: 'transparent',
                    fillOpacity: 0
                  }}
                />
                <MapEventsHandler />
                {list.map((pin: any, idx: number) => {
                  const isActive = activePinIdx === idx;
                  return (
                    <Marker
                      key={pin.id}
                      position={[pin.lat, pin.lng]}
                      draggable={true}
                      icon={isActive ? DefaultIcon : yellowIcon}
                      eventHandlers={{
                        dragend(e) {
                          const marker = e.target;
                          const position = marker.getLatLng();
                          const newList = [...list];
                          newList[idx] = {
                            ...newList[idx],
                            lat: parseFloat(position.lat.toFixed(6)),
                            lng: parseFloat(position.lng.toFixed(6))
                          };
                          handleFieldChange('pins', newList);
                        },
                        click() {
                          setActivePinIdx(idx);
                        }
                      }}
                    >
                      <Popup>
                        <div className="text-zinc-950 text-xs font-sans p-1">
                          <p className="font-black uppercase tracking-tight text-xs mb-0.5">{pin.title || 'Untitled'}</p>
                          <p className="text-[10px] text-zinc-650 leading-tight mb-1">{pin.desc}</p>
                          {isActive && <p className="text-[9px] text-yellow-600 font-black uppercase tracking-widest mt-1">Currently Active</p>}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
            <div className="mt-3 text-center space-y-1">
              <p className="text-[10px] text-zinc-500 font-medium">
                • Drag any marker pin on the map to adjust its coordinates.
              </p>
              <p className="text-[10px] text-zinc-500 font-medium">
                • Expand a location card, then click anywhere on the map to reposition it.
              </p>
              <p className="text-[10px] text-zinc-500 font-medium">
                • Double-click anywhere on the map to add a new location pin.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Collapsible Cards List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Locations List ({list.length})</h4>
            <button
              type="button"
              onClick={() => {
                const newPin = { id: Date.now(), lat: 10.5, lng: 76.5, title: 'New Center', desc: 'Active Hub', gmapsLink: '' };
                const newList = [...list, newPin];
                handleFieldChange('pins', newList);
                setActivePinIdx(newList.length - 1);
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-semibold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow shadow-yellow-400/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Location</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {list.map((item: any, idx: number) => {
              const isExpanded = activePinIdx === idx;
              return (
                <div
                  key={item.id}
                  className={`border transition-all duration-300 rounded-[1.5rem] overflow-hidden ${
                    isExpanded
                      ? 'bg-zinc-900/90 border-yellow-400/20 shadow-xl'
                      : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => setActivePinIdx(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isExpanded ? 'bg-yellow-400 shadow-[0_0_8px_#facc15]' : 'bg-zinc-700'}`} />
                      <div>
                        <span className="font-bold text-sm text-white block">{item.title || 'New Center'}</span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">
                          Lat: {item.lat || '0'} | Lng: {item.lng || '0'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newList = [...list];
                          newList.splice(idx, 1);
                          handleFieldChange('pins', newList);
                          if (activePinIdx === idx) {
                            setActivePinIdx(newList.length > 0 ? 0 : null);
                          } else if (activePinIdx !== null && activePinIdx > idx) {
                            setActivePinIdx(activePinIdx - 1);
                          }
                        }}
                        className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                        title="Delete pin"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-3 border-t border-zinc-850 bg-zinc-900/40 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Latitude</label>
                          <input
                            type="number"
                            step="any"
                            value={item.lat || ''}
                            onChange={(e) => {
                              const newList = [...list];
                              newList[idx] = { ...newList[idx], lat: parseFloat(e.target.value) || 0 };
                              handleFieldChange('pins', newList);
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-3 text-xs outline-none"
                            placeholder="e.g. 10.52"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Longitude</label>
                          <input
                            type="number"
                            step="any"
                            value={item.lng || ''}
                            onChange={(e) => {
                              const newList = [...list];
                              newList[idx] = { ...newList[idx], lng: parseFloat(e.target.value) || 0 };
                              handleFieldChange('pins', newList);
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-3 text-xs outline-none"
                            placeholder="e.g. 76.21"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Pin Title</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => {
                            const newList = [...list];
                            newList[idx] = { ...newList[idx], title: e.target.value };
                            handleFieldChange('pins', newList);
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                          placeholder="e.g. Kozhikode Hub"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Hover Details</label>
                        <input
                          type="text"
                          value={item.desc || ''}
                          onChange={(e) => {
                            const newList = [...list];
                            newList[idx] = { ...newList[idx], desc: e.target.value };
                            handleFieldChange('pins', newList);
                          }}
                          className="w-full bg-zinc-950 border border-zinc-880 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                          placeholder="e.g. Service Center & 1200+ installations"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Google Maps Link (Optional)</label>
                        <input
                          type="text"
                          value={item.gmapsLink || ''}
                          onChange={(e) => {
                            const newList = [...list];
                            newList[idx] = { ...newList[idx], gmapsLink: e.target.value };
                            handleFieldChange('pins', newList);
                          }}
                          className="w-full bg-zinc-950 border border-zinc-880 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                          placeholder="e.g. https://maps.app.goo.gl/..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
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
                            return <div key={fieldKey} className="space-y-2">{renderProductsEditor()}</div>;
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
      <div className="pt-6 border-t border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isDirty && (
            <span className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider animate-pulse">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Unsaved Changes
            </span>
          )}
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
