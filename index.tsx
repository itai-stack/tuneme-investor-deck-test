import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Background Animation Component ---
const BioBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Wave parameters
    const lines = 3;
    const points = [];
    let time = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Draw flowing frequency lines
      for(let l = 0; l < lines; l++) {
        ctx.beginPath();
        let yBase = height * 0.5 + (l - 1) * 40;
        let color = l === 1 ? 'rgba(0, 240, 255, 0.5)' : 'rgba(112, 0, 255, 0.3)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        
        for (let x = 0; x <= width; x += 10) {
          // Perlin-ish noise simulation with sines
          const y = yBase + 
            Math.sin(x * 0.005 + time + l) * 50 + 
            Math.sin(x * 0.01 + time * 2) * 20;
          
          if(x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      // Floating particles (biomarkers)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for(let i=0; i<20; i++) {
        let px = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * width;
        let py = (Math.cos(time * 0.3 + i * 1.5) * 0.5 + 0.5) * height;
        ctx.beginPath();
        ctx.arc(px, py, Math.sin(time + i)*1.5 + 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
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
      <BioBackground />
      
      <div className="progress-bar" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>

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
          <TopBar title="Biomarker Engine" />
          <div className="grow" style={{alignItems: 'center', textAlign: 'center'}}>
            <div className="anim-target" style={{width: '100%', maxWidth: '1000px'}}>
              <h1>10 seconds of voice <br/><span className="emph">→ physiology.</span></h1>
              <p style={{marginTop: '24px', fontSize: '20px', maxWidth: '600px', lineHeight: '1.6', marginInline: 'auto'}}>TuneMe converts a short voice sample into a real-time signal of <b>stress</b> and <b>autonomic balance</b>.</p>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginTop: '50px', textAlign: 'left'}} className="stats-grid">
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
          </div>
        </section>

        {/* SLIDE 2: PROBLEM */}
        <section className={getSlideClass(1)}>
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
          <TopBar title="Product" />
          <div className="grow">
            <div className="anim-target" style={{textAlign:'center'}}>
              <h2>One Engine. <span className="emph2">Multiple Surfaces.</span></h2>
              <p style={{margin: '0 auto'}}>We are not just an app. We are the intelligence layer for digital health.</p>
            </div>

            <div className="steps anim-target">
              <div className="step">
                <div className="tag">Input</div>
                <h3>Voice</h3>
                <p className="muted">10-second sample</p>
              </div>
              <div className="arrow">→</div>
              <div className="step" style={{borderColor: 'var(--accent-purple)', boxShadow: '0 0 30px rgba(112,0,255,0.2)'}}>
                <div className="tag" style={{color:'var(--accent-purple)'}}>Core</div>
                <h3>AI Biomarkers</h3>
                <p className="muted">Stress • Autonomic Balance</p>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <div className="tag">Output</div>
                <h3>Action</h3>
                <p className="muted">Personalized Therapy / API</p>
              </div>
            </div>

            <div className="twoEq anim-target">
              <div className="card">
                <h3>Consumer App</h3>
                <p className="muted">Immediate value + controlled data collection.</p>
                <div className="pillRow">
                  <span className="pill">Check-in</span>
                  <span className="pill">Therapy</span>
                </div>
              </div>
              <div className="card">
                <h3>SDK / API</h3>
                <p className="muted">Licensing the analysis layer to partners.</p>
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
            
            <div className="card anim-target" style={{marginTop: '0px', padding: '20px'}}>
               <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                  <div><span className="tag">Defensibility</span> <b>2 Patents Filed, 1 Approved</b></div>
                  <div><span className="tag">Asset</span> <b>Outcome-Linked Voice Dataset</b></div>
               </div>
            </div>
          </div>
        </section>

        {/* SLIDE 7: STRATEGY */}
        <section className={getSlideClass(6)}>
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
          <TopBar title="Team" />
          <div className="grow">
            <h2 className="anim-target" style={{marginBottom: '40px'}}>Built at the intersection of audio + medicine</h2>
            
            <div className="team-grid anim-target" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px'}}>
              {/* Itai */}
              <div className="card team-card">
                <div className="avatar" style={{width: 90, height: 90, flexShrink: 0, borderRadius: '50%', background: '#222', border: '2px solid rgba(255,255,255,0.1)'}}>
                  <img src="https://ui-avatars.com/api/?name=Itai+Argaman&background=0a0f18&color=fff&size=200&font-size=0.33" alt="Itai Argaman" />
                </div>
                <div>
                  <div className="tag" style={{marginBottom: '6px', fontSize: '10px', color: '#fff'}}>CEO & CO-FOUNDER</div>
                  <h3 style={{fontSize: '24px', marginBottom: '8px'}}>Itai Argaman</h3>
                  <p className="muted" style={{fontSize: '14px', lineHeight: '1.4', margin: 0}}>
                    Audio technology & commercialization. Former Waves Audio. Collaboration with Google and Meta on audio-based consumer products.
                  </p>
                </div>
              </div>

              {/* Motti */}
              <div className="card team-card">
                <div className="avatar" style={{width: 90, height: 90, flexShrink: 0, borderRadius: '50%', background: '#222', border: '2px solid rgba(255,255,255,0.1)'}}>
                   <img src="https://ui-avatars.com/api/?name=Motti+Ratmansky&background=0a0f18&color=fff&size=200&font-size=0.33" alt="Motti Ratmansky" />
                </div>
                <div>
                  <div className="tag" style={{marginBottom: '6px', fontSize: '10px', color: '#fff'}}>CMO & CO-FOUNDER</div>
                  <h3 style={{fontSize: '24px', marginBottom: '8px'}}>Motti Ratmansky, MD</h3>
                  <p className="muted" style={{fontSize: '14px', lineHeight: '1.4', margin: 0}}>
                    Pain management & rehabilitation specialist. Leads clinical validation.
                  </p>
                </div>
              </div>
            </div>

            {/* Advisors */}
            <div className="card anim-target" style={{padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--accent-purple)'}}>
                <h3 style={{fontSize: '18px', margin: 0}}>Advisors</h3>
                <p className="muted" style={{margin: 0, fontSize: '16px'}}>
                    Prof. Gil Zalsman (Columbia University) • Dr. Samanta Dall Agnese (Sleep Medicine)
                </p>
            </div>
          </div>
        </section>

        {/* SLIDE 9: CONTACT */}
        <section className={`${getSlideClass(8)} last-slide`}>
          <div className="glow-orb"></div>
          <TopBar title="TuneMe AI" />
          <div className="grow" style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 10}}>
            
            <div className="anim-target" style={{marginBottom: '60px'}}>
               <h1 style={{
                 fontSize: 'clamp(60px, 10vw, 150px)', 
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
               <p style={{margin: '30px auto 0', fontSize: '24px', color: '#fff', opacity: 0.8, maxWidth: '600px'}}>
                 The world already has the sensors. <br/>TuneMe delivers the rest.
               </p>
            </div>

            <div className="anim-target" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                width: '100%',
                maxWidth: '600px'
            }}>
                <div className="card" style={{padding: '30px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', borderColor: 'var(--accent-purple)', background: 'rgba(112,0,255,0.1)'}}>
                   <span className="tag" style={{justifyContent: 'center', color: '#fff'}}>Get in Touch</span>
                   <a href="mailto:itai@tuneme.io" style={{color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold'}}>itai@tuneme.io</a>
                </div>
                <div className="card" style={{padding: '30px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', borderColor: 'var(--accent-cyan)', background: 'rgba(0,240,255,0.1)'}}>
                   <span className="tag" style={{justifyContent: 'center', color: '#fff'}}>Visit Website</span>
                   <a href="https://tuneme.io" target="_blank" style={{color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold'}}>tuneme.io</a>
                </div>
            </div>

            <div className="anim-target" style={{marginTop: '40px', opacity: 0.5, fontSize: '12px', letterSpacing: '0.1em'}}>
               TUNEME AI © 2025 • PROPRIETARY & CONFIDENTIAL
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);