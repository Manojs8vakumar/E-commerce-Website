import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, 
  ShieldCheck, Coins, Tag, MapPin, Check 
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  coupon,
  onApplyCoupon,
  couponDiscount = 0,
  superCoins = 350,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [useSuperCoins, setUseSuperCoins] = useState(false);

  if (!isOpen) return null;

  const totalMRP = cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = totalMRP - subTotal;
  const superCoinDiscount = useSuperCoins ? Math.min(50, superCoins) : 0;
  const totalSavings = totalDiscount + couponDiscount + superCoinDiscount;
  const finalPayable = Math.max(0, subTotal - couponDiscount - superCoinDiscount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'JUSTBUYIT' || code === 'JBI200') {
      onApplyCoupon(code, 200);
    } else if (code === 'BIGBILLION500' || code === 'JBI500') {
      if (subTotal >= 2000) {
        onApplyCoupon(code, 500);
      } else {
        alert('JBI500 requires minimum order value of ₹2,000');
      }
    } else {
      alert('Invalid coupon. Try JUSTBUYIT or JBI500');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg h-full bg-[#f1f3f6] flex flex-col justify-between shadow-2xl">
        
        {/* Just Buy It Cart Header */}
        <div className="bg-[#2874f0] text-white px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold font-['Outfit']">
              Just Buy It Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deliver To Pincode Bar */}
        <div className="bg-white px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Deliver to: <strong className="text-slate-900">560001, Bangalore</strong></span>
          </div>
          <button className="text-[#2874f0] font-bold text-xs uppercase hover:underline cursor-pointer">
            Change
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full bg-white rounded-md p-8 flex flex-col items-center justify-center text-center shadow-sm">
              <ShoppingCart className="w-16 h-16 text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-800">Your Just Buy It Cart is empty!</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explore our Big Billion Days & Best of Electronics deals to add items to your cart.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-sm bg-[#2874f0] text-white font-bold text-xs uppercase shadow-md cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              {/* Product Rows */}
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-md p-3.5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center p-1 border border-slate-100 rounded">
                      <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                    </div>

                    {/* Title & Price */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="text-[11px] text-slate-400">
                        Seller: SuperComNet • <span className="f-assured-badge scale-90"><span className="f-check">✓</span> Assured</span>
                      </div>

                      <div className="flex items-baseline gap-2 pt-0.5">
                        <span className="text-sm font-bold text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </span>
                        )}
                        {item.discountPercent && (
                          <span className="text-xs font-bold text-[#388e3c]">
                            {item.discountPercent}% Off
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-slate-800 text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold">
                      <button
                        onClick={() => alert(`Saved "${item.title}" for later!`)}
                        className="text-slate-600 hover:text-[#2874f0] uppercase text-[11px] cursor-pointer"
                      >
                        SAVE FOR LATER
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-600 hover:text-rose-600 uppercase text-[11px] cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* SuperCoins Redemption Option */}
              <div className="bg-white rounded-md p-3 border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <div>
                    <div className="font-bold text-slate-800">Use 50 SuperCoins</div>
                    <div className="text-[10px] text-slate-500">Save extra ₹50 using your balance ({superCoins} available)</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={useSuperCoins}
                  onChange={(e) => setUseSuperCoins(e.target.checked)}
                  className="w-4 h-4 text-[#2874f0] rounded cursor-pointer"
                />
              </div>

              {/* Coupon Form */}
              <div className="bg-white rounded-md p-3 border border-slate-200 shadow-xs space-y-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (JUSTBUYIT)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2 border border-slate-200 rounded text-xs uppercase font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2874f0] hover:bg-blue-700 text-white font-bold text-xs uppercase rounded cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {coupon && (
                  <div className="text-[11px] text-[#388e3c] font-bold flex justify-between">
                    <span>Coupon '{coupon}' applied (-₹{couponDiscount})</span>
                    <button onClick={() => onApplyCoupon('', 0)} className="text-slate-400 hover:text-rose-500">Remove</button>
                  </div>
                )}
              </div>

              {/* Just Buy It PRICE DETAILS Card */}
              <div className="bg-white rounded-md border border-slate-200 p-4 shadow-xs space-y-3">
                <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                  PRICE DETAILS
                </h3>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Price ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                    <span>₹{totalMRP.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[#388e3c]">
                    <span>Discount</span>
                    <span>-₹{totalDiscount.toLocaleString()}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[#388e3c]">
                      <span>Coupons for you</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}

                  {superCoinDiscount > 0 && (
                    <div className="flex justify-between text-[#388e3c]">
                      <span>SuperCoins Savings</span>
                      <span>-₹{superCoinDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-[#388e3c] font-bold">
                      <span className="line-through text-slate-400 mr-1">₹40</span> Free
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-sm text-slate-900 pt-3 border-t border-slate-100">
                    <span>Total Amount</span>
                    <span className="text-base text-slate-900 font-['Outfit']">
                      ₹{finalPayable.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[#388e3c] pt-1">
                    You will save ₹{totalSavings.toLocaleString()} on this order
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
              </div>
            </>
          )}
        </div>

        {/* Sticky Place Order Button */}
        {cartItems.length > 0 && (
          <div className="bg-white p-3 border-t border-slate-200 flex items-center justify-between shadow-lg">
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">Total Payable</div>
              <div className="text-base font-bold text-slate-900 font-['Outfit']">
                ₹{finalPayable.toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => {
                onProceedCheckout();
                onClose();
              }}
              className="py-3 px-8 rounded-sm bg-[#fb641b] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer font-['Outfit']"
            >
              PLACE ORDER
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
