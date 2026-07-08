import React, { useEffect, useRef } from 'react';
import './DataTable.css';

const DataTable = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="content-section fade-in" ref={sectionRef}>
      <h2 className="section-title">Comparative Planetary Data Analysis</h2>
      <p className="section-description">
        The following table presents key physical characteristics of solar system bodies, allowing for direct
        comparison of their properties. This data reveals patterns in planetary formation and helps scientists
        understand the diversity of worlds in our cosmic neighborhood.
      </p>
      <p className="table-caption">
        Data about the planets of our solar system (Planetary facts taken from NASA)
      </p>
      <div className="data-table-container">
        <table className="planet-data-table">
          <thead>
            <tr>
              <th className="th-blank" colSpan={2}></th>
              <th>Name</th>
              <th>Mass (10<sup>24</sup>kg)</th>
              <th>Diameter (km)</th>
              <th>Density (kg/m<sup>3</sup>)</th>
              <th>Gravity (m/s<sup>2</sup>)</th>
            </tr>
          </thead>
          <tbody>

            {/* ── Terrestrial Planets ── */}
            <tr>
              <td className="planet-category" colSpan={2} rowSpan={4}>Terrestrial Planets</td>
              <td className="planet-name-cell">Mercury</td>
              <td>0.330</td><td>4,878</td><td>5,427</td><td>3.7</td>
            </tr>
            <tr>
              <td className="planet-name-cell">Venus</td>
              <td>4.87</td><td>12,104</td><td>5,243</td><td>8.9</td>
            </tr>
            <tr>
              <td className="planet-name-cell">Earth</td>
              <td>5.97</td><td>12,756</td><td>5,514</td><td>9.8</td>
            </tr>
            <tr>
              <td className="planet-name-cell">Mars</td>
              <td>0.642</td><td>6,792</td><td>3,933</td><td>3.7</td>
            </tr>

            {/* ── Jovian: Gas Giants ── */}
            <tr>
              <td className="planet-category planet-category--jovian" rowSpan={4}>Jovian<br />Planets</td>
              <td className="planet-subcategory" rowSpan={2}>Gas Giants</td>
              <td className="planet-name-cell">Jupiter</td>
              <td>1,898</td><td>142,984</td><td>1,326</td><td>23.1</td>
            </tr>
            <tr>
              <td className="planet-name-cell">Saturn</td>
              <td>568</td><td>120,536</td><td>687</td><td>9.0</td>
            </tr>

            {/* ── Jovian: Ice Giants ── */}
            <tr>
              <td className="planet-subcategory" rowSpan={2}>Ice Giants</td>
              <td className="planet-name-cell">Uranus</td>
              <td>86.8</td><td>51,118</td><td>1,271</td><td>8.7</td>
            </tr>
            <tr>
              <td className="planet-name-cell">Neptune</td>
              <td>102</td><td>49,528</td><td>1,638</td><td>11.0</td>
            </tr>

            {/* ── Dwarf Planets ── */}
            <tr>
              <td className="planet-category" colSpan={2}>Dwarf Planets</td>
              <td className="planet-name-cell">Pluto</td>
              <td>0.0131</td><td>2,376</td><td>1,854</td><td>0.7</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;