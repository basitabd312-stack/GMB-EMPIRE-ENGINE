import React, { useState } from 'react';
import { EmpireScanResult, UniqueBusinessPower } from '../../types/empire';
import { WebsitePreviewModal } from '../Modals/WebsitePreviewModal';
import { SEOAnalyzerEngine } from './SEOAnalyzerEngine';
import { OneClickWebsiteGenerator } from '../OneClickWebsiteGenerator';
import { 
  Crown, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Briefcase, 
  Share2, 
  Camera, 
  Zap, 
  Globe, 
  Eye, 
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowRight,
  RefreshCw,
  Layers,
  Palette,
  Image as ImageIcon,
  MessageCircle,
  CheckCircle2,
  Gauge
} from 'lucide-react';

interface PowerMakerColumnProps {
  data: EmpireScanResult;
}

export const PowerMakerColumn: React.FC<PowerMakerColumnProps> = ({ data }) => {
  const [selectedBizIndex, setSelectedBizIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [previewBiz, setPreviewBiz] = useState<UniqueBusinessPower | null>(null);
  const [previewLocation, setPreviewLocation] = useState<string>(data.location);
  const [previewCategory, setPreviewCategory] = useState<string>(data.category);
  const [isGeneratingWorkflow, setIsGeneratingWorkflow] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(0);
  const [workflowBiz, setWorkflowBiz] = useState<UniqueBusinessPower | null>(null);
  const [customDescriptions, setCustomDescriptions] = useState<Record<string, string>>({});

  const handleLaunchOneClickPreview = (biz: UniqueBusinessPower, loc: string, cat: string) => {
    setPreviewBiz(biz);
    setPreviewLocation(loc);
    setPreviewCategory(cat);
  };

  const businesses = data.powerMaker.businesses;
  const currentBiz: UniqueBusinessPower = businesses[selectedBizIndex] || businesses[0];
  const activeDescriptionText = customDescriptions[currentBiz.id] || currentBiz.gmbDescription750.text;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyAllServices = () => {
    const text = currentBiz.services10.map((s, i) => `${i + 1}. ${s.name} (${s.priceGuide}) - ${s.benefit}`).join('\n');
    copyText(text, 'all-services');
  };

  // Automated workflow: Canvas Logo + 15+ Unsplash 8K Images + Full-Screen Astra Pro Preview
  const handleTriggerAutomatedWorkflow = async (biz: UniqueBusinessPower, idx: number) => {
    setSelectedBizIndex(idx);
    setWorkflowBiz(biz);
    setIsGeneratingWorkflow(true);
    setWorkflowStep(1);

    // Step 1: Canvas Logo Generation
    await new Promise(r => setTimeout(r, 450));
    setWorkflowStep(2);

    // Step 2: Fetching 15+ 8K Unsplash Images
    await new Promise(r => setTimeout(r, 550));
    setWorkflowStep(3);

    // Step 3: Compiling Astra Pro $5M Layout
    await new Promise(r => setTimeout(r, 450));
    setWorkflowStep(4);

    // Step 4: Injecting Floating WhatsApp Button & 5-Star Reviews
    await new Promise(r => setTimeout(r, 400));
    setWorkflowStep(5);

    await new Promise(r => setTimeout(r, 350));
    setIsGeneratingWorkflow(false);
    setPreviewBiz(biz);
  };

  const handleViewBlueprint = (idx: number) => {
    setSelectedBizIndex(idx);
    // Smooth scroll down to blueprint section if on mobile
    const blueprintEl = document.getElementById('biz-blueprint-details');
    if (blueprintEl) {
      blueprintEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      {/* ONE-CLICK 8K PROFESSIONAL WEBSITE GENERATOR (ASTRA PRO THEME $5M LOOK) */}
      <OneClickWebsiteGenerator
        currentLocation={data.location}
        onLaunchPreview={handleLaunchOneClickPreview}
      />

      {/* Column Header & Business Selector with TWO GOLDEN BUTTONS */}
      <div className="glass-gold rounded-2xl p-4 sm:p-5 border border-amber-500/40 relative overflow-hidden bg-gradient-to-br from-[#14120D] via-[#0E0E14] to-[#0A0A0D]">
        
        {/* Atmospheric gold glow */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md shadow-amber-500/10">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">COL 3</span>
                <span className="text-xs text-zinc-400 font-medium">EMPIRE BLUEPRINT & WEBSITE MAKER</span>
              </div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-amber-200">
                Power Maker • 3 Businesses
              </h2>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-[10px] tracking-wider uppercase shadow-md shadow-amber-500/20">
            8K Ready
          </span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed mb-4">
          Each powerhouse business model includes two golden action buttons to launch an automated <strong>8K Astra Pro Website Preview</strong> ($5M Look) or inspect the <strong>Blueprint</strong> for <strong>{data.location}</strong>:
        </p>

        {/* 3 BUSINESSES CARDS WITH TWO GOLDEN BUTTONS */}
        <div className="space-y-3">
          {businesses.map((biz, idx) => (
            <div
              key={biz.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition relative ${
                selectedBizIndex === idx
                  ? 'border-amber-400/90 bg-gradient-to-r from-amber-400/15 via-black/70 to-black/60 shadow-xl shadow-amber-500/15 ring-1 ring-amber-400/30'
                  : 'border-amber-500/20 bg-black/50 hover:border-amber-400/50'
              }`}
            >
              {/* Top row: Badge + Name + Concept */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                      selectedBizIndex === idx 
                        ? 'bg-amber-400 text-black shadow-sm' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                    }`}>
                      BUSINESS #{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-amber-300 transition">
                      {biz.businessName}
                    </h3>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                    {biz.conceptTag} • <span className="text-amber-300/90 italic font-semibold">"{biz.advantageTwist30Pct.headline.slice(0, 68)}..."</span>
                  </p>
                </div>

                {selectedBizIndex === idx && (
                  <span className="shrink-0 flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE
                  </span>
                )}
              </div>

              {/* TWO GOLDEN BUTTONS: [GENERATE 8K WEBSITE - 1 CLICK] and [View Blueprint] */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-amber-500/20">
                
                {/* 1. GOLDEN BUTTON: [GENERATE 8K WEBSITE - 1 CLICK] */}
                <button
                  onClick={() => handleTriggerAutomatedWorkflow(biz, idx)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-xs tracking-wide uppercase shadow-lg shadow-amber-500/30 hover:shadow-amber-500/60 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2 group border border-yellow-300"
                  title="Generate 8K Landing Page with Auto-Canvas Logo and 16+ Unsplash Photos"
                >
                  <Sparkles className="w-4 h-4 fill-black text-black group-hover:rotate-12 transition shrink-0" />
                  <span className="truncate">GENERATE 8K WEBSITE - 1 CLICK</span>
                </button>

                {/* 2. GOLDEN BUTTON: [View Blueprint] */}
                <button
                  onClick={() => handleViewBlueprint(idx)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                    selectedBizIndex === idx
                      ? 'bg-gradient-to-r from-amber-500/30 via-yellow-500/25 to-amber-500/30 text-amber-300 border-2 border-amber-400 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-amber-400/15 via-yellow-400/10 to-amber-500/15 text-amber-300 border-2 border-amber-400/60 hover:border-amber-400 hover:bg-amber-400/25'
                  }`}
                  title="Inspect 30% Twist, 750-Char Description, 10 Services, 5 Posts & 3 Photo Prompts"
                >
                  <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>View Blueprint</span>
                </button>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* BLUEPRINT DETAILS SECTION */}
      <div id="biz-blueprint-details" className="space-y-4">
        {/* SECTION 1: 30% UNFAIR ADVANTAGE TWIST */}
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/40 relative overflow-hidden bg-gradient-to-br from-[#16140D] to-[#0D0D12]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 13: The 30% Unfair Advantage Twist
              </h3>
            </div>
            <button
              onClick={() => handleTriggerAutomatedWorkflow(currentBiz, selectedBizIndex)}
              className="text-[10px] text-amber-400 hover:text-amber-200 underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>Launch 8K Preview</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-amber-400/30 space-y-2">
            <div className="text-xs font-extrabold text-amber-200 leading-snug">
              "{currentBiz.advantageTwist30Pct.headline}"
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {currentBiz.advantageTwist30Pct.details}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
              <div className="bg-white/5 p-2 rounded-lg">
                <span className="text-amber-400 font-semibold block">Psychological Hook:</span>
                <span className="text-zinc-300">{currentBiz.advantageTwist30Pct.psychologicalHook}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg">
                <span className="text-emerald-400 font-semibold block">Conversion Advantage:</span>
                <span className="text-zinc-300">{currentBiz.advantageTwist30Pct.conversionAdvantage}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 750-CHARACTER DESCRIPTION */}
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 14: 750-Char GMB Description
              </h3>
            </div>
            
            {/* Character Counter Meter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-amber-300">
                {activeDescriptionText.length} / 750
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                activeDescriptionText.length > 750 
                  ? 'bg-rose-500/20 text-rose-300' 
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {activeDescriptionText.length > 750 ? 'OVER LIMIT' : '100% SATURATED'}
              </span>
            </div>
          </div>

          {/* Description Text Container */}
          <div className="relative p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-200 leading-relaxed font-sans">
            {activeDescriptionText}

            <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[10px] text-zinc-400">Target Keywords:</span>
                {currentBiz.gmbDescription750.keywordDensity.slice(0, 3).map((kw, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {kw}
                  </span>
                ))}
              </div>

              <button
                onClick={() => copyText(activeDescriptionText, 'gmb-desc')}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition flex items-center gap-1.5 cursor-pointer shadow-sm ml-auto"
              >
                {copiedKey === 'gmb-desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'gmb-desc' ? 'Copied Description!' : 'Copy 750-Char Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* NEW ENGINE: SEO ANALYZER (Audits description against top 10 ranked competitors' keywords & score 1-100) */}
        <SEOAnalyzerEngine
          description={activeDescriptionText}
          top10Keywords={data.gapDetector.top10Keywords}
          location={data.location}
          category={data.category}
          onUpdateDescription={(newText) => {
            setCustomDescriptions(prev => ({
              ...prev,
              [currentBiz.id]: newText
            }));
          }}
        />

        {/* SECTION 3: 10 HIGH-INTENT SERVICES */}
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 15: 10 High-Intent Services Matrix
              </h3>
            </div>
            <button
              onClick={copyAllServices}
              className="text-xs px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition flex items-center gap-1 cursor-pointer font-medium"
            >
              {copiedKey === 'all-services' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'all-services' ? 'Copied All 10!' : 'Copy All 10'}</span>
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {currentBiz.services10.map((srv, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-black/45 border border-white/10 hover:border-amber-400/30 transition flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-amber-400/20 text-amber-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-bold text-zinc-100 truncate">{srv.name}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 pl-6">
                    {srv.benefit}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono font-bold text-amber-300 block">{srv.priceGuide}</span>
                  <span className="text-[9px] text-zinc-400 uppercase">{srv.gmbServiceCategory}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: 5 LOCAL GOOGLE POSTS */}
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 16: 5 High-CTR Local Google Posts
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">
              5 CTAS READY
            </span>
          </div>

          <div className="space-y-3">
            {currentBiz.posts5.map((post, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-amber-400/30 transition space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    {post.type}
                  </span>
                  <button
                    onClick={() => copyText(`${post.title}\n\n${post.body}\nCTA: ${post.ctaButton}`, `post-${idx}`)}
                    className="text-[11px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === `post-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === `post-${idx}` ? 'Copied' : 'Copy Post'}</span>
                  </button>
                </div>

                <h4 className="text-xs font-bold text-zinc-100">{post.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{post.body}</p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">Recommended GMB Button:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-bold text-[10px] tracking-wider uppercase">
                    {post.ctaButton}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: 3 PHOTO PROMPTS & GEO-EXIF STAGING */}
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 17: 3 High-Impact Visual Photo Prompts
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">GEO-STAGING</span>
          </div>

          <p className="text-xs text-zinc-400">
            Feed these prompts into Gemini / Midjourney / Imagen to generate ultra-realistic photo assets, with simulated EXIF geo-tags for Maps ranking:
          </p>

          <div className="space-y-3">
            {currentBiz.photoPrompts3.map((photo, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold text-[11px] flex items-center justify-center">
                      #{i + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-200">{photo.angleTitle}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 uppercase">
                    {photo.gmbTabCategory} Tab
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/70 border border-amber-400/20 text-[11px] text-zinc-200 leading-relaxed font-mono">
                  "{photo.prompt}"
                </div>

                <div className="text-[10px] text-zinc-400 space-y-0.5 pt-1">
                  <div><strong>Staging Directive: </strong>{photo.lightingAndStaging}</div>
                  <div className="text-amber-400/90 font-mono"><strong>EXIF Geo-Tag: </strong>{photo.geoTagExifSimulation}</div>
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => copyText(photo.prompt, `photo-${i}`)}
                    className="text-xs px-2.5 py-1 rounded bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copiedKey === `photo-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === `photo-${i}` ? 'Copied Prompt!' : 'Copy Photo Prompt'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AUTOMATED WORKFLOW PROGRESS OVERLAY MODAL */}
      {isGeneratingWorkflow && workflowBiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl glass-gold p-6 sm:p-8 border-2 border-amber-400/60 bg-[#0E0E14] text-zinc-100 shadow-2xl relative text-center space-y-6">
            
            {/* Spinning Golden Crown Aura */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 animate-spin opacity-75 blur-sm" style={{ animationDuration: '3s' }}></div>
              <div className="relative w-full h-full rounded-full bg-black border-2 border-amber-400 flex items-center justify-center shadow-xl">
                <Crown className="w-10 h-10 text-amber-400 animate-bounce" />
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                AUTOMATED 8K WORKFLOW RUNNING
              </span>
              <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200 mt-2">
                Generating 8K Website for {workflowBiz.businessName}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Synthesizing luxury Astra Pro architecture, logo, 16+ 8K photography assets, and WhatsApp integration.
              </p>
            </div>

            {/* Workflow Step Indicators */}
            <div className="space-y-2.5 text-left text-xs bg-black/60 p-4 rounded-2xl border border-white/10">
              <div className={`flex items-center gap-3 transition-all ${workflowStep >= 1 ? 'text-amber-300 font-bold' : 'text-zinc-600'}`}>
                {workflowStep > 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />}
                <span>Auto-Generating Custom Vector Logo via HTML5 Canvas</span>
              </div>
              <div className={`flex items-center gap-3 transition-all ${workflowStep >= 2 ? 'text-amber-300 font-bold' : 'text-zinc-600'}`}>
                {workflowStep > 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : workflowStep === 2 ? <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" /> : <ImageIcon className="w-4 h-4 text-zinc-600 shrink-0" />}
                <span>Fetching 16+ Curated 8K Unsplash Source Photographs</span>
              </div>
              <div className={`flex items-center gap-3 transition-all ${workflowStep >= 3 ? 'text-amber-300 font-bold' : 'text-zinc-600'}`}>
                {workflowStep > 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : workflowStep === 3 ? <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" /> : <Layers className="w-4 h-4 text-zinc-600 shrink-0" />}
                <span>Building Astra Pro ($5M Look) Hero Banner & 10 Services</span>
              </div>
              <div className={`flex items-center gap-3 transition-all ${workflowStep >= 4 ? 'text-amber-300 font-bold' : 'text-zinc-600'}`}>
                {workflowStep > 4 ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : workflowStep === 4 ? <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" /> : <MessageCircle className="w-4 h-4 text-zinc-600 shrink-0" />}
                <span>Configuring Floating WhatsApp Hotline & 5-Star Reviews</span>
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-black border border-amber-500/30 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-all duration-300"
                style={{ width: `${(workflowStep / 5) * 100}%` }}
              ></div>
            </div>

          </div>
        </div>
      )}

      {/* FULL-SCREEN 8K WEBSITE PREVIEW MODAL */}
      {previewBiz && (
        <WebsitePreviewModal
          isOpen={!!previewBiz}
          onClose={() => setPreviewBiz(null)}
          business={previewBiz}
          location={previewLocation || data.location}
          category={previewCategory || data.category}
        />
      )}

    </div>
  );
};
