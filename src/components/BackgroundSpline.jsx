import React from 'react';
import Spline from '@splinetool/react-spline';

const BackgroundSpline = () => {
  return (
    <div style={{position:'fixed', inset:0, zIndex:0, overflow:'hidden'}} aria-hidden="true">
      <Spline scene="https://prod.spline.design/64n1fu921-YYuhPO/scene.splinecode" />
      <div className="stars" />
      <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(4,8,21,0.2) 0%, rgba(4,8,21,0.6) 100%)'}} />
      <style>{`
        /* Hide Spline mobile joystick/controls if present */
        .spline-controls, [class*="joystick"], [class*="control"], canvas + div { display: none !important; }
      `}</style>
    </div>
  );
};

export default BackgroundSpline;


