'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Instagram, ArrowRight, Menu, X, Cpu, Layers, Terminal, Sparkles, Database, GitBranch, Shield, Zap, Laptop, Smartphone, Check, FileText, Lightbulb, Compass, Code, FlaskConical, Rocket, Mail, MapPin, Calendar, Twitter } from 'lucide-react';
import Chatbot from './components/Chatbot';

interface Skill {
  name: string;
  percentage: number;
  description: string;
  projectsBuilt: number;
  experience: string;
  favoriteUse: string;
  icon: React.ReactNode;
}

const skillsLeftList: Skill[] = [
  {
    name: 'React',
    percentage: 95,
    description: 'Component architecture, state managers, hydration optimization, and fast fiber trees.',
    projectsBuilt: 24,
    experience: '3+ Years',
    favoriteUse: 'Highly-interactive application dashboards',
    icon: (
      <svg className="h-8 w-8 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2 C18 2 18 22 12 22 C6 22 6 2 12 2 Z" transform="rotate(30 12 12)" />
        <path d="M12 2 C18 2 18 22 12 22 C6 22 6 2 12 2 Z" transform="rotate(90 12 12)" />
        <path d="M12 2 C18 2 18 22 12 22 C6 22 6 2 12 2 Z" transform="rotate(150 12 12)" />
      </svg>
    )
  },
  {
    name: 'Next.js',
    percentage: 92,
    description: 'Server actions, static-site generation, app router routing, and middleware caching.',
    projectsBuilt: 18,
    experience: '2.5 Years',
    favoriteUse: 'Search-engine optimized and dynamic full-stack apps',
    icon: (
      <svg className="h-8 w-8 text-white bg-black rounded-full p-1 border border-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 18.5 L14.5 4 L16.5 4 L21 20 L18 20 L14.5 13 L8 20 L3 20" strokeLinejoin="round" fill="currentColor" />
        <circle cx="14.5" cy="10" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'TypeScript',
    percentage: 90,
    description: 'Strong static typing, interface contracts, template literals, and generic structures.',
    projectsBuilt: 28,
    experience: '3+ Years',
    favoriteUse: 'Architecting fully type-safe API gateways and models',
    icon: (
      <div className="flex h-8 w-8 items-center justify-center rounded bg-[#3178c6] text-[11px] font-black text-white select-none">
        TS
      </div>
    )
  },
  {
    name: 'JavaScript',
    percentage: 92,
    description: 'Asynchronous event patterns, functional scopes, ESNext generators, and memory specs.',
    projectsBuilt: 32,
    experience: '4+ Years',
    favoriteUse: 'Bespoke complex client-side calculations and canvas physics',
    icon: (
      <div className="flex h-8 w-8 items-center justify-center rounded bg-[#f7df1e] text-[11px] font-black text-black select-none">
        JS
      </div>
    )
  },
  {
    name: 'HTML5',
    percentage: 95,
    description: 'Semantic tags, deep search-engine optimization, accessible trees, and canvas nodes.',
    projectsBuilt: 38,
    experience: '4+ Years',
    favoriteUse: 'Accessible, clean, structure-validated screen hierarchies',
    icon: (
      <svg className="h-8 w-8 text-[#e34f26]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 22 L0 0 L24 0 L22.5 22 L12 24 Z" />
        <path d="M12 21.8 L19.8 19.8 L21 2 L12 2 Z" fill="#f06529" />
        <path d="M12 5 L8 5 L8.5 10 L12 10 L12 14 L8.8 14 L8.6 11.5 L6 11.5 L6.4 16.5 L12 16.5 Z" fill="white" />
      </svg>
    )
  },
  {
    name: 'CSS3',
    percentage: 90,
    description: 'Dynamic layouts, complex matrix transitions, keyframe systems, and variable styles.',
    projectsBuilt: 40,
    experience: '4+ Years',
    favoriteUse: 'Crafting responsive user flows and page transitions',
    icon: (
      <svg className="h-8 w-8 text-[#1572b6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 22 L0 0 L24 0 L22.5 22 L12 24 Z" />
        <path d="M12 21.8 L19.8 19.8 L21 2 L12 2 Z" fill="#29abe2" />
        <path d="M12 5 L8 5 L8.5 10 L12 10 L12 14 L8.8 14 L8.6 11.5 L6 11.5 L6.4 16.5 L12 16.5 Z" fill="white" />
      </svg>
    )
  }
];

const skillsRightList: Skill[] = [
  {
    name: 'Tailwind CSS',
    percentage: 95,
    description: 'Utility classes, custom design systems, custom animations, and responsive structures.',
    projectsBuilt: 30,
    experience: '3 Years',
    favoriteUse: 'Styling high-fidelity components and complex responsive layouts',
    icon: (
      <svg className="h-8 w-8 text-[#38bdf8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3 C6 3 2 8 2 12 C2 16 6 21 12 21 C18 21 22 16 22 12 C22 8 18 3 12 3 Z" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    percentage: 88,
    description: 'Asynchronous event engines, RESTful web sockets, parallel tasks, and IO operations.',
    projectsBuilt: 20,
    experience: '3+ Years',
    favoriteUse: 'Highly-performant server gateways and background queues',
    icon: (
      <svg className="h-8 w-8 text-[#339933]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L3 7 L3 17 L12 22 L21 17 L21 7 L12 2 Z" />
        <path d="M12 4 L19 8 L19 16 L12 20 L5 16 L5 8 L12 4 Z" fill="#66cc33" />
      </svg>
    )
  },
  {
    name: 'Express',
    percentage: 85,
    description: 'Middleware routers, secure endpoint managers, rate controllers, and session tokens.',
    projectsBuilt: 16,
    experience: '3 Years',
    favoriteUse: 'Structuring robust backend service controllers and endpoints',
    icon: (
      <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-800 text-xs font-mono font-bold text-white border border-zinc-700">
        ex
      </div>
    )
  },
  {
    name: 'MongoDB',
    percentage: 82,
    description: 'JSON document schemas, aggregation structures, fast clusters, and search nodes.',
    projectsBuilt: 14,
    experience: '2 Years',
    favoriteUse: 'Unstructured user logs and high-read database structures',
    icon: (
      <svg className="h-8 w-8 text-[#47a248]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5 C12 1.5 8 8 8 13.5 C8 17.5 10 20.5 12 22.5 C14 20.5 16 17.5 16 13.5 C16 8 12 1.5 12 1.5 Z" />
      </svg>
    )
  },
  {
    name: 'Git & GitHub',
    percentage: 90,
    description: 'Cherry-picks, advanced branch rebasing, hooks, and streamlined workflows.',
    projectsBuilt: 45,
    experience: '4+ Years',
    favoriteUse: 'Managing parallel features and team pipelines',
    icon: (
      <svg className="h-8 w-8 text-[#f05032]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.6 11.4 L12.6 1.4 C11.8 .6 10.5 .6 9.7 1.4 L1.4 9.7 C.6 10.5 .6 11.8 1.4 12.6 L11.4 22.6 C12.2 23.4 13.5 23.4 14.3 22.6 L22.6 14.3 C23.4 13.5 23.4 12.2 22.6 11.4 Z M13.5 18 L13.5 13.5 C13.5 13.2 13.2 13 13 13 L10.5 13 C10.2 13 10 13.2 10 13.5 L10 18 L7.5 18 L7.5 6 L10 6 L10 10.5 C10 10.8 10.2 11 10.5 11 L13 11 C13.2 11 13.5 10.8 13.5 10.5 L13.5 6 L16 6 L16 18 Z" />
      </svg>
    )
  },
  {
    name: 'AI APIs',
    percentage: 88,
    description: 'Structured prompt engineering, context management, semantic caching, and LLMs.',
    projectsBuilt: 12,
    experience: '2+ Years',
    favoriteUse: 'Developing responsive and intelligent software agents',
    icon: (
      <svg className="h-8 w-8 text-[#3b6cff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12 M5 5 L8 8 M16 16 L19 19 M5 19 L8 16 M16 8 L19 5" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
    )
  }
];

interface ProjectType {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  featured: boolean;
  tech: string[];
  metrics: { label: string; value: string }[];
  liveUrl: string;
  githubUrl: string;
  caseStudyUrl: string;
  mockupType: 'analytics' | 'commerce' | 'editor';
  glowColor: string;
}

const projectsList: ProjectType[] = [
  {
    id: 'zenith-analytics',
    year: '2026',
    title: 'Zenith Cloud Analytics',
    subtitle: 'Enterprise Telemetry Dashboard',
    description: 'An enterprise-grade cloud telemetry engine providing real-time log ingestion, high-frequency chart updates, and automated anomaly mapping using sub-second metrics processing pipelines.',
    featured: true,
    tech: ['React', 'Next.js', 'Go', 'InfluxDB', 'Tailwind', 'D3.js'],
    metrics: [
      { label: 'Latency', value: '14ms' },
      { label: 'Performance Gain', value: '+55%' },
      { label: 'Lighthouse Score', value: '99' },
      { label: 'SEO Optimization', value: '100%' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    mockupType: 'analytics',
    glowColor: 'from-blue-600/20 to-cyan-500/10'
  },
  {
    id: 'nova-commerce',
    year: '2025',
    title: 'Nova Commerce Protocol',
    subtitle: 'Headless Decentralized Suite',
    description: 'A cutting-edge headless e-commerce store utilizing edge-cached static pages, real-time product inventories, decentralized Stripe invoice terminals, and predictive user cart models.',
    featured: false,
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
    metrics: [
      { label: 'Page Speed', value: '0.4s' },
      { label: 'Conversion', value: '+40%' },
      { label: 'Lighthouse Score', value: '98' },
      { label: 'SEO Optimization', value: '98%' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    mockupType: 'commerce',
    glowColor: 'from-indigo-600/20 to-purple-500/10'
  },
  {
    id: 'scribe-ai',
    year: '2024',
    title: 'Scribe AI Engine',
    subtitle: 'Collaborative Intelligent Workspace',
    description: 'An AI-powered document workspace with Markdown editing, real-time peer-to-peer multiplayer cursor drawing, semantic folder trees, and deep context summarization through Gemini AI integration.',
    featured: false,
    tech: ['React', 'Next.js', 'Gemini API', 'WebSocket', 'SQLite', 'Framer Motion'],
    metrics: [
      { label: 'Productivity', value: '+120%' },
      { label: 'Sync Latency', value: '45ms' },
      { label: 'Lighthouse Score', value: '96' },
      { label: 'SEO Optimization', value: '95%' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    mockupType: 'editor',
    glowColor: 'from-purple-600/20 to-pink-500/10'
  }
];

function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-300, 300], [8, -8]);
  const rotateY = useTransform(x, [-300, 300], [-8, 8]);
  
  const springConfig = { stiffness: 100, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  const floatX = useTransform(x, [-300, 300], [-10, 10]);
  const floatY = useTransform(y, [-300, 300], [-10, 10]);
  const springFloatX = useSpring(floatX, springConfig);
  const springFloatY = useSpring(floatY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isEven = index % 2 === 0;

  const renderMockup = () => {
    switch (project.mockupType) {
      case 'analytics':
        return (
          <div className="w-full h-full bg-[#0d0e12] rounded-2xl border border-zinc-800/80 p-3 overflow-hidden flex flex-col shadow-2xl relative select-none">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              </div>
              <div className="bg-[#16171d] rounded px-3 py-0.5 text-[9px] font-mono text-zinc-500 w-32 text-center truncate border border-zinc-900">
                zenith.fahad.dev
              </div>
              <div className="w-6" />
            </div>

            <div className="flex flex-1 gap-2 overflow-hidden text-[10px]">
              <div className="w-14 border-r border-zinc-900 flex flex-col gap-1.5 pr-2 py-0.5">
                <div className="w-full h-3 bg-blue-600/20 rounded border border-blue-500/25 flex items-center px-1 font-mono text-[7px] font-bold text-blue-400">CORE</div>
                <div className="w-full h-2.5 bg-zinc-900 rounded opacity-60" />
                <div className="w-full h-2.5 bg-zinc-900 rounded opacity-60" />
              </div>

              <div className="flex-1 flex flex-col gap-2 py-0.5">
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="bg-zinc-900/60 border border-zinc-800/60 p-1 rounded">
                    <div className="text-[7px] text-zinc-500 font-mono">FLOW</div>
                    <div className="font-bold text-white text-[9px] mt-0.5">142k/s</div>
                  </div>
                  <div className="bg-zinc-900/60 border border-zinc-800/60 p-1 rounded">
                    <div className="text-[7px] text-zinc-500 font-mono">LATENCY</div>
                    <div className="font-bold text-green-400 text-[9px] mt-0.5">14ms</div>
                  </div>
                  <div className="bg-zinc-900/60 border border-zinc-800/60 p-1 rounded">
                    <div className="text-[7px] text-zinc-500 font-mono">CPU</div>
                    <div className="font-bold text-orange-400 text-[9px] mt-0.5">38%</div>
                  </div>
                </div>

                <div className="flex-1 min-h-[60px] bg-zinc-950 rounded border border-zinc-900 p-1 flex flex-col justify-between relative overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full p-1" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="#1c1c22" strokeWidth="0.5" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#1c1c22" strokeWidth="0.5" />
                    <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="#1c1c22" strokeWidth="0.5" />
                    <path d="M 0,40 Q 20,15 40,35 T 80,10 T 100,22" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                    <path d="M 0,45 Q 15,25 35,38 T 75,15 T 100,12" fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="1 1" />
                  </svg>
                  <div className="flex justify-between items-center text-[6px] font-mono text-zinc-600 z-10 select-none w-full">
                    <span>LIVE_CORE</span>
                    <span className="flex items-center gap-0.5"><span className="w-1 h-1 bg-blue-500 rounded-full animate-ping" /> TELEMETRY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'commerce':
        return (
          <div className="w-full h-full bg-[#fcfcfb] rounded-2xl border border-zinc-200/80 p-3 overflow-hidden flex flex-col shadow-2xl relative select-none">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-2">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              </div>
              <div className="bg-zinc-100 rounded px-3 py-0.5 text-[9px] font-mono text-zinc-400 w-32 text-center truncate border border-zinc-200">
                nova.fahad.dev
              </div>
              <div className="w-6" />
            </div>

            <div className="flex flex-1 gap-2 overflow-hidden text-[10px] text-zinc-800">
              <div className="flex-1 grid grid-cols-2 gap-1.5">
                <div className="bg-white border border-zinc-200 rounded p-1 flex flex-col justify-between">
                  <div className="w-full h-11 bg-zinc-50 rounded flex items-center justify-center relative overflow-hidden">
                    <svg className="w-6 h-6 text-indigo-500 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                    </svg>
                  </div>
                  <div className="mt-0.5">
                    <div className="font-extrabold text-[8px] truncate">Quantum Unit</div>
                    <div className="text-[7.5px] text-zinc-400">$299</div>
                  </div>
                </div>
                <div className="bg-white border border-zinc-200 rounded p-1 flex flex-col justify-between">
                  <div className="w-full h-11 bg-zinc-50 rounded flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M6 8h.01M10 8h.01M7 14h10" />
                    </svg>
                  </div>
                  <div className="mt-0.5">
                    <div className="font-extrabold text-[8px] truncate">S3 Deck</div>
                    <div className="text-[7.5px] text-zinc-400">$149</div>
                  </div>
                </div>
              </div>

              <div className="w-20 border-l border-zinc-200 pl-2 flex flex-col justify-between py-0.5">
                <div>
                  <div className="font-black text-[8px] text-zinc-900 border-b border-zinc-200 pb-0.5 mb-1 tracking-wider uppercase">Cart</div>
                  <div className="flex justify-between text-[7px] text-zinc-400">
                    <span>Total</span>
                    <span className="font-bold text-zinc-700">$448.00</span>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded px-1 py-0.2 text-[6.5px] text-green-700 mt-1 flex justify-between">
                    <span>CODE</span>
                    <span>-10%</span>
                  </div>
                </div>
                <div className="w-full py-0.5 rounded bg-indigo-600 text-white font-bold text-[7px] text-center flex items-center justify-center gap-0.5 shadow-sm">
                  <Check className="h-1.5 w-1.5" /> Pay
                </div>
              </div>
            </div>
          </div>
        );
      case 'editor':
        return (
          <div className="w-full h-full bg-[#fbfbfc] rounded-2xl border border-zinc-200/80 p-3 overflow-hidden flex flex-col shadow-2xl relative select-none">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-2">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              </div>
              <div className="bg-zinc-100 rounded px-3 py-0.5 text-[9px] font-mono text-zinc-400 w-32 text-center truncate border border-zinc-200">
                scribe.fahad.dev
              </div>
              <div className="w-6" />
            </div>

            <div className="flex flex-1 gap-2 overflow-hidden text-[10px] text-zinc-800">
              <div className="w-16 border-r border-zinc-200 pr-1 py-0.5 flex flex-col gap-1">
                <span className="text-[6.5px] font-bold text-zinc-400 uppercase tracking-widest">Docs</span>
                <div className="w-full h-3 bg-purple-50 text-purple-700 rounded border border-purple-200 flex items-center px-1 font-semibold text-[7.5px] truncate">
                  Notes.md
                </div>
                <div className="w-full h-3 bg-zinc-50 rounded flex items-center px-1 font-semibold text-[7.5px] text-zinc-400 truncate">
                  Env.local
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[9px] text-zinc-900">Notes.md</span>
                    <span className="w-3 h-3 rounded-full bg-blue-500 text-[5px] text-white flex items-center justify-center font-bold">FA</span>
                  </div>
                  <div className="h-[1px] bg-zinc-100" />
                  <div className="text-[7.5px] text-zinc-500 font-sans leading-relaxed space-y-0.5">
                    <p className="font-bold text-zinc-800">## Scribe AI Release</p>
                    <p>1. Decreased sync overhead to 45ms using binary protocol.</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-150 p-1 rounded relative overflow-hidden mt-1.5">
                  <div className="flex items-center gap-0.5 text-purple-700 font-extrabold text-[7.5px] mb-0.5">
                    <Sparkles className="h-1.5 w-1.5 text-purple-600" />
                    <span>GEMINI SUMMARY</span>
                  </div>
                  <p className="text-zinc-600 text-[7px] italic leading-tight">
                    &ldquo;Sync live; local state stored with sub-45ms updates.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMobileMockup = () => {
    switch (project.mockupType) {
      case 'analytics':
        return (
          <div className="absolute bottom-[-10px] right-[-10px] z-20 w-[80px] h-[140px] sm:w-[95px] sm:h-[170px] rounded-[16px] bg-[#0c0d0f] p-1 border-[2.5px] border-zinc-800 shadow-xl overflow-hidden flex flex-col justify-between pointer-events-none select-none">
            <div className="w-8 h-1.5 bg-zinc-800 rounded-full mx-auto mb-1" />
            <div className="flex-1 bg-[#101114] rounded-lg p-1 text-[6.5px] flex flex-col gap-1 justify-between">
              <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-900 pb-0.5">
                <span className="font-bold font-mono">FLOW_SYS</span>
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="bg-zinc-900 p-0.5 rounded font-bold text-center text-white text-[7.5px] mt-0.5">
                99% OK
              </div>
              <div className="flex-1 min-h-[30px] border border-zinc-900 rounded bg-zinc-950 p-0.5 flex items-end">
                <svg className="w-full h-6" viewBox="0 0 50 30" preserveAspectRatio="none">
                  <path d="M 0,22 Q 15,8 30,18 T 50,4" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="text-[5px] text-zinc-600 text-center uppercase tracking-widest font-mono">SYS_OK</span>
            </div>
          </div>
        );
      case 'commerce':
        return (
          <div className="absolute bottom-[-10px] right-[-10px] z-20 w-[80px] h-[140px] sm:w-[95px] sm:h-[170px] rounded-[16px] bg-zinc-900 p-1 border-[2.5px] border-zinc-700 shadow-xl overflow-hidden flex flex-col justify-between pointer-events-none select-none">
            <div className="w-8 h-1.5 bg-zinc-700 rounded-full mx-auto mb-1" />
            <div className="flex-1 bg-white rounded-lg p-1 flex flex-col justify-between text-zinc-800">
              <div>
                <span className="font-extrabold text-[7.5px] text-indigo-600 uppercase tracking-widest">Receipt</span>
                <div className="border-t border-zinc-100 pt-0.5 space-y-0.5 mt-0.5">
                  <div className="flex justify-between text-[6.5px] font-medium">
                    <span>S3 Deck</span>
                    <span>$149</span>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 border border-zinc-150 p-0.5 rounded flex flex-col items-center gap-0.2 mt-1">
                <span className="text-[5px] text-zinc-400">VIA STRIPE</span>
                <span className="font-black text-zinc-900 text-[8px]">$134.10</span>
              </div>
            </div>
          </div>
        );
      case 'editor':
        return (
          <div className="absolute bottom-[-10px] right-[-10px] z-20 w-[80px] h-[140px] sm:w-[95px] sm:h-[170px] rounded-[16px] bg-zinc-900 p-1 border-[2.5px] border-zinc-700 shadow-xl overflow-hidden flex flex-col justify-between pointer-events-none select-none">
            <div className="w-8 h-1.5 bg-zinc-700 rounded-full mx-auto mb-1" />
            <div className="flex-1 bg-zinc-50 rounded-lg p-1 flex flex-col justify-between text-zinc-800 text-[6px]">
              <div className="space-y-0.5">
                <div className="flex justify-between items-center bg-white border border-zinc-150 p-0.5 rounded">
                  <span className="font-bold">Active user</span>
                  <span className="w-1 h-1 rounded-full bg-orange-400" />
                </div>
              </div>
              <div className="bg-purple-100/60 border border-purple-150 p-0.5 rounded mt-1">
                <div className="font-black text-[6px] text-purple-700">MULTIPLAYER</div>
                <span className="text-[5px] text-purple-500 font-mono tracking-widest">ONLINE SYNC</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      id={`project-${project.year}`}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-12 sm:py-20 border-b border-zinc-100/80 last:border-b-0"
    >
      {/* PREVIEW CONTAINER (COL SPAN 7) */}
      <div 
        className={`lg:col-span-7 flex justify-center items-center relative ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
      >
        {/* Hover backdrop glow accent */}
        <div className={`absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr ${project.glowColor} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

        {/* Dynamic 3D Tilt Wrapper */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX: springRotateX,
            rotateY: springRotateY,
          }}
          className="relative w-full max-w-[440px] aspect-[4/3] rounded-2xl bg-zinc-50 border border-zinc-200/50 p-1.5 shadow-xl hover:shadow-2xl hover:border-zinc-300/60 transition-all duration-300 group"
        >
          {/* Main Browser Mockup Mock screen rendering */}
          {renderMockup()}

          {/* Overlapping Device Mobile mockup */}
          <motion.div
            style={{
              translateZ: 30,
              x: springFloatX,
              y: springFloatY,
            }}
            className="absolute bottom-[-10px] right-[-10px] z-20 pointer-events-none"
          >
            {renderMobileMockup()}
          </motion.div>

          {/* Floating Lighthouse / Stats UI Element (Parallax) */}
          <motion.div
            style={{
              translateZ: 50,
              x: useTransform(x, [-300, 300], [15, -15]),
              y: useTransform(y, [-300, 300], [15, -15]),
            }}
            className="absolute top-[-15px] left-[-15px] z-25 bg-white/80 backdrop-blur-md rounded-xl border border-zinc-200/60 p-2 shadow-lg flex items-center gap-2 pointer-events-none select-none text-[10px] font-semibold text-zinc-800"
          >
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center font-bold text-white text-[8px] tracking-tighter">99</div>
            <div className="flex flex-col">
              <span className="font-bold">Lighthouse Core</span>
              <span className="text-[7.5px] text-zinc-400 font-mono">METRICS_SYS: PASS</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* DETAIL CONTENT COLUMN (COL SPAN 5) */}
      <div className={`lg:col-span-5 flex flex-col items-start ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
        
        {/* Timeline badge / Featured highlight */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200/60 text-[10px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest">
            {project.year}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-black text-blue-600 animate-pulse uppercase tracking-widest">
              <Sparkles className="h-2.5 w-2.5" /> Featured Project
            </span>
          )}
        </div>

        {/* Project Name & Subtitle */}
        <h3 className="font-display text-3xl sm:text-4xl font-black text-[#1c1d20] leading-none tracking-tight">
          {project.title}
        </h3>
        <span className="font-sans text-[11px] font-extrabold text-[#3b82f6] uppercase tracking-widest mt-1.5 block">
          {project.subtitle}
        </span>

        {/* Project Description */}
        <p className="font-sans text-sm sm:text-[14.5px] leading-relaxed text-zinc-500 mt-4 max-w-md">
          {project.description}
        </p>

        {/* Statistic Performance Badges */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-md mt-6 select-none">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-zinc-50 border border-zinc-200/50 rounded-xl p-2.5 flex flex-col hover:bg-white hover:border-[#3b82f6]/20 transition-all shadow-sm">
              <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest">{metric.label}</span>
              <span className="text-zinc-800 font-display font-extrabold text-[14.5px] leading-none mt-1">{metric.value}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills (Light up dynamically on group hover!) */}
        <div className="flex flex-wrap gap-1.5 mt-6 w-full max-w-md select-none">
          {project.tech.map((techItem) => (
            <span 
              key={techItem} 
              className="px-2.5 py-0.8 rounded-md bg-zinc-100 border border-zinc-200/40 text-[10px] font-bold text-zinc-600 hover:border-blue-300/50 hover:bg-blue-50/20 hover:text-blue-600 transition-all duration-200"
            >
              {techItem}
            </span>
          ))}
        </div>

        {/* Buttons Links */}
        <div className="flex flex-wrap gap-4 items-center mt-8 w-full">
          <a 
            href={project.liveUrl}
            className="group flex items-center gap-1.5 rounded-lg bg-[#1c1d20] px-4.5 py-2.2 text-[12.5px] font-extrabold text-white transition-all duration-300 hover:bg-[#3b82f6] hover:shadow-lg hover:shadow-blue-500/10"
          >
            {"Live Demo"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          
          <a 
            href={project.githubUrl}
            className="group flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-4.5 py-2.2 text-[12.5px] font-extrabold text-zinc-700 transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300"
          >
            <Github className="h-3.5 w-3.5" />
            {"GitHub"}
          </a>

          <a 
            href={project.caseStudyUrl}
            className="group flex items-center gap-1 text-[12.5px] font-black text-[#3b82f6] transition-all hover:text-[#2563eb]"
          >
            {"Case Study"}
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

      </div>
    </motion.div>
  );
}

const floatingParticles = [
  { left: '10%', top: '20%', size: 'w-2 h-2', delay: 0 },
  { left: '30%', top: '65%', size: 'w-3 h-3', delay: 1.5 },
  { left: '50%', top: '15%', size: 'w-1.5 h-1.5', delay: 0.5 },
  { left: '70%', top: '80%', size: 'w-2.5 h-2.5', delay: 2 },
  { left: '85%', top: '35%', size: 'w-2 h-2', delay: 1 },
  { left: '95%', top: '70%', size: 'w-1.5 h-1.5', delay: 2.5 }
];

const milestones = [
  {
    phase: "01",
    title: "Discovery",
    description: "Understanding your vision, business goals, and target audience through deep-dive analysis, user research, and technical feasibility scoping.",
    icon: Lightbulb,
    color: "text-amber-500",
    bgColor: "bg-amber-50/80",
    borderColor: "border-amber-100",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  {
    phase: "02",
    title: "Planning",
    description: "Architecting the perfect solution with structured wireframes, intuitive user journeys, custom data schemas, and selecting the optimal technology stack.",
    icon: Compass,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50/80",
    borderColor: "border-cyan-100",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  {
    phase: "03",
    title: "Development",
    description: "Writing clean, type-safe, production-grade code with fast-loading database operations, highly robust state models, and custom interactive behaviors.",
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-50/80",
    borderColor: "border-blue-100",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    phase: "04",
    title: "Testing",
    description: "Ensuring flawless functionality through meticulous test scenarios, cross-browser compatibility checks, and sub-second performance audits.",
    icon: FlaskConical,
    color: "text-purple-500",
    bgColor: "bg-purple-50/80",
    borderColor: "border-purple-100",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    phase: "05",
    title: "Launch",
    description: "Seamless deployment to secure serverless cloud infrastructures, complete with real-time performance logging, automated backups, and detailed analytics.",
    icon: Rocket,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50/80",
    borderColor: "border-emerald-100",
    glow: "rgba(16, 185, 129, 0.15)",
  }
];

const contactFloatingParticles = [
  { left: '5%', top: '15%', size: 'w-1.5 h-1.5', delay: 0 },
  { left: '20%', top: '75%', size: 'w-2 h-2', delay: 1 },
  { left: '40%', top: '30%', size: 'w-1 h-1', delay: 0.5 },
  { left: '60%', top: '85%', size: 'w-3 h-3', delay: 2 },
  { left: '80%', top: '20%', size: 'w-1.5 h-1.5', delay: 1.5 },
  { left: '95%', top: '60%', size: 'w-2 h-2', delay: 0.7 }
];

const footerFloatingParticles = [
  { left: '12%', top: '25%', size: 'w-1 h-1', delay: 0.2 },
  { left: '28%', top: '65%', size: 'w-2 h-2', delay: 1.1 },
  { left: '45%', top: '40%', size: 'w-1.5 h-1.5', delay: 0.8 },
  { left: '62%', top: '75%', size: 'w-1 h-1', delay: 2.3 },
  { left: '78%', top: '30%', size: 'w-2.5 h-2.5', delay: 1.4 },
  { left: '90%', top: '55%', size: 'w-1.5 h-1.5', delay: 0.9 }
];

function ContactCard({ title, value, icon: Icon, href, copyable = false }: { title: string; value: string; icon: any; href?: string; copyable?: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (x / (rect.width / 2)) * 8, y: -(y / (rect.height / 2)) * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleCopy = () => {
    if (copyable) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const CardBody = (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className="relative group w-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 shadow-2xl hover:border-blue-500/30 hover:shadow-blue-500/5 cursor-pointer overflow-hidden text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-300 pointer-events-none" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/10 group-hover:text-blue-300 transition-all duration-300 flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="block font-sans text-xs text-zinc-500 font-bold uppercase tracking-wider">{title}</span>
          <span className="block font-sans text-sm sm:text-base text-zinc-200 font-bold mt-0.5 tracking-tight truncate group-hover:text-white transition-colors">
            {value}
          </span>
        </div>
      </div>

      {copyable && (
        <button 
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 text-[10px] font-mono font-bold text-zinc-400 hover:text-white transition-all z-20"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}

      {href && !copyable && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  return href && !copyable ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
      {CardBody}
    </a>
  ) : (
    <div onClick={handleCopy} className="w-full">
      {CardBody}
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coordsList, setCoordsList] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      const sections = ['skills', 'projects', 'contact'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.1) {
            currentSection = sectionId;
          }
        }
      }

      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web App',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTerminalLogs([]);

    const logs = [
      "> CONNECTING TO PORTFOLIO RECEPTACLE...",
      "> RESOLVING SECURE COMPANION ENDPOINT...",
      "> INJECTING SENDER METADATA: SECURE_HASH_OK",
      "> ENCRYPTING MESSAGE PACKETS WITH AES-256...",
      "> TRANSMITTING PAYLOAD TO FAHAD'S DATABASE...",
      "> RESPONSE: [200 OK] UPLINK FULLY SYNCHRONIZED!"
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        if (idx === logs.length - 1) {
          setTimeout(() => {
            setSubmitSuccess(true);
            setIsSubmitting(false);
          }, 600);
        }
      }, (idx + 1) * 450);
    });
  };

  useEffect(() => {
    const handleMount = () => setMounted(true);
    requestAnimationFrame(handleMount);
  }, []);

  // Generate coordinates for a 24-point scalloped starburst badge
  const scallopedPath = useMemo(() => {
    const points = 24;
    const innerRadius = 75;
    const outerRadius = 88;
    const cx = 100;
    const cy = 100;
    let path = '';

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const isEven = i % 2 === 0;
      const r = isEven ? outerRadius : innerRadius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        // Use quadratic curve to make it beautifully scalloped
        const prevAngle = ((i - 1) * Math.PI) / points;
        const midAngle = (prevAngle + angle) / 2;
        // The control point is pushed outwards to round the scallop peaks
        const cr = isEven ? outerRadius + 4 : outerRadius - 4;
        const cxCtrl = cx + cr * Math.cos(midAngle);
        const cyCtrl = cy + cr * Math.sin(midAngle);
        path += ` Q ${cxCtrl} ${cyCtrl}, ${x} ${y}`;
      }
    }
    path += ' Z';
    return path;
  }, []);

  if (!mounted) {
    return <div className="relative min-h-screen w-full bg-[#fcfdfd]" />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fcfdfd]">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#fcfdfd]/75 backdrop-blur-md border-b border-zinc-200/40 transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          {/* Logo "Fahad A." */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center"
          >
            <span className="font-display text-2xl font-black tracking-tight text-[#1c1d20] select-none hover:scale-105 transition-transform duration-200 cursor-pointer">
              Fahad <span className="text-[#3b82f6]">A.</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-10 text-sm font-medium text-[#5a5c63]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li 
                    key={item.id} 
                    className={`relative px-3 py-1 transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-[#1c1d20] font-semibold' : 'hover:text-[#1c1d20]'
                    }`}
                  >
                    <a 
                      href={item.id === 'home' ? '#' : `#${item.id}`} 
                      onClick={(e) => handleNavClick(e, item.id)}
                      className="block select-none"
                    >
                      {item.label}
                    </a>
                    {isActive && (
                      <svg 
                        className="absolute -inset-x-4 -inset-y-2 w-[calc(100%+32px)] h-[calc(100%+16px)] pointer-events-none" 
                        viewBox="0 0 120 44" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.path
                          key={item.id}
                          d="M 12,22 C 12,10 108,10 108,22 C 108,34 12,34 12,22 C 8,22 24,40 38,40"
                          stroke="#3b82f6"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: 'easeInOut' }}
                        />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Let's Talk CTA (Right side) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden md:block"
          >
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="group flex items-center gap-2 rounded-full border border-[#1c1d20] px-6 py-2.5 text-sm font-semibold tracking-wide text-[#1c1d20] transition-all duration-300 hover:bg-[#1c1d20] hover:text-white"
            >
              {"Let's Talk"}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center justify-center mr-2">
            <input 
              type="checkbox" 
              id="checkbox" 
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <label htmlFor="checkbox" className="toggle">
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </label>
          </div>
        </div>

        {/* Mobile Drawer Menu inside sticky header */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full z-40 bg-[#fcfdfd]/95 backdrop-blur-md px-6 py-8 border-b border-zinc-200/40 shadow-lg md:hidden"
            >
              <nav className="flex flex-col gap-6">
                <ul className="flex flex-col gap-5 text-lg font-medium text-[#5a5c63]">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <a 
                          href={item.id === 'home' ? '#' : `#${item.id}`} 
                          onClick={(e) => handleNavClick(e, item.id)}
                          className={`block transition-colors py-1 ${
                            isActive ? 'text-[#3b82f6] font-semibold' : 'hover:text-[#1c1d20]'
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <hr className="border-zinc-200/40" />
                <a 
                  href="#contact" 
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1c1d20] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-black"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  {"Let's Talk"}
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO MAIN BODY */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-24 sm:pt-28 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-32">
        
        {/* LEFT COLUMN: INTRO & COPY */}
        <div className="flex flex-col items-start lg:col-span-7 xl:col-span-7">
          
          {/* Main Giant Headers */}
          <div className="mb-8 select-none w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-display text-[62px] font-black leading-[1.02] tracking-tight text-[#1c1d20] sm:text-[84px] md:text-[90px] lg:text-[92px] xl:text-[104px]"
            >
              Full-Stack
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="font-display text-[62px] font-black leading-[1.02] tracking-tight text-[#3b82f6] sm:text-[84px] md:text-[90px] lg:text-[92px] xl:text-[104px]"
            >
              Coder &
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="flex items-center"
            >
              <h2 className="font-display text-[62px] font-black leading-[1.02] tracking-tight text-[#1c1d20] sm:text-[84px] md:text-[90px] lg:text-[92px] xl:text-[104px]">
                more
              </h2>
              {/* Custom Elegant 4-point blue star sparkle */}
              <motion.svg 
                className="ml-4 h-12 w-12 text-[#3b82f6] sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <path d="M12 2C12 2 12 12 2 12C12 12 12 22 12 22C12 22 12 12 22 12C12 12 12 2 12 2Z" />
              </motion.svg>
            </motion.div>
          </div>

          {/* Let's Talk CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-14"
          >
            <a 
              href="#contact" 
              className="group flex items-center gap-2 rounded-lg bg-[#3b82f6] px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#2563eb] hover:shadow-lg hover:shadow-blue-500/10"
            >
              {"Let's Talk"}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Secondary Intro Profile Block */}
          <div className="flex flex-col items-start w-full">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#5a5c63]"
            >
              {"HI, I'M"}
            </motion.p>
            
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-display mt-2 mb-4 text-4xl font-extrabold tracking-tight text-[#1c1d20] sm:text-5xl"
            >
              Fahad Ali
            </motion.h3>

            {/* Styled Bio with Custom Subtle Underlines */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-sans text-[17px] leading-relaxed text-[#5a5c63] sm:text-lg max-w-xl"
            >
              {"I'm a"}{' '}
              <span className="relative inline-block font-semibold text-[#1c1d20] after:absolute after:bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-gray-300">
                Full-Stack Developer
              </span>{' '}
              specializing in React,{' '}
              <span className="relative inline-block font-semibold text-[#1c1d20] after:absolute after:bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-gray-300">
                Next.js
              </span>
              , TypeScript, Node.js, and{' '}
              <span className="relative inline-block font-semibold text-[#1c1d20] after:absolute after:bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-gray-300">
                AI-powered
              </span>{' '}
              web applications. Passionate about building fast, modern, and{' '}
              <span className="relative inline-block font-semibold text-[#1c1d20] after:absolute after:bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-gray-300">
                unforgettable digital experiences
              </span>
              .
            </motion.p>
          </div>

          {/* Social Links "Follow Me" */}
          <div className="mt-12 flex flex-col items-start gap-3">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-[10px] font-bold tracking-widest text-[#5a5c63] uppercase pl-2"
            >
              Follow Me
            </motion.span>
            
            <motion.ul 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="example-2"
            >
              <li className="icon-content">
                <a
                  href="https://linkedin.com/in/fahad-ali"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  data-social="linkedin"
                >
                  <div className="filled"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <div className="tooltip">LinkedIn</div>
              </li>
              <li className="icon-content">
                <a 
                  href="https://github.com/fahad-ali" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub" 
                  data-social="github"
                >
                  <div className="filled"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <div className="tooltip">GitHub</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://instagram.com/fahad-ali"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  data-social="instagram"
                >
                  <div className="filled"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <div className="tooltip">Instagram</div>
              </li>
              <li className="icon-content">
                <a 
                  href="https://youtube.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube" 
                  data-social="youtube"
                >
                  <div className="filled"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-youtube"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <div className="tooltip">Youtube</div>
              </li>
            </motion.ul>
          </div>

        </div>

        {/* RIGHT COLUMN: PAINT SPRAY & DEVICE CANVAS */}
        <div className="relative flex h-[460px] w-full items-center justify-center lg:col-span-5 lg:h-[600px] xl:col-span-5 mt-12 lg:-mt-48 xl:-mt-52">
          
          {/* VIBRANT SPRAY PAINT BACKGROUND (SVGs with Noise & Radial Blurs) */}
          <div className="absolute inset-0 z-0 h-full w-full select-none overflow-hidden rounded-[40px] pointer-events-none md:scale-105 lg:scale-110">
            <svg 
              className="absolute inset-0 h-full w-full opacity-90" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Paint colors radial gradients */}
                <radialGradient id="paintBlue" cx="65%" cy="45%" r="48%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                  <stop offset="25%" stopColor="#2563eb" stopOpacity="0.75" />
                  <stop offset="55%" stopColor="#6366f1" stopOpacity="0.45" />
                  <stop offset="85%" stopColor="#a78bfa" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#fcfdfd" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paintPurple" cx="45%" cy="65%" r="40%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.65" />
                  <stop offset="40%" stopColor="#c084fc" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#fcfdfd" stopOpacity="0" />
                </radialGradient>
                
                {/* Granular Splatter/Spray Noise Filter */}
                <filter id="splatterNoise" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
                  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
                  <feComposite operator="in" in2="SourceGraphic" />
                </filter>
              </defs>

              {/* Glowing color bases */}
              <rect width="100%" height="100%" fill="url(#paintBlue)" />
              <rect width="100%" height="100%" fill="url(#paintPurple)" />

              {/* Splattered grainy particles overlapping */}
              <circle cx="65%" cy="45%" r="35%" fill="#2563eb" filter="url(#splatterNoise)" opacity="0.45" />
              <circle cx="45%" cy="65%" r="28%" fill="#8b5cf6" filter="url(#splatterNoise)" opacity="0.35" />
              <circle cx="58%" cy="52%" r="45%" fill="#60a5fa" filter="url(#splatterNoise)" opacity="0.25" />
            </svg>
          </div>

          {/* TILTED DARK CHARCOAL DEVICE FRAME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -3, y: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6, y: -30 }}
            transition={{ duration: 1, ease: 'backOut', delay: 0.2 }}
            className="relative z-10 h-[320px] w-[260px] rounded-[32px] bg-[#1c1d20] p-6 shadow-2xl shadow-blue-900/20 sm:h-[400px] sm:w-[320px]"
          >
            {/* Minimalist Grid inside the card representing a portfolio draft */}
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="h-3 w-16 rounded bg-zinc-800" />
                <div className="h-5 w-5 rounded-full bg-zinc-800" />
              </div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded-lg bg-zinc-800" />
                <div className="h-4 w-full rounded bg-zinc-800" />
                <div className="h-4 w-5/6 rounded bg-zinc-800" />
                <div className="h-4 w-2/3 rounded bg-zinc-800 animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-24 rounded-lg bg-zinc-800" />
                <div className="h-8 w-8 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* Interactive Inner Shadow Effect */}
            <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/10" />
          </motion.div>

          {/* FAHAD PORTRAIT OVERLAPPING */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: -15, rotate: -2 }}
            transition={{ duration: 1.2, ease: 'backOut', delay: 0.4 }}
            className="absolute z-[25] -mt-16 sm:-mt-24 lg:-mt-32 h-[380px] w-[310px] sm:h-[490px] sm:w-[390px] lg:h-[550px] lg:w-[440px] pointer-events-none select-none"
          >
            <Image 
              src="/images/fahad-portrait.png" 
              alt="Fahad Ali Portrait"
              fill
              priority
              sizes="(max-width: 640px) 310px, (max-width: 1024px) 390px, 440px"
              referrerPolicy="no-referrer"
              className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] filter contrast-[1.02] brightness-[1.01]"
            />
          </motion.div>

          {/* BLUE SCRIBBLY SPIRAL LOOPS (OVERLAPPING THE TILTED CARD) */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <svg 
              className="h-[360px] w-[300px] sm:h-[450px] sm:w-[380px] -mt-24 sm:-mt-28 translate-x-3" 
              viewBox="0 0 380 450" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                // Five overlapping handcrafted-style spiral loop coils
                d="M 60,260 
                   C 70,160 140,160 150,260 
                   C 160,360 90,360 100,260 
                   C 110,160 200,160 210,260 
                   C 220,360 150,360 160,260 
                   C 170,160 260,160 270,260 
                   C 280,360 210,360 220,260 
                   C 230,160 320,160 330,260 
                   C 340,360 270,360 280,260"
                stroke="#355bf6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.6, ease: 'easeOut' }}
              />
            </svg>
          </div>

          {/* SCALLOPED TALK STARBURST BADGE (BOTTOM RIGHT) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 10 }}
            transition={{ duration: 0.8, ease: 'backOut', delay: 0.5 }}
            whileHover={{ scale: 1.08, rotate: -5 }}
            className="absolute bottom-4 right-4 z-30 cursor-pointer sm:bottom-8 sm:right-8"
          >
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 flex items-center justify-center">
              {/* Rotating SVG Scalloped Starburst shape */}
              <motion.svg 
                className="absolute inset-0 h-full w-full fill-[#2563eb]" 
                viewBox="0 0 200 200"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
              >
                <path d={scallopedPath} />
              </motion.svg>

              {/* Static overlay text inside the badge */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white pointer-events-none select-none">
                <span className="font-sans text-[9px] sm:text-[11px] font-bold tracking-widest text-blue-100 uppercase">
                  {"I'm"}
                </span>
                <span className="font-display text-[10px] sm:text-[12px] font-extrabold leading-tight tracking-wider uppercase px-2">
                  Ready to Talk
                </span>
                <ArrowUpRight className="h-4 w-4 mt-1 text-white stroke-[2.5px]" />
              </div>
            </div>
          </motion.div>

        </div>

      </main>

      {/* SKILLS SECTION - Immersive Dark Canvas */}
      <section id="skills" className="relative w-full bg-[#111111] py-24 sm:py-32 overflow-hidden border-t border-zinc-900">
        
        {/* Interactive Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* SVG Noise Grain Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
            <filter id="skillsNoiseOverlay">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#skillsNoiseOverlay)" />
          </svg>

          {/* Glowing Orbital Background Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] opacity-25">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="500" cy="500" r="440" stroke="#3b6cff" strokeWidth="0.75" strokeDasharray="4 12" />
              <circle cx="500" cy="500" r="320" stroke="#3b6cff" strokeWidth="1" strokeDasharray="16 32" opacity="0.6" />
              <circle cx="500" cy="500" r="200" stroke="#3b6cff" strokeWidth="0.5" opacity="0.4" />
            </svg>
          </div>

          {/* Soft glowing ambient radial spotlights */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#3B6CFF]/15 blur-[150px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[180px] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center md:text-left md:items-start mb-16 sm:mb-24 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b6cff]/10 border border-[#3b6cff]/20 text-xs font-mono font-bold text-[#3b6cff] mb-4 select-none uppercase tracking-widest">
              <Sparkles className="h-3 w-3 animate-pulse text-[#3b6cff]" />
              Interactive Skill Hub
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
              <div className="select-none">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="font-display text-[52px] sm:text-[72px] md:text-[80px] lg:text-[88px] font-black leading-[1.02] tracking-tight text-white"
                >
                  My Tech
                </motion.h2>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                  className="font-display text-[52px] sm:text-[72px] md:text-[80px] lg:text-[88px] font-black leading-[1.02] tracking-tight text-[#3b6cff]"
                >
                  Arsenal
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md text-zinc-400 font-sans text-sm sm:text-base leading-relaxed md:text-right mt-4 md:mt-0"
              >
                A carefully curated ecosystem of programming environments, frameworks, and modern tools crafted to build high-performance, responsive software solutions.
              </motion.p>
            </div>
          </div>

          {/* Interactive Skills Grid with Centerpiece Core */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 sm:mt-16">
            
            {/* Left Side Columns (Frontend) */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-1">
              {skillsLeftList.map((skill, index) => {
                const coords = coordsList[skill.name];
                const transformStyle = coords
                  ? `perspective(1000px) rotateX(${-coords.y / 12}deg) rotateY(${coords.x / 12}deg) translateY(-8px)`
                  : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)`;
                
                const shadowStyle = coords
                  ? `0 20px 30px rgba(59, 108, 255, 0.15)`
                  : `none`;

                const radius = 22;
                const strokeWidth = 3;
                const circumference = 2 * Math.PI * radius;

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative bg-zinc-950/60 border border-zinc-800/80 hover:border-[#3b6cff]/40 rounded-[24px] p-6 backdrop-blur-md cursor-pointer select-none overflow-hidden transition-all duration-300 z-10"
                    style={{ transform: transformStyle, boxShadow: shadowStyle }}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const box = card.getBoundingClientRect();
                      const x = e.clientX - box.left - box.width / 2;
                      const y = e.clientY - box.top - box.height / 2;
                      setCoordsList(prev => ({ ...prev, [skill.name]: { x, y } }));
                      setHoveredSkill(skill.name);
                    }}
                    onMouseLeave={() => {
                      setCoordsList(prev => {
                        const updated = { ...prev };
                        delete updated[skill.name];
                        return updated;
                      });
                      setHoveredSkill(null);
                    }}
                  >
                    {/* Glowing Accent Border Spot */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,108,255,0.08)_0%,transparent_60%)]" 
                      style={{
                        '--x': coords ? `${coords.x + 150}px` : '50%',
                        '--y': coords ? `${coords.y + 75}px` : '50%'
                      } as React.CSSProperties}
                    />

                    {/* Left & Right layout */}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-300 scale-100 group-hover:scale-110">
                          {skill.icon}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-extrabold text-white">{skill.name}</h3>
                          <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{skill.description}</p>
                        </div>
                      </div>

                      {/* Circular Energy level */}
                      <div className="relative flex items-center justify-center h-14 w-14 flex-shrink-0 select-none">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            className="stroke-zinc-900"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                          />
                          <motion.circle
                            cx="28"
                            cy="28"
                            r={radius}
                            className="stroke-[#3b6cff] drop-shadow-[0_0_6px_rgba(59,108,255,0.4)]"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset: circumference - (skill.percentage / 100) * circumference }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.1, ease: 'easeOut' }}
                          />
                        </svg>
                        <span className="absolute font-mono text-[10px] font-black text-white">
                          {skill.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Slide up Metric Tooltip drawer */}
                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: '100%' }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: '100%' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                          className="absolute inset-0 bg-[#111111]/95 backdrop-blur-md rounded-[24px] p-5 flex flex-col justify-between border border-[#3b6cff]/30 z-30"
                        >
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="font-display font-black text-white text-xs uppercase tracking-wide">{skill.name} Metrics</span>
                            <span className="text-[9px] uppercase font-mono tracking-widest text-[#3b6cff] bg-[#3b6cff]/10 px-2 py-0.5 rounded font-black">Stats</span>
                          </div>
                          
                          <div className="space-y-2.5 my-auto">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-zinc-500 font-sans">Projects Built</span>
                              <span className="text-white font-mono font-black bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">{skill.projectsBuilt}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-zinc-500 font-sans">Experience</span>
                              <span className="text-white font-mono font-black bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">{skill.experience}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Favorite Use</span>
                              <p className="text-white text-xs font-semibold leading-relaxed italic border-l border-[#3b6cff] pl-2">
                                &ldquo;{skill.favoriteUse}&rdquo;
                              </p>
                            </div>
                          </div>

                          <div className="text-[8px] font-mono text-[#3b6cff] text-center select-none uppercase tracking-widest animate-pulse font-black">
                            Hub Integration Live
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Centerpiece (3D Core Sphere/Orb Hub) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[350px] lg:min-h-[500px] order-2">
              
              {/* Rotating Hub Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <motion.div 
                  className="w-72 h-72 rounded-full border border-zinc-900/60 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                >
                  <div className="w-[85%] h-[85%] rounded-full border border-dashed border-[#3b6cff]/20 flex items-center justify-center">
                    <motion.div 
                      className="w-[75%] h-[75%] rounded-full border border-[#3b6cff]/10 flex items-center justify-center"
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    >
                      {/* Rotating mini satellites */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#3b6cff] shadow-[0_0_12px_#3b6cff]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b6cff]" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Thin SVG lines extending outwards with animated dashes */}
              <div className="absolute inset-0 pointer-events-none hidden lg:block">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  {/* Left flowing energy pathways */}
                  <path d="M 50 120 L 150 160 C 180 170 180 200 200 200" stroke="#3b6cff" strokeWidth="1" strokeDasharray="4 8" className="stroke-zinc-800" />
                  <path d="M 50 200 L 200 200" stroke="#3b6cff" strokeWidth="1" strokeDasharray="4 8" className="stroke-zinc-800" />
                  <path d="M 50 280 L 150 240 C 180 230 180 200 200 200" stroke="#3b6cff" strokeWidth="1" strokeDasharray="4 8" className="stroke-zinc-800" />
                  
                  {/* Right flowing energy pathways */}
                  <path d="M 350 120 L 250 160 C 220 170 220 200 200 200" stroke="#3b6cff" strokeWidth="1" strokeDasharray="4 8" className="stroke-zinc-800" />
                  <path d="M 350 200 L 200 200" stroke="#3b6cff" strokeWidth="1" strokeDasharray="4 8" className="stroke-zinc-800" />
                  <path d="M 350 280 L 250 240 C 220 230 220 200 200 200" stroke="#3b6cff" strokeWidth="1" strokeDasharray="4 8" className="stroke-zinc-800" />
                  
                  {/* Flowing energy pulse overlay */}
                  <motion.path 
                    d="M 50 200 L 200 200" 
                    stroke="#3b6cff" 
                    strokeWidth="1.5" 
                    strokeDasharray="10 30" 
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -40 }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}
                  />
                  <motion.path 
                    d="M 350 200 L 200 200" 
                    stroke="#3b6cff" 
                    strokeWidth="1.5" 
                    strokeDasharray="10 30" 
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 40 }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}
                  />
                </svg>
              </div>

              {/* Main Floating 3D Sphere Core */}
              <motion.div 
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                whileHover={{ scale: 1.06 }}
                className="relative z-10 w-44 h-44 rounded-full bg-gradient-to-tr from-[#111111] via-[#1a1b1e] to-[#202124] flex items-center justify-center border border-zinc-800 shadow-[0_25px_50px_rgba(0,0,0,0.6)] cursor-pointer select-none group"
              >
                {/* Inner blue glowing energy orb */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#3b6cff]/20 to-indigo-500/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="absolute inset-7 rounded-full bg-gradient-to-tr from-[#3b6cff] to-[#4c7cff] opacity-90 shadow-[0_0_35px_rgba(59,108,255,0.5)] flex flex-col items-center justify-center p-4 text-center border border-white/10">
                  <Zap className="h-6 w-6 text-white animate-pulse" />
                  <span className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-blue-500 bg-white/10 px-2 py-0.5 rounded-full mt-3 select-none">
                    KNOWLEDGE
                  </span>
                  <span className="text-[9px] uppercase font-mono font-semibold tracking-wide text-blue-100 opacity-90 mt-1 select-none">
                    CORE
                  </span>
                </div>

                {/* Thin outer halo ring */}
                <div className="absolute -inset-1 rounded-full border border-[#3b6cff]/25 animate-pulse pointer-events-none" />
              </motion.div>

              {/* Hub Status Panel */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-zinc-800/80 px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-mono text-zinc-500 tracking-wider flex items-center gap-2 shadow-lg select-none">
                <span className="w-2 h-2 rounded-full bg-[#3b6cff] animate-ping" />
                <span>INTEGRATION STATUS: ACTIVE</span>
              </div>
            </div>

            {/* Right Side Columns (Backend, Styling & Tools) */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-3">
              {skillsRightList.map((skill, index) => {
                const coords = coordsList[skill.name];
                const transformStyle = coords
                  ? `perspective(1000px) rotateX(${-coords.y / 12}deg) rotateY(${coords.x / 12}deg) translateY(-8px)`
                  : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)`;
                
                const shadowStyle = coords
                  ? `0 20px 30px rgba(59, 108, 255, 0.15)`
                  : `none`;

                const radius = 22;
                const strokeWidth = 3;
                const circumference = 2 * Math.PI * radius;

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative bg-zinc-950/60 border border-zinc-800/80 hover:border-[#3b6cff]/40 rounded-[24px] p-6 backdrop-blur-md cursor-pointer select-none overflow-hidden transition-all duration-300 z-10"
                    style={{ transform: transformStyle, boxShadow: shadowStyle }}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const box = card.getBoundingClientRect();
                      const x = e.clientX - box.left - box.width / 2;
                      const y = e.clientY - box.top - box.height / 2;
                      setCoordsList(prev => ({ ...prev, [skill.name]: { x, y } }));
                      setHoveredSkill(skill.name);
                    }}
                    onMouseLeave={() => {
                      setCoordsList(prev => {
                        const updated = { ...prev };
                        delete updated[skill.name];
                        return updated;
                      });
                      setHoveredSkill(null);
                    }}
                  >
                    {/* Glowing Accent Border Spot */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,108,255,0.08)_0%,transparent_60%)]" 
                      style={{
                        '--x': coords ? `${coords.x + 150}px` : '50%',
                        '--y': coords ? `${coords.y + 75}px` : '50%'
                      } as React.CSSProperties}
                    />

                    {/* Left & Right layout */}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-300 scale-100 group-hover:scale-110">
                          {skill.icon}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-extrabold text-white">{skill.name}</h3>
                          <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{skill.description}</p>
                        </div>
                      </div>

                      {/* Circular Energy level */}
                      <div className="relative flex items-center justify-center h-14 w-14 flex-shrink-0 select-none">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            className="stroke-zinc-900"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                          />
                          <motion.circle
                            cx="28"
                            cy="28"
                            r={radius}
                            className="stroke-[#3b6cff] drop-shadow-[0_0_6px_rgba(59,108,255,0.4)]"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset: circumference - (skill.percentage / 100) * circumference }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.1, ease: 'easeOut' }}
                          />
                        </svg>
                        <span className="absolute font-mono text-[10px] font-black text-white">
                          {skill.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Slide up Metric Tooltip drawer */}
                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: '100%' }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: '100%' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                          className="absolute inset-0 bg-[#111111]/95 backdrop-blur-md rounded-[24px] p-5 flex flex-col justify-between border border-[#3b6cff]/30 z-30"
                        >
                          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                            <span className="font-display font-black text-white text-xs uppercase tracking-wide">{skill.name} Metrics</span>
                            <span className="text-[9px] uppercase font-mono tracking-widest text-[#3b6cff] bg-[#3b6cff]/10 px-2 py-0.5 rounded font-black">Stats</span>
                          </div>
                          
                          <div className="space-y-2.5 my-auto">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-zinc-500 font-sans">Projects Built</span>
                              <span className="text-white font-mono font-black bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">{skill.projectsBuilt}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-zinc-500 font-sans">Experience</span>
                              <span className="text-white font-mono font-black bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">{skill.experience}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Favorite Use</span>
                              <p className="text-white text-xs font-semibold leading-relaxed italic border-l border-[#3b6cff] pl-2">
                                &ldquo;{skill.favoriteUse}&rdquo;
                              </p>
                            </div>
                          </div>

                          <div className="text-[8px] font-mono text-[#3b6cff] text-center select-none uppercase tracking-widest animate-pulse font-black">
                            Hub Integration Live
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* PROJECTS SHOWCASE SECTION (SEAMLESSLY TRANSITIONING FROM DARK TO PREMIUM WHITE) */}
      <section id="projects" className="relative w-full bg-[#fcfdfd] py-32 sm:py-40 overflow-hidden border-t border-zinc-100">
        
        {/* Transitional Gradient Divider from Dark Skills Section to Light Projects Section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#111111] to-[#fcfdfd] pointer-events-none z-10" />

        {/* Ambient Spots / Soft Blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-100/30 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-cyan-100/20 blur-[130px] pointer-events-none" />

        {/* Sweep SVG Connector Curves mapping timeline to the side gutters of each project card */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-zinc-200/40 fill-none hidden lg:block" viewBox="0 0 1200 2400" preserveAspectRatio="none">
          <path d="M 600,280 C 600,420 180,420 180,620 L 180,1000" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-50" />
          <path d="M 600,280 C 600,420 1020,420 1020,1400 L 1020,1700" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-30" />
          <path d="M 600,280 C 600,460 180,560 180,2000 L 180,2300" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-40" />
        </svg>

        {/* Section Header */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-20 z-20 text-center lg:text-left">
          <span className="font-sans text-xs sm:text-sm font-extrabold text-blue-600 uppercase tracking-[0.2em] mb-3 block">
            Visualizing Craft
          </span>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-zinc-900 tracking-tight leading-none">
            Selected<br />
            Projects
          </h2>
          <p className="font-sans text-base sm:text-lg text-zinc-500 mt-6 max-w-xl leading-relaxed">
            A collection of products, websites, and digital experiences I&apos;ve designed and developed.
          </p>
        </div>

        {/* Horizontal Project Timeline */}
        <div className="relative max-w-3xl mx-auto mb-20 sm:mb-32 px-6 z-20">
          <div className="absolute top-1/2 left-6 right-6 h-[1.5px] bg-zinc-200/80 -translate-y-1/2 pointer-events-none" />
          
          <div className="relative flex justify-between items-center w-full">
            {/* 2024 Node */}
            <a href="#project-2024" className="relative flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-md shadow-zinc-100/50 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 group-hover:bg-blue-500 transition-colors" />
              </div>
              <div className="absolute -bottom-10 flex flex-col items-center w-24">
                <span className="font-mono text-[11px] font-black text-zinc-400 group-hover:text-zinc-900 transition-colors">2024</span>
                <span className="text-[9px] font-sans font-bold text-zinc-300 group-hover:text-zinc-500 uppercase tracking-wider hidden sm:block mt-0.5">Scribe AI</span>
              </div>
            </a>

            {/* 2025 Node */}
            <a href="#project-2025" className="relative flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-md shadow-zinc-100/50 group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 group-hover:bg-indigo-500 transition-colors" />
              </div>
              <div className="absolute -bottom-10 flex flex-col items-center w-24">
                <span className="font-mono text-[11px] font-black text-zinc-400 group-hover:text-zinc-900 transition-colors">2025</span>
                <span className="text-[9px] font-sans font-bold text-zinc-300 group-hover:text-zinc-500 uppercase tracking-wider hidden sm:block mt-0.5">Nova Commerce</span>
              </div>
            </a>

            {/* 2026 Node */}
            <a href="#project-2026" className="relative flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-all duration-300">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-10 flex flex-col items-center w-28">
                <span className="font-mono text-xs font-black text-blue-600">2026 (Live)</span>
                <span className="text-[9px] font-sans font-black text-blue-500 uppercase tracking-wider hidden sm:block mt-0.5">Zenith Cloud</span>
              </div>
            </a>
          </div>
        </div>

        {/* Projects List with Alternating Layouts */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
          {projectsList.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </section>

      {/* HOW I BUILD SECTION (PREMIUM INTERACTIVE ENGINEERING JOURNEY) */}
      <section id="journey" className="relative w-full bg-white py-32 sm:py-40 overflow-hidden border-t border-zinc-100">
        
        {/* Subtle Blue Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
        
        {/* Soft Ambient Glow Elements */}
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-cyan-50/40 rounded-full blur-[140px] pointer-events-none" />

        {/* Ambient Floating Particles */}
        {floatingParticles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${p.size} rounded-full bg-blue-400/25 blur-[0.5px] pointer-events-none z-10`}
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.6, 0.15]
            }}
            transition={{
              duration: 6 + idx * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
          
          {/* Section Header */}
          <div className="text-center mb-24 sm:mb-32">
            <span className="font-sans text-xs sm:text-sm font-extrabold text-blue-600 uppercase tracking-[0.2em] mb-4 block">
              My Process
            </span>
            <h2 className="font-display text-5xl sm:text-7xl font-black text-zinc-900 tracking-tight leading-none">
              How I Turn<br />
              <span className="text-blue-600">Ideas Into Products</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-500 mt-6 max-w-xl mx-auto leading-relaxed">
              A structured, professional engineering journey designed to bring robust, high-performance, and beautifully crafted products to life.
            </p>
          </div>

          {/* Animated Milestone Journey Container */}
          <div className="relative">
            
            {/* Center Connection - Desktop Blue Energy Line */}
            <div className="absolute top-[32px] left-[10%] right-[10%] h-[3.5px] bg-zinc-100 hidden md:block z-0 overflow-hidden rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                style={{ originX: 0 }}
              />
              <motion.div 
                className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                animate={{ left: ["-20%", "120%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
            </div>

            {/* Center Connection - Mobile Vertical Blue Energy Line */}
            <div className="absolute top-8 bottom-8 left-8 w-[3.5px] bg-zinc-100 block md:hidden z-0 overflow-hidden rounded-full">
              <motion.div 
                className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-cyan-400"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                style={{ originY: 0 }}
              />
              <motion.div 
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/80 to-transparent"
                animate={{ top: ["-20%", "120%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
            </div>

            {/* Journey Grid containing Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 lg:gap-6 z-10 relative">
              {milestones.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                    className="relative pl-16 md:pl-0 flex flex-col items-start md:items-center group"
                  >
                    {/* Circle Node Bubble */}
                    <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto z-20">
                      <motion.div 
                        whileHover={{ scale: 1.12, rotate: 5 }}
                        className={`w-16 h-16 rounded-2xl ${step.bgColor} border border-zinc-200/80 flex items-center justify-center shadow-lg shadow-zinc-100/50 group-hover:border-blue-500/30 group-hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden`}
                      >
                        {/* Internal hover overlay glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/10 to-white/30 transition-opacity duration-300 pointer-events-none" />
                        <IconComp className={`w-7 h-7 ${step.color} transition-transform duration-300 group-hover:scale-110`} />
                      </motion.div>
                      
                      {/* Step Number Badge */}
                      <span className="absolute -top-2 -right-2 bg-zinc-900 text-white font-mono text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-zinc-800 shadow-sm">
                        {step.phase}
                      </span>
                    </div>

                    {/* Content Card with customized color highlight on hover */}
                    <div className="w-full mt-2 md:mt-8 bg-white/75 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full min-h-[180px] group/card">
                      {/* Hover radial colored glow inside each card */}
                      <div 
                        className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                        style={{ backgroundColor: step.glow }}
                      />
                      
                      <div className="relative z-10">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-900 group-hover/card:text-blue-600 transition-colors">
                          {step.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-zinc-500 mt-2.5">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Accent color bar indicating step state */}
                      <div className="w-8 h-1 bg-zinc-100 group-hover/card:bg-blue-500 rounded-full mt-4 transition-colors duration-300 relative z-10" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* PREMIUM CONTACT SECTION â€” COMPLETELY REDESIGNED                    */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="contact" className="relative w-full bg-[#060606] text-zinc-100 py-32 sm:py-44 overflow-hidden">
        
        {/* Transitional Gradient Divider from Light to Dark */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-zinc-200 to-[#060606] pointer-events-none z-10" />

        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute -top-[30%] -left-[20%] w-[80vw] h-[80vw] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
            animate={{ 
              x: [0, 80, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.1, 0.95, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
            animate={{ 
              x: [0, -60, 50, 0],
              y: [0, 50, -70, 0],
              scale: [1, 0.9, 1.15, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
            animate={{ 
              x: [0, 40, -30, 0],
              y: [0, -40, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtle dot grid */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
          
          {/* Section Header */}
          <div className="text-center mb-20 sm:mb-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* Availability Pill */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 tracking-wide mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for Projects &amp; Freelance
              </div>

              <h2 className="font-display text-5xl sm:text-7xl lg:text-[88px] font-black text-white tracking-tight leading-[0.95]">
                {"Let's Work"}
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Together
                  </span>
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                  />
                </span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-zinc-400 mt-8 max-w-lg mx-auto leading-relaxed">
                Have a project in mind, a startup idea, or an exciting opportunity?
                <br className="hidden sm:inline" />
                {"I'd love to hear from you."}
              </p>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            
            {/* LEFT COLUMN - Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              {/* Intro Text */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {"Don't be a stranger"}
                </h3>
                <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
                  Whether {"it's"} a quick question or a full project brief, my inbox is always open. {"Let's"} create something extraordinary together.
                </p>
              </div>

              {/* Contact Info Cards with Animated Border */}
              <div className="space-y-4">
                {[
                  { icon: Mail, title: 'Email', value: 'abdullahparvaiz2025@gmail.com', href: 'mailto:abdullahparvaiz2025@gmail.com', color: 'from-blue-500 to-cyan-500' },
                  { icon: MapPin, title: 'Location', value: 'Toronto, Canada', href: undefined, color: 'from-violet-500 to-purple-500' },
                  { icon: Linkedin, title: 'LinkedIn', value: 'linkedin.com/in/fahad-ali', href: 'https://linkedin.com/in/fahad-ali', color: 'from-blue-600 to-blue-400' },
                  { icon: Github, title: 'GitHub', value: 'github.com/fahad-ali', href: 'https://github.com/fahad-ali', color: 'from-zinc-400 to-zinc-600' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? 'a' : 'div';
                  const wrapperProps = item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                    >
                      <Wrapper
                        {...wrapperProps as any}
                        className="group relative block rounded-2xl p-[1px] bg-gradient-to-r from-zinc-800/80 to-zinc-800/40 hover:from-blue-500/40 hover:to-violet-500/40 transition-all duration-500 cursor-pointer"
                      >
                        <div className="relative flex items-center gap-4 rounded-2xl bg-[#0c0c0c] px-6 py-5 overflow-hidden">
                          {/* Hover glow */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                          
                          {/* Icon */}
                          <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-[1px]`}>
                            <div className="w-full h-full rounded-xl bg-[#0c0c0c] flex items-center justify-center group-hover:bg-[#111] transition-colors duration-300">
                              <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                            </div>
                          </div>

                          {/* Text */}
                          <div className="min-w-0 flex-1 relative z-10">
                            <span className="block font-sans text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{item.title}</span>
                            <span className="block font-sans text-sm sm:text-base font-semibold text-zinc-200 group-hover:text-white transition-colors truncate mt-0.5">
                              {item.value}
                            </span>
                          </div>

                          {/* Arrow */}
                          {item.href && (
                            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                          )}
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Schedule Call CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <a 
                  href="https://calendly.com/fahad-ali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-sm font-bold text-white transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-xl"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule a Call</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN - Premium Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-zinc-700/50 via-zinc-800/30 to-zinc-900/50">
                <div className="rounded-3xl bg-[#0a0a0a] overflow-hidden shadow-2xl">
                  
                  {/* Form Header */}
                  <div className="px-8 pt-8 pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-white">Send a Message</h4>
                        <p className="text-xs text-zinc-500">{"I'll"} get back to you within 24 hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Success State */}
                  {submitSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-10 sm:p-14 text-center space-y-6"
                    >
                      <motion.div 
                        className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/25"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Check className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <div className="space-y-3">
                        <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                          Message Sent!
                        </h3>
                        <p className="font-sans text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                          {"Thank you for reaching out! I've received your message and will respond as soon as possible."}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSubmitSuccess(false);
                          setFormData({ name: '', email: '', projectType: 'Web App', message: '' });
                          setTerminalLogs([]);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-semibold text-zinc-400 hover:text-white hover:border-blue-500/30 transition-all duration-300"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : isSubmitting ? (
                    /* Loading State */
                    <div className="p-10 sm:p-14 flex flex-col items-center justify-center min-h-[400px] space-y-6">
                      <div className="relative w-16 h-16">
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-blue-500/20"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center">
                          <Rocket className="w-5 h-5 text-blue-400" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm font-semibold text-white">Sending your message...</p>
                        <p className="text-xs text-zinc-500">This will only take a moment</p>
                      </div>
                    </div>
                  ) : (
                    /* Form */
                    <form onSubmit={handleContactSubmit} className="p-8 space-y-6">
                      
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Name</label>
                          <input 
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="John Doe"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Email</label>
                          <input 
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Project Type Selector */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Type</label>
                        <div className="flex flex-wrap gap-2">
                          {['Web App', 'SaaS', 'Mobile App', 'AI Integration', 'Consulting'].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({...formData, projectType: type})}
                              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                                formData.projectType === type 
                                  ? 'bg-blue-500/15 border border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                  : 'bg-zinc-900/50 border border-zinc-800/80 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                              }`}
                            >
                              {formData.projectType === type && <span className="mr-1"></span>}
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Message</label>
                        <textarea 
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell me about your project, goals, and timeline..."
                          className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="group w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 hover:from-blue-500 hover:via-blue-400 hover:to-violet-500 px-6 py-4 text-sm font-bold text-white transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-xl relative overflow-hidden cursor-pointer"
                      >
                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10">Send Message</span>
                        <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER - COMPLETELY REDESIGNED WITH MARQUEE & PREMIUM FEEL        */}
      {/* ========================================================================= */}
      <footer id="footer" className="relative w-full bg-[#030303] text-zinc-400 overflow-hidden border-t border-zinc-900/40">
        
        {/* Giant Scrolling Marquee Text */}
        <div className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[200px] bg-blue-500/[0.04] rounded-full blur-[100px]" />
          </div>
          
          <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
              className="flex gap-16 items-center"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex gap-16 items-center flex-shrink-0">
                  {['Full-Stack Developer', 'React & Next.js', 'TypeScript', 'AI-Powered Apps', 'Modern Web'].map((text, idx) => (
                    <span 
                      key={`${setIdx}-${idx}`}
                      className={`font-display font-black tracking-tight select-none text-5xl sm:text-7xl lg:text-8xl text-zinc-900 hover:text-zinc-700 transition-colors duration-500`}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12">
          
          {/* Top Row: Logo, Nav, Socials */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 pb-12 border-b border-zinc-900/60">
            
            {/* Logo & Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="font-display text-2xl font-black text-white tracking-tight">
                Fahad<span className="text-blue-500">.</span>
              </span>
              <p className="mt-2 text-xs text-zinc-500 max-w-xs leading-relaxed">
                Building beautiful, fast, and intelligent web experiences that leave a lasting impression.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-zinc-500">
                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => {
                  const targetId = item === 'Home' ? '#' : `#${item.toLowerCase()}`;
                  return (
                    <li key={item} className="relative group">
                      <a 
                        href={targetId}
                        onClick={(e) => {
                          if (item === 'Home') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </a>
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full group-hover:w-full transition-all duration-300" />
                    </li>
                  );
                })}
              </ul>
            </motion.nav>

            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {[
                { icon: Github, href: "https://github.com/fahad-ali", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/fahad-ali", label: "LinkedIn" },
                { icon: Instagram, href: "https://instagram.com/fahad-ali", label: "Instagram" },
                { icon: Mail, href: "mailto:abdullahparvaiz2025@gmail.com", label: "Email" },
              ].map((soc) => {
                const SocIcon = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300"
                    aria-label={soc.label}
                  >
                    <SocIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Row: Copyright + Back to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs text-zinc-600 font-medium"
            >
              &copy; {new Date().getFullYear()} Fahad Ali. Designed &amp; developed with passion.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <span>Back to top</span>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 -rotate-45 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </motion.button>
          </div>

        </div>
      </footer>
      <Chatbot />

    </div>
  );
}

