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
      {tiers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-white block">Sizing Guide / Capacity Tiers ({tiers.length} tiers)</label>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Fixed Tier Sizing</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tiers.map((t: any, idx: number) => (
              <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
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
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none focus:border-yellow-400/50 font-bold"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Icon / Emoji</label>
                    <input
                      type="text"
                      value={t.icon || ''}
                      onChange={(e) => {
                        const newList = [...tiers];
                        newList[idx] = { ...newList[idx], icon: e.target.value };
                        onTiersChange(newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none text-center focus:border-yellow-400/50"
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
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none focus:border-yellow-400/50 font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Supported Appliances</label>
                  <input
                    type="text"
                    value={t.items || ''}
                    onChange={(e) => {
                      const newList = [...tiers];
                      newList[idx] = { ...newList[idx], items: e.target.value };
                      onTiersChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none focus:border-yellow-400/50"
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
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-1.5 px-2.5 text-xs outline-none focus:border-yellow-400/50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison grid rows */}
      <div className="space-y-4 pt-4 border-t border-zinc-900">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-white block">Comparison Table Rows ({rows.length} metrics)</label>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Fixed Metric Rows</span>
        </div>
        <div className="space-y-3">
          {rows.map((r: any, idx: number) => (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Category / Feature #{idx + 1}</label>
                  <input
                    type="text"
                    value={r.feature || ''}
                    onChange={(e) => {
                      const newList = [...rows];
                      newList[idx] = { ...newList[idx], feature: e.target.value };
                      onRowsChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 font-medium"
                    placeholder="e.g. Monthly Electricity Bill"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Normal / Traditional</label>
                  <input
                    type="text"
                    value={r.traditional || ''}
                    onChange={(e) => {
                      const newList = [...rows];
                      newList[idx] = { ...newList[idx], traditional: e.target.value };
                      onRowsChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50"
                    placeholder="e.g. ₹3,000–₹20,000+"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-yellow-400 mb-1 block">With Spectrum Solar</label>
                  <input
                    type="text"
                    value={r.solar || r.ups || ''}
                    onChange={(e) => {
                      const newList = [...rows];
                      const key = 'solar' in newList[idx] ? 'solar' : 'ups';
                      newList[idx] = { ...newList[idx], [key]: e.target.value };
                      onRowsChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 font-semibold text-yellow-400"
                    placeholder="e.g. Near Zero"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
