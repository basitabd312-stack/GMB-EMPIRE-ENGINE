import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, PlusSquare, X, Smartphone } from 'lucide-react';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Installed PWA
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-3.5 py-1.5 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer ${className}`}
        title="Add GMB Empire Engine to your Home Screen"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-black/40 backdrop-blur px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/10 transition cursor-pointer ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="w-full max-w-sm rounded-2xl border border-amber-500/30 bg-[#121217] p-6 shadow-2xl relative text-zinc-100">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-white bg-zinc-800/60"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-cinzel text-amber-300">Install on iPhone / iPad</h3>
                  <p className="text-xs text-zinc-400">Run as full-screen standalone app</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <p>Tap the <Share2 className="w-3.5 h-3.5 inline mx-1 text-amber-400" /> <strong>Share</strong> button in Safari toolbar.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <p>Scroll down and select <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-amber-400" /> <strong>Add to Home Screen</strong>.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <p>Tap <strong>Add</strong> in the top-right corner to launch anytime.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-2.5 text-xs font-bold text-black hover:opacity-95 transition"
              >
                Understood, Proceed
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop install prompt button that triggers when browser supports it or shows quick guidance
  return (
    <button
      onClick={() => {
        alert("To install GMB Empire Engine:\n\n• On Chrome/Edge: Click the install icon (⊕) in the browser address bar.\n• On Mobile: Tap your browser menu and choose 'Add to Home screen'.");
      }}
      className={`flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-black/30 backdrop-blur px-3 py-1.5 text-xs font-medium text-amber-300/80 hover:text-amber-300 hover:border-amber-400/60 transition cursor-pointer ${className}`}
      title="Add to Home Screen"
    >
      <Download className="w-3.5 h-3.5 text-amber-400" />
      <span>Install PWA</span>
    </button>
  );
};
