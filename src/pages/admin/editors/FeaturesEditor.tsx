import React from 'react';

interface FeaturesEditorProps {
  features: string[];
  onChange: (newList: string[]) => void;
}

export default function FeaturesEditor({
  features = [],
  onChange,
}: FeaturesEditorProps) {
  const list = features;

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white block">Checklist & Benefits Items ({list.length} items)</label>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Fixed Card Items</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 p-3 rounded-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 ml-1 shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
            <input
              type="text"
              value={feature || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = e.target.value;
                onChange(newList);
              }}
              className="flex-1 bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all font-medium"
              placeholder="e.g. Verified leads from Spectrum Solar"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
