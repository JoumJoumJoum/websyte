import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="section">
      <div className="container" style={{display:'grid', gap:24}}>
        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}} className="glass" style={{borderRadius:16, padding:'28px 24px'}}>
          <h2>About Us</h2>
          <p>
            The IEEE Geoscience and Remote Sensing Society (GRSS) is dedicated to the scientific and engineering principles of remote sensing of the Earth, oceans, atmosphere, and space, as well as the processing, interpretation, and dissemination of this information.
          </p>
          <p>
            At MUJ, our student chapter conducts workshops, seminars, and collaborative projects to promote Earth observation, satellite imagery analysis, and the development of geospatial technologies.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16, marginTop:14}}>
            {[{title:'Mission', text:'Advance remote sensing education, research, and innovation at MUJ.'},{title:'Vision', text:'Empower students to impact society using Earth observation technologies.'},{title:'Activities', text:'Seminars, workshops, hackathons, research groups, and outreach.'}].map((c) => (
              <div key={c.title} className="glass" style={{borderRadius:14, padding:'18px 16px'}}>
                <h3 style={{marginBottom:6}}>{c.title}</h3>
                <p style={{margin:0}}>{c.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16}}>
          {[{
            title:'IEEE',
            text:'IEEE is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity.'
          },{
            title:'GRSS',
            text:'GRSS focuses on the science and technology of remote sensing and Earth observation, enabling impactful applications.'
          }].map((info, idx) => (
            <motion.div key={info.title} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1*idx, duration:0.5}} className="glass" style={{borderRadius:14, padding:'20px 18px'}}>
              <h3 style={{marginBottom:8}}>{info.title}</h3>
              <p>{info.text}</p>
            </motion.div>
          ))}
        </div>
        <div style={{marginTop:32, textAlign:'center'}}>
          <button
            style={{
              background:'#ccc',
              color:'#888',
              border:'none',
              padding:'12px 32px',
              borderRadius:'8px',
              cursor:'not-allowed',
              fontSize:'1.1rem',
              fontWeight:'bold',
              position:'relative',
              transition:'background 0.2s',
            }}
            disabled
            onMouseOver={e => {
              e.target.setAttribute('data-hover', 'true');
              e.target.textContent = 'Coming Soon';
            }}
            onMouseOut={e => {
              e.target.removeAttribute('data-hover');
              e.target.textContent = 'Join Now';
            }}
          >
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;


