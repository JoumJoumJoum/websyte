import React from 'react';

const RocketButton = ({ onActivate }) => {
  const onClick = () => {
    // launch animation
    const btn = document.getElementById('rocket-btn');
    if (btn) {
      btn.classList.add('launch');
      setTimeout(() => btn.classList.remove('launch'), 900);
    }
    // smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onActivate?.();
  };
  return (
    <button id="rocket-btn" onClick={onClick} aria-label="Scroll to top and toggle gravity" title="Launch gravity"
      className="glass" style={{
        position:'fixed', right:18, bottom:86, zIndex:3, borderRadius:14,
        padding:'10px 12px', background:'rgba(80,120,255,0.25)', color:'#eaf2ff'
      }}>
      <span style={{display:'inline-block', transition:'transform 300ms'}} className="rocket-emoji">🚀</span>
      <style>{`
        #rocket-btn.launch .rocket-emoji { transform: translateY(-60px); }
        #rocket-btn.launch { box-shadow: 0 0 20px rgba(0,200,255,0.6); }
      `}</style>
    </button>
  );
};

export default RocketButton;


