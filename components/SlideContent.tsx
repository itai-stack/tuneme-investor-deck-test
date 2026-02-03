
import React from 'react';
import { SlideData } from '../types';

interface SlideContentProps {
  slide: SlideData;
  isActive: boolean;
  isMobile: boolean;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide, isActive, isMobile }) => {
  const visibilityClass = isMobile 
    ? 'opacity-100 translate-y-0' 
    : (isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8');

  return (
    <div className={`flex-1 flex flex-col transition-all duration-1000 ${visibilityClass}`}>
      {/* Header - Fixed to top of slide context */}
      <div className="flex items-center justify-between mb-4 lg:mb-12 flex-shrink-0">
        <div className="flex items-center gap-2 lg:gap-3 text-[9px] lg:text-xs font-black tracking-[0.2em] uppercase text-white/60">
          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
          {slide.kicker}
        </div>
        <div className="bg-slate-900/50 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl border border-white/10 custom-blur">
          <img 
            src="https://tuneme.io/images/logo.png" 
            alt="TuneMe Logo" 
            className="h-5 lg:h-8 opacity-90"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      </div>

      {/* Body - Flexible scrollable area for content safety */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="max-w-5xl w-full">
          <h1 className="text-2xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-3 lg:mb-10 drop-shadow-2xl">
            {slide.title}
          </h1>
          <p className="text-sm lg:text-2xl text-white/80 leading-relaxed max-w-4xl mb-5 lg:mb-12">
            {slide.subtitle}
          </p>

          {/* This container ensures long content is scrollable on small mobile screens */}
          <div className="overflow-y-auto max-h-[55vh] lg:max-h-none pr-2 hide-scrollbar">
            {slide.kpis && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-4 lg:mb-12">
                {slide.kpis.map((kpi, i) => (
                  <div 
                    key={i} 
                    className="bg-white/5 border border-white/10 p-2.5 lg:p-6 rounded-xl lg:rounded-2xl custom-blur hover:border-teal-500/50 transition-colors group"
                  >
                    <div className="text-base lg:text-4xl font-black mb-0.5 group-hover:text-teal-400 transition-colors">
                      {kpi.value}
                    </div>
                    <div className="text-[8px] lg:text-[11px] font-bold uppercase tracking-widest text-white/50">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {slide.pills && (
              <div className="flex flex-wrap gap-1.5 lg:gap-3 mb-4 lg:mb-0">
                {slide.pills.map((pill, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 lg:px-4 py-1 lg:py-2 rounded-full bg-white/5 border border-white/10 text-[8px] lg:text-xs font-bold tracking-wider text-white/70 whitespace-nowrap"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            )}

            {slide.content && (
              <div className="mt-4 lg:mt-8 pb-10 lg:pb-0">
                {slide.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
