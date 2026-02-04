import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Global Config ---
// Palettes per slide [Primary, Secondary] (Hex)
const palettes = [
  ['#00f0ff', '#7000ff'], // 0: Title - Cyan/Purple
  ['#ff0055', '#7a0026'], // 1: Problem - Red/DeepRed
  ['#00ff9d', '#00b8ff'], // 2: Voice - Green/Cyan
  ['#8c00ff', '#ff00d4'], // 3: Product - Deep Purple/Pink
  ['#ffcc00', '#ff6600'], // 4: Validation - Gold/Orange
  ['#00ffd5', '#2a52be'], // 5: Traction - Teal/Blue
  ['#3a4b99', '#7a8fd9'], // 6: Strategy - Corporate Blue
  ['#ff9a9e', '#fecfef'], // 7: Team - Warm Pink
  ['#ffffff', '#00f0ff'], // 8: Contact - Bright
];

// --- Team Configuration ---
const teamData = {
  itai: {
    name: "Itai Argaman",
    role: "CEO & CO-FOUNDER",
    // using thumbnail endpoint with large size (sz=w1000) for better reliability
    image: "https://drive.google.com/thumbnail?id=1gxArPetBgtslObGzLnBBMgRDPbfM_Gwx&sz=w1000",
    bio: "Audio technology & commercialization. Former Waves Audio. Collaboration with Google and Meta on audio-based consumer products."
  },
  motti: {
    name: "Motti Ratmansky, MD",
    role: "CMO & CO-FOUNDER",
    // using thumbnail endpoint with large size (sz=w1000) for better reliability
    image: "https://drive.google.com/thumbnail?id=1q0mA0l6ufa6tw5IKGA5qAr3OBDEPgRqC&sz=w1000",
    bio: "Pain management & rehabilitation specialist. Leads clinical validation."
  }
};

// --- Glow Component ---
const GlowOrb = ({ color, highIntensity = false }: { color: string; highIntensity?: boolean }) => (
  <div 
    className="glow-orb" 
    style={{
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: highIntensity ? 0.15 : 0.05
    }}
  />
);

// --- Share Button Component ---
const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = "10 seconds of voice → physiology.";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };
  
  const handleNativeShare = async () => {
      const shareData = {
      title: 'TuneMe',
      text: text,
      url: url,
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            setIsOpen(false);
        } catch(e) {}
    }
  };

  const options = [
    { name: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z', href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
    { name: 'Email', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', stroke: true, href: `mailto:?subject=${encodeURIComponent("TuneMe")}&body=${encodeURIComponent(text + '\n' + url)}` },
    { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'X / Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
  ];

  return (
    <div ref={menuRef} className="share-container">
      <button className="share-btn-trigger" onClick={() => setIsOpen(!isOpen)} aria-label="Share Menu">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </button>

      {isOpen && (
        <div className="share-menu">
            {typeof navigator !== 'undefined' && navigator.share && (
                 <button className="share-item" onClick={handleNativeShare}>
                    <span className="share-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg></span>
                    <span className="share-label">Share via...</span>
                 </button>
            )}
            
            {options.map(opt => (
                <a key={opt.name} href={opt.href} target="_blank" rel="noopener noreferrer" className="share-item" onClick={() => setIsOpen(false)}>
                    <span className="share-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill={opt.stroke ? "none" : "currentColor"} stroke={opt.stroke ? "currentColor" : "none"} strokeWidth={opt.stroke ? "2" : "0"}>
                            <path d={opt.icon} />
                            {opt.name === 'Email' && <polyline points="22,6 12,13 2,6" />}
                        </svg>
                    </span>
                    <span className="share-label">{opt.name}</span>
                </a>
            ))}
            
            <div className="share-divider" />
            
            <button className="share-item" onClick={handleCopy}>
                <span className="share-icon">
                   {copied ? 
                     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> : 
                     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                   }
                </span>
                <span className="share-label">{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
        </div>
      )}

      <style>{`
        .share-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
        }
        .share-btn-trigger {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            cursor: pointer;
            backdrop-filter: blur(4px);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .share-btn-trigger:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
            transform: scale(1.05);
        }
        .share-menu {
            position: absolute;
            top: 55px;
            right: 0;
            width: 220px;
            background: rgba(15, 15, 25, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            backdrop-filter: blur(20px);
            padding: 8px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.6);
            display: flex;
            flex-direction: column;
            gap: 2px;
            animation: menuFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
            z-index: 10002;
        }
        @keyframes menuFadeIn {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .share-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 14px;
            border-radius: 10px;
            color: #e0e0e0;
            text-decoration: none;
            transition: background 0.2s, transform 0.1s;
            background: transparent;
            border: none;
            cursor: pointer;
            text-align: left;
            font-family: inherit;
            font-size: 14px;
            width: 100%;
            box-sizing: border-box;
        }
        .share-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }
        .share-item:active {
            transform: scale(0.98);
        }
        .share-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00ff9d;
            width: 20px;
            height: 20px;
        }
        .share-label {
            flex-grow: 1;
            font-weight: 500;
        }
        .share-divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            margin: 4px 6px;
        }
      `}</style>
    </div>
  );
};

// --- Background Animation Component ---
const StunningBackground = ({ currentSlide }: { currentSlide: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slideRef = useRef(currentSlide);

  // Helper to hex -> rgb
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  };

  // Helper to lerp
  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  useEffect(() => {
    slideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- Star Logic ---
    interface Star {
      x: number;
      y: number;
      size: number;
      phase: number;
      speed: number;
    }

    let stars: Star[] = [];

    const initStars = (w: number, h: number) => {
       // Keep density very low (sparse)
       const count = Math.floor((w * h) / 60000); 
       const newStars: Star[] = [];
       for(let i=0; i<count; i++){
          newStars.push({
             x: Math.random() * w,
             y: Math.random() * h,
             size: Math.random() * 2 + 1, // Slightly larger (1px - 3px) for visibility
             phase: Math.random() * Math.PI * 2,
             // Much faster speed for visible twinkling (2x to 5x multiplier relative to time)
             speed: 2.0 + Math.random() * 3.0 
          });
       }
       return newStars;
    };
    
    stars = initStars(width, height);

    // Animation state
    let time = 0;
    
    // Current Color State (start at slide 0)
    let curC1 = hexToRgb(palettes[0][0]);
    let curC2 = hexToRgb(palettes[0][1]);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = initStars(width, height);
    };
    window.addEventListener('resize', resize);

    const animate = () => {
      // 1. Clear background (solid dark)
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      time += 0.015; 

      // --- Draw Stars (Behind waves) ---
      stars.forEach(star => {
          // Oscillation between -1 and 1
          const val = Math.sin(time * star.speed + star.phase);
          
          // Only draw when positive (50% duty cycle of visible/invisible)
          if (val > 0) {
             // Smooth fade in/out with max opacity 0.7
             const opacity = val * 0.7; 
             ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
             ctx.beginPath();
             ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
             ctx.fill();
          }
      });

      // 2. Color Interpolation Logic
      const targetIndex = slideRef.current < palettes.length ? slideRef.current : 0;
      const targetC1 = hexToRgb(palettes[targetIndex][0]);
      const targetC2 = hexToRgb(palettes[targetIndex][1]);
      const speed = 0.05; // Transition speed

      curC1.r = lerp(curC1.r, targetC1.r, speed);
      curC1.g = lerp(curC1.g, targetC1.g, speed);
      curC1.b = lerp(curC1.b, targetC1.b, speed);
      
      curC2.r = lerp(curC2.r, targetC2.r, speed);
      curC2.g = lerp(curC2.g, targetC2.g, speed);
      curC2.b = lerp(curC2.b, targetC2.b, speed);

      // 3. Draw Audio-style Sine Waves
      // Removed 'screen' composite operation for darker/subtler lines
      ctx.globalCompositeOperation = 'source-over'; 
      ctx.lineWidth = 1; 
      
      const waveCount = 3; 
      const centerY = height / 2;
      
      for (let i = 0; i < waveCount; i++) {
        const mix = i / (waveCount > 1 ? waveCount - 1 : 1);
        const r = lerp(curC1.r, curC2.r, mix);
        const g = lerp(curC1.g, curC2.g, mix);
        const b = lerp(curC1.b, curC2.b, mix);
        
        // Remove glow shadow
        ctx.shadowBlur = 0;
        ctx.shadowColor = `rgba(0,0,0,0)`;
        
        // Darker lines: Reduced opacity to 0.05
        ctx.strokeStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)}, 0.05)`;
        
        ctx.beginPath();
        
        // Parameters for waveform shape
        const frequency = 0.002 + (i * 0.001);
        const phase = time * (1 + i * 0.2);
        const amplitude = height * 0.15; 

        for (let x = 0; x <= width; x += 10) {
            // Smoother waveform
            const y = centerY 
                + Math.sin(x * frequency + phase) * amplitude
                + Math.sin(x * frequency * 2.0 + phase * 1.3) * (amplitude * 0.4);
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []); 

  return (
    <canvas ref={canvasRef} id="canvas-bg" />
  );
};

// --- Reusable Slide Components ---
const TopBar = ({ title }: { title: string }) => (
  <div className="topbar anim-target">
    <div className="kicker"><span className="dot"></span> {title}</div>
    <div className="logoPill">
      <img 
        src="https://tuneme.io/images/logo.png" 
        alt="TuneMe" 
        style={{ height: '32px' }} 
      />
    </div>
  </div>
);

// --- Main App ---
const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 9;

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Swipe Gestures
  const touchStart = useRef<{x: number, y: number} | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStart.current.x - touchEndX;
    const diffY = touchStart.current.y - touchEndY;

    // Only trigger slide change if horizontal swipe is dominant and significant
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
       if (diffX > 0) nextSlide();
       else prevSlide();
    }
    
    touchStart.current = null;
  };

  const getSlideClass = (index: number) => {
    return currentSlide === index ? 'slide active' : 'slide';
  };

  return (
    <>
      <StunningBackground currentSlide={currentSlide} />
      
      <div className="progress-bar" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>

      <ShareButton />

      <div className="nav-controls">
        <button className="nav-btn" onClick={prevSlide}>←</button>
        <button className="nav-btn" onClick={nextSlide}>→</button>
      </div>

      <div 
        className="deck-container" 
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        
        {/* SLIDE 1: TITLE */}
        <section className={getSlideClass(0)}>
          <GlowOrb color={palettes[0][0]} highIntensity={true} />
          <TopBar title="Biomarker Engine" />
          <div className="grow" style={{alignItems: 'center', textAlign: 'center'}}>
            <div className="anim-target" style={{width: '100%', maxWidth: '1000px'}}>
              <h1>10 seconds of voice <br/><span className="emph">→ physiology.</span></h1>
              <p style={{marginTop: '24px', fontSize: '20px', maxWidth: '750px', lineHeight: '1.6', marginInline: 'auto'}}>
                TuneMe converts a short voice sample into a real-time signal of <b>stress</b> and <b>autonomic balance</b>, and delivers a personalized therapeutic response.
              </p>
              
              <div className="stats-grid">
                <div style={{background: 'linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)', border: '1px solid rgba(50,50,80,0.5)', borderRadius: '12px', padding: '16px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'}}>
                  <div style={{fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '4px'}}>10s</div>
                  <div style={{fontSize: '10px', color: '#8899aa', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Voice Check-in</div>
                </div>
                <div style={{background: 'linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)', border: '1px solid rgba(50,50,80,0.5)', borderRadius: '12px', padding: '16px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'}}>
                  <div style={{fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '4px'}}>Real-time</div>
                  <div style={{fontSize: '10px', color: '#8899aa', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Analysis</div>
                </div>
                <div style={{background: 'linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)', border: '1px solid rgba(50,50,80,0.5)', borderRadius: '12px', padding: '16px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'}}>
                  <div style={{fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '4px'}}>No HW</div>
                  <div style={{fontSize: '10px', color: '#8899aa', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Required</div>
                </div>
                <div style={{background: 'linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)', border: '1px solid rgba(50,50,80,0.5)', borderRadius: '12px', padding: '16px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'}}>
                  <div style={{fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '4px'}}>Closed-loop</div>
                  <div style={{fontSize: '10px', color: '#8899aa', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Learning</div>
                </div>
              </div>

              <div className="pillRow" style={{marginTop: '24px', justifyContent: 'center'}}>
                <span className="pill" style={{borderColor: '#333', background: 'rgba(0,0,0,0.4)', color: '#aaa'}}>Voice Biomarkers</span>
                <span className="pill" style={{borderColor: '#333', background: 'rgba(0,0,0,0.4)', color: '#aaa'}}>Physiology</span>
                <span className="pill" style={{borderColor: '#333', background: 'rgba(0,0,0,0.4)', color: '#aaa'}}>Adaptive Therapy</span>
                <span className="pill" style={{borderColor: '#333', background: 'rgba(0,0,0,0.4)', color: '#aaa'}}>Data Advantage</span>
              </div>
            </div>
          </section>

        {/* SLIDE 2: PROBLEM */}
        <section className={getSlideClass(1)}>
          <GlowOrb color={palettes[1][0]} />
          <TopBar title="The Problem" />
          <div className="grow">
            <div className="anim-target">
              <h2>Wearables measure. <span style={{color:'var(--accent-pink)'}}>They don’t fix.</span></h2>
              <p>Hundreds of millions track sleep & stress daily, but most platforms stop at insights. The missing layer is <b>real-time action</b>.</p>
            </div>
            
            <div className="problem-grid anim-target">
              {/* Left Column: The Real Pain */}
              <div className="card pain-card">
                <div style={{marginBottom: '20px'}}>
                  <h3>The real pain</h3>
                  <p className="muted" style={{fontSize: '14px', margin: 0}}>The problem is not awareness. It is overload. Too many sensors, too much data, and still no action.</p>
                </div>
                <div className="stats-2x2">
                   <div className="stat-item">
                     <span className="v" style={{color: '#9ba4b5'}}>+30%</span>
                     <span className="l">Increase in wearable ownership since 2020</span>
                   </div>
                   <div className="stat-item">
                     <span className="v" style={{color: '#9ba4b5'}}>80%</span>
                     <span className="l">Of users do not act on health insights</span>
                   </div>
                   <div className="stat-item">
                     <span className="v" style={{color: '#9ba4b5'}}>1.5B</span>
                     <span className="l">People suffer chronic stress globally</span>
                   </div>
                   <div className="stat-item">
                     <span className="v" style={{color: '#9ba4b5'}}>$1T</span>
                     <span className="l">Lost productivity per year</span>
                   </div>
                </div>
              </div>

              {/* Right Column: The Unlock */}
              <div className="card unlock-card">
                <h3>The unlock: <span style={{color:'var(--accent-cyan)'}}>HRV validates outcomes.</span> Voice drives action.</h3>
                <p className="muted">Measure the baseline (T0), apply therapy, then confirm a measurable physiological change (T1).</p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 3: WHY VOICE */}
        <section className={getSlideClass(2)}>
          <GlowOrb color={palettes[2][0]} />
          <TopBar title="Why Voice" />
          <div className="grow">
            <div className="anim-target">
              <h2>Voice is a high-resolution physiological signal</h2>
              <p>It delivers continuous insight without hardware or friction.</p>
            </div>
            
            <div className="anim-target" style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', width: '100%'}}>
              
              <div className="card" style={{textAlign: 'center', padding: '30px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                 <div className="tag" style={{marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '12px'}}>UNIVERSAL</div>
                 <h3 style={{fontSize: '24px', marginBottom: '8px'}}>Any smart device with a microphone</h3>
                 <p className="muted" style={{margin: 0}}>Smartphones, laptops, tablets, wearables, and smart speakers. No extra hardware.</p>
              </div>

              <div className="card" style={{textAlign: 'center', padding: '30px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                 <div className="tag" style={{marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '12px'}}>INSTANT</div>
                 <h3 style={{fontSize: '24px', marginBottom: '8px'}}>Seconds-to-signal</h3>
                 <p className="muted" style={{margin: 0}}>Fast physiological analysis.</p>
              </div>

              <div className="card" style={{textAlign: 'center', padding: '30px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                 <div className="tag" style={{marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '12px'}}>CONTINUOUS</div>
                 <h3 style={{fontSize: '24px', marginBottom: '8px'}}>Daily check-ins build a data advantage</h3>
                 <p className="muted" style={{margin: 0}}>Outcome-linked voice data at scale is extremely hard to replicate.</p>
              </div>

            </div>
          </div>
        </section>

        {/* SLIDE 4: PRODUCT */}
        <section className={getSlideClass(3)}>
          <GlowOrb color={palettes[3][0]} />
          <TopBar title="Product" />
          <div className="grow">
            <div className="anim-target" style={{textAlign:'center', marginBottom: '100px'}}>
              <h2>One Engine. <span className="emph2">Multiple Surfaces.</span></h2>
              <p style={{margin: '0 auto'}}>We are not just an app. We are the intelligence layer for digital health.</p>
            </div>

            <div className="steps anim-target">
              <div className="step">
                <div className="tag">Input</div>
                <h3>Voice</h3>
                <p className="muted" style={{marginBottom: '4px'}}>10-second sample</p>
                <p className="muted" style={{fontSize: '12px', opacity: 0.7, margin: 0}}>Captures autonomic nervous system markers</p>
              </div>
              <div className="arrow">→</div>
              <div className="step" style={{borderColor: 'var(--accent-purple)', boxShadow: '0 0 30px rgba(112,0,255,0.2)'}}>
                <div className="tag" style={{color:'var(--accent-purple)'}}>Core</div>
                <h3>AI Biomarkers</h3>
                <p className="muted" style={{marginBottom: '4px'}}>Stress • Autonomic Balance</p>
                <p className="muted" style={{fontSize: '12px', opacity: 0.7, margin: 0}}>Physiology-driven state detection</p>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <div className="tag">Output</div>
                <h3>Action</h3>
                <p className="muted" style={{marginBottom: '4px'}}>Personalized Therapy / API</p>
                <p className="muted" style={{fontSize: '12px', opacity: 0.7, margin: 0}}>Non-invasive vagus nerve stimulation</p>
              </div>
            </div>

            {/* Added marginTop for spacing */}
            <div className="twoEq anim-target" style={{marginTop: '60px'}}>
              <div className="card">
                <h3>Consumer App</h3>
                <p className="muted" style={{marginBottom: '10px'}}>Immediate value + controlled data collection.</p>
                <p className="muted" style={{fontSize:'14px', marginBottom: '15px'}}>Audio-based stimulation targeting the vagus nerve to support relaxation, recovery, and sleep.</p>
                <div className="pillRow">
                  <span className="pill">CHECK-IN</span>
                  <span className="pill">THERAPY</span>
                </div>
              </div>
              <div className="card">
                <h3>SDK / API</h3>
                <p className="muted" style={{marginBottom: '10px'}}>Licensing the analysis + stimulation layer to partners.</p>
                <p className="muted" style={{fontSize:'14px', marginBottom: '15px'}}>Physiology-based signals that enable vagus-aligned interventions across platforms.</p>
                <div className="pillRow">
                  <span className="pill">Stress Index</span>
                  <span className="pill">State Change</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 5: VALIDATION */}
        <section className={getSlideClass(4)}>
          <GlowOrb color={palettes[4][0]} />
          <TopBar title="Validation" />
          <div className="grow center">
            <div className="anim-target" style={{textAlign:'center', maxWidth: '900px', margin: '0 auto'}}>
              <h2>The Closed-Loop Advantage</h2>
              <p>Therapy is not “another product”, it’s the controlled intervention that validates biomarkers and accelerates learning.</p>
            </div>

            <div className="steps anim-target" style={{maxWidth: '1000px', margin: '40px auto'}}>
              <div className="step">
                <div className="tag">T-Zero</div>
                <h3>Measure</h3>
                <p className="muted">Voice Baseline</p>
              </div>
              <div className="arrow" style={{color: 'var(--accent-cyan)'}}>→</div>
              <div className="step" style={{background: 'rgba(0,240,255,0.05)', borderColor: 'var(--accent-cyan)'}}>
                <div className="tag">Action</div>
                <h3>Intervene</h3>
                <p className="muted">Audio Therapy</p>
              </div>
              <div className="arrow" style={{color: 'var(--accent-cyan)'}}>→</div>
              <div className="step">
                <div className="tag">T-One</div>
                <h3>Verify</h3>
                <p className="muted">Biomarker Shift</p>
              </div>
            </div>
            
            <div className="card anim-target" style={{margin: '20px auto', maxWidth: '600px', textAlign:'center'}}>
               <p className="emph">"If the physiological state changes and the biomarker moves with it, the biomarker is meaningful."</p>
            </div>
          </div>
        </section>

        {/* SLIDE 6: TRACTION */}
        <section className={getSlideClass(5)}>
          <GlowOrb color={palettes[5][0]} />
          <TopBar title="Traction" />
          <div className="grow">
            <div className="anim-target">
              <h2>Clinical & Commercial <span style={{color:'var(--accent-gold)'}}>Proof</span></h2>
              <p>Objective physiological outcomes, plus real distribution partners.</p>
            </div>

            <div className="twoEq anim-target">
              <div className="card">
                <div className="tag" style={{color: 'var(--accent-gold)'}}>Clinical Data</div>
                <h3>RCT Results (N=50)</h3>
                <div className="kpis">
                  <div className="kpi"><span className="v">-100%</span><span className="l">High Stress</span></div>
                  <div className="kpi"><span className="v">+262%</span><span className="l">Resting State</span></div>
                </div>
                <p className="muted" style={{marginTop:'20px'}}>Validated against Garmin objective stress measurement.</p>
              </div>

              <div className="card">
                <div className="tag">Business</div>
                <h3>Commercial</h3>
                <div className="kpis" style={{gridTemplateColumns: '1fr 1fr'}}>
                  <div className="kpi"><span className="v">4000+</span><span className="l">Users</span></div>
                  <div className="kpi"><span className="v">$900K</span><span className="l">Raised</span></div>
                </div>
                <div style={{marginTop:'20px'}}>
                   <div className="pill" style={{display:'block', marginBottom:'8px', textAlign:'center', borderColor:'rgba(255,255,255,0.2)'}}>Signed: Isracard & Maccabi Club</div>
                   <div className="pill" style={{display:'block', textAlign:'center', borderColor:'rgba(255,255,255,0.2)'}}>Pilot: Israeli Ministry of Defense</div>
                </div>
              </div>
            </div>
            
            {/* Added spacing here (marginTop: 40px) */}
            <div className="card anim-target" style={{marginTop: '40px', padding: '20px'}}>
               <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                  <div><span className="tag">Defensibility</span> <b>2 Patents Filed, 1 Approved</b></div>
                  <div><span className="tag">Asset</span> <b>Outcome-Linked Voice Dataset</b></div>
               </div>
            </div>
          </div>
        </section>

        {/* SLIDE 7: STRATEGY */}
        <section className={getSlideClass(6)}>
          <GlowOrb color={palettes[6][0]} />
          <TopBar title="Strategy" />
          <div className="grow">
            <h2 className="anim-target">Why Big Tech Cares</h2>
            <div className="kpis anim-target" style={{gridTemplateColumns: '1fr 1fr 1fr', marginTop:'20px'}}>
              <div className="kpi"><span className="v">Zero HW</span><span className="l">No device dependency</span></div>
              <div className="kpi"><span className="v">API</span><span className="l">Licensable layer</span></div>
              <div className="kpi"><span className="v">Data</span><span className="l">Clinically linked</span></div>
            </div>

            <div className="twoEq anim-target" style={{marginTop:'40px'}}>
              <div className="card">
                <h3>Monetization</h3>
                <ul style={{listStyle:'none', padding:0, margin: '15px 0 0 0', color: 'var(--text-muted)', fontSize:'16px'}}>
                  <li style={{marginBottom:'10px'}}>✓ SDK Licensing (per user)</li>
                  <li style={{marginBottom:'10px'}}>✓ Enterprise Wellness (B2B2C)</li>
                  <li>✓ Consumer Subscription</li>
                </ul>
              </div>
              <div className="card">
                <h3>Targets</h3>
                <div className="pillRow">
                  <span className="pill">Health Platforms</span>
                  <span className="pill">Mental Health Apps</span>
                  <span className="pill">Sleep Apps</span>
                  <span className="pill">Voice Assistants</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 8: TEAM */}
        <section className={getSlideClass(7)}>
          <GlowOrb color={palettes[7][0]} />
          <TopBar title="Team" />
          <div className="grow">
            <h2 className="anim-target" style={{marginBottom: '40px'}}>Built at the intersection of audio + medicine</h2>
            
            <div className="team-grid anim-target">
              {/* Itai */}
              <div className="team-card">
                <div className="avatar" style={{width: 90, height: 90, flexShrink: 0, borderRadius: '50%', background: '#222', border: '2px solid rgba(255,255,255,0.1)', overflow: 'hidden'}}>
                  <img 
                    src={teamData.itai.image} 
                    alt={teamData.itai.name} 
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement!.innerText = 'IA'; e.currentTarget.parentElement!.style.display='flex'; e.currentTarget.parentElement!.style.alignItems='center'; e.currentTarget.parentElement!.style.justifyContent='center'; e.currentTarget.parentElement!.style.fontSize='24px'; }}
                  />
                </div>
                <div>
                  <div className="tag" style={{marginBottom: '6px', fontSize: '10px', color: '#fff'}}>{teamData.itai.role}</div>
                  <h3 style={{fontSize: '24px', marginBottom: '8px'}}>{teamData.itai.name}</h3>
                  <p className="muted" style={{fontSize: '14px', lineHeight: '1.4', margin: 0}}>
                    {teamData.itai.bio}
                  </p>
                </div>
              </div>

              {/* Motti */}
              <div className="team-card">
                <div className="avatar" style={{width: 90, height: 90, flexShrink: 0, borderRadius: '50%', background: '#222', border: '2px solid rgba(255,255,255,0.1)', overflow: 'hidden'}}>
                   <img 
                     src={teamData.motti.image} 
                     alt={teamData.motti.name} 
                     style={{width: '100%', height: '100%', objectFit: 'cover'}}
                     onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement!.innerText = 'MR'; e.currentTarget.parentElement!.style.display='flex'; e.currentTarget.parentElement!.style.alignItems='center'; e.currentTarget.parentElement!.style.justifyContent='center'; e.currentTarget.parentElement!.style.fontSize='24px'; }}
                   />
                </div>
                <div>
                  <div className="tag" style={{marginBottom: '6px', fontSize: '10px', color: '#fff'}}>{teamData.motti.role}</div>
                  <h3 style={{fontSize: '24px', marginBottom: '8px'}}>{teamData.motti.name}</h3>
                  <p className="muted" style={{fontSize: '14px', lineHeight: '1.4', margin: 0}}>
                    {teamData.motti.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Advisors - Added spacing here (marginTop: 40px) */}
            <div className="card anim-target" style={{marginTop: '40px', padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--accent-purple)'}}>
                <h3 style={{fontSize: '18px', margin: 0}}>Advisors</h3>
                <p className="muted" style={{margin: 0, fontSize: '16px'}}>
                    Prof. Gil Zalsman (Columbia University) • Dr. Samanta Dall Agnese (Sleep Medicine) • Maxime El Baz, Ph.D. (Neuroscience, Digital Health, AI)
                </p>
            </div>
          </div>
        </section>

        {/* SLIDE 9: CONTACT */}
        <section className={`${getSlideClass(8)} last-slide`}>
          <GlowOrb color={palettes[8][1]} highIntensity={true} />
          <TopBar title="TuneMe AI" />
          <div className="grow" style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 10}}>
            
            <div className="anim-target" style={{marginBottom: '30px'}}>
               <h1 style={{
                 fontSize: 'clamp(50px, 10vw, 120px)', 
                 lineHeight: '0.9', 
                 background: 'linear-gradient(135deg, #fff 20%, var(--accent-cyan) 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 letterSpacing: '-0.04em'
               }}>
                 Listen.<br/>Analyze.<br/><span style={{
                    background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                 }}>Act.</span>
               </h1>
               <p style={{margin: '20px auto 0', fontSize: '24px', color: '#fff', opacity: 0.8, maxWidth: '600px'}}>
                 The world already has the sensors. <br/>TuneMe delivers the rest.
               </p>
            </div>

            <div className="anim-target contact-grid-mobile" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                width: '100%',
                maxWidth: '600px'
            }}>
                <div className="card" style={{flex: '1 1 200px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', borderColor: 'var(--accent-purple)', background: 'rgba(112,0,255,0.1)'}}>
                   <span className="tag" style={{justifyContent: 'center', color: '#fff'}}>Get in Touch</span>
                   <a href="mailto:itai@tuneme.io" style={{color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold'}}>itai@tuneme.io</a>
                </div>
                <div className="card" style={{flex: '1 1 200px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', borderColor: 'var(--accent-cyan)', background: 'rgba(0,240,255,0.1)'}}>
                   <span className="tag" style={{justifyContent: 'center', color: '#fff'}}>Visit Website</span>
                   <a href="https://tuneme.io" target="_blank" style={{color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold'}}>tuneme.io</a>
                </div>
            </div>

            <div className="anim-target" style={{marginTop: '30px', opacity: 0.5, fontSize: '12px', letterSpacing: '0.1em'}}>
               TUNEME AI © 2026 • PROPRIETARY & CONFIDENTIAL
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

// Check for root element availability and log error if missing
const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("Failed to find the root element");
} else {
    const root = createRoot(rootElement);
    root.render(<App />);
}