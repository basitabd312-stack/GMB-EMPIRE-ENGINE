import React, { useState } from 'react';
import { Key, Shield, Check, X, Sparkles, ExternalLink } from 'lucide-react';

interface ApiKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKeys: (googleKey: string, claudeKey: string) => void;
  initialGoogleKey: string;
  initialClaudeKey: string;
}

export const ApiKeysModal: React.FC<ApiKeysModalProps> = ({
  isOpen,
  onClose,
  onSaveKeys,
  initialGoogleKey,
  initialClaudeKey
}) => {
  const [googleKey, setGoogleKey] = useState(initialGoogleKey);
  const [claudeKey, setClaudeKey] = useState(initialClaudeKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKeys(googleKey.trim(), claudeKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl glass-gold p-6 border border-amber-400/40 bg-[#0E0E14] text-zinc-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-cinzel font-bold text-amber-300">Empire Engine API Keys</h3>
            <p className="text-xs text-zinc-400">Configure Google Places & Claude/AI Integrations</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">
              Google Places API Key (VITE_GOOGLE_API)
            </label>
            <input
              type="password"
              value={googleKey}
              onChange={(e) => setGoogleKey(e.target.value)}
              placeholder="AIzaSy... (optional, high-accuracy live Places radar)"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-zinc-100 focus:border-amber-400 focus:outline-none font-mono text-xs"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">
              Enables live Google Places Text Search and Places Radar. Built-in hyper-realistic simulation active by default.
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">
              Claude / Gemini AI Key (VITE_CLAUDE_API)
            </label>
            <input
              type="password"
              value={claudeKey}
              onChange={(e) => setClaudeKey(e.target.value)}
              placeholder="sk-ant-... or Gemini API Key (optional)"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-zinc-100 focus:border-amber-400 focus:outline-none font-mono text-xs"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">
              Used for custom on-the-fly business positioning and real-time competitor content rewriting.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-zinc-300 space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero-Friction Engine Ready</span>
            </div>
            <p>
              GMB Empire Engine is fully operational immediately! If keys are left blank, the system automatically uses precision local algorithmic modeling for any city in the world.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold hover:opacity-95 transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            {saved ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{saved ? 'Saved Successfully!' : 'Save & Apply'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
