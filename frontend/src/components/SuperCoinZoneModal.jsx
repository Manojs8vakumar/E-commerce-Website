import React from 'react';
import { X, Coins, Sparkles, Gift, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SuperCoinZoneModal({
  isOpen,
  onClose,
  superCoins = 350,
  onRedeemReward,
}) {
  if (!isOpen) return null;

  const rewards = [
    {
      id: 1,
      title: 'Flat ₹100 OFF on Headphones & Audio',
      coinsRequired: 50,
      code: 'COIN100',
      tag: 'POPULAR REWARD',
    },
    {
      id: 2,
      title: 'Extra 10% OFF on Top Fashion & Footwear',
      coinsRequired: 75,
      code: 'COINFASHION',
      tag: 'FASHION PASS',
    },
    {
      id: 3,
      title: 'Times Prime 1-Month Complimentary Pass',
      coinsRequired: 100,
      code: 'TIMESFREE',
      tag: 'ENTERTAINMENT',
    },
    {
      id: 4,
      title: 'Flat ₹250 Flight & Travel Discount',
      coinsRequired: 150,
      code: 'TRAVEL250',
      tag: 'TRAVEL SPECIAL',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-md bg-white shadow-2xl overflow-hidden my-auto border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002f6c] to-[#2874f0] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-[#ffe500]" />
            <div>
              <h2 className="text-lg font-bold font-['Outfit']">Just Buy It SuperCoin Zone</h2>
              <div className="flex items-center gap-1 text-[11px] text-[#ffe500] font-semibold italic">
                <span>✦ Just Buy It VIP Member</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SuperCoin Balance Card */}
        <div className="p-5 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-800 font-bold uppercase tracking-wider">Available Balance</div>
            <div className="text-3xl font-black text-amber-600 flex items-center gap-1 font-['Outfit']">
              <span>{superCoins}</span>
              <span className="text-base text-amber-700 font-bold">SuperCoins</span>
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">
              Earn 4 SuperCoins for every ₹100 spent on Just Buy It!
            </div>
          </div>

          <div className="w-14 h-14 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center">
            <Coins className="w-8 h-8 fill-amber-500 text-amber-600" />
          </div>
        </div>

        {/* Rewards List */}
        <div className="p-5 space-y-4 max-h-[55vh] overflow-y-auto">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
            Exclusive Rewards for Plus Members
          </h3>

          <div className="space-y-3">
            {rewards.map((rew) => {
              const canAfford = superCoins >= rew.coinsRequired;

              return (
                <div
                  key={rew.id}
                  className="p-3.5 rounded border border-slate-200 hover:border-amber-400 transition-all flex items-center justify-between gap-3 bg-white"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      {rew.tag}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800">{rew.title}</h4>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500" />
                      <span>{rew.coinsRequired} SuperCoins Required</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (canAfford) {
                        onRedeemReward(rew);
                        alert(`Successfully redeemed "${rew.title}"! Code ${rew.code} copied.`);
                      } else {
                        alert(`You need ${rew.coinsRequired - superCoins} more SuperCoins to unlock this reward.`);
                      }
                    }}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-sm font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-[#fb641b] hover:bg-orange-600 text-white shadow-sm'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Locked'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          SuperCoins are 100% redeemable on orders, bookings and gift passes.
        </div>

      </div>
    </div>
  );
}
