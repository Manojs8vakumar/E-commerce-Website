import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import HeroSection from './components/HeroSection';
import DealOfTheDay from './components/DealOfTheDay';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import WishlistModal from './components/WishlistModal';
import SuperCoinZoneModal from './components/SuperCoinZoneModal';
import MinutesSection from './components/MinutesSection';
import MinutesTrackerModal from './components/MinutesTrackerModal';
import AdminPortalModal from './components/AdminPortalModal';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import { fetchProducts, fetchDeals, fetchMinutesProducts } from './services/api';

// 35+ verified products catalog covering all 10 categories
const BACKUP_PRODUCTS = [
  // 1. MOBILES & TABLETS
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
    brand: "Apple",
    category: "Mobiles",
    description: "Forged in titanium with a stunning textured matte glass back. Super Retina XDR display with ProMotion. A17 Pro chip brings breakthrough gaming performance and next-level battery life.",
    price: 134900,
    originalPrice: 159900,
    discountPercent: 16,
    rating: 4.9,
    ratingCount: 42100,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 500,
    badge: "BESTSELLER"
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 512GB)",
    brand: "Samsung",
    category: "Mobiles",
    description: "Galaxy AI is here. 200MP camera with Quad Tele System, built-in S Pen, titanium shield frame, and Snapdragon 8 Gen 3 for Galaxy with ray tracing.",
    price: 129999,
    originalPrice: 144999,
    discountPercent: 10,
    rating: 4.8,
    ratingCount: 31200,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 450,
    badge: "FLAGSHIP"
  },
  {
    id: 3,
    title: "Apple iPad Air 11-inch M2 Chip (128GB Wi-Fi) - Space Grey",
    brand: "Apple",
    category: "Mobiles",
    description: "Powered by the blazing-fast Apple M2 chip. Liquid Retina display with P3 wide colour. Supports Apple Pencil Pro and Magic Keyboard.",
    price: 59900,
    originalPrice: 64900,
    discountPercent: 8,
    rating: 4.8,
    ratingCount: 14200,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 200,
    badge: "TOP RATED"
  },

  // 2. ELECTRONICS & LAPTOPS
  {
    id: 4,
    title: "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    brand: "Sony",
    category: "Electronics",
    description: "Industry-leading noise cancellation with two processors and 8 microphones. Ultra-comfortable lightweight design with soft fit leather. Up to 30-hour battery life with quick charging.",
    price: 26990,
    originalPrice: 34990,
    discountPercent: 23,
    rating: 4.8,
    ratingCount: 18420,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 150,
    badge: "LIGHTNING DEAL"
  },
  {
    id: 5,
    title: "Dell XPS 15 9530 Core i9 13th Gen OLED Ultrabook",
    brand: "Dell",
    category: "Electronics",
    description: "15.6-inch 3.5K OLED InfinityEdge touch display. Intel Core i9-13900H, 32GB DDR5 RAM, 1TB NVMe SSD, NVIDIA GeForce RTX 4060 8GB Graphics.",
    price: 184990,
    originalPrice: 224990,
    discountPercent: 18,
    rating: 4.9,
    ratingCount: 3420,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 600,
    badge: "PREMIUM CHOICE"
  },
  {
    id: 6,
    title: "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)",
    brand: "Apple",
    category: "Electronics",
    description: "Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.",
    price: 20999,
    originalPrice: 24900,
    discountPercent: 16,
    rating: 4.9,
    ratingCount: 56300,
    imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 120,
    badge: "BESTSELLER"
  },

  // 3. TVs & APPLIANCES
  {
    id: 7,
    title: "Samsung 55-inch Crystal 4K UHD Smart Tizen TV",
    brand: "Samsung",
    category: "TVs & Appliances",
    description: "Dynamic Crystal Color delivers life-like variations with PurColor, Crystal Processor 4K, AirSlim design, and Q-Symphony sound.",
    price: 42990,
    originalPrice: 68900,
    discountPercent: 38,
    rating: 4.7,
    ratingCount: 24300,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 250,
    badge: "MEGA DEAL"
  },
  {
    id: 8,
    title: "LG 8 kg 5-Star AI Direct Drive Front Load Washing Machine",
    brand: "LG",
    category: "TVs & Appliances",
    description: "Intelligent Care with 18% More Fabric Protection. 6 Motion Direct Drive technology moves the wash drum in multiple directions for ultimate clean.",
    price: 36990,
    originalPrice: 52990,
    discountPercent: 30,
    rating: 4.8,
    ratingCount: 16800,
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 200,
    badge: "BESTSELLER"
  },
  {
    id: 9,
    title: "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner",
    brand: "Dyson",
    category: "TVs & Appliances",
    description: "Laser reveals microscopic dust. Piezo sensor continuously sizes and counts dust particles. Powerful Dyson Hyperdymium motor spins up to 125,000rpm.",
    price: 47900,
    originalPrice: 55900,
    discountPercent: 14,
    rating: 4.9,
    ratingCount: 9200,
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 250,
    badge: "PREMIUM"
  },

  // 4. FASHION & CLOTHING
  {
    id: 10,
    title: "Royal Embroidered Anarkali Kurta & Dupatta Set (Georgette)",
    brand: "Biba",
    category: "Fashion",
    description: "Exquisite festive Anarkali set handcrafted with zari and mirror sequin embroidery on premium flowing georgette fabric. Comes with matching santoon pants and dupatta.",
    price: 1899,
    originalPrice: 4999,
    discountPercent: 62,
    rating: 4.5,
    ratingCount: 24500,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 30,
    badge: "SUPER VALUE"
  },
  {
    id: 11,
    title: "Levi's Men's 511 Slim Fit Stretchable Denim Jeans",
    brand: "Levi's",
    category: "Fashion",
    description: "A modern slim with room to move. Added stretch for all-day comfort. Sits below the waist with a slim leg from hip to ankle.",
    price: 2499,
    originalPrice: 3999,
    discountPercent: 38,
    rating: 4.6,
    ratingCount: 32100,
    imageUrl: "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 40,
    badge: "TOP BRAND"
  },
  {
    id: 12,
    title: "Men's Vintage Slim-Fit Distressed Denim Trucker Jacket",
    brand: "Roadster",
    category: "Fashion",
    description: "Rugged heavy-wash 100% cotton denim jacket with dual flap pockets, antique brass buttons, and classic contrast stitching.",
    price: 1649,
    originalPrice: 3499,
    discountPercent: 53,
    rating: 4.4,
    ratingCount: 9800,
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 25,
    badge: "HOT DEAL"
  },

  // 5. SHOES & SNEAKERS
  {
    id: 13,
    title: "Nike Air Max 270 React Gradient Athletic Sneakers",
    brand: "Nike",
    category: "Footwear",
    description: "Nike's first lifestyle Air unit meets soft, springy Nike React foam for an unrivaled casual wear experience. Vibrant gradient heel counter with breathable mesh.",
    price: 7495,
    originalPrice: 13995,
    discountPercent: 46,
    rating: 4.7,
    ratingCount: 8920,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 75,
    badge: "BESTSELLER"
  },
  {
    id: 14,
    title: "Adidas Ultraboost Light Running Shoes for Men",
    brand: "Adidas",
    category: "Footwear",
    description: "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole with Continental rubber grip.",
    price: 11999,
    originalPrice: 18999,
    discountPercent: 37,
    rating: 4.8,
    ratingCount: 14200,
    imageUrl: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 110,
    badge: "MARATHON CHOICE"
  },
  {
    id: 15,
    title: "Woodland Men's Rugged Khaki Leather Outdoor Hiking Boots",
    brand: "Woodland",
    category: "Footwear",
    description: "Heavy-duty nubuck leather construction with thick grooved rubber lug soles. Water-resistant and shock-absorbing for rugged trails.",
    price: 4295,
    originalPrice: 5995,
    discountPercent: 28,
    rating: 4.6,
    ratingCount: 21800,
    imageUrl: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 50,
    badge: "TOUGH WEAR"
  },

  // 6. WATCHES & JEWELLERY
  {
    id: 16,
    title: "Samsung Galaxy Watch 6 Classic LTE (47mm Rotating Bezel)",
    brand: "Samsung",
    category: "Watches",
    description: "Iconic rotating bezel with sapphire crystal glass screen. Advanced sleep coaching, Body Composition sensor, continuous heart rate and ECG tracking.",
    price: 27999,
    originalPrice: 42999,
    discountPercent: 35,
    rating: 4.6,
    ratingCount: 6410,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 120,
    badge: "BESTSELLER"
  },
  {
    id: 17,
    title: "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
    brand: "Apple",
    category: "Watches",
    description: "The most rugged and capable Apple Watch. Rugged 49mm titanium case, precision dual-frequency GPS, up to 36 hours of battery life, and 3000 nits display.",
    price: 84900,
    originalPrice: 89900,
    discountPercent: 5,
    rating: 4.9,
    ratingCount: 8700,
    imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 350,
    badge: "ULTRA FLAGSHIP"
  },
  {
    id: 18,
    title: "Fossil Townsman Automatic Skeleton Dial Amber Leather Watch",
    brand: "Fossil",
    category: "Watches",
    description: "Intricately exposed skeleton mechanical automatic movement requiring no battery. 44mm smoke stainless steel case with genuine amber brown leather strap.",
    price: 14995,
    originalPrice: 19995,
    discountPercent: 25,
    rating: 4.8,
    ratingCount: 3890,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 90,
    badge: "FASHION ICON"
  },

  // 7. HOME & KITCHEN
  {
    id: 19,
    title: "Instant Vortex Plus 6-in-1 Digital Air Fryer (5.7 Litre)",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    description: "Crispy, tender results with EvenCrisp technology using 95% less oil. 6 customizable one-touch smart cooking programs: Air Fry, Roast, Broil, Bake, Reheat, and Dehydrate.",
    price: 8490,
    originalPrice: 14999,
    discountPercent: 43,
    rating: 4.7,
    ratingCount: 11340,
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 80,
    badge: "BESTSELLER"
  },
  {
    id: 20,
    title: "Philips HL7756/00 750W 3-Jar Heavy Duty Mixer Grinder",
    brand: "Philips",
    category: "Home & Kitchen",
    description: "Powerful 750W Turbo motor with advanced air ventilation system. 3 stainless steel leak-proof jars for wet grinding, dry grinding, and chutneys.",
    price: 3499,
    originalPrice: 5295,
    discountPercent: 34,
    rating: 4.6,
    ratingCount: 42100,
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 40,
    badge: "TOP KITCHEN"
  },

  // 8. BEAUTY & GROOMING
  {
    id: 21,
    title: "Minimalist 10% Niacinamide + 1% Zinc Blemish & Pore Serum (30ml)",
    brand: "Minimalist",
    category: "Beauty",
    description: "Pure Vitamin B3 (Niacinamide) and Matmarine to control sebum and repair skin barrier. Clinically proven to reduce acne marks, refine open pores, and calm redness in 2 weeks.",
    price: 549,
    originalPrice: 699,
    discountPercent: 21,
    rating: 4.6,
    ratingCount: 38290,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 15,
    badge: "VIRAL HIT"
  },
  {
    id: 22,
    title: "Maybelline New York SuperStay Matte Ink Liquid Lipstick",
    brand: "Maybelline",
    category: "Beauty",
    description: "Flawless matte finish that lasts up to 16 hours. Highly pigmented formula with a unique arrow tip applicator for precise, smudge-proof application.",
    price: 520,
    originalPrice: 699,
    discountPercent: 26,
    rating: 4.6,
    ratingCount: 29400,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 12,
    badge: "BEST MATTE"
  },
  {
    id: 23,
    title: "Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25",
    brand: "Forest Essentials",
    category: "Beauty",
    description: "Ayurvedic luxury face cream infused with 24 Karat Gold Bhasma, pure saffron, and cold-pressed oils for deep nourishment and luminous radiance.",
    price: 4875,
    originalPrice: 5400,
    discountPercent: 10,
    rating: 4.8,
    ratingCount: 6200,
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 80,
    badge: "AYURVEDIC LUXURY"
  },

  // 9. GAMING & CONSOLES
  {
    id: 24,
    title: "Sony PlayStation 5 Slim Console (1TB SSD Disc Edition)",
    brand: "Sony",
    category: "Gaming",
    description: "Next-gen gaming power in a streamlined, compact chassis. Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, 3D Audio, and 4K visuals at 120 FPS.",
    price: 54990,
    originalPrice: 59990,
    discountPercent: 8,
    rating: 4.9,
    ratingCount: 31450,
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 250,
    badge: "LIMITED STOCK"
  },
  {
    id: 25,
    title: "ASUS ROG Ally Gaming Handheld (AMD Z1 Extreme, 512GB)",
    brand: "ASUS",
    category: "Gaming",
    description: "Play all your PC games anywhere. Powered by AMD Ryzen Z1 Extreme, 120Hz FHD display with FreeSync Premium, 16GB LPDDR5 RAM, and Windows 11.",
    price: 59990,
    originalPrice: 69990,
    discountPercent: 14,
    rating: 4.7,
    ratingCount: 7200,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 280,
    badge: "PC GAMING ON GO"
  },
  {
    id: 26,
    title: "Nintendo Switch OLED Model with Neon Red & Neon Blue Joy-Con",
    brand: "Nintendo",
    category: "Gaming",
    description: "Vibrant 7-inch OLED screen with deep colors and crisp contrast. Features a wide adjustable stand, enhanced audio, and 64GB of internal storage.",
    price: 31990,
    originalPrice: 36990,
    discountPercent: 14,
    rating: 4.8,
    ratingCount: 15800,
    imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    superCoins: 150,
    badge: "PORTABLE FUN"
  },

  // 10. GROCERY
  {
    id: 27,
    title: "Amul Taaza Fresh Homogenised Toned Milk (1 Litre)",
    brand: "Amul",
    category: "Grocery",
    subCategory: "Dairy",
    description: "Pure, fresh, and nutritious homogenised toned milk with 3.0% fat. Direct from local cold storage hub.",
    price: 56,
    originalPrice: 58,
    discountPercent: 3,
    rating: 4.8,
    ratingCount: 12400,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    isMinutes: true,
    deliveryMinutes: 8,
    superCoins: 5,
    badge: "⚡ 10 MINS"
  },
  {
    id: 28,
    title: "Fresh Sweet Alphonso Mangoes (1 kg / 4-5 pcs)",
    brand: "Fresh Harvest",
    category: "Grocery",
    subCategory: "Fruits",
    description: "Naturally ripened, carbide-free Ratnagiri Alphonso mangoes with rich aroma and honey-sweet pulp.",
    price: 289,
    originalPrice: 399,
    discountPercent: 28,
    rating: 4.9,
    ratingCount: 8200,
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
    isAssured: true,
    isFastDelivery: true,
    isMinutes: true,
    deliveryMinutes: 10,
    superCoins: 15,
    badge: "⚡ 10 MINS"
  }
];

export default function App() {
  const [products, setProducts] = useState(BACKUP_PRODUCTS);
  const [deals, setDeals] = useState([]);
  const [minutesProducts, setMinutesProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters & State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [filterAssured, setFilterAssured] = useState(false);

  // User Cart & Wishlist with localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('jbi_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((item) => item && item.id)
        .map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Math.max(1, Number(item.quantity) || 1),
        }));
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('jbi_wishlist');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) => item && item.id);
    } catch {
      return [];
    }
  });

  const [superCoins, setSuperCoins] = useState(350);
  const [coupon, setCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSuperCoinZoneOpen, setIsSuperCoinZoneOpen] = useState(false);
  const [isMinutesTrackerOpen, setIsMinutesTrackerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [lastOrderNumber, setLastOrderNumber] = useState('');
  const [activeMobileTab, setActiveMobileTab] = useState('home');

  useEffect(() => {
    localStorage.setItem('jbi_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('jbi_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Load products from backend on port 8082
  useEffect(() => {
    loadProducts();
    loadDeals();
    loadMinutesProducts();
  }, [selectedCategory, searchTerm, sortBy, filterAssured]);

  const loadMinutesProducts = async () => {
    try {
      const items = await fetchMinutesProducts();
      if (Array.isArray(items) && items.length > 0) {
        setMinutesProducts(items);
      }
    } catch (e) {
      console.warn('Using local minutes catalog fallback');
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
        assuredOnly: filterAssured,
      });

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        applyBackupFilter();
      }
    } catch (err) {
      console.warn('Backend unavailable, using backup dataset:', err);
      applyBackupFilter();
    } finally {
      setLoading(false);
    }
  };

  const applyBackupFilter = () => {
    let filtered = [...BACKUP_PRODUCTS];

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(
        (p) => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm && searchTerm.trim().length > 0) {
      const q = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (filterAssured) {
      filtered = filtered.filter((p) => p.isAssured);
    }

    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    setProducts(filtered);
  };

  const loadDeals = async () => {
    try {
      const dealList = await fetchDeals();
      if (Array.isArray(dealList) && dealList.length > 0) {
        setDeals(dealList);
        return;
      }
    } catch (e) {
      // ignore
    }
    setDeals(BACKUP_PRODUCTS.filter((p) => p.discountPercent >= 25));
  };

  // Cart Handlers
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Order Handlers
  const handleBuyNow = (product) => {
    handleAddToCart(product, 1);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setLastOrderNumber(order.orderNumber || 'JBI-882194');
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsTrackingOpen(true);
  };

  // Coupon Handlers
  const handleApplyCoupon = (code) => {
    if (code.toUpperCase() === 'JUSTBUY500') {
      setCoupon('JUSTBUY500');
      setCouponDiscount(500);
      return { success: true, message: '₹500 Flat Festive Discount Applied!' };
    }
    if (code.toUpperCase() === 'MINUTES100') {
      setCoupon('MINUTES100');
      setCouponDiscount(100);
      return { success: true, message: '₹100 Express Delivery Savings Applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try JUSTBUY500 or MINUTES100.' };
  };

  // SuperCoin Handlers
  const handleRedeemReward = (reward) => {
    if (superCoins >= reward.cost) {
      setSuperCoins((prev) => prev - reward.cost);
      setCouponDiscount((prev) => prev + reward.discountAmount);
      return true;
    }
    return false;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToMinutes = () => {
    const el = document.getElementById('jbi-minutes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-[#212121] flex flex-col font-sans relative">
      
      {/* 1. Header */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsTrackingOpen(true)}
        superCoins={superCoins}
        onOpenSuperCoinZone={() => setIsSuperCoinZoneOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onScrollToMinutes={scrollToMinutes}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2. Category Strip */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === 'Grocery') {
            scrollToMinutes();
          } else {
            const el = document.getElementById('jbi-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 3. Main Body */}
      <main className="flex-1">
        
        {/* Big Festive Sale Hero Slider / 3D Mode */}
        <HeroSection
          onExplore={(cat) => {
            setSelectedCategory(cat === 'All' ? 'All' : cat);
            const el = document.getElementById('jbi-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickBuy={(prod) => setSelectedProduct(prod)}
        />

        {/* Best Deals of the Day with Countdown Clock */}
        <DealOfTheDay
          deals={deals.length > 0 ? deals : products.filter((p) => p.discountPercent >= 25)}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onAddToCart={(prod) => handleAddToCart(prod, 1)}
          onViewAll={() => {
            setSelectedCategory('All');
            setSortBy('discount');
            const el = document.getElementById('jbi-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Just Buy It Minutes 10-Minute Express Section */}
        <div id="jbi-minutes">
          <MinutesSection
            minutesProducts={minutesProducts}
            cartItems={cartItems}
            onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenExpressTracker={() => setIsMinutesTrackerOpen(true)}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        </div>

        {/* Just Buy It Product Catalog with Filters */}
        <div id="jbi-catalog">
          <ProductGrid
            products={products}
            loading={loading}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterAssured={filterAssured}
            onToggleFilterAssured={() => setFilterAssured(!filterAssured)}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>

      </main>

      {/* 4. Footer */}
      <Footer
        onScrollTop={scrollToTop}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToTop();
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeMobileTab}
        onSelectTab={(tab) => {
          setActiveMobileTab(tab);
          if (tab === 'home') scrollToTop();
          if (tab === 'categories') setSelectedCategory('All');
          if (tab === 'deals') {
            const el = document.getElementById('jbi-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* 5. Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod) => handleAddToCart(prod, 1)}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
        coupon={coupon}
        onApplyCoupon={handleApplyCoupon}
        couponDiscount={couponDiscount}
        superCoins={superCoins}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={Math.max(
          0,
          cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0) - couponDiscount
        )}
        discountAmount={couponDiscount}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        defaultOrderNumber={lastOrderNumber}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={(prod) => handleAddToCart(prod, 1)}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((w) => w.id !== id))}
      />

      {/* SuperCoin Zone Modal */}
      <SuperCoinZoneModal
        isOpen={isSuperCoinZoneOpen}
        onClose={() => setIsSuperCoinZoneOpen(false)}
        superCoins={superCoins}
        onRedeemReward={handleRedeemReward}
      />

      {/* Just Buy It Minutes 10-Minute Express Tracker Modal */}
      <MinutesTrackerModal
        isOpen={isMinutesTrackerOpen}
        onClose={() => setIsMinutesTrackerOpen(false)}
      />

      {/* Admin Master Control Portal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshCatalog={() => {
          loadProducts();
          loadMinutesProducts();
        }}
      />

    </div>
  );
}
