// src/services/api.js

export const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

const PLANETS_API_URL = 'https://anurella.github.io/json/planets.json';

export const fetchPlanets = async () => {
  const response = await fetch(PLANETS_API_URL);
  if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  const data = await response.json();

  // Only return planet data — images handled entirely in the component
  return data.map(item => ({
    ...item,
    name: item.planet || item.name,
  }));
};