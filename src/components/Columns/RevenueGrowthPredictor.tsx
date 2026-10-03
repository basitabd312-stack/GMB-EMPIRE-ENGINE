import React, { useState, useMemo } from 'react';
import { EmpireScanResult } from '../../types/empire';
import { 
  TrendingUp, 
  DollarSign, 
  Search, 
  PhoneCall, 
  BarChart3, 
  ArrowUpRight, 
  Sliders, 
  CheckCircle2, 
  Copy, 
  Check, 
  Zap, 
  Crown, 
  Sparkles,
  Percent,
  Layers,
  Flame,
  Info
} from 'lucide-react';

interface RevenueGrowthPredictorProps {
  data: EmpireScanResult;
}

// Local 3-Pack and Google Maps Industry CTR Curve
const CTR_BY_RANK: Record<number, number> = {
  1: 38.6, // Rank 1 captures ~38.6% of clicks/calls in 3-Pack
  2: 19.2, // Rank 2 captures ~19.2%
  3: 11.4, // Rank 3 captures ~11.4%
  4: 4.8,  // Top of expanded places
  5: 3.6,
  7: 2.2,
  10: 1.4,
  15: 0.8,
  20: 0.3
};

const getCTRForRank = (rank: number): number => {
  if (rank <= 1) return 38.6;
  if (rank === 2) return 19.2;
  if (rank === 3) return 11.4;
  if (rank <= 5) return 4.2;
  if (rank <= 10) return 2.0;
  if (rank <= 15) return 0.9;
  return 0.3;
};

export const RevenueGrowthPredictor: React.FC<RevenueGrowthPredictorProps> = ({ data }) => {
  // Input parameters
  const [selectedBusinessName, setSelectedBusinessName] = useState<string>('Custom Business');
  const [currentRank, setCurrentRank] = useState<number>(7);
  const [targetRank, setTargetRank] = useState<number>(1);
  const [monthlySearchVolume, setMonthlySearchVolume] = useState<number>(4500);
  const [averageTicket, setAverageTicket] = useState<number>(1850);
  const [callConversionRate, setCallConversionRate] = useState<number>(24); // % of clicks that become a phone lead
  const [closeRate, setCloseRate] = useState<number>(30); // % of leads closed
  const [copiedProposal, setCopiedProposal] = useState<boolean>(false);

  // Handle selecting a discovered business from scan
  const handleSelectDiscoveredBiz = (name: string, defaultRank: number) => {
    setSelectedBusinessName(name);
    setCurrentRank(defaultRank);
  };

  // Computations
  const stats = useMemo(() => {
    const currentCTR = getCTRForRank(currentRank);
    const targetCTR = getCTRForRank(targetRank);

    // Monthly Clicks / Profile Engagements
    const currentClicks = Math.round(monthlySearchVolume * (currentCTR / 100));
    const targetClicks = Math.round(monthlySearchVolume * (targetCTR / 100));
    const netClicksGain = Math.max(0, targetClicks - currentClicks);

    // Monthly Phone Calls / Direct Leads
    const currentLeads = Math.round(currentClicks * (callConversionRate / 100));
    const targetLeads = Math.round(targetClicks * (callConversionRate / 100));
    const netLeadsGain = Math.max(0, targetLeads - currentLeads);

    // Closed Paying Customers
    const currentCustomers = Math.round(currentLeads * (closeRate / 100));
    const targetCustomers = Math.round(targetLeads * (closeRate / 100));
    const netCustomersGain = Math.max(0, targetCustomers - currentCustomers);

    // Monthly & Annual Revenue
    const currentRevenue = currentCustomers * averageTicket;
    const targetRevenue = targetCustomers * averageTicket;
    const netMonthlyRevenue = Math.max(0, targetRevenue - currentRevenue);
    const netAnnualRevenue = netMonthlyRevenue * 12;

    // Traffic Multiplier Factor
    const multiplier = currentClicks > 0 ? (targetClicks / currentClicks).toFixed(1) : '15.0';

    return {
      currentCTR,
      targetCTR,
      currentClicks,
      targetClicks,
      netClicksGain,
      currentLeads,
      targetLeads,
      netLeadsGain,
      currentCustomers,
      targetCustomers,
      netCustomersGain,
      currentRevenue,
      targetRevenue,
      netMonthlyRevenue,
      netAnnualRevenue,
      multiplier
    };
  }, [currentRank, targetRank, monthlySearchVolume, averageTicket, callConversionRate, closeRate]);

  const copyExecutiveSummary = () => {
    const text = `🏆 GMB EMPIRE REVENUE GROWTH PREDICTION
Market: ${data.category} in ${data.location}
Baseline Rank: #${currentRank} (${stats.currentCTR}% CTR)
Target Map Pack Rank: #${targetRank} (${stats.targetCTR}% CTR)

📊 PROJECTED METRICS:
• Monthly Local Searches: ${monthlySearchVolume.toLocaleString()}
• Current Monthly Leads: ${stats.currentLeads} calls/mo ($${stats.currentRevenue.toLocaleString()}/mo)
• Target Map Pack Leads: ${stats.targetLeads} calls/mo ($${stats.targetRevenue.toLocaleString()}/mo)
----------------------------------------
🚀 NET GROWTH OPPORTUNITY:
• Additional High-Intent Calls: +${stats.netLeadsGain} calls/month (${stats.multiplier}x increase)
• Additional Closed Deals: +${stats.netCustomersGain} clients/month
• Net Monthly Revenue Gain: +$${stats.netMonthlyRevenue.toLocaleString()} / month
• Annualized New Pipeline: +$${stats.netAnnualRevenue.toLocaleString()} / year

Generated via GMB Empire Radar Intelligence`;

    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  return (
    <div className="glass-gold rounded-2xl p-4 sm:p-5 border border-amber-500/30 bg-gradient-to-br from-[#121118] via-[#0E0E14] to-[#0A0A0D] relative overflow-hidden space-y-4">
      
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-72 h-36 bg-amber-500/10 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow">
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                GROWTH ENGINE
              </span>
              <span className="text-xs text-zinc-400 font-medium">CTR & PIPELINE CALCULATOR</span>
            </div>
            <h3 className="text-sm sm:text-base font-cinzel font-bold text-amber-200">
              Revenue Growth Predictor
            </h3>
          </div>
        </div>

        <button
          onClick={copyExecutiveSummary}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
        >
          {copiedProposal ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
          <span>{copiedProposal ? 'Copied Pitch!' : 'Copy Forecast'}</span>
        </button>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed">
        Model potential monthly phone calls and revenue unlock for <strong>{data.category}</strong> in <strong>{data.location}</strong> based on Google Maps 3-Pack average click-through rates (CTR):
      </p>

      {/* TOP VALUE CARDS (THE BIG RESULTS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">Net New Calls</span>
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono flex items-baseline gap-1">
            <span>+{stats.netLeadsGain}</span>
            <span className="text-[10px] text-zinc-500 font-sans font-normal">/mo</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>{stats.multiplier}x Volume Gain</span>
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">New Deals Closed</span>
          <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-baseline gap-1">
            <span>+{stats.netCustomersGain}</span>
            <span className="text-[10px] text-zinc-500 font-sans font-normal">/mo</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-medium">
            At {closeRate}% Close Rate
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 via-black/80 to-black/70 border border-amber-400/40 space-y-1 shadow-lg shadow-amber-500/10">
          <span className="text-[10px] text-amber-300 uppercase font-mono block font-bold">Monthly Revenue Unlock</span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
            +${stats.netMonthlyRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-amber-300/80 font-medium">
            Every Single Month
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-black/80 to-black/70 border border-emerald-500/40 space-y-1 shadow-lg shadow-emerald-500/10">
          <span className="text-[10px] text-emerald-300 uppercase font-mono block font-bold">Annualized Pipeline</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            +${stats.netAnnualRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-300/80 font-medium">
            12-Month Total Run-Rate
          </span>
        </div>
      </div>

      {/* INTERACTIVE CONTROLS & SLIDERS */}
      <div className="p-4 rounded-2xl bg-black/70 border border-white/10 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="font-bold text-zinc-200 font-cinzel flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Customize Local Market Parameters</span>
          </span>
          <span className="text-[10px] text-zinc-400">Live dynamic recalculation</span>
        </div>

        {/* Discovered Business Selector */}
        <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Select Discovered Business from Scan:</span>
            </span>
            <span className="text-[10px] text-amber-300 font-mono font-bold truncate max-w-[200px]">{selectedBusinessName}</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            <button
              type="button"
              onClick={() => handleSelectDiscoveredBiz('Custom Prospect / Your Business', 7)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedBusinessName.includes('Custom')
                  ? 'bg-amber-400 text-black shadow'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              Default / Custom
            </button>
            {data.scanner.unclaimedListings.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectDiscoveredBiz(item.name, 9 + idx)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedBusinessName === item.name
                    ? 'bg-amber-400 text-black shadow'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                📍 {item.name}
              </button>
            ))}
            {data.scanner.top3MapPack.map((comp) => (
              <button
                key={comp.rank}
                type="button"
                onClick={() => handleSelectDiscoveredBiz(comp.name, comp.rank)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedBusinessName === comp.name
                    ? 'bg-amber-400 text-black shadow'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                🏆 #{comp.rank} {comp.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Current Rank vs Target Rank */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-zinc-300 font-medium">Current Business Rank in Google Maps:</span>
                <span className="font-mono font-bold text-amber-300">
                  {currentRank === 1 ? 'Rank #1 (Leader)' : currentRank <= 3 ? `Rank #${currentRank} (In Map Pack)` : `Rank #${currentRank} (Below Fold / Page 2)`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={currentRank}
                onChange={(e) => setCurrentRank(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>#1 Map Pack</span>
                <span>#3 Threshold</span>
                <span>#10 Invisible</span>
                <span>#20 Deep</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-zinc-300 font-medium">Target Map Pack Goal:</span>
                <span className="font-mono font-bold text-emerald-400">Rank #{targetRank} (Map Pack Peak)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTargetRank(r)}
                    className={`py-1.5 rounded-xl text-xs font-mono font-bold border transition cursor-pointer flex items-center justify-center gap-1 ${
                      targetRank === r
                        ? 'bg-amber-400 text-black border-amber-400 shadow'
                        : 'bg-black/50 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {r === 1 && <Crown className="w-3 h-3" />}
                    <span>Rank #{r} ({getCTRForRank(r)}%)</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Volume, Ticket & Conversion */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-zinc-300 font-medium">Local Monthly Search Volume:</span>
                <span className="font-mono font-bold text-amber-300">{monthlySearchVolume.toLocaleString()} searches/mo</span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={monthlySearchVolume}
                onChange={(e) => setMonthlySearchVolume(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>1,000</span>
                <span>5,000 (Avg Metro)</span>
                <span>10,000</span>
                <span>20,000+</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-zinc-400 mb-1">Avg Deal Value ($)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    max="50000"
                    step="50"
                    value={averageTicket}
                    onChange={(e) => setAverageTicket(Number(e.target.value))}
                    className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                  />
                  <DollarSign className="w-3 h-3 text-zinc-400 absolute left-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 mb-1">Lead Close Rate (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="90"
                    step="5"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                  />
                  <Percent className="w-3 h-3 text-zinc-400 absolute left-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* VISUAL BENCHMARK CTR COMPARISON BAR */}
      <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-zinc-300 font-mono text-[11px] uppercase flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Maps 3-Pack CTR Distribution Curve</span>
          </span>
          <span className="text-[10px] text-zinc-400">Industry Standard Aggregates</span>
        </div>

        {/* Visual CTR Bars for Ranks 1 to 5 vs Current */}
        <div className="space-y-1.5">
          {[
            { rank: 1, label: 'Rank #1 Peak Position', ctr: 38.6, isTarget: targetRank === 1, isCurrent: currentRank === 1 },
            { rank: 2, label: 'Rank #2 Map Pack', ctr: 19.2, isTarget: targetRank === 2, isCurrent: currentRank === 2 },
            { rank: 3, label: 'Rank #3 Map Pack Cutoff', ctr: 11.4, isTarget: targetRank === 3, isCurrent: currentRank === 3 },
            { rank: 4, label: 'Rank #4–#7 Below the Fold', ctr: 4.8, isTarget: false, isCurrent: currentRank >= 4 && currentRank <= 7 },
            { rank: 10, label: 'Rank #8–#20 Page 2+ (Invisible)', ctr: 1.2, isTarget: false, isCurrent: currentRank >= 8 }
          ].map((row, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className={`font-mono font-bold ${row.isTarget ? 'text-emerald-400' : row.isCurrent ? 'text-rose-400' : 'text-zinc-300'}`}>
                    {row.label}
                  </span>
                  {row.isTarget && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">YOUR GOAL</span>
                  )}
                  {row.isCurrent && (
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold">CURRENT</span>
                  )}
                </span>
                <span className="font-mono text-zinc-300 font-bold">{row.ctr}% CTR (~{Math.round(monthlySearchVolume * (row.ctr / 100))} Clicks/mo)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    row.isTarget
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      : row.isCurrent
                      ? 'bg-rose-500'
                      : 'bg-gradient-to-r from-amber-400/80 to-amber-600/80'
                  }`}
                  style={{ width: `${(row.ctr / 40) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-amber-400" />
            <span>Map Pack Rank #1 captures over <strong>3x more calls</strong> than Rank #3, and <strong>18x more calls</strong> than Page 2.</span>
          </span>
        </div>
      </div>

    </div>
  );
};
