import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCartStore from './pages/useCartStore';

export default function Card({ id, location, price, capacity, image, rating }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const cartItems = useCartStore((state) => state.cartItems);
  
  const isFavorite = pathname.toLowerCase().includes('cart') || cartItems.some(item => 
    (id && item.id === id) || (item.location === location && item.price === price)
  );

  const handleCardClick = () => {
    const houseId = id || location; 
    if (houseId) {
      navigate(`/house/${houseId}`);
    }
  };

  return (
    <>
      <style>{`
        .house-card {
          background-color: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
          border: 1px solid #edf2f7;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .house-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        .heart-btn-only {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 10;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: transform 0.2s ease;
        }

        .heart-btn-only:hover {
          transform: scale(1.15);
        }

        .heart-btn-only.active svg {
          animation: heartPopEffect 0.3s ease-in-out;
        }

        @keyframes heartPopEffect {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div 
        onClick={handleCardClick}
        className="house-card"
      >
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite({ id, location, price, capacity, image, rating });
          }}
          className={`heart-btn-only ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff4d4d">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.95)" 
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.6))' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </button>

        <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
          <img src={image} alt={location} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#718096', fontSize: '14px' }}>
            <span>📍 {location}</span>
            <span>👥 {capacity} անձ</span>
          </div>
          <div style={{ fontWeight: '800', fontSize: '18px', color: '#1a202c' }}>{price} ֏</div>
        </div>
      </div>
    </>
  );
}