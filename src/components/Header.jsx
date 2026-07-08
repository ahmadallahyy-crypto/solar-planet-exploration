// src/components/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import './Header.css';


const fetchNasaImages = async (query, count = 5) => {
  const searchRes = await fetch(
    `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`
  );
  if (!searchRes.ok) throw new Error(`NASA search failed: ${searchRes.status}`);

  const searchData = await searchRes.json();
  const items = searchData.collection?.items;
  if (!items || items.length === 0) throw new Error('No results found');

  const imageUrls = await Promise.all(
    items.slice(0, count).map(async (item) => {
      try {
        const collectionRes = await fetch(item.href);
        if (!collectionRes.ok) return null;
        const collectionData = await collectionRes.json();
        return collectionData.find(url =>
          url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')
        ) || null;
      } catch {
        return null;
      }
    })
  );

  const validUrls = imageUrls.filter(Boolean);
  if (validUrls.length === 0) throw new Error('No valid image URLs found');
  return validUrls;
};


const useImageRotator = (images, interval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [images, interval]);

  return images?.[currentIndex] || null;
};


const Header = ({ onContactClick }) => {

  const [headerImages, setHeaderImages]   = useState([]);
  const [headerLoading, setHeaderLoading] = useState(true);

  useEffect(() => {
    fetchNasaImages('milky way nebula galaxy', 5)
      .then(urls => setHeaderImages(urls))
      .catch(err => console.error('❌ Header images error:', err))
      .finally(() => setHeaderLoading(false));
  }, []);

  const currentHeaderImage = useImageRotator(headerImages, 4000);

  return (
    <>
      {/* ── LOGO SECTION ── */}
      <div className="logo-section">
        <div className="logo-container">
          <img
            src='https://img.magnific.com/free-vector/gradient-galaxy-logo-template_23-2149202378.jpg?semt=ais_hybrid&w=740&q=80' 
            alt="Space Explorer Logo"
            className="logo-image"
            onError={(e) => {
              e.target.onerror = null;   // prevent infinite loop
              e.target.src = '/logo.jpg'; // ✅ local fallback
            }}
          />
        </div>
        <hr />
      </div>

      {/* ── MAIN HEADER SECTION ── */}
      <div className="header-container">

        <div className="header-content">
          <h1 className="page-title">EXPLORE OUR SOLAR SYSTEM THROUGH DATA</h1>
          <p className="page-subtitle">
            Understand the planets not just by name but with measurable data from size, mass to gravity and density...
          </p>
          <div className="header-actions">
            <button className="cta-button" onClick={onContactClick}>✉ Contact us</button>
            <a href="tel:+1234567890" className="action-link">📞 Call us</a>
          </div>
        </div>

        <div className="header-image">
          <div className="circular-image-wrapper">

            {headerLoading && (
              <div className="circular-image-loading">Loading...</div>
            )}

            {!headerLoading && currentHeaderImage && (
              <img
                key={currentHeaderImage}
                src={currentHeaderImage}
                alt="NASA Galaxy"
                className="circular-image"
              />
            )}

            {!headerLoading && !currentHeaderImage && (
              <div className="circular-image-loading">🪐</div>
            )}

          </div>
        </div>
      </div>

      <hr className="section-divider" />
    </>
  );
};

export default Header;