import React from 'react';
import { Plus } from 'lucide-react';

interface WhyItemsEditorProps {
  whyItems: any[];
  onChange: (newList: any[]) => void;
  textareaClass: string;
}

export default function WhyItemsEditor({
  whyItems = [],
  onChange,
  textareaClass,
}: WhyItemsEditorProps) {
  const list = whyItems;

  return (
    <div className="space-y-4 md:col-span-2">
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
                  onChange(newList);
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
          const newList = [...list, { title: 'New Benefit', desc: 'Benefit description' }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Benefit Item
      </button>
    </div>
  );
}
