import React, { useEffect, useState } from 'react';
import SpotlightCard from './SpotlightCard';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{position:'fixed', top:16, left:0, right:0, zIndex:5, display:'flex', justifyContent:'center', pointerEvents:'none'}}>
      <SpotlightCard className={`floating`} style={{pointerEvents:'auto', width:'min(1100px, 92%)', padding: scrolled ? '8px 16px' : '12px 18px'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
          <Link to="/" style={{display:'flex', alignItems:'center', gap:10, color:'#eaf2ff', fontWeight:700, letterSpacing:0.3}}>
            <img 
              src="/images/logo.png" 
              alt="GRSS Logo" 
              style={{width:34, height:34, borderRadius:'50%', objectFit:'cover', boxShadow:'0 6px 16px rgba(0,0,0,0.4)'}}
            />
            <span>IEEE GRSS MUJ</span>
          </Link>

          <div className="desktop-menu" style={{display:'none', gap:18, alignItems:'center'}}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/team">Our Team</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <button aria-label="Menu" className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{background:'transparent', border:'none', color:'#eaf2ff', fontSize:24, display:'grid', placeItems:'center'}}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="mobile-menu" style={{display:'grid', gap:10, padding:'10px 6px'}}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/team">Our Team</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        )}

      </SpotlightCard>

      <style>{`
        @media (min-width: 820px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        .nav-link { position: relative; padding: 8px 10px; color: #d9e7ff; }
        .nav-link:hover { color: #ffffff; }
        .nav-link::after {
          content: '';
          position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px;
          background: linear-gradient(90deg, rgba(156,196,255,0), rgba(156,196,255,0.9), rgba(156,196,255,0));
          transform: scaleX(0); transform-origin: center; transition: transform 220ms ease;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.active { color: #ffffff; }
      `}</style>
    </header>
  );
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={`nav-link ${active ? 'active' : ''}`}>
      {children}
    </Link>
  );
};

export default Navbar;


