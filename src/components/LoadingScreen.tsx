import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible: isParentVisible }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [minTimeReached, setMinTimeReached] = useState(false);

  // Set a minimum time for the cinematic sequence to complete (approx 3.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeReached(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // The actual visibility depends on BOTH the parent's state AND our minimum animation time
  const isActuallyVisible = isParentVisible || !minTimeReached;

  // Keep rendering for a short duration after isActuallyVisible becomes false to allow the exit animation to play smoothly
  useEffect(() => {
    if (!isActuallyVisible) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1500); // Wait for the exit transition to finish
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isActuallyVisible]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
        isActuallyVisible ? 'opacity-100' : 'opacity-0 scale-110 blur-lg pointer-events-none'
      }`}
    >
      {/* Subtle Ambient Background Flare */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-yellow-500/10 rounded-full blur-[80px] md:blur-[120px] transition-all duration-[2000ms] ${
        isActuallyVisible ? 'opacity-100 scale-100 animate-pulse-slow' : 'opacity-0 scale-150'
      }`}></div>

      <div className={`relative z-10 flex flex-col items-center transition-transform duration-[1500ms] ${
        isActuallyVisible ? 'translate-y-0' : '-translate-y-16'
      }`}>
        {/* Logo */}
        <div className="mb-10 overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Spectrum Solar Logo" 
            className="w-24 md:w-32 opacity-0 animate-cinematic-fade drop-shadow-[0_0_25px_rgba(250,204,21,0.25)]"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          />
        </div>

        {/* Brand Name */}
        <div className="mb-4">
          <h2 className="text-white text-lg md:text-2xl font-light uppercase tracking-[0.6em] md:tracking-[0.8em] pl-[0.6em] md:pl-[0.8em] opacity-0 animate-cinematic-blur text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            Spectrum Solar
          </h2>
        </div>

        {/* Subtitle */}
        <div className="">
          <p className="text-yellow-500 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] pl-[0.4em] opacity-0 animate-cinematic-fade text-center"
             style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}>
            Welcomes You
          </p>
        </div>
      </div>

      <style>{`
        @keyframes cinematic-blur {
          0% { 
            transform: scale(1.1) translateY(15px); 
            filter: blur(15px);
            opacity: 0; 
          }
          100% { 
            transform: scale(1) translateY(0); 
            filter: blur(0px);
            opacity: 1; 
          }
        }

        @keyframes cinematic-fade {
          0% { 
            transform: translateY(15px);
            opacity: 0; 
            filter: blur(5px);
          }
          100% { 
            transform: translateY(0);
            opacity: 1; 
            filter: blur(0px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        .animate-cinematic-blur {
          animation: cinematic-blur 2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-cinematic-fade {
          animation: cinematic-fade 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
