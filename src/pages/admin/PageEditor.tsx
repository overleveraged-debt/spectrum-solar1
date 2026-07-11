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

// Custom Yellow Icon for Spectrum Pins
const yellowIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #facc15; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 15px #facc15;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

interface PageEditorProps {
  pageId: string;
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
      id: 'testimonials',
      title: 'Client Testimonials',
      description: 'Add, update, or delete customer reviews slider items.',
      fields: ['showTestimonials', 'testimonials']
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
  'power-backup': [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Title, subtitle, banner photo and description settings.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'catalog',
      title: 'Product Catalog',
      description: 'Edit, reorder, or update the list of backup products, features, and specifications.',
      fields: ['showProducts', 'products']
    }
  ],
  'solar-solutions': [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Title, subtitle, banner photo and description settings.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroDesc']
    },
    {
      id: 'catalog',
      title: 'Product Catalog',
      description: 'Edit, reorder, or update the list of solar products, features, and specifications.',
      fields: ['showProducts', 'products']
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
      description: 'Configure title, subtitle and banner image.',
      fields: ['showHero', 'heroTitle', 'heroSubtitle', 'heroImage']
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
      fields: ['openPositions']
    },
    {
      id: 'faqs',
      title: 'Careers FAQs',
      description: 'Manage job FAQs.',
      fields: ['faqs']
    }
  ],
  support: [
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
      fields: ['faqs']
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
      description: 'Main product summary and checklist details.',
      fields: ['description', 'features']
    },
    {
      id: 'how-it-works',
      title: 'How It Works Section',
      description: 'Configure and toggle the visibility of the "How It Works" step-by-step visual section on this page.',
      fields: ['showHowItWorks', 'howItWorksSteps']
    },
    {
      id: 'specs',
      title: 'Technical Specifications Table',
      description: 'Configure technical properties.',
      fields: ['specs']
    },
    {
      id: 'faqs',
      title: 'Product-Specific FAQs',
      description: 'Configure product questions.',
      fields: ['faqs']
    }
  ],
  'privacy-policy': [
    {
      id: 'general',
      title: 'Privacy Policy Header',
      description: 'Configure the document title and last updated status text.',
      fields: ['title', 'lastUpdated']
    },
    {
      id: 'sections',
      title: 'Privacy Policy Content Sections',
      description: 'Manage the title headers and detailed paragraph contents of the policy.',
      fields: ['sections']
    }
  ],
  'terms-conditions': [
    {
      id: 'general',
      title: 'Terms & Conditions Header',
      description: 'Configure the document title and last updated status text.',
      fields: ['title', 'lastUpdated']
    },
    {
      id: 'sections',
      title: 'Terms & Conditions Content Sections',
      description: 'Manage the title headers and detailed paragraph contents of the terms.',
      fields: ['sections']
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
  stat4Sub: { label: 'Stat 4 Tagline', placeholder: 'e.g. Certified Experts' }
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

export default function PageEditor({ pageId }: PageEditorProps) {
  const [selectedProduct, setSelectedProduct] = useState('on-grid');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Track open accordion group
  const [openGroup, setOpenGroup] = useState<string | null>('hero');

  // Track open pin location card index (for map locations editor)
  const [activePinIdx, setActivePinIdx] = useState<number | null>(0);

  // Determine active document ID
  const activeFetchId = pageId === 'product-details' ? selectedProduct : pageId;

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
            setData(JSON.parse(result.content));
          } else {
            setData(defaultPagesData[activeFetchId] || {});
          }
        }
      } catch (err) {
        console.error('Failed to fetch from Sanity', err);
        if (isMounted) {
          setData(defaultPagesData[activeFetchId] || {});
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
        <label className="text-sm font-bold text-white block">Why Choose Us Grid Items</label>
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                handleFieldChange('whyItems', newList);
              }}
              className="absolute top-4 right-4 text-rose-400 text-xs font-semibold"
            >
              Remove
            </button>
            <input
              type="text"
              value={item.title || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], title: e.target.value };
                handleFieldChange('whyItems', newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="Title"
            />
            <textarea
              value={item.desc || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], desc: e.target.value };
                handleFieldChange('whyItems', newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="Description text"
              rows={2}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { title: 'New Benefit', desc: 'Benefit description' }];
            handleFieldChange('whyItems', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors"
        >
          + Add Benefit Item
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
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="Job Description paragraph"
              rows={2}
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
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                handleFieldChange('offices', newList);
              }}
              className="absolute top-4 right-4 text-rose-400 text-xs font-semibold"
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
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
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
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="Full Address"
            />
          </div>
        ))}
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
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Frequently Asked Questions (FAQs)</label>
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                handleFieldChange('faqs', newList);
              }}
              className="absolute top-4 right-4 text-rose-400 text-xs font-semibold"
            >
              Remove
            </button>
            <input
              type="text"
              value={item.q || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], q: e.target.value };
                handleFieldChange('faqs', newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white font-bold rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="Question"
            />
            <textarea
              value={item.a || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], a: e.target.value };
                handleFieldChange('faqs', newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="Answer text"
              rows={3}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { q: 'Question', a: 'Answer' }];
            handleFieldChange('faqs', newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors"
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
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Visual Step-by-Step Mechanism ({list.length} steps)</label>
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
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-3 px-4 text-xs outline-none focus:border-yellow-400/30 transition-colors"
                placeholder="Write the policy details here..."
                rows={5}
              />
            </div>
          </div>
        ))}
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
        {list.map((t: any, idx: number) => (
          <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                handleFieldChange('testimonials', newList);
              }}
              className="absolute top-5 right-5 text-rose-400 hover:text-rose-300 text-xs font-semibold"
            >
              Remove
            </button>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Client Name</label>
                <input
                  type="text"
                  value={t.name || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], name: e.target.value };
                    handleFieldChange('testimonials', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold block">Product / Project Purchased</label>
                <input
                  type="text"
                  value={t.product || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], product: e.target.value };
                    handleFieldChange('testimonials', newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-semibold block">Review Paragraph</label>
              <textarea
                value={t.text || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], text: e.target.value };
                  handleFieldChange('testimonials', newList);
                }}
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2.5 px-3 text-xs outline-none"
              />
            </div>
          </div>
        ))}
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

    if (isBoolean) {
      return (
        <div key={key} className="flex items-center justify-between p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
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
        <div key={key} className="space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
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
        <div key={key} className="space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
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

    const isTextArea = key.toLowerCase().includes('subtitle') || key.toLowerCase().includes('text') || key.toLowerCase().includes('desc');

    return (
      <div key={key} className="space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
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
                    <div className="pt-6 space-y-5">
                      {group.fields.filter((fieldKey) => fieldKey !== toggleFieldKey).length === 0 ? (
                        <div className="text-zinc-500 text-xs py-2 italic">
                          This section is controlled entirely by the visibility toggle switch above. There are no additional settings for this section.
                        </div>
                      ) : (
                        group.fields
                          .filter((fieldKey) => fieldKey !== toggleFieldKey)
                          .map((fieldKey) => {
                            if (fieldKey === 'sections') {
                              return <div key={fieldKey} className="space-y-2">{renderSectionsEditor()}</div>;
                            }
                            if (fieldKey === 'testimonials') {
                              return <div key={fieldKey} className="space-y-2">{renderTestimonialsEditor()}</div>;
                            }
                          if (fieldKey === 'pins') {
                            return <div key={fieldKey} className="space-y-2">{renderPinsEditor()}</div>;
                          }
                          if (fieldKey === 'products') {
                            return <div key={fieldKey} className="space-y-2">{renderProductsEditor()}</div>;
                          }
                          if (fieldKey === 'whyItems') {
                            return <div key={fieldKey} className="space-y-2">{renderWhyItemsEditor()}</div>;
                          }
                          if (fieldKey === 'openPositions') {
                            return <div key={fieldKey} className="space-y-2">{renderPositionsEditor()}</div>;
                          }
                          if (fieldKey === 'offices') {
                            return <div key={fieldKey} className="space-y-2">{renderOfficesEditor()}</div>;
                          }
                          if (fieldKey === 'faqs') {
                            return <div key={fieldKey} className="space-y-2">{renderFaqsEditor()}</div>;
                          }
                          if (fieldKey === 'howItWorksSteps') {
                            return <div key={fieldKey} className="space-y-2">{renderHowItWorksStepsEditor()}</div>;
                          }
                          if (fieldKey === 'specs') {
                            return <div key={fieldKey} className="space-y-2">{renderSpecsListEditor()}</div>;
                          }
                          if (fieldKey === 'features') {
                            return (
                              <div key={fieldKey} className="space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
                                <label className="font-semibold text-sm text-zinc-300 block">Features List (Comma Separated)</label>
                                <input
                                  type="text"
                                  value={(data.features || []).join(', ')}
                                  onChange={(e) => handleFieldChange('features', e.target.value.split(',').map((s: string) => s.trim()))}
                                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-3 px-4 text-sm focus:border-yellow-400/50 outline-none transition-colors"
                                />
                              </div>
                            );
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
      <div className="pt-6 border-t border-zinc-900 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-zinc-950 font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-yellow-400/5"
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
