import React from 'react';
import { Plus } from 'lucide-react';

interface HowItWorksStepsEditorProps {
  howItWorksSteps: any[];
  onChange: (newList: any[]) => void;
  iconOptions?: string[];
}

const defaultIcons = ['Zap', 'Sun', 'Battery', 'Home', 'Activity', 'Thermometer', 'Droplets', 'CheckCircle2', 'Settings', 'ShieldCheck', 'Clock', 'Server', 'Leaf', 'Layers', 'Building2'];

export default function HowItWorksStepsEditor({
  howItWorksSteps = [],
  onChange,
  iconOptions = defaultIcons,
}: HowItWorksStepsEditorProps) {
  const list = howItWorksSteps;

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="text-sm font-bold text-white block">How It Works Steps ({list.length})</label>
      <div className="space-y-3">
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                onChange(newList);
              }}
              className="absolute top-4 right-4 text-rose-400 text-xs font-semibold"
            >
              Remove Step
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Number</label>
                <input
                  type="text"
                  value={item.step || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], step: e.target.value };
                    onChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                  placeholder="e.g. 01"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Icon</label>
                <select
                  value={item.icon || 'Zap'}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...newList[idx], icon: e.target.value };
                    onChange(newList);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none cursor-pointer"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Title</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="e.g. Charge"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Description</label>
              <textarea
                value={item.desc || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], desc: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="e.g. Grid charges the lithium battery at high speed."
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          const nextNum = String(list.length + 1).padStart(2, '0');
          const newList = [...list, { step: nextNum, icon: 'Zap', title: 'New Step', desc: 'Description of the step.' }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Mechanism Step
      </button>
    </div>
  );
}
