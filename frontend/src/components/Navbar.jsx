import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Heart, ChevronDown, User, Coins, 
  MapPin, Bell, Gift, HelpCircle, Package, Sparkles, Store, 
  ArrowRight, ShieldCheck, X, Zap 
} from 'lucide-react';

export default function Navbar({
  searchTerm,
  onSearchChange,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  superCoins = 350,
  onOpenSuperCoinZone,
  selectedCategory,
  onSelectCategory,
  onScrollToMinutes,
  onOpenAdmin,
}) {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [pincode, setPincode] = useState('560001');

  const popularSearches = [
    'iPhone 15 Pro Max',
    'Sony WH-1000XM5',
    'Nike Air Max',
    'Samsung Watch 6',
    'Anarkali Kurta',
    'Mechanical Keyboard',
    'Digital Air Fryer'
  ];

  const handlePincodeChange = () => {
    const val = prompt('Enter Delivery Pincode:', pincode);
    if (val && val.trim().length === 6) {
      setPincode(val.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2874f0] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Brand Logo */}
        <div
          onClick={() => onSelectCategory('All')}
          className="flex flex-col items-start cursor-pointer select-none shrink-0"
        >
          <div className="flex items-center gap-1 font-extrabold text-xl sm:text-2xl tracking-tight italic font-['Outfit']">
            <span>JustBuyIt</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-100 -mt-1 italic">
            <span>Explore</span>
            <span className="text-[#ffe500] font-black flex items-center gap-0.5">
              Plus <Sparkles className="w-2.5 h-2.5 fill-[#ffe500]" />
            </span>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="flex items-center bg-white rounded-sm shadow-sm overflow-hidden px-3 py-2 text-slate-800">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search for Products, Brands and More"
              className="w-full text-xs sm:text-sm bg-transparent placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="p-0.5 text-slate-400 hover:text-slate-600 mr-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              className="text-[#2874f0] hover:text-blue-700 cursor-pointer flex items-center justify-center pl-1"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Auto-suggest dropdown on focus */}
          {searchFocused && !searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-2xl border border-slate-200 py-2 z-50 text-xs text-slate-700 animate-fadeIn">
              <div className="px-3 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Discover More
              </div>
              {popularSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => onSearchChange(item)}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: 10-Min Minutes, Delivery Pincode, Login, More, Cart */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          
          {/* Admin Control Center Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-950 text-[#ffe500] font-black text-xs border border-yellow-400/50 shadow-md transition-all cursor-pointer hover:scale-105"
            title="Open Just Buy It Admin Portal (Full Master Control)"
          >
            <ShieldCheck className="w-4 h-4 text-[#ffe500]" />
            <span className="font-bold">Admin Portal</span>
          </button>

          {/* Minutes Quick Button */}
          <button
            onClick={onScrollToMinutes}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffe500] hover:bg-yellow-300 text-emerald-950 font-black text-xs shadow-md transition-all cursor-pointer transform hover:scale-105"
            title="Just Buy It Minutes - 10 Minute Express Delivery"
          >
            <Zap className="w-3.5 h-3.5 fill-emerald-950" />
            <span>Minutes (10 Mins)</span>
          </button>

          {/* Pincode Pill */}
          <button
            onClick={handlePincodeChange}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-700/60 hover:bg-blue-700 text-xs font-semibold cursor-pointer border border-blue-400/30"
            title="Change Delivery Location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#ffe500]" />
            <span className="text-[11px]">Deliver to <strong className="text-[#ffe500]">{pincode}</strong></span>
          </button>

          {/* Login / Account Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLoginDropdownOpen(true)}
            onMouseLeave={() => setLoginDropdownOpen(false)}
          >
            <button
              className="bg-white text-[#2874f0] font-bold text-xs sm:text-sm px-5 sm:px-7 py-1.5 rounded-sm hover:bg-slate-100 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {loginDropdownOpen && (
              <div className="absolute top-full right-0 w-64 bg-white rounded-md shadow-2xl border border-slate-100 py-2 z-50 text-xs text-slate-700 animate-fadeIn">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-800">New customer?</span>
                  <span className="text-[#2874f0] font-bold cursor-pointer hover:underline">Sign Up</span>
                </div>

                <button
                  onClick={() => {
                    if (onOpenAdmin) onOpenAdmin();
                    setLoginDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 bg-yellow-50 hover:bg-yellow-100 text-slate-900 flex items-center justify-between group cursor-pointer border-b border-yellow-200"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#2874f0]" />
                    <span className="font-bold text-[#2874f0]">Admin Control Portal</span>
                  </div>
                  <span className="bg-[#ffe500] text-slate-900 font-black px-1.5 py-0.5 rounded text-[9px] uppercase">
                    Master
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenSuperCoinZone) onOpenSuperCoinZone();
                    setLoginDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <span className="font-medium group-hover:text-[#2874f0]">SuperCoin Zone</span>
                  </div>
                  <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    {superCoins} Coins
                  </span>
                </button>

                <button
                  onClick={() => {
                    onOpenOrders();
                    setLoginDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 group cursor-pointer"
                >
                  <Package className="w-4 h-4 text-[#2874f0]" />
                  <span className="font-medium group-hover:text-[#2874f0]">Orders</span>
                </button>

                <button
                  onClick={() => {
                    onOpenWishlist();
                    setLoginDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span className="font-medium group-hover:text-[#2874f0]">Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <div className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 cursor-pointer">
                  <Gift className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">Coupons & Rewards</span>
                </div>

                <div className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 cursor-pointer">
                  <Bell className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Notifications</span>
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <div className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 cursor-pointer">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span className="font-medium">24x7 Customer Care</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Become a Seller */}
          <button
            onClick={() => alert('Welcome to Just Buy It Seller Hub! List your inventory and reach millions of customers across India.')}
            className="hidden lg:flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:text-slate-100 cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>Become a Seller</span>
          </button>

          {/* Cart with Badge */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold hover:text-slate-100 cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-4 px-1 bg-[#ffe500] text-[#2874f0] rounded-full text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold">Cart</span>
          </button>

        </div>

      </div>
    </header>
  );
}
