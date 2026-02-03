
import React from 'react';

export interface KPI {
  value: string;
  label: string;
}

export interface SlideData {
  id: number;
  kicker: string;
  title: string;
  subtitle: string;
  accent: string;
  kpis?: KPI[];
  pills?: string[];
  content?: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
