import React from 'react';

const BackgroundCssGlobe = () => {
  return (
    <div style={{position:'fixed', inset:0, zIndex:0, overflow:'hidden'}} aria-hidden="true">
      <div className="globe-wrap">
        <div className="globe" />
        <div className="glow" />
        <div className="stars" />
      </div>
      <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(3,6,16,0.12) 0%, rgba(3,6,16,0.72) 100%)'}} />
      <style>{`
        .globe-wrap { position: absolute; inset: 0; display: grid; place-items: center; }
        .globe {
          width: min(92vmin, 1200px);
          height: min(92vmin, 1200px);
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          background-image: url('/images/earthskin.jpg');
          background-repeat: repeat-x;
          background-size: auto 100%; /* keep original width, tile horizontally */
          background-position: 0% 50%;
          animation: earthRotate 10s linear infinite;
          will-change: background-position;
          /* Night shading and rim light */
          box-shadow:
            inset -60px -90px 140px rgba(0,0,0,0.7),
            0 0 120px rgba(40,120,255,0.20),
            0 0 240px rgba(20,60,160,0.18);
          filter: brightness(1.15) contrast(1.06) saturate(1.12);
        }
        /* Soft crescent/terminator to emphasize night-side */
        .globe::before {
          content: '';
          position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
          background: radial-gradient(80% 80% at 35% 35%, rgba(120,170,255,0.26), transparent 45%),
                      radial-gradient(100% 100% at 70% 70%, rgba(0,0,0,0.5), transparent 55%);
          mix-blend-mode: screen;
        }
        /* Latitude hints (very subtle) */
        .globe::after {
          content: '';
          position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
          background-image:
            radial-gradient(circle at 50% 50%, transparent 60%, rgba(160,200,255,0.18) 60.8%, transparent 61.5%),
            radial-gradient(circle at 50% 50%, transparent 70%, rgba(160,200,255,0.1) 70.6%, transparent 71.2%);
          opacity: 0.42;
        }

        /* Rim light */
        .glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at 30% 30%, rgba(120,170,255,0.32), transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(0,100,220,0.2), transparent 55%);
          filter: blur(34px);
        }

        /* Starfield */
        .stars {
          position: absolute; inset: -10%; pointer-events: none;
          background-image:
            radial-gradient(2px 2px at 18% 26%, rgba(255,255,255,0.9), transparent 60%),
            radial-gradient(1.6px 1.6px at 66% 68%, rgba(170,200,255,0.85), transparent 60%),
            radial-gradient(1.1px 1.1px at 82% 22%, rgba(255,255,255,0.75), transparent 60%),
            radial-gradient(1.9px 1.9px at 34% 84%, rgba(180,210,255,0.9), transparent 60%);
          opacity: 0.7;
          animation: twinkle 6s ease-in-out infinite alternate;
        }

        @keyframes earthRotate {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes twinkle { 0% { opacity: 0.5; } 100% { opacity: 0.85; } }
      `}</style>
    </div>
  );
};

export default BackgroundCssGlobe;




