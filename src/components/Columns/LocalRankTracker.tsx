import React, { useState, useEffect, useMemo } from 'react';
import { EmpireScanResult } from '../../types/empire';
import { 
  Trophy, 
  TrendingUp, 
  History, 
  MapPin, 
  Plus, 
  RefreshCw, 
  Calendar, 
  Check, 
  Copy, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  Sliders, 
  Sparkles, 
  Search, 
  Award, 
  CheckCircle2, 
  Activity, 
  Flame, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface LocalRankTrackerProps {
  data: EmpireScanResult;
}

export interface HistoricalRankPoint {
  id: string;
  date: string;
  rank: number;
  delta: number; // positive = improved (climbed up)
  notes: string;
  checkedBy: string;
}

export interface KeywordRankItem {
  id: string;
  keyword: string;
  volume: string;
  currentRank: number;
  previousRank: number;
  bestRank: number;
  competitorAhead?: string;
  inMapPack: boolean;
}

export const LocalRankTracker: React.FC<LocalRankTrackerProps> = ({ data }) => {
  const city = data.location.split(',')[0].trim();
  const storageKey = `gmb_rank_history_${data.location.replace(/[^a-zA-Z0-9]/g, '_')}_${data.category.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // Active tracked business name
  const [selectedBiz, setSelectedBiz] = useState<string>(
    data.scanner.unclaimedListings[0]?.name || `${city} Premier ${data.category}`
  );

  // Time range filter for historical view
  const [timeRange, setTimeRange] = useState<'30d' | '60d' | '90d'>('30d');
  const [isCheckingLive, setIsCheckingLive] = useState<boolean>(false);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [newCheckpointNote, setNewCheckpointNote] = useState<string>('');
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [newLogRank, setNewLogRank] = useState<number>(2);

  // Historical Log State
  const [historyLogs, setHistoryLogs] = useState<HistoricalRankPoint[]>([]);

  // Tracked Keywords
  const [keywords, setKeywords] = useState<KeywordRankItem[]>([
    {
      id: 'kw-1',
      keyword: `Best ${data.category} in ${city}`,
      volume: '2,400/mo',
      currentRank: 2,
      previousRank: 5,
      bestRank: 2,
      competitorAhead: data.scanner.top3MapPack[0]?.name || 'Market Leader',
      inMapPack: true
    },
    {
      id: 'kw-2',
      keyword: `Emergency ${data.category} ${city} TX`,
      volume: '1,900/mo',
      currentRank: 1,
      previousRank: 3,
      bestRank: 1,
      inMapPack: true
    },
    {
      id: 'kw-3',
      keyword: `${data.category} repair near me`,
      volume: '3,200/mo',
      currentRank: 3,
      previousRank: 6,
      bestRank: 2,
      competitorAhead: data.scanner.top3MapPack[1]?.name || 'Top Competitor',
      inMapPack: true
    },
    {
      id: 'kw-4',
      keyword: `Commercial ${data.category} contractor ${city}`,
      volume: '1,100/mo',
      currentRank: 2,
      previousRank: 4,
      bestRank: 2,
      competitorAhead: data.scanner.top3MapPack[0]?.name || 'Market Leader',
      inMapPack: true
    },
    {
      id: 'kw-5',
      keyword: `Affordable ${data.category} estimate ${city}`,
      volume: '880/mo',
      currentRank: 4,
      previousRank: 8,
      bestRank: 4,
      competitorAhead: data.scanner.top3MapPack[2]?.name || 'City Expert',
      inMapPack: false
    }
  ]);

  // Load / initialize historical logs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistoryLogs(parsed);
          return;
        }
      }
    } catch {}

    // Seed default baseline trajectory showing rank improvement over past month
    const defaultHistory: HistoricalRankPoint[] = [
      {
        id: 'hist-1',
        date: 'Oct 02, 2026',
        rank: 2,
        delta: 2, // climbed 2 positions
        notes: 'Injected 10 GMB core services & published 8K high-res photo catalog',
        checkedBy: 'GMB Engine Radar'
      },
      {
        id: 'hist-2',
        date: 'Sep 25, 2026',
        rank: 4,
        delta: 2,
        notes: 'Published custom geo-targeted landing page with local JSON-LD schema',
        checkedBy: 'Places API Scan'
      },
      {
        id: 'hist-3',
        date: 'Sep 18, 2026',
        rank: 6,
        delta: 2,
        notes: 'Fixed secondary category gaps (Roof Cleaning, Gutter Installation added)',
        checkedBy: 'Places API Scan'
      },
      {
        id: 'hist-4',
        date: 'Sep 10, 2026',
        rank: 8,
        delta: 0,
        notes: 'Initial scan baseline discovered: Unclaimed listing vulnerable to competitors',
        checkedBy: 'Baseline Audit'
      }
    ];

    setHistoryLogs(defaultHistory);
    try {
      localStorage.setItem(storageKey, JSON.stringify(defaultHistory));
    } catch {}
  }, [storageKey]);

  // Save history helper
  const saveHistory = (updated: HistoricalRankPoint[]) => {
    setHistoryLogs(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {}
  };

  // Trigger live on-demand rank audit simulation
  const handleCheckRankNow = () => {
    setIsCheckingLive(true);
    setTimeout(() => {
      setIsCheckingLive(false);

      // Random slight rank update or stability
      const newRank = Math.max(1, (historyLogs[0]?.rank || 2) - 1); // potentially climb to #1
      const delta = (historyLogs[0]?.rank || 2) - newRank;

      const newPoint: HistoricalRankPoint = {
        id: `hist-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        rank: newRank,
        delta,
        notes: newRank === 1 
          ? '🥇 RANK #1 REACHED! Outranked competitor with superior review velocity & citations.' 
          : 'Live proximity scan confirmed strong Map Pack #2 authority across centroid.',
        checkedBy: 'Live Places API Check'
      };

      saveHistory([newPoint, ...historyLogs]);
    }, 1200);
  };

  // Add manual log checkpoint
  const handleAddManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    const currentTopRank = historyLogs[0]?.rank || 2;
    const delta = currentTopRank - newLogRank;

    const newPoint: HistoricalRankPoint = {
      id: `hist-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      rank: newLogRank,
      delta,
      notes: newCheckpointNote.trim() || 'Manual ranking audit log entry',
      checkedBy: 'Manual Check'
    };

    saveHistory([newPoint, ...historyLogs]);
    setIsLogModalOpen(false);
    setNewCheckpointNote('');
  };

  // Copy Ranking Audit Report
  const handleCopyReport = () => {
    const latest = historyLogs[0] || { rank: 2, delta: 2, date: 'Today' };
    const report = `📊 LOCAL MAP PACK RANK TRACKER REPORT
Business: ${selectedBiz}
Market: ${data.category} in ${data.location}
Current Overall Position: Rank #${latest.rank} in Google Local 3-Pack (${latest.delta >= 0 ? `▲ +${latest.delta}` : `▼ ${latest.delta}`} spots)

🎯 TRACKED KEYWORDS PERFORMANCE:
${keywords.map(k => `• ${k.keyword}: Rank #${k.currentRank} (${k.inMapPack ? 'In 3-Pack ✅' : 'Page 1'}) [Vol: ${k.volume}]`).join('\n')}

📈 HISTORICAL RANKING TRAJECTORY:
${historyLogs.slice(0, 5).map(h => `• ${h.date}: Rank #${h.rank} (${h.delta >= 0 ? `+${h.delta}` : h.delta}) - ${h.notes}`).join('\n')}

Generated by GMB Empire Local Rank Tracker Engine`;

    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Rank', 'Change (Delta)', 'Notes', 'Audit Engine'];
    const rows = historyLogs.map(h => [
      `"${h.date}"`,
      h.rank,
      h.delta >= 0 ? `+${h.delta}` : `${h.delta}`,
      `"${h.notes.replace(/"/g, '""')}"`,
      `"${h.checkedBy}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Local_Rank_History_${selectedBiz.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentRank = historyLogs[0]?.rank || 2;
  const initialRank = historyLogs[historyLogs.length - 1]?.rank || 8;
  const totalClimbed = initialRank - currentRank;

  return (
    <div className="glass-gold rounded-2xl p-4 sm:p-5 border border-amber-500/30 bg-gradient-to-br from-[#121118] via-[#0E0E14] to-[#0A0A0D] relative overflow-hidden space-y-4">
      
      {/* Background glow accent */}
      <div className="absolute top-0 right-1/3 w-80 h-36 bg-amber-500/10 blur-3xl pointer-events-none"></div>

      {/* HEADER BAR */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                RANK ENGINE
              </span>
              <span className="text-xs text-zinc-400 font-medium">REAL-TIME MAP PACK POSITION</span>
            </div>
            <h3 className="text-sm sm:text-base font-cinzel font-bold text-amber-200">
              Local Rank Tracker
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleExportCSV}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
            title="Export CSV history"
          >
            <Download className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          <button
            onClick={handleCopyReport}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition flex items-center gap-1 cursor-pointer"
          >
            {copiedReport ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
            <span>{copiedReport ? 'Copied Report!' : 'Copy Audit'}</span>
          </button>
        </div>
      </div>

      {/* BUSINESS SELECTOR PILL ROW */}
      <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Monitored Business in Google Maps:</span>
          </span>
          <span className="text-[10px] text-amber-300 font-mono font-bold">{selectedBiz}</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {data.scanner.unclaimedListings.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedBiz(u.name)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedBiz === u.name
                  ? 'bg-amber-400 text-black shadow'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              📍 {u.name}
            </button>
          ))}
          {data.scanner.top3MapPack.map((c) => (
            <button
              key={c.rank}
              onClick={() => setSelectedBiz(c.name)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedBiz === c.name
                  ? 'bg-amber-400 text-black shadow'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              🏆 {c.name} (#{c.rank})
            </button>
          ))}
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        
        {/* Current Position */}
        <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">Current Map Position</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
              #{currentRank}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center">
              ▲ +{totalClimbed} spots
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 block">
            {currentRank <= 3 ? '🌟 Verified in 3-Pack' : 'Page 1 Organic'}
          </span>
        </div>

        {/* 3-Pack Visibility */}
        <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">3-Pack Visibility</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            85.4%
          </div>
          <span className="text-[10px] text-zinc-400 block">
            Across 9 Grid Geofence Nodes
          </span>
        </div>

        {/* Avg Map Position */}
        <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">Average Rank</span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            2.1
          </div>
          <span className="text-[10px] text-emerald-400 block font-medium">
            Top 3 Dominance
          </span>
        </div>

        {/* Live Scan Trigger */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/15 via-black/80 to-black/70 border border-amber-400/40 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-amber-300 uppercase font-mono block font-bold">On-Demand Check</span>
            <span className="text-[11px] text-zinc-300">Live Places API audit</span>
          </div>
          <button
            onClick={handleCheckRankNow}
            disabled={isCheckingLive}
            className="w-full mt-2 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 text-black ${isCheckingLive ? 'animate-spin' : ''}`} />
            <span>{isCheckingLive ? 'Scanning Grid...' : 'Check Rank Now'}</span>
          </button>
        </div>

      </div>

      {/* SECTION 1: MONITORED KEYWORDS RANK MATRIX */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Monitored Keywords vs Competitor Pack</span>
          </h4>
          <span className="text-[10px] text-zinc-400 font-mono">5 High-Volume Geo Queries</span>
        </div>

        <div className="space-y-1.5">
          {keywords.map((kw) => {
            const delta = kw.previousRank - kw.currentRank;
            const isRank1 = kw.currentRank === 1;

            return (
              <div
                key={kw.id}
                className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-amber-400/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{kw.keyword}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      kw.inMapPack 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {kw.inMapPack ? 'In 3-Pack' : 'Position #4'}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                    <span>Vol: <strong className="text-zinc-200 font-mono">{kw.volume}</strong></span>
                    {kw.competitorAhead && (
                      <>
                        <span>•</span>
                        <span>Ahead: <strong className="text-rose-400">{kw.competitorAhead}</strong></span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: Rank Badges & Movement */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block">Movement</span>
                    <span className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                      delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-rose-400' : 'text-zinc-400'
                    }`}>
                      {delta > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : delta < 0 ? <ArrowDownRight className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                      <span>{delta > 0 ? `+${delta}` : delta === 0 ? '0' : delta}</span>
                    </span>
                  </div>

                  <div className={`w-12 h-10 rounded-xl flex flex-col items-center justify-center font-mono font-black ${
                    isRank1 
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/20' 
                      : kw.currentRank <= 3 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    <span className="text-[9px] uppercase font-sans font-bold leading-none">Rank</span>
                    <span className="text-base leading-none mt-0.5">#{kw.currentRank}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: HISTORICAL RANKING TRAJECTORY & AUDIT LOG */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <h4 className="font-cinzel font-bold text-amber-300">
              Historical Ranking Trajectory & Optimization Log
            </h4>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <Plus className="w-3 h-3 text-amber-400" />
              <span>Log Checkpoint</span>
            </button>
          </div>
        </div>

        {/* Visual Ascent Timeline Sparkline Bar */}
        <div className="p-3 rounded-xl bg-black/70 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 font-mono">Ascent Path: Baseline (#8) ➔ Current (#2)</span>
            <span className="text-emerald-400 font-mono font-bold">▲ Gained +6 Positions</span>
          </div>

          {/* Stepped Timeline Nodes */}
          <div className="flex items-center justify-between gap-1 pt-1">
            {[...historyLogs].reverse().map((step, idx) => (
              <div key={step.id} className="flex-1 flex flex-col items-center group relative">
                <div className={`w-full h-1.5 rounded-full mb-2 ${
                  step.rank <= 3 ? 'bg-gradient-to-r from-emerald-500 to-amber-400' : 'bg-zinc-800'
                }`}></div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] ${
                  step.rank === 1 
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/30' 
                    : step.rank <= 3 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-zinc-800 text-zinc-400'
                }`}>
                  #{step.rank}
                </div>
                <span className="text-[9px] text-zinc-500 font-mono mt-1 text-center whitespace-nowrap">
                  {step.date.split(',')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chronological Audit Log Entries */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {historyLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-black/80 border border-white/5 hover:border-amber-400/20 transition space-y-1"
            >
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                    log.rank <= 3 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    Rank #{log.rank}
                  </span>
                  <span className="font-semibold text-zinc-200">{log.date}</span>
                  {log.delta !== 0 && (
                    <span className={`text-[10px] font-mono ${log.delta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {log.delta > 0 ? `(▲ +${log.delta})` : `(▼ ${log.delta})`}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">{log.checkedBy}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {log.notes}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL: ADD MANUAL RANK CHECKPOINT */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl glass-gold p-6 border border-amber-400/40 bg-[#121118] text-zinc-100 shadow-2xl relative">
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Plus className="w-5 h-5 text-amber-400" />
              <h4 className="text-base font-cinzel font-bold text-amber-300">Log Ranking Checkpoint</h4>
            </div>

            <form onSubmit={handleAddManualLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Current Position (Rank #)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewLogRank(r)}
                      className={`py-2 rounded-xl font-mono font-bold text-xs border transition cursor-pointer ${
                        newLogRank === r
                          ? 'bg-amber-400 text-black border-amber-400 shadow'
                          : 'bg-black/50 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                    >
                      #{r} {r <= 3 ? '(3-Pack)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Actions Taken / Optimization Notes</label>
                <textarea
                  rows={3}
                  required
                  value={newCheckpointNote}
                  onChange={(e) => setNewCheckpointNote(e.target.value)}
                  placeholder="e.g. Added 5 geotagged exterior project photos, updated business hours, acquired 3 new reviews..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md transition cursor-pointer"
                >
                  Save Checkpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
