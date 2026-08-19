import React from 'react';

interface InstallationStepsEditorProps {
  installationSteps: any[];
  onChange: (newList: any[]) => void;
  textareaClass: string;
}

export default function InstallationStepsEditor({
  installationSteps = [],
  onChange,
  textareaClass,
}: InstallationStepsEditorProps) {
  const list = installationSteps;

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white block">Installation Process Timeline ({list.length} phases)</label>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Fixed Engineering Milestones</span>
      </div>
      <div className="space-y-3">
        {list.map((step: any, idx: number) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-start gap-4 bg-zinc-950/60 border border-zinc-900 p-4 rounded-2xl">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5 block">Phase #{idx + 1} Headline</label>
              <input
                type="text"
                value={step.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all font-medium"
                placeholder="e.g. Energy Audit & Load Sizing"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5 block">Milestone Details</label>
              <textarea
                value={step.desc || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], desc: e.target.value };
                  onChange(newList);
                }}
                className={textareaClass}
                placeholder="Phase details..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
