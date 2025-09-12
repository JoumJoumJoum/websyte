import React, { useEffect, useRef } from 'react';

const CursorFX = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (dot) { dot.style.transform = `translate(${x}px, ${y}px)`; }
      requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    loop();
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const star = document.createElement('div');
      star.className = 'falling-star';
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1200);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-orb" />
      <style>{`
        .cursor-orb {
          position: fixed; z-index: 9999; width: 16px; height: 16px; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(160,220,255,0.9), rgba(0,180,255,0.4));
          box-shadow: 0 0 20px rgba(80,150,255,0.8), 0 0 40px rgba(0,200,255,0.35);
          pointer-events: none; transform: translate(-50%, -50%);
          mix-blend-mode: screen;
        }
        a:hover ~ .cursor-orb, button:hover ~ .cursor-orb { transform: translate(-50%, -50%) scale(1.3); }
        .falling-star {
          position: fixed; width: 2px; height: 2px; background: linear-gradient(135deg, #fff, #7fd7ff);
          box-shadow: 0 0 10px #8fe3ff; transform: translate(-50%, -50%) rotate(45deg);
          animation: starFall 1.2s ease forwards;
        }
        @keyframes starFall {
          to { transform: translate(calc(-50% + 150px), calc(-50% + 220px)) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default CursorFX;


