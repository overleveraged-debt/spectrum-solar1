import React from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  return (
    <div 
      className={`fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none scale-105'
      }`}
    >
      <div className="text-center relative">
        <div className="overflow-hidden mb-4">
          <h2 className="text-white text-xs md:text-sm font-black uppercase tracking-[0.8em] animate-reveal-text">
            Spectrum Solar
          </h2>
        </div>
        <div className="overflow-hidden">
          <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] animate-reveal-text-delayed">
            Welcomes You
          </p>
        </div>
        
        {/* Modern Loading Indicator */}
        <div className="mt-12 w-48 h-[1px] bg-zinc-900 relative overflow-hidden mx-auto">
          <div className="absolute inset-0 bg-yellow-400/50 animate-loading-bar shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
        </div>
      </div>

      <style>{`
        @keyframes reveal-text {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-reveal-text {
          animation: reveal-text 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-reveal-text-delayed {
          opacity: 0;
          animation: reveal-text 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }
        .animate-loading-bar {
          animation: loading-bar 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
