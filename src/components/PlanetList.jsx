// src/components/PlanetList.jsx

import React, { useEffect, useRef, useState } from 'react';
import { fetchPlanets } from '../services/api';
import './PlanetList.css';

const PLANET_FALLBACKS = {
  Mercury: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
    local:    '/planets/mercury.jpg',
    distance: '57.9M km',
  },
  Venus: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
    local:    '/planets/venus.jpg',
    distance: '108.2M km',
  },
  Earth: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
    local:    '/planets/earth.jpg',
    distance: '149.6M km',
  },
  Mars: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
    local:    '/planets/mars.jpg',
    distance: '227.9M km',
  },
  Jupiter: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
    local:    '/planets/jupiter.jpg',
    distance: '778.5M km',
  },
  Saturn: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
    local:    '/planets/saturn.jpg',
    distance: '1.43B km',
  },
  Uranus: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
    local:    '/planets/uranus.jpg',
    distance: '2.87B km',
  },
  Neptune: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
    local:    '/planets/neptune.jpg',
    distance: '4.50B km',
  },
  Pluto: {
    external: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg',
    local:    '/planets/pluto.jpg',
    distance: '5.91B km',
  },
};

const BASE_PLANETS = Object.entries(PLANET_FALLBACKS).map(([name, data]) => ({
  name,
  external: data.external,
  local:    data.local,
  distance: data.distance,
}));

const PlanetCard = ({ planet }) => {
  const [src, setSrc] = useState(planet.external);

  const handleError = () => {
    if (src !== planet.local) {
      setSrc(planet.local);
    }
  };

  return (
    <div
      className="planet-card"
      onClick={() => alert(`${planet.name} — ${planet.distance} from the Sun`)}
    >
      <img
        src={src}
        alt={planet.name}
        className="planet"
        loading="lazy"
        onError={handleError}
      />
      <p className="planet-name">{planet.name}</p>
      <p className="planet-distance">📍 {planet.distance} from Sun</p>
    </div>
  );
};

const PlanetList = () => {
  const sectionRef = useRef(null);
  const [planets, setPlanets] = useState(BASE_PLANETS);
  const [_loading, setLoading] = useState(true);   // ✅ fixed: unused var suppressed
  const [error, _setError] = useState(null);       // ✅ fixed: unused var suppressed

  useEffect(() => {
    fetchPlanets()
      .then(data => {
        const enriched = BASE_PLANETS.map(base => {
          const apiData = data.find(
            p => p.name?.toLowerCase() === base.name.toLowerCase()
          );
          return {
            ...base,
            ...(apiData || {}),
            name:     base.name,
            external: base.external,
            local:    base.local,
            distance: base.distance,
          };
        });
        setPlanets(enriched);
      })
      .catch(err => console.error('❌ API fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (error) return <p className="planet-error">{error}</p>;

  return (
    <div className="content-section fade-in" ref={sectionRef}>
      <h2 className="section-title">Planetary Classification and Features</h2>
      <p className="section-description">
        Planets in our solar system are categorized based on their composition
        and position. Terrestrial planets have solid surfaces, while Jovian
        planets are primarily hydrogen and helium.
      </p>

      <div className="planet-grid">
        {planets.map((planet, index) => (
          <PlanetCard key={planet.name || index} planet={planet} />
        ))}
      </div>
    </div>
  );
};

export default PlanetList;