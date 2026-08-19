import React from 'react';

interface PerfectForEditorProps {
  perfectFor: any[];
  onChange: (newList: any[]) => void;
  textareaClass: string;
}

export default function PerfectForEditor({
  perfectFor = [],
  onChange,
  textareaClass,
}: PerfectForEditorProps) {
  const list = perfectFor;

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white block">Application Scenarios ({list.length} items)</label>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Fixed Scenario Stack</span>
      </div>
      <div className="space-y-3">
        {list.map((item: any, idx: number) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-start gap-4 bg-zinc-950/60 border border-zinc-900 p-4 rounded-2xl">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5 block">Application #{idx + 1} Label</label>
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], label: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all font-medium"
                placeholder="e.g. Independent Houses & Villas"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5 block">Sub-description / Context</label>
              <textarea
                value={item.sub || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], sub: e.target.value };
                  onChange(newList);
                }}
                className={textareaClass}
                placeholder="e.g. Sized perfectly for residential use"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
