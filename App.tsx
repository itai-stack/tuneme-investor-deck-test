
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SlideData } from './types';
import BackgroundDecor from './components/BackgroundDecor';
import SlideContent from './components/SlideContent';
import Navigation from './components/Navigation';
import AIChat from './components/AIChat';
import { slides } from './data/slides';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInternalScroll = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIdx(index);
      
      if (window.innerWidth < 1024 && scrollRef.current) {
        isInternalScroll.current = true;
        scrollRef.current.scrollTo({
          top: index * window.innerHeight,
          behavior: 'smooth'
        });
        setTimeout(() => {
          isInternalScroll.current = false;
        }, 850);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isChatOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') goToSlide(currentIdx + 1);
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') goToSlide(currentIdx - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, goToSlide, isChatOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile || isInternalScroll.current) return;
    const scrollPos = e.currentTarget.scrollTop;
    const height = window.innerHeight;
    const newIdx = Math.round(scrollPos / height);
    if (newIdx !== currentIdx && newIdx >= 0 && newIdx < slides.length) {
      setCurrentIdx(newIdx);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-white select-none">
      <BackgroundDecor accent={slides[currentIdx].accent} />
      
      {/* Desktop Horizontal Deck */}
      {!isMobile ? (
        <div 
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full flex flex-col p-12 lg:p-20 relative z-10">
              <SlideContent slide={slide} isActive={currentIdx === slide.id - 1} isMobile={false} />
            </div>
          ))}
        </div>
      ) : (
        /* Mobile Vertical Stack */
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar scroll-smooth"
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-h-screen w-full flex flex-col p-6 py-12 snap-start relative z-10">
              <SlideContent slide={slide} isActive={currentIdx === slide.id - 1} isMobile={true} />
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

      <div className="fixed top-4 left-4 text-[10px] font-black tracking-widest text-white/20 z-50">
        TUNEME DECK V2.0
      </div>
    </div>
  );
};

export default App;
