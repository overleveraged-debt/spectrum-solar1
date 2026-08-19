import React from 'react';
import { Upload, Loader2, Trash2, Image as ImageIcon } from 'lucide-react';
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
  const isLinkOrText = key.toLowerCase().includes('link') || 
                       key.toLowerCase().includes('url') && !key.toLowerCase().includes('video') && !key.toLowerCase().includes('image') ||
                       ['instagram', 'facebook', 'linkedin', 'twitter', 'phone', 'email', 'hours'].includes(key.toLowerCase());

  const isImage = !isLinkOrText && (
    key.toLowerCase().includes('image') ||
    key.toLowerCase().includes('img') ||
    key.toLowerCase().includes('photo') ||
    key.toLowerCase().includes('banner') ||
    key.toLowerCase().includes('poster') ||
    (typeof val === 'string' && (val.includes('.webp') || val.includes('.png') || val.includes('.jpg') || val.includes('.jpeg') || val.includes('.svg') || val.includes('/images/')))
  );
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
    const isUploading = uploadingImage === key;
    return (
      <div key={key} className={`space-y-2 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl ${colSpanClass}`}>
        <div>
          <label className="font-semibold text-sm text-zinc-200 block">{meta.label}</label>
          {meta.desc && <span className="text-xs text-zinc-500 mt-0.5 block">{meta.desc}</span>}
        </div>
        <div className="flex items-center gap-5 pt-2">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 flex items-center justify-center relative shadow-inner">
            {val ? (
              <img src={val} alt={meta.label} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 text-zinc-600">
                <ImageIcon className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">No Image</span>
              </div>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(key, e)}
              className="hidden"
              id={`file-upload-${key}`}
              disabled={isUploading}
            />
            <label
              htmlFor={`file-upload-${key}`}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer transition-all shadow-sm active:scale-95"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{isUploading ? 'Uploading Photo...' : 'Update / Change Photo'}</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (isVideo) {
    const isUploading = uploadingImage === key;
    const resolvedVideoSrc = val || '/videos/hero-bg.mp4';
    return (
      <div key={key} className={`space-y-4 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl ${colSpanClass}`}>
        <div className="flex items-center justify-between">
          <div>
            <label className="font-semibold text-sm text-zinc-300 block">{meta.label}</label>
            {meta.desc && <span className="text-xs text-zinc-500 mt-1 block">{meta.desc}</span>}
          </div>
          <span className="text-[10px] bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Active Video
          </span>
        </div>

        {/* Video Preview Player */}
        <div className="rounded-2xl overflow-hidden bg-black border border-zinc-850 aspect-video max-h-56 w-full flex items-center justify-center relative shadow-inner">
          <video
            src={resolvedVideoSrc}
            controls
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            onChange={(e) => handleImageUpload(key, e)}
            className="hidden"
            id={`file-upload-${key}`}
            disabled={isUploading}
          />
          <label
            htmlFor={`file-upload-${key}`}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs py-2.5 px-5 rounded-xl cursor-pointer transition-all shadow-sm active:scale-95"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{isUploading ? 'Uploading Video to Cloud...' : 'Update / Change Video'}</span>
          </label>
        </div>
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
