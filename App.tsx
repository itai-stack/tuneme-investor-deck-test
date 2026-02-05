import React, { useState, useEffect, useRef } from 'react';
import Background from './components/Background';
import ShareButton from './components/ShareButton';
import { GlowOrb, TopBar, Card, Tag, StatBox, Pill } from './components/UI';
import { PALETTES, TEAM_DATA } from './constants';

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

  const SlideSection: React.FC<{ index: number; children?: React.ReactNode; className?: string }> = ({ index, children, className = '' }) => (
    <section 
        className={`w-screen h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden p-6 md:p-12 relative transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-20 pointer-events-none'} ${className}`}
        aria-hidden={index !== currentSlide}
    >
        <div className="max-w-7xl mx-auto h-full flex flex-col slide-content pb-20">
            {children}
        </div>
    </section>
  );

  return (
    <div className="fixed inset-0 overflow-hidden font-sans text-white bg-bg selection:bg-cyan/30">
      <Background currentSlide={currentSlide} />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-cyan z-50 transition-[width] duration-300 ease-out" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>

      <ShareButton />

      {/* Navigation Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button className="w-11 h-11 rounded-full border border-white/20 bg-white/5 text-white text-lg flex items-center justify-center hover:bg-white/15 transition-colors backdrop-blur-sm" onClick={prevSlide} aria-label="Previous Slide">←</button>
        <button className="w-11 h-11 rounded-full border border-white/20 bg-white/5 text-white text-lg flex items-center justify-center hover:bg-white/15 transition-colors backdrop-blur-sm" onClick={nextSlide} aria-label="Next Slide">→</button>
      </div>

      {/* Deck Container */}
      <div 
        className="flex h-full w-full transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)" 
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        
        {/* SLIDE 0: TITLE */}
        <SlideSection index={0}>
          <GlowOrb color={PALETTES[0][0]} highIntensity={true} />
          <TopBar title="Biomarker Engine" />
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-4xl animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                10 seconds of voice <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">→ physiology.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#d0d0e0] max-w-2xl mx-auto mb-12 leading-relaxed">
                TuneMe converts a short voice sample into a real-time signal of <b>stress</b> and <b>autonomic balance</b>, and delivers a personalized therapeutic response.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                    ['10s', 'Voice Check-in'],
                    ['Real-time', 'Analysis'],
                    ['No HW', 'Required'],
                    ['Closed-loop', 'Learning']
                ].map(([val, label], i) => (
                    <div key={i} className="bg-gradient-to-b from-[#141428]/80 to-[#0a0a14]/90 border border-[#323250]/50 rounded-xl p-5 shadow-inner">
                        <div className="text-2xl font-bold text-white mb-1">{val}</div>
                        <div className="text-[10px] text-muted uppercase tracking-wider">{label}</div>
                    </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {['Voice Biomarkers', 'Physiology', 'Adaptive Therapy', 'Data Advantage'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full border border-white/20 bg-black/20 text-muted text-xs uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </SlideSection>

        {/* SLIDE 1: PROBLEM */}
        <SlideSection index={1}>
          <GlowOrb color={PALETTES[1][0]} />
          <TopBar title="The Problem" />
          <div className="flex-grow flex flex-col justify-center">
            <div className="animate-[fadeInUp_0.6s_ease-out_0.1s_both] mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Wearables measure. <span className="text-accent-pink">They don’t fix.</span></h2>
              <p className="text-lg text-gray-300 max-w-3xl">Hundreds of millions track sleep & stress daily, but most platforms stop at insights. The missing layer is <b>real-time action</b>.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              {/* Left Column: The Real Pain */}
              <Card className="flex flex-col justify-between min-h-[300px]">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">The real pain</h3>
                  <p className="text-sm text-muted mb-8">The problem is not awareness. It is overload. Too many sensors, too much data, and still no action.</p>
                </div>
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                   <StatBox value="+30%" label="Increase in wearable ownership" />
                   <StatBox value="80%" label="Of users do not act on insights" />
                   <StatBox value="1.5B" label="People suffer chronic stress" />
                   <StatBox value="$1T" label="Lost productivity per year" />
                </div>
              </Card>

              {/* Right Column: The Unlock */}
              <Card className="flex flex-col justify-center items-start border-accent-pink/20 bg-accent-pink/5">
                <h3 className="text-2xl font-bold mb-4 leading-tight">The unlock: <span className="text-cyan">HRV validates outcomes.</span> <br/>Voice drives action.</h3>
                <p className="text-muted text-sm leading-relaxed max-w-md">Measure the baseline (T0), apply therapy, then confirm a measurable physiological change (T1).</p>
              </Card>
            </div>
          </div>
        </SlideSection>

        {/* SLIDE 2: WHY VOICE */}
        <SlideSection index={2}>
          <GlowOrb color={PALETTES[2][0]} />
          <TopBar title="Why Voice" />
          <div className="flex-grow flex flex-col justify-center items-center">
            <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Voice is a high-resolution physiological signal</h2>
              <p className="text-lg text-gray-300">It delivers continuous insight without hardware or friction.</p>
            </div>
            
            <div className="flex flex-col gap-5 w-full max-w-3xl animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              {[
                  { tag: 'UNIVERSAL', title: 'Any smart device with a microphone', desc: 'Smartphones, laptops, tablets, wearables, and smart speakers. No extra hardware.' },
                  { tag: 'INSTANT', title: 'Seconds-to-signal', desc: 'Fast physiological analysis.' },
                  { tag: 'CONTINUOUS', title: 'Daily check-ins build a data advantage', desc: 'Outcome-linked voice data at scale is extremely hard to replicate.' }
              ].map((item, i) => (
                  <Card key={i} className="flex flex-col items-center text-center py-8 hover:bg-white/5 transition-colors">
                     <Tag className="bg-white/5 px-3 py-1 rounded-full">{item.tag}</Tag>
                     <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                     <p className="text-muted">{item.desc}</p>
                  </Card>
              ))}
            </div>
          </div>
        </SlideSection>

        {/* SLIDE 3: PRODUCT */}
        <SlideSection index={3}>
          <GlowOrb color={PALETTES[3][0]} />
          <TopBar title="Product" />
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="text-center mb-16 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">One Engine. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-pink-500">Multiple Surfaces.</span></h2>
              <p className="text-gray-300">We are not just an app. We are the intelligence layer for digital health.</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-5xl mb-16 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full">
                <Tag>Input</Tag>
                <h3 className="text-xl font-bold mb-1">Voice</h3>
                <p className="text-sm text-muted mb-2">10-second sample</p>
                <p className="text-xs opacity-50">Captures autonomic nervous system markers</p>
              </div>
              <div className="text-2xl text-muted rotate-90 md:rotate-0">→</div>
              <div className="flex-1 bg-purple/10 border border-purple/40 shadow-[0_0_30px_rgba(112,0,255,0.15)] rounded-xl p-6 text-center w-full transform md:-translate-y-4">
                <Tag color="text-purple">Core</Tag>
                <h3 className="text-xl font-bold mb-1">AI Biomarkers</h3>
                <p className="text-sm text-muted mb-2">Stress • Autonomic Balance</p>
                <p className="text-xs opacity-50">Physiology-driven state detection</p>
              </div>
              <div className="text-2xl text-muted rotate-90 md:rotate-0">→</div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full">
                <Tag>Output</Tag>
                <h3 className="text-xl font-bold mb-1">Action</h3>
                <p className="text-sm text-muted mb-2">Personalized Therapy / API</p>
                <p className="text-xs opacity-50">Non-invasive vagus nerve stimulation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
              <Card>
                <h3 className="text-xl font-bold mb-2">Consumer App</h3>
                <p className="text-muted text-sm mb-6 h-10">Immediate value + controlled data collection. Audio-based stimulation targeting the vagus nerve.</p>
                <div className="flex gap-2">
                  <Pill>CHECK-IN</Pill>
                  <Pill>THERAPY</Pill>
                </div>
              </Card>
              <Card>
                <h3 className="text-xl font-bold mb-2">SDK / API</h3>
                <p className="text-muted text-sm mb-6 h-10">Licensing the analysis + stimulation layer to partners. Physiology-based signals for any platform.</p>
                <div className="flex gap-2">
                  <Pill>Stress Index</Pill>
                  <Pill>State Change</Pill>
                </div>
              </Card>
            </div>
          </div>
        </SlideSection>

        {/* SLIDE 4: VALIDATION */}
        <SlideSection index={4}>
          <GlowOrb color={PALETTES[4][0]} />
          <TopBar title="Validation" />
          <div className="flex-grow flex flex-col justify-center items-center">
            <div className="text-center max-w-3xl mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">The Closed-Loop Advantage</h2>
              <p className="text-gray-300 text-lg">Therapy is not “another product”, it’s the controlled intervention that validates biomarkers and accelerates learning.</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-4xl mb-12 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-48">
                <Tag>T-Zero</Tag>
                <h3 className="text-xl font-bold">Measure</h3>
                <p className="text-xs text-muted uppercase mt-1">Voice Baseline</p>
              </div>
              <div className="text-2xl text-cyan rotate-90 md:rotate-0">→</div>
              <div className="bg-cyan/5 border border-cyan/40 rounded-xl p-6 text-center w-48 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <Tag color="text-cyan">Action</Tag>
                <h3 className="text-xl font-bold">Intervene</h3>
                <p className="text-xs text-muted uppercase mt-1">Audio Therapy</p>
              </div>
              <div className="text-2xl text-cyan rotate-90 md:rotate-0">→</div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-48">
                <Tag>T-One</Tag>
                <h3 className="text-xl font-bold">Verify</h3>
                <p className="text-xs text-muted uppercase mt-1">Biomarker Shift</p>
              </div>
            </div>
            
            <Card className="max-w-2xl text-center border-accent-gold/30 bg-accent-gold/5 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
               <p className="text-lg md:text-xl font-medium italic text-white/90">"If the physiological state changes and the biomarker moves with it, the biomarker is meaningful."</p>
            </Card>
          </div>
        </SlideSection>

        {/* SLIDE 5: TRACTION */}
        <SlideSection index={5}>
          <GlowOrb color={PALETTES[5][0]} />
          <TopBar title="Traction" />
          <div className="flex-grow flex flex-col justify-center">
            <div className="mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Clinical & Commercial <span className="text-accent-gold">Proof</span></h2>
              <p className="text-gray-300 text-lg">Objective physiological outcomes, plus real distribution partners.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <Card>
                <Tag color="text-accent-gold">Clinical Data</Tag>
                <h3 className="text-2xl font-bold mb-6">RCT Results (N=50)</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <StatBox value="-100%" label="High Stress" />
                  <StatBox value="+262%" label="Resting State" />
                </div>
                <p className="text-sm text-muted">Validated against Garmin objective stress measurement.</p>
              </Card>

              <Card>
                <Tag>Business</Tag>
                <h3 className="text-2xl font-bold mb-6">Commercial</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <StatBox value="4000+" label="Users" />
                  <StatBox value="$900K" label="Raised" />
                </div>
                <div className="flex flex-col gap-2">
                   <div className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-center text-sm font-medium">Signed: Isracard & Maccabi Club</div>
                   <div className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-center text-sm font-medium">Pilot: Israeli Ministry of Defense</div>
                </div>
              </Card>
            </div>
            
            <Card className="mt-8 flex flex-wrap justify-between items-center gap-4 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
               <div className="flex items-center gap-3"><span className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase font-bold">Defensibility</span> <span className="text-sm md:text-base font-bold">2 Patents Filed, 1 Approved</span></div>
               <div className="flex items-center gap-3"><span className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase font-bold">Asset</span> <span className="text-sm md:text-base font-bold">Outcome-Linked Voice Dataset</span></div>
            </Card>
          </div>
        </SlideSection>

        {/* SLIDE 6: STRATEGY */}
        <SlideSection index={6}>
          <GlowOrb color={PALETTES[6][0]} />
          <TopBar title="Strategy" />
          <div className="flex-grow flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Why Big Tech Cares</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <Card className="flex flex-col items-center text-center">
                  <StatBox value="Zero HW" label="No device dependency" />
              </Card>
              <Card className="flex flex-col items-center text-center">
                  <StatBox value="API" label="Licensable layer" />
              </Card>
              <Card className="flex flex-col items-center text-center">
                  <StatBox value="Data" label="Clinically linked" />
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
              <Card>
                <h3 className="text-xl font-bold mb-4">Monetization</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2"><span className="text-cyan">✓</span> SDK Licensing (per user)</li>
                  <li className="flex items-center gap-2"><span className="text-cyan">✓</span> Enterprise Wellness (B2B2C)</li>
                  <li className="flex items-center gap-2"><span className="text-cyan">✓</span> Consumer Subscription</li>
                </ul>
              </Card>
              <Card>
                <h3 className="text-xl font-bold mb-4">Targets</h3>
                <div className="flex flex-wrap gap-2">
                  <Pill>Health Platforms</Pill>
                  <Pill>Mental Health Apps</Pill>
                  <Pill>Sleep Apps</Pill>
                  <Pill>Voice Assistants</Pill>
                </div>
              </Card>
            </div>
          </div>
        </SlideSection>

        {/* SLIDE 7: TEAM */}
        <SlideSection index={7}>
          <GlowOrb color={PALETTES[7][0]} />
          <TopBar title="Team" />
          <div className="flex-grow flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">Built at the intersection of audio + medicine</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              {/* Itai */}
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-[#222] border-2 border-white/10 overflow-hidden">
                  <img src={TEAM_DATA.itai.image} alt={TEAM_DATA.itai.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-accent-pink mb-1">{TEAM_DATA.itai.role}</div>
                  <h3 className="text-2xl font-bold mb-2">{TEAM_DATA.itai.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{TEAM_DATA.itai.bio}</p>
                </div>
              </div>

              {/* Motti */}
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-[#222] border-2 border-white/10 overflow-hidden">
                   <img src={TEAM_DATA.motti.image} alt={TEAM_DATA.motti.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-accent-pink mb-1">{TEAM_DATA.motti.role}</div>
                  <h3 className="text-2xl font-bold mb-2">{TEAM_DATA.motti.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{TEAM_DATA.motti.bio}</p>
                </div>
              </div>
            </div>

            <Card className="border-t-purple/50 bg-purple/5 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
                <h3 className="text-lg font-bold mb-2">Advisors</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Prof. Gil Zalsman (Columbia University) • Dr. Samanta Dall Agnese (Sleep Medicine) • Maxime El Baz, Ph.D. (Neuroscience, Digital Health, AI)
                </p>
            </Card>
          </div>
        </SlideSection>

        {/* SLIDE 8: CONTACT */}
        <SlideSection index={8}>
          <GlowOrb color={PALETTES[8][1]} highIntensity={true} />
          <TopBar title="TuneMe AI" />
          <div className="flex-grow flex flex-col items-center justify-center text-center relative z-10">
            
            <div className="mb-16 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tighter mb-8">
                 <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">Listen.</span><br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">Analyze.</span><br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan to-purple">Act.</span>
               </h1>
               <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                 The world already has the sensors. <br/>TuneMe delivers the rest.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
                <a href="mailto:itai@tuneme.io" className="bg-purple/10 border border-purple/30 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-purple/20 transition-colors group">
                   <span className="text-xs uppercase tracking-widest text-white/70 group-hover:text-white">Get in Touch</span>
                   <span className="text-xl font-bold text-white">itai@tuneme.io</span>
                </a>
                <a href="https://tuneme.io" target="_blank" rel="noreferrer" className="bg-cyan/10 border border-cyan/30 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-cyan/20 transition-colors group">
                   <span className="text-xs uppercase tracking-widest text-white/70 group-hover:text-white">Visit Website</span>
                   <span className="text-xl font-bold text-white">tuneme.io</span>
                </a>
            </div>

            <div className="mt-16 text-[10px] md:text-xs text-white/30 tracking-[0.2em] animate-[fadeIn_1s_ease-out_0.8s_both]">
               TUNEME AI © 2026 • PROPRIETARY & CONFIDENTIAL
            </div>

          </div>
        </SlideSection>

      </div>
    </div>
  );
};

export default App;