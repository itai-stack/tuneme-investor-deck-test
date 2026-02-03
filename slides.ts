import React from 'react';
import { SlideData } from './types.ts';

export const slides: SlideData[] = [
  {
    id: 1,
    kicker: "The Future of Health",
    title: "TuneMe: 10 seconds of voice → physiology.",
    subtitle: "The first closed-loop AI engine that converts short voice samples into high-fidelity physiological biomarkers for stress and autonomic balance. Audio is the new vital sign.",
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
    subtitle: "Hundreds of millions track health data daily, yet outcomes remain stagnant. We have enough sensors; we lack immediate, effective interventions. Data without action is noise.",
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
    subtitle: "Voice is a physiological signal. Our AI maps subtle micro-oscillations in speech to the Autonomic Nervous System (ANS). Frictionless, objective, and ambient.",
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
    kicker: "Technology",
    title: "Proprietary AI & Bio-Signal Analysis.",
    subtitle: "We analyze thousands of acoustic features to extract the 'Stress Signature', separating emotional sentiment from biological state.",
    accent: "cyan",
    content: React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" },
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h4', { className: "font-bold mb-2 text-teal-400" }, "DSP Signal De-noising"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Isolating physiological vocal markers even in noisy environments.")
      ),
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h4', { className: "font-bold mb-2 text-violet-400" }, "Neural Feature Mapping"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Correlating vocal tension to Sympathetic/Parasympathetic activity.")
      )
    )
  },
  {
    id: 5,
    kicker: "Closed Loop",
    title: "Measure. Intervene. Verify.",
    subtitle: "TuneMe triggers immediate adaptive audio therapy and re-measures to verify the physiological shift in real-time.",
    accent: "lime",
    content: React.createElement('div', { className: "flex flex-col gap-3 mt-4" },
      React.createElement('div', { className: "bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4" },
        React.createElement('div', { className: "w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center font-bold text-teal-400 text-sm" }, "01"),
        React.createElement('div', null,
          React.createElement('h4', { className: "font-bold text-sm" }, "T0: Initial Measure"),
          React.createElement('p', { className: "text-[11px] text-white/50" }, "10-second voice sample.")
        )
      ),
      React.createElement('div', { className: "bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4" },
        React.createElement('div', { className: "w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center font-bold text-violet-400 text-sm" }, "02"),
        React.createElement('div', null,
          React.createElement('h4', { className: "font-bold text-sm" }, "Intervention"),
          React.createElement('p', { className: "text-[11px] text-white/50" }, "Adaptive audio bio-feedback.")
        )
      )
    )
  },
  {
    id: 6,
    kicker: "Ecosystem",
    title: "One AI Engine. Multiple Surfaces.",
    subtitle: "A scalable SaaS platform delivering high-fidelity physiological signals to consumers and enterprise partners.",
    accent: "coral",
    pills: ["B2C App", "B2B SDK", "Health API", "Wellness Enterprise"],
    content: React.createElement('div', { className: "flex flex-col lg:flex-row gap-4 mt-4" },
      React.createElement('div', { className: "flex-1 bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h3', { className: "text-lg font-bold mb-2 text-teal-400" }, "B2C Mobile"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Direct stress management app.")
      ),
      React.createElement('div', { className: "flex-1 bg-white/5 p-5 rounded-2xl border border-white/10" },
        React.createElement('h3', { className: "text-lg font-bold mb-2 text-violet-400" }, "B2B SDK"),
        React.createElement('p', { className: "text-xs text-white/60" }, "Licensing to wearables & tele-health.")
      )
    )
  },
  {
    id: 7,
    kicker: "Validation",
    title: "Market Ready & Clinically Validated.",
    subtitle: "Clinical trials show significant reduction in physiological stress indicators across diverse user groups.",
    accent: "indigo",
    kpis: [
      { value: "4.5k", label: "Beta Users" },
      { value: "2", label: "Active Pilots" },
      { value: "92%", label: "Accuracy" },
      { value: "2", label: "Patents" }
    ],
    pills: ["Garmin Integration", "Wellness Centers", "Clinically Proven"]
  },
  {
    id: 8,
    kicker: "Opportunity",
    title: "Why Big Tech Needs Us.",
    subtitle: "Hardware-agnostic physiological layer scales across every device with a microphone. Zero marginal cost.",
    accent: "cyan",
    content: React.createElement('div', { className: "space-y-3 mt-4 bg-white/5 p-6 rounded-3xl border border-white/10" },
      React.createElement('div', { className: "flex items-start gap-3" },
        React.createElement('div', { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" }),
        React.createElement('p', { className: "text-sm text-white/80" }, React.createElement('span', { className: "font-bold text-white" }, "Retention:"), " Frictionless measurement leads to higher compliance.")
      ),
      React.createElement('div', { className: "flex items-start gap-3" },
        React.createElement('div', { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" }),
        React.createElement('p', { className: "text-sm text-white/80" }, React.createElement('span', { className: "font-bold text-white" }, "Data Moat:"), " Linking vocal patterns to real health outcomes.")
      )
    )
  },
  {
    id: 9,
    kicker: "The Team",
    title: "Experts in Audio & Medicine.",
    subtitle: "Combining decades of experience in signal processing and clinical rehabilitation medicine.",
    accent: "rose",
    content: React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4" },
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10 flex items-start gap-4" },
        React.createElement('div', null,
          React.createElement('h3', { className: "font-bold text-sm" }, "Itai Argaman, CEO"),
          React.createElement('p', { className: "text-[10px] text-white/50 mt-1" }, "Former Strategic Partnerships at Waves Audio.")
        )
      ),
      React.createElement('div', { className: "bg-white/5 p-5 rounded-2xl border border-white/10 flex items-start gap-4" },
        React.createElement('div', null,
          React.createElement('h3', { className: "font-bold text-sm" }, "Motti Ratmansky, MD"),
          React.createElement('p', { className: "text-[10px] text-white/50 mt-1" }, "Director of Pain Rehab Clinic.")
        )
      )
    )
  },
  {
    id: 10,
    kicker: "Contact",
    title: "Join the Future of Health.",
    subtitle: "We are seeking $1.5M in seed funding to finalize clinical certifications and launch enterprise partnerships.",
    accent: "gold",
    kpis: [
      { value: "Seed", label: "Round" },
      { value: "$1.5M", label: "Target" },
      { value: "18mo", label: "Runway" }
    ],
    pills: ["itai@tuneme.io", "tuneme.io", "Tel Aviv"],
    content: React.createElement('div', { className: "mt-6" },
      React.createElement('a', { 
        href: "mailto:itai@tuneme.io",
        className: "inline-block bg-teal-400 text-slate-950 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs"
      }, "Get the full deck")
    )
  }
];