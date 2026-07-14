import { useState, useEffect } from 'react';
import { sanityClient } from '../../lib/sanityClient';
import { Loader2, Search, Trash2, Calendar, Phone, Mail, Link, AlertCircle, Briefcase, RotateCw } from 'lucide-react';

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  resumeUrl: string;
  createdAt: string;
}

export default function ApplicationsViewer() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await sanityClient.fetch(`*[_type == "jobApplication"] | order(createdAt desc)`);
      setApplications(data || []);
    } catch (e) {
      console.error("Failed to fetch applications", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this job application?")) return;

    try {
      setDeletingId(id);
      await sanityClient.delete(id);
      setApplications(prev => prev.filter(item => item._id !== id));
      if (selectedApp?._id === id) {
        setSelectedApp(null);
      }
    } catch (err) {
      console.error("Failed to delete application", err);
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredApps = applications.filter(app => {
    return (
      app.name?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase()) ||
      app.phone?.toLowerCase().includes(search.toLowerCase()) ||
      app.position?.toLowerCase().includes(search.toLowerCase()) ||
      app.coverLetter?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const formatDate = (isoStr: string) => {
    if (!isoStr) return 'N/A';
    const d = new Date(isoStr);
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Header Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search applicants by name, position, email or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:border-yellow-400 outline-none transition-colors"
          />
        </div>

        <button
          onClick={fetchApplications}
          disabled={loading}
          className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-all flex items-center justify-center w-full md:w-auto disabled:opacity-50 gap-2"
          title="Refresh Applications"
        >
          <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="md:hidden text-xs font-semibold">Refresh</span>
        </button>
      </div>

      {/* Grid of Results / Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          <p className="text-zinc-500 text-sm">Loading applications...</p>
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 border border-dashed border-zinc-800 rounded-3xl">
          <AlertCircle className="w-10 h-10 text-zinc-650 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-zinc-400 mb-1">No Applications Found</h3>
          <p className="text-zinc-600 text-xs">When users apply for positions on your careers page, they will show up here.</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800">
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Applied At</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Applicant Details</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Position</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Resume / Profile</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850">
                {filteredApps.map((app) => (
                  <tr
                    key={app._id}
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-zinc-850/45 cursor-pointer transition-colors"
                  >
                    <td className="py-5 px-6 whitespace-nowrap text-xs text-zinc-400 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                        {formatDate(app.createdAt)}
                      </div>
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="font-bold text-sm text-white">{app.name || 'Anonymous'}</div>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-zinc-600" /> {app.phone || 'N/A'}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-zinc-600" /> {app.email || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap text-xs">
                      <span className="flex items-center gap-1.5 text-yellow-450 font-bold">
                        <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                        {app.position}
                      </span>
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap text-xs" onClick={(e) => e.stopPropagation()}>
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-yellow-450 hover:underline"
                        >
                          <Link className="w-3 h-3" />
                          <span>View Profile / Link</span>
                        </a>
                      ) : (
                        <span className="text-zinc-650">No Link Provided</span>
                      )}
                    </td>
                    <td className="py-5 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleDelete(app._id, e)}
                        disabled={deletingId === app._id}
                        className="p-2 hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 rounded-xl transition-all inline-flex items-center justify-center"
                        title="Delete Application"
                      >
                        {deletingId === app._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details View Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest bg-yellow-400/10 text-yellow-450 px-2 py-0.5 rounded border border-yellow-400/25">
                  JOB APPLICATION
                </span>
                <h3 className="text-xl font-bold mt-2 text-white">{selectedApp.name}</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-zinc-500 hover:text-white transition-colors p-2 text-sm font-semibold hover:bg-zinc-850 rounded-xl"
              >
                Close
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-800">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Applied Position</span>
                  <span className="text-xs text-yellow-450 font-bold">{selectedApp.position}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Contact Phone</span>
                  <a href={`tel:${selectedApp.phone}`} className="text-xs text-zinc-300 font-medium hover:underline block">
                    {selectedApp.phone || 'N/A'}
                  </a>
                </div>
                <div className="space-y-1 mt-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Email Address</span>
                  <a href={`mailto:${selectedApp.email}`} className="text-xs text-zinc-300 font-medium hover:underline block">
                    {selectedApp.email || 'N/A'}
                  </a>
                </div>
                <div className="space-y-1 mt-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Resume / Portfolio Link</span>
                  {selectedApp.resumeUrl ? (
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-yellow-400 font-bold hover:underline block truncate"
                    >
                      {selectedApp.resumeUrl}
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-650 block">None Provided</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Cover Letter / Details</span>
                <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-2xl text-sm leading-relaxed text-zinc-300 whitespace-pre-line font-light">
                  {selectedApp.coverLetter || 'No cover letter provided.'}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-850 bg-zinc-950 flex items-center justify-between">
              <button
                onClick={(e) => {
                  handleDelete(selectedApp._id, e);
                }}
                className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Application</span>
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Okay, Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
