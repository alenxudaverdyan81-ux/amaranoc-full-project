import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from './useCartStore';

export default function Zambyux() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#718096', fontSize: '18px' }}>
          Ձեր զամբյուղը դատարկ է:
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {cartItems.map((item, index) => {
            const itemImage = item.image || item.img || item.src;

            return (
              <div 
                key={item.id || item.location || index}
                onClick={() => {
               
                  const targetId = item.id || item.location;
                  if (targetId) {
                    navigate(`/house/${targetId}`);
                  }
                }}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  position: 'relative',
                  border: '1px solid #edf2f7',
                  cursor: 'pointer'
                }}
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff4d4d">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>

                <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                  <img 
                    src={itemImage} 
                    alt={item.location || "house"} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#718096' }}>
                    <span>📍 {item.location}</span>
                    <span>👥 {item.capacity || item.guests || 0} անձ</span>
                  </div>
                  <div style={{ fontWeight: '800', fontSize: '20px', color: '#1a202c' }}>{item.price} ֏</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}