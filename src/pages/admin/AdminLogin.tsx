import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'admin123';
    
    if (passcode === correctPasscode) {
      localStorage.setItem('spectrum_admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid passcode. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Spectrum Solar" className="h-12 w-auto mx-auto mb-5" />
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">SPECTRUM SOLAR</h1>
          <p className="text-zinc-400 text-sm">Enter passcode to access the Control Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">
              Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3.5 pl-12 pr-12 text-sm focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 outline-none transition-all placeholder:text-zinc-600"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPasscode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-xs mt-1 animate-pulse font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 flex items-center justify-center gap-2"
          >
            Authenticate Control Center
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest"
          >
            Back to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
