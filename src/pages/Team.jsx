import React from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '../components/TiltedCard';

const members = [
  { name:'Aarav Sharma', role:'Chair', img:'https://i.pravatar.cc/200?img=11', linkedin:'#' },
  { name:'Isha Verma', role:'Vice Chair', img:'https://i.pravatar.cc/200?img=12', linkedin:'#' },
  { name:'Kabir Singh', role:'Secretary', img:'https://i.pravatar.cc/200?img=13', linkedin:'#' },
  { name:'Meera Patel', role:'Treasurer', img:'https://i.pravatar.cc/200?img=14', linkedin:'#' },
  { name:'Rohan Gupta', role:'Events Lead', img:'https://i.pravatar.cc/200?img=15', linkedin:'#' },
  { name:'Simran Kaur', role:'Design Lead', img:'https://i.pravatar.cc/200?img=16', linkedin:'#' },
];

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
                altText={`${m.name} - ${m.role}`}
                captionText={`${m.name} — ${m.role}`}
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
                    <div style={{fontSize:12, color:'#9fb7e6'}}>{m.role}</div>
                    <button onClick={() => window.open(m.linkedin || '#', '_blank')} style={{marginTop:6, padding:'6px 10px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(80,120,255,0.25)', color:'#eaf2ff'}}>Connect</button>
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


