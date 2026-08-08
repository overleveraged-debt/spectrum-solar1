import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, FileCode, LogOut, ChevronRight, ChevronLeft, Menu, Users, Inbox, MessageSquare } from 'lucide-react';
import PageEditor from './PageEditor';
import BlogManager from './BlogManager';
import LeadsViewer from './LeadsViewer';
import ApplicationsViewer from './ApplicationsViewer';

type Tab =
  | 'home' | 'about' | 'solar-solutions' | 'power-backup' | 'opportunities' | 'franchise' | 'dealership' | 'freelance' | 'careers' | 'support' | 'contact' | 'product-details' | 'blogs'
  | 'map-locations' | 'privacy-policy' | 'terms-conditions'
  | 'leads' | 'applications' | 'testimonials' | 'footer';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditorDirty, setIsEditorDirty] = useState(false);
  const [pendingTabSwitch, setPendingTabSwitch] = useState<Tab | null>(null);
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('spectrum_admin_authenticated');
    if (auth !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear dirty flag when logging out to bypass alert warning
    setIsEditorDirty(false);
    localStorage.removeItem('spectrum_admin_authenticated');
    navigate('/admin/login');
  };

  const handleTabClick = (tabId: Tab) => {
    if (isEditorDirty) {
      setPendingTabSwitch(tabId);
    } else {
      setActiveTab(tabId);
    }
  };

  const menuItems = [
    { id: 'leads', label: 'Leads & Enquiries', icon: Inbox, category: 'Business Inbox' },
    { id: 'applications', label: 'Job Applications', icon: Users, category: 'Business Inbox' },

    { id: 'home', label: 'Home Page', icon: FileText, category: 'Core Site Pages' },
    { id: 'about', label: 'About Page', icon: FileText, category: 'Core Site Pages' },
    { id: 'solar-solutions', label: 'Solar Overview Page', icon: FileText, category: 'Core Site Pages' },
    { id: 'power-backup', label: 'Power Backup Page', icon: FileText, category: 'Core Site Pages' },
    { id: 'map-locations', label: 'Map Locations', icon: FileText, category: 'Core Site Pages' },
    { id: 'support', label: 'Support & FAQ', icon: FileText, category: 'Core Site Pages' },
    { id: 'footer', label: 'Footer Settings', icon: FileText, category: 'Core Site Pages' },

    { id: 'opportunities', label: 'Opportunities Overview', icon: FileText, category: 'Partner & Careers' },
    { id: 'franchise', label: 'Franchise Page', icon: FileText, category: 'Partner & Careers' },
    { id: 'dealership', label: 'Dealership Page', icon: FileText, category: 'Partner & Careers' },
    { id: 'freelance', label: 'Freelance Dealer Page', icon: FileText, category: 'Partner & Careers' },
    { id: 'careers', label: 'Careers Page', icon: FileText, category: 'Partner & Careers' },

    { id: 'product-details', label: 'Product Landing Pages', icon: FileText, category: 'Products' },

    { id: 'blogs', label: 'Blog Posts', icon: FileCode, category: 'Content Manager' },
    { id: 'testimonials', label: 'Client Testimonials', icon: MessageSquare, category: 'Content Manager' },

    { id: 'contact', label: 'Enquiry Page', icon: FileText, category: 'Legal & Forms' },
    { id: 'privacy-policy', label: 'Privacy Policy', icon: FileText, category: 'Legal & Forms' },
    { id: 'terms-conditions', label: 'Terms & Conditions', icon: FileText, category: 'Legal & Forms' },
  ];

  const categories = [
    'Business Inbox',
    'Core Site Pages',
    'Partner & Careers',
    'Products',
    'Content Manager',
    'Legal & Forms',
  ];

  return (
    <div className="h-screen overflow-hidden bg-zinc-950 text-white flex font-sans">
      {/* Sidebar */}
      <aside className={`h-screen sticky top-0 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between shrink-0 transition-all duration-300 overflow-hidden ${isSidebarCollapsed ? 'w-0 border-r-0' : 'w-64'}`}>
        <div className="w-64 flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="h-20 shrink-0 border-b border-zinc-800 flex flex-col items-start justify-center px-6 gap-1.5">
            <img src="/logo.png" alt="Spectrum" className="h-6 w-auto" />
            <span className="text-[8px] text-zinc-500 uppercase tracking-[0.2em] font-black bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850">Admin Console</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {/* Category Groups */}
            {categories.map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3">
                  {category}
                </h3>
                <div className="space-y-1">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id as Tab)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-sm ${isActive
                              ? 'bg-yellow-400 text-zinc-950 font-semibold'
                              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate flex-1 text-left">{item.label}</span>
                          </div>
                          {isActive && <ChevronRight className="w-4 h-4 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-800 w-64 shrink-0 bg-zinc-900">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-sm font-medium"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-zinc-950 overflow-y-auto max-h-screen">
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-10 shrink-0 sticky top-0 bg-zinc-950/80 backdrop-blur z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl transition-all text-zinc-400 hover:text-white flex items-center justify-center mr-1"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <LayoutDashboard className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold capitalize">
              {activeTab === 'contact' ? 'Enquiry Page' : activeTab.replace('-', ' ')} Editor
            </h2>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-400 hover:text-yellow-300 border border-yellow-400/20 hover:border-yellow-400/50 bg-yellow-400/5 rounded-xl px-4 py-2 font-medium tracking-wide uppercase transition-all"
          >
            Preview Site
          </a>
        </header>

        <div className="p-10 max-w-6xl mx-auto">
          {activeTab === 'blogs' ? (
            <BlogManager />
          ) : activeTab === 'leads' ? (
            <LeadsViewer />
          ) : activeTab === 'applications' ? (
            <ApplicationsViewer />
          ) : (
            <PageEditor pageId={activeTab} onDirtyChange={setIsEditorDirty} />
          )}
        </div>
      </main>

      {/* Tab Switch Intercept Modal */}
      {pendingTabSwitch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-850 rounded-[2rem] max-w-sm w-full p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Unsaved Changes</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                You have unsaved changes in your editor. If you switch pages now, your modifications will be discarded.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setPendingTabSwitch(null);
                }}
                className="bg-zinc-855 border border-zinc-800 hover:bg-zinc-800 text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all"
              >
                Stay & Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditorDirty(false);
                  setActiveTab(pendingTabSwitch);
                  setPendingTabSwitch(null);
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all"
              >
                Discard & Switch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
