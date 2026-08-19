import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff, ShieldAlert, Clock, AlertTriangle } from 'lucide-react';
import { createSessionSignature, saveAuthSession } from '../../lib/authCrypto';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState(0);
  const [expiredMsg, setExpiredMsg] = useState('');
  const navigate = useNavigate();

  // Check for existing lockout or session expiration message on mount
  useEffect(() => {
    const expired = localStorage.getItem('spectrum_admin_expired_msg');
    if (expired) {
      setExpiredMsg(expired);
      localStorage.removeItem('spectrum_admin_expired_msg');
    }

    const checkLockout = () => {
      const lockoutUntil = parseInt(localStorage.getItem('spectrum_admin_lockout_until') || '0', 10);
      const now = Date.now();
      if (lockoutUntil > now) {
        setLockoutRemainingSeconds(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setLockoutRemainingSeconds(0);
      }
    };

    checkLockout();
    const timer = setInterval(checkLockout, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutRemainingSeconds > 0) return;

    const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'admin123';
    
    if (passcode === correctPasscode) {
      // Clear security lockout tracking on success
      localStorage.removeItem('spectrum_admin_failed_attempts');
      localStorage.removeItem('spectrum_admin_lockout_until');
      localStorage.removeItem('spectrum_admin_expired_msg');

      // Generate SHA-256 cryptographic signature
      const timestamp = Date.now();
      const signature = await createSessionSignature(passcode, timestamp);
      saveAuthSession(signature, timestamp);

      navigate('/admin/dashboard');
    } else {
      const currentAttempts = parseInt(localStorage.getItem('spectrum_admin_failed_attempts') || '0', 10) + 1;
      localStorage.setItem('spectrum_admin_failed_attempts', currentAttempts.toString());

      if (currentAttempts >= MAX_ATTEMPTS) {
        const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem('spectrum_admin_lockout_until', lockoutTime.toString());
        setLockoutRemainingSeconds(Math.ceil(LOCKOUT_DURATION_MS / 1000));
        setError('');
      } else {
        const remainingAttempts = MAX_ATTEMPTS - currentAttempts;
        setError(`Invalid passcode. ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining before security lockout.`);
      }
    }
  };

  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const isLocked = lockoutRemainingSeconds > 0;

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

        {expiredMsg && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-3 text-amber-300 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{expiredMsg}</span>
          </div>
        )}

        {isLocked && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
            <div>
              <p className="font-bold text-rose-200">Security Lockout Active</p>
              <p className="mt-0.5 text-rose-300/90 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 inline" /> Try again in <span className="font-mono font-bold text-white">{formatLockoutTime(lockoutRemainingSeconds)}</span>
              </p>
            </div>
          </div>
        )}

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
                disabled={isLocked}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder={isLocked ? "Account Locked" : "••••••••"}
                className={`w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3.5 pl-12 pr-12 text-sm focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 outline-none transition-all placeholder:text-zinc-600 ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <button
                type="button"
                disabled={isLocked}
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
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
            disabled={isLocked}
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 flex items-center justify-center gap-2 ${
              isLocked ? 'opacity-50 cursor-not-allowed hover:bg-yellow-400' : ''
            }`}
          >
            {isLocked ? 'Access Temporarily Locked' : 'Authenticate Control Center'}
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
