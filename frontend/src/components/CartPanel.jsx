// src/components/CartPanel.jsx
import React from 'react';

export default function CartPanel({ items, onRemove, onCheckout, subtotal, tax, total }) {
  return (
    <div className="cart-panel">
      <h3>Your Selection</h3>
      {items.length === 0 && <p className="muted">Select 6–9 items to enable checkout</p>}

      <div className="cart-items">
        {items.map(it => (
          <div key={it._id} className="cart-item">
            <div>
              <div className="cart-item-name">{it.name}</div>
              <div className="cart-item-price">₹ {it.priceINR}</div>
            </div>
            <button className="remove-btn" onClick={() => onRemove(it._id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div><span>Subtotal</span><strong>₹ {subtotal.toFixed(2)}</strong></div>
        <div><span>Tax (5%)</span><strong>₹ {tax.toFixed(2)}</strong></div>
        <div className="cart-total"><span>Total</span><strong>₹ {total.toFixed(2)}</strong></div>
      </div>

      <button
        className="checkout-btn"
        onClick={onCheckout}
        disabled={items.length < 6 || items.length > 9}
      >
        Checkout
      </button>
      {items.length < 6 && <p className="muted">Select {6 - items.length} more item(s)</p>}
      {items.length > 9 && <p className="muted">Remove {items.length - 9} item(s) to proceed</p>}
    </div>
  );
}
