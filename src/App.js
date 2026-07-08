import React, { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import VideoSection from './components/VideoSection';
import PlanetList from './components/PlanetList';
import DataTable from './components/DataTable';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const contactFormRef = useRef(null);

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Header onContactClick={scrollToContact} />
      <VideoSection />
      <PlanetList />
      <DataTable />
      <ContactForm ref={contactFormRef} />
      <Footer />
    </div>
  );
}

export default App;