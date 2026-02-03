import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from './types.ts';
import { slides } from './slides.ts';

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "I'm the TuneMe Assistant. I can answer questions about our voice biomarker tech, market strategy, or the roadmap. How can I help you?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      // Safely access process.env to avoid crashes on non-Node environments
      const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;
      
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'model', text: "Configuration error: API key is missing. Please ensure your environment is set up correctly." }]);
        setLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const context = slides.map(s => `Slide ${s.id} (${s.kicker}): ${s.title}. ${s.subtitle}`).join('\n');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are TuneMe AI, a professional investor relations assistant for a health-tech startup. 
        Context from our pitch deck:
        ${context}
        
        Question: ${userText}
        Provide a concise, confident, and data-driven response.`
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I couldn't generate a response." }]);
    } catch (e) {
      console.error("AI Chat Error:", e);
      setMessages(prev => [...prev, { role: 'model', text: "Service error. Please try again later or contact support." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 custom-blur transition-all duration-300">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden flex flex-col h-[75vh] shadow-2xl">
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-teal-400" />
            <h3 className="font-bold tracking-tight text-lg">TuneMe AI Assistant</h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-teal-500/20 text-teal-50' : 'bg-white/5 text-white/90'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-white/30 text-xs animate-pulse">Assistant is thinking...</div>}
        </div>
        <div className="p-8 border-t border-white/10">
          <div className="relative">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Type your question..." 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-sm outline-none focus:border-teal-400/50 transition-colors" 
            />
            <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-teal-400 rounded-xl text-slate-950 flex items-center justify-center font-bold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;