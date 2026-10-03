import React, { useState } from 'react';
import { EmpireScanResult, KeywordItem, CategoryGap, ReviewGapMetric } from '../../types/empire';
import { KeyRound, Layers, MessageSquare, Code, Copy, Check, Filter, Sparkles, TrendingUp, Search } from 'lucide-react';

interface GapDetectorColumnProps {
  data: EmpireScanResult;
}

export const GapDetectorColumn: React.FC<GapDetectorColumnProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'keywords' | 'categories' | 'reviews' | 'schema'>('all');
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const { top10Keywords, categoryGaps, reviewGaps, missingSchemaEntities, citationAuthorityDeficit } = data.gapDetector;

  const copyKeyword = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(text);
    setTimeout(() => setCopiedKeyword(null), 1800);
  };

  const copyAllKeywords = () => {
    const list = top10Keywords.map(k => `${k.rank}. ${k.keyword} (${k.monthlyVolume}, CPC: ${k.cpc})`).join('\n');
    navigator.clipboard.writeText(list);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Column Header */}
      <div className="glass-gold rounded-2xl p-4 border border-amber-500/30 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">COL 2</span>
                <span className="text-xs text-zinc-400 font-medium">COMPETITOR DEFICIT AUDIT</span>
              </div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-amber-200">
                Gap Detector & Top 10 Keywords
              </h2>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
            10 High-Intent
          </span>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
          Uncovering hidden search volume, missed secondary categories, and semantic deficiencies competitors overlook.
        </p>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 mt-3 bg-black/50 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === 'all' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Gaps
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === 'keywords' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Top 10 Keywords
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === 'categories' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === 'reviews' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Review Gaps
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === 'schema' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Schema
          </button>
        </div>
      </div>

      {/* SECTION 1: TOP 10 KEYWORDS EXTRACTOR */}
      {(activeTab === 'all' || activeTab === 'keywords') && (
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 8: Top 10 Keywords Extractor
              </h3>
            </div>
            <button
              onClick={copyAllKeywords}
              className="text-xs px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition flex items-center gap-1 cursor-pointer font-medium"
            >
              {copiedAll ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedAll ? 'All Copied' : 'Copy All 10'}</span>
            </button>
          </div>

          <div className="space-y-2">
            {top10Keywords.map((kw) => (
              <div
                key={kw.rank}
                className="p-2.5 rounded-xl bg-black/45 border border-white/10 hover:border-amber-400/40 transition flex items-center justify-between gap-2 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    #{kw.rank}
                  </span>
                  <div className="truncate">
                    <span className="text-xs font-semibold text-zinc-100 group-hover:text-amber-300 transition block truncate">
                      {kw.keyword}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                      <span className="font-mono text-emerald-400 font-medium">{kw.monthlyVolume}</span>
                      <span>•</span>
                      <span className="font-mono text-zinc-300">CPC {kw.cpc}</span>
                      <span>•</span>
                      <span className={`px-1 rounded text-[9px] ${
                        kw.intent === 'Transactional' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {kw.intent}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                    {kw.recommendedPlacement}
                  </span>
                  <button
                    onClick={() => copyKeyword(kw.keyword)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-amber-300 transition cursor-pointer"
                    title="Copy Keyword"
                  >
                    {copiedKeyword === kw.keyword ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: CATEGORY & SECONDARY CATEGORY GAPS */}
      {(activeTab === 'all' || activeTab === 'categories') && (
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 7: Category & Sub-Category Gaps
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">ALGORITHMIC BOOST</span>
          </div>

          <p className="text-xs text-zinc-400">
            Adding these secondary categories allows you to rank for additional keyword branches without cannibalization:
          </p>

          <div className="space-y-2">
            {categoryGaps.map((cat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-black/45 border border-white/10 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-100">{cat.category}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      cat.status === 'Critical Missing'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {cat.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    Used by only <strong className="text-zinc-200">{cat.competitorAdoptionPct}%</strong> of local rivals in {data.location}.
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-zinc-400 block">Traffic Potential</span>
                  <span className="text-xs font-mono font-bold text-amber-300">{cat.trafficPotential}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: REVIEW SENTIMENT & KEYWORD DEFICITS */}
      {(activeTab === 'all' || activeTab === 'reviews') && (
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 9: Review Sentiment & Deficits
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">CUSTOMER TRUST</span>
          </div>

          <div className="space-y-2.5">
            {reviewGaps.map((gap, i) => (
              <div key={i} className="p-3 rounded-xl bg-black/45 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-100">
                  <span>{gap.metric}</span>
                  <span className="text-rose-400 font-mono">{gap.topCompetitorsAvg}</span>
                </div>
                <p className="text-[11px] text-zinc-400">{gap.marketDeficit}</p>
                <div className="text-[11px] text-emerald-300 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  <strong className="text-emerald-400">Empire Fix: </strong>
                  {gap.actionableFix}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: SCHEMA & GEO-MICRODATA DEFICITS */}
      {(activeTab === 'all' || activeTab === 'schema') && (
        <div className="glass-gold rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-amber-300">
                Engine 11: Schema & Geo-Microdata
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
              SEO AUDIT
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Missing structured microdata on competitor websites that your site will exploit:
          </p>

          <div className="space-y-1.5">
            {missingSchemaEntities.map((schema, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-black/50 border border-white/5 text-xs text-zinc-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold">✕</span>
                <span>{schema}</span>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-300">
            <strong className="text-amber-400">Citation Authority Deficit: </strong>
            {citationAuthorityDeficit}
          </div>
        </div>
      )}
    </div>
  );
};
