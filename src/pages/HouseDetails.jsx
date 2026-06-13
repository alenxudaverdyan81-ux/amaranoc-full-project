import React from 'react';
import { useParams } from 'react-router-dom';

export default function HouseDetails() {
  const { id } = useParams();

  const images = [
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500",
    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=500",
    "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=500"
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', margin: 0 }}>📍 Ամարանոց (ID: {id})</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#718096' }}>Արժեք</span>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#ff7e42' }}>120,000 ֏</div>
          </div>
          <div style={{ border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#718096' }}>Արժեքը գիշերակացով</span>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#ff7e42' }}>150,000 ֏</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', height: '450px', marginBottom: '30px' }}>
        <div style={{ gridRow: 'span 2', borderRadius: '20px', overflow: 'hidden' }}>
          <img src={images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </div>
        <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <img src={images[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </div>
        <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <img src={images[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </div>
        <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <img src={images[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </div>
        <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
          <img src={images[4]} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} alt="" />
          <button style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Տեսնել բոլորը</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        <div>
          <h2 style={{ fontSize: '22px', borderBottom: '1px solid #edf2f7', paddingBottom: '10px' }}>Ընդհանուր նկարագրություն</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', color: '#4a5568' }}>
            <li>🔢 <strong>Կոդ:</strong> AM523</li>
            <li>📍 <strong>Հասցե:</strong> Ք. Արմավիր</li>
            <li>🌙 <strong>Գիշերակաց:</strong> Այո</li>
            <li>📐 <strong>Շինության մակերես:</strong> 150 քմ</li>
            <li>👥 <strong>Թույլատրելի քանակ:</strong> 40 մարդ</li>
            <li>🛏️ <strong>Սենյակների քանակ:</strong> 3</li>
            <li>🏊 <strong>Լողավազան:</strong> Բաց</li>
          </ul>
        </div>
      </div>
    </div>
  );
}