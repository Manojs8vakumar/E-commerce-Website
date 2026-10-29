import React from 'react';
import { 
  Smartphone, Tv, Laptop, Shirt, Sparkles, Home, Armchair, 
  ShoppingBag, Flame, ChevronDown, Gamepad2 
} from 'lucide-react';

const JBI_CATEGORIES = [
  {
    id: 'All',
    name: 'Top Offers',
    icon: Flame,
    color: '#fb641b',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
    subcategories: ['All Blockbuster Deals', 'Mega Clearance Sale', 'Special Discounts 50-80% Off']
  },
  {
    id: 'Mobiles',
    name: 'Mobiles & Tablets',
    icon: Smartphone,
    color: '#2874f0',
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=120&auto=format&fit=crop&q=80',
    subcategories: ['Apple iPhones', 'Samsung Galaxy', 'Flagship 5G', 'Tablets & iPads']
  },
  {
    id: 'Electronics',
    name: 'Electronics & Laptops',
    icon: Laptop,
    color: '#0284c7',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80',
    subcategories: ['ANC Headphones', 'Gaming Laptops', 'Mechanical Keyboards', 'AirPods']
  },
  {
    id: 'TVs & Appliances',
    name: 'TVs & Appliances',
    icon: Tv,
    color: '#9333ea',
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=120&auto=format&fit=crop&q=80',
    subcategories: ['4K Smart TVs', 'Front Load Washing Machines', 'Cordless Vacuums', 'Air Conditioners']
  },
  {
    id: 'Fashion',
    name: 'Fashion & Clothing',
    icon: Shirt,
    color: '#e11d48',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=120&auto=format&fit=crop&q=80',
    subcategories: ['Ethnic Kurtis & Sets', 'Levi\'s Denim Jeans', 'Denim Jackets', 'Summer Maxi Dresses']
  },
  {
    id: 'Footwear',
    name: 'Shoes & Sneakers',
    icon: ShoppingBag,
    color: '#0891b2',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80',
    subcategories: ['Nike Air Max', 'Adidas Ultraboost', 'Woodland Leather Boots', 'Sports Training Shoes']
  },
  {
    id: 'Watches',
    name: 'Watches & Jewellery',
    icon: Armchair,
    color: '#d97706',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80',
    subcategories: ['Samsung Galaxy Watch', 'Apple Watch Ultra', 'Fossil Townsman Automatic']
  },
  {
    id: 'Home & Kitchen',
    name: 'Home & Kitchen',
    icon: Home,
    color: '#16a34a',
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=120&auto=format&fit=crop&q=80',
    subcategories: ['Digital Air Fryers', '750W Mixer Grinders', 'Wonderchef Cookware Sets']
  },
  {
    id: 'Beauty',
    name: 'Beauty & Grooming',
    icon: Sparkles,
    color: '#db2777',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&auto=format&fit=crop&q=80',
    subcategories: ['Minimalist Niacinamide Serum', 'Maybelline SuperStay Lipstick', '24K Gold Creams']
  },
  {
    id: 'Gaming',
    name: 'Gaming & Consoles',
    icon: Gamepad2,
    color: '#7c3aed',
    img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=120&auto=format&fit=crop&q=80',
    subcategories: ['PlayStation 5 Slim', 'ASUS ROG Ally', 'Nintendo Switch OLED']
  },
  {
    id: 'Grocery',
    name: 'Minutes (10 Mins)',
    icon: Flame,
    color: '#047857',
    badge: '⚡ 10 MINS',
    img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&auto=format&fit=crop&q=80',
    subcategories: ['Amul Milk & Dairy', 'Alphonso Mangoes', 'Maggi Noodles', 'Chilled Cold Drinks']
  }
];

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none gap-4 md:gap-8">
          {JBI_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col items-center justify-center min-w-[70px] sm:min-w-[85px] py-1 cursor-pointer transition-all select-none"
              >
                {/* Category Image Circle */}
                <div className="relative">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden p-1 border-2 transition-all duration-200 flex items-center justify-center bg-slate-50 ${
                      isSelected
                        ? 'border-[#2874f0] shadow-md scale-105 ring-2 ring-blue-100'
                        : 'border-transparent group-hover:border-slate-300 group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {cat.badge && (
                    <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-[#ffe500] text-emerald-950 border border-emerald-600 shadow-sm whitespace-nowrap">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Category Title */}
                <div className="mt-1.5 flex items-center gap-0.5 text-center">
                  <span
                    className={`text-xs whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'text-[#2874f0] font-black'
                        : 'text-slate-700 font-semibold group-hover:text-[#2874f0]'
                    }`}
                  >
                    {cat.name}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-[#2874f0] transition-transform hidden sm:inline ${isSelected ? 'text-[#2874f0]' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
