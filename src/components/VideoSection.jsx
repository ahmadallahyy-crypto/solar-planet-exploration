// src/components/VideoSection.jsx

import React, { useEffect, useRef } from 'react';
import './VideoSection.css';

const VideoSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="content-section fade-in" ref={sectionRef}>
      <h2 className="section-title">Understanding Planetary Orbits</h2>
      <p className="section-description">
        Planets in our solar system follow elliptical orbits around the Sun, with orbital periods ranging from 88 days
        for Mercury to 165 years for Neptune. These orbits are governed by gravitational forces and follow Kepler's
        laws of planetary motion. The shape and size of a planet's orbit determine its distance from the Sun and its
        orbital velocity. Inner planets have shorter, faster orbits while outer planets have longer, slower paths
        around the Sun.
      </p>

      <div className="media-wrapper">
        <div className="video-container">
          <iframe
            className="video-iframe"
            src="https://www.youtube.com/embed/libKVRa01L8?autoplay=1&mute=1&loop=1&playlist=libKVRa01L8"
            title="Solar System 101 | National Geographic"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;