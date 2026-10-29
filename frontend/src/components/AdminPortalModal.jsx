import React, { useState, useEffect } from 'react';
import { 
  X, LayoutDashboard, Package, ShoppingCart, Zap, Plus, 
  Trash2, Edit3, CheckCircle, RefreshCw, AlertCircle, 
  Search, Filter, TrendingUp, DollarSign, Users, Award, 
  ExternalLink, Truck, Check, Eye
} from 'lucide-react';
import { 
  fetchProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  toggleMinutes, 
  fetchAllOrders, 
  updateOrderStatus, 
  deleteOrder 
} from '../services/api';

export default function AdminPortalModal({ isOpen, onClose, onRefreshCatalog }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, minutes
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Product Add / Edit Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: 'Mobiles',
    price: '',
    originalPrice: '',
    imageUrl: '',
    description: '',
    stockQuantity: 50,
    unitQuantity: '',
    isAssured: true,
    isMinutes: false,
    deliveryMinutes: 10,
    badge: 'BESTSELLER',
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prodsData, ordersData] = await Promise.all([
        fetchProducts({}),
        fetchAllOrders()
      ]);
      setProducts(prodsData || []);
      setOrders(ordersData || []);
    } catch (err) {
      console.error('Admin loading failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Analytics Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const minutesProductsCount = products.filter(p => p.isMinutes).length;
  const totalSuperCoins = orders.reduce((acc, o) => acc + (Number(o.earnedSuperCoins) || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = searchTerm === '' || 
      (p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'All') return true;
    return o.orderStatus === statusFilter;
  });

  // Open Form for Create
  const handleOpenCreateForm = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      brand: '',
      category: 'Mobiles',
      price: '',
      originalPrice: '',
      imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
      description: 'Premium authentic product with 1-Year Manufacturer Warranty.',
      stockQuantity: 50,
      unitQuantity: 'Standard Pack',
      isAssured: true,
      isMinutes: false,
      deliveryMinutes: 10,
      badge: 'BESTSELLER',
    });
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEditForm = (prod) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title || '',
      brand: prod.brand || '',
      category: prod.category || 'Mobiles',
      price: prod.price || '',
      originalPrice: prod.originalPrice || '',
      imageUrl: prod.imageUrl || '',
      description: prod.description || '',
      stockQuantity: prod.stockQuantity || 50,
      unitQuantity: prod.unitQuantity || '',
      isAssured: prod.isAssured ?? true,
      isMinutes: prod.isMinutes ?? false,
      deliveryMinutes: prod.deliveryMinutes || 10,
      badge: prod.badge || '',
    });
    setIsFormOpen(true);
  };

  // Submit Add / Edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert('Please fill out Product Title and Price.');
      return;
    }

    setFormSubmitting(true);
    const pPrice = Number(formData.price) || 0;
    const pOrig = Number(formData.originalPrice) || pPrice;
    const pDiscount = pOrig > pPrice ? Math.round(((pOrig - pPrice) / pOrig) * 100) : 0;

    const payload = {
      ...formData,
      price: pPrice,
      originalPrice: pOrig,
      discountPercent: pDiscount,
      stockQuantity: Number(formData.stockQuantity) || 1,
      inStock: (Number(formData.stockQuantity) || 1) > 0,
      deliveryMinutes: Number(formData.deliveryMinutes) || 10,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        showNotification(`Product "${payload.title}" updated successfully!`);
      } else {
        await createProduct(payload);
        showNotification(`Product "${payload.title}" added to store catalog!`);
      }
      setIsFormOpen(false);
      await loadAllData();
      if (onRefreshCatalog) onRefreshCatalog();
    } catch (err) {
      alert('Operation failed: ' + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteProduct(id);
      showNotification(`Product deleted successfully.`);
      await loadAllData();
      if (onRefreshCatalog) onRefreshCatalog();
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  // Toggle Express 10-Minute Delivery
  const handleToggleMinutes = async (id, currentVal) => {
    try {
      await toggleMinutes(id);
      showNotification(`10-Minute Delivery ${!currentVal ? 'ENABLED' : 'DISABLED'}`);
      await loadAllData();
      if (onRefreshCatalog) onRefreshCatalog();
    } catch (err) {
      alert('Failed to toggle express minutes status: ' + err.message);
    }
  };

  // Update Order Status
  const handleStatusChange = async (orderNumber, newStatus) => {
    try {
      await updateOrderStatus(orderNumber, newStatus);
      showNotification(`Order ${orderNumber} updated to ${newStatus}`);
      await loadAllData();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  // Delete Order
  const handleDeleteOrder = async (orderNumber) => {
    if (!window.confirm(`Are you sure you want to cancel and delete order ${orderNumber}?`)) return;
    try {
      await deleteOrder(orderNumber);
      showNotification(`Order ${orderNumber} cancelled.`);
      await loadAllData();
    } catch (err) {
      alert('Failed to delete order: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#172337] to-[#002f6c] px-6 py-4 flex items-center justify-between border-b border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffe500] text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-['Outfit'] tracking-wide text-white">
                  Just Buy It <span className="text-[#ffe500]">Admin Control Portal</span>
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Control
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full master authority over catalog, orders, inventory, pricing & 10-minute express delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              title="Refresh Data"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`px-6 py-2 text-xs font-bold flex items-center gap-2 animate-fadeIn ${
            notification.type === 'error' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            <CheckCircle className="w-4 h-4" />
            <span>{notification.msg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-slate-950/70 px-6 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#ffe500] text-[#ffe500]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#ffe500] text-[#ffe500]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#ffe500] text-[#ffe500]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Live Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('minutes')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'minutes'
                ? 'border-[#ffe500] text-[#ffe500]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>10-Minute Express Hub ({minutesProductsCount})</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/90 space-y-6">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Gross Sales</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-['Outfit'] text-white mt-2">
                    ₹{totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3 h-3" /> Live customer orders
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Total Orders</span>
                    <ShoppingCart className="w-4 h-4 text-[#ffe500]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-['Outfit'] text-white mt-2">
                    {totalOrdersCount}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {orders.filter(o => o.orderStatus === 'DELIVERED').length} Delivered
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Catalog Items</span>
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-['Outfit'] text-white mt-2">
                    {totalProductsCount}
                  </div>
                  <div className="text-[11px] text-blue-400 mt-1">
                    Across 9 Categories
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>SuperCoins Distributed</span>
                    <Award className="w-4 h-4 text-[#ffe500]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#ffe500] mt-2">
                    {totalSuperCoins} ✦
                  </div>
                  <div className="text-[11px] text-yellow-300/80 mt-1">
                    Customer loyalty reserve
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm text-white">Quick Control Shortcuts</h3>
                  <p className="text-xs text-slate-400">Perform immediate admin actions across Just Buy It platform</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenCreateForm}
                    className="px-4 py-2 bg-[#2874f0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Manage Orders</span>
                  </button>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    Recent Live Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#ffe500] hover:underline font-bold"
                  >
                    View All ({orders.length}) →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-6">
                    No orders placed yet. Place an order in the store to see it appear here live!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-slate-400 border-b border-slate-700">
                        <tr>
                          <th className="pb-2">Order #</th>
                          <th className="pb-2">Customer</th>
                          <th className="pb-2">Total</th>
                          <th className="pb-2">Payment</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {orders.slice(0, 5).map(o => (
                          <tr key={o.id || o.orderNumber}>
                            <td className="py-2.5 font-mono text-emerald-400 font-bold">{o.orderNumber}</td>
                            <td className="py-2.5 font-medium">{o.customerName}</td>
                            <td className="py-2.5 font-bold font-['Outfit']">₹{o.totalAmount?.toLocaleString()}</td>
                            <td className="py-2.5">
                              <span className="px-2 py-0.5 rounded bg-slate-700 text-[10px] uppercase font-bold">
                                {o.paymentMethod || 'UPI'}
                              </span>
                            </td>
                            <td className="py-2.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                o.orderStatus === 'DELIVERED'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : o.orderStatus === 'OUT_FOR_DELIVERY'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {o.orderStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS CATALOG (CRUD) */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              
              {/* Filter & Action Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search title or brand..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffe500]"
                    />
                  </div>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Watches">Watches</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Grocery">Grocery / 10-Min</option>
                  </select>
                </div>

                <button
                  onClick={handleOpenCreateForm}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#2874f0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden">
                <div className="overflow-x-auto max-h-[55vh]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 sticky top-0 z-10 border-b border-slate-700">
                      <tr>
                        <th className="p-3">Item</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price / MRP</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3 text-center">10-Min Express</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-10 h-10 object-contain rounded bg-white p-1 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1 max-w-xs">{p.title}</div>
                              <div className="text-[10px] text-slate-400 font-semibold">
                                {p.brand} {p.unitQuantity ? `• ${p.unitQuantity}` : ''}
                                {p.isAssured && (
                                  <span className="ml-2 text-[#ffe500] font-bold">✓ Assured</span>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-[11px] font-semibold">
                              {p.category}
                            </span>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-white font-['Outfit']">₹{p.price?.toLocaleString()}</div>
                            {p.originalPrice && (
                              <div className="text-[10px] text-slate-400 line-through">
                                ₹{p.originalPrice?.toLocaleString()} ({p.discountPercent}% off)
                              </div>
                            )}
                          </td>

                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              (p.stockQuantity || 0) > 10
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {p.stockQuantity || 0} in stock
                            </span>
                          </td>

                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleToggleMinutes(p.id, p.isMinutes)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase transition-all cursor-pointer ${
                                p.isMinutes
                                  ? 'bg-[#ffe500] text-emerald-950 shadow-sm'
                                  : 'bg-slate-700 text-slate-400 hover:text-white'
                              }`}
                            >
                              {p.isMinutes ? '⚡ 10-MIN ON' : 'Off'}
                            </button>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditForm(p)}
                                title="Edit Product"
                                className="p-1.5 rounded bg-slate-700 hover:bg-[#2874f0] text-slate-300 hover:text-white transition-all cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.title)}
                                title="Delete Product"
                                className="p-1.5 rounded bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Order Status Filters */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 text-xs">
                {['All', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#ffe500] text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="bg-slate-800/40 rounded-xl p-8 text-center text-slate-400 text-xs border border-slate-700">
                  No orders matching the selected filter.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map(order => (
                    <div
                      key={order.id || order.orderNumber}
                      className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-emerald-400 text-sm">
                            {order.orderNumber}
                          </span>
                          <span className="text-slate-400 text-xs">
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Just now'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-700 text-[10px] font-bold text-slate-300">
                            {order.paymentMethod || 'UPI'} • {order.paymentStatus || 'PAID'}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300">
                          <strong>Customer:</strong> {order.customerName} ({order.customerPhone}) • <span>{order.customerEmail}</span>
                        </div>

                        <div className="text-xs text-slate-400">
                          <strong>Deliver to:</strong> {order.shippingAddress}, {order.city} - {order.pincode}
                        </div>

                        {/* Order Items Preview */}
                        {order.items && order.items.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
                            {order.items.map((item, idx) => (
                              <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700/60">
                                {item.productTitle || item.title} (x{item.quantity}) - ₹{item.price}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Amount & Status Controller */}
                      <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-700 pt-3 md:pt-0">
                        <div className="text-right">
                          <div className="text-base font-bold text-white font-['Outfit']">
                            ₹{order.totalAmount?.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-yellow-400 font-semibold">
                            +{order.earnedSuperCoins || 25} SuperCoins
                          </div>
                        </div>

                        {/* Live Status Dropdown for Admin */}
                        <div className="flex items-center gap-2">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order.orderNumber, e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-[#ffe500] cursor-pointer"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PACKED">PACKED</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>

                          <button
                            onClick={() => handleDeleteOrder(order.orderNumber)}
                            title="Cancel & Delete Order"
                            className="p-2 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 4: 10-MINUTE EXPRESS HUB */}
          {activeTab === 'minutes' && (
            <div className="space-y-6">
              
              {/* Dark Store Status Card */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 p-5 rounded-2xl border border-emerald-500/40 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#ffe500] text-emerald-950 flex items-center justify-center font-black shadow-lg">
                      <Zap className="w-7 h-7 fill-emerald-950" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-['Outfit'] text-white">
                        Indiranagar Express Dark Store #4
                      </h3>
                      <p className="text-xs text-emerald-200 mt-0.5">
                        Active dispatch hub • Fleet radius 4.5 km • Average delivery speed: 8.4 mins
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold">
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-400/40 text-emerald-200">
                      ⚡ 14 Electric Bikes on Route
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-[#ffe500] text-emerald-950">
                      ● Operating Normal
                    </div>
                  </div>
                </div>
              </div>

              {/* Express Products Listing */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#ffe500]" />
                    Products Enabled for 10-Minute Express Delivery ({minutesProductsCount})
                  </h4>
                  <span className="text-xs text-slate-400">
                    Toggle items below to add or remove them from express grocery pods
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {products.map(p => (
                    <div
                      key={p.id}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        p.isMinutes
                          ? 'bg-emerald-950/40 border-emerald-500/40'
                          : 'bg-slate-800/40 border-slate-700 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-10 h-10 object-contain rounded bg-white p-1 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <div className="font-bold text-xs text-white truncate">{p.title}</div>
                          <div className="text-[10px] text-slate-400">
                            ₹{p.price} • {p.unitQuantity || p.category}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleMinutes(p.id, p.isMinutes)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer shrink-0 ${
                          p.isMinutes
                            ? 'bg-[#ffe500] text-emerald-950 hover:bg-yellow-400'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                        }`}
                      >
                        {p.isMinutes ? 'Enabled' : '+ Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* MODAL: Add / Edit Product Form */}
        {isFormOpen && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-3 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h3 className="font-bold text-base text-white font-['Outfit']">
                  {editingProduct ? 'Edit Product Details' : 'Add New Product to Just Buy It'}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                    placeholder="e.g. Apple iPhone 15 Pro Max Titanium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Brand *</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                      placeholder="e.g. Apple, Sony, Amul"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                    >
                      <option value="Mobiles">Mobiles</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Watches">Watches</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Grocery">Grocery (Express 10-Min)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                      placeholder="26990"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                      placeholder="34990"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                    placeholder="https://..."
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 flex items-center gap-3 bg-slate-800 p-2 rounded border border-slate-700">
                      <img src={formData.imageUrl} alt="preview" className="w-12 h-12 object-contain bg-white rounded p-1" />
                      <span className="text-[11px] text-slate-400">Image preview valid</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description & Specs</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#ffe500]"
                    placeholder="Detailed specs..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <label className="flex items-center gap-2 p-2 rounded bg-slate-800 border border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAssured}
                      onChange={(e) => setFormData({ ...formData, isAssured: e.target.checked })}
                      className="rounded accent-[#2874f0]"
                    />
                    <span className="font-bold text-white">JBI Assured Quality Check</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded bg-slate-800 border border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isMinutes}
                      onChange={(e) => setFormData({ ...formData, isMinutes: e.target.checked })}
                      className="rounded accent-[#ffe500]"
                    />
                    <span className="font-bold text-[#ffe500]">⚡ 10-Min Express Delivery</span>
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-700 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-6 py-2 rounded-lg bg-[#2874f0] hover:bg-blue-600 text-white font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    {formSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
