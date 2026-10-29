// API client to interact with Spring Boot Backend (Render in production, port 8082 in local dev)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api';

export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    if (params.minPrice) query.append('minPrice', params.minPrice);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params.assuredOnly) query.append('assuredOnly', 'true');
    if (params.meeshoOnly) query.append('meeshoOnly', 'true');
    if (params.badge) query.append('badge', params.badge);

    const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.warn('API error, falling back to local dataset if needed:', err);
    throw err;
  }
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return await res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) return ['Electronics', 'Mobiles', 'Fashion', 'Footwear', 'Watches', 'Home & Kitchen', 'Beauty', 'Gaming'];
  return await res.json();
};

export const fetchDeals = async () => {
  const res = await fetch(`${BASE_URL}/products/deals`);
  if (!res.ok) throw new Error('Failed to fetch deals');
  return await res.json();
};

export const fetchMinutesProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products/minutes`);
    if (!res.ok) throw new Error('Failed to fetch minutes products');
    return await res.json();
  } catch (err) {
    console.warn('Backend minutes endpoint fallback:', err);
    return [];
  }
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return await res.json();
};

export const fetchOrderByNumber = async (orderNumber) => {
  const res = await fetch(`${BASE_URL}/orders/${orderNumber}`);
  if (!res.ok) throw new Error('Order not found');
  return await res.json();
};

export const fetchProductReviews = async (productId) => {
  const res = await fetch(`${BASE_URL}/products/${productId}/reviews`);
  if (!res.ok) return [];
  return await res.json();
};

export const submitProductReview = async (productId, reviewData) => {
  const res = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error('Failed to submit review');
  return await res.json();
};

// Admin Operations
export const createProduct = async (productData) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return await res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return await res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return true;
};

export const toggleMinutes = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}/toggle-minutes`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Failed to toggle express minutes status');
  return await res.json();
};

export const fetchAllOrders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders`);
    if (!res.ok) throw new Error('Failed to fetch all orders');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching orders, returning empty list:', err);
    return [];
  }
};

export const updateOrderStatus = async (orderNumber, status) => {
  const res = await fetch(`${BASE_URL}/orders/${orderNumber}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return await res.json();
};

export const deleteOrder = async (orderNumber) => {
  const res = await fetch(`${BASE_URL}/orders/${orderNumber}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete order');
  return true;
};
