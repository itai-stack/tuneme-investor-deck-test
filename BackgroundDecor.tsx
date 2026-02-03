
import React from 'react';

interface Props {
  accent: string;
}

const BackgroundDecor: React.FC<Props> = ({ accent }) => {
  const colors: Record<string, string> = {
    violet: '#8B5CF6',
    teal: '#14B8A6',
    mint: '#34D399',
    coral: '#FB7185',
    lime: '#A3E635',
    indigo: '#6366F1',
    cyan: '#22D3EE',
    rose: '#FB7185',
    gold: '#FBBF24',
  };

  const activeColor = colors[accent] || colors.teal;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] -left-40 -top-40 rounded-full blur-[100px] opacity-20 transition-colors duration-1000 animate-float"
        style={{ background: `radial-gradient(circle, ${activeColor}, transparent 70%)` }}
      />
      <div 
        className="absolute w-[800px] h-[800px] -right-40 -bottom-40 rounded-full blur-[120px] opacity-10 transition-colors duration-1000 animate-float"
        style={{ background: `radial-gradient(circle, #6067E6, transparent 70%)`, animationDelay: '-4s' }}
      />
    </div>
  );
};

export default BackgroundDecor;
