import React from 'react';
import { motion } from 'framer-motion';
import TeamCard from '../components/TeamCard';
import members from '../members';

const Team = () => {
  return (
    <section className="section">
      <div className="container" style={{display:'grid', gap:24}}>
        <h2>Our Team</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:22}}>
          {members.map((m, idx) => (
            <motion.div key={m.name} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.05*idx, duration:0.45}}>
              <TeamCard
                name={m.name}
                img={m.img}
                role={m.role}
                description={m.description}
                objectPosition={m.name === 'Shagun' ? 'center 15%' : 'center 50%'}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Team;


