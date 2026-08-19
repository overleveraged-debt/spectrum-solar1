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
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white block">Benefit Cards ({list.length} cards)</label>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Fixed Advantage Grid</span>
      </div>

      {list.length > 0 && (
        <div className="hidden md:grid grid-cols-[1fr_2.5fr] gap-4 px-4 text-[10px] font-black uppercase tracking-wider text-zinc-500">
          <div>Benefit Headline</div>
          <div>Description Text</div>
        </div>
      )}

      <div className="space-y-3">
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-4 items-start">
            <div className="space-y-1">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Benefit #{idx + 1} Headline</label>
              <input
                type="text"
                placeholder="e.g. Growth Opportunities"
                value={item.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all font-medium"
              />
            </div>

            <div className="space-y-1">
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
          </div>
        ))}
      </div>
    </div>
  );
}
