import React from 'react';

interface OpportunitiesCardsEditorProps {
  opportunities: any[];
  onChange: (newList: any[]) => void;
}

export default function OpportunitiesCardsEditor({
  opportunities = [],
  onChange,
}: OpportunitiesCardsEditorProps) {
  const list = opportunities;

  return (
    <div className="space-y-6 md:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white block">Opportunity Offerings Cards ({list.length})</label>
      </div>

      <div className="space-y-6">
        {list.map((item: any, idx: number) => {
          const benefits = Array.isArray(item.benefits) ? item.benefits : [];

          return (
            <div key={idx} className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-xs font-black uppercase text-yellow-400 tracking-wider">
                  Card #{idx + 1}: {item.title || 'Untitled Card'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Title</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...item, title: e.target.value };
                      onChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50"
                    placeholder="e.g. Franchise"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Subtitle</label>
                  <input
                    type="text"
                    value={item.subtitle || ''}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...item, subtitle: e.target.value };
                      onChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50"
                    placeholder="e.g. Own a Spectrum Powers outlet"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Description</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => {
                    const newList = [...list];
                    newList[idx] = { ...item, description: e.target.value };
                    onChange(newList);
                  }}
                  rows={2}
                  className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none resize-none focus:border-yellow-400/50"
                  placeholder="Card description text..."
                />
              </div>

              {/* Fixed Individual Benefit Bullet Points (5 fields per card, no add/delete) */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-black uppercase text-zinc-400 block tracking-wider">
                  Key Benefit Bullet Points
                </label>

                <div className="space-y-2">
                  {[0, 1, 2, 3, 4].map((bIdx: number) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-zinc-600 w-16">Point {bIdx + 1}:</span>
                      <input
                        type="text"
                        value={benefits[bIdx] || ''}
                        onChange={(e) => {
                          const newList = [...list];
                          const newBenefits = [...benefits];
                          // Ensure array size up to bIdx
                          while (newBenefits.length <= bIdx) {
                            newBenefits.push('');
                          }
                          newBenefits[bIdx] = e.target.value;
                          newList[idx] = { ...item, benefits: newBenefits };
                          onChange(newList);
                        }}
                        className="flex-1 bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50"
                        placeholder={`Bullet point ${bIdx + 1}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Investment Tagline</label>
                  <input
                    type="text"
                    value={item.investment || ''}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...item, investment: e.target.value };
                      onChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50"
                    placeholder="e.g. ₹15L – ₹50L"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Card Image</label>
                  <input
                    type="text"
                    value={item.image || ''}
                    onChange={(e) => {
                      const newList = [...list];
                      newList[idx] = { ...item, image: e.target.value };
                      onChange(newList);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-850 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50"
                    placeholder="/images/franchise_hero.webp"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
