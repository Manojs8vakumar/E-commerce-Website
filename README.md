# ⚡ JUST BUY IT (JBI) - Next-Gen Hyper-Value E-Commerce Platform

A modern, responsive, and full-stack e-commerce web application engineered with **Java 21, Spring Boot, Hibernate (JPA), H2 Database, HTML5, CSS3, Tailwind CSS, and React**.

---

## 🌟 Key Architectural Highlights & Platform Features

| Feature Pillar | Implementation Details in "Just Buy It" |
| :--- | :--- |
| **Fulfillment & Global Catalog** | **1-Day Express Delivery badges**, Global search bar with category selectors, verified buyer customer reviews, star rating breakdowns, multi-angle gallery, and 1-click buy. |
| **Gamification & Big Sales** | **JBI Assured** certified badges, live ticking **Deal of the Day** countdown timer, **SuperCoins** rewards engine (+coins on every purchase), and Bank Offer discounts (HDFC/SBI 10% instant off). |
| **Value & Reseller Options** | **Reseller & Margin Tool** (interactive margin calculator), **Lowest Price Guaranteed** badges, 1-click **WhatsApp Share & Earn**, and Cash on Delivery (COD) filtering. |

---

## 🖥️ Adaptive & 3D Visual Experience

- **Adaptive for All Devices**:
  - **Desktop / Laptop**: Multi-tier header, mega search bar, category drawers, 4-column 3D tilt cards, detailed specifications and customer feedback modal.
  - **Tablet**: Adaptive 2–3 column grid with touch-scrolling category navigation.
  - **Mobile**: Sticky bottom navigation bar (`Home`, `Categories`, `Flash Deals`, `Wishlist`, `Cart`), slide-out drawer, touch-friendly checkout sheets, and network-accessible Wi-Fi URL.
- **3D Interactive Hero Experience**:
  - **3D WebGL Particle & Starfield Portal**: Canvas particle simulation with mouse-parallax depth, reactive neon glowing nodes, and perspective horizon grid.
  - **3D Looping Video Showcase**: Looping futuristic e-commerce background with dark glassmorphic overlays.
  - **3D Card Perspective**: Dynamic mouse-tracked 3D tilt on product cards (`transform: perspective(1000px) rotateX(...) rotateY(...) scale3d(...)`).
  - **Confetti Celebration**: Real-time particle confetti upon placing an order (`canvas-confetti`).

---

## 🚀 Technology Stack

### Frontend:
- **React 19 & Vite 8** (blazing fast startup & HMR)
- **Tailwind CSS & Custom 3D CSS**
- **Lucide React Icons**
- **Canvas Confetti & HTML5 Canvas 3D Engine**

### Backend:
- **Java 21 & Spring Boot 4**
- **Hibernate / Spring Data JPA**
- **H2 In-Memory Relational Database**
- **RESTful APIs with CORS Support**
- **Port:** `8082`

---

## 🔗 Live Service URLs

- **Frontend Application:** [http://localhost:5173](http://localhost:5173) (Local) or `http://192.168.1.102:5173` (Mobile via Wi-Fi)
- **Backend Spring Boot API:** [http://localhost:8082/api](http://localhost:8082/api)
- **H2 Database Console:** [http://localhost:8082/h2-console](http://localhost:8082/h2-console) (JDBC URL: `jdbc:h2:mem:justbuyitdb`, User: `sa`, Password: *(empty)*)

---

## 🛠️ REST API Endpoints

- `GET /api/products` - List products with optional search, category, sort, and filter flags.
- `GET /api/products/minutes` - List Just Buy It Minutes (10-minute delivery express grocery items).
- `GET /api/products/{id}` - Get full product details.
- `GET /api/products/categories` - Distinct categories.
- `GET /api/products/deals` - Flash deals with 30%+ discount.
- `GET /api/products/{id}/reviews` - Verified buyer reviews.
- `POST /api/products/{id}/reviews` - Add a new verified review.
- `POST /api/orders` - Place order, assign tracking number, compute SuperCoins.
- `GET /api/orders/{orderNumber}` - Track order status & delivery timeline.
- `GET /api/orders` - List all past orders.

---

## ⚡ Just Buy It Minutes (10-Minute Express Delivery)

- **Dedicated Grocery Hub**: Amul Milk, Alphonso Mangoes, Maggi 4-Pack, Lay's Party Pack, Chilled Coca-Cola Zero, Fortune Sunflower Oil, Cadbury Dairy Milk Silk.
- **In-Card Stepper (`+ ADD / [-] 1 [+]`)**: Add express groceries with instant quantity stepper without page refreshes.
- **Live 10-Min GPS Tracker Simulation**: Interactive stopwatch countdown, dark store picker status, electric bike GPS path, and doorstep delivery PIN.
