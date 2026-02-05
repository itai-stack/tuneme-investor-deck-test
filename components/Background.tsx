import React, { useEffect, useRef } from 'react';
import { PALETTES } from '../constants';

interface BackgroundProps {
  currentSlide: number;
}

const Background: React.FC<BackgroundProps> = ({ currentSlide }) => {
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

    interface Star {
      x: number;
      y: number;
      size: number;
      phase: number;
      speed: number;
    }

    let stars: Star[] = [];

    const initStars = (w: number, h: number) => {
       const count = Math.floor((w * h) / 60000); 
       const newStars: Star[] = [];
       for(let i=0; i<count; i++){
          newStars.push({
             x: Math.random() * w,
             y: Math.random() * h,
             size: Math.random() * 2 + 1,
             phase: Math.random() * Math.PI * 2,
             speed: 2.0 + Math.random() * 3.0 
          });
       }
       return newStars;
    };
    
    stars = initStars(width, height);
    let time = 0;
    
    let curC1 = hexToRgb(PALETTES[0][0]);
    let curC2 = hexToRgb(PALETTES[0][1]);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = initStars(width, height);
    };
    window.addEventListener('resize', resize);

    let animId: number;

    const animate = () => {
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      time += 0.015; 

      // Draw Stars
      stars.forEach(star => {
          const val = Math.sin(time * star.speed + star.phase);
          if (val > 0) {
             const opacity = val * 0.7; 
             ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
             ctx.beginPath();
             ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
             ctx.fill();
          }
      });

      // Color Interpolation
      const targetIndex = slideRef.current < PALETTES.length ? slideRef.current : 0;
      const targetC1 = hexToRgb(PALETTES[targetIndex][0]);
      const targetC2 = hexToRgb(PALETTES[targetIndex][1]);
      const speed = 0.05;

      curC1.r = lerp(curC1.r, targetC1.r, speed);
      curC1.g = lerp(curC1.g, targetC1.g, speed);
      curC1.b = lerp(curC1.b, targetC1.b, speed);
      
      curC2.r = lerp(curC2.r, targetC2.r, speed);
      curC2.g = lerp(curC2.g, targetC2.g, speed);
      curC2.b = lerp(curC2.b, targetC2.b, speed);

      // Draw Waves
      ctx.globalCompositeOperation = 'screen'; 
      ctx.lineWidth = 1;
      
      const waveCount = 3; 
      const centerY = height / 2;
      
      for (let i = 0; i < waveCount; i++) {
        const mix = i / (waveCount > 1 ? waveCount - 1 : 1);
        const r = lerp(curC1.r, curC2.r, mix);
        const g = lerp(curC1.g, curC2.g, mix);
        const b = lerp(curC1.b, curC2.b, mix);
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)}, 0.3)`;
        ctx.strokeStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)}, 0.15)`;
        
        ctx.beginPath();
        
        const frequency = 0.002 + (i * 0.001);
        const phase = time * (1 + i * 0.2);
        const amplitude = height * 0.15; 

        for (let x = 0; x <= width; x += 10) {
            const y = centerY 
                + Math.sin(x * frequency + phase) * amplitude
                + Math.sin(x * frequency * 2.0 + phase * 1.3) * (amplitude * 0.4);
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []); // Empty dependency array intentionally to setup once, logic inside handles refs

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
  );
};

export default Background;