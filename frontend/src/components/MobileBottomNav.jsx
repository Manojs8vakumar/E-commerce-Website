import React from 'react';
import { Home, Grid, Zap, Heart, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  onSelectTab,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d121f]/95 backdrop-blur-lg border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
      
      {/* Home */}
      <button
        onClick={() => onSelectTab('home')}
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      {/* Categories */}
      <button
        onClick={() => onSelectTab('categories')}
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activeTab === 'categories' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">Categories</span>
      </button>

      {/* Deals */}
      <button
        onClick={() => onSelectTab('deals')}
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activeTab === 'deals' ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Zap className="w-5 h-5 fill-rose-500/20" />
        <span className="text-[10px]">Deals</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={onOpenWishlist}
        className="relative flex flex-col items-center gap-1 p-1.5 text-slate-400 hover:text-pink-400 transition-colors"
      >
        <Heart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-2 w-4 h-4 bg-pink-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
        <span className="text-[10px]">Wishlist</span>
      </button>

      {/* Cart */}
      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center gap-1 p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 w-4 h-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[10px]">Cart</span>
      </button>

    </div>
  );
}
