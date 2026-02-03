
import React from 'react';
import { SlideData } from '../types';

export const slides: SlideData[] = [
  {
    id: 1,
    kicker: "The Future of Health",
    title: "TuneMe: 10 seconds of voice → physiology.",
    subtitle: "We are building the first closed-loop AI engine that converts short voice samples into high-fidelity physiological biomarkers for stress and autonomic balance. We turn audio into a vital sign.",
    accent: "violet",
    kpis: [
      { value: "10s", label: "Voice check-in" },
      { value: "Real-time", label: "ANS Analysis" },
      { value: "No hardware", label: "Required" },
      { value: "Proprietary", label: "ML Models" }
    ],
    pills: ["Voice Biomarkers", "Physiology", "Adaptive Therapy", "Data Advantage"]
  },
  {
    id: 2,
    kicker: "The Problem",
    title: "The 'Insight-Action' Gap in Digital Health.",
    subtitle: "Hundreds of millions track sleep and stress daily via wearables, yet health outcomes remain stagnant. We have enough sensors; we lack immediate, effective interventions. Data without action is noise.",
    accent: "teal",
    kpis: [
      { value: "350M+", label: "Wearable Users" },
      { value: "82%", label: "Inaction Rate" },
      { value: "1.5B", label: "Stress Sufferers" },
      { value: "$1T+", label: "Global Cost" }
    ],
    pills: ["Data Overload", "Zero Feedback Loop", "Mental Health Crisis"]
  },
  {
    id: 3,
    kicker: "The Solution",
    title: "Turning Voice into a Vital Sign.",
    subtitle: "Voice is a physiological signal, not just a communication tool. Our AI maps subtle micro-oscillations in speech to the Autonomic Nervous System (ANS). Frictionless, objective, and ambient.",
    accent: "mint",
    kpis: [
      { value: "Universal", label: "Any Microphone" },
      { value: "Frictionless", label: "User Experience" },
      { value: "Objective", label: "Health Data" }
    ],
    pills: ["Microphone Ubiquity", "Autonomic Mapping", "Zero Latency"]
  },
  {
    id: 4,
    kicker: "Technology Deep-Dive",
    title: "Proprietary AI & Bio-Signal Analysis.",
    subtitle: "We analyze thousands of acoustic features to extract the 'Stress Signature' of the user, separating emotional sentiment from biological state.",
    accent: "cyan",
    content: React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" },
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h4', { className: "font-bold mb-2 text-teal-400" }, "Signal De-noising"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Isolating physiological vocal markers even in noisy, real-world environments using advanced DSP.")
      ),
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h4', { className: "font-bold mb-2 text-violet-400" }, "Neural Feature Extraction"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Mapping vocal tension and breath patterns to Sympathetic and Parasympathetic nervous system activity.")
      )
    )
  },
  {
    id: 5,
    kicker: "Closed Loop Advantage",
    title: "Measure. Intervene. Verify.",
    subtitle: "TuneMe doesn't just measure stress; it triggers an immediate adaptive audio therapy session and then re-measures to verify the physiological shift.",
    accent: "lime",
    content: React.createElement('div', { className: "flex flex-col gap-3 mt-4" },
      React.createElement('div', { className: "bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4" },
        React.createElement('div', { className: "w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center font-bold text-teal-400 text-sm" }, "01"),
        React.createElement('div', null,
          React.createElement('h4', { className: "font-bold text-sm" }, "T0: Initial Measure"),
          React.createElement('p', { className: "text-[11px] text-white/50" }, "User speaks for 10 seconds to establish current baseline.")
        )
      ),
      React.createElement('div', { className: "bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4" },
        React.createElement('div', { className: "w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center font-bold text-violet-400 text-sm" }, "02"),
        React.createElement('div', null,
          React.createElement('h4', { className: "font-bold text-sm" }, "Intervention"),
          React.createElement('p', { className: "text-[11px] text-white/50" }, "Personalized audio experience tailored to current stress level.")
        )
      ),
      React.createElement('div', { className: "bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4" },
        React.createElement('div', { className: "w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center font-bold text-rose-400 text-sm" }, "03"),
        React.createElement('div', null,
          React.createElement('h4', { className: "font-bold text-sm" }, "T1: Post-Measure"),
          React.createElement('p', { className: "text-[11px] text-white/50" }, "Verify the effectiveness of the therapy and update the user model.")
        )
      )
    )
  },
  {
    id: 6,
    kicker: "Product & Scale",
    title: "One AI Engine. Multiple Surfaces.",
    subtitle: "A scalable SaaS platform delivering high-fidelity physiological signals to consumers and enterprise partners via a unified health API and SDK.",
    accent: "coral",
    pills: ["B2C Mobile App", "B2B SDK", "Health API", "Wellness Enterprise"],
    content: React.createElement('div', { className: "flex flex-col lg:flex-row gap-4 mt-4" },
      React.createElement('div', { className: "flex-1 bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h3', { className: "text-lg font-bold mb-2 text-teal-400" }, "Consumer App"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Direct-to-consumer app for daily stress management and personalized bio-feedback therapy.")
      ),
      React.createElement('div', { className: "flex-1 bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h3', { className: "text-lg font-bold mb-2 text-violet-400" }, "Enterprise SDK"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Licensing our analysis engine to wearables, tele-health, and insurance platforms for risk mapping.")
      )
    )
  },
  {
    id: 7,
    kicker: "Traction & Validation",
    title: "Market Ready & Validated.",
    subtitle: "Moved from lab to life. Our clinical trials and commercial pilot programs show significant reduction in physiological stress indicators.",
    accent: "indigo",
    kpis: [
      { value: "4.5k", label: "Beta Users" },
      { value: "2", label: "Active Pilots" },
      { value: "92%", label: "Accuracy vs ECG" },
      { value: "2", label: "Patents Filed" }
    ],
    pills: ["Garmin Integration", "Wellness Centers", "Clinically Validated"]
  },
  {
    id: 8,
    kicker: "Market Opportunity",
    title: "Why Big Tech Needs Us.",
    subtitle: "The next frontier for Apple, Google, and Amazon is proactive health. A hardware-agnostic physiological layer scales across every device with a microphone.",
    accent: "cyan",
    content: React.createElement('div', { className: "space-y-3 mt-4 bg-white/5 p-6 rounded-3xl border border-white/10" },
      React.createElement('div', { className: "flex items-start gap-3" },
        React.createElement('div', { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" }),
        React.createElement('p', { className: "text-sm text-white/80" }, React.createElement('span', { className: "font-bold text-white" }, "Zero Marginal Cost:"), " No hardware manufacturing or global distribution logistics.")
      ),
      React.createElement('div', { className: "flex items-start gap-3" }),
      React.createElement('div', { className: "flex items-start gap-3" },
        React.createElement('div', { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" }),
        React.createElement('p', { className: "text-sm text-white/80" }, React.createElement('span', { className: "font-bold text-white" }, "Data Advantage:"), " Proprietary data linking vocal markers to real-world health outcomes.")
      )
    )
  },
  {
    id: 9,
    kicker: "The Team",
    title: "Experts in Audio & Medicine.",
    subtitle: "Our founders combine decades of experience in high-end audio signal processing and clinical rehabilitation medicine.",
    accent: "rose",
    content: React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4" },
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10 flex items-start gap-4" },
        React.createElement('div', { className: "w-12 h-12 rounded-full bg-indigo-500/20 flex-shrink-0 flex items-center justify-center font-bold text-indigo-300 border border-indigo-500/30" }, "IA"),
        React.createElement('div', null,
          React.createElement('h3', { className: "font-bold text-sm" }, "Itai Argaman, CEO"),
          React.createElement('p', { className: "text-[10px] text-white/50 mt-1" }, "Former Strategic Partnerships at Waves Audio. Led global collaborations with Google, Meta, and Qualcomm.")
        )
      ),
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10 flex items-start gap-4" },
        React.createElement('div', { className: "w-12 h-12 rounded-full bg-teal-500/20 flex-shrink-0 flex items-center justify-center font-bold text-teal-300 border border-teal-500/30" }, "MR"),
        React.createElement('div', null,
          React.createElement('h3', { className: "font-bold text-sm" }, "Motti Ratmansky, MD"),
          React.createElement('p', { className: "text-[10px] text-white/50 mt-1" }, "Director of Pain Rehab Clinic. Leading expert in ANS regulation and clinical health-tech validation.")
        )
      )
    )
  },
  {
    id: 10,
    kicker: "Join Us",
    title: "The standard for proactive health.",
    subtitle: "We are seeking $1.5M in seed funding to scale our data advantage, finalize clinical certifications, and launch our first major enterprise partnership.",
    accent: "gold",
    kpis: [
      { value: "Seed", label: "Stage" },
      { value: "$1.5M", label: "Target" },
      { value: "18mo", label: "Runway" }
    ],
    pills: ["itai@tuneme.io", "tuneme.io", "Tel Aviv, Israel"],
    content: React.createElement('div', { className: "mt-6 text-center lg:text-left" },
      React.createElement('a', { 
        href: "mailto:itai@tuneme.io",
        className: "inline-block bg-teal-400 text-slate-950 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
      }, "Get the full deck")
    )
  }
];
