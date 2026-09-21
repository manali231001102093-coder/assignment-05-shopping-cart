import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import './index.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 349.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Minimalist Smartwatch",
    price: 199.50,
    originalPrice: 250.00,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Ultra-Slim Laptop Sleeve",
    price: 35.00,
    originalPrice: 50.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 210
  },
  {
    id: 4,
    name: "Mechanical Keyboard Pro",
    price: 149.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 342
  },
  {
    id: 5,
    name: "Ergonomic Office Mouse",
    price: 59.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 156
  },
  {
    id: 6,
    name: "Noise-Cancelling Earbuds",
    price: 129.99,
    originalPrice: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1572569433602-6666ba8a2456?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviews: 78
  }
];

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Featured Products</h1>
          <p className="page-subtitle">Discover our premium collection of tech accessories.</p>
        </div>
        
        <ProductList products={MOCK_PRODUCTS} />
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
