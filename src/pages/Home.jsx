import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import Sidebar from '../Sidebar';
import Card from '../Card';
import FrameHouses from './FrameHouses';
import Tnakner from './Tnakner';
import Loxavazan from './Loxavazan';

export default function Home({ searchTerm = "" }) {
  const [activeCategory, setActiveCategory] = useState('amaranoc');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [capacity, setCapacity] = useState(1);
  const [firebaseOffers, setFirebaseOffers] = useState([]);

  const localOffers = [
    { id: 'local-1', location: 'Դիլիջան', price: 35000, capacity: 8, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600', category: 'amaranoc' },
    { id: 'local-2', location: 'Բջնի', price: 45000, capacity: 6, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600', category: 'amaranoc' },
    { id: 'local-3', location: 'Դիլիջան', price: 75000, capacity: 20, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', category: 'amaranoc' },
    { id: 'local-4', location: 'Ծաղկաձոր', price: 90000, capacity: 20, image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600', rating: 5, category: 'amaranoc' },
    { id: 'local-5', location: 'Ծաղկաձոր', price: 130000, capacity: 20, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', category: 'amaranoc' },
    { id: 'local-6', location: 'Նոր Հաճն', price: 140000, capacity: 25, image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600', rating: 5, category: 'amaranoc' },
    { id: 'local-7', location: 'Էջմիածին', price: 120000, capacity: 40, image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600', category: 'amaranoc' },
    { id: 'local-8', location: 'Գառնի', price: 45000, capacity: 6, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', category: 'amaranoc' },
    { id: 'local-9', location: 'Եղվարդ', price: 80000, capacity: 30, image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=600', category: 'amaranoc' },
    { id: 'local-10', location: 'Ապարան', price: 350000, capacity: 32, image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600', category: 'amaranoc' },
    { id: 'local-11', location: 'Ձորաղբյուր', price: 130000, capacity: 20, image: 'https://avatars.mds.yandex.net/i?id=5cfde40356e7ca23d32b5fa0603050f9_l-7085252-images-thumbs&n=13', category: 'amaranoc' },
    { id: 'local-12', location: 'Աբովյան', price: 70000, capacity: 22, image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600', category: 'amaranoc' }
  ];

  useEffect(() => {
    const colRef = collection(db, 'houses');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirebaseOffers(data);
    }, (error) => {
      console.error(error);
    });
    return () => unsubscribe();
  }, []);

  const allOffers = [...firebaseOffers, ...localOffers];

  const filteredOffers = allOffers.filter(item => {
    const cleanDbCategory = item.category 
      ? item.category.replace(/['"]+/g, '').trim().toLowerCase() 
      : 'amaranoc';
    const cleanActiveCategory = activeCategory.toLowerCase().trim();

    const matchesCategory = cleanDbCategory === cleanActiveCategory;
    const matchesSearch = item.location 
      ? item.location.toLowerCase().includes(searchTerm.toLowerCase()) 
      : true;
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(item.location);
    const matchesMinPrice = priceRange.min === '' || Number(item.price) >= Number(priceRange.min);
    const matchesMaxPrice = priceRange.max === '' || Number(item.price) <= Number(priceRange.max);
    const matchesCapacity = Number(item.capacity) === 0 || Number(item.capacity) >= Number(capacity);

    return matchesCategory && matchesSearch && matchesRegion && matchesMinPrice && matchesMaxPrice && matchesCapacity;
  });

  return (
    <div className="main-layout container" style={{ marginTop: '20px' }}>
      <Sidebar 
        selectedRegions={selectedRegions} 
        setSelectedRegions={setSelectedRegions}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        capacity={capacity}
        setCapacity={setCapacity}
      />
      
      <main className="content-area">
        <div className="categories-slider">
          <div className={`category-item ${activeCategory === 'amaranoc' ? 'active' : ''}`} onClick={() => setActiveCategory('amaranoc')} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-house"></i> <span>Ամարանոցներ</span>
          </div>
          <div className={`category-item ${activeCategory === 'frame' ? 'active' : ''}`} onClick={() => setActiveCategory('frame')} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-campground"></i> <span>Frame houses</span>
          </div>
          <div className={`category-item ${activeCategory === 'tnakner' ? 'active' : ''}`} onClick={() => setActiveCategory('tnakner')} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-gite"></i> <span>Տնակներ</span>
          </div>
          <div className={`category-item ${activeCategory === 'pool' ? 'active' : ''}`} onClick={() => setActiveCategory('pool')} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-swimming-pool"></i> <span>Փակ լողավազան</span>
          </div>
        </div>
        
        <h2 className="section-title" style={{ textAlign: 'center', margin: '30px 0' }}>ԹԵԺ ԱՌԱՋԱՐԿՆԵՐ</h2>
        
        {activeCategory === 'frame' ? (
          <FrameHouses />
        ) : activeCategory === 'tnakner' ? (
          <Tnakner />
        ) : activeCategory === 'pool' ? (
          <Loxavazan />
        ) : (
          <div className="listings-grid">
            {filteredOffers.length > 0 ? (
              filteredOffers.map(item => (
                <Card 
                  key={item.id}
                  id={item.id}
                  location={item.location} 
                  price={item.price} 
                  capacity={item.capacity} 
                  image={item.image} 
                  rating={item.rating} 
                />
              ))
            ) : (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>Համապատասխան հայտարարություն չգտնվեց։</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}