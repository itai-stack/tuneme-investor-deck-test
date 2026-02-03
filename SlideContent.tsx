
import React from 'react';
import { SlideData } from './types.ts';

interface SlideContentProps {
  slide: SlideData;
  isActive: boolean;
  isMobile: boolean;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide, isActive, isMobile }) => {
  const visibilityClass = isMobile 
    ? 'opacity-100 translate-y-0' 
    : (isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12');

  return (
    <div className={`flex-1 flex flex-col transition-all duration-1000 delay-100 ${visibilityClass}`}>
      <div className="flex items-center justify-between mb-6 lg:mb-12 flex-shrink-0">
        <div className="flex items-center gap-2 lg:gap-3 text-[10px] lg:text-xs font-black tracking-[0.25em] uppercase text-white/50">
          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
          {slide.kicker}
        </div>
        <div className="bg-slate-900/40 px-3 py-2 lg:px-5 lg:py-3 rounded-2xl border border-white/5 custom-blur shadow-xl">
          <span className="text-teal-400 font-black text-xs lg:text-sm tracking-[0.1em] uppercase">TuneMe AI</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="max-w-6xl w-full">
          <h1 className="text-3xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-4 lg:mb-10 drop-shadow-2xl">
            {slide.title}
          </h1>
          <p className="text-sm lg:text-3xl text-white/70 leading-relaxed max-w-4xl mb-6 lg:mb-16 font-medium">
            {slide.subtitle}
          </p>

          <div className="overflow-y-auto max-h-[50vh] lg:max-h-none pr-3 hide-scrollbar pb-10">
            {slide.kpis && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-16">
                {slide.kpis.map((kpi, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/10 p-4 lg:p-8 rounded-2xl lg:rounded-[32px] custom-blur hover:bg-white/[0.05] transition-all group">
                    <div className="text-xl lg:text-5xl font-black mb-1 group-hover:text-teal-400 transition-colors">
                      {kpi.value}
                    </div>
                    <div className="text-[9px] lg:text-[12px] font-bold uppercase tracking-[0.15em] text-white/40">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {slide.pills && (
              <div className="flex flex-wrap gap-2 lg:gap-4">
                {slide.pills.map((pill, i) => (
                  <span key={i} className="px-3 lg:px-6 py-1.5 lg:py-3 rounded-full bg-white/[0.05] border border-white/10 text-[9px] lg:text-sm font-bold tracking-widest text-white/60">
                    {pill}
                  </span>
                ))}
              </div>
            )}

            {slide.content && <div className="mt-6 lg:mt-12">{slide.content}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
