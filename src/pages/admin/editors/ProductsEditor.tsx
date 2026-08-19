import React from 'react';
import { Plus, Trash2, ChevronRight, Upload, Loader2 } from 'lucide-react';

interface ProductsEditorProps {
  products: any[];
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
  onChange: (newList: any[]) => void;
  textareaClass: string;
  onImageUpload?: (cardIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage?: string | null;
}

export default function ProductsEditor({
  products = [],
  activeIdx,
  setActiveIdx,
  onChange,
  textareaClass,
  onImageUpload,
  uploadingImage,
}: ProductsEditorProps) {
  const list = products;
  const currentIdx = activeIdx ?? 0;
  const activeProd = list[currentIdx] || list[0] || {};

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white block">Products Catalog Items ({list.length} cards)</label>
        <span className="text-[10px] text-zinc-500 uppercase font-bold">Catalog Grid Cards</span>
      </div>

      {/* Master-Detail Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product Cards Selector Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          {list.map((prod: any, idx: number) => {
            const isSelected = currentIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3 relative ${
                  isSelected
                    ? 'bg-zinc-900 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.12)]'
                    : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/50'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && <div className="absolute left-0 top-3 bottom-3 w-1 bg-yellow-400 rounded-r-full" />}

                {/* Thumbnail Image */}
                <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                  {prod.image ? (
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[9px] text-zinc-600 font-bold">NO IMG</span>
                  )}
                </div>

                <div className="min-w-0 flex-1 pl-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-black uppercase text-yellow-400 tracking-wider">
                      Card #{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{prod.title || 'Untitled Card'}</h4>
                  <span className="text-[10px] text-zinc-500 block truncate mt-0.5">{prod.category || 'General'}</span>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-yellow-400 translate-x-0.5' : 'text-zinc-600'}`}
                />
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Card Live Preview & Interactive Editor Panel (8 cols) */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-6">
          {/* Live Website Card Preview Box */}
          <div className="bg-zinc-900/60 border border-zinc-850 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-yellow-400 tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Website Card Preview (Card #{currentIdx + 1})
              </span>
              {activeProd.category && (
                <span className="text-[9px] bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full uppercase font-bold">
                  {activeProd.category}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-900">
              {activeProd.image && (
                <img
                  src={activeProd.image}
                  alt="Preview"
                  className="w-16 h-14 rounded-xl object-cover border border-zinc-800 shrink-0"
                />
              )}
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white uppercase">{activeProd.title || 'Product Title'}</h3>
                </div>
                <p className="text-zinc-400 text-xs line-clamp-1">{activeProd.tagline || activeProd.description}</p>
              </div>
            </div>
          </div>

          {/* Form Fields for Active Card */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                  Product Title
                </label>
                <input
                  type="text"
                  value={activeProd.title || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[currentIdx] = { ...newList[currentIdx], title: e.target.value };
                    onChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white font-bold rounded-xl py-2.5 px-3.5 text-xs outline-none focus:border-yellow-400/50 transition-all"
                  placeholder="e.g. Lithium Inbuilt UPS"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                  Category Label
                </label>
                <input
                  type="text"
                  value={activeProd.category || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[currentIdx] = { ...newList[currentIdx], category: e.target.value };
                    onChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2.5 px-3.5 text-xs outline-none focus:border-yellow-400/50 transition-all"
                  placeholder="e.g. Zero-Switch Technology"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                Tagline Subheading
              </label>
              <input
                type="text"
                value={activeProd.tagline || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[currentIdx] = { ...newList[currentIdx], tagline: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2.5 px-3.5 text-xs outline-none focus:border-yellow-400/50 transition-all"
                placeholder="e.g. Instant zero-switch backup."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                Card Description Paragraph
              </label>
              <textarea
                value={activeProd.description || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[currentIdx] = { ...newList[currentIdx], description: e.target.value };
                  onChange(newList);
                }}
                className={textareaClass}
                placeholder="Detailed description..."
              />
            </div>

            <div className="space-y-2 p-4 bg-zinc-900/80 border border-zinc-850 rounded-2xl">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-300 block">
                  Product Image
                </label>
                <span className="text-[10px] text-zinc-500 mt-0.5 block">
                  Upload an image from your computer or paste an image URL.
                </span>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0 flex items-center justify-center">
                  {activeProd.image ? (
                    <img src={activeProd.image} alt={activeProd.title || 'Product'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-zinc-600 text-[10px] font-bold">No Image</span>
                  )}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  {onImageUpload && (
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onImageUpload(currentIdx, e)}
                        className="hidden"
                        id={`product-card-upload-${currentIdx}`}
                        disabled={uploadingImage !== null && uploadingImage !== undefined}
                      />
                      <label
                        htmlFor={`product-card-upload-${currentIdx}`}
                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer transition-all shadow-sm active:scale-95"
                      >
                        {uploadingImage === `product_card_${currentIdx}` ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{uploadingImage === `product_card_${currentIdx}` ? 'Uploading Photo...' : 'Update / Change Photo'}</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Feature Bullets List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                  Bullet Features Checklist ({(activeProd.features || []).length} items)
                </label>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Fixed Feature List</span>
              </div>

              <div className="space-y-2">
                {(activeProd.features || []).map((feat: string, fIdx: number) => (
                  <div key={fIdx} className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-850 p-2.5 px-3.5 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
                    <input
                      type="text"
                      value={feat || ''}
                      onChange={(e) => {
                        const newList = [...list];
                        const updatedFeatures = [...(newList[currentIdx].features || [])];
                        updatedFeatures[fIdx] = e.target.value;
                        newList[currentIdx] = {
                          ...newList[currentIdx],
                          features: updatedFeatures,
                        };
                        onChange(newList);
                      }}
                      className="flex-1 bg-transparent text-white text-xs outline-none font-medium focus:text-yellow-400 transition-colors"
                      placeholder="e.g. Instant Switchover (<10ms)"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
