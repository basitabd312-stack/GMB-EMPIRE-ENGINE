import React, { useState } from 'react';
import { EmpireScanResult } from '../../types/empire';
import { Download, Copy, Check, X, FileText, Printer } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EmpireScanResult;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    return `# GMB EMPIRE ENGINE - 18 ENGINES AUDIT & LAUNCH REPORT
Location: ${data.location}
Category: ${data.category}
Generated At: ${data.scanTimestamp}
Opportunity Score: ${data.overallOpportunityScore}/100

============================================================
COL 1: SCANNER (PLACES API RADAR)
============================================================
• Total Competitors Analyzed: ${data.scanner.totalCompetitorsFound}
• Proximity Radius: ${data.scanner.geoGridRadius}
• Centroid Dropoff: ${data.scanner.averageProximityDropoff}

TOP 3 MAP PACK COMPETITORS:
${data.scanner.top3MapPack.map(c => `  - Rank #${c.rank}: ${c.name} (${c.rating}★, ${c.reviewsCount} reviews, +${c.reviewVelocityPerMonth}/mo velocity)
    Weakness: ${c.biggestWeakness}
    Takeover Strategy: ${c.takeoverStrategy}`).join('\n\n')}

UNCLAIMED HIGH-OPPORTUNITY LISTINGS:
${data.scanner.unclaimedListings.map(u => `  - ${u.name} | Phone: ${u.phone} | Status: ${u.claimStatus} | Opp Score: ${u.opportunityScore}/100
    Vulnerability: ${u.vulnerabilityFactor}`).join('\n')}

============================================================
COL 2: GAP DETECTOR (TOP 10 KEYWORDS & DEFICITS)
============================================================
TOP 10 KEYWORDS:
${data.gapDetector.top10Keywords.map(k => `  #${k.rank} "${k.keyword}" - Vol: ${k.monthlyVolume} | CPC: ${k.cpc} | Intent: ${k.intent}`).join('\n')}

CRITICAL CATEGORY GAPS:
${data.gapDetector.categoryGaps.map(cg => `  - ${cg.category} (${cg.type}) | Adoption: ${cg.competitorAdoptionPct}% | Potential: ${cg.trafficPotential}`).join('\n')}

============================================================
COL 3: POWER MAKER (3 UNIQUE BUSINESSES WITH 30% TWIST)
============================================================
${data.powerMaker.businesses.map((b, idx) => `
------------------------------------------------------------
BUSINESS #${idx + 1}: ${b.businessName} (${b.conceptTag})
------------------------------------------------------------
30% UNFAIR ADVANTAGE TWIST:
"${b.advantageTwist30Pct.headline}"
Details: ${b.advantageTwist30Pct.details}
Psychological Hook: ${b.advantageTwist30Pct.psychologicalHook}

750-CHAR GMB DESCRIPTION (${b.gmbDescription750.charCount}/750 chars):
${b.gmbDescription750.text}

10 HIGH-INTENT SERVICES:
${b.services10.map((s, i) => `  ${i + 1}. ${s.name} [${s.priceGuide}] - ${s.benefit}`).join('\n')}

5 HIGH-CTR GOOGLE POSTS:
${b.posts5.map((p, i) => `  Post #${i + 1} (${p.type}): "${p.title}"
  ${p.body}
  CTA Button: ${p.ctaButton}`).join('\n\n')}

3 PHOTO GENERATION PROMPTS:
${b.photoPrompts3.map((ph, i) => `  Photo #${i + 1} [${ph.gmbTabCategory}]: ${ph.angleTitle}
  Prompt: "${ph.prompt}"
  EXIF Simulation: ${ph.geoTagExifSimulation}`).join('\n\n')}
`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GMB_Empire_${data.location.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl glass-gold p-6 border border-amber-400/40 bg-[#0E0E14] text-zinc-100 shadow-2xl relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-cinzel font-bold text-amber-300">Export Empire Dossier</h3>
            <p className="text-xs text-zinc-400">Complete 18-Engine Intelligence Report for {data.location}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto rounded-xl bg-black/70 p-4 border border-white/10 font-mono text-[11px] text-zinc-300 space-y-1 select-all whitespace-pre-wrap">
          {generateMarkdown()}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold hover:opacity-95 transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Full Dossier!' : 'Copy Full Markdown'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
