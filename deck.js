// mnt/data/index.tsx
import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var palettes = [
  ["#00f0ff", "#7000ff"],
  // 0: Title - Cyan/Purple
  ["#ff0055", "#7a0026"],
  // 1: Problem - Red/DeepRed
  ["#00ff9d", "#00b8ff"],
  // 2: Voice - Green/Cyan
  ["#8c00ff", "#ff00d4"],
  // 3: Product - Deep Purple/Pink
  ["#ffcc00", "#ff6600"],
  // 4: Validation - Gold/Orange
  ["#00ffd5", "#2a52be"],
  // 5: Traction - Teal/Blue
  ["#3a4b99", "#7a8fd9"],
  // 6: Strategy - Corporate Blue
  ["#ff9a9e", "#fecfef"],
  // 7: Team - Warm Pink
  ["#ffffff", "#00f0ff"]
  // 8: Contact - Bright
];
var teamData = {
  itai: {
    name: "Itai Argaman",
    role: "CEO & CO-FOUNDER",
    // Updated to new photo ID: 1gxArPetBgtslObGzLnBBMgRDPbfM_Gwx
    image: "https://lh3.googleusercontent.com/d/1gxArPetBgtslObGzLnBBMgRDPbfM_Gwx",
    bio: "Audio technology & commercialization. Former Waves Audio. Collaboration with Google and Meta on audio-based consumer products."
  },
  motti: {
    name: "Motti Ratmansky, MD",
    role: "CMO & CO-FOUNDER",
    // Updated to new photo ID: 1q0mA0l6ufa6tw5IKGA5qAr3OBDEPgRqC
    image: "https://lh3.googleusercontent.com/d/1q0mA0l6ufa6tw5IKGA5qAr3OBDEPgRqC",
    bio: "Pain management & rehabilitation specialist. Leads clinical validation."
  }
};
var GlowOrb = ({ color, highIntensity = false }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: "glow-orb",
    style: {
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: highIntensity ? 0.15 : 0.05
    }
  }
);
var ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = "10 seconds of voice \u2192 physiology.";
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };
  const handleNativeShare = async () => {
    const shareData = {
      title: "TuneMe",
      text,
      url
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setIsOpen(false);
      } catch (e) {
      }
    }
  };
  const options = [
    { name: "WhatsApp", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z", href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}` },
    { name: "Email", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6", stroke: true, href: `mailto:?subject=${encodeURIComponent("TuneMe")}&body=${encodeURIComponent(text + "\n" + url)}` },
    { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "X / Twitter", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` }
  ];
  return /* @__PURE__ */ jsxs("div", { ref: menuRef, className: "share-container", children: [
    /* @__PURE__ */ jsx("button", { className: "share-btn-trigger", onClick: () => setIsOpen(!isOpen), "aria-label": "Share Menu", children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("circle", { cx: "18", cy: "5", r: "3" }),
      /* @__PURE__ */ jsx("circle", { cx: "6", cy: "12", r: "3" }),
      /* @__PURE__ */ jsx("circle", { cx: "18", cy: "19", r: "3" }),
      /* @__PURE__ */ jsx("line", { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }),
      /* @__PURE__ */ jsx("line", { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" })
    ] }) }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "share-menu", children: [
      typeof navigator !== "undefined" && navigator.share && /* @__PURE__ */ jsxs("button", { className: "share-item", onClick: handleNativeShare, children: [
        /* @__PURE__ */ jsx("span", { className: "share-icon", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsx("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }),
          /* @__PURE__ */ jsx("polyline", { points: "16 6 12 2 8 6" }),
          /* @__PURE__ */ jsx("line", { x1: "12", y1: "2", x2: "12", y2: "15" })
        ] }) }),
        /* @__PURE__ */ jsx("span", { className: "share-label", children: "Share via..." })
      ] }),
      options.map((opt) => /* @__PURE__ */ jsxs("a", { href: opt.href, target: "_blank", rel: "noopener noreferrer", className: "share-item", onClick: () => setIsOpen(false), children: [
        /* @__PURE__ */ jsx("span", { className: "share-icon", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: opt.stroke ? "none" : "currentColor", stroke: opt.stroke ? "currentColor" : "none", strokeWidth: opt.stroke ? "2" : "0", children: [
          /* @__PURE__ */ jsx("path", { d: opt.icon }),
          opt.name === "Email" && /* @__PURE__ */ jsx("polyline", { points: "22,6 12,13 2,6" })
        ] }) }),
        /* @__PURE__ */ jsx("span", { className: "share-label", children: opt.name })
      ] }, opt.name)),
      /* @__PURE__ */ jsx("div", { className: "share-divider" }),
      /* @__PURE__ */ jsxs("button", { className: "share-item", onClick: handleCopy, children: [
        /* @__PURE__ */ jsx("span", { className: "share-icon", children: copied ? /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) : /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
          /* @__PURE__ */ jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
        ] }) }),
        /* @__PURE__ */ jsx("span", { className: "share-label", children: copied ? "Copied" : "Copy Link" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .share-container {
            position: fixed;
            top: 30px;
            right: 30px;
            z-index: 2000;
        }
        .share-btn-trigger {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.05);
            color: white;
            cursor: pointer;
            backdrop-filter: blur(4px);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .share-btn-trigger:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.4);
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
      ` })
  ] });
};
var StunningBackground = ({ currentSlide }) => {
  const canvasRef = useRef(null);
  const slideRef = useRef(currentSlide);
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return { r: bigint >> 16 & 255, g: bigint >> 8 & 255, b: bigint & 255 };
  };
  const lerp = (start, end, t) => start + (end - start) * t;
  useEffect(() => {
    slideRef.current = currentSlide;
  }, [currentSlide]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let stars = [];
    const initStars = (w, h) => {
      const count = Math.floor(w * h / 6e4);
      const newStars = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2 + 1,
          // Slightly larger (1px - 3px) for visibility
          phase: Math.random() * Math.PI * 2,
          // Much faster speed for visible twinkling (2x to 5x multiplier relative to time)
          speed: 2 + Math.random() * 3
        });
      }
      return newStars;
    };
    stars = initStars(width, height);
    let time = 0;
    let curC1 = hexToRgb(palettes[0][0]);
    let curC2 = hexToRgb(palettes[0][1]);
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = initStars(width, height);
    };
    window.addEventListener("resize", resize);
    const animate = () => {
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, width, height);
      time += 0.015;
      stars.forEach((star) => {
        const val = Math.sin(time * star.speed + star.phase);
        if (val > 0) {
          const opacity = val * 0.7;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      const targetIndex = slideRef.current < palettes.length ? slideRef.current : 0;
      const targetC1 = hexToRgb(palettes[targetIndex][0]);
      const targetC2 = hexToRgb(palettes[targetIndex][1]);
      const speed = 0.05;
      curC1.r = lerp(curC1.r, targetC1.r, speed);
      curC1.g = lerp(curC1.g, targetC1.g, speed);
      curC1.b = lerp(curC1.b, targetC1.b, speed);
      curC2.r = lerp(curC2.r, targetC2.r, speed);
      curC2.g = lerp(curC2.g, targetC2.g, speed);
      curC2.b = lerp(curC2.b, targetC2.b, speed);
      ctx.globalCompositeOperation = "screen";
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
        const frequency = 2e-3 + i * 1e-3;
        const phase = time * (1 + i * 0.2);
        const amplitude = height * 0.15;
        for (let x = 0; x <= width; x += 10) {
          const y = centerY + Math.sin(x * frequency + phase) * amplitude + Math.sin(x * frequency * 2 + phase * 1.3) * (amplitude * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, id: "canvas-bg" });
};
var TopBar = ({ title }) => /* @__PURE__ */ jsxs("div", { className: "topbar anim-target", children: [
  /* @__PURE__ */ jsxs("div", { className: "kicker", children: [
    /* @__PURE__ */ jsx("span", { className: "dot" }),
    " ",
    title
  ] }),
  /* @__PURE__ */ jsx("div", { className: "logoPill", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: "https://tuneme.io/images/logo.png",
      alt: "TuneMe",
      style: { height: "32px" }
    }
  ) })
] });
var App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 9;
  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const touchStart = useRef(null);
  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStart.current.x - touchEndX;
    const diffY = touchStart.current.y - touchEndY;
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    touchStart.current = null;
  };
  const getSlideClass = (index) => {
    return currentSlide === index ? "slide active" : "slide";
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StunningBackground, { currentSlide }),
    /* @__PURE__ */ jsx("div", { className: "progress-bar", style: { width: `${(currentSlide + 1) / totalSlides * 100}%` } }),
    /* @__PURE__ */ jsx(ShareButton, {}),
    /* @__PURE__ */ jsxs("div", { className: "nav-controls", children: [
      /* @__PURE__ */ jsx("button", { className: "nav-btn", onClick: prevSlide, children: "\u2190" }),
      /* @__PURE__ */ jsx("button", { className: "nav-btn", onClick: nextSlide, children: "\u2192" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "deck-container",
        style: { transform: `translateX(-${currentSlide * 100}vw)` },
        onTouchStart,
        onTouchEnd,
        children: [
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(0), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[0][0], highIntensity: true }),
            /* @__PURE__ */ jsx(TopBar, { title: "Biomarker Engine" }),
            /* @__PURE__ */ jsx("div", { className: "grow", style: { alignItems: "center", textAlign: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "anim-target", style: { width: "100%", maxWidth: "1000px" }, children: [
              /* @__PURE__ */ jsxs("h1", { children: [
                "10 seconds of voice ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "emph", children: "\u2192 physiology." })
              ] }),
              /* @__PURE__ */ jsxs("p", { style: { marginTop: "24px", fontSize: "20px", maxWidth: "750px", lineHeight: "1.6", marginInline: "auto" }, children: [
                "TuneMe converts a short voice sample into a real-time signal of ",
                /* @__PURE__ */ jsx("b", { children: "stress" }),
                " and ",
                /* @__PURE__ */ jsx("b", { children: "autonomic balance" }),
                ", and delivers a personalized therapeutic response."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "stats-grid", children: [
                /* @__PURE__ */ jsxs("div", { style: { background: "linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)", border: "1px solid rgba(50,50,80,0.5)", borderRadius: "12px", padding: "16px", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "4px" }, children: "10s" }),
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "10px", color: "#8899aa", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Voice Check-in" })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { background: "linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)", border: "1px solid rgba(50,50,80,0.5)", borderRadius: "12px", padding: "16px", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "4px" }, children: "Real-time" }),
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "10px", color: "#8899aa", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Analysis" })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { background: "linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)", border: "1px solid rgba(50,50,80,0.5)", borderRadius: "12px", padding: "16px", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "4px" }, children: "No HW" }),
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "10px", color: "#8899aa", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Required" })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { background: "linear-gradient(180deg, rgba(20,20,40,0.8) 0%, rgba(10,10,20,0.9) 100%)", border: "1px solid rgba(50,50,80,0.5)", borderRadius: "12px", padding: "16px", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "4px" }, children: "Closed-loop" }),
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "10px", color: "#8899aa", textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Learning" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pillRow", style: { marginTop: "24px", justifyContent: "center" }, children: [
                /* @__PURE__ */ jsx("span", { className: "pill", style: { borderColor: "#333", background: "rgba(0,0,0,0.4)", color: "#aaa" }, children: "Voice Biomarkers" }),
                /* @__PURE__ */ jsx("span", { className: "pill", style: { borderColor: "#333", background: "rgba(0,0,0,0.4)", color: "#aaa" }, children: "Physiology" }),
                /* @__PURE__ */ jsx("span", { className: "pill", style: { borderColor: "#333", background: "rgba(0,0,0,0.4)", color: "#aaa" }, children: "Adaptive Therapy" }),
                /* @__PURE__ */ jsx("span", { className: "pill", style: { borderColor: "#333", background: "rgba(0,0,0,0.4)", color: "#aaa" }, children: "Data Advantage" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(1), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[1][0] }),
            /* @__PURE__ */ jsx(TopBar, { title: "The Problem" }),
            /* @__PURE__ */ jsxs("div", { className: "grow", children: [
              /* @__PURE__ */ jsxs("div", { className: "anim-target", children: [
                /* @__PURE__ */ jsxs("h2", { children: [
                  "Wearables measure. ",
                  /* @__PURE__ */ jsx("span", { style: { color: "var(--accent-pink)" }, children: "They don\u2019t fix." })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Hundreds of millions track sleep & stress daily, but most platforms stop at insights. The missing layer is ",
                  /* @__PURE__ */ jsx("b", { children: "real-time action" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "problem-grid anim-target", children: [
                /* @__PURE__ */ jsxs("div", { className: "card pain-card", children: [
                  /* @__PURE__ */ jsxs("div", { style: { marginBottom: "20px" }, children: [
                    /* @__PURE__ */ jsx("h3", { children: "The real pain" }),
                    /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "14px", margin: 0 }, children: "The problem is not awareness. It is overload. Too many sensors, too much data, and still no action." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "stats-2x2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "stat-item", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", style: { color: "#9ba4b5" }, children: "+30%" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "Increase in wearable ownership since 2020" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "stat-item", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", style: { color: "#9ba4b5" }, children: "80%" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "Of users do not act on health insights" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "stat-item", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", style: { color: "#9ba4b5" }, children: "1.5B" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "People suffer chronic stress globally" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "stat-item", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", style: { color: "#9ba4b5" }, children: "$1T" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "Lost productivity per year" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card unlock-card", children: [
                  /* @__PURE__ */ jsxs("h3", { children: [
                    "The unlock: ",
                    /* @__PURE__ */ jsx("span", { style: { color: "var(--accent-cyan)" }, children: "HRV validates outcomes." }),
                    " Voice drives action."
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "muted", children: "Measure the baseline (T0), apply therapy, then confirm a measurable physiological change (T1)." })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(2), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[2][0] }),
            /* @__PURE__ */ jsx(TopBar, { title: "Why Voice" }),
            /* @__PURE__ */ jsxs("div", { className: "grow", children: [
              /* @__PURE__ */ jsxs("div", { className: "anim-target", children: [
                /* @__PURE__ */ jsx("h2", { children: "Voice is a high-resolution physiological signal" }),
                /* @__PURE__ */ jsx("p", { children: "It delivers continuous insight without hardware or friction." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "anim-target", style: { display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px", width: "100%" }, children: [
                /* @__PURE__ */ jsxs("div", { className: "card", style: { textAlign: "center", padding: "30px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", style: { marginBottom: "10px", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: "12px" }, children: "UNIVERSAL" }),
                  /* @__PURE__ */ jsx("h3", { style: { fontSize: "24px", marginBottom: "8px" }, children: "Any smart device with a microphone" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { margin: 0 }, children: "Smartphones, laptops, tablets, wearables, and smart speakers. No extra hardware." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card", style: { textAlign: "center", padding: "30px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", style: { marginBottom: "10px", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: "12px" }, children: "INSTANT" }),
                  /* @__PURE__ */ jsx("h3", { style: { fontSize: "24px", marginBottom: "8px" }, children: "Seconds-to-signal" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { margin: 0 }, children: "Fast physiological analysis." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card", style: { textAlign: "center", padding: "30px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", style: { marginBottom: "10px", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: "12px" }, children: "CONTINUOUS" }),
                  /* @__PURE__ */ jsx("h3", { style: { fontSize: "24px", marginBottom: "8px" }, children: "Daily check-ins build a data advantage" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { margin: 0 }, children: "Outcome-linked voice data at scale is extremely hard to replicate." })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(3), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[3][0] }),
            /* @__PURE__ */ jsx(TopBar, { title: "Product" }),
            /* @__PURE__ */ jsxs("div", { className: "grow", children: [
              /* @__PURE__ */ jsxs("div", { className: "anim-target", style: { textAlign: "center", marginBottom: "100px" }, children: [
                /* @__PURE__ */ jsxs("h2", { children: [
                  "One Engine. ",
                  /* @__PURE__ */ jsx("span", { className: "emph2", children: "Multiple Surfaces." })
                ] }),
                /* @__PURE__ */ jsx("p", { style: { margin: "0 auto" }, children: "We are not just an app. We are the intelligence layer for digital health." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "steps anim-target", children: [
                /* @__PURE__ */ jsxs("div", { className: "step", children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", children: "Input" }),
                  /* @__PURE__ */ jsx("h3", { children: "Voice" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { marginBottom: "4px" }, children: "10-second sample" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "12px", opacity: 0.7, margin: 0 }, children: "Captures autonomic nervous system markers" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "arrow", children: "\u2192" }),
                /* @__PURE__ */ jsxs("div", { className: "step", style: { borderColor: "var(--accent-purple)", boxShadow: "0 0 30px rgba(112,0,255,0.2)" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", style: { color: "var(--accent-purple)" }, children: "Core" }),
                  /* @__PURE__ */ jsx("h3", { children: "AI Biomarkers" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { marginBottom: "4px" }, children: "Stress \u2022 Autonomic Balance" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "12px", opacity: 0.7, margin: 0 }, children: "Physiology-driven state detection" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "arrow", children: "\u2192" }),
                /* @__PURE__ */ jsxs("div", { className: "step", children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", children: "Output" }),
                  /* @__PURE__ */ jsx("h3", { children: "Action" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { marginBottom: "4px" }, children: "Personalized Therapy / API" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "12px", opacity: 0.7, margin: 0 }, children: "Non-invasive vagus nerve stimulation" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "twoEq anim-target", style: { marginTop: "60px" }, children: [
                /* @__PURE__ */ jsxs("div", { className: "card", children: [
                  /* @__PURE__ */ jsx("h3", { children: "Consumer App" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { marginBottom: "10px" }, children: "Immediate value + controlled data collection." }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "14px", marginBottom: "15px" }, children: "Audio-based stimulation targeting the vagus nerve to support relaxation, recovery, and sleep." }),
                  /* @__PURE__ */ jsxs("div", { className: "pillRow", children: [
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "CHECK-IN" }),
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "THERAPY" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card", children: [
                  /* @__PURE__ */ jsx("h3", { children: "SDK / API" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { marginBottom: "10px" }, children: "Licensing the analysis + stimulation layer to partners." }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "14px", marginBottom: "15px" }, children: "Physiology-based signals that enable vagus-aligned interventions across platforms." }),
                  /* @__PURE__ */ jsxs("div", { className: "pillRow", children: [
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "Stress Index" }),
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "State Change" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(4), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[4][0] }),
            /* @__PURE__ */ jsx(TopBar, { title: "Validation" }),
            /* @__PURE__ */ jsxs("div", { className: "grow center", children: [
              /* @__PURE__ */ jsxs("div", { className: "anim-target", style: { textAlign: "center", maxWidth: "900px", margin: "0 auto" }, children: [
                /* @__PURE__ */ jsx("h2", { children: "The Closed-Loop Advantage" }),
                /* @__PURE__ */ jsx("p", { children: "Therapy is not \u201Canother product\u201D, it\u2019s the controlled intervention that validates biomarkers and accelerates learning." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "steps anim-target", style: { maxWidth: "1000px", margin: "40px auto" }, children: [
                /* @__PURE__ */ jsxs("div", { className: "step", children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", children: "T-Zero" }),
                  /* @__PURE__ */ jsx("h3", { children: "Measure" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", children: "Voice Baseline" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "arrow", style: { color: "var(--accent-cyan)" }, children: "\u2192" }),
                /* @__PURE__ */ jsxs("div", { className: "step", style: { background: "rgba(0,240,255,0.05)", borderColor: "var(--accent-cyan)" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", children: "Action" }),
                  /* @__PURE__ */ jsx("h3", { children: "Intervene" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", children: "Audio Therapy" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "arrow", style: { color: "var(--accent-cyan)" }, children: "\u2192" }),
                /* @__PURE__ */ jsxs("div", { className: "step", children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", children: "T-One" }),
                  /* @__PURE__ */ jsx("h3", { children: "Verify" }),
                  /* @__PURE__ */ jsx("p", { className: "muted", children: "Biomarker Shift" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "card anim-target", style: { margin: "20px auto", maxWidth: "600px", textAlign: "center" }, children: /* @__PURE__ */ jsx("p", { className: "emph", children: '"If the physiological state changes and the biomarker moves with it, the biomarker is meaningful."' }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(5), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[5][0] }),
            /* @__PURE__ */ jsx(TopBar, { title: "Traction" }),
            /* @__PURE__ */ jsxs("div", { className: "grow", children: [
              /* @__PURE__ */ jsxs("div", { className: "anim-target", children: [
                /* @__PURE__ */ jsxs("h2", { children: [
                  "Clinical & Commercial ",
                  /* @__PURE__ */ jsx("span", { style: { color: "var(--accent-gold)" }, children: "Proof" })
                ] }),
                /* @__PURE__ */ jsx("p", { children: "Objective physiological outcomes, plus real distribution partners." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "twoEq anim-target", children: [
                /* @__PURE__ */ jsxs("div", { className: "card", children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", style: { color: "var(--accent-gold)" }, children: "Clinical Data" }),
                  /* @__PURE__ */ jsx("h3", { children: "RCT Results (N=50)" }),
                  /* @__PURE__ */ jsxs("div", { className: "kpis", children: [
                    /* @__PURE__ */ jsxs("div", { className: "kpi", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", children: "-100%" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "High Stress" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "kpi", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", children: "+262%" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "Resting State" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "muted", style: { marginTop: "20px" }, children: "Validated against Garmin objective stress measurement." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card", children: [
                  /* @__PURE__ */ jsx("div", { className: "tag", children: "Business" }),
                  /* @__PURE__ */ jsx("h3", { children: "Commercial" }),
                  /* @__PURE__ */ jsxs("div", { className: "kpis", style: { gridTemplateColumns: "1fr 1fr" }, children: [
                    /* @__PURE__ */ jsxs("div", { className: "kpi", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", children: "4000+" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "Users" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "kpi", children: [
                      /* @__PURE__ */ jsx("span", { className: "v", children: "$900K" }),
                      /* @__PURE__ */ jsx("span", { className: "l", children: "Raised" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { style: { marginTop: "20px" }, children: [
                    /* @__PURE__ */ jsx("div", { className: "pill", style: { display: "block", marginBottom: "8px", textAlign: "center", borderColor: "rgba(255,255,255,0.2)" }, children: "Signed: Isracard & Maccabi Club" }),
                    /* @__PURE__ */ jsx("div", { className: "pill", style: { display: "block", textAlign: "center", borderColor: "rgba(255,255,255,0.2)" }, children: "Pilot: Israeli Ministry of Defense" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "card anim-target", style: { marginTop: "40px", padding: "20px" }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "tag", children: "Defensibility" }),
                  " ",
                  /* @__PURE__ */ jsx("b", { children: "2 Patents Filed, 1 Approved" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "tag", children: "Asset" }),
                  " ",
                  /* @__PURE__ */ jsx("b", { children: "Outcome-Linked Voice Dataset" })
                ] })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(6), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[6][0] }),
            /* @__PURE__ */ jsx(TopBar, { title: "Strategy" }),
            /* @__PURE__ */ jsxs("div", { className: "grow", children: [
              /* @__PURE__ */ jsx("h2", { className: "anim-target", children: "Why Big Tech Cares" }),
              /* @__PURE__ */ jsxs("div", { className: "kpis anim-target", style: { gridTemplateColumns: "1fr 1fr 1fr", marginTop: "20px" }, children: [
                /* @__PURE__ */ jsxs("div", { className: "kpi", children: [
                  /* @__PURE__ */ jsx("span", { className: "v", children: "Zero HW" }),
                  /* @__PURE__ */ jsx("span", { className: "l", children: "No device dependency" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "kpi", children: [
                  /* @__PURE__ */ jsx("span", { className: "v", children: "API" }),
                  /* @__PURE__ */ jsx("span", { className: "l", children: "Licensable layer" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "kpi", children: [
                  /* @__PURE__ */ jsx("span", { className: "v", children: "Data" }),
                  /* @__PURE__ */ jsx("span", { className: "l", children: "Clinically linked" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "twoEq anim-target", style: { marginTop: "40px" }, children: [
                /* @__PURE__ */ jsxs("div", { className: "card", children: [
                  /* @__PURE__ */ jsx("h3", { children: "Monetization" }),
                  /* @__PURE__ */ jsxs("ul", { style: { listStyle: "none", padding: 0, margin: "15px 0 0 0", color: "var(--text-muted)", fontSize: "16px" }, children: [
                    /* @__PURE__ */ jsx("li", { style: { marginBottom: "10px" }, children: "\u2713 SDK Licensing (per user)" }),
                    /* @__PURE__ */ jsx("li", { style: { marginBottom: "10px" }, children: "\u2713 Enterprise Wellness (B2B2C)" }),
                    /* @__PURE__ */ jsx("li", { children: "\u2713 Consumer Subscription" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card", children: [
                  /* @__PURE__ */ jsx("h3", { children: "Targets" }),
                  /* @__PURE__ */ jsxs("div", { className: "pillRow", children: [
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "Health Platforms" }),
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "Mental Health Apps" }),
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "Sleep Apps" }),
                    /* @__PURE__ */ jsx("span", { className: "pill", children: "Voice Assistants" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: getSlideClass(7), children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[7][0] }),
            /* @__PURE__ */ jsx(TopBar, { title: "Team" }),
            /* @__PURE__ */ jsxs("div", { className: "grow", children: [
              /* @__PURE__ */ jsx("h2", { className: "anim-target", style: { marginBottom: "40px" }, children: "Built at the intersection of audio + medicine" }),
              /* @__PURE__ */ jsxs("div", { className: "team-grid anim-target", children: [
                /* @__PURE__ */ jsxs("div", { className: "team-card", children: [
                  /* @__PURE__ */ jsx("div", { className: "avatar", style: { width: 90, height: 90, flexShrink: 0, borderRadius: "50%", background: "#222", border: "2px solid rgba(255,255,255,0.1)", overflow: "hidden" }, children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: teamData.itai.image,
                      alt: teamData.itai.name,
                      style: { width: "100%", height: "100%", objectFit: "cover" }
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "tag", style: { marginBottom: "6px", fontSize: "10px", color: "#fff" }, children: teamData.itai.role }),
                    /* @__PURE__ */ jsx("h3", { style: { fontSize: "24px", marginBottom: "8px" }, children: teamData.itai.name }),
                    /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "14px", lineHeight: "1.4", margin: 0 }, children: teamData.itai.bio })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "team-card", children: [
                  /* @__PURE__ */ jsx("div", { className: "avatar", style: { width: 90, height: 90, flexShrink: 0, borderRadius: "50%", background: "#222", border: "2px solid rgba(255,255,255,0.1)", overflow: "hidden" }, children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: teamData.motti.image,
                      alt: teamData.motti.name,
                      style: { width: "100%", height: "100%", objectFit: "cover" }
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "tag", style: { marginBottom: "6px", fontSize: "10px", color: "#fff" }, children: teamData.motti.role }),
                    /* @__PURE__ */ jsx("h3", { style: { fontSize: "24px", marginBottom: "8px" }, children: teamData.motti.name }),
                    /* @__PURE__ */ jsx("p", { className: "muted", style: { fontSize: "14px", lineHeight: "1.4", margin: 0 }, children: teamData.motti.bio })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card anim-target", style: { marginTop: "40px", padding: "24px 30px", display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid var(--accent-purple)" }, children: [
                /* @__PURE__ */ jsx("h3", { style: { fontSize: "18px", margin: 0 }, children: "Advisors" }),
                /* @__PURE__ */ jsx("p", { className: "muted", style: { margin: 0, fontSize: "16px" }, children: "Prof. Gil Zalsman (Columbia University) \u2022 Dr. Samanta Dall Agnese (Sleep Medicine) \u2022 Maxime El Baz, Ph.D. (Neuroscience, Digital Health, AI)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: `${getSlideClass(8)} last-slide`, children: [
            /* @__PURE__ */ jsx(GlowOrb, { color: palettes[8][1], highIntensity: true }),
            /* @__PURE__ */ jsx(TopBar, { title: "TuneMe AI" }),
            /* @__PURE__ */ jsxs("div", { className: "grow", style: { alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", zIndex: 10 }, children: [
              /* @__PURE__ */ jsxs("div", { className: "anim-target", style: { marginBottom: "60px" }, children: [
                /* @__PURE__ */ jsxs("h1", { style: {
                  fontSize: "clamp(60px, 10vw, 150px)",
                  lineHeight: "0.9",
                  background: "linear-gradient(135deg, #fff 20%, var(--accent-cyan) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.04em"
                }, children: [
                  "Listen.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Analyze.",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { style: {
                    background: "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }, children: "Act." })
                ] }),
                /* @__PURE__ */ jsxs("p", { style: { margin: "30px auto 0", fontSize: "24px", color: "#fff", opacity: 0.8, maxWidth: "600px" }, children: [
                  "The world already has the sensors. ",
                  /* @__PURE__ */ jsx("br", {}),
                  "TuneMe delivers the rest."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "anim-target contact-grid-mobile", style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                width: "100%",
                maxWidth: "600px"
              }, children: [
                /* @__PURE__ */ jsxs("div", { className: "card", style: { padding: "30px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", borderColor: "var(--accent-purple)", background: "rgba(112,0,255,0.1)" }, children: [
                  /* @__PURE__ */ jsx("span", { className: "tag", style: { justifyContent: "center", color: "#fff" }, children: "Get in Touch" }),
                  /* @__PURE__ */ jsx("a", { href: "mailto:itai@tuneme.io", style: { color: "#fff", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }, children: "itai@tuneme.io" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "card", style: { padding: "30px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", borderColor: "var(--accent-cyan)", background: "rgba(0,240,255,0.1)" }, children: [
                  /* @__PURE__ */ jsx("span", { className: "tag", style: { justifyContent: "center", color: "#fff" }, children: "Visit Website" }),
                  /* @__PURE__ */ jsx("a", { href: "https://tuneme.io", target: "_blank", style: { color: "#fff", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }, children: "tuneme.io" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "anim-target", style: { marginTop: "40px", opacity: 0.5, fontSize: "12px", letterSpacing: "0.1em" }, children: "TUNEME AI \xA9 2026 \u2022 PROPRIETARY & CONFIDENTIAL" })
            ] })
          ] })
        ]
      }
    )
  ] });
};
var root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsx(App, {}));
