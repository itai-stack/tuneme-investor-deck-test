import React, { useState, useRef, useEffect } from 'react';

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
    <div ref={menuRef} className="fixed top-[30px] right-[30px] z-[2000]">
      <button 
        className="w-11 h-11 rounded-full border border-white/20 bg-white/5 text-white cursor-pointer backdrop-blur-sm transition-all duration-200 flex items-center justify-center hover:bg-white/15 hover:border-white/40"
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Share Menu"
      >
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </button>

      {isOpen && (
        <div className="absolute top-[55px] right-0 w-[220px] bg-[#0f0f19]/95 border border-white/15 rounded-2xl backdrop-blur-xl p-2 shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col gap-[2px] overflow-hidden animate-[fade-in_0.2s_ease-out]">
            {typeof navigator !== 'undefined' && navigator.share && (
                 <button className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[#e0e0e0] transition-colors duration-200 bg-transparent border-none cursor-pointer w-full text-left font-inherit text-sm hover:bg-white/10 hover:text-white active:scale-98" onClick={handleNativeShare}>
                    <span className="flex items-center justify-center text-[#00ff9d] w-5 h-5"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg></span>
                    <span className="flex-grow font-medium">Share via...</span>
                 </button>
            )}
            
            {options.map(opt => (
                <a key={opt.name} href={opt.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[#e0e0e0] transition-colors duration-200 bg-transparent border-none cursor-pointer w-full text-left font-inherit text-sm hover:bg-white/10 hover:text-white active:scale-98" onClick={() => setIsOpen(false)}>
                    <span className="flex items-center justify-center text-[#00ff9d] w-5 h-5">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill={opt.stroke ? "none" : "currentColor"} stroke={opt.stroke ? "currentColor" : "none"} strokeWidth={opt.stroke ? "2" : "0"}>
                            <path d={opt.icon} />
                            {opt.name === 'Email' && <polyline points="22,6 12,13 2,6" />}
                        </svg>
                    </span>
                    <span className="flex-grow font-medium">{opt.name}</span>
                </a>
            ))}
            
            <div className="h-px bg-white/10 mx-1.5 my-1" />
            
            <button className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[#e0e0e0] transition-colors duration-200 bg-transparent border-none cursor-pointer w-full text-left font-inherit text-sm hover:bg-white/10 hover:text-white active:scale-98" onClick={handleCopy}>
                <span className="flex items-center justify-center text-[#00ff9d] w-5 h-5">
                   {copied ? 
                     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> : 
                     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                   }
                </span>
                <span className="flex-grow font-medium">{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;