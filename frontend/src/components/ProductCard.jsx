// src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product, onAdd, added }) {
  return (
    <div className="product-card">
      <div className="product-top">
        <div className={`diet-badge ${product.type === 'veg' ? 'veg' : 'nonveg'}`}>{product.type}</div>
        <img src={product.image || '/placeholder-food.png'} alt={product.name} className="product-img" />
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description || ''}</p>
        <div className="product-meta">
          <span>{product.calories ? `${product.calories} cal` : ''}</span>
          <strong>₹ {product.priceINR}</strong>
        </div>

        <button
          className={`add-btn ${added ? 'added' : ''}`}
          onClick={() => onAdd(product)}
        >
          {added ? 'Added' : 'Add'}
        </button>
      </div>
    </div>
  );
}
