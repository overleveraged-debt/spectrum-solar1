import React from 'react';

interface OverviewCardsEditorProps {
  overviewCards: any[];
  onChange: (newList: any[]) => void;
}

export default function OverviewCardsEditor({
  overviewCards = [],
  onChange,
}: OverviewCardsEditorProps) {
  const list = overviewCards;

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="text-sm font-bold text-white block">Overview Highlight Spec Cards (Max 4)</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => {
          const item = list[idx] || { label: `Spec ${idx + 1}`, value: "Value" };
          return (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Label</label>
                <input
                  type="text"
                  value={item.label || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...item, label: e.target.value };
                    onChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                  placeholder="e.g. Output"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Value</label>
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...item, value: e.target.value };
                    onChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                  placeholder="e.g. Pure Sine Wave"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
