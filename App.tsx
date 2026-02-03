
import React, { useState, useEffect, useCallback, useRef } from 'react';
import BackgroundDecor from './BackgroundDecor.tsx';
import SlideContent from './SlideContent.tsx';
import Navigation from './Navigation.tsx';
import AIChat from './AIChat.tsx';
import { slides } from './slides.ts';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInternalScroll = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIdx(index);
      if (isMobile && scrollRef.current) {
        isInternalScroll.current = true;
        scrollRef.current.scrollTo({ 
          top: index * window.innerHeight, 
          behavior: 'smooth' 
        });
        setTimeout(() => isInternalScroll.current = false, 850);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isChatOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToSlide(currentIdx + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentIdx - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, goToSlide, isChatOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile || isInternalScroll.current) return;
    const newIdx = Math.round(e.currentTarget.scrollTop / window.innerHeight);
    if (newIdx !== currentIdx && newIdx >= 0 && newIdx < slides.length) {
      setCurrentIdx(newIdx);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-white select-none">
      <BackgroundDecor accent={slides[currentIdx].accent} />
      
      {!isMobile ? (
        <div 
          className="flex transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1) h-full" 
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="min-w-full h-full flex flex-col p-12 lg:p-20 relative z-10">
              <SlideContent slide={slide} isActive={currentIdx === idx} isMobile={false} />
            </div>
          ))}
        </div>
      ) : (
        <div 
          ref={scrollRef} 
          onScroll={handleScroll} 
          className="h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar scroll-smooth"
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="min-h-screen w-full flex flex-col p-6 py-12 snap-start relative z-10">
              <SlideContent slide={slide} isActive={currentIdx === idx} isMobile={true} />
            </div>
          ))}
        </div>
      )}

      <Navigation 
        current={currentIdx} 
        total={slides.length} 
        onPrev={() => goToSlide(currentIdx - 1)} 
        onNext={() => goToSlide(currentIdx + 1)} 
        onOpenChat={() => setIsChatOpen(true)} 
      />
      
      {isChatOpen && <AIChat onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;
