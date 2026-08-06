import React from 'react';
import { Plus } from 'lucide-react';

interface OfficesEditorProps {
  offices: any[];
  onChange: (newList: any[]) => void;
  textareaClass: string;
}

export default function OfficesEditor({
  offices = [],
  onChange,
  textareaClass,
}: OfficesEditorProps) {
  const list = offices;

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="text-sm font-bold text-white block">Regional Offices List ({list.length})</label>
      
      {/* Table Header Row */}
      {list.length > 0 && (
        <div className="hidden md:flex items-center gap-4 px-5 text-[10px] font-black uppercase tracking-wider text-zinc-500">
          <div className="w-32">City / Location</div>
          <div className="w-24">Badge Tag</div>
          <div className="flex-[2]">Full Address</div>
          <div className="flex-1">Phone Number</div>
          <div className="w-16 text-right">Action</div>
        </div>
      )}

      <div className="space-y-2">
        {list.map((off: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-4 relative animate-fade-in">
            <div className="w-full md:w-32 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">City / Location</label>
              <input
                type="text"
                placeholder="e.g. Kochi"
                value={off.city || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], city: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all font-bold"
              />
            </div>

            <div className="w-full md:w-24 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Badge Tag</label>
              <input
                type="text"
                placeholder="Headquarters"
                value={off.tag || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], tag: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>

            <div className="flex-[2] space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Full Address</label>
              <textarea
                placeholder="Building name, street, pincode..."
                value={off.address || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], address: e.target.value };
                  onChange(newList);
                }}
                className={textareaClass}
              />
            </div>

            <div className="flex-1 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Phone Number</label>
              <input
                type="text"
                placeholder="+91 9447..."
                value={off.phone || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], phone: e.target.value };
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
          const newList = [...list, { city: 'New Location', tag: 'Regional Office', address: 'Full address details...', phone: '+91 94470 00000' }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Regional Office
      </button>
    </div>
  );
}
