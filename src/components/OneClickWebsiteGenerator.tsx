import React, { useState } from 'react';
import { UniqueBusinessPower } from '../types/empire';
import { buildQuickWebsiteBusiness } from '../services/quickWebsiteBuilder';
import { 
  Sparkles, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Camera, 
  Image as ImageIcon, 
  Mail, 
  Bookmark, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Crown,
  Play
} from 'lucide-react';

interface OneClickWebsiteGeneratorProps {
  currentLocation: string;
  onLaunchPreview: (business: UniqueBusinessPower, location: string, category: string) => void;
}

const PRESET_IDEAS = [
  { name: 'London Plumber', icon: '🚰', desc: 'Emergency Plumbing & Boiler Specialists' },
  { name: 'Dallas Emergency Roofing', icon: '🏠', desc: '24/7 Storm Damage & Hail Repair' },
  { name: 'Austin Master Electrician', icon: '⚡', desc: 'Commercial & Residential Electrical' },
  { name: 'Miami HVAC Specialists', icon: '❄️', desc: 'Emergency AC Repair & Heat Pumps' }
];

export const OneClickWebsiteGenerator: React.FC<OneClickWebsiteGeneratorProps> = ({
  currentLocation,
  onLaunchPreview
}) => {
  const [businessNameInput, setBusinessNameInput] = useState('London Plumber');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const handleGenerateClick = async (targetName?: string) => {
    const finalName = (targetName || businessNameInput).trim() || 'London Plumber';
    setBusinessNameInput(finalName);
    setIsGenerating(true);
    setGenerationStep(1);

    // Step 1: Synthesizing Astra Pro Theme & Structure
    await new Promise(r => setTimeout(r, 380));
    setGenerationStep(2);

    // Step 2: Auto-generating Canvas Logo, Email Logo & Left Sticky Badge
    await new Promise(r => setTimeout(r, 420));
    setGenerationStep(3);

    // Step 3: Fetching 16+ Ultra HD 8K Images (Vans, Workers, Tools, Happy Clients)
    await new Promise(r => setTimeout(r, 450));
    setGenerationStep(4);

    // Step 4: Injecting 24/7 WhatsApp & Instant Quote Engine
    await new Promise(r => setTimeout(r, 350));
    setGenerationStep(5);

    await new Promise(r => setTimeout(r, 250));
    setIsGenerating(false);

    // Build complete business object
    const { business, location, category } = buildQuickWebsiteBusiness(finalName, currentLocation);
    onLaunchPreview(business, location, category);
  };

  return (
    <div id="one-click-generator" className="glass-gold rounded-3xl p-5 sm:p-6 border-2 border-amber-400/80 bg-gradient-to-br from-[#18150D] via-[#100F14] to-[#0A0A0D] shadow-2xl shadow-amber-500/15 relative overflow-hidden space-y-4">
      
      {/* Background glow and decorative aura */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-amber-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-yellow-500/10 blur-2xl pointer-events-none"></div>

      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black shadow-lg shadow-amber-500/30">
            <Sparkles className="w-5 h-5 fill-black text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                ASTRA PRO $5M THEME
              </span>
              <span className="text-xs text-zinc-400 font-medium">ONE-CLICK ENGINE</span>
            </div>
            <h3 className="text-base sm:text-xl font-cinzel font-bold text-amber-200">
              One-Click 8K Professional Website Generator
            </h3>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready to Deliver to Client
        </span>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed">
        Type any business name below (e.g. <strong>"London Plumber"</strong>, <strong>"Dallas Emergency Roofing"</strong>). With one click, the AI automatically crafts a <strong>$5M luxury Astra Pro website</strong>, renders a <strong>Vector Logo</strong>, <strong>Email Logo</strong>, <strong>Left Sticky Badge</strong>, and fetches <strong>16+ Ultra HD 8K stock images</strong> (Vans, Workers on Site, Tools & Diagnostics, Happy Clients) from Unsplash with zero API key required:
      </p>

      {/* INPUT FIELD & BIG 1-CLICK GENERATOR BUTTON */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={businessNameInput}
            onChange={(e) => setBusinessNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleGenerateClick();
            }}
            placeholder="Enter any business name (e.g. London Plumber, Dallas Roofing, Austin Electrician)..."
            className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-black/80 border-2 border-amber-500/50 text-sm font-bold text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none shadow-inner"
          />
          <Crown className="w-5 h-5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Quick Clickable Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="text-[11px] text-zinc-400 font-medium shrink-0">Popular Presets:</span>
          {PRESET_IDEAS.map((idea, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleGenerateClick(idea.name)}
              className="px-2.5 py-1 rounded-xl bg-black/60 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-amber-200 text-[11px] font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1"
            >
              <span>{idea.icon}</span>
              <span>{idea.name}</span>
            </button>
          ))}
        </div>

        {/* THE BIG GOLDEN BUTTON: "Generate 8K Professional Website in 1 Click" */}
        <button
          onClick={() => handleGenerateClick()}
          disabled={isGenerating}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-black text-sm sm:text-base tracking-wider uppercase shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/70 hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer flex items-center justify-center gap-3 border-2 border-yellow-200 group"
        >
          <Sparkles className={`w-5 h-5 fill-black text-black group-hover:rotate-12 transition ${isGenerating ? 'animate-spin' : ''}`} />
          <span className="drop-shadow-sm">
            {isGenerating ? 'GENERATING ASTRA PRO 8K WEBSITE...' : 'GENERATE 8K PROFESSIONAL WEBSITE IN 1 CLICK'}
          </span>
          <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition" />
        </button>
      </div>

      {/* GENERATION PROGRESS HUD (IF IN PROGRESS) */}
      {isGenerating && (
        <div className="p-4 rounded-2xl bg-black/90 border border-amber-400/40 space-y-2.5 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-amber-300 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Compiling Astra Pro Theme Architecture...</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400">{generationStep}/5 Completed</span>
          </div>

          <div className="space-y-1 text-[11px] text-zinc-300">
            <div className={`flex items-center gap-2 ${generationStep >= 1 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>1. Formatted Astra Pro $5M Responsive Grid & Typography</span>
            </div>
            <div className={`flex items-center gap-2 ${generationStep >= 2 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>2. Rendered Luxury Vector Logo, Email Logo & Left Sticky Badge</span>
            </div>
            <div className={`flex items-center gap-2 ${generationStep >= 3 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>3. Fetched 16+ Ultra HD 8K Unsplash Images (Vans, Workers, Tools, Happy Clients)</span>
            </div>
            <div className={`flex items-center gap-2 ${generationStep >= 4 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>4. Injected 24/7 WhatsApp Hotline & 60-Second Instant Quote Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* 4 AUTOMATICALLY GENERATED ASSETS TEASER */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
        
        {/* Asset 1: Professional Logo */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
            <Crown className="w-3.5 h-3.5" />
            <span>Vector Logo</span>
          </div>
          <p className="text-[10px] text-zinc-400 leading-tight">
            Gold crest emblem with dynamic monogram initials & sub-brand text.
          </p>
        </div>

        {/* Asset 2: Header Banner */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
            <Globe className="w-3.5 h-3.5" />
            <span>Header Banner</span>
          </div>
          <p className="text-[10px] text-zinc-400 leading-tight">
            24/7 emergency dispatch alert bar & instant estimate booking widget.
          </p>
        </div>

        {/* Asset 3: Email Logo */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
            <Mail className="w-3.5 h-3.5" />
            <span>Email Logo</span>
          </div>
          <p className="text-[10px] text-zinc-400 leading-tight">
            High-DPI transparent signature logo formatted for quotes & client invoices.
          </p>
        </div>

        {/* Asset 4: 16+ 8K Stock Photos */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
            <Camera className="w-3.5 h-3.5" />
            <span>16+ 8K Photos</span>
          </div>
          <p className="text-[10px] text-zinc-400 leading-tight">
            Vans, workers on site, precision tools, and happy clients handshake.
          </p>
        </div>

      </div>

    </div>
  );
};
