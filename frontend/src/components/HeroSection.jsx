import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Sparkles, Zap, ShieldCheck, 
  Coins, ArrowRight, Video, Compass, Play, Pause 
} from 'lucide-react';

const JBI_SLIDES = [
  {
    id: 1,
    title: 'THE BIG BILLION DAYS',
    subtitle: 'India’s Biggest Festive Sale is LIVE!',
    highlight: '50% to 80% OFF',
    desc: 'Extra 10% Instant Discount on HDFC Bank & SBI Cards | No Cost EMI Available',
    bgGradient: 'from-[#002f6c] via-[#004b93] to-[#2874f0]',
    btnText: 'Shop Best Deals',
    badge: 'GRAND FESTIVE SALE',
    category: 'All',
    productImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    productName: 'Sony WH-1000XM5 Noise Cancelling',
    price: '₹26,990',
    originalPrice: '₹34,990'
  },
  {
    id: 2,
    title: 'FLAGSHIP SMARTPHONE BONANZA',
    subtitle: 'Apple iPhone 15 Pro & Samsung Galaxy',
    highlight: 'From ₹13,999/mo No Cost EMI',
    desc: 'Exchange Bonus up to ₹12,000 + Extra ₹5,000 Bank Cashback',
    bgGradient: 'from-[#1e1e24] via-[#2d2d3a] to-[#4338ca]',
    btnText: 'Explore Smartphones',
    badge: 'HOTTEST SMARTPHONES',
    category: 'Mobiles',
    productImg: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    productName: 'Apple iPhone 15 Pro Max Titanium',
    price: '₹1,34,900',
    originalPrice: '₹1,59,900'
  },
  {
    id: 3,
    title: 'FASHION & SNEAKERS CARNIVAL',
    subtitle: 'Nike, Roadster, Biba & Fossil',
    highlight: 'Min 60% OFF',
    desc: 'JBI Assured Quality Check | Doorstep Trial & 7-Day Easy Returns',
    bgGradient: 'from-[#831843] via-[#9d174d] to-[#be185d]',
    btnText: 'Shop Fashion Hits',
    badge: 'TRENDING FASHION',
    category: 'Fashion',
    productImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    productName: 'Nike Air Max 270 React Sneakers',
    price: '₹7,495',
    originalPrice: '₹13,995'
  }
];

export default function HeroSection({ onExplore, onQuickBuy }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [is3DMode, setIs3DMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Auto-rotate banner slides every 5.5 seconds
  useEffect(() => {
    if (is3DMode) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % JBI_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [is3DMode]);

  // 3D Canvas rendering when 3D mode is toggled on
  useEffect(() => {
    if (!is3DMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * 800 + 100,
      radius: Math.random() * 2 + 1,
      color: ['#2874f0', '#ffe500', '#fb641b', '#388e3c'][Math.floor(Math.random() * 4)],
      vz: Math.random() * 2 + 1
    }));

    const render = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.z -= p.vz;
        if (p.z <= 10) {
          p.z = 800;
          p.x = Math.random() * width - width / 2;
          p.y = Math.random() * height - height / 2;
        }
        const scale = 350 / (350 + p.z);
        const x2d = width / 2 + (p.x + mousePos.x * 50) * scale;
        const y2d = height / 2 + (p.y + mousePos.y * 50) * scale;
        ctx.beginPath();
        ctx.arc(x2d, y2d, p.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8 * scale;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [is3DMode, mousePos]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const slide = JBI_SLIDES[currentSlide] || JBI_SLIDES[0];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 mb-6"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        
        {/* Mode Switcher Button */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {is3DMode ? (
              <>
                <Zap className="w-3.5 h-3.5 text-[#2874f0]" /> Classic Banner Slider
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-[#fb641b]" /> Interactive 3D Mode
              </>
            )}
          </button>
        </div>

        {/* 3D WebGL Canvas Layer */}
        {is3DMode && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />
        )}

        {/* Banner Slide Content */}
        <div
          className={`relative z-20 py-10 sm:py-14 px-6 sm:px-12 text-white bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 min-h-[360px] sm:min-h-[400px] flex items-center justify-between`}
        >
          {/* Left Text */}
          <div className="max-w-xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-white/20 text-[#ffe500] backdrop-blur-sm border border-white/20 uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-[#ffe500]" /> {slide.badge}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight leading-none text-white drop-shadow-md">
              {slide.title}
            </h1>

            <p className="text-lg sm:text-2xl font-bold text-[#ffe500]">
              {slide.subtitle} — <span className="underline decoration-wavy">{slide.highlight}</span>
            </p>

            <p className="text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed">
              {slide.desc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onExplore(slide.category)}
                className="px-6 py-3 rounded-sm bg-[#ffe500] hover:bg-yellow-400 text-slate-900 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-black/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>{slide.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 text-xs font-bold text-white/90 bg-white/10 px-3 py-2 rounded-sm border border-white/15">
                <ShieldCheck className="w-4 h-4 text-[#ffe500]" />
                <span>100% JBI Assured Quality</span>
              </div>
            </div>
          </div>

          {/* Right Product 3D Interactive Feature */}
          <div
            className="hidden md:flex flex-col items-center justify-center max-w-sm"
            style={{
              transform: `perspective(800px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div 
              onClick={() => onExplore(slide.category)}
              className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl text-center group cursor-pointer hover:bg-white/20 transition-all hover:scale-102"
              title={`View ${slide.category} products in catalog`}
            >
              <div className="h-48 w-48 mx-auto flex items-center justify-center p-2">
                <img
                  src={slide.productImg}
                  alt={slide.productName}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-bold text-white mt-3 line-clamp-1">
                {slide.productName}
              </h3>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-xl font-black text-[#ffe500]">{slide.price}</span>
                <span className="text-xs text-slate-300 line-through">{slide.originalPrice}</span>
              </div>
              <div className="mt-2 text-[10px] uppercase font-bold text-[#ffe500] tracking-wider flex items-center justify-center gap-1">
                <span>Click to View {slide.category}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? JBI_SLIDES.length - 1 : prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-16 bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center rounded-r-md transition-all cursor-pointer z-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % JBI_SLIDES.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-16 bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center rounded-l-md transition-all cursor-pointer z-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

        {/* Slide Indicators Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
          {JBI_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-6 bg-[#ffe500]' : 'w-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
