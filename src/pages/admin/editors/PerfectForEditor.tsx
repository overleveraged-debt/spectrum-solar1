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
      <label className="text-sm font-bold text-white block">Perfect For Application Scenarios ({list.length})</label>
      {list.map((item: any, idx: number) => (
        <div key={idx} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3 bg-zinc-950/40 border border-zinc-900/60 p-3 rounded-2xl">
          <div>
            {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Application Label</label>}
            <input
              type="text"
              value={item.label || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], label: e.target.value };
                onChange(newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="e.g. Home UPS Systems"
            />
          </div>
          <div>
            {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Sub-description / Context</label>}
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
          <div className={idx === 0 ? "pt-5" : ""}>
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                onChange(newList);
              }}
              className="text-rose-400 text-xs font-semibold hover:underline px-2 py-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newList = [...list, { icon: 'Home', label: 'New Scenario', sub: 'Sub-description text.' }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
      >
        + Add Scenario Item
      </button>
    </div>
  );
}
