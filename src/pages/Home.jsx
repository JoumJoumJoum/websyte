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
    {/* Hero section: centered title that scrolls with page, appears in front initially */}
    <section className="section" style={{minHeight:'100vh', display:'grid', placeItems:'center'}}>
      <div className="container" style={{display:'grid', gap:24, textAlign:'center'}}>
        <motion.h1
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="michroma"
          style={{
            fontSize: 'clamp(36px, 8vw, 80px)',
            color: '#eaf2ff',
            textShadow: '0 0 20px rgba(120,170,255,0.6), 0 0 40px rgba(70,120,255,0.35)'
          }}
        >
          IEEE GRSS MUJ
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15, duration:0.6}}>
          Advancing remote sensing through innovation, education, and community.
        </motion.p>
      </div>
    </section>

    <section className="section" style={{paddingTop:60}}>
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
          <div style={{marginTop:16}}>
            <a
              href="https://media.discordapp.net/attachments/1070002730493550642/1426187521473118329/image.png?ex=68ea5022&is=68e8fea2&hm=2ed6c53b6e3f74e48cce719f9d43f1216bbefc8760cb03e70286c34441b56bc7&=&format=webp&quality=lossless&width=346&height=319"
              target="_blank"
              rel="noopener noreferrer"
              className="michroma"
              style={{
                display:'inline-block',
                padding:'12px 18px',
                borderRadius:10,
                color:'#eaf2ff',
                background:'linear-gradient(135deg, rgba(20,40,120,0.55), rgba(10,20,60,0.55))',
                border:'1px solid rgba(160,200,255,0.28)',
                boxShadow:'0 10px 30px rgba(0,0,0,0.45), 0 0 18px rgba(120,170,255,0.18) inset',
                backdropFilter:'blur(10px)'
              }}
            >
              Join now
            </a>
          </div>
        </SpotlightCard>
      </div>
    </section>
    </>
  );
};

export default Home;


