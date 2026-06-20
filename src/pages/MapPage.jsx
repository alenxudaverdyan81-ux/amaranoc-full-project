import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapPage() {
  const [firebaseOffers, setFirebaseOffers] = useState([]);

  const localOffers = [
    { id: 'local-1', location: 'Դիլիջան', price: 35000, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600', lat: 40.7418, lng: 44.8643 },
    { id: 'local-2', location: 'Բջնի', price: 45000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600', lat: 40.4594, lng: 44.6514 },
    { id: 'local-3', location: 'Դիլիջան', price: 75000, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', lat: 40.7420, lng: 44.8700 },
    { id: 'local-4', location: 'Ծաղկաձոր', price: 90000, image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600', lat: 40.5332, lng: 44.7061 },
    { id: 'local-5', location: 'Ծաղկաձոր', price: 130000, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', lat: 40.5350, lng: 44.7100 },
    { id: 'local-10', location: 'Ապարան', price: 350000, image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600', lat: 40.5938, lng: 44.3541 }
  ];

  useEffect(() => {
    const colRef = collection(db, 'houses');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFirebaseOffers(data);
    });
    return () => unsubscribe();
  }, []);

  const allOffers = [...firebaseOffers, ...localOffers];

  const createPriceIcon = (price) => {
    return new L.DivIcon({
      className: 'custom-price-marker',
      html: `<div style="background-color: white; padding: 6px 10px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); font-weight: bold; font-size: 13px; color: #333; border: 1px solid #ff7e42; text-align: center; white-space: nowrap;">${Number(price).toLocaleString()} ֏</div>`,
      iconSize: [75, 35],
      iconAnchor: [37, 17]
    });
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 90px)', padding: '20px', boxSizing: 'border-box' }}>
      <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Ամարանոցները քարտեզի վրա</h2>
      <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}>
        <MapContainer center={[40.1792, 44.5152]} zoom={9} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allOffers.map(item => {
            const lat = item.lat || 40.1792;
            const lng = item.lng || 44.5152;
            return (
              <Marker key={item.id} position={[lat, lng]} icon={createPriceIcon(item.price)}>
                <Popup>
                  <div style={{ width: '160px' }}>
                    <img src={item.image} alt={item.location} style={{ width: '100%', borderRadius: '4px', height: '90px', objectFit: 'cover', marginBottom: '5px' }} />
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{item.location}</h4>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#ff7e42', fontSize: '13px' }}>{Number(price).toLocaleString()} ֏</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}