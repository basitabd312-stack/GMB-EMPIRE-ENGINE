import React, { useState, useEffect, useRef } from 'react';
import { UniqueBusinessPower } from '../../types/empire';
import { 
  X, 
  Download, 
  ExternalLink, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Star, 
  Shield, 
  Clock, 
  MapPin, 
  Award, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Maximize2, 
  Minimize2,
  Calendar,
  Sparkles,
  Zap,
  ChevronRight,
  Flame,
  Check,
  Eye,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Website8KPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: UniqueBusinessPower;
  location: string;
  category: string;
}

// 16+ Curated 8K Unsplash HD Images for Roofing & Premium Trade Services
const GALLERY_8K_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    title: 'Architectural Slate Roof Replacement',
    tag: 'Roofing',
    desc: 'Full tear-off and architectural shingle installation with lifetime warranty.'
  },
  {
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1600&q=85',
    title: 'Master Craftsmen on Ridge Line',
    tag: 'Craftsmanship',
    desc: 'Precision flashing and weatherproofing installation in progress.'
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    title: 'Luxury Villa Standing Seam Metal Roof',
    tag: 'Metal Roof',
    desc: 'High-end hurricane rated interlocking metal roof panels.'
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    title: 'Estate Roof Restoration & Solar Integration',
    tag: 'Restoration',
    desc: 'Complete tile restoration and underlayment overhaul.'
  },
  {
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
    title: 'Engineered Structural Blueprint Review',
    tag: 'Planning',
    desc: 'Municipal code engineering and certified wind-load calculations.'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
    title: '4K Drone Roof Health Inspection',
    tag: 'Inspection',
    desc: 'Thermal infrared aerial drone scanning detecting micro-leaks.'
  },
  {
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
    title: 'Modern Gable Roof Overhaul',
    tag: 'Residential',
    desc: 'Impact-resistant Class 4 shingles saving 25% on homeowner insurance.'
  },
  {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85',
    title: 'Certified Safety Crew at Heights',
    tag: 'Safety',
    desc: 'OSHA certified fall protection and seamless gutter installation.'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    title: 'Sunset Estate with Finished Cedar Shake Roof',
    tag: 'Luxury',
    desc: 'Synthetic fire-resistant cedar shakes with authentic wood grain.'
  },
  {
    url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85',
    title: 'Suburban Home Complete Exterior Upgrade',
    tag: 'Residential',
    desc: 'Total exterior package: roof, gutters, fascia, and ridge vents.'
  },
  {
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
    title: 'Commercial Flat Roof TPO Membrane',
    tag: 'Commercial',
    desc: 'Heat-welded thermoplastic polyolefin energy-star white roof.'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    title: 'Seamless Copper Gutter Installation',
    tag: 'Gutters',
    desc: 'Handcrafted custom mitered copper gutters and conductor heads.'
  },
  {
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
    title: 'Final Handshake & 100% Satisfaction Sign-off',
    tag: 'Team',
    desc: 'Lead project manager providing written lifetime warranty certificate.'
  },
  {
    url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1600&q=85',
    title: 'Precision Torque & Fastener Calibration',
    tag: 'Craftsmanship',
    desc: 'Pneumatic nailers calibrated to exact manufacturer depth specs.'
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    title: 'Skylight Installation & Leak-Free Flashing',
    tag: 'Skylights',
    desc: 'Velux solar-powered fresh air skylights with electric blinds.'
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=85',
    title: 'Executive Project Consultation',
    tag: 'Consultation',
    desc: 'Digital 3D roof visualizer session with the property owner.'
  }
];

export const Website8KPreviewModal: React.FC<Website8KPreviewModalProps> = ({
  isOpen,
  onClose,
  business,
  location,
  category
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [logoDataUrl, setLogoDataUrl] = useState<string>('');
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-generate luxury logo on Canvas
  useEffect(() => {
    if (!isOpen) return;

    const generateCanvasLogo = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Transparent Background
      ctx.clearRect(0, 0, 400, 120);

      // Gold Gradient
      const goldGrad = ctx.createLinearGradient(0, 0, 100, 100);
      goldGrad.addColorStop(0, '#FFF6D1');
      goldGrad.addColorStop(0.3, '#FFD700');
      goldGrad.addColorStop(0.7, '#FFA500');
      goldGrad.addColorStop(1, '#B8860B');

      // Draw Imperial Shield / Crown Emblem
      ctx.save();
      ctx.translate(15, 10);

      // Outer Shield
      ctx.beginPath();
      ctx.moveTo(45, 10);
      ctx.lineTo(80, 20);
      ctx.lineTo(75, 65);
      ctx.quadraticCurveTo(45, 95, 45, 98);
      ctx.quadraticCurveTo(15, 65, 15, 20);
      ctx.closePath();
      ctx.fillStyle = '#0E0E12';
      ctx.fill();
      ctx.strokeStyle = goldGrad;
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Inner Crown Shape
      ctx.beginPath();
      ctx.moveTo(30, 60);
      ctx.lineTo(33, 40);
      ctx.lineTo(40, 50);
      ctx.lineTo(45, 32);
      ctx.lineTo(50, 50);
      ctx.lineTo(57, 40);
      ctx.lineTo(60, 60);
      ctx.closePath();
      ctx.fillStyle = goldGrad;
      ctx.fill();

      // Jewel Accents
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(45, 31, 2, 0, Math.PI * 2);
      ctx.arc(33, 39, 1.5, 0, Math.PI * 2);
      ctx.arc(57, 39, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Typography
      const bizFirstWord = business.businessName.split(' ')[0].toUpperCase();
      const bizRest = business.businessName.split(' ').slice(1).join(' ').toUpperCase();

      // Brand Title
      ctx.font = '900 24px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = goldGrad;
      ctx.fillText(bizFirstWord, 115, 50);

      ctx.font = '700 18px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(bizRest.slice(0, 18), 115, 75);

      // Sub-brand Niche & Location
      ctx.font = '600 9px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#C5A059';
      ctx.letterSpacing = '2px';
      ctx.fillText(`PREMIER ${category.toUpperCase()} • ${location.toUpperCase()}`, 115, 94);

      setLogoDataUrl(canvas.toDataURL('image/png'));
    };

    const timer = setTimeout(generateCanvasLogo, 100);
    return () => clearTimeout(timer);
  }, [isOpen, business.businessName, location, category]);

  if (!isOpen) return null;

  const filteredGallery = galleryFilter === 'All' 
    ? GALLERY_8K_IMAGES 
    : GALLERY_8K_IMAGES.filter(img => img.tag.toLowerCase().includes(galleryFilter.toLowerCase()));

  const handleDownloadHtml = () => {
    // Generate full standalone single file website HTML
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${business.businessName} - Premier ${category} in ${location}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .gold-grad { background: linear-gradient(135deg, #FFF6D1 0%, #FFD700 45%, #FFA500 80%, #D4AF37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  </style>
</head>
<body class="bg-[#0A0A0E] text-zinc-100 antialiased">
  <div class="bg-amber-400 text-black text-center text-xs font-bold py-2">
    ⚡ 24/7 Priority Hotline: (800) 555-0199 • ${business.advantageTwist30Pct.headline}
  </div>
  <header class="sticky top-0 bg-[#0E0E14]/90 backdrop-blur border-b border-amber-400/20 py-4 px-6 flex justify-between items-center">
    <div class="text-xl font-black text-amber-400 font-cinzel">${business.businessName}</div>
    <a href="tel:8005550199" class="bg-amber-400 text-black px-4 py-2 rounded-xl font-bold text-xs">Call (800) 555-0199</a>
  </header>
  <section class="py-20 px-6 text-center max-w-4xl mx-auto">
    <h1 class="text-4xl sm:text-6xl font-black gold-grad mb-4">${business.businessName}</h1>
    <p class="text-xl text-zinc-300 mb-8 font-medium">${business.advantageTwist30Pct.headline}</p>
    <p class="text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">${business.gmbDescription750.text}</p>
    <a href="#quote" class="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold px-8 py-4 rounded-xl shadow-lg">Get Free 8K Estimate</a>
  </section>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${business.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_8K_Website.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadLogo = () => {
    if (!logoDataUrl) return;
    const a = document.createElement('a');
    a.href = logoDataUrl;
    a.download = `${business.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Logo.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl animate-in fade-in overflow-hidden">
      
      {/* TOP CONTROL BAR */}
      <div className="bg-[#0C0C12] border-b border-amber-500/30 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0">
        
        {/* Left: Title & Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs shadow-md">
            8K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-cinzel font-bold text-amber-300">
                {business.businessName}
              </span>
              <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                ASTRA PRO $5M THEME
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden xs:block">
              Auto-generated 8K luxury landing page with logo, 16+ HD photos & floating WhatsApp CTA
            </p>
          </div>
        </div>

        {/* Center: Device Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              deviceView === 'desktop' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              deviceView === 'tablet' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              deviceView === 'mobile' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleDownloadLogo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-medium transition cursor-pointer"
            title="Download PNG Logo"
          >
            <Download className="w-3 h-3 text-amber-400" />
            <span>Save Logo</span>
          </button>

          <button
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span>Download HTML</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* WEBPAGE CANVAS / DEVICE FRAME PREVIEW AREA */}
      <div className="flex-1 overflow-y-auto bg-[#070709] p-0 sm:p-4 flex justify-center items-start">
        
        {/* Responsive Frame Wrapper */}
        <div
          className={`transition-all duration-300 bg-[#0A0A0E] text-zinc-100 shadow-2xl relative ${
            deviceView === 'desktop'
              ? 'w-full max-w-6xl min-h-screen border-x border-white/5'
              : deviceView === 'tablet'
              ? 'w-full max-w-[768px] min-h-[900px] rounded-3xl border-4 border-zinc-800 my-4 overflow-hidden'
              : 'w-full max-w-[375px] min-h-[750px] rounded-3xl border-4 border-zinc-800 my-4 overflow-hidden'
          }`}
        >
          
          {/* ASTRA PRO TOP NOTIFICATION TICKER */}
          <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black text-[11px] font-extrabold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
            <Flame className="w-3.5 h-3.5 fill-black" />
            <span>
              SPRING PROMOTION in {location.toUpperCase()}: Free 21-Point Roof & Exterior Health Audit ($299 Value)!
            </span>
            <span className="underline cursor-pointer hidden sm:inline">Call (800) 555-0199</span>
          </div>

          {/* LUXURY STICKY HEADER */}
          <header className="sticky top-0 z-40 bg-[#0B0B10]/95 backdrop-blur-xl border-b border-amber-500/20 py-3.5 px-4 sm:px-8 flex items-center justify-between gap-4">
            
            {/* Auto-Generated Canvas Logo */}
            <div className="flex items-center gap-3">
              {logoDataUrl ? (
                <img
                  src={logoDataUrl}
                  alt={`${business.businessName} Logo`}
                  className="h-10 sm:h-12 w-auto object-contain cursor-pointer"
                  onClick={handleDownloadLogo}
                  title="Click to download high-res PNG logo"
                />
              ) : (
                <div className="h-10 w-36 bg-white/5 animate-pulse rounded-lg"></div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-300">
              <a href="#services" className="hover:text-amber-400 transition">Services</a>
              <a href="#twist" className="hover:text-amber-400 transition">The 30% Advantage</a>
              <a href="#gallery" className="hover:text-amber-400 transition">8K Gallery</a>
              <a href="#reviews" className="hover:text-amber-400 transition">5-Star Reviews</a>
              <a href="#quote" className="hover:text-amber-400 transition">Get Estimate</a>
            </nav>

            {/* Phone & CTA */}
            <div className="flex items-center gap-3">
              <a
                href="tel:8005550199"
                className="hidden sm:flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 transition"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>(800) 555-0199</span>
              </a>

              <a
                href="#quote"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                Book Inspection
              </a>
            </div>

          </header>

          {/* HERO SECTION ($5M LOOK WITH 8K IMAGE & 30% TWIST) */}
          <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center py-16 px-4 sm:px-8 overflow-hidden">
            {/* 8K Hero Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{ backgroundImage: `url(${GALLERY_8K_IMAGES[0].url})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070A]/95 via-[#0A0A0F]/85 to-[#07070A]/80"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>

            <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Headline, Twist & Bullets */}
              <div className="lg:col-span-7 space-y-5 text-left">
                
                {/* Location & Rating Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur">
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <span>#1 Rated {category} in {location}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white leading-tight">
                  Protect Your Home with <span className="gold-gradient-text">{business.businessName}</span>
                </h1>

                {/* 30% Twist Highlight Banner */}
                <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/40 backdrop-blur shadow-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider font-mono">
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>THE 30% UNFAIR ADVANTAGE GUARANTEE</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-zinc-100">
                    "{business.advantageTwist30Pct.headline}"
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {business.advantageTwist30Pct.details}
                  </p>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Licensed & Insured ($2M)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Same-Day 60-Min Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero-Down Financing Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lifetime Warranty on Labor</span>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#quote"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-black text-xs sm:text-sm tracking-wide uppercase shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition"
                  >
                    Claim Free 8K Estimate →
                  </a>
                  <a
                    href="tel:8005550199"
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>(800) 555-0199</span>
                  </a>
                </div>

              </div>

              {/* Right Column: Instant 60-Second Estimate Form */}
              <div id="quote" className="lg:col-span-5">
                <div className="rounded-3xl glass-gold p-6 border border-amber-400/40 bg-[#101016]/90 backdrop-blur-2xl shadow-2xl relative">
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-cinzel font-bold text-amber-300">Instant Estimate Calculator</h3>
                      <p className="text-xs text-zinc-400">Lock in your discounted rate in 60 seconds</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>

                  {quoteSuccess ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-white">Estimate Request Received!</h4>
                      <p className="text-xs text-zinc-400">
                        Our on-duty master technician for <strong>{location}</strong> will call you within 15 minutes.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setQuoteSuccess(true);
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div>
                        <label className="block text-zinc-300 font-semibold mb-1">Select Service Needed</label>
                        <select className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 focus:border-amber-400 focus:outline-none">
                          {business.services10.map((s, i) => (
                            <option key={i} value={s.name}>{s.name} ({s.priceGuide})</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-zinc-300 font-semibold mb-1">Property Type</label>
                          <select className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 focus:border-amber-400 focus:outline-none">
                            <option>Single Family Home</option>
                            <option>Commercial Property</option>
                            <option>Multi-Unit Townhome</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-zinc-300 font-semibold mb-1">Timeline</label>
                          <select className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 focus:border-amber-400 focus:outline-none">
                            <option>Emergency (Today)</option>
                            <option>Within 48 Hours</option>
                            <option>Within 2 Weeks</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-zinc-300 font-semibold mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Michael Henderson"
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 font-semibold mb-1">Phone Number for Verification</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. (214) 555-0199"
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:opacity-95 transition cursor-pointer mt-2"
                      >
                        Lock In $100 Discount & Free Quote
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 pt-1">
                        <Shield className="w-3 h-3 text-amber-400" />
                        <span>Zero Obligation • 100% Privacy Protected</span>
                      </div>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </section>

          {/* SOCIAL PROOF STATS COUNTER */}
          <div className="bg-[#0E0E14] border-y border-amber-500/20 py-6 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">850+</div>
                <div className="text-xs text-zinc-400 mt-1">Roofs & Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">5.0 ★</div>
                <div className="text-xs text-zinc-400 mt-1">Over 480+ Google Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">60 Min</div>
                <div className="text-xs text-zinc-400 mt-1">Average Rapid Response</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</div>
                <div className="text-xs text-zinc-400 mt-1">Satisfaction Guarantee</div>
              </div>
            </div>
          </div>

          {/* 10 CORE SERVICES GRID */}
          <section id="services" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                MASTER SERVICE CATALOG
              </span>
              <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-white">
                Comprehensive High-Precision Solutions
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Engineered specifically for residential and commercial architecture across {location}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {business.services10.map((srv, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl glass-gold p-5 border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300 bg-black/60 px-2.5 py-1 rounded-lg border border-amber-400/20">
                        {srv.priceGuide}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition mb-2">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {srv.benefit}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-mono text-zinc-400">
                      {srv.gmbServiceCategory}
                    </span>
                    <a
                      href="#quote"
                      className="text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1 transition"
                    >
                      <span>Book Service</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8K VISUAL GALLERY (16+ PHOTOS GRID) */}
          <section id="gallery" className="py-16 px-4 sm:px-8 bg-[#09090D] border-t border-white/5">
            <div className="max-w-6xl mx-auto space-y-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                    REAL WORK EVIDENCE
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-white mt-2">
                    8K Ultra-HD Project Portfolio
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Authentic completed jobs, high-altitude drone surveys, and master installations in {location}.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
                  {['All', 'Roofing', 'Residential', 'Craftsmanship', 'Inspection'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setGalleryFilter(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        galleryFilter === tab ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Grid (16 Images) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredGallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImageZoom(img.url)}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/10 hover:border-amber-400/50 cursor-pointer shadow-lg transition"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                        {img.tag}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-tight">
                        {img.title}
                      </h4>
                      <p className="text-[10px] text-zinc-300 line-clamp-1 mt-0.5">
                        {img.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* GOOGLE 5-STAR REVIEWS CAROUSEL */}
          <section id="reviews" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-lg">
                {'★'.repeat(5)}
              </div>
              <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-white">
                Verified 5-Star Neighborhood Reviews
              </h2>
              <p className="text-xs text-zinc-400">
                Real homeowners across {location} share their experience with {business.businessName}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl glass-gold border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">{'★'.repeat(5)}</div>
                  <span className="text-[10px] text-zinc-400 font-mono">3 days ago</span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed italic">
                  "{business.advantageTwist30Pct.headline} was completely honored! They were at our driveway in 35 minutes flat after high winds damaged our shingles. Flawless workmanship."
                </p>
                <div className="pt-2 border-t border-white/5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center">
                    JD
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">James Donaldson</div>
                    <div className="text-[10px] text-zinc-400">Verified Homeowner • {location}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-gold border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">{'★'.repeat(5)}</div>
                  <span className="text-[10px] text-zinc-400 font-mono">1 week ago</span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed italic">
                  "No surprise pricing. The digital camera inspection showed us exactly what needed fixing before they even quoted us. Saved us thousands compared to other quotes."
                </p>
                <div className="pt-2 border-t border-white/5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center">
                    ER
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Elena Rodriguez</div>
                    <div className="text-[10px] text-zinc-400">Verified Client • {location}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-gold border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">{'★'.repeat(5)}</div>
                  <span className="text-[10px] text-zinc-400 font-mono">2 weeks ago</span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed italic">
                  "The lifetime warranty certificate gave my family complete peace of mind. True professionals from the front office to the crew on the roof."
                </p>
                <div className="pt-2 border-t border-white/5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center">
                    MT
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Marcus Vance</div>
                    <div className="text-[10px] text-zinc-400">Commercial Property Owner</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-[#050508] border-t border-amber-500/20 py-10 px-4 sm:px-8 text-xs text-zinc-400">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
              <div className="space-y-2">
                <div className="text-base font-cinzel font-bold text-amber-300">{business.businessName}</div>
                <p className="text-[11px] leading-relaxed">
                  Premier {category} operating across the greater {location} metropolitan area with 24/7 emergency dispatch.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Service Hours</h4>
                <p className="text-[11px]">Monday - Sunday: 24/7 Available</p>
                <p className="text-[11px] text-emerald-400 mt-1">● Emergency Teams on Standby</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Coverage Areas</h4>
                <p className="text-[11px]">{location} Centroid, North Metro, West Suburbs, South County, East Metro</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Direct Contact</h4>
                <p className="text-[11px]">Priority Line: (800) 555-0199</p>
                <p className="text-[11px]">Email: dispatch@{business.businessName.toLowerCase().replace(/[^a-z]/g, '')}.com</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] gap-2">
              <p>© 2026 {business.businessName}. All rights reserved. Licensed, Bonded & Insured.</p>
              <p className="font-mono text-amber-400/80">Built with GMB Empire Engine • Astra Pro Architecture</p>
            </div>
          </footer>

          {/* FLOATING ACTION BUTTONS */}
          {/* Floating WhatsApp Button (Bottom Right) */}
          <a
            href={`https://wa.me/18005550199?text=Hello%20${encodeURIComponent(business.businessName)},%20I%20would%20like%20to%20book%20a%20free%20quote%20for%20my%20property%20in%20${encodeURIComponent(location)}!`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent" />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>

          {/* Floating Quick Call Button (Bottom Left) */}
          <a
            href="tel:8005550199"
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-amber-400 text-black font-extrabold text-xs shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
            title="Call Priority Hotline"
          >
            <Phone className="w-4 h-4 fill-black text-black" />
            <span className="hidden sm:inline">24/7 Hotline</span>
          </a>

        </div>
      </div>

      {/* FULL-SIZE IMAGE ZOOM LIGHTBOX */}
      {activeImageZoom && (
        <div 
          onClick={() => setActiveImageZoom(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-amber-400/40">
            <img src={activeImageZoom} alt="Zoomed 8K Preview" className="w-full h-full object-contain" />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
