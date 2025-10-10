import React from 'react';
import Spline from '@splinetool/react-spline';

const BackgroundSpline = () => {
  return (
    <div className="spline-container" style={{position:'fixed', inset:0, zIndex:0, overflow:'hidden'}} aria-hidden="true">
      <Spline scene="https://prod.spline.design/64n1fu921-YYuhPO/scene.splinecode" />
      <div className="stars" />
      <div className="spline-gradient" style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(4,8,21,0.2) 0%, rgba(4,8,21,0.6) 100%)'}} />
      <style>{`
        /* Hide any Spline-injected UI (e.g., mobile joystick/controls) */
        .spline-container > div:not(.stars):not(.spline-gradient) { display: none !important; }
        .spline-container [class*='joystick'], .spline-container [class*='control'] { display: none !important; }
      `}</style>
    </div>
  );
};

export default BackgroundSpline;


