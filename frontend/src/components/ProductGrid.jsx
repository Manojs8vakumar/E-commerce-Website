import React, { useState } from 'react';
import { 
  Star, Heart, ShieldCheck, ShoppingCart, Zap, Filter, 
  ArrowUpDown, Check, ChevronRight, X, Sparkles, Layers 
} from 'lucide-react';

const CATEGORY_LIST = [
  { id: 'All', name: 'All Categories' },
  { id: 'Mobiles', name: 'Mobiles & Tablets' },
  { id: 'Electronics', name: 'Electronics & Laptops' },
  { id: 'TVs & Appliances', name: 'TVs & Appliances' },
  { id: 'Fashion', name: 'Fashion & Clothing' },
  { id: 'Footwear', name: 'Shoes & Sneakers' },
  { id: 'Watches', name: 'Watches & Jewellery' },
  { id: 'Home & Kitchen', name: 'Home & Kitchen' },
  { id: 'Beauty', name: 'Beauty & Grooming' },
  { id: 'Gaming', name: 'Gaming & Consoles' },
  { id: 'Grocery', name: 'Minutes (10 Mins)' },
];

export default function ProductGrid({
  products = [],
  loading = false,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  filterAssured,
  onToggleFilterAssured,
  onSelectProduct,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  // Apply filters
  const filteredProducts = products.filter((p) => {
    if (filterAssured && !p.isAssured) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (minRating > 0 && (p.rating || 0) < minRating) return false;
    if (minDiscount > 0 && (p.discountPercent || 0) < minDiscount) return false;
    return true;
  });

  const handleResetFilters = () => {
    if (filterAssured) onToggleFilterAssured();
    setMinPrice(0);
    setMaxPrice(250000);
    setMinRating(0);
    setMinDiscount(0);
    if (onSelectCategory) onSelectCategory('All');
  };

  const currentCategoryObj = CATEGORY_LIST.find((c) => c.id === selectedCategory) || {
    id: selectedCategory,
    name: selectedCategory === 'All' ? 'All Categories' : selectedCategory,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-md shadow-sm border border-slate-200 p-4 h-fit space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#2874f0]" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#2874f0] hover:underline cursor-pointer"
            >
              CLEAR ALL
            </button>
          </div>

          {/* Category Filter Sidebar List */}
          <div className="pb-4 border-b border-slate-100 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Category</span>
            </h4>
            <div className="space-y-1">
              {CATEGORY_LIST.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#2874f0] font-black border-l-4 border-[#2874f0]'
                        : 'text-slate-600 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#2874f0]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* JBI Assured Filter */}
          <div className="pb-4 border-b border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterAssured}
                onChange={onToggleFilterAssured}
                className="w-4 h-4 text-[#2874f0] rounded focus:ring-0 cursor-pointer"
              />
              <span className="jbi-assured-badge scale-105 ml-1">
                <span className="f-check">✓</span> Assured
              </span>
            </label>
          </div>

          {/* Price Range */}
          <div className="pb-4 border-b border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Price Range</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 font-semibold">Min Price</label>
                <select
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full p-1.5 border border-slate-200 rounded text-xs bg-slate-50 cursor-pointer"
                >
                  <option value={0}>₹ Min</option>
                  <option value={1000}>₹1,000</option>
                  <option value={5000}>₹5,000</option>
                  <option value={15000}>₹15,000</option>
                  <option value={30000}>₹30,000</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-semibold">Max Price</label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full p-1.5 border border-slate-200 rounded text-xs bg-slate-50 cursor-pointer"
                >
                  <option value={250000}>₹ Max</option>
                  <option value={10000}>₹10,000</option>
                  <option value={25000}>₹25,000</option>
                  <option value={50000}>₹50,000</option>
                  <option value={150000}>₹1,50,000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Ratings Filter */}
          <div className="pb-4 border-b border-slate-100 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Customer Ratings</h4>
            {[4, 3, 2].map((stars) => (
              <label key={stars} className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700">
                <input
                  type="radio"
                  name="ratingFilter"
                  checked={minRating === stars}
                  onChange={() => setMinRating(minRating === stars ? 0 : stars)}
                  className="w-3.5 h-3.5 text-[#2874f0]"
                />
                <span className="flex items-center gap-1 font-semibold">
                  {stars}★ & above
                </span>
              </label>
            ))}
          </div>

          {/* Discount % Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Discount</h4>
            {[50, 40, 30, 10].map((d) => (
              <label key={d} className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700">
                <input
                  type="radio"
                  name="discountFilter"
                  checked={minDiscount === d}
                  onChange={() => setMinDiscount(minDiscount === d ? 0 : d)}
                  className="w-3.5 h-3.5 text-[#2874f0]"
                />
                <span className="font-semibold">{d}% or more</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: Just Buy It Product Listing */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Active Category Banner */}
          {selectedCategory && selectedCategory !== 'All' && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 px-4 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Viewing Category:</span>
                <span className="px-2.5 py-1 bg-[#2874f0] text-white font-bold rounded-sm shadow-xs">
                  {currentCategoryObj.name}
                </span>
                <span className="text-slate-600 font-semibold">
                  • {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <button
                onClick={() => onSelectCategory('All')}
                className="flex items-center gap-1 text-xs font-bold text-[#2874f0] hover:text-blue-800 bg-white border border-blue-200 px-2.5 py-1 rounded-sm shadow-xs cursor-pointer hover:bg-blue-100 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All Products</span>
              </button>
            </div>
          )}

          {/* Sorting Bar */}
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-3 sm:px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] shrink-0">Sort By</span>
              
              <button
                onClick={() => onSortChange('featured')}
                className={`px-3 py-1 font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
                  sortBy === 'featured'
                    ? 'text-[#2874f0] border-[#2874f0] font-bold'
                    : 'text-slate-600 border-transparent hover:text-[#2874f0]'
                }`}
              >
                Relevance
              </button>

              <button
                onClick={() => onSortChange('price_asc')}
                className={`px-3 py-1 font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
                  sortBy === 'price_asc'
                    ? 'text-[#2874f0] border-[#2874f0] font-bold'
                    : 'text-slate-600 border-transparent hover:text-[#2874f0]'
                }`}
              >
                Price -- Low to High
              </button>

              <button
                onClick={() => onSortChange('price_desc')}
                className={`px-3 py-1 font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
                  sortBy === 'price_desc'
                    ? 'text-[#2874f0] border-[#2874f0] font-bold'
                    : 'text-slate-600 border-transparent hover:text-[#2874f0]'
                }`}
              >
                Price -- High to Low
              </button>

              <button
                onClick={() => onSortChange('rating')}
                className={`px-3 py-1 font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
                  sortBy === 'rating'
                    ? 'text-[#2874f0] border-[#2874f0] font-bold'
                    : 'text-slate-600 border-transparent hover:text-[#2874f0]'
                }`}
              >
                Customer Rating
              </button>

              <button
                onClick={() => onSortChange('discount')}
                className={`px-3 py-1 font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
                  sortBy === 'discount'
                    ? 'text-[#2874f0] border-[#2874f0] font-bold'
                    : 'text-slate-600 border-transparent hover:text-[#2874f0]'
                }`}
              >
                Discount %
              </button>
            </div>

            <div className="text-slate-500 font-semibold text-[11px] shrink-0">
              Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items
            </div>
          </div>

          {/* Product Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-md p-4 h-80 animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-md p-12 text-center border border-slate-200 space-y-4">
              <Sparkles className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No products found in "{currentCategoryObj.name}"
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No products matched your active filters. Try clearing your filters or viewing all categories.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-sm bg-[#2874f0] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Reset Filters & View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const wish = isWishlisted(product.id);

                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="card-3d bg-white rounded-md border border-slate-200 p-4 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer relative group"
                  >
                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100 z-10 transition-colors"
                      title={wish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wish ? 'fill-rose-500 text-rose-500' : 'text-slate-400 hover:text-rose-400'
                        }`}
                      />
                    </button>

                    {/* Product Image */}
                    <div className="relative h-48 w-full flex items-center justify-center p-3 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="mt-3 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {product.brand}
                      </div>

                      <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-[#2874f0] transition-colors leading-snug">
                        {product.title}
                      </h3>

                      {/* Ratings & Assured Badge */}
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="jbi-rating-badge">
                          <span>{product.rating}</span>
                          <Star className="w-2.5 h-2.5 fill-white text-white" />
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold">
                          ({product.ratingCount?.toLocaleString() || '14,290'})
                        </span>
                        {product.isAssured && (
                          <span className="jbi-assured-badge ml-auto">
                            <span className="f-check">✓</span> Assured
                          </span>
                        )}
                      </div>

                      {/* Price Section */}
                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit']">
                          ₹{product.price?.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            ₹{product.originalPrice?.toLocaleString()}
                          </span>
                        )}
                        {product.discountPercent && (
                          <span className="text-xs font-bold text-[#388e3c]">
                            {product.discountPercent}% off
                          </span>
                        )}
                      </div>

                      {/* Extra tags */}
                      <div className="text-[10px] text-slate-500 font-medium">
                        Free delivery • <strong className="text-[#388e3c]">Bank Offer Available</strong>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="w-full py-2 rounded-sm bg-[#ff9f00] hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="w-full py-2 rounded-sm bg-[#fb641b] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Buy</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
