import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    state: { items, couponCode }, 
    dispatch, 
    subtotal, 
    discountAmount, 
    gstAmount, 
    grandTotal 
  } = useCart();
  
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.toUpperCase() === 'COLLEGE10') {
      dispatch({ type: 'APPLY_COUPON', payload: { code: 'COLLEGE10', discount: 10 } });
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try COLLEGE10');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    setCouponInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart ({items.length})</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet.</p>
              <button className="btn btn-primary mt-4" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {items.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="coupon-section">
              {couponCode ? (
                <div className="applied-coupon">
                  <span>Coupon <strong>{couponCode}</strong> applied (10% off)</span>
                  <button onClick={handleRemoveCoupon} className="remove-coupon-btn">Remove</button>
                </div>
              ) : (
                <form className="coupon-form" onSubmit={handleApplyCoupon}>
                  <input 
                    type="text" 
                    placeholder="Enter coupon code..." 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">Apply</button>
                </form>
              )}
              {couponError && <span className="coupon-error">{couponError}</span>}
            </div>

            <div className="summary-section">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="summary-row discount">
                  <span>Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>${gstAmount.toFixed(2)}</span>
              </div>
              
              <div className="summary-row grand-total">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-accent checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
