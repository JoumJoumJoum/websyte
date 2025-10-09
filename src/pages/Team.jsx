import React from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '../components/TiltedCard';
import members from '../members';

const Team = () => {
  return (
    <section className="section">
      <div className="container" style={{display:'grid', gap:24}}>
        <h2>Our Team</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:26}}>
          {members.map((m, idx) => (
            <motion.div key={m.name} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.05*idx, duration:0.45}}>
              <TiltedCard
                imageSrc={m.img}
                altText={`${m.name}`}
                captionText={`${m.name}`}
                containerHeight="330px"
                containerWidth="100%"
                imageHeight="330px"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.12}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div style={{display:'grid', gap:6}}>
                    <div style={{fontWeight:700}}>{m.name}</div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Team;


