import React from 'react';
import { Plus } from 'lucide-react';

interface BenefitsEditorProps {
  benefits: any[];
  onChange: (newList: any[]) => void;
  iconOptions?: string[];
}

const defaultIcons = [
  'Zap', 'Sun', 'Battery', 'Home', 'Activity', 'Thermometer', 'Droplets',
  'CheckCircle2', 'Settings', 'ShieldCheck', 'Clock', 'Server', 'Leaf', 'Layers', 'Building2'
];

export default function BenefitsEditor({
  benefits = [],
  onChange,
  iconOptions = defaultIcons,
}: BenefitsEditorProps) {
  const list = benefits;

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white block">Key Benefits List ({list.length} cards)</label>
        <span className="text-[10px] text-zinc-500 uppercase font-bold">Fixed Bento Grid Items</span>
      </div>
      {list.map((item: any, idx: number) => (
        <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">
                {idx === 0 ? "Featured Highlight Benefit Title" : `Benefit #${idx + 1} Title`}
              </label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all font-medium"
                placeholder="e.g. Pure Sine Wave"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Benefit Icon</label>
              <select
                value={item.icon || 'Zap'}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], icon: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none cursor-pointer focus:border-yellow-400/50 transition-all"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Benefit Description</label>
            <textarea
              value={item.desc || ''}
              onChange={(e) => {
                const newList = [...list];
                newList[idx] = { ...newList[idx], desc: e.target.value };
                onChange(newList);
              }}
              className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
              placeholder="Description detail..."
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
