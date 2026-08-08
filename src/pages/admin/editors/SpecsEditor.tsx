import React from 'react';

interface SpecsEditorProps {
  specs: any[];
  onChange: (newList: any[]) => void;
}

export default function SpecsEditor({
  specs = [],
  onChange,
}: SpecsEditorProps) {
  const list = specs;

  return (
    <div className="space-y-4">
      <label className="text-sm font-bold text-white block">Technical Specifications Table</label>
      {list.map((item: any, idx: number) => (
        <div key={idx} className="grid grid-cols-12 gap-2 bg-zinc-950 p-3 rounded-2xl border border-zinc-900 items-center">
          <div className="col-span-5">
            <input
              type="text"
              value={item.label || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], label: e.target.value };
                onChange(newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none font-bold"
              placeholder="Spec Label (e.g. Capacity)"
            />
          </div>
          <div className="col-span-5">
            <input
              type="text"
              value={item.value || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], value: e.target.value };
                onChange(newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
              placeholder="Spec Value (e.g. 10kW)"
            />
          </div>
          <div className="col-span-2 text-right">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                onChange(newList);
              }}
              className="text-rose-400 text-xs font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newList = [...list, { label: 'Property', value: 'Details' }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors"
      >
        + Add Spec Row
      </button>
    </div>
  );
}
