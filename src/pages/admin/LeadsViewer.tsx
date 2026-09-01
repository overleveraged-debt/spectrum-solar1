import { useState, useEffect } from 'react';
import { sanityClient } from '../../lib/sanityClient';
import { Loader2, Search, Trash2, Calendar, Phone, Mail, AlertCircle, RotateCw } from 'lucide-react';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  description: string;
  createdAt: string;
}

interface ActivityLog {
  _id: string;
  activityType: 'call' | 'whatsapp';
  title: string;
  page: string;
  createdAt: string;
}

export default function LeadsViewer() {
  const [activeSubTab, setActiveSubTab] = useState<'enquiries' | 'activity'>('enquiries');
  const [leads, setLeads] = useState<Enquiry[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Enquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [leadsData, logsData] = await Promise.all([
        sanityClient.fetch(`*[_type == "enquiry"] | order(createdAt desc)`),
        sanityClient.fetch(`*[_type == "activityLog"] | order(createdAt desc)`)
      ]);
      setLeads(leadsData || []);
      setActivityLogs(logsData || []);
    } catch (e) {
      console.error("Failed to fetch enquiries or activity", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteLead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      setDeletingId(id);
      await sanityClient.delete(id);
      setLeads(prev => prev.filter(item => item._id !== id));
      if (selectedLead?._id === id) setSelectedLead(null);
    } catch (err) {
      console.error("Failed to delete enquiry", err);
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this activity log?")) return;

    try {
      setDeletingId(id);
      await sanityClient.delete(id);
      setActivityLogs(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Failed to delete log", err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone?.toLowerCase().includes(search.toLowerCase()) ||
      lead.description?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filterType === 'all' || lead.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch =
      log.title?.toLowerCase().includes(search.toLowerCase()) ||
      log.page?.toLowerCase().includes(search.toLowerCase()) ||
      log.activityType?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filterType === 'all' || log.activityType === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalCalls = activityLogs.filter(l => l.activityType === 'call').length;
  const totalWhatsApp = activityLogs.filter(l => l.activityType === 'whatsapp').length;

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
      {/* Sub-Tab Navigation Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setActiveSubTab('enquiries'); setFilterType('all'); }}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all uppercase tracking-wider ${
              activeSubTab === 'enquiries'
                ? 'bg-yellow-400 text-zinc-950 shadow-lg shadow-yellow-400/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            Form Enquiries ({leads.length})
          </button>
          <button
            onClick={() => { setActiveSubTab('activity'); setFilterType('all'); }}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-2 ${
              activeSubTab === 'activity'
                ? 'bg-yellow-400 text-zinc-950 shadow-lg shadow-yellow-400/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <span>Call & WhatsApp Activity</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-zinc-800 text-yellow-400 font-mono">
              {activityLogs.length}
            </span>
          </button>
        </div>

        {activeSubTab === 'activity' && (
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-xl border border-yellow-400/20">
              <Phone className="w-3.5 h-3.5" /> {totalCalls} Calls
            </span>
            <span className="flex items-center gap-1.5 text-green-400 bg-green-500/10 px-3 py-1 rounded-xl border border-green-500/20">
              <Phone className="w-3.5 h-3.5" /> {totalWhatsApp} WhatsApp
            </span>
          </div>
        )}
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder={activeSubTab === 'enquiries' ? "Search leads by name, email, phone or content..." : "Search clicks by trigger title or page..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:border-yellow-400 outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {activeSubTab === 'enquiries' ? (
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-48 bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 cursor-pointer"
            >
              <option value="all">All Enquiries</option>
              <option value="general">General</option>
              <option value="solar">Solar Installation</option>
              <option value="backup">Power Backup</option>
              <option value="franchise">Franchise</option>
              <option value="dealership">Dealership</option>
              <option value="freelance">Freelance Partner</option>
              <option value="support">Support Ticket</option>
            </select>
          ) : (
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-48 bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 cursor-pointer"
            >
              <option value="all">All Interactions</option>
              <option value="call">Phone Calls</option>
              <option value="whatsapp">WhatsApp Clicks</option>
            </select>
          )}

          <button
            onClick={fetchData}
            disabled={loading}
            className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
            title="Refresh"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Grid of Results / Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          <p className="text-zinc-500 text-sm">Loading records...</p>
        </div>
      ) : activeSubTab === 'enquiries' ? (
        filteredLeads.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 border border-dashed border-zinc-800 rounded-3xl">
            <AlertCircle className="w-10 h-10 text-zinc-650 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-zinc-400 mb-1">No Leads Found</h3>
            <p className="text-zinc-600 text-xs">When users submit contact forms, quote requests or partner forms, they will show up here.</p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 border-b border-zinc-800">
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Submitted At</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Contact Details</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Type</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Message Snippet</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-zinc-850/45 cursor-pointer transition-colors"
                    >
                      <td className="py-5 px-6 whitespace-nowrap text-xs text-zinc-400 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                          {formatDate(lead.createdAt)}
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="font-bold text-sm text-white">{lead.name || 'Anonymous'}</div>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-zinc-600" /> {lead.phone || 'N/A'}</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-zinc-600" /> {lead.email || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-xs">
                        <span className="px-2.5 py-1 rounded-full font-black uppercase text-[9px] tracking-wider bg-yellow-400/10 text-yellow-450 border border-yellow-400/20">
                          {lead.type}
                        </span>
                      </td>
                      <td className="py-5 px-6 max-w-xs truncate text-xs text-zinc-400 font-light">
                        {lead.description || 'No additional details provided.'}
                      </td>
                      <td className="py-5 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleDeleteLead(lead._id, e)}
                          disabled={deletingId === lead._id}
                          className="p-2 hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 rounded-xl transition-all inline-flex items-center justify-center"
                          title="Delete Enquiry"
                        >
                          {deletingId === lead._id ? (
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
        )
      ) : (
        filteredLogs.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 border border-dashed border-zinc-800 rounded-3xl">
            <AlertCircle className="w-10 h-10 text-zinc-650 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-zinc-400 mb-1">No Activity Clicks Found</h3>
            <p className="text-zinc-600 text-xs">When users click Call or WhatsApp buttons anywhere on the site, their clicks appear here in real-time.</p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 border-b border-zinc-800">
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Timestamp</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Action Type</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Trigger Location</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500">Page Route</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-wider text-zinc-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  {filteredLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-zinc-850/45 transition-colors">
                      <td className="py-5 px-6 whitespace-nowrap text-xs text-zinc-400 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                          {formatDate(log.createdAt)}
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap">
                        {log.activityType === 'call' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-black uppercase text-[9px] tracking-wider bg-yellow-400/10 text-yellow-450 border border-yellow-400/20">
                            <Phone className="w-3 h-3" /> Phone Call
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-black uppercase text-[9px] tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
                            <Phone className="w-3 h-3" /> WhatsApp
                          </span>
                        )}
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-xs font-semibold text-white">
                        {log.title}
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-xs text-zinc-400 font-mono">
                        {log.page || '/'}
                      </td>
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteLog(log._id)}
                          disabled={deletingId === log._id}
                          className="p-2 hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 rounded-xl transition-all inline-flex items-center justify-center"
                          title="Delete Log"
                        >
                          {deletingId === log._id ? (
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
        )
      )}

      {/* Details View Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest bg-yellow-400/10 text-yellow-450 px-2 py-0.5 rounded border border-yellow-400/25">
                  {selectedLead.type} ENQUIRY
                </span>
                <h3 className="text-xl font-bold mt-2 text-white">{selectedLead.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-zinc-500 hover:text-white transition-colors p-2 text-sm font-semibold hover:bg-zinc-850 rounded-xl"
              >
                Close
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-800">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Submitted At</span>
                  <span className="text-xs text-zinc-300 font-medium">{formatDate(selectedLead.createdAt)}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Contact Phone</span>
                  <a href={`tel:${selectedLead.phone}`} className="text-xs text-yellow-400 font-bold hover:underline block">
                    {selectedLead.phone || 'N/A'}
                  </a>
                </div>
                <div className="space-y-1 mt-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-xs text-yellow-400 font-bold hover:underline block">
                    {selectedLead.email || 'N/A'}
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Enquiry Content & Details</span>
                <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-2xl text-sm leading-relaxed text-zinc-300 whitespace-pre-line font-light">
                  {selectedLead.description || 'No description provided.'}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-850 bg-zinc-950 flex items-center justify-between">
              <button
                onClick={(e) => {
                  handleDeleteLead(selectedLead._id, e);
                }}
                className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
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
