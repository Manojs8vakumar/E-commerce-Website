import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist = [],
  onAddToCart,
  onRemoveFromWishlist,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-white/20 shadow-2xl p-6 bg-[#0d121f]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <h2 className="text-xl font-black text-white font-['Outfit']">
              My Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Heart className="w-16 h-16 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Your wishlist is empty</h3>
            <p className="text-xs text-slate-400">Save your favorite items here to purchase later!</p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold text-xs"
            >
              Discover Products
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-black/40 p-2 shrink-0 flex items-center justify-center">
                  <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-black text-white font-['Outfit']">
                      ₹{item.price?.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(item);
                      onRemoveFromWishlist(item.id);
                    }}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    title="Move to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Move to Cart</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/10 cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
