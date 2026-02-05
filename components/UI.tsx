import React from 'react';

// Common props interface with optional children to satisfy strict TS checks
interface UIComponentProps {
    children?: React.ReactNode;
    className?: string;
}

export const GlowOrb: React.FC<{ color: string; highIntensity?: boolean }> = ({ color, highIntensity = false }) => (
  <div 
    className="absolute -top-[10vw] -left-[10vw] w-[50vw] h-[50vw] rounded-full pointer-events-none mix-blend-screen transition-opacity duration-1000 ease-in-out"
    style={{
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: highIntensity ? 0.15 : 0.05
    }}
  />
);

export const TopBar: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex justify-between items-center w-full mb-12 animate-[fadeInDown_0.6s_ease-out_forwards]">
    <div className="flex items-center gap-2 text-[13px] tracking-[0.15em] uppercase text-muted font-medium">
        <span className="w-1.5 h-1.5 bg-cyan rounded-full shadow-[0_0_8px_#00f0ff]"></span> {title}
    </div>
    <div>
      <img 
        src="https://tuneme.io/images/logo.png" 
        alt="TuneMe" 
        className="h-8 object-contain"
        onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentNode as HTMLElement;
            if (parent) parent.innerText = 'TuneMe';
        }}
      />
    </div>
  </div>
);

export const Card: React.FC<UIComponentProps> = ({ children, className = '' }) => (
    <div className={`bg-[#0f0f16]/60 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg ${className}`}>
        {children}
    </div>
);

export const Tag: React.FC<UIComponentProps & { color?: string }> = ({ children, className = '', color = 'text-muted' }) => (
    <div className={`inline-flex items-center text-[10px] tracking-wider uppercase font-semibold mb-3 ${color} ${className}`}>
        {children}
    </div>
);

export const StatBox: React.FC<{ value: string, label: string }> = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="text-3xl md:text-4xl font-bold text-white/90 mb-1">{value}</span>
        <span className="text-xs text-muted uppercase tracking-wide leading-tight">{label}</span>
    </div>
);

export const Pill: React.FC<UIComponentProps> = ({ children, className = '' }) => (
    <span className={`px-3 py-1.5 rounded-full border border-white/10 text-[11px] uppercase tracking-widest text-muted bg-white/5 whitespace-nowrap ${className}`}>
        {children}
    </span>
);