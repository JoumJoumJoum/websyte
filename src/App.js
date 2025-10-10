import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundCssGlobe from './components/BackgroundCssGlobe';
import CursorFX from './components/CursorFX';
import Loader from './components/Loader';

import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <div className="app-root">
        <Loader />
        <BackgroundCssGlobe />
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <CursorFX />
      </div>
    </Router>
  );
};

export default App;

