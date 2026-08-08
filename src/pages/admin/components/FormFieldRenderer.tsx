import React from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { fieldMeta } from '../config/pageEditorConfig';

interface FormFieldRendererProps {
  fieldKey: string;
  val: any;
  handleFieldChange: (key: string, value: any) => void;
  handleImageUpload: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage: string | null;
}

export default function FormFieldRenderer({
  fieldKey: key,
  val,
  handleFieldChange,
  handleImageUpload,
  uploadingImage,
}: FormFieldRendererProps) {
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
          type="button"
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
}
