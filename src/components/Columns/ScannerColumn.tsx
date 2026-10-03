import React, { useState } from 'react';
import { EmpireScanResult, UnclaimedListing, SABListing, TopCompetitor } from '../../types/empire';
import { SEOAuditSummary } from './SEOAuditSummary';
import { ClientCRM } from './ClientCRM';
import { RevenueGrowthPredictor } from './RevenueGrowthPredictor';
import { LocalRankTracker } from './LocalRankTracker';
import { Radar, AlertCircle, ShieldAlert, Trophy, MapPin, Phone, Star, TrendingUp, CheckCircle, Copy, ExternalLink, ChevronRight, Eye, Search, Sparkles, Users, DollarSign, Activity } from 'lucide-react';

interface ScannerColumnProps {
  data: EmpireScanResult;
  onSelectBusinessLead?: (name: string) => void;
}

export const ScannerColumn: React.FC<ScannerColumnProps> = ({ data, onSelectBusinessLead }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unclaimed' | 'sab' | 'top3' | 'seo' | 'crm' | 'revenue' | 'rankTracker'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedUnclaimed, setSelectedUnclaimed] = useState<UnclaimedListing | null>(null);

  const { unclaimedListings, sabListings, top3MapPack, totalCompetitorsFound, geoGridRadius } = data.scanner;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Column Header & Radar HUD */}
      <div className="glass-gold rounded-2xl p-4 border border-amber-500/30 relative overflow-hidden">
        {/* Subtle background radar scan glow */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-amber-400/20 bg-amber-400/5 animate-pulse pointer-events-none"></div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Radar className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">COL 1</span>
                <span className="text-xs text-zinc-400 font-medium">PLACES API SCANNER</span>
              </div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-amber-200">
                Radar & Proximity Grid
              </h2>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {totalCompetitorsFound} Targets
          </span>
        </div>

        {/* Proximity Metrics Bar */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-xs">
          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400 block">Radius Distance</span>
            <span className="font-mono font-bold text-amber-300">{geoGridRadius}</span>
          </div>
          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400 block">Centroid Drop-off</span>
            <span className="font-mono font-bold text-amber-300">{data.scanner.averageProximityDropoff}</span>
          </div>
        </div>

        {/* Internal Filter Tabs */}
        <div className="flex items-center gap-1 mt-3 bg-black/50 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === 'all' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Engines
          </button>
          <button
            onClick={() => setActiveTab('unclaimed')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'unclaimed' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Unclaimed</span>
            <span className="text-[10px] px-1 rounded-full bg-black/40 text-amber-300">{unclaimedListings.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('sab')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === 'sab' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            SAB
          </button>
          <button
            onClick={() => setActiveTab('top3')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'top3' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Top 3</span>
            <Trophy className="w-3 h-3 text-amber-500" />
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'seo' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>SEO Audit</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </button>
          <button
            onClick={() => setActiveTab('crm')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'crm' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Client CRM</span>
            <Users className="w-3 h-3 text-amber-500" />
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'revenue' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Revenue Predictor</span>
            <DollarSign className="w-3 h-3 text-amber-500" />
          </button>
          <button
            onClick={() => setActiveTab('rankTracker')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'rankTracker' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Rank Tracker</span>
            <Activity className="w-3 h-3 text-amber-500" />
          </button>
        </div>
      </div>

      {/* SECTION 1: UNCLAIMED LISTINGS HUNTER */}
      {(activeTab === 'all' || activeTab === 'unclaimed') && (
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 2: Unclaimed Listings Hunter
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase text-amber-400/90 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              High Opportunity
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Identified unmanaged or vulnerable GMB cards in <strong>{data.location}</strong>. High acquisition value:
          </p>

          <div className="space-y-2.5">
            {unclaimedListings.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-black/45 border border-white/10 hover:border-amber-400/40 transition group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-zinc-100 group-hover:text-amber-300 transition">
                        {item.name}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        item.claimStatus === 'Unclaimed'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.claimStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span className="truncate max-w-[170px]">{item.address}</span>
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-300">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {item.rating} ({item.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-zinc-400 block">Est. Revenue</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{item.potentialRevenueGain}</span>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-zinc-300 bg-white/5 p-2 rounded-lg border border-white/5">
                  <strong className="text-amber-400/90 font-medium">Vulnerability: </strong>
                  {item.vulnerabilityFactor}
                </div>

                <div className="mt-2 flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] text-zinc-400">
                    Opp Score: <strong className="text-amber-300">{item.opportunityScore}/100</strong>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard(`${item.name} - ${item.phone} - ${item.address}`, item.id)}
                      className="text-[11px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedId === item.id ? 'Copied' : 'Copy Lead'}</span>
                    </button>
                    <button
                      onClick={() => setSelectedUnclaimed(item)}
                      className="text-[11px] px-2 py-1 rounded bg-amber-400 hover:bg-amber-300 text-black font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Action Plan</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: SAB (SERVICE AREA BUSINESS) DETECTOR */}
      {(activeTab === 'all' || activeTab === 'sab') && (
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 3: SAB Boundary Detector
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">HYBRID & HIDDEN</span>
          </div>

          <div className="space-y-2.5">
            {sabListings.map((sab) => (
              <div key={sab.id} className="p-3 rounded-xl bg-black/45 border border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-zinc-100">{sab.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    sab.businessType.includes('Hybrid')
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : sab.businessType.includes('Hidden')
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {sab.businessType}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Coverage Radius: <strong className="text-amber-300 font-mono">{sab.radiusMiles} Miles</strong></span>
                  <span>Rank Efficiency: <strong className="text-emerald-400 font-mono">{sab.rankingEfficiency}%</strong></span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {sab.coverageZones.map((zone, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">
                      📍 {zone}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-zinc-300 italic pt-1 border-t border-white/5">
                  "{sab.tacticalVerdict}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TOP 3 MAP PACK BENCHMARK */}
      {(activeTab === 'all' || activeTab === 'top3') && (
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 4: Top 3 Map Pack Benchmarks
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-300 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
              GOLD BENCHMARK
            </span>
          </div>

          <div className="space-y-3">
            {top3MapPack.map((comp) => (
              <div
                key={comp.rank}
                className="p-3.5 rounded-xl bg-black/50 border border-amber-500/20 relative overflow-hidden"
              >
                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                      comp.rank === 1
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                        : comp.rank === 2
                        ? 'bg-zinc-300 text-black'
                        : 'bg-amber-800 text-zinc-100'
                    }`}>
                      #{comp.rank}
                    </span>
                    <span className="text-xs font-bold text-zinc-100 truncate max-w-[190px]">
                      {comp.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-300 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <strong>{comp.rating}</strong>
                    <span className="text-zinc-400">({comp.reviewsCount})</span>
                  </div>
                </div>

                {/* Benchmark Metrics Grid */}
                <div className="grid grid-cols-3 gap-1.5 text-[10px] py-2 border-y border-white/5 my-2">
                  <div className="bg-white/5 p-1.5 rounded text-center">
                    <span className="text-zinc-400 block">Velocity</span>
                    <span className="font-mono font-bold text-amber-300">+{comp.reviewVelocityPerMonth}/mo</span>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded text-center">
                    <span className="text-zinc-400 block">Photos</span>
                    <span className="font-mono font-bold text-zinc-200">{comp.photosCount} pics</span>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded text-center">
                    <span className="text-zinc-400 block">Citations</span>
                    <span className="font-mono font-bold text-zinc-200">{comp.citationCount}</span>
                  </div>
                </div>

                {/* Weakness & Takeover */}
                <div className="text-[11px] space-y-1">
                  <div className="text-rose-300/90">
                    <strong className="text-rose-400 font-semibold">Weakness: </strong>
                    {comp.biggestWeakness}
                  </div>
                  <div className="text-emerald-300/90 pt-1">
                    <strong className="text-emerald-400 font-semibold">Takeover Play: </strong>
                    {comp.takeoverStrategy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: SEO AUDIT SUMMARY (Top 3 Competitors H1 & Meta Keywords -> Golden Title) */}
      {(activeTab === 'all' || activeTab === 'top3' || activeTab === 'seo') && (
        <SEOAuditSummary
          top3Competitors={top3MapPack}
          location={data.location}
          category={data.category}
        />
      )}

      {/* SECTION 5: CLIENT CRM PIPELINE (Lead Status, Notes, Follow-up Reminders) */}
      {(activeTab === 'all' || activeTab === 'crm') && (
        <ClientCRM data={data} />
      )}

      {/* SECTION 6: REVENUE GROWTH PREDICTOR (Search Volume, Rank CTR & Projected Revenue) */}
      {(activeTab === 'all' || activeTab === 'revenue') && (
        <RevenueGrowthPredictor data={data} />
      )}

      {/* SECTION 7: LOCAL RANK TRACKER (Map Pack Position & Historical Ranking Logs) */}
      {(activeTab === 'all' || activeTab === 'rankTracker') && (
        <LocalRankTracker data={data} />
      )}

      {/* Action Plan Modal for Unclaimed Listing */}
      {selectedUnclaimed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl glass-gold p-6 border border-amber-400/40 bg-[#101016] text-zinc-100 shadow-2xl relative">
            <button
              onClick={() => setSelectedUnclaimed(null)}
              className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h4 className="text-base font-cinzel font-bold text-amber-300">Unclaimed Listing Seizure Guide</h4>
            </div>

            <p className="text-xs font-semibold text-zinc-200 mb-1">{selectedUnclaimed.name}</p>
            <p className="text-[11px] text-zinc-400 mb-3">{selectedUnclaimed.address} • {selectedUnclaimed.phone}</p>

            <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-2 text-xs text-zinc-300 mb-4">
              <div>
                <strong className="text-amber-400">Step 1: </strong>
                Open Google Maps, search the listing name, and click <strong>"Own this business?"</strong>.
              </div>
              <div>
                <strong className="text-amber-400">Step 2: </strong>
                Request phone/SMS OTP verification or video walkthrough verification showing permanent signage.
              </div>
              <div>
                <strong className="text-amber-400">Step 3: </strong>
                Immediately update the primary phone to your call-tracking number and link your optimized landing page.
              </div>
              <div>
                <strong className="text-amber-400">Step 4: </strong>
                Inject the 10 services and 5 Google posts generated in Column 3 to secure Rank #1.
              </div>
            </div>

            <button
              onClick={() => setSelectedUnclaimed(null)}
              className="w-full py-2 rounded-xl bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
