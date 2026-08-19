import React from 'react';
import { Plus, Trash2, Upload, Loader2, Image as ImageIcon, MapPin, Zap } from 'lucide-react';

export interface GalleryItem {
  id?: number | string;
  src: string;
  category: 'residential' | 'commercial' | 'industrial' | string;
  title: string;
  location: string;
  capacity: string;
}

interface GalleryEditorProps {
  galleryItems: GalleryItem[];
  onChange: (newList: GalleryItem[]) => void;
  onImageUpload?: (itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage?: string | null;
}

export default function GalleryEditor({
  galleryItems = [],
  onChange,
  onImageUpload,
  uploadingImage,
}: GalleryEditorProps) {
  const list = galleryItems;

  const handleAddItem = () => {
    const newItem: GalleryItem = {
      id: Date.now(),
      src: '/images/p01.jpg',
      category: 'residential',
      title: 'New Solar Installation',
      location: 'Kerala',
      capacity: '5kW On-Grid',
    };
    onChange([newItem, ...list]);
  };

  const handleUpdateItem = (index: number, updatedFields: Partial<GalleryItem>) => {
    const updatedList = [...list];
    updatedList[index] = {
      ...updatedList[index],
      ...updatedFields,
    };
    onChange(updatedList);
  };

  const handleDeleteItem = (index: number) => {
    const updatedList = list.filter((_, i) => i !== index);
    onChange(updatedList);
  };

  return (
    <div className="space-y-6 md:col-span-2">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-zinc-950 border border-zinc-850 rounded-2xl">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-yellow-400" />
            Gallery Photos ({list.length} items)
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage, upload, edit, and categorize photo cards displayed on the public Gallery page.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer transition-colors shrink-0 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Photo</span>
        </button>
      </div>

      {/* Grid of Editable Photo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {list.map((item, idx) => {
          const uploadKey = `gallery_item_${idx}`;
          const isUploading = uploadingImage === uploadKey;

          return (
            <div
              key={item.id || idx}
              className="bg-zinc-950 border border-zinc-850 rounded-2xl p-5 space-y-4 relative group hover:border-zinc-700 transition-colors"
            >
              {/* Top Bar: Item Number & Delete */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-yellow-400 tracking-wider">
                  Photo #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview & Upload Button */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center relative">
                  {item.src ? (
                    <img src={item.src} alt={item.title || 'Gallery item'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-zinc-600 text-[10px] font-bold">No Image</span>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center">
                  {onImageUpload && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onImageUpload(idx, e)}
                        className="hidden"
                        id={`gallery-upload-${idx}`}
                        disabled={uploadingImage !== null && uploadingImage !== undefined}
                      />
                      <label
                        htmlFor={`gallery-upload-${idx}`}
                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs py-2 px-3.5 rounded-xl cursor-pointer transition-all shadow-sm active:scale-95"
                      >
                        {isUploading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{isUploading ? 'Uploading...' : 'Replace Photo'}</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata Fields */}
              <div className="space-y-3 pt-1">
                {/* Title */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Project / Title
                  </label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleUpdateItem(idx, { title: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
                    placeholder="e.g. Premium Residential Solar"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Category
                    </label>
                    <select
                      value={item.category || 'residential'}
                      onChange={(e) => handleUpdateItem(idx, { category: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-2 px-2 text-xs outline-none focus:border-yellow-400/50 transition-all capitalize cursor-pointer font-medium"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-yellow-400" /> Location
                    </label>
                    <input
                      type="text"
                      value={item.location || ''}
                      onChange={(e) => handleUpdateItem(idx, { location: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-2 px-2.5 text-xs outline-none focus:border-yellow-400/50 transition-all"
                      placeholder="e.g. Kannur"
                    />
                  </div>

                  {/* Capacity */}
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 text-yellow-400" /> Capacity
                    </label>
                    <input
                      type="text"
                      value={item.capacity || ''}
                      onChange={(e) => handleUpdateItem(idx, { capacity: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-2 px-2.5 text-xs outline-none focus:border-yellow-400/50 transition-all font-semibold"
                      placeholder="e.g. 5kW On-Grid"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
