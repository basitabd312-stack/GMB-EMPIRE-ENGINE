import React, { useState, useEffect, useRef } from 'react';
import { execute18Engines, ALL_18_ENGINES } from './services/empireEngine';
import { EmpireScanResult } from './types/empire';
import { ScannerColumn } from './components/Columns/ScannerColumn';
import { GapDetectorColumn } from './components/Columns/GapDetectorColumn';
import { PowerMakerColumn } from './components/Columns/PowerMakerColumn';
import { WelcomeAssistant } from './components/WelcomeAssistant';
import { PWAInstallButton } from './components/PWAInstallButton';
import { ApiKeysModal } from './components/Modals/ApiKeysModal';
import { ExportReportModal } from './components/Modals/ExportReportModal';
import { 
  Crown, 
  MapPin, 
  Briefcase, 
  Play, 
  Radar, 
  KeyRound, 
  Sparkles, 
  Settings, 
  Download, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  ChevronRight, 
  Smartphone,
  Laptop,
  Tablet,
  RefreshCw,
  Compass,
  Zap
} from 'lucide-react';

const PRESET_NICHES = [
  { location: 'Dallas, TX', category: 'Emergency Plumber', icon: '🚰' },
  { location: 'London, UK', category: 'Roofing Contractor', icon: '🏠' },
  { location: 'New York, NY', category: 'Cosmetic Dentist', icon: '✨' },
  { location: 'Miami, FL', category: 'Luxury Detailing', icon: '🏎️' },
  { location: 'Los Angeles, CA', category: 'Personal Injury Lawyer', icon: '⚖️' },
  { location: 'Dubai, UAE', category: 'HVAC AC Repair', icon: '❄️' }
];

export default function App() {
  const [location, setLocation] = useState('Dallas, TX');
  const [category, setCategory] = useState('Emergency Plumber');
  const [isRunning, setIsRunning] = useState(false);
  const [activeEngineStep, setActiveEngineStep] = useState<{ id: number; name: string } | null>(null);
  const [engineProgressPct, setEngineProgressPct] = useState(0);
  const [empireData, setEmpireData] = useState<EmpireScanResult | null>(null);

  // Mobile Bottom Navigation Tab state ('col1' | 'col2' | 'col3' | 'stacked' | 'engines18')
  const [mobileTab, setMobileTab] = useState<'col1' | 'col2' | 'col3' | 'stacked'>('col1');
  const [show18EnginesModal, setShow18EnginesModal] = useState(false);
  const [showApiKeysModal, setShowApiKeysModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // API keys from localStorage or env
  const [googleKey, setGoogleKey] = useState(() => {
    return localStorage.getItem('GMB_VITE_GOOGLE_API') || import.meta.env.VITE_GOOGLE_API || '';
  });
  const [claudeKey, setClaudeKey] = useState(() => {
    return localStorage.getItem('GMB_VITE_CLAUDE_API') || import.meta.env.VITE_CLAUDE_API || '';
  });

  // Run initial scan on load so the dashboard is immediately rich and interactive
  useEffect(() => {
    handleRunEngines(location, category);
  }, []);

  const handleRunEngines = async (locToScan = location, catToScan = category) => {
    if (isRunning) return;
    setIsRunning(true);
    setEngineProgressPct(5);

    try {
      const result = await execute18Engines(locToScan, catToScan, (id, name) => {
        setActiveEngineStep({ id, name });
        const pct = Math.min(100, Math.round((id / 18) * 100));
        setEngineProgressPct(pct);
      });

      setEmpireData(result);
    } catch {
      // Fallback
    } finally {
      setIsRunning(false);
      setActiveEngineStep(null);
      setEngineProgressPct(100);
    }
  };

  const handleSaveKeys = (newGoogleKey: string, newClaudeKey: string) => {
    setGoogleKey(newGoogleKey);
    setClaudeKey(newClaudeKey);
    localStorage.setItem('GMB_VITE_GOOGLE_API', newGoogleKey);
    localStorage.setItem('GMB_VITE_CLAUDE_API', newClaudeKey);
  };

  const handleSelectPreset = (presetLoc: string, presetCat: string) => {
    setLocation(presetLoc);
    setCategory(presetCat);
    handleRunEngines(presetLoc, presetCat);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-black">
      
      {/* TOP IMPERIAL HEADER */}
      <header className="sticky top-0 z-30 border-b border-amber-500/20 bg-[#0A0A0E]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#1E1B10] to-[#0A0A0D] border-2 border-amber-400/80 p-1 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              <span className="absolute -bottom-1 -right-1 text-[8px] font-mono font-bold bg-amber-400 text-black px-1 rounded">18X</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-xl font-cinzel font-black tracking-wide gold-gradient-text leading-none">
                  GMB EMPIRE ENGINE
                </h1>
                <span className="hidden md:inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  ALL DEVICES
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 font-medium tracking-tight mt-0.5 hidden xs:block">
                18 Automated Engines • Scanner • Gap Detector • Power Maker
              </p>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* 18 Engines Status Trigger */}
            <button
              onClick={() => setShow18EnginesModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-amber-500/30 text-amber-300 text-xs font-semibold transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>18 Engines Radar</span>
            </button>

            {/* 1-Click 8K Website Generator Quick Button */}
            <button
              onClick={() => {
                setMobileTab('col3');
                const el = document.getElementById('one-click-generator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
              title="Generate 8K Professional Website in 1 Click"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black text-black" />
              <span className="hidden sm:inline">1-Click 8K Website</span>
            </button>

            {/* Export Dossier */}
            {empireData && (
              <button
                onClick={() => setShowExportModal(true)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
                title="Export Empire Dossier"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}

            {/* API Keys Configuration */}
            <button
              onClick={() => setShowApiKeysModal(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
              title="API Keys (Places & AI)"
            >
              <Settings className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden md:inline">API Keys</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 pb-24 lg:pb-10">
        
        {/* COMMAND INPUTS BAR: Location, Category, Button "RUN 18 ENGINES" */}
        <section className="glass-gold rounded-3xl p-4 sm:p-5 border border-amber-500/40 relative overflow-hidden bg-gradient-to-br from-[#121218]/90 via-[#0A0A0D]/95 to-[#08080A]">
          {/* Gold atmospheric aura */}
          <div className="absolute top-0 right-1/4 w-96 h-28 bg-amber-500/10 blur-3xl pointer-events-none"></div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunEngines(location, category);
            }}
            className="space-y-3.5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 items-center">
              
              {/* INPUT 1: Location */}
              <div className="sm:col-span-5 relative">
                <label className="block text-[11px] font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Target Location</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dallas, TX or London, UK"
                    required
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-black/60 border border-white/15 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none text-xs sm:text-sm font-medium transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">📍</span>
                </div>
              </div>

              {/* INPUT 2: Category */}
              <div className="sm:col-span-4 relative">
                <label className="block text-[11px] font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span>Business Category</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Emergency Plumber"
                    required
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-black/60 border border-white/15 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none text-xs sm:text-sm font-medium transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🛠️</span>
                </div>
              </div>

              {/* BUTTON: "RUN 18 ENGINES" */}
              <div className="sm:col-span-3 flex sm:items-end h-full">
                <button
                  type="submit"
                  disabled={isRunning}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-75 disabled:hover:scale-100"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>ENGINES RUNNING...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-black text-black group-hover:translate-x-0.5 transition" />
                      <span>RUN 18 ENGINES</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quick 1-Click Preset Niches */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono mr-1">Hot Niches:</span>
              {PRESET_NICHES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset.location, preset.category)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-black/40 hover:bg-amber-400/15 border border-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-amber-200 transition cursor-pointer flex items-center gap-1"
                >
                  <span>{preset.icon}</span>
                  <span>{preset.category} ({preset.location.split(',')[0]})</span>
                </button>
              ))}
            </div>

            {/* Live Progress Bar when Running */}
            {isRunning && (
              <div className="pt-2 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-amber-300 font-mono mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    Executing Engine #{activeEngineStep?.id || 1}: {activeEngineStep?.name || 'Initializing'}
                  </span>
                  <span>{engineProgressPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/70 border border-amber-500/30 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-200"
                    style={{ width: `${engineProgressPct}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>
        </section>

        {/* SUMMARY STATS & VIEW SWITCHER (Mobile / Tablet controls) */}
        {empireData && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <strong>{empireData.location}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                Category: <strong>{empireData.category}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono font-bold">
                Opportunity: {empireData.overallOpportunityScore}/100
              </span>
            </div>

            {/* Mobile View Toggle Buttons */}
            <div className="flex lg:hidden items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setMobileTab('col1')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  mobileTab === 'col1' ? 'bg-amber-400 text-black' : 'text-zinc-400'
                }`}
              >
                Col 1
              </button>
              <button
                onClick={() => setMobileTab('col2')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  mobileTab === 'col2' ? 'bg-amber-400 text-black' : 'text-zinc-400'
                }`}
              >
                Col 2
              </button>
              <button
                onClick={() => setMobileTab('col3')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  mobileTab === 'col3' ? 'bg-amber-400 text-black' : 'text-zinc-400'
                }`}
              >
                Col 3
              </button>
              <button
                onClick={() => setMobileTab('stacked')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  mobileTab === 'stacked' ? 'bg-amber-400 text-black' : 'text-zinc-400'
                }`}
              >
                All 3
              </button>
            </div>
          </div>
        )}

        {/* 3 COLUMNS RESPONSIVE ENGINE LAYOUT */}
        {empireData ? (
          <div>
            {/* DESKTOP (1280px+): 3 Columns Side-by-Side */}
            <div className="hidden xl:grid grid-cols-3 gap-5 items-start">
              {/* COL 1: SCANNER */}
              <ScannerColumn data={empireData} />

              {/* COL 2: GAP DETECTOR */}
              <GapDetectorColumn data={empireData} />

              {/* COL 3: POWER MAKER */}
              <PowerMakerColumn data={empireData} />
            </div>

            {/* TABLET (768px - 1279px): 2 Columns Grid + 3rd below */}
            <div className="hidden md:grid xl:hidden grid-cols-2 gap-5 items-start">
              {/* Col 1 */}
              <ScannerColumn data={empireData} />

              {/* Col 2 */}
              <GapDetectorColumn data={empireData} />

              {/* Col 3 spans both columns on tablet */}
              <div className="col-span-2 pt-2 border-t border-white/5">
                <PowerMakerColumn data={empireData} />
              </div>
            </div>

            {/* MOBILE (< 768px): Responsive Switching or Stacked */}
            <div className="block md:hidden">
              {mobileTab === 'col1' && <ScannerColumn data={empireData} />}
              {mobileTab === 'col2' && <GapDetectorColumn data={empireData} />}
              {mobileTab === 'col3' && <PowerMakerColumn data={empireData} />}
              {mobileTab === 'stacked' && (
                <div className="space-y-6">
                  <ScannerColumn data={empireData} />
                  <div className="border-t border-amber-500/20 pt-4">
                    <GapDetectorColumn data={empireData} />
                  </div>
                  <div className="border-t border-amber-500/20 pt-4">
                    <PowerMakerColumn data={empireData} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Loading Placeholder */
          <div className="glass-gold rounded-3xl p-12 text-center border border-amber-500/30">
            <RefreshCw className="w-10 h-10 animate-spin text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-cinzel font-bold text-amber-300">Initializing 18 Intelligence Engines...</h3>
            <p className="text-xs text-zinc-400 mt-1">Connecting to Places API radar, gap detectors, and power makers.</p>
          </div>
        )}

      </main>

      {/* MOBILE STICKY BOTTOM NAVIGATION (ALL DEVICES ENGINE RULE) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B10]/95 backdrop-blur-xl border-t border-amber-500/30 px-2 py-2">
        <div className="grid grid-cols-4 gap-1 text-center">
          <button
            onClick={() => setMobileTab('col1')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition cursor-pointer ${
              mobileTab === 'col1' ? 'text-amber-300 bg-amber-400/15' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Radar className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">Scanner</span>
          </button>
          
          <button
            onClick={() => setMobileTab('col2')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition cursor-pointer ${
              mobileTab === 'col2' ? 'text-amber-300 bg-amber-400/15' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <KeyRound className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">Gaps & KW</span>
          </button>

          <button
            onClick={() => setMobileTab('col3')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition cursor-pointer ${
              mobileTab === 'col3' ? 'text-amber-300 bg-amber-400/15' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Crown className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">Power Maker</span>
          </button>

          <button
            onClick={() => setShow18EnginesModal(true)}
            className="flex flex-col items-center justify-center py-1.5 rounded-xl text-zinc-400 hover:text-amber-300 transition cursor-pointer"
          >
            <Zap className="w-4 h-4 mb-0.5 text-amber-400" />
            <span className="text-[10px] font-bold">18 Engines</span>
          </button>
        </div>
      </nav>

      {/* ENGINE 18: WORLD WIDE WELCOME AI ASSISTANT (Floating Avatar bottom right, black suit gold tie, salute animation) */}
      <WelcomeAssistant
        onRunPreset={(newLoc, newCat) => {
          setLocation(newLoc);
          setCategory(newCat);
          handleRunEngines(newLoc, newCat);
        }}
      />

      {/* 18 ENGINES MASTER RADAR MODAL */}
      {show18EnginesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl glass-gold p-6 border border-amber-400/40 bg-[#0E0E14] text-zinc-100 shadow-2xl relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setShow18EnginesModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white bg-white/5"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-cinzel font-bold text-amber-300">The 18 Automated Intelligence Engines</h3>
                <p className="text-xs text-zinc-400">Complete pipeline for Google My Business & Maps Domination</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {ALL_18_ENGINES.map((eng) => (
                <div
                  key={eng.id}
                  className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 font-mono font-bold text-[11px] flex items-center justify-center">
                      #{eng.id}
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100 block">{eng.name}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {eng.column === 'COL1' ? 'Column 1: Scanner' : eng.column === 'COL2' ? 'Column 2: Gap Detector' : 'Column 3: Power Maker'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    OPERATIONAL
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShow18EnginesModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition cursor-pointer"
              >
                Close Engines HUD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API KEYS MODAL */}
      <ApiKeysModal
        isOpen={showApiKeysModal}
        onClose={() => setShowApiKeysModal(false)}
        onSaveKeys={handleSaveKeys}
        initialGoogleKey={googleKey}
        initialClaudeKey={claudeKey}
      />

      {/* EXPORT REPORT MODAL */}
      {empireData && (
        <ExportReportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          data={empireData}
        />
      )}

    </div>
  );
}
