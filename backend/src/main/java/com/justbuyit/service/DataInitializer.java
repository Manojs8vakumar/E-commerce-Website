package com.justbuyit.service;

import com.justbuyit.model.Product;
import com.justbuyit.model.Review;
import com.justbuyit.repository.ProductRepository;
import com.justbuyit.repository.ReviewRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    public DataInitializer(ProductRepository productRepository, ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() > 0) {
            return;
        }

        List<Product> products = new ArrayList<>();

        // 1. MOBILES & TABLETS
        products.add(createCatalogProduct(
            "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
            "Apple", "Mobiles",
            "Forged in titanium with a stunning textured matte glass back. Super Retina XDR display with ProMotion. A17 Pro chip brings breakthrough gaming performance and next-level battery life. Pro camera system with 48MP main camera and 5x optical telephoto lens.",
            134900.0, 159900.0, 16, 4.9, 42100,
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
            "BESTSELLER", "apple, iphone, smartphone, mobile, titanium, ios, 5g"
        ));
        products.add(createCatalogProduct(
            "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 512GB)",
            "Samsung", "Mobiles",
            "Galaxy AI is here. 200MP camera with Quad Tele System, built-in S Pen, titanium shield frame, and Snapdragon 8 Gen 3 for Galaxy with ray tracing.",
            129999.0, 144999.0, 10, 4.8, 31200,
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
            "FLAGSHIP", "samsung, galaxy, s24, ultra, android, 5g, spen"
        ));
        products.add(createCatalogProduct(
            "OnePlus 12 5G (Flowy Emerald, 16GB RAM, 512GB)",
            "OnePlus", "Mobiles",
            "4th Gen Hasselblad Camera for Mobile, Snapdragon 8 Gen 3, Dual Cryo-velocity VC cooling system, 5400 mAh battery with 100W SUPERVOOC charging.",
            64999.0, 69999.0, 7, 4.7, 18900,
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
            "HOT DROP", "oneplus, 5g, android, hasselblad, fast charging"
        ));
        products.add(createCatalogProduct(
            "Apple iPad Air 11-inch M2 Chip (128GB Wi-Fi) - Space Grey",
            "Apple", "Mobiles",
            "Powered by the blazing-fast Apple M2 chip. Liquid Retina display with P3 wide colour. Supports Apple Pencil Pro and Magic Keyboard.",
            59900.0, 64900.0, 8, 4.8, 14200,
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
            "TOP RATED", "apple, ipad, tablet, m2, retina, ios"
        ));

        // 2. ELECTRONICS & LAPTOPS
        products.add(createCatalogProduct(
            "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
            "Sony", "Electronics",
            "Industry-leading noise cancellation with two processors and 8 microphones. Ultra-comfortable lightweight design with soft fit leather. Up to 30-hour battery life with quick charging.",
            26990.0, 34990.0, 23, 4.8, 18420,
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
            "LIGHTNING DEAL", "headphones, wireless, anc, sony, bluetooth, audio"
        ));
        products.add(createCatalogProduct(
            "Dell XPS 15 9530 Core i9 13th Gen OLED Ultrabook",
            "Dell", "Electronics",
            "15.6-inch 3.5K OLED InfinityEdge touch display. Intel Core i9-13900H, 32GB DDR5 RAM, 1TB NVMe SSD, NVIDIA GeForce RTX 4060 8GB Graphics.",
            184990.0, 224990.0, 18, 4.9, 3420,
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
            "PREMIUM CHOICE", "laptop, dell, xps, oled, gaming, ultrabook"
        ));
        products.add(createCatalogProduct(
            "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)",
            "Apple", "Electronics",
            "Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.",
            20999.0, 24900.0, 16, 4.9, 56300,
            "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80",
            "BESTSELLER", "apple, airpods, anc, earphones, earbuds, wireless"
        ));
        products.add(createCatalogProduct(
            "Keychron K2 Wireless Mechanical Keyboard (RGB Backlit Brown Switch)",
            "Keychron", "Electronics",
            "Compact 75% layout Bluetooth wireless mechanical keyboard with mac and windows support. Connects up to 3 devices simultaneously.",
            7499.0, 9999.0, 25, 4.7, 5120,
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
            "TRENDING", "keyboard, mechanical, rgb, typing, wireless, keychron"
        ));

        // 3. TVs & APPLIANCES
        products.add(createCatalogProduct(
            "Samsung 55-inch Crystal 4K UHD Smart Tizen TV",
            "Samsung", "TVs & Appliances",
            "Dynamic Crystal Color delivers life-like variations with PurColor, Crystal Processor 4K, AirSlim design, and Q-Symphony sound.",
            42990.0, 68900.0, 38, 4.7, 24300,
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80",
            "MEGA DEAL", "tv, samsung, smart tv, 4k, uhd, appliances, tizen"
        ));
        products.add(createCatalogProduct(
            "LG 8 kg 5-Star AI Direct Drive Front Load Washing Machine",
            "LG", "TVs & Appliances",
            "Intelligent Care with 18% More Fabric Protection. 6 Motion Direct Drive technology moves the wash drum in multiple directions for ultimate clean.",
            36990.0, 52990.0, 30, 4.8, 16800,
            "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80",
            "BESTSELLER", "washing machine, lg, appliances, laundry, front load"
        ));
        products.add(createCatalogProduct(
            "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner",
            "Dyson", "TVs & Appliances",
            "Laser reveals microscopic dust. Piezo sensor continuously sizes and counts dust particles. Powerful Dyson Hyperdymium motor spins up to 125,000rpm.",
            47900.0, 55900.0, 14, 4.9, 9200,
            "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
            "PREMIUM", "dyson, vacuum, cordless, cleaning, appliances"
        ));

        // 4. FASHION & CLOTHING
        products.add(createCatalogProduct(
            "Royal Embroidered Anarkali Kurta & Dupatta Set (Georgette)",
            "Biba", "Fashion",
            "Exquisite festive Anarkali set handcrafted with zari and mirror sequin embroidery on premium flowing georgette fabric. Comes with matching santoon pants and dupatta.",
            1899.0, 4999.0, 62, 4.5, 24500,
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
            "SUPER VALUE", "ethnic, kurta, women, embroidery, biba, wedding, festive"
        ));
        products.add(createCatalogProduct(
            "Levi's Men's 511 Slim Fit Stretchable Denim Jeans",
            "Levi's", "Fashion",
            "A modern slim with room to move. Added stretch for all-day comfort. Sits below the waist with a slim leg from hip to ankle.",
            2499.0, 3999.0, 38, 4.6, 32100,
            "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
            "TOP BRAND", "levis, jeans, denim, men, fashion, slim fit"
        ));
        products.add(createCatalogProduct(
            "Men's Vintage Slim-Fit Distressed Denim Trucker Jacket",
            "Roadster", "Fashion",
            "Rugged heavy-wash 100% cotton denim jacket with dual flap pockets, antique brass buttons, and classic contrast stitching.",
            1649.0, 3499.0, 53, 4.4, 9800,
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
            "HOT DEAL", "jacket, denim, men, roadster, winter, streetwear"
        ));
        products.add(createCatalogProduct(
            "Zara Women's Floral Print Tiered Georgette Maxi Dress",
            "Zara", "Fashion",
            "Flowy tiered silhouette with vibrant botanical floral prints. V-neckline with delicate ruffle trim and elasticated waist.",
            3590.0, 4990.0, 28, 4.7, 8400,
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
            "NEW ARRIVAL", "dress, maxi, women, zara, floral, summer, fashion"
        ));

        // 5. FOOTWEAR & SNEAKERS
        products.add(createCatalogProduct(
            "Nike Air Max 270 React Gradient Athletic Sneakers",
            "Nike", "Footwear",
            "Nike's first lifestyle Air unit meets soft, springy Nike React foam for an unrivaled casual wear experience. Vibrant gradient heel counter with breathable mesh.",
            7495.0, 13995.0, 46, 4.7, 8920,
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
            "BESTSELLER", "shoes, sneakers, nike, airmax, athletic, running"
        ));
        products.add(createCatalogProduct(
            "Adidas Ultraboost Light Running Shoes for Men",
            "Adidas", "Footwear",
            "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole with Continental rubber grip.",
            11999.0, 18999.0, 37, 4.8, 14200,
            "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
            "MARATHON CHOICE", "adidas, ultraboost, running, shoes, sports, sneakers"
        ));
        products.add(createCatalogProduct(
            "Woodland Men's Rugged Khaki Leather Outdoor Hiking Boots",
            "Woodland", "Footwear",
            "Heavy-duty nubuck leather construction with thick grooved rubber lug soles. Water-resistant and shock-absorbing for rugged trails.",
            4295.0, 5995.0, 28, 4.6, 21800,
            "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80",
            "TOUGH WEAR", "woodland, boots, leather, outdoor, hiking, footwear"
        ));

        // 6. WATCHES & JEWELLERY
        products.add(createCatalogProduct(
            "Samsung Galaxy Watch 6 Classic LTE (47mm Rotating Bezel)",
            "Samsung", "Watches",
            "Iconic rotating bezel with sapphire crystal glass screen. Advanced sleep coaching, Body Composition sensor, continuous heart rate and ECG tracking.",
            27999.0, 42999.0, 35, 4.6, 6410,
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
            "BESTSELLER", "smartwatch, samsung, lte, fitness, wearable, watches"
        ));
        products.add(createCatalogProduct(
            "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
            "Apple", "Watches",
            "The most rugged and capable Apple Watch. Rugged 49mm titanium case, precision dual-frequency GPS, up to 36 hours of battery life, and 3000 nits display.",
            84900.0, 89900.0, 5, 4.9, 8700,
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80",
            "ULTRA FLAGSHIP", "apple, watch, ultra, titanium, gps, smartwatch"
        ));
        products.add(createCatalogProduct(
            "Fossil Townsman Automatic Skeleton Dial Amber Leather Watch",
            "Fossil", "Watches",
            "Intricately exposed skeleton mechanical automatic movement requiring no battery. 44mm smoke stainless steel case with genuine amber brown leather strap.",
            14995.0, 19995.0, 25, 4.8, 3890,
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
            "FASHION ICON", "watch, analog, fossil, luxury, automatic, skeleton, leather"
        ));

        // 7. HOME & KITCHEN
        products.add(createCatalogProduct(
            "Instant Vortex Plus 6-in-1 Digital Air Fryer (5.7 Litre)",
            "Instant Pot", "Home & Kitchen",
            "Crispy, tender results with EvenCrisp technology using 95% less oil. 6 customizable one-touch smart cooking programs: Air Fry, Roast, Broil, Bake, Reheat, and Dehydrate.",
            8490.0, 14999.0, 43, 4.7, 11340,
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
            "BESTSELLER", "air fryer, kitchen, appliances, cooking, healthy, oven"
        ));
        products.add(createCatalogProduct(
            "Philips HL7756/00 750W 3-Jar Heavy Duty Mixer Grinder",
            "Philips", "Home & Kitchen",
            "Powerful 750W Turbo motor with advanced air ventilation system. 3 stainless steel leak-proof jars for wet grinding, dry grinding, and chutneys.",
            3499.0, 5295.0, 34, 4.6, 42100,
            "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80",
            "TOP KITCHEN", "philips, mixer, grinder, kitchen, appliances, home"
        ));
        products.add(createCatalogProduct(
            "Wonderchef Royal Velvet Non-Stick 5-Piece Induction Cookware Set",
            "Wonderchef", "Home & Kitchen",
            "Virgin grade aluminium for 9x faster heat conduction. PFOA-free healthy 5-layer non-stick marble coating with ergonomic soft-touch handles.",
            2799.0, 4500.0, 38, 4.5, 18200,
            "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
            "VALUE COMBO", "cookware, pan, kadai, kitchen, wonderchef, cooking"
        ));

        // 8. BEAUTY & GROOMING
        products.add(createCatalogProduct(
            "Minimalist 10% Niacinamide + 1% Zinc Blemish & Pore Serum (30ml)",
            "Minimalist", "Beauty",
            "Pure Vitamin B3 (Niacinamide) and Matmarine to control sebum and repair skin barrier. Clinically proven to reduce acne marks, refine open pores, and calm redness in 2 weeks.",
            549.0, 699.0, 21, 4.6, 38290,
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
            "VIRAL HIT", "serum, skincare, acne, minimalist, beauty, pores"
        ));
        products.add(createCatalogProduct(
            "Maybelline New York SuperStay Matte Ink Liquid Lipstick",
            "Maybelline", "Beauty",
            "Flawless matte finish that lasts up to 16 hours. Highly pigmented formula with a unique arrow tip applicator for precise, smudge-proof application.",
            520.0, 699.0, 26, 4.6, 29400,
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
            "BEST MATTE", "lipstick, makeup, maybelline, beauty, matte, cosmetics"
        ));
        products.add(createCatalogProduct(
            "Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25",
            "Forest Essentials", "Beauty",
            "Ayurvedic luxury face cream infused with 24 Karat Gold Bhasma, pure saffron, and cold-pressed oils for deep nourishment and luminous radiance.",
            4875.0, 5400.0, 10, 4.8, 6200,
            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
            "AYURVEDIC LUXURY", "cream, gold, ayurvedic, beauty, luxury, skincare"
        ));

        // 9. GAMING & CONSOLES
        products.add(createCatalogProduct(
            "Sony PlayStation 5 Slim Console (1TB SSD Disc Edition)",
            "Sony", "Gaming",
            "Next-gen gaming power in a streamlined, compact chassis. Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, 3D Audio, and 4K visuals at 120 FPS.",
            54990.0, 59990.0, 8, 4.9, 31450,
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
            "LIMITED STOCK", "ps5, playstation, console, sony, gaming, 4k, god of war"
        ));
        products.add(createCatalogProduct(
            "ASUS ROG Ally Gaming Handheld (AMD Z1 Extreme, 512GB)",
            "ASUS", "Gaming",
            "Play all your PC games anywhere. Powered by AMD Ryzen Z1 Extreme, 120Hz FHD display with FreeSync Premium, 16GB LPDDR5 RAM, and Windows 11.",
            59990.0, 69990.0, 14, 4.7, 7200,
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
            "PC GAMING ON GO", "asus, rog, handheld, steam, gaming, portable"
        ));
        products.add(createCatalogProduct(
            "Nintendo Switch OLED Model with Neon Red & Neon Blue Joy-Con",
            "Nintendo", "Gaming",
            "Vibrant 7-inch OLED screen with deep colors and crisp contrast. Features a wide adjustable stand, enhanced audio, and 64GB of internal storage.",
            31990.0, 36990.0, 14, 4.8, 15800,
            "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&auto=format&fit=crop&q=80",
            "PORTABLE FUN", "nintendo, switch, oled, mario, zelda, gaming"
        ));

        // 10. GROCERY / 10-MINUTE MINUTES (WITH EXPLICIT SUBCATEGORY)
        // SubCategory: Dairy
        products.add(createMinutesProduct(
            "Amul Taaza Fresh Homogenised Toned Milk (1 Litre)",
            "Amul", "Dairy",
            "Pure, fresh, and nutritious homogenised toned milk with 3.0% fat. Direct from local cold storage hub.",
            56.0, 58.0, 3, 4.8, 12400,
            "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
            "1 Litre Pouch", "milk, amul, toned, dairy"
        ));
        products.add(createMinutesProduct(
            "Britannia 100% Whole Wheat Brown Bread (400g)",
            "Britannia", "Dairy",
            "Freshly baked healthy whole wheat bread with dietary fibre and zero trans fat.",
            55.0, 60.0, 8, 4.7, 8800,
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
            "400g Loaf", "bread, brown bread, bakery, breakfast, dairy"
        ));

        // SubCategory: Fruits
        products.add(createMinutesProduct(
            "Fresh Sweet Alphonso Mangoes (1 kg / 4-5 pcs)",
            "Fresh Harvest", "Fruits",
            "Naturally ripened, carbide-free Ratnagiri Alphonso mangoes with rich aroma and honey-sweet pulp.",
            289.0, 399.0, 28, 4.9, 8200,
            "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
            "1 kg (4-5 pcs)", "mango, alphonso, fruit, fresh harvest, fruits"
        ));
        products.add(createMinutesProduct(
            "Fresh Organic Robusta Bananas (Pack of 6)",
            "Fresh Harvest", "Fruits",
            "Farm fresh organic robusta bananas packed with natural potassium, instant energy, and sweetness.",
            45.0, 55.0, 18, 4.8, 11400,
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
            "Pack of 6", "banana, fruit, fresh, healthy, fruits"
        ));

        // SubCategory: Snacks
        products.add(createMinutesProduct(
            "Lay's India's Magic Masala Potato Chips (115g Party Pack)",
            "Lays", "Snacks",
            "Crispy sliced potatoes seasoned with authentic hot and spicy Indian street spices.",
            45.0, 50.0, 10, 4.7, 34100,
            "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
            "115g Pack", "chips, lays, snacks, namkeen, party pack"
        ));
        products.add(createMinutesProduct(
            "Haldiram's Nagpur Spicy Aloo Bhujia Sev (400g)",
            "Haldiram", "Snacks",
            "Crispy fried spiced potato and chickpea noodles seasoned with fresh garden mint and fiery red chilli.",
            110.0, 125.0, 12, 4.8, 28900,
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
            "400g Pack", "namkeen, bhujia, haldiram, snacks, sev"
        ));

        // SubCategory: Instant Food
        products.add(createMinutesProduct(
            "Maggi 2-Minute Special Masala Instant Noodles (Pack of 4)",
            "Nestle", "Instant Food",
            "India's beloved comfort food packed with goodness of 20 signature spices and roasted aroma.",
            58.0, 72.0, 19, 4.8, 48300,
            "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80",
            "Pack of 4 (280g)", "maggi, noodles, instant food, nestle, pasta"
        ));
        products.add(createMinutesProduct(
            "Fortune Sunlite Refined Sunflower Oil (1 Litre Pouch)",
            "Fortune", "Instant Food",
            "Light, healthy, and enriched with Vitamins A & D. Ideal for all everyday cooking and frying.",
            138.0, 175.0, 21, 4.7, 15300,
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
            "1 Litre Pouch", "oil, cooking, sunflower, fortune, instant food"
        ));

        // SubCategory: Drinks
        products.add(createMinutesProduct(
            "Coca-Cola Zero Sugar Chilled Can (300 ml)",
            "Coca-Cola", "Drinks",
            "Maximum refreshment with zero sugar and zero calories. Chilled at 4°C in our dark store cooler.",
            38.0, 40.0, 5, 4.6, 18900,
            "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80",
            "300 ml Chilled Can", "coke, drink, cold drink, soda, beverage, drinks"
        ));
        products.add(createMinutesProduct(
            "Farm Fresh Tender Green Coconut with Straw",
            "Nature Fresh", "Drinks",
            "Naturally sweet and potassium-rich coconut water. Cut, drilled, and served cold with eco straw.",
            55.0, 70.0, 21, 4.8, 9400,
            "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&auto=format&fit=crop&q=80",
            "1 Piece", "coconut, natural, tender, water, drinks"
        ));

        // SubCategory: Sweets
        products.add(createMinutesProduct(
            "Cadbury Dairy Milk Silk Chocolate Bar (150g)",
            "Cadbury", "Sweets",
            "Irresistibly smooth and creamy chocolate crafted for pure melt-in-the-mouth indulgence.",
            165.0, 190.0, 13, 4.9, 29800,
            "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
            "150g Bar", "chocolate, silk, cadbury, sweets, dessert"
        ));
        products.add(createMinutesProduct(
            "Ferrero Rocher Fine Hazelnut Chocolates (Pack of 16)",
            "Ferrero", "Sweets",
            "Whole crunchy hazelnut in a delicious creamy filling, all encased in a crisp wafer shell covered with milk chocolate and chopped hazelnuts.",
            549.0, 620.0, 11, 4.9, 18400,
            "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
            "Pack of 16 (200g)", "chocolate, ferrero, hazelnut, sweets, gift"
        ));

        productRepository.saveAll(products);

        // Add verified reviews for featured products
        reviewRepository.saveAll(Arrays.asList(
            new Review(1L, "Aditya Sharma", 5.0, "Absolute Silence - Worth Every Rupee!",
                "The noise cancellation on the XM5 is unreal. Flights and metro rides are dead quiet. Battery lasts for days and mic quality is studio level."),
            new Review(1L, "Priya Nair", 5.0, "Best headphones for work and travel",
                "Switching between my MacBook and iPhone is effortless. Super comfortable padding even after 6 hours."),
            new Review(2L, "Rahul Verma", 5.0, "Titanium finish is breathtaking",
                "Upgraded from iPhone 12. The 120Hz display and 5x optical zoom are night and day difference. Battery easily lasts 1.5 days."),
            new Review(3L, "Karan Singh", 5.0, "Super comfortable for all-day running",
                "The Air unit gives great bounce. Got compliments on the neon colorway. Fits true to size."),
            new Review(5L, "Sneha Patel", 5.0, "Cloth quality is superb for this price!",
                "Bought this on Just Buy It, delivery arrived in 2 days. The embroidery is very neat and looks like a boutique designer set.")
        ));
    }

    private Product createCatalogProduct(String title, String brand, String category, String description,
                                         Double price, Double originalPrice, int discountPercent,
                                         double rating, int ratingCount, String imageUrl, String badge, String tags) {
        Product p = new Product();
        p.setTitle(title);
        p.setBrand(brand);
        p.setCategory(category);
        p.setDescription(description);
        p.setPrice(price);
        p.setOriginalPrice(originalPrice);
        p.setDiscountPercent(discountPercent);
        p.setRating(rating);
        p.setRatingCount(ratingCount);
        p.setReviewCount(Math.max(5, ratingCount / 5));
        p.setImageUrl(imageUrl);
        p.setInStock(true);
        p.setStockQuantity(60);
        p.setIsAssured(true);
        p.setIsFastDelivery(true);
        p.setIsMeeshoTrending(false);
        p.setBadge(badge);
        p.setSuperCoins((int) (price / 50));
        p.setFreeDelivery(true);
        p.setDeliveryDays(1);
        p.setTags(tags);
        return p;
    }

    private Product createMinutesProduct(String title, String brand, String subCategory, String description,
                                         Double price, Double originalPrice, int discountPercent,
                                         double rating, int ratingCount, String imageUrl, String unitQuantity, String tags) {
        Product p = new Product();
        p.setTitle(title);
        p.setBrand(brand);
        p.setCategory("Grocery");
        p.setSubCategory(subCategory);
        p.setDescription(description);
        p.setPrice(price);
        p.setOriginalPrice(originalPrice);
        p.setDiscountPercent(discountPercent);
        p.setRating(rating);
        p.setRatingCount(ratingCount);
        p.setReviewCount(Math.max(5, ratingCount / 5));
        p.setImageUrl(imageUrl);
        p.setInStock(true);
        p.setStockQuantity(100);
        p.setIsAssured(true);
        p.setIsFastDelivery(true);
        p.setIsMinutes(true);
        p.setDeliveryMinutes(8);
        p.setUnitQuantity(unitQuantity);
        p.setBadge("⚡ 10 MINS");
        p.setSuperCoins((int) (price / 20));
        p.setFreeDelivery(true);
        p.setDeliveryDays(0);
        p.setTags("minutes, grocery, express, 10min, " + subCategory.toLowerCase() + ", " + tags);
        return p;
    }
}
