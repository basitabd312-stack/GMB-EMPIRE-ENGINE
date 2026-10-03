import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Globe, ChevronDown, Sparkles, Shield, MapPin, Zap, MessageSquare, Award } from 'lucide-react';
import { AssistantLanguageGreeting } from '../types/empire';

const GREETINGS: Record<string, AssistantLanguageGreeting> = {
  en: {
    code: 'en',
    langName: 'English',
    greetingText: 'Welcome to GMB Empire Engine, Sir! Salute to you.',
    speechText: 'Welcome to GMB Empire Engine, Sir! Salute to you.',
    flag: '🇬🇧',
    voiceLang: 'en-US'
  },
  ur: {
    code: 'ur',
    langName: 'اردو (Urdu)',
    greetingText: 'GMB Empire Engine میں آپ کو خوش آمدید کہتے ہیں',
    speechText: 'جی ایم بی ایمپائر انجن میں آپ کو خوش آمدید کہتے ہیں۔ آپ کو سلام پیش کرتے ہیں',
    flag: '🇵🇰',
    voiceLang: 'ur-PK'
  },
  ar: {
    code: 'ar',
    langName: 'العربية (Arabic)',
    greetingText: 'مرحبا بكم في GMB Empire Engine',
    speechText: 'مرحبا بكم في GMB Empire Engine. تحية شرف لكم يا سيدي',
    flag: '🇦🇪',
    voiceLang: 'ar-SA'
  },
  de: {
    code: 'de',
    langName: 'Deutsch (German)',
    greetingText: 'Willkommen bei GMB Empire Engine',
    speechText: 'Willkommen bei GMB Empire Engine. Salut und Ehre an Sie!',
    flag: '🇩🇪',
    voiceLang: 'de-DE'
  },
  fr: {
    code: 'fr',
    langName: 'Français (French)',
    greetingText: 'Bienvenue sur GMB Empire Engine',
    speechText: 'Bienvenue sur GMB Empire Engine. Tous mes respects, monsieur!',
    flag: '🇫🇷',
    voiceLang: 'fr-FR'
  },
  es: {
    code: 'es',
    langName: 'Español (Spanish)',
    greetingText: '¡Bienvenido a GMB Empire Engine! Un saludo de honor para usted.',
    speechText: 'Bienvenido a GMB Empire Engine. Un saludo de honor para usted.',
    flag: '🇪🇸',
    voiceLang: 'es-ES'
  },
  tr: {
    code: 'tr',
    langName: 'Türkçe (Turkish)',
    greetingText: 'GMB Empire Engine\'a hoş geldiniz, efendim! Saygılarımızla.',
    speechText: 'GMB Empire Engine a hoş geldiniz efendim. Saygılarımızla selamlıyorum.',
    flag: '🇹🇷',
    voiceLang: 'tr-TR'
  },
  hi: {
    code: 'hi',
    langName: 'हिन्दी (Hindi)',
    greetingText: 'GMB Empire Engine में आपका स्वागत है, सर! आपको सादर प्रणाम।',
    speechText: 'GMB Empire Engine में आपका स्वागत है, सर! आपको सादर प्रणाम।',
    flag: '🇮🇳',
    voiceLang: 'hi-IN'
  }
};

export const WelcomeAssistant: React.FC<{
  onRunPreset?: (location: string, category: string) => void;
}> = ({ onRunPreset }) => {
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [countryInfo, setCountryInfo] = useState<{
    country: string;
    city: string;
    ip?: string;
  }>({
    country: 'Detecting...',
    city: 'Global Proximity'
  });
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSaluting, setIsSaluting] = useState(true);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Speech Voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        setVoicesLoaded(true);
      };
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    }
  }, []);

  // Speak function using window.speechSynthesis
  const speakGreeting = useCallback((langCode: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const currentGreeting = GREETINGS[langCode] || GREETINGS['en'];
      const utterance = new SpeechSynthesisUtterance(currentGreeting.speechText);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      // Match voice language
      const targetLangPrefix = currentGreeting.voiceLang.slice(0, 2);
      const matchedVoice =
        voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(currentGreeting.voiceLang.toLowerCase())) ||
        voices.find(v => v.lang.toLowerCase().startsWith(targetLangPrefix)) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
      utterance.lang = currentGreeting.voiceLang;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsSaluting(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis may be restricted before user interaction
    }
  }, []);

  // Detect Language and Country on mount
  useEffect(() => {
    // 1. Language detection via navigator.language
    const navLang = navigator.language ? navigator.language.slice(0, 2).toLowerCase() : 'en';
    const initialLang = GREETINGS[navLang] ? navLang : 'en';
    setSelectedLang(initialLang);

    // 2. Country detection via https://ipapi.co/json/
    const detectLocation = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('https://ipapi.co/json/', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const detectedCountry = data.country_name || data.country || 'Global Proximity';
          const detectedCity = data.city || '';
          const ip = data.ip || '';
          setCountryInfo({
            country: detectedCountry,
            city: detectedCity ? `${detectedCity}, ${detectedCountry}` : detectedCountry,
            ip: ip ? `${ip.slice(0, 7)}***` : undefined
          });

          // Country-to-Language hints if navigator was default en
          if (data.country_code) {
            const cc = data.country_code.toLowerCase();
            if (['pk'].includes(cc) && GREETINGS['ur']) setSelectedLang('ur');
            else if (['sa', 'ae', 'eg', 'qa', 'kw', 'om', 'bh', 'iq', 'jo', 'lb'].includes(cc) && GREETINGS['ar']) setSelectedLang('ar');
            else if (['de', 'at', 'ch'].includes(cc) && GREETINGS['de']) setSelectedLang('de');
            else if (['fr', 'be', 'mc', 'sn'].includes(cc) && GREETINGS['fr']) setSelectedLang('fr');
          }
        } else {
          fallbackLocation();
        }
      } catch {
        fallbackLocation();
      }
    };

    const fallbackLocation = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Empire Region';
        const tzCity = tz.split('/')[1]?.replace(/_/g, ' ') || 'Local Market';
        setCountryInfo({
          country: 'Geo Grid Active',
          city: tzCity
        });
      } catch {
        setCountryInfo({
          country: 'Global Command',
          city: 'Local Market'
        });
      }
    };

    detectLocation();

    // Trigger speech on initial user click or auto attempt
    const timer = setTimeout(() => {
      speakGreeting(initialLang);
    }, 600);

    // Bubble shows 5 sec then minimizes to button "Empire Assistant"
    bubbleTimerRef.current = setTimeout(() => {
      setIsBubbleVisible(false);
      setIsMinimized(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speakGreeting]);

  // Handle manual language switch
  const handleSelectLanguage = (langKey: string) => {
    setSelectedLang(langKey);
    setIsBubbleVisible(true);
    speakGreeting(langKey);

    // Reset 5s dismiss timer
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setIsBubbleVisible(false);
      setIsMinimized(true);
    }, 5000);
  };

  const currentGreeting = GREETINGS[selectedLang] || GREETINGS['en'];

  return (
    <>
      {/* Floating Avatar & Assistant Widget in Bottom Right */}
      <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
        
        {/* Speech Bubble (Shows 5 sec on load, or when active) */}
        {isBubbleVisible && !isMinimized && (
          <div className="pointer-events-auto mb-3 max-w-[280px] sm:max-w-xs transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-3">
            <div className="relative glass-gold rounded-2xl p-3.5 sm:p-4 text-xs shadow-2xl border border-amber-400/50 bg-[#0E0E12]/95 backdrop-blur-xl">
              {/* Gold Arrow pointing to avatar */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 rotate-45 bg-[#0E0E12] border-r border-b border-amber-400/50"></div>
              
              {/* Header inside Bubble */}
              <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{currentGreeting.flag}</span>
                  <span className="font-cinzel text-[11px] font-bold text-amber-300 tracking-wider">ENGINE 18 • ASSISTANT</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => speakGreeting(selectedLang)}
                    className="p-1 rounded-lg text-amber-400 hover:text-amber-200 hover:bg-amber-400/10 transition cursor-pointer"
                    title="Speak greeting"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsBubbleVisible(false);
                      setIsMinimized(true);
                    }}
                    className="text-zinc-400 hover:text-zinc-200 text-xs px-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Speech Text */}
              <p className="text-zinc-100 font-medium leading-relaxed dir-auto text-[13px]">
                "{currentGreeting.greetingText}"
              </p>

              {/* Detected Geo Badge */}
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {countryInfo.city}
                </span>
                <span className="text-amber-400/90 font-mono font-medium">SALUTE ACTIVE</span>
              </div>
            </div>
          </div>
        )}

        {/* Minimized Pill Button / Main Avatar Trigger */}
        <div className="pointer-events-auto flex items-center gap-2">
          {isMinimized && (
            <button
              onClick={() => {
                setIsMinimized(false);
                setIsBubbleVisible(true);
                setIsModalOpen(true);
                speakGreeting(selectedLang);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1A1A22] to-[#121217] border border-amber-400/50 shadow-xl text-amber-300 text-xs font-semibold hover:border-amber-400 hover:shadow-amber-500/20 hover:scale-105 active:scale-95 transition cursor-pointer backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-cinzel tracking-wider text-[11px]">Empire Assistant</span>
              <span className="text-xs">{currentGreeting.flag}</span>
            </button>
          )}

          {/* AVATAR: Black Suit + Gold Tie + Imperial Salute Animation */}
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsSaluting(true);
              speakGreeting(selectedLang);
            }}
            className="group relative cursor-pointer focus:outline-none"
            aria-label="World Wide Welcome AI Assistant"
            title="Click to salute & speak with World Wide Empire Assistant"
          >
            {/* Glowing Aura Ring */}
            <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 opacity-60 blur-sm group-hover:opacity-100 transition duration-500 ${isSpeaking ? 'animate-pulse' : ''}`}></div>

            <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#09090D] border-2 border-amber-400/80 p-0.5 shadow-2xl flex items-center justify-center overflow-hidden ${isSaluting ? 'animate-salute' : ''}`}>
              
              {/* SVG Character: Black Tuxedo/Suit, Gold Tie, Royal Salute Arm */}
              <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
                <defs>
                  <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1F1F24" />
                    <stop offset="50%" stopColor="#0E0E12" />
                    <stop offset="100%" stopColor="#050507" />
                  </linearGradient>
                  <linearGradient id="goldTieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF3A8" />
                    <stop offset="40%" stopColor="#FFD700" />
                    <stop offset="80%" stopColor="#FF9900" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FCD5B5" />
                    <stop offset="100%" stopColor="#EBB68E" />
                  </linearGradient>
                  <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#FFD700" floodOpacity="0.6"/>
                  </filter>
                </defs>

                {/* Background Imperial Shield Halo */}
                <circle cx="60" cy="60" r="58" fill="#0C0C10" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" />

                {/* Suit Shoulders & Torso */}
                <path d="M15 120 L25 78 C35 70 50 68 60 68 C70 68 85 70 95 78 L105 120 Z" fill="url(#suitGrad)" stroke="#2D2D35" strokeWidth="1" />

                {/* White Dress Shirt V */}
                <polygon points="50,68 70,68 65,95 60,98 55,95" fill="#FFFFFF" />

                {/* Gold Tie */}
                <path d="M57 74 L63 74 L65 80 L63 104 L60 110 L57 104 L55 80 Z" fill="url(#goldTieGrad)" filter="url(#goldShine)" />
                {/* Tie Knot */}
                <polygon points="57,71 63,71 64,76 56,76" fill="#FFE55C" />

                {/* Black Suit Lapels */}
                <polygon points="25,78 45,86 52,108 40,118 20,120" fill="#141418" stroke="#FFD700" strokeWidth="0.75" />
                <polygon points="95,78 75,86 68,108 80,118 100,120" fill="#141418" stroke="#FFD700" strokeWidth="0.75" />

                {/* Gold Lapel Pin (Engine 18 Crest) */}
                <circle cx="43" cy="88" r="2.5" fill="#FFD700" filter="url(#goldShine)" />

                {/* Neck */}
                <rect x="54" y="55" width="12" height="15" rx="3" fill="url(#skinGrad)" />

                {/* Head */}
                <ellipse cx="60" cy="42" rx="16" ry="19" fill="url(#skinGrad)" />

                {/* Hair - Executive Styled */}
                <path d="M43 38 C43 25 50 20 60 20 C70 20 77 25 77 38 C75 32 72 26 62 26 C52 26 46 31 43 38 Z" fill="#1A1817" />

                {/* Facial Features: Confident, Welcoming Eyes & Eyebrows */}
                <path d="M50 36 Q54 34 57 36" fill="none" stroke="#221E1C" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M63 36 Q66 34 70 36" fill="none" stroke="#221E1C" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="53.5" cy="40.5" r="1.8" fill="#111" />
                <circle cx="66.5" cy="40.5" r="1.8" fill="#111" />
                {/* Catchlight */}
                <circle cx="54" cy="40" r="0.6" fill="#fff" />
                <circle cx="67" cy="40" r="0.6" fill="#fff" />

                {/* Respectful Smile */}
                <path d="M54 50 Q60 55 66 50" fill="none" stroke="#9E5D4E" strokeWidth="1.5" strokeLinecap="round" />

                {/* SALUTE ARM & HAND (Right Arm raised to temple in sharp military/royal salute) */}
                <g className="salute-arm">
                  {/* Sleeve */}
                  <path d="M92 78 L86 52 L78 45 L74 48 L82 56 L86 82 Z" fill="url(#suitGrad)" stroke="#FFD700" strokeWidth="0.8" />
                  {/* White Cuff */}
                  <path d="M78 45 L75 42 L72 45 L75 48 Z" fill="#FFFFFF" />
                  {/* Hand at Temple */}
                  <path d="M74 42 L68 35 L70 32 L78 38 Z" fill="url(#skinGrad)" stroke="#B87D56" strokeWidth="0.8" />
                </g>
              </svg>

              {/* Status Badge: Active Pulse Indicator */}
              <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-black border border-amber-400 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* EXPANDED EMPIRE ASSISTANT MODAL / COMMAND BRIEFING */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-amber-400/40 bg-[#0E0E14] text-zinc-100 shadow-2xl relative overflow-hidden">
            
            {/* Top Imperial Header Bar */}
            <div className="relative bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent p-5 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-black/60 border border-amber-400/60 p-1 flex items-center justify-center">
                  <span className="text-2xl animate-salute inline-block">🫡</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest font-mono">ENGINE 18</span>
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      ONLINE & READY
                    </span>
                  </div>
                  <h3 className="text-lg font-cinzel font-bold text-amber-300">World Wide Welcome Assistant</h3>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Salutation Bubble & Audio Player */}
              <div className="glass-gold rounded-2xl p-4 border border-amber-400/30 bg-black/40">
                <div className="flex items-center justify-between text-xs text-amber-400 mb-2">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    Imperial Salutation ({currentGreeting.langName})
                  </span>
                  <button
                    onClick={() => speakGreeting(selectedLang)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 text-black font-bold hover:bg-amber-300 transition cursor-pointer text-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Speaking...' : 'Play Salute Audio'}</span>
                  </button>
                </div>
                
                <p className="text-base sm:text-lg font-semibold text-zinc-100 italic leading-relaxed py-1 dir-auto">
                  "{currentGreeting.greetingText}"
                </p>

                <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Location: <strong className="text-zinc-200">{countryInfo.city}</strong>
                  </span>
                  <span className="font-mono text-[11px] text-amber-400/90">
                    Voice Synthesizer: {voicesLoaded ? 'Active' : 'Standby'}
                  </span>
                </div>
              </div>

              {/* Multi-Language Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                  Select Assistant Language (Multi-Lingual Protocol)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(GREETINGS).map(([key, lang]) => (
                    <button
                      key={key}
                      onClick={() => handleSelectLanguage(key)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                        selectedLang === key
                          ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-md shadow-amber-400/10'
                          : 'border-white/10 bg-black/30 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="truncate">{lang.langName.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick 18 Engines Master Briefing */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold font-cinzel text-amber-300">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>How the 18 Engines Dominate Google Maps</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-zinc-300">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-amber-400 font-bold mb-1">COL 1: SCANNER</div>
                    <p className="text-[11px] text-zinc-400">Places API Live Radar detects Unclaimed profiles, SAB boundaries, & Top 3 map pack.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-amber-400 font-bold mb-1">COL 2: GAP DETECTOR</div>
                    <p className="text-[11px] text-zinc-400">Dissects Top 10 Keywords, missed secondary categories, and review velocity deficits.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-amber-400 font-bold mb-1">COL 3: POWER MAKER</div>
                    <p className="text-[11px] text-zinc-400">Generates 3 businesses with 30% Twists, 750-char descriptions, 10 services, 5 posts, & 3 photo prompts.</p>
                  </div>
                </div>
              </div>

              {/* Preset Quick Launch */}
              {onRunPreset && (
                <div>
                  <div className="text-xs font-semibold text-zinc-400 mb-2 flex items-center justify-between">
                    <span>Quick Fire Imperial Scans</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        onRunPreset('Dallas, TX', 'Emergency Plumber');
                        setIsModalOpen(false);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-400/20 hover:text-amber-300 border border-zinc-700 hover:border-amber-400/40 transition cursor-pointer"
                    >
                      Dallas, TX • Emergency Plumber
                    </button>
                    <button
                      onClick={() => {
                        onRunPreset('London, UK', 'Roofing Contractor');
                        setIsModalOpen(false);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-400/20 hover:text-amber-300 border border-zinc-700 hover:border-amber-400/40 transition cursor-pointer"
                    >
                      London, UK • Roofing Contractor
                    </button>
                    <button
                      onClick={() => {
                        onRunPreset('New York, NY', 'Cosmetic Dentist');
                        setIsModalOpen(false);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-400/20 hover:text-amber-300 border border-zinc-700 hover:border-amber-400/40 transition cursor-pointer"
                    >
                      New York, NY • Cosmetic Dentist
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/60 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">
                Salute Protocol Active • Black Suit & Gold Tie
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold hover:opacity-90 transition cursor-pointer"
              >
                Close & Proceed
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
