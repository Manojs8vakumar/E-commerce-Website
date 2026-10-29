import React, { useState, useEffect } from 'react';
import { 
  X, Star, ShieldCheck, Truck, RefreshCw, Zap, Heart, 
  ShoppingCart, Tag, CheckCircle2, ChevronRight, ThumbsUp, Send, MapPin 
} from 'lucide-react';
import { fetchProductReviews, submitProductReview } from '../services/api';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) {
  const [selectedImage, setSelectedImage] = useState(product?.imageUrl);
  const [pincode, setPincode] = useState('560001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // JBI Exchange Offer Feature
  const [isExchangeSelected, setIsExchangeSelected] = useState(false);
  const [exchangeBrand, setExchangeBrand] = useState('Apple');
  const [exchangeDiscount, setExchangeDiscount] = useState(4500);

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [headline, setHeadline] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSelectedImage(product.imageUrl);
    loadReviews(product.id);
  }, [product]);

  const loadReviews = async (id) => {
    setLoadingReviews(true);
    try {
      const data = await fetchProductReviews(id);
      setReviews(data);
    } catch (e) {
      console.warn('Could not load reviews:', e);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleBrandChange = (brand) => {
    setExchangeBrand(brand);
    if (brand === 'Apple') setExchangeDiscount(8500);
    else if (brand === 'Samsung') setExchangeDiscount(6000);
    else if (brand === 'OnePlus') setExchangeDiscount(4500);
    else setExchangeDiscount(3000);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;
    setIsSubmitting(true);
    try {
      const newRev = await submitProductReview(product.id, {
        author: authorName,
        rating: ratingVal,
        title: headline || 'Verified Purchase',
        comment: commentText,
      });
      setReviews([newRev, ...reviews]);
      setAuthorName('');
      setHeadline('');
      setCommentText('');
    } catch (err) {
      alert('Error submitting review: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  const images = [product.imageUrl, ...(product.secondaryImages || [])];
  const effectivePrice = isExchangeSelected 
    ? Math.max(999, product.price - exchangeDiscount) 
    : product.price;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl rounded-md bg-white shadow-2xl overflow-hidden my-auto border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery & Action Buttons */}
          <div className="lg:col-span-5 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between bg-white">
            <div>
              {/* Main Image with Zoom preview */}
              <div className="relative w-full h-80 sm:h-96 rounded-md border border-slate-100 flex items-center justify-center p-4 overflow-hidden group">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded border p-1 shrink-0 transition-all cursor-pointer ${
                      selectedImage === img ? 'border-[#2874f0] shadow-sm' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Action Buttons: ADD TO CART & BUY NOW */}
            <div className="mt-6 grid grid-cols-2 gap-3 pt-3">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="py-3 px-4 rounded-sm bg-[#ff9f00] hover:bg-amber-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 fill-white" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={() => {
                  onBuyNow(product);
                  onClose();
                }}
                className="py-3 px-4 rounded-sm bg-[#fb641b] hover:bg-orange-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Offers, Exchange & Specs */}
          <div className="lg:col-span-7 p-4 sm:p-6 space-y-5 bg-white text-slate-800">
            
            {/* Breadcrumb */}
            <div className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
              <span>Home</span> <ChevronRight className="w-3 h-3" />
              <span>{product.category}</span> <ChevronRight className="w-3 h-3" />
              <span className="text-slate-600 font-bold">{product.brand}</span>
            </div>

            {/* Product Title & Brand */}
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                {product.title}
              </h1>

              {/* Rating & Assured Badge */}
              <div className="flex items-center gap-3 mt-2">
                <span className="jbi-rating-badge">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-white text-white" />
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {product.ratingCount?.toLocaleString() || '18,420'} Ratings & {product.reviewCount?.toLocaleString() || '3,250'} Reviews
                </span>
                {product.isAssured && (
                  <span className="f-assured-badge ml-2 scale-110">
                    <span className="f-check">✓</span> Assured
                  </span>
                )}
              </div>
            </div>

            {/* Price Block */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#388e3c]">Special price</div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
                  ₹{effectivePrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-base font-bold text-[#388e3c]">
                    {product.discountPercent}% off
                  </span>
                )}
              </div>
            </div>

            {/* Exchange Offer Block */}
            <div className="p-3.5 rounded-md border border-slate-200 bg-slate-50 space-y-3">
              <div className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>Exchange Option</span>
                <span className="text-[#388e3c] font-bold text-xs">Save up to ₹8,500</span>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="radio"
                    name="exchange"
                    checked={!isExchangeSelected}
                    onChange={() => setIsExchangeSelected(false)}
                    className="w-4 h-4 text-[#2874f0]"
                  />
                  <span>Buy without Exchange — ₹{product.price.toLocaleString()}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#2874f0]">
                  <input
                    type="radio"
                    name="exchange"
                    checked={isExchangeSelected}
                    onChange={() => setIsExchangeSelected(true)}
                    className="w-4 h-4 text-[#2874f0]"
                  />
                  <span>Buy with Exchange — Extra ₹{exchangeDiscount.toLocaleString()} OFF</span>
                </label>
              </div>

              {isExchangeSelected && (
                <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs animate-fadeIn">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Select Old Brand</label>
                    <select
                      value={exchangeBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full p-1.5 border border-slate-300 rounded bg-white text-xs font-medium cursor-pointer"
                    >
                      <option value="Apple">Apple iPhone</option>
                      <option value="Samsung">Samsung Galaxy</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="Xiaomi">Xiaomi / Redmi</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-end">
                    <span className="text-[11px] text-[#388e3c] font-bold">
                      ✓ Instant Discount: -₹{exchangeDiscount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Available Bank & Promo Offers */}
            <div className="space-y-2">
              <div className="font-bold text-xs text-slate-900 uppercase tracking-wider">Available Offers</div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#388e3c] shrink-0 mt-0.5" />
                  <span><strong>Bank Offer:</strong> 10% Instant Discount on SBI Credit Cards, up to ₹1,500 on orders of ₹5,000 and above.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#388e3c] shrink-0 mt-0.5" />
                  <span><strong>Bank Offer:</strong> 5% Unlimited Cashback on JBI Axis Bank Credit Card.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#388e3c] shrink-0 mt-0.5" />
                  <span><strong>Special Price:</strong> Get extra ₹2,000 off (price inclusive of discount/coupon).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#388e3c] shrink-0 mt-0.5" />
                  <span><strong>Partner Offer:</strong> Sign up for JBI Pay Later & get free Times Prime worth ₹1,199.</span>
                </li>
              </ul>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500 font-semibold">Delivery</span>
                <div className="flex items-center border border-slate-300 rounded-sm overflow-hidden px-2 py-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-20 text-xs font-bold text-slate-800 focus:outline-none"
                  />
                  <button
                    onClick={() => setPincodeChecked(true)}
                    className="text-[#2874f0] font-bold text-xs ml-2 hover:underline cursor-pointer"
                  >
                    Check
                  </button>
                </div>

                {pincodeChecked && (
                  <span className="text-slate-700 text-xs font-medium">
                    Delivery by <strong className="text-slate-900">Tomorrow, 11 PM</strong> | <span className="text-[#388e3c] font-bold">Free</span> <span className="line-through text-slate-400">₹40</span>
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 pl-14">
                Cash on Delivery available • 7 Days Replacement Policy
              </div>
            </div>

            {/* Specifications Table */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Specifications</h3>
              <div className="border border-slate-200 rounded text-xs divide-y divide-slate-100">
                <div className="grid grid-cols-3 p-2 bg-slate-50">
                  <span className="text-slate-500 font-semibold">Brand</span>
                  <span className="col-span-2 font-medium text-slate-800">{product.brand}</span>
                </div>
                <div className="grid grid-cols-3 p-2">
                  <span className="text-slate-500 font-semibold">Model Name</span>
                  <span className="col-span-2 font-medium text-slate-800">{product.title}</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-50">
                  <span className="text-slate-500 font-semibold">Category</span>
                  <span className="col-span-2 font-medium text-slate-800">{product.category}</span>
                </div>
                <div className="grid grid-cols-3 p-2">
                  <span className="text-slate-500 font-semibold">Warranty</span>
                  <span className="col-span-2 font-medium text-slate-800">1 Year Manufacturer Brand Warranty</span>
                </div>
              </div>
            </div>

            {/* Ratings & Reviews Breakdown */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Ratings & Reviews</h3>
              </div>

              {/* Rating Bar Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 bg-slate-50 rounded-md border border-slate-200">
                <div className="sm:col-span-4 text-center sm:border-r border-slate-200 sm:pr-4 flex flex-col justify-center">
                  <div className="text-4xl font-black text-slate-900 font-['Outfit'] flex items-center justify-center gap-1">
                    <span>{product.rating}</span>
                    <Star className="w-7 h-7 fill-[#388e3c] text-[#388e3c]" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-semibold">
                    {product.ratingCount?.toLocaleString() || '18,420'} Ratings & {product.reviewCount?.toLocaleString() || '3,250'} Reviews
                  </div>
                </div>

                <div className="sm:col-span-8 space-y-1.5 text-xs text-slate-600">
                  {[
                    { stars: 5, pct: '74%' },
                    { stars: 4, pct: '18%' },
                    { stars: 3, pct: '5%' },
                    { stars: 2, pct: '2%' },
                    { stars: 1, pct: '1%' },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="w-6 font-bold">{row.stars} ★</span>
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#388e3c] rounded-full" style={{ width: row.pct }}></div>
                      </div>
                      <span className="w-8 text-right font-medium text-[11px]">{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Customer Reviews List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {loadingReviews ? (
                  <div className="text-xs text-slate-400">Loading verified feedback...</div>
                ) : reviews.length === 0 ? (
                  <div className="text-xs text-slate-500">No reviews yet. Be the first to review!</div>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="p-3 border-b border-slate-100 text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="jbi-rating-badge text-[10px] py-0.5">
                          {rev.rating} ★
                        </span>
                        <span className="font-bold text-slate-800">{rev.title || 'Superb Product'}</span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">{rev.comment}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                        <span className="font-semibold text-slate-600">{rev.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#388e3c] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-[#388e3c]" /> Certified Buyer
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800">Write a Customer Review</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    className="p-1.5 border border-slate-300 rounded text-xs bg-white"
                  />
                  <select
                    value={ratingVal}
                    onChange={(e) => setRatingVal(Number(e.target.value))}
                    className="p-1.5 border border-slate-300 rounded text-xs bg-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                    <option value={2}>2 Stars ★★</option>
                    <option value={1}>1 Star ★</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Review Headline (e.g. Worth every penny!)"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full p-1.5 border border-slate-300 rounded text-xs bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Describe your experience with this item..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  className="w-full p-1.5 border border-slate-300 rounded text-xs bg-white"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded bg-[#2874f0] text-white font-bold text-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                  <span>{isSubmitting ? 'Posting...' : 'Submit Review'}</span>
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
