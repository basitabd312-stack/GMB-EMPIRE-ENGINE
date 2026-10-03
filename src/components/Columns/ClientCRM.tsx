import React, { useState, useEffect } from 'react';
import { EmpireScanResult, UnclaimedListing, TopCompetitor } from '../../types/empire';
import { 
  Users, 
  Phone, 
  Calendar, 
  Clock, 
  Plus, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Download, 
  Search, 
  MessageCircle, 
  ChevronDown, 
  DollarSign, 
  Trash2, 
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

export type LeadStatus = 'New Lead' | 'Contacted' | 'Proposal Sent' | 'Negotiating' | 'Closed Won' | 'Lost';

export interface CRMContactNote {
  id: string;
  timestamp: string;
  text: string;
}

export interface CRMLead {
  id: string;
  name: string;
  phone: string;
  address: string;
  rating: number;
  reviewsCount: number;
  potentialRevenueGain: string;
  vulnerabilityFactor: string;
  source: 'Unclaimed Listing' | 'Competitor Target' | 'Manual Lead';
  status: LeadStatus;
  notes: CRMContactNote[];
  followUpReminder?: {
    dueDate: string;
    dueTime: string;
    note: string;
    completed: boolean;
  };
  contactPerson?: string;
  email?: string;
}

interface ClientCRMProps {
  data: EmpireScanResult;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; border: string; bg: string }> = {
  'New Lead': { label: 'New Lead', color: 'text-sky-300', border: 'border-sky-500/30', bg: 'bg-sky-500/15' },
  'Contacted': { label: 'Contacted', color: 'text-amber-300', border: 'border-amber-500/30', bg: 'bg-amber-500/15' },
  'Proposal Sent': { label: 'Proposal Sent', color: 'text-purple-300', border: 'border-purple-500/30', bg: 'bg-purple-500/15' },
  'Negotiating': { label: 'Negotiating', color: 'text-yellow-300', border: 'border-yellow-500/30', bg: 'bg-yellow-500/15' },
  'Closed Won': { label: 'Closed Won', color: 'text-emerald-300', border: 'border-emerald-500/30', bg: 'bg-emerald-500/20' },
  'Lost': { label: 'Lost', color: 'text-rose-300', border: 'border-rose-500/30', bg: 'bg-rose-500/15' },
};

export const ClientCRM: React.FC<ClientCRMProps> = ({ data }) => {
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [activeFilter, setActiveFilter] = useState<'All' | LeadStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Note Input State
  const [activeNoteLeadId, setActiveNoteLeadId] = useState<string | null>(null);
  const [noteInputText, setNoteInputText] = useState('');
  
  // Reminder Modal/Dropdown State
  const [reminderLeadId, setReminderLeadId] = useState<string | null>(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('10:00 AM');
  const [reminderNote, setReminderNote] = useState('');

  // Add Custom Lead Modal State
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadAddress, setNewLeadAddress] = useState('');
  const [newLeadRevenue, setNewLeadRevenue] = useState('$3,500/mo');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  const storageKey = `gmb_empire_crm_leads_${data.location.replace(/[^a-zA-Z0-9]/g, '_')}_${data.category.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // Initialize CRM leads from scan data + localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
          return;
        }
      }
    } catch {
      // Fallback to building fresh leads from scan
    }

    // Convert unclaimed listings and top competitors into CRM leads
    const initialLeads: CRMLead[] = [];

    // Add Unclaimed listings (highest priority)
    data.scanner.unclaimedListings.forEach((item, index) => {
      initialLeads.push({
        id: `unclaimed-${item.id}`,
        name: item.name,
        phone: item.phone,
        address: item.address,
        rating: item.rating,
        reviewsCount: item.reviewsCount,
        potentialRevenueGain: item.potentialRevenueGain,
        vulnerabilityFactor: item.vulnerabilityFactor,
        source: 'Unclaimed Listing',
        status: index === 0 ? 'Contacted' : 'New Lead',
        notes: [
          {
            id: `note-init-${item.id}`,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            text: `Discovered in GMB Radar scan. Unclaimed card vulnerable to competitor hijack. Est. value ${item.potentialRevenueGain}.`
          }
        ],
        followUpReminder: index === 0 ? {
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          dueTime: '10:00 AM',
          note: 'Call decision maker about claiming GMB listing & verification OTP',
          completed: false
        } : undefined
      });
    });

    // Add Top Competitors as benchmark prospect targets
    data.scanner.top3MapPack.forEach((comp) => {
      initialLeads.push({
        id: `comp-${comp.rank}`,
        name: comp.name,
        phone: '(800) 555-0100',
        address: `${data.location} Central Hub`,
        rating: comp.rating,
        reviewsCount: comp.reviewsCount,
        potentialRevenueGain: '$4,200/mo',
        vulnerabilityFactor: comp.biggestWeakness,
        source: 'Competitor Target',
        status: 'New Lead',
        notes: [
          {
            id: `note-comp-${comp.rank}`,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            text: `Ranked #${comp.rank} in Map Pack. Key weakness: ${comp.biggestWeakness}. Pitch: ${comp.takeoverStrategy}`
          }
        ]
      });
    });

    setLeads(initialLeads);
    try {
      localStorage.setItem(storageKey, JSON.stringify(initialLeads));
    } catch {}
  }, [storageKey, data.scanner.unclaimedListings, data.scanner.top3MapPack, data.location]);

  // Persist leads helper
  const saveLeads = (updated: CRMLead[]) => {
    setLeads(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {}
  };

  // Status Change Handler
  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        const statusNote: CRMContactNote = {
          id: `note-${Date.now()}`,
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          text: `Status updated from "${l.status}" to "${newStatus}".`
        };
        return {
          ...l,
          status: newStatus,
          notes: [statusNote, ...l.notes]
        };
      }
      return l;
    });
    saveLeads(updated);
  };

  // Add Contact Note
  const handleAddNote = (leadId: string) => {
    if (!noteInputText.trim()) return;

    const newNote: CRMContactNote = {
      id: `note-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      text: noteInputText.trim()
    };

    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          notes: [newNote, ...l.notes]
        };
      }
      return l;
    });

    saveLeads(updated);
    setNoteInputText('');
    setActiveNoteLeadId(null);
  };

  // Save Follow-up Reminder
  const handleSaveReminder = (leadId: string) => {
    if (!reminderDate) return;

    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          followUpReminder: {
            dueDate: reminderDate,
            dueTime: reminderTime || '10:00 AM',
            note: reminderNote || 'Follow up with client regarding proposal',
            completed: false
          }
        };
      }
      return l;
    });

    saveLeads(updated);
    setReminderLeadId(null);
    setReminderDate('');
    setReminderNote('');
  };

  // Toggle Reminder Completed
  const handleToggleReminderComplete = (leadId: string) => {
    const updated = leads.map((l) => {
      if (l.id === leadId && l.followUpReminder) {
        return {
          ...l,
          followUpReminder: {
            ...l.followUpReminder,
            completed: !l.followUpReminder.completed
          }
        };
      }
      return l;
    });
    saveLeads(updated);
  };

  // Quick Preset Reminders (+1 Day, +3 Days, +1 Week)
  const setQuickReminder = (leadId: string, daysAhead: number) => {
    const date = new Date(Date.now() + daysAhead * 86400000);
    const dateStr = date.toISOString().split('T')[0];

    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          followUpReminder: {
            dueDate: dateStr,
            dueTime: '10:00 AM',
            note: `Follow-up in ${daysAhead} day(s) regarding proposal & next steps`,
            completed: false
          }
        };
      }
      return l;
    });

    saveLeads(updated);
    setReminderLeadId(null);
  };

  // Delete Lead
  const handleDeleteLead = (leadId: string) => {
    const updated = leads.filter(l => l.id !== leadId);
    saveLeads(updated);
  };

  // Copy Outreach Script
  const handleCopyPitch = (lead: CRMLead) => {
    const pitch = `Hi ${lead.name} team,\n\nI was reviewing Google Maps listings for ${data.category} businesses in ${data.location} and noticed your Google Business profile has a critical vulnerability: "${lead.vulnerabilityFactor}".\n\nBecause of this, you are losing approximately ${lead.potentialRevenueGain} in high-ticket monthly calls to local competitors.\n\nWe can fix and verify this for you within 48 hours and launch a custom 8K landing page to capture top Map Pack rankings.\n\nWhen would be a good time for a quick 5-minute call today?\n\nBest regards,\nGMB Growth Team • ${data.location}`;
    navigator.clipboard.writeText(pitch);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Business Name', 'Status', 'Phone', 'Address', 'Rating', 'Est Revenue Gain', 'Source', 'Follow-up Due', 'Latest Note'];
    const rows = leads.map(l => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.phone}"`,
      `"${l.address.replace(/"/g, '""')}"`,
      l.rating,
      `"${l.potentialRevenueGain}"`,
      `"${l.source}"`,
      `"${l.followUpReminder ? `${l.followUpReminder.dueDate} ${l.followUpReminder.dueTime}` : 'None'}"`,
      `"${(l.notes[0]?.text || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GMB_Client_CRM_Leads_${data.location.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add Custom Lead Form Submit
  const handleAddCustomLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    const newLead: CRMLead = {
      id: `manual-${Date.now()}`,
      name: newLeadName.trim(),
      phone: newLeadPhone.trim() || '(800) 555-0199',
      address: newLeadAddress.trim() || `${data.location} Metro`,
      rating: 4.8,
      reviewsCount: 15,
      potentialRevenueGain: newLeadRevenue.trim() || '$3,500/mo',
      vulnerabilityFactor: 'Needs active GMB optimization and weekly posts',
      source: 'Manual Lead',
      status: 'New Lead',
      notes: [
        {
          id: `note-${Date.now()}`,
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          text: newLeadNotes.trim() || 'Manually added to CRM pipeline.'
        }
      ]
    };

    saveLeads([newLead, ...leads]);
    setIsAddLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadAddress('');
    setNewLeadNotes('');
  };

  // Filtering
  const filteredLeads = leads.filter(l => {
    const matchesFilter = activeFilter === 'All' || l.status === activeFilter;
    const matchesQuery = !searchQuery || 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  // Pipeline metrics
  const totalCount = leads.length;
  const inPipelineCount = leads.filter(l => ['Contacted', 'Proposal Sent', 'Negotiating'].includes(l.status)).length;
  const wonCount = leads.filter(l => l.status === 'Closed Won').length;
  const pendingRemindersCount = leads.filter(l => l.followUpReminder && !l.followUpReminder.completed).length;

  return (
    <div className="space-y-4">
      
      {/* CRM HEADER & PIPELINE SCORECARD */}
      <div className="glass-gold rounded-2xl p-4 sm:p-5 border border-amber-500/30 bg-gradient-to-br from-[#121118] via-[#0E0E14] to-[#0A0A0D] relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow">
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  CRM ENGINE
                </span>
                <span className="text-xs text-zinc-400 font-medium">DISCOVERED LEADS & OUTREACH</span>
              </div>
              <h3 className="text-sm sm:text-base font-cinzel font-bold text-amber-200">
                Client CRM Pipeline
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportCSV}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Export all leads to CSV"
            >
              <Download className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-black" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* 4 Pipeline Stat Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-[10px] text-zinc-400 block">Total Discovered</span>
            <span className="text-lg font-mono font-extrabold text-white">{totalCount} Leads</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-[10px] text-amber-400/90 block">Active Pipeline</span>
            <span className="text-lg font-mono font-extrabold text-amber-300">{inPipelineCount} In Play</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-[10px] text-emerald-400 block">Closed Deals</span>
            <span className="text-lg font-mono font-extrabold text-emerald-400">{wonCount} Won</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-[10px] text-purple-400 block">Follow-ups Due</span>
            <span className="text-lg font-mono font-extrabold text-purple-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {pendingRemindersCount} Active
            </span>
          </div>
        </div>
      </div>

      {/* SEARCH & STAGE FILTERS */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, phone, or address..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-xs">
          {(['All', 'New Lead', 'Contacted', 'Proposal Sent', 'Negotiating', 'Closed Won'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition cursor-pointer text-[11px] ${
                activeFilter === tab
                  ? 'bg-amber-400 text-black font-bold shadow'
                  : 'bg-black/40 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* LEADS LIST */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="p-8 rounded-2xl glass-gold border border-white/10 text-center space-y-2 bg-black/40">
            <AlertCircle className="w-8 h-8 text-amber-400/60 mx-auto" />
            <p className="text-xs text-zinc-300 font-medium">No leads match the selected filter.</p>
            <p className="text-[11px] text-zinc-500">Run a new scan in Column 1 or click "Add Lead" to manually add one.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const statusStyle = STATUS_CONFIG[lead.status] || STATUS_CONFIG['New Lead'];
            const isNoteActive = activeNoteLeadId === lead.id;
            const isReminderActive = reminderLeadId === lead.id;

            return (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-black/65 border border-white/10 hover:border-amber-400/40 transition space-y-3 relative group"
              >
                {/* Header: Title, Source & Status Selector */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition">
                        {lead.name}
                      </h4>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                        lead.source === 'Unclaimed Listing'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : lead.source === 'Competitor Target'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {lead.source}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span>{lead.phone}</span>
                      <span>•</span>
                      <span className="truncate max-w-[200px]">{lead.address}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono font-bold">Est: {lead.potentialRevenueGain}</span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="relative shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      aria-label="Lead status"
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-xl border appearance-none pr-6 cursor-pointer focus:outline-none ${statusStyle.bg} ${statusStyle.color} ${statusStyle.border}`}
                    >
                      <option value="New Lead" className="bg-[#121118] text-sky-300">New Lead</option>
                      <option value="Contacted" className="bg-[#121118] text-amber-300">Contacted</option>
                      <option value="Proposal Sent" className="bg-[#121118] text-purple-300">Proposal Sent</option>
                      <option value="Negotiating" className="bg-[#121118] text-yellow-300">Negotiating</option>
                      <option value="Closed Won" className="bg-[#121118] text-emerald-300">Closed Won</option>
                      <option value="Lost" className="bg-[#121118] text-rose-300">Lost</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-zinc-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Vulnerability Banner */}
                <div className="p-2 rounded-xl bg-black/60 border border-white/5 text-[11px] text-zinc-300 flex items-start gap-1.5">
                  <span className="text-amber-400 font-semibold shrink-0">Vulnerability:</span>
                  <span className="line-clamp-2">{lead.vulnerabilityFactor}</span>
                </div>

                {/* Follow-up Reminder Ribbon (if set) */}
                {lead.followUpReminder && (
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                    lead.followUpReminder.completed
                      ? 'bg-zinc-900/50 border-white/5 text-zinc-500 line-through'
                      : 'bg-purple-950/30 border-purple-500/40 text-purple-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <div className="text-[11px]">
                        <span className="font-bold">{lead.followUpReminder.dueDate} at {lead.followUpReminder.dueTime}</span>
                        <span className="text-zinc-400 ml-1.5">({lead.followUpReminder.note})</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleReminderComplete(lead.id)}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-zinc-200 transition cursor-pointer"
                    >
                      {lead.followUpReminder.completed ? 'Re-open' : 'Done ✓'}
                    </button>
                  </div>
                )}

                {/* Quick Action Triggers */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5 flex-wrap">
                  
                  <div className="flex items-center gap-1.5">
                    {/* Call Direct */}
                    <a
                      href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1 transition"
                      title="Call Lead Phone"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Hi ${lead.name}, I reviewed your Google Maps profile in ${data.location} and would like to share a quick audit.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-[11px] font-bold flex items-center gap-1 transition"
                      title="Send WhatsApp message"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Copy Pitch Script */}
                    <button
                      onClick={() => handleCopyPitch(lead)}
                      className="px-2.5 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                      title="Copy customized outreach pitch"
                    >
                      {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === lead.id ? 'Copied Pitch!' : 'Pitch'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Set Reminder Button */}
                    <button
                      onClick={() => setReminderLeadId(isReminderActive ? null : lead.id)}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer ${
                        lead.followUpReminder
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
                      }`}
                    >
                      <Calendar className="w-3 h-3 text-purple-400" />
                      <span>{lead.followUpReminder ? 'Edit Reminder' : 'Remind'}</span>
                    </button>

                    {/* Notes Toggle Button */}
                    <button
                      onClick={() => setActiveNoteLeadId(isNoteActive ? null : lead.id)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-amber-400" />
                      <span>Notes ({lead.notes.length})</span>
                    </button>

                    {/* Delete Lead */}
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1 rounded-lg hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                      title="Delete lead from CRM"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

                {/* EXPANDED REMINDER SCHEDULER PANEL */}
                {isReminderActive && (
                  <div className="p-3 rounded-xl bg-[#14121A] border border-purple-500/30 space-y-2 text-xs animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>Schedule Follow-Up Reminder</span>
                      </span>
                      <button
                        onClick={() => setReminderLeadId(null)}
                        className="text-zinc-500 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="text-zinc-400">Quick Presets:</span>
                      <button
                        onClick={() => setQuickReminder(lead.id, 1)}
                        className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-mono transition"
                      >
                        + Tomorrow
                      </button>
                      <button
                        onClick={() => setQuickReminder(lead.id, 3)}
                        className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-mono transition"
                      >
                        + 3 Days
                      </button>
                      <button
                        onClick={() => setQuickReminder(lead.id, 7)}
                        className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-mono transition"
                      >
                        + 1 Week
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-zinc-400 mb-0.5">Date</label>
                        <input
                          type="date"
                          value={reminderDate}
                          onChange={(e) => setReminderDate(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-200 text-xs focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 mb-0.5">Time</label>
                        <input
                          type="text"
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          placeholder="e.g. 10:00 AM"
                          className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-200 text-xs focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-0.5">Reminder Purpose / Note</label>
                      <input
                        type="text"
                        value={reminderNote}
                        onChange={(e) => setReminderNote(e.target.value)}
                        placeholder="e.g. Call owner to review website demo and pricing"
                        className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-200 text-xs focus:border-purple-400 focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => handleSaveReminder(lead.id)}
                      disabled={!reminderDate}
                      className="w-full py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xs disabled:opacity-50 transition cursor-pointer"
                    >
                      Save Reminder
                    </button>
                  </div>
                )}

                {/* EXPANDED CONTACT NOTES LOG */}
                {isNoteActive && (
                  <div className="p-3 rounded-xl bg-black/80 border border-amber-500/20 space-y-2 text-xs animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-300 font-bold flex items-center gap-1 text-[11px]">
                        <FileText className="w-3 h-3 text-amber-400" />
                        <span>Contact & Call History ({lead.notes.length} entries)</span>
                      </span>
                      <button
                        onClick={() => setActiveNoteLeadId(null)}
                        className="text-zinc-500 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    {/* New Note Form */}
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={noteInputText}
                        onChange={(e) => setNoteInputText(e.target.value)}
                        placeholder="Type interaction note (e.g. Spoke with manager, scheduled demo)..."
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-zinc-200 text-xs placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddNote(lead.id);
                        }}
                      />
                      <button
                        onClick={() => handleAddNote(lead.id)}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition cursor-pointer"
                      >
                        Add
                      </button>
                    </div>

                    {/* Chronological List of Notes */}
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {lead.notes.map((note) => (
                        <div key={note.id} className="p-2 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
                          <div className="text-[10px] text-amber-400/90 font-mono font-medium">
                            {note.timestamp}
                          </div>
                          <div className="text-[11px] text-zinc-300 leading-relaxed">
                            {note.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* ADD CUSTOM LEAD MODAL */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl glass-gold p-6 border border-amber-400/40 bg-[#121118] text-zinc-100 shadow-2xl relative">
            <button
              onClick={() => setIsAddLeadModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Plus className="w-5 h-5 text-amber-400" />
              <h4 className="text-base font-cinzel font-bold text-amber-300">Add New Prospect to CRM</h4>
            </div>

            <form onSubmit={handleAddCustomLeadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Lone Star Roofing Solutions"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="e.g. (214) 555-0188"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Est. Revenue Value</label>
                  <input
                    type="text"
                    value={newLeadRevenue}
                    onChange={(e) => setNewLeadRevenue(e.target.value)}
                    placeholder="e.g. $4,000/mo"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Business Address</label>
                <input
                  type="text"
                  value={newLeadAddress}
                  onChange={(e) => setNewLeadAddress(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace, Dallas, TX"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Initial Contact Notes</label>
                <textarea
                  rows={2}
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  placeholder="Initial observations, referral source, or client intent..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md transition cursor-pointer"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
