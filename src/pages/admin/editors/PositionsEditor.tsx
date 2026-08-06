import React from 'react';
import { Plus } from 'lucide-react';

interface PositionsEditorProps {
  positions: any[];
  onChange: (newList: any[]) => void;
  textareaClass: string;
}

export default function PositionsEditor({
  positions = [],
  onChange,
  textareaClass,
}: PositionsEditorProps) {
  const list = positions;

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="text-sm font-bold text-white block">Job Openings List ({list.length})</label>
      
      {/* Table Header Row */}
      {list.length > 0 && (
        <div className="hidden md:flex items-center gap-4 px-5 text-[10px] font-black uppercase tracking-wider text-zinc-500">
          <div className="flex-1">Position Title</div>
          <div className="w-32">Department</div>
          <div className="w-32">Location</div>
          <div className="w-24">Type</div>
          <div className="flex-[2]">Short Description</div>
          <div className="w-16 text-right">Action</div>
        </div>
      )}

      <div className="space-y-2">
        {list.map((pos: any, idx: number) => (
          <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-4 relative animate-fade-in">
            <div className="flex-1 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Position Title</label>
              <input
                type="text"
                placeholder="e.g. Solar Design Engineer"
                value={pos.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>

            <div className="w-full md:w-32 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Department</label>
              <input
                type="text"
                placeholder="Engineering"
                value={pos.dept || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], dept: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>

            <div className="w-full md:w-32 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Location</label>
              <input
                type="text"
                placeholder="Kochi, Kerala"
                value={pos.loc || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], loc: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>

            <div className="w-full md:w-24 space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Type</label>
              <input
                type="text"
                placeholder="Full-time"
                value={pos.type || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], type: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
              />
            </div>

            <div className="flex-[2] space-y-1 md:space-y-0">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block md:hidden">Short Description</label>
              <textarea
                placeholder="Job role overview..."
                value={pos.desc || ''}
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
          const newList = [...list, { title: 'New Position', dept: 'Engineering', loc: 'Kochi, Kerala', type: 'Full-time', desc: 'Job role overview details...' }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Job Opening
      </button>
    </div>
  );
}
