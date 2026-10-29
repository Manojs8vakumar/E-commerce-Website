import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { fetchOrderByNumber } from '../services/api';

export default function OrderTrackingModal({ isOpen, onClose, defaultOrderNumber = '' }) {
  const [orderQuery, setOrderQuery] = useState(defaultOrderNumber);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchOrderByNumber(orderQuery.trim());
      setOrder(data);
    } catch (err) {
      setError('Order not found with number ' + orderQuery + '. Please check and try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-white/20 shadow-2xl p-6 bg-[#0d121f]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Package className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-black text-white font-['Outfit']">
            Track Your Order
          </h2>
        </div>

        {/* Search input */}
        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. JBI-2026-10294)"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-amber-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
            {error}
          </div>
        )}

        {/* Order Details & Timeline */}
        {order ? (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-amber-400 text-sm">{order.orderNumber}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                  {order.orderStatus}
                </span>
              </div>
              <div className="text-slate-300">
                Customer: <strong className="text-white">{order.customerName}</strong> ({order.customerPhone})
              </div>
              <div className="text-slate-400">
                Delivery To: {order.shippingAddress}, {order.city} - {order.pincode}
              </div>
              <div className="text-slate-400">
                Total: <strong className="text-white">₹{order.totalAmount?.toLocaleString()}</strong> ({order.paymentMethod})
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4 pl-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Delivery Timeline</h3>

              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Order Confirmed & Payment Verified</div>
                  <div className="text-[11px] text-slate-400">Seller has acknowledged order and prepared invoice</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Packed & Quality Inspected by JBI Assured</div>
                  <div className="text-[11px] text-slate-400">Passed standard 7-checkpoint authenticity verification</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 animate-pulse">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-300">In Transit - Express Prime Hub</div>
                  <div className="text-[11px] text-slate-400">Arrived at sorting facility closest to your delivery address</div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 opacity-50">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-300">Out for Delivery</div>
                  <div className="text-[11px] text-slate-400">Delivery agent will contact via OTP</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            Enter an order ID to view real-time delivery status, or place a new order to receive one!
          </div>
        )}

      </div>
    </div>
  );
}
