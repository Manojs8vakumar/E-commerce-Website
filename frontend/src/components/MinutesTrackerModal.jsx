import React, { useState, useEffect } from 'react';
import { 
  X, Zap, Clock, MapPin, Phone, ShieldCheck, CheckCircle2, 
  Bike, Package, Home, Sparkles 
} from 'lucide-react';

export default function MinutesTrackerModal({ isOpen, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(534); // ~8 mins 54 secs
  const [stage, setStage] = useState(2); // 1: Packed, 2: On The Way, 3: Arrived

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setStage(3);
          return 0;
        }
        if (prev === 300) setStage(3);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden my-auto border border-emerald-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#047857] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ffe500] text-emerald-950 flex items-center justify-center font-black">
              <Zap className="w-6 h-6 fill-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base font-['Outfit']">Just Buy It Minutes Live Tracker</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#ffe500] text-emerald-950">
                  ON TIME
                </span>
              </div>
              <div className="text-xs text-emerald-200">Indiranagar Express Pod #4</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Stopwatch & ETA Banner */}
        <div className="p-5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
              Guaranteed Delivery ETA
            </div>
            <div className="text-3xl font-black text-emerald-900 font-['Outfit'] flex items-baseline gap-1 mt-0.5">
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              <span className="text-xs text-emerald-700 font-bold">MINS LEFT</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">
              Rider is 650m away • Travelling via 100ft Road
            </div>
          </div>

          {/* Delivery PIN */}
          <div className="bg-white p-2.5 rounded-xl border border-emerald-300 text-center shadow-xs">
            <div className="text-[9px] text-slate-400 font-bold uppercase">Delivery PIN</div>
            <div className="text-xl font-mono font-black text-emerald-800 tracking-wider">4892</div>
            <div className="text-[9px] text-emerald-600 font-semibold">Share at door</div>
          </div>
        </div>

        {/* Animated Map Simulation */}
        <div className="relative h-44 bg-slate-900 overflow-hidden flex items-center justify-center">
          {/* Simulated Grid Road Map */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Road Path Line */}
          <div className="absolute w-3/4 h-1 bg-gradient-to-r from-emerald-500 via-yellow-400 to-emerald-400 rounded-full"></div>

          {/* Dark Store Icon on Left */}
          <div className="absolute left-8 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-300 mt-1">Dark Store</span>
          </div>

          {/* Moving Scooter Icon */}
          <div
            className="absolute z-20 flex flex-col items-center transition-all duration-1000"
            style={{ left: '55%' }}
          >
            <div className="w-11 h-11 rounded-full bg-[#ffe500] text-emerald-950 flex items-center justify-center shadow-lg shadow-yellow-500/40 animate-pulse">
              <Bike className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-[#ffe500] bg-black/60 px-1.5 py-0.5 rounded mt-1">
              Ramesh (Hero EV)
            </span>
          </div>

          {/* Customer Home on Right */}
          <div className="absolute right-8 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Home className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-300 mt-1">Flat 402</span>
          </div>
        </div>

        {/* Rider Profile Card */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm">
              RK
            </div>
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>Ramesh Kumar</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                  ★ 4.9 (2,400+ deliveries)
                </span>
              </div>
              <div className="text-[11px] text-slate-500">Electric Vehicle • Temperature Controlled Bag</div>
            </div>
          </div>

          <button
            onClick={() => alert('Calling delivery partner Ramesh Kumar: +91 9845012345')}
            className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer"
            title="Call Rider"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Step Express Milestones */}
        <div className="p-4 space-y-3 bg-slate-50 text-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              <span className="font-semibold text-slate-800">Order Placed & Confirmed</span>
              <span className="text-slate-400 text-[10px]">11:32 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              <span className="font-semibold text-slate-800">Packed in 94 seconds at Dark Store</span>
              <span className="text-slate-400 text-[10px]">11:34 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] animate-ping shrink-0">
              ●
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="font-bold text-emerald-700">Rider on the Way to Your Location</span>
              <span className="text-emerald-600 font-bold text-[10px]">Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-40">
            <div className="w-4 h-4 rounded-full border border-slate-400 shrink-0"></div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-slate-600">Arrived at Gate</span>
              <span className="text-slate-400 text-[10px]">ETA 11:42 PM</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white text-center border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
}
