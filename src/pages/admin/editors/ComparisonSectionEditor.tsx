import React from 'react';

interface ComparisonSectionEditorProps {
  tiers: any[];
  rows: any[];
  onTiersChange: (newList: any[]) => void;
  onRowsChange: (newList: any[]) => void;
}

export default function ComparisonSectionEditor({
  tiers = [],
  rows = [],
  onTiersChange,
  onRowsChange,
}: ComparisonSectionEditorProps) {
  return (
    <div className="space-y-6 md:col-span-2">
      {/* Sizing Tiers list */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-white block">Sizing Guide / Capacity Tiers ({tiers.length})</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiers.map((t: any, idx: number) => (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
              <button
                type="button"
                onClick={() => {
                  const newList = [...tiers];
                  newList.splice(idx, 1);
                  onTiersChange(newList);
                }}
                className="absolute top-4 right-4 text-rose-450 hover:text-rose-400 text-xs font-semibold"
              >
                Remove
              </button>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Tier Name</label>
                  <input
                    type="text"
                    value={t.tier || ''}
                    onChange={(e) => {
                      const newList = [...tiers];
                      newList[idx] = { ...newList[idx], tier: e.target.value };
                      onTiersChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Emoji Icon</label>
                  <input
                    type="text"
                    value={t.icon || ''}
                    onChange={(e) => {
                      const newList = [...tiers];
                      newList[idx] = { ...newList[idx], icon: e.target.value };
                      onTiersChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none text-center"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Capacity</label>
                  <input
                    type="text"
                    value={t.capacity || ''}
                    onChange={(e) => {
                      const newList = [...tiers];
                      newList[idx] = { ...newList[idx], capacity: e.target.value };
                      onTiersChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Supported Items</label>
                <input
                  type="text"
                  value={t.items || ''}
                  onChange={(e) => {
                    const newList = [...tiers];
                    newList[idx] = { ...newList[idx], items: e.target.value };
                    onTiersChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Description</label>
                <input
                  type="text"
                  value={t.desc || ''}
                  onChange={(e) => {
                    const newList = [...tiers];
                    newList[idx] = { ...newList[idx], desc: e.target.value };
                    onTiersChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const newList = [...tiers, { tier: "New Tier", icon: "⚡", items: "Essential devices", capacity: "1kVA", desc: "Sizing details" }];
            onTiersChange(newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add Sizing Tier
        </button>
      </div>

      {/* Comparison grid rows */}
      <div className="space-y-4 pt-4 border-t border-zinc-900">
        <label className="text-sm font-bold text-white block">Comparison Table Rows ({rows.length})</label>
        <div className="space-y-3">
          {rows.map((r: any, idx: number) => (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => {
                  const newList = [...rows];
                  newList.splice(idx, 1);
                  onRowsChange(newList);
                }}
                className="absolute top-4 right-4 text-rose-450 hover:text-rose-400 text-xs font-semibold"
              >
                Remove
              </button>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Feature / Row Name</label>
                  <input
                    type="text"
                    value={r.feature || ''}
                    onChange={(e) => {
                      const newList = [...rows];
                      newList[idx] = { ...newList[idx], feature: e.target.value };
                      onRowsChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                    placeholder="e.g. Noise Level"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Without This Product</label>
                  <input
                    type="text"
                    value={r.traditional || ''}
                    onChange={(e) => {
                      const newList = [...rows];
                      newList[idx] = { ...newList[idx], traditional: e.target.value };
                      onRowsChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                    placeholder="e.g. Generator noise"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-yellow-450 mb-1 block">With Spectrum Product</label>
                  <input
                    type="text"
                    value={r.ups || ''}
                    onChange={(e) => {
                      const newList = [...rows];
                      newList[idx] = { ...newList[idx], ups: e.target.value };
                      onRowsChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                    placeholder="e.g. Silent operation"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const newList = [...rows, { feature: "New Feature", traditional: "Traditional fallback", ups: "Our solution benefit" }];
            onRowsChange(newList);
          }}
          className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
        >
          + Add Comparison Row
        </button>
      </div>
    </div>
  );
}
