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
      <label className="text-sm font-bold text-white block">Key Features Checklist ({list.length})</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 p-3 rounded-2xl relative">
            <input
              type="text"
              value={feature || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = e.target.value;
                onChange(newList);
              }}
              className="flex-1 bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="e.g. Pure Sine Wave output"
            />
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                onChange(newList);
              }}
              className="text-rose-400 hover:text-rose-350 text-xs font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          const newList = [...list, 'New Feature Item'];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
      >
        + Add Feature Checkpoint
      </button>
    </div>
  );
}
