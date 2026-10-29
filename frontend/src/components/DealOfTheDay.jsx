import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Zap, ChevronRight, ShoppingCart } from 'lucide-react';

export default function DealOfTheDay({ deals = [], onSelectProduct, onAddToCart, onViewAll }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!deals || deals.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="bg-white rounded-md shadow-sm border border-slate-200 p-4 sm:p-5">
        
        {/* Deal Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight font-['Outfit']">
              Best Deals of the Day
            </h2>

            {/* Countdown timer */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
              <Clock className="w-3.5 h-3.5 text-[#2874f0]" />
              <span>Ends in</span>
              <span className="font-mono font-bold text-slate-800">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          <button
            onClick={onViewAll}
            className="self-start sm:self-auto px-4 py-2 rounded-sm bg-[#2874f0] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW ALL</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 pt-4">
          {deals.slice(0, 5).map((product) => {
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group p-3 rounded-md border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer bg-white"
              >
                {/* Product Image */}
                <div className="relative h-40 sm:h-44 w-full flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discountPercent && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#388e3c] text-white">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mt-2 text-center space-y-1">
                  <h3 className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#2874f0] transition-colors">
                    {product.title}
                  </h3>

                  <div className="text-[11px] font-bold text-[#388e3c]">
                    From ₹{product.price?.toLocaleString()}
                  </div>

                  <div className="text-[10px] text-slate-400">
                    {product.brand} • Best Offer
                  </div>

                  {/* JBI Assured Badge */}
                  <div className="pt-1 flex items-center justify-center">
                    <span className="f-assured-badge">
                      <span className="f-check">✓</span> Assured
                    </span>
                  </div>
                </div>

                {/* Quick Add button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="mt-3 w-full py-1.5 rounded-sm bg-slate-100 hover:bg-[#ff9f00] hover:text-white text-slate-700 font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
