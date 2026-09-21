import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/ProductList.css';

const ProductList = ({ products }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="product-grid">
      {products.map(product => {
        const discountPercentage = product.originalPrice 
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
          : 0;

        return (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              {discountPercentage > 0 && (
                <span className="discount-badge">-{discountPercentage}%</span>
              )}
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-overlay">
                <button 
                  className="btn btn-primary add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
            
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              
              <div className="product-rating">
                <div className="stars">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>{product.rating}</span>
                </div>
                <span className="reviews">({product.reviews} reviews)</span>
              </div>
              
              <div className="product-price-row">
                <div className="price-container">
                  <span className="current-price">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                {/* Mobile add to cart button */}
                <button 
                  className="btn-icon mobile-add-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
