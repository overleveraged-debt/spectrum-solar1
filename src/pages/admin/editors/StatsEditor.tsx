import React from 'react';
import { Plus } from 'lucide-react';

interface StatsEditorProps {
  stats: any[];
  onChange: (newList: any[]) => void;
}

export default function StatsEditor({
  stats = [],
  onChange,
}: StatsEditorProps) {
  const list = stats;

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="text-sm font-bold text-white block">Careers Statistics List ({list.length})</label>
      
      {/* Table Header Row */}
      {list.length > 0 && (
        <div className="hidden md:flex items-center gap-4 px-5 text-[10px] font-black uppercase tracking-wider text-zinc-500">
          <div className="flex-1">Statistic Value (e.g. 25 Yrs)</div>
          <div className="flex-1">Statistic Label (e.g. Brand Legacy)</div>
          <div className="w-16 text-right">Action</div>
        </div>
      )}

      <div className="space-y-2">
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-4 relative animate-fade-in">
            <div className="flex-1 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Stat Value</label>
              <input
                type="text"
                placeholder="e.g. 25 Yrs"
                value={item.value || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], value: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>

            <div className="flex-1 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Stat Label</label>
              <input
                type="text"
                placeholder="e.g. Brand Legacy"
                value={item.label || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], label: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
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
          const newList = [...list, { value: '', label: '' }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Statistic Item
      </button>
    </div>
  );
}
