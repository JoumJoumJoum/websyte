import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroOverlay = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setOffset({ x: dx * 10, y: dy * 10 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div style={{position:'fixed', inset:0, zIndex:1, display:'grid', placeItems:'center', pointerEvents:'none'}}>
      <motion.h1
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          fontFamily: 'Poppins, Inter, system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(36px, 8vw, 80px)',
          letterSpacing: 1.2,
          color: '#eaf2ff',
          textShadow: '0 0 20px rgba(120,170,255,0.6), 0 0 40px rgba(70,120,255,0.35)',
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`
        }}
        className="floaty hover-shimmer"
      >
        IEEE GRSS MUJ
      </motion.h1>
      {null}
      <style>{`
        .floaty { animation: floatY 8s ease-in-out infinite; }
        .hover-shimmer { position: relative; }
        .hover-shimmer::after {
          content: '';
          position: absolute; inset: 0; border-radius: 8px; pointer-events: none;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 20%, transparent 40%);
          transform: translateX(-120%);
          transition: transform 0.8s ease;
        }
        .hover-shimmer:hover::after { transform: translateX(120%); }
      `}</style>
    </div>
  );
};

export default HeroOverlay;


