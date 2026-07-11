import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, FileCode, LogOut, ChevronRight, ChevronLeft, Menu } from 'lucide-react';
import PageEditor from './PageEditor';
import BlogManager from './BlogManager';

type Tab = 
  | 'home' | 'about' | 'power-backup' | 'solar-solutions' 
  | 'careers' | 'support' | 'contact' | 'product-details' | 'blogs' 
  | 'map-locations' | 'privacy-policy' | 'terms-conditions';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('spectrum_admin_authenticated');
    if (auth !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('spectrum_admin_authenticated');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'home', label: 'Home Page', icon: FileText, category: 'Page Editors' },
    { id: 'about', label: 'About Page', icon: FileText, category: 'Page Editors' },
    { id: 'solar-solutions', label: 'Solar Solutions', icon: FileText, category: 'Page Editors' },
    { id: 'power-backup', label: 'Power Backup', icon: FileText, category: 'Page Editors' },
    { id: 'product-details', label: 'Product Details', icon: FileText, category: 'Page Editors' },
    { id: 'map-locations', label: 'Map Locations', icon: FileText, category: 'Page Editors' },
    { id: 'careers', label: 'Careers Page', icon: FileText, category: 'Page Editors' },
    { id: 'support', label: 'Support & FAQ', icon: FileText, category: 'Page Editors' },
    { id: 'contact', label: 'Contact Page', icon: FileText, category: 'Page Editors' },
    { id: 'privacy-policy', label: 'Privacy Policy', icon: FileText, category: 'Page Editors' },
    { id: 'terms-conditions', label: 'Terms & Conditions', icon: FileText, category: 'Page Editors' },
    { id: 'blogs', label: 'Blog Posts', icon: FileCode, category: 'Content Manager' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex font-sans">
      {/* Sidebar */}
      <aside className={`bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between shrink-0 transition-all duration-300 overflow-hidden ${isSidebarCollapsed ? 'w-0 border-r-0' : 'w-64'}`}>
        <div className="w-64">
          {/* Logo */}
          <div className="h-20 border-b border-zinc-800 flex flex-col items-start justify-center px-6 gap-1.5">
            <img src="/logo.png" alt="Spectrum" className="h-6 w-auto" />
            <span className="text-[8px] text-zinc-500 uppercase tracking-[0.2em] font-black bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850">Admin Console</span>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-6">
            {/* Category Groups */}
            {['Page Editors', 'Content Manager'].map((category) => (
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
                          onClick={() => setActiveTab(item.id as Tab)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-sm ${
                            isActive
                              ? 'bg-yellow-400 text-zinc-950 font-semibold'
                              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          {isActive && <ChevronRight className="w-4 h-4" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 w-64">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
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
            <h2 className="text-lg font-semibold capitalize">{activeTab.replace('-', ' ')} Editor</h2>
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
          ) : (
            <PageEditor pageId={activeTab} />
          )}
        </div>
      </main>
    </div>
  );
}
