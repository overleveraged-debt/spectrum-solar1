import React from 'react';

interface FaqsEditorProps {
  faqs: any[];
  activeFaqIdx: number | null;
  setActiveFaqIdx: (idx: number | null) => void;
  onChange: (newList: any[]) => void;
  textareaClass: string;
}

export default function FaqsEditor({
  faqs = [],
  activeFaqIdx,
  setActiveFaqIdx,
  onChange,
  textareaClass,
}: FaqsEditorProps) {
  const list = faqs;

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="text-sm font-bold text-white block">Frequently Asked Questions (FAQs) ({list.length})</label>
      <div className="space-y-3">
        {list.map((item: any, idx: number) => {
          const isExpanded = activeFaqIdx === idx;
          return (
            <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-3 relative transition-all">
              <div 
                onClick={() => setActiveFaqIdx(isExpanded ? null : idx)}
                className="flex items-center justify-between cursor-pointer pr-16"
              >
                <span className="text-xs font-bold text-zinc-300 truncate">
                  {item.q || `FAQ Item ${idx + 1} (Empty)`}
                </span>
                <span className="text-[10px] font-black uppercase text-yellow-450">
                  {isExpanded ? 'Collapse ▲' : 'Expand ▼'}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newList = [...list];
                  newList.splice(idx, 1);
                  onChange(newList);
                  if (activeFaqIdx === idx) setActiveFaqIdx(null);
                }}
                className="absolute top-4 right-4 text-rose-400 hover:text-rose-350 text-xs font-semibold"
              >
                Delete
              </button>
              {isExpanded && (
                <div className="space-y-3 pt-2 border-t border-zinc-900">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Question text</label>
                    <input
                      type="text"
                      value={item.q || ''}
                      onChange={(e) => {
                        const newList = [...list];
                        newList[idx] = { ...newList[idx], q: e.target.value };
                        onChange(newList);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none"
                      placeholder="Question text"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Answer text</label>
                    <textarea
                      value={item.a || ''}
                      onChange={(e) => {
                        const newList = [...list];
                        newList[idx] = { ...newList[idx], a: e.target.value };
                        onChange(newList);
                      }}
                      className={textareaClass}
                      placeholder="Answer text"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          const newList = [...list, { q: 'New Question', a: 'New Answer Details.' }];
          onChange(newList);
          setActiveFaqIdx(newList.length - 1);
        }}
        className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-yellow-400 text-xs py-2 rounded-xl transition-colors font-semibold"
      >
        + Add FAQ Entry
      </button>
    </div>
  );
}
