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
import OverviewCardsEditor from './editors/OverviewCardsEditor';
import SpecsEditor from './editors/SpecsEditor';
import FeaturesEditor from './editors/FeaturesEditor';
import OpportunitiesCardsEditor from './editors/OpportunitiesCardsEditor';
import GalleryEditor from './editors/GalleryEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import FormFieldRenderer from './components/FormFieldRenderer';
import { pageSectionGroups, fieldMeta, productOptions } from './config/pageEditorConfig';
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

  const handleProductCardImageUpload = async (cardIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadKey = `product_card_${cardIndex}`;
    setUploadingImage(uploadKey);
    setStatus(null);

    try {
      const asset = await sanityClient.assets.upload('image', file, {
        filename: file.name,
      });

      setData((prev: any) => {
        const currentProducts = [...(prev.products || [])];
        if (currentProducts[cardIndex]) {
          currentProducts[cardIndex] = {
            ...currentProducts[cardIndex],
            image: asset.url,
          };
        }
        return { ...prev, products: currentProducts };
      });
      setStatus({ type: 'success', message: `Product card #${cardIndex + 1} image uploaded successfully!` });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to upload image. Write token is required.' });
    } finally {
      setUploadingImage(null);
    }
  };

  const handleGalleryImageUpload = async (itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadKey = `gallery_item_${itemIndex}`;
    setUploadingImage(uploadKey);
    setStatus(null);

    try {
      const asset = await sanityClient.assets.upload('image', file, {
        filename: file.name,
      });

      setData((prev: any) => {
        const currentItems = [...(prev.galleryItems || [])];
        if (currentItems[itemIndex]) {
          currentItems[itemIndex] = {
            ...currentItems[itemIndex],
            src: asset.url,
          };
        }
        return { ...prev, galleryItems: currentItems };
      });
      setStatus({ type: 'success', message: `Gallery photo #${itemIndex + 1} uploaded successfully!` });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to upload image. Write token is required.' });
    } finally {
      setUploadingImage(null);
    }
  };

  const handleProjectImageUpload = async (itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadKey = `project_item_${itemIndex}`;
    setUploadingImage(uploadKey);
    setStatus(null);

    try {
      const asset = await sanityClient.assets.upload('image', file, {
        filename: file.name,
      });

      setData((prev: any) => {
        const currentProjects = [...(prev.projects || [])];
        if (currentProjects[itemIndex]) {
          currentProjects[itemIndex] = {
            ...currentProjects[itemIndex],
            image: asset.url,
          };
        }
        return { ...prev, projects: currentProjects };
      });
      setStatus({ type: 'success', message: `Project #${itemIndex + 1} photo uploaded successfully!` });
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
      onImageUpload={handleProductCardImageUpload}
      uploadingImage={uploadingImage}
    />
  );

  const renderWhyItemsEditor = () => (
    <WhyItemsEditor whyItems={data.whyItems || []} onChange={(newList) => handleFieldChange('whyItems', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderWhyGoSolarBoxesEditor = () => (
    <WhyItemsEditor whyItems={data.whyGoSolarBoxes || [
      { title: 'Zero Electricity Bills', desc: 'Net-metered solar plants can reduce your KSEB bill to ₹0. Pay for the system once, generate free power for 25 years.' },
      { title: 'Clean & Sustainable', desc: 'Every kW of solar installed avoids hundreds of kg of CO₂ per year. Power your home without harming the planet.' },
      { title: 'Fast ROI — 3 to 5 Years', desc: 'With government subsidies and KSEB net metering, most systems pay for themselves in under 5 years.' }
    ]} onChange={(newList) => handleFieldChange('whyGoSolarBoxes', newList)} textareaClass={EXPANDING_TEXTAREA_CLASS} />
  );

  const renderOpportunitiesCardsEditor = () => (
    <OpportunitiesCardsEditor opportunities={data.opportunities || []} onChange={(newList) => handleFieldChange('opportunities', newList)} />
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

  const renderOverviewCardsEditor = () => (
    <OverviewCardsEditor overviewCards={data.overviewCards || []} onChange={(newList) => handleFieldChange('overviewCards', newList)} />
  );

  const renderSpecsListEditor = () => (
    <SpecsEditor specs={data.specs || []} onChange={(newList) => handleFieldChange('specs', newList)} />
  );

  const renderFeaturesListEditor = () => (
    <FeaturesEditor features={data.features || data.products || []} onChange={(newList) => handleFieldChange('features', newList)} />
  );

  const renderFranchiseBenefitsEditor = () => {
    const rawBenefits = data.benefits || [];
    const stringList = Array.isArray(rawBenefits)
      ? rawBenefits.map((b: any) => typeof b === 'string' ? b : (b.title || b.text || b.desc || ''))
      : [];
    return <FeaturesEditor features={stringList} onChange={(newList) => handleFieldChange('benefits', newList)} />;
  };

  const renderResponsibilitiesListEditor = () => (
    <FeaturesEditor features={data.responsibilities || []} onChange={(newList) => handleFieldChange('responsibilities', newList)} />
  );

  const renderDealershipBenefitsEditor = () => {
    const rawBenefits = data.benefits || [];
    const stringList = Array.isArray(rawBenefits)
      ? rawBenefits.map((b: any) => typeof b === 'string' ? b : (b.title || b.text || b.desc || ''))
      : [];
    return <FeaturesEditor features={stringList} onChange={(newList) => handleFieldChange('benefits', newList)} />;
  };

  const renderFreelanceBenefitsEditor = () => {
    const rawBenefits = data.benefits || [];
    const stringList = Array.isArray(rawBenefits)
      ? rawBenefits.map((b: any) => typeof b === 'string' ? b : (b.title || b.text || b.desc || ''))
      : [];
    return <FeaturesEditor features={stringList} onChange={(newList) => handleFieldChange('benefits', newList)} />;
  };

  const renderWhoCanJoinEditor = () => {
    const rawItems = data.whoCanJoin || [];
    const stringList = Array.isArray(rawItems)
      ? rawItems.map((item: any) => typeof item === 'string' ? item : (item.label || item.title || ''))
      : [];
    return <FeaturesEditor features={stringList} onChange={(newList) => handleFieldChange('whoCanJoin', newList)} />;
  };

  const renderGalleryEditor = () => (
    <GalleryEditor
      galleryItems={data.galleryItems || []}
      onChange={(newList) => handleFieldChange('galleryItems', newList)}
      onImageUpload={handleGalleryImageUpload}
      uploadingImage={uploadingImage}
    />
  );

  const renderProjectsEditor = () => (
    <ProjectsEditor
      projects={data.projects || []}
      onChange={(newList) => handleFieldChange('projects', newList)}
      onImageUpload={handleProjectImageUpload}
      uploadingImage={uploadingImage}
    />
  );

  const renderField = (key: string, val: any) => (
    <FormFieldRenderer
      key={key}
      fieldKey={key}
      val={val}
      handleFieldChange={handleFieldChange}
      handleImageUpload={handleImageUpload}
      uploadingImage={uploadingImage}
    />
  );

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
        <p className="text-zinc-400 text-sm">Fetching configuration data...</p>
      </div>
    );
  }

  const activeConfigKey = pageId === 'product-details' ? selectedProduct : pageId;
  const rawGroups = pageSectionGroups[activeConfigKey] || pageSectionGroups[pageId] || [];
  const groups = rawGroups.filter(group => {
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
                          if (fieldKey === 'opportunities') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderOpportunitiesCardsEditor()}</div>;
                          }
                          if (fieldKey === 'whyItems') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderWhyItemsEditor()}</div>;
                          }
                          if (fieldKey === 'whyGoSolarBoxes') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderWhyGoSolarBoxesEditor()}</div>;
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
                          if (fieldKey === 'franchiseBenefits') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderFranchiseBenefitsEditor()}</div>;
                          }
                          if (fieldKey === 'freelanceBenefits') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderFreelanceBenefitsEditor()}</div>;
                          }
                          if (fieldKey === 'whoCanJoin') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderWhoCanJoinEditor()}</div>;
                          }
                          if (fieldKey === 'dealershipBenefits') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderDealershipBenefitsEditor()}</div>;
                          }
                          if (fieldKey === 'responsibilities') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderResponsibilitiesListEditor()}</div>;
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
                          if (fieldKey === 'galleryItems') {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderGalleryEditor()}</div>;
                          }
                          if (fieldKey === 'projects' && (pageId === 'projects' || Array.isArray(data.projects))) {
                            return <div key={fieldKey} className="md:col-span-2 space-y-2">{renderProjectsEditor()}</div>;
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
