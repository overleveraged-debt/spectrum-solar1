import React from 'react';
import { Plus } from 'lucide-react';

interface TestimonialsEditorProps {
  testimonials: any[];
  onChange: (newList: any[]) => void;
  textareaClass: string;
}

export default function TestimonialsEditor({
  testimonials = [],
  onChange,
  textareaClass,
}: TestimonialsEditorProps) {
  const list = testimonials;

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="text-sm font-bold text-white block">Client Reviews List ({list.length})</label>
      
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
                  onChange(newList);
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
                  onChange(newList);
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
                  onChange(newList);
                }}
                className={textareaClass}
              />
            </div>

            <div className="w-16 flex items-center justify-end mt-2 md:mt-0">
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  onChange(newList);
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
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add New Testimonial
      </button>
    </div>
  );
}
