import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';
import FallingText from '../components/FallingText';
import ImageGallery from '../components/ImageGallery';

const Home = () => {
  const [gravityMode, setGravityMode] = useState(false);

  useEffect(() => {
    const onRocket = () => setGravityMode((g) => !g);
    window.addEventListener('rocket-gravity', onRocket);
    return () => window.removeEventListener('rocket-gravity', onRocket);
  }, []);

  return (
    <>
    <section className="section" style={{paddingTop: '90vh'}}>
      <div className="container" style={{display:'grid', gap:36}}>
        {!gravityMode ? (
          <SpotlightCard style={{padding:'34px 28px'}}>
            <h1 style={{fontSize:40}}>IEEE GRSS Student Chapter, MUJ</h1>
            <p>Advancing the science and technology of remote sensing—fostering innovation, education, and community at Manipal University Jaipur.</p>
          </SpotlightCard>
        ) : (
          <FallingText
            text={`IEEE GRSS Student Chapter, MUJ – Advancing remote sensing through innovation, education, and community.`}
            highlightWords={["IEEE","GRSS","remote","innovation"]}
            highlightClass="highlighted"
            trigger="auto"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="1.4rem"
            mouseConstraintStiffness={0.9}
          />
        )}

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:38}}>
          {[
            { title:'Mission', text:'Promote remote sensing knowledge and applications through events, workshops, and research.' },
            { title:'Vision', text:'Build a vibrant community of students passionate about Earth observation and geoscience.' },
            { title:'Activities', text:'Talks, hackathons, projects, and collaborations with academia and industry.' }
          ].map((card, idx) => (
            <motion.div key={card.title} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1*idx, duration:0.5}}>
              <SpotlightCard>
                <h3 className="michroma" style={{marginBottom:10}}>{card.title}</h3>
                <p>{card.text}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" style={{paddingTop:60}}>
      <div className="container" style={{display:'grid', gap:18}}>
        <h2 className="michroma" style={{textAlign:'center'}}>Highlights</h2>
        <ImageGallery />
      </div>
    </section>

    <section className="section" style={{paddingTop:60}}>
      <div className="container" style={{display:'grid', gap:18}}>
        <h2 className="michroma">Vision & Mission</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16}}>
          {[{t:'Education',d:'Host lectures and workshops to educate students in remote sensing and EO.'},{t:'Research',d:'Collaborate on research projects leveraging satellite data and geospatial analysis.'},{t:'Community',d:'Grow a strong community through events, mentoring, and outreach.'}].map((c,i)=>(
            <motion.div key={c.t} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.05*i}}>
              <SpotlightCard>
                <h3 className="michroma" style={{marginBottom:8}}>{c.t}</h3>
                <p>{c.d}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" style={{paddingTop:60}}>
      <div className="container" style={{display:'grid', gap:18}}>
        <SpotlightCard>
          <h2 className="michroma">About IEEE GRSS</h2>
          <p>
            The IEEE Geoscience and Remote Sensing Society (GRSS) advances the science and engineering of remote sensing of the Earth, oceans, atmosphere, and space, including data processing and interpretation. GRSS fosters professional development, education, and collaboration among researchers and practitioners in Earth observation.
          </p>
        </SpotlightCard>
      </div>
    </section>

    <section className="section" style={{paddingTop:60}}>
      <div className="container" style={{display:'grid', gap:18}}>
        <SpotlightCard>
          <h2 className="michroma">About Manipal University Jaipur</h2>
          <p>
            Manipal University Jaipur (MUJ) is a multidisciplinary university known for its strong emphasis on innovation, research, and experiential learning. The campus fosters a dynamic environment for engineering, sciences, and liberal arts, encouraging student-led chapters like IEEE GRSS to pursue impactful projects and events.
          </p>
        </SpotlightCard>
      </div>
    </section>

    <section className="section" style={{paddingTop:60}}>
      <div className="container" style={{display:'grid', gap:14}}>
        <SpotlightCard>
          <h2 className="michroma">Get Involved</h2>
          <p>Join our chapter, participate in events, and collaborate on real-world geospatial challenges.</p>
        </SpotlightCard>
      </div>
    </section>
    </>
  );
};

export default Home;


