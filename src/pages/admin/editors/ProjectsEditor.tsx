import React from 'react';
import { Plus, Trash2, Upload, Loader2, Briefcase, MapPin, Zap } from 'lucide-react';

export interface ProjectItem {
  name: string;
  location: string;
  capacity: string;
  type: string;
  image: string;
}

interface ProjectsEditorProps {
  projects: ProjectItem[];
  onChange: (newList: ProjectItem[]) => void;
  onImageUpload?: (itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage?: string | null;
}

export default function ProjectsEditor({
  projects = [],
  onChange,
  onImageUpload,
  uploadingImage,
}: ProjectsEditorProps) {
  const list = projects;

  const handleAddProject = () => {
    const newProject: ProjectItem = {
      name: 'New Installation Project',
      location: 'Kochi',
      capacity: '25 KW',
      type: 'Commercial',
      image: '/images/p01.jpg',
    };
    onChange([newProject, ...list]);
  };

  const handleUpdateProject = (index: number, updatedFields: Partial<ProjectItem>) => {
    const updatedList = [...list];
    updatedList[index] = {
      ...updatedList[index],
      ...updatedFields,
    };
    onChange(updatedList);
  };

  const handleDeleteProject = (index: number) => {
    const updatedList = list.filter((_, i) => i !== index);
    onChange(updatedList);
  };

  return (
    <div className="space-y-6 md:col-span-2">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-zinc-950 border border-zinc-850 rounded-2xl">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-yellow-400" />
            Projects Portfolio ({list.length} installations)
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage showcase project cards, client names, capacities, locations, and installation photos.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer transition-colors shrink-0 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Grid of Editable Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {list.map((proj, idx) => {
          const uploadKey = `project_item_${idx}`;
          const isUploading = uploadingImage === uploadKey;

          return (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-850 rounded-2xl p-5 space-y-4 relative group hover:border-zinc-700 transition-colors"
            >
              {/* Top Bar: Item Number & Delete */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-yellow-400 tracking-wider">
                  Project #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(idx)}
                  className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview & Upload Button */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center relative">
                  {proj.image ? (
                    <img src={proj.image} alt={proj.name || 'Project'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-zinc-600 text-[10px] font-bold">No Image</span>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center">
                  {onImageUpload && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onImageUpload(idx, e)}
                        className="hidden"
                        id={`project-upload-${idx}`}
                        disabled={uploadingImage !== null && uploadingImage !== undefined}
                      />
                      <label
                        htmlFor={`project-upload-${idx}`}
                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs py-2 px-3.5 rounded-xl cursor-pointer transition-all shadow-sm active:scale-95"
                      >
                        {isUploading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{isUploading ? 'Uploading...' : 'Replace Photo'}</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata Fields */}
              <div className="space-y-3 pt-1">
                {/* Project / Client Name */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Project / Client Name
                  </label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => handleUpdateProject(idx, { name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/50 transition-all"
                    placeholder="e.g. Koyili Hospital"
                  />
                </div>

                {/* Type, Location, Capacity */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Project Type
                    </label>
                    <select
                      value={proj.type || 'Commercial'}
                      onChange={(e) => handleUpdateProject(idx, { type: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-2 px-2 text-xs outline-none focus:border-yellow-400/50 transition-all cursor-pointer font-medium"
                    >
                      <option value="Commercial">Commercial</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Government">Government</option>
                      <option value="Residential">Residential</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-yellow-400" /> Location
                    </label>
                    <input
                      type="text"
                      value={proj.location || ''}
                      onChange={(e) => handleUpdateProject(idx, { location: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-2 px-2.5 text-xs outline-none focus:border-yellow-400/50 transition-all"
                      placeholder="e.g. Kannur"
                    />
                  </div>

                  {/* Capacity */}
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 text-yellow-400" /> Capacity
                    </label>
                    <input
                      type="text"
                      value={proj.capacity || ''}
                      onChange={(e) => handleUpdateProject(idx, { capacity: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-2 px-2.5 text-xs outline-none focus:border-yellow-400/50 transition-all font-semibold"
                      placeholder="e.g. 50 KW"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
