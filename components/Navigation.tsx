
import React from 'react';

interface NavigationProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenChat: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ current, total, onPrev, onNext, onOpenChat }) => {
  return (
    <>
      {/* Progress & Info */}
      <div className="fixed bottom-6 left-6 lg:bottom-10 lg:left-10 z-50 flex items-center gap-6">
        <div className="text-[10px] lg:text-xs font-black tracking-widest text-white/60">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-teal-400' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center gap-4">
        {/* Gemini AI Trigger */}
        <button 
          onClick={onOpenChat}
          className="h-12 px-6 rounded-2xl bg-white/10 border border-white/10 hover:border-teal-400/50 custom-blur flex items-center gap-3 transition-all active:scale-95 group"
        >
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-widest">Ask AI</span>
        </button>

        <div className="flex gap-2">
          <button 
            onClick={onPrev}
            disabled={current === 0}
            className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={onNext}
            disabled={current === total - 1}
            className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
