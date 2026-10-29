import React, { useState } from 'react';
import { Zap, Clock, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';

const MINUTES_FALLBACK_PRODUCTS = [
  {
    id: 101,
    title: "Amul Taaza Fresh Homogenised Toned Milk (1 Litre)",
    brand: "Amul",
    category: "Grocery",
    subCategory: "Dairy",
    unitQuantity: "1 Litre Pouch",
    price: 56,
    originalPrice: 58,
    discountPercent: 3,
    rating: 4.8,
    ratingCount: 12400,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 8,
  },
  {
    id: 102,
    title: "Britannia 100% Whole Wheat Brown Bread (400g)",
    brand: "Britannia",
    category: "Grocery",
    subCategory: "Dairy",
    unitQuantity: "400g Loaf",
    price: 55,
    originalPrice: 60,
    discountPercent: 8,
    rating: 4.7,
    ratingCount: 8800,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 8,
  },
  {
    id: 103,
    title: "Fresh Sweet Alphonso Mangoes (Carbide Free)",
    brand: "Fresh Harvest",
    category: "Grocery",
    subCategory: "Fruits",
    unitQuantity: "1 kg (4-5 pcs)",
    price: 289,
    originalPrice: 399,
    discountPercent: 28,
    rating: 4.9,
    ratingCount: 8200,
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 10,
  },
  {
    id: 104,
    title: "Fresh Organic Robusta Bananas (Pack of 6)",
    brand: "Fresh Harvest",
    category: "Grocery",
    subCategory: "Fruits",
    unitQuantity: "Pack of 6",
    price: 45,
    originalPrice: 55,
    discountPercent: 18,
    rating: 4.8,
    ratingCount: 11400,
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 7,
  },
  {
    id: 105,
    title: "Lay's India's Magic Masala Potato Chips",
    brand: "Lays",
    category: "Grocery",
    subCategory: "Snacks",
    unitQuantity: "115g Party Pack",
    price: 45,
    originalPrice: 50,
    discountPercent: 10,
    rating: 4.7,
    ratingCount: 34100,
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 8,
  },
  {
    id: 106,
    title: "Haldiram's Nagpur Spicy Aloo Bhujia Sev (400g)",
    brand: "Haldiram",
    category: "Grocery",
    subCategory: "Snacks",
    unitQuantity: "400g Pack",
    price: 110,
    originalPrice: 125,
    discountPercent: 12,
    rating: 4.8,
    ratingCount: 28900,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 8,
  },
  {
    id: 107,
    title: "Maggi 2-Minute Special Masala Instant Noodles",
    brand: "Nestle",
    category: "Grocery",
    subCategory: "Instant Food",
    unitQuantity: "Pack of 4 (280g)",
    price: 58,
    originalPrice: 72,
    discountPercent: 19,
    rating: 4.8,
    ratingCount: 48300,
    imageUrl: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 7,
  },
  {
    id: 108,
    title: "Fortune Sunlite Refined Sunflower Cooking Oil",
    brand: "Fortune",
    category: "Grocery",
    subCategory: "Instant Food",
    unitQuantity: "1 Litre Pouch",
    price: 135,
    originalPrice: 165,
    discountPercent: 18,
    rating: 4.8,
    ratingCount: 22100,
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 9,
  },
  {
    id: 109,
    title: "Coca-Cola Zero Sugar Chilled Can (300 ml)",
    brand: "Coca-Cola",
    category: "Grocery",
    subCategory: "Drinks",
    unitQuantity: "300 ml Chilled Can",
    price: 38,
    originalPrice: 40,
    discountPercent: 5,
    rating: 4.6,
    ratingCount: 19500,
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 6,
  },
  {
    id: 110,
    title: "Fresh Chilled Tender Coconut with Straw",
    brand: "Nature Fresh",
    category: "Grocery",
    subCategory: "Drinks",
    unitQuantity: "1 Unit (450ml+ water)",
    price: 55,
    originalPrice: 70,
    discountPercent: 21,
    rating: 4.8,
    ratingCount: 9400,
    imageUrl: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 8,
  },
  {
    id: 111,
    title: "Cadbury Dairy Milk Silk Chocolate Bar (150g)",
    brand: "Cadbury",
    category: "Grocery",
    subCategory: "Sweets",
    unitQuantity: "150g Silk Bar",
    price: 165,
    originalPrice: 190,
    discountPercent: 13,
    rating: 4.9,
    ratingCount: 29800,
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 7,
  },
  {
    id: 112,
    title: "Ferrero Rocher Fine Hazelnut Chocolates (Pack of 16)",
    brand: "Ferrero",
    category: "Grocery",
    subCategory: "Sweets",
    unitQuantity: "Pack of 16 (200g)",
    price: 549,
    originalPrice: 620,
    discountPercent: 11,
    rating: 4.9,
    ratingCount: 18400,
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
    deliveryMinutes: 9,
  }
];

export default function MinutesSection({
  minutesProducts = [],
  cartItems = [],
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
  onOpenExpressTracker,
  onSelectProduct,
}) {
  const [selectedSubCat, setSelectedSubCat] = useState('All');
  const items = minutesProducts && minutesProducts.length > 0 ? minutesProducts : MINUTES_FALLBACK_PRODUCTS;

  // Strict item classification helper function
  const matchItemToSubCategory = (item, targetSubCat) => {
    if (targetSubCat === 'All') return true;

    // 1. If explicit subCategory is assigned, use strict equality (case-insensitive)
    if (item.subCategory && item.subCategory.trim().length > 0) {
      return item.subCategory.trim().toLowerCase() === targetSubCat.trim().toLowerCase();
    }

    // 2. Strict non-overlapping keyword fallback only if subCategory is missing
    const title = (item.title || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const tags = (item.tags || '').toLowerCase();
    const full = `${title} ${desc} ${tags}`;

    if (targetSubCat === 'Dairy') {
      if (full.includes('chocolate') || full.includes('silk') || full.includes('ferrero')) return false;
      return full.includes('milk') || full.includes('bread') || full.includes('butter') || full.includes('curd') || full.includes('cheese') || full.includes('paneer');
    }
    if (targetSubCat === 'Fruits') {
      if (full.includes('milk') || full.includes('drink') || full.includes('cola') || full.includes('can')) return false;
      return full.includes('mango') || full.includes('banana') || full.includes('apple') || full.includes('orange') || full.includes('fruit') || full.includes('alphonso');
    }
    if (targetSubCat === 'Snacks') {
      return full.includes('chips') || full.includes('lays') || full.includes('namkeen') || full.includes('bhujia') || full.includes('sev') || full.includes('kurkure');
    }
    if (targetSubCat === 'Instant Food') {
      return full.includes('maggi') || full.includes('noodle') || full.includes('sunflower oil') || full.includes('cooking oil') || full.includes('atta') || full.includes('pasta');
    }
    if (targetSubCat === 'Drinks') {
      return full.includes('coke') || full.includes('coca-cola') || full.includes('coconut') || full.includes('pepsi') || full.includes('soda') || full.includes('cold drink');
    }
    if (targetSubCat === 'Sweets') {
      if (full.includes('mango') || full.includes('banana')) return false;
      return full.includes('chocolate') || full.includes('silk') || full.includes('cadbury') || full.includes('ferrero') || full.includes('hazelnut') || full.includes('mithai');
    }

    return false;
  };

  const subCategories = [
    { id: 'All', label: 'All Items' },
    { id: 'Dairy', label: 'Dairy & Bread' },
    { id: 'Fruits', label: 'Fresh Fruits' },
    { id: 'Snacks', label: 'Chips & Namkeen' },
    { id: 'Instant Food', label: 'Instant Food' },
    { id: 'Drinks', label: 'Cold Drinks' },
    { id: 'Sweets', label: 'Chocolates & Sweets' },
  ];

  const filteredItems = items.filter((item) => matchItemToSubCategory(item, selectedSubCat));

  const safeCartItems = (cartItems || []).filter((ci) => ci && ci.id != null);

  const getItemQuantity = (id) => {
    const found = safeCartItems.find((ci) => String(ci.id) === String(id));
    return found ? (Number(found.quantity) || 1) : 0;
  };

  // Express items in cart
  const minutesCartItems = safeCartItems.filter((ci) => 
    ci.category === 'Grocery' || ci.isMinutes === true || String(ci.id).startsWith('10') || Number(ci.id) > 100
  );
  const minutesCartCount = minutesCartItems.reduce((acc, ci) => acc + (Number(ci.quantity) || 1), 0);
  const minutesCartTotal = minutesCartItems.reduce((acc, ci) => acc + (Number(ci.price) || 0) * (Number(ci.quantity) || 1), 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="rounded-2xl bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#047857] text-white p-4 sm:p-6 shadow-xl border border-emerald-500/30 overflow-hidden relative">
        
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-emerald-600/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#ffe500] text-emerald-950 flex items-center justify-center font-black shadow-lg shadow-yellow-500/20">
              <Zap className="w-7 h-7 fill-emerald-950 text-emerald-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black font-['Outfit'] tracking-tight text-white flex items-center gap-1.5">
                  Just Buy It <span className="text-[#ffe500] italic">Minutes</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#ffe500] text-emerald-950 shadow-sm">
                  ⚡ 10 MINS DELIVERY
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Groceries, fresh dairy, snacks, chilled drinks & daily essentials delivered in minutes!
              </p>
            </div>
          </div>

          {/* Delivery Location & Timer Pill */}
          <button
            type="button"
            onClick={onOpenExpressTracker}
            className="flex items-center gap-2 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-400/50 px-3.5 py-2 rounded-xl backdrop-blur-md self-start md:self-auto text-xs text-left cursor-pointer transition-all hover:scale-102"
          >
            <Clock className="w-4 h-4 text-[#ffe500] animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <div className="text-[10px] text-emerald-300">Fastest Delivery Slot • <span className="underline font-bold text-[#ffe500]">View GPS Tracker</span></div>
              <div className="font-bold text-white flex items-center gap-1">
                <span>Arriving in <strong className="text-[#ffe500]">8 - 10 mins</strong></span>
                <span className="text-emerald-400">• Indiranagar Hub</span>
              </div>
            </div>
          </button>
        </div>

        {/* Subcategories Filter Chips */}
        <div className="relative z-10 pt-4 flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
          {subCategories.map((sub) => {
            const active = selectedSubCat === sub.id;
            const count = items.filter((it) => matchItemToSubCategory(it, sub.id)).length;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubCat(sub.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#ffe500] text-emerald-950 shadow-md shadow-yellow-500/30 scale-105 font-black ring-2 ring-yellow-400'
                    : 'bg-emerald-900/70 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60'
                }`}
              >
                <span>{sub.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-emerald-950 text-[#ffe500]' : 'bg-emerald-800 text-emerald-200'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 10-Minute Items Grid */}
        <div className="relative z-10 mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((prod) => {
            const qty = getItemQuantity(prod.id);

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                className="bg-white rounded-xl p-3 text-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group border border-emerald-100 cursor-pointer"
              >
                {/* Product Image & 10 Min Tag */}
                <div className="relative h-32 sm:h-36 w-full flex items-center justify-center p-2 rounded-lg bg-emerald-50/40 overflow-hidden">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[9px] uppercase tracking-wider flex items-center gap-0.5 shadow-sm">
                    <Zap className="w-2.5 h-2.5 fill-white" />
                    <span>{prod.deliveryMinutes || 8} MINS</span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-2.5 space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {prod.brand} • <span className="text-emerald-700 font-semibold">{prod.unitQuantity || 'Standard'}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug" title={prod.title}>
                    {prod.title}
                  </h4>

                  {/* Price */}
                  <div className="pt-1 flex items-baseline gap-2">
                    <span className="text-sm sm:text-base font-black text-slate-900 font-['Outfit']">
                      ₹{prod.price}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{prod.originalPrice}
                      </span>
                    )}
                    {prod.discountPercent && (
                      <span className="text-[10px] font-bold text-emerald-600">
                        {prod.discountPercent}% off
                      </span>
                    )}
                  </div>
                </div>

                {/* Instant Quantity Stepper on Card */}
                <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod, 1);
                      }}
                      className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>ADD</span>
                    </button>
                  ) : (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-between bg-emerald-50 border-2 border-emerald-500 rounded-lg p-1 text-xs font-bold text-emerald-950 shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(prod.id, qty - 1);
                        }}
                        className="w-8 h-8 rounded-md bg-white hover:bg-rose-50 text-emerald-900 hover:text-rose-600 flex items-center justify-center border border-emerald-200 shadow-xs active:scale-90 transition-all cursor-pointer select-none"
                        title="Reduce quantity"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <span className="px-2 font-black text-sm text-emerald-950">{qty}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(prod.id, qty + 1);
                        }}
                        className="w-8 h-8 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer select-none"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Floating Live Minutes Cart Bar if items added */}
        {minutesCartCount > 0 && (
          <div className="relative z-20 mt-6 p-4 rounded-xl bg-[#ffe500] text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl ring-2 ring-yellow-400 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-emerald-950 text-[#ffe500] flex items-center justify-center shrink-0 shadow-md">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                  <span>{minutesCartCount} Express Items in Bag</span>
                  <span>•</span>
                  <span>₹{minutesCartTotal.toLocaleString()}</span>
                </div>
                <div className="text-xs text-emerald-900 font-semibold">
                  Free express delivery applied • Guaranteed delivery within 10 mins
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenExpressTracker}
                className="px-4 py-2.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-[#ffe500]" />
                <span>Simulate 10-Min Delivery</span>
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
