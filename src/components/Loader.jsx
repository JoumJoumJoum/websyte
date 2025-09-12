import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1200); return () => clearTimeout(t); }, []);
  if (done) return null;
  return (
    <div style={{position:'fixed', inset:0, zIndex:9999, display:'grid', placeItems:'center', background:'radial-gradient(800px 400px at 50% -10%, rgba(60,100,255,0.15), rgba(4,8,21,0.95))'}}>
      <div style={{width:64, height:64, borderRadius:'50%', border:'3px solid rgba(156,196,255,0.2)', borderTopColor:'#9cc4ff', animation:'spin 1s linear infinite'}} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loader;


