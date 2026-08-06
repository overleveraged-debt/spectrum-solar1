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
      <label className="text-sm font-bold text-white block">Installation Process Timeline ({list.length} steps)</label>
      <div className="space-y-3">
        {list.map((step: any, idx: number) => (
          <div key={idx} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3 bg-zinc-950/40 border border-zinc-900/60 p-3 rounded-2xl">
            <div>
              {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Step Title</label>}
              <input
                type="text"
                value={step.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                placeholder="e.g. Phase Title"
              />
            </div>
            <div>
              {idx === 0 && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">Description</label>}
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
            <div className={idx === 0 ? "pt-5" : ""}>
              <button
                type="button"
                onClick={() => {
                  const newList = [...list];
                  newList.splice(idx, 1);
                  onChange(newList);
                }}
                className="text-rose-450 hover:text-rose-400 text-xs font-semibold px-2 py-2"
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
          const newList = [...list, { title: "New Phase", desc: "Phase description details." }];
          onChange(newList);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2.5 rounded-xl transition-colors font-semibold"
      >
        + Add Timeline Step
      </button>
    </div>
  );
}
