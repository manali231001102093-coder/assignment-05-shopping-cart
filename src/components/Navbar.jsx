import React from 'react';
import { ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = ({ onCartClick }) => {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <ShoppingBag size={24} color="white" />
          </div>
          <span className="brand-text">LuxeTech</span>
        </div>

        <div className="navbar-search">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search products..." className="search-input" />
          </div>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn hide-mobile">
            <User size={24} />
          </button>
          <button className="icon-btn cart-btn" onClick={onCartClick}>
            <ShoppingBag size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
