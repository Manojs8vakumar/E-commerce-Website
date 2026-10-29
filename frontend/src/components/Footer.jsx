import React from 'react';
import { Store, Gift, HelpCircle, ShieldCheck, Sparkles, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollTop, onSelectCategory, onOpenAdmin }) {
  return (
    <footer className="bg-[#172337] text-white text-xs mt-auto border-t border-slate-700">
      
      {/* Back to top bar */}
      <button
        onClick={onScrollTop}
        className="w-full py-3 bg-[#2874f0] hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
      >
        <ArrowUp className="w-4 h-4" /> Back to top
      </button>

      {/* Main Just Buy It Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-6 gap-6 text-[11px] text-slate-300">
        
        {/* About */}
        <div className="space-y-2">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">ABOUT</div>
          <ul className="space-y-1.5">
            <li><span className="hover:underline cursor-pointer">Contact Us</span></li>
            <li><span className="hover:underline cursor-pointer">About Us</span></li>
            <li><span className="hover:underline cursor-pointer">Careers</span></li>
            <li><span className="hover:underline cursor-pointer">Just Buy It Stories</span></li>
            <li><span className="hover:underline cursor-pointer">Press & News</span></li>
            <li><span className="hover:underline cursor-pointer">Corporate Information</span></li>
          </ul>
        </div>

        {/* Help */}
        <div className="space-y-2">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">HELP</div>
          <ul className="space-y-1.5">
            <li><span className="hover:underline cursor-pointer">Payments</span></li>
            <li><span className="hover:underline cursor-pointer">Shipping</span></li>
            <li><span className="hover:underline cursor-pointer">Cancellation & Returns</span></li>
            <li><span className="hover:underline cursor-pointer">FAQ</span></li>
            <li><span className="hover:underline cursor-pointer">Report Infringement</span></li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div className="space-y-2">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">CONSUMER POLICY</div>
          <ul className="space-y-1.5">
            <li><span className="hover:underline cursor-pointer">Cancellation & Returns</span></li>
            <li><span className="hover:underline cursor-pointer">Terms Of Use</span></li>
            <li><span className="hover:underline cursor-pointer">Security</span></li>
            <li><span className="hover:underline cursor-pointer">Privacy</span></li>
            <li><span className="hover:underline cursor-pointer">Sitemap</span></li>
            <li><span className="hover:underline cursor-pointer">Grievance Redressal</span></li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-2">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">SOCIAL</div>
          <ul className="space-y-1.5">
            <li><span className="hover:underline cursor-pointer">Facebook</span></li>
            <li><span className="hover:underline cursor-pointer">Twitter</span></li>
            <li><span className="hover:underline cursor-pointer">YouTube</span></li>
          </ul>
        </div>

        {/* Mail Us */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-700 md:pl-5">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Mail Us:</div>
          <p className="text-[10px] text-slate-300 leading-relaxed">
            Just Buy It Internet Private Limited,<br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103, Karnataka, India
          </p>
        </div>

        {/* Registered Office Address */}
        <div className="space-y-2">
          <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Registered Office Address:</div>
          <p className="text-[10px] text-slate-300 leading-relaxed">
            CIN : U51109KA2012PTC066107<br />
            Telephone: 044-45614700 / 044-67415800<br />
            GSTIN: 29AABCJ8492K1Z9
          </p>
        </div>

      </div>

      {/* Bottom Bar with Seller, Advertise, Gift Cards & Copyright */}
      <div className="border-t border-slate-700 py-4 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-300">
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-[#ffe500] hover:text-yellow-300 font-bold cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#ffe500]" />
              <span>Admin Portal</span>
            </span>
            <span className="flex items-center gap-1.5 text-white hover:text-amber-400 cursor-pointer">
              <Store className="w-4 h-4 text-[#ffe500]" />
              <span>Become a Seller</span>
            </span>
            <span className="flex items-center gap-1.5 text-white hover:text-amber-400 cursor-pointer">
              <Sparkles className="w-4 h-4 text-[#ffe500]" />
              <span>Advertise</span>
            </span>
            <span className="flex items-center gap-1.5 text-white hover:text-amber-400 cursor-pointer">
              <Gift className="w-4 h-4 text-[#ffe500]" />
              <span>Gift Cards</span>
            </span>
            <span className="flex items-center gap-1.5 text-white hover:text-amber-400 cursor-pointer">
              <HelpCircle className="w-4 h-4 text-[#ffe500]" />
              <span>Help Center</span>
            </span>
          </div>

          <div>
            © 2026 Just Buy It Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white text-[10px]">VISA</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white text-[10px]">Mastercard</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white text-[10px]">RuPay</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white text-[10px]">NetBanking</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-600/30 text-emerald-400 font-bold text-[10px]">COD</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
