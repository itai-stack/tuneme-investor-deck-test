
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from './types';
import { slides } from './slides';

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "I'm the TuneMe Assistant. I can answer questions about our tech or strategy. How can I help?" }
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = slides.map(s => `Slide ${s.id}: ${s.title}. ${s.subtitle}`).join('\n');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are TuneMe AI. Context:\n${context}\n\nQuestion: ${userText}`
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "No response." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 custom-blur">
      <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden flex flex-col h-[70vh] shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold tracking-tight">TuneMe AI</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white">Close</button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-teal-500/20 text-teal-50' : 'bg-white/5 text-white/90'}`}>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-white/10">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask a question..." className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none" />
        </div>
      </div>
    </div>
  );
};

export default AIChat;
