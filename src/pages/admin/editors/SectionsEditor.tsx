import React from 'react';
import { Plus } from 'lucide-react';

interface SectionsEditorProps {
  sections: any[];
  onChange: (newList: any[]) => void;
}

export default function SectionsEditor({
  sections = [],
  onChange,
}: SectionsEditorProps) {
  const list = sections;

  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex items-center justify-between pb-2">
        <label className="text-sm font-bold text-white block">Document Paragraph Sections ({list.length})</label>
        <button
          type="button"
          onClick={() => {
            const newList = [...list, { title: 'New Section Title', text: 'Section body paragraph content...' }];
            onChange(newList);
          }}
          className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow shadow-yellow-400/10"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Section</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((item: any, idx: number) => (
          <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4 relative">
            <button
              type="button"
              onClick={() => {
                const newList = [...list];
                newList.splice(idx, 1);
                onChange(newList);
              }}
              className="absolute top-5 right-5 text-rose-400 text-xs font-semibold hover:text-rose-300 transition-colors"
            >
              Remove
            </button>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-semibold block">Section Header Title</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], title: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white font-bold rounded-xl py-2.5 px-3 text-xs outline-none focus:border-yellow-400/30"
                placeholder="e.g. 1. Introduction"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-semibold block">Section Body Paragraph</label>
              <textarea
                value={item.text || ''}
                onChange={(e) => {
                  const newList = [...list];
                  newList[idx] = { ...newList[idx], text: e.target.value };
                  onChange(newList);
                }}
                className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30 transition-all duration-300 h-9 focus:h-28 resize-none py-2.5 overflow-y-auto"
                placeholder="Write the policy details here..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
