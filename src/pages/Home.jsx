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
      <section className="section" style={{ minHeight: '100vh', display: 'grid', alignItems: 'start', justifyItems: 'center', paddingTop: 36 }}>
        <div className="container" style={{ display: 'grid', gap: 12, textAlign: 'center' }}>
          <motion.img
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            src="/images/grss_logo.svg"
            alt="IEEE GRSS MUJ Logo"
            style={{
              maxWidth: '720px',
              width: '80vw',
              margin: '0 auto',
              display: 'block',
              marginBottom: '8px'
              // filter: 'drop-shadow(0 0 20px rgba(120,170,255,0.6))'
            }}
          />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} style={{ marginTop: 6 }}>
            Advancing remote sensing through innovation, education, and community.
          </motion.p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container" style={{ display: 'grid', gap: 36 }}>
          {!gravityMode ? (
            <SpotlightCard style={{ padding: '34px 28px' }}>
              <h1 style={{ fontSize: 40 }}>IEEE GRSS Student Chapter, MUJ</h1>
              <p>Advancing the science and technology of remote sensing—fostering innovation, education, and community at Manipal University Jaipur.</p>
            </SpotlightCard>
          ) : (
            <FallingText
              text={`IEEE GRSS Student Chapter, MUJ – Advancing remote sensing through innovation, education, and community.`}
              highlightWords={["IEEE", "GRSS", "remote", "innovation"]}
              highlightClass="highlighted"
              trigger="auto"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="1.4rem"
              mouseConstraintStiffness={0.9}
            />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 38 }}>
            {[
              { title: 'Mission', text: 'Promote remote sensing knowledge and applications through events, workshops, and research.' },
              { title: 'Vision', text: 'Build a vibrant community of students passionate about Earth observation and geoscience.' },
              { title: 'Activities', text: 'Talks, hackathons, projects, and collaborations with academia and industry.' }
            ].map((card, idx) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx, duration: 0.5 }}>
                <SpotlightCard>
                  <h3 className="michroma" style={{ marginBottom: 10 }}>{card.title}</h3>
                  <p>{card.text}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container" style={{ display: 'grid', gap: 18 }}>
          <h2 className="michroma" style={{ textAlign: 'center' }}>Highlights</h2>
          <ImageGallery />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container" style={{ display: 'grid', gap: 18 }}>
          <h2 className="michroma">Vision & Mission</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { t: 'Education', d: 'Host lectures and workshops to educate students in remote sensing and EO.' },
              { t: 'Research', d: 'Collaborate on research projects leveraging satellite data and geospatial analysis.' },
              { t: 'Outreach', d: 'Engage the wider community through competitions and awareness events.' }
            ].map((c, i) => (
              <motion.div key={c.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}>
                <SpotlightCard>
                  <h3 className="michroma" style={{ marginBottom: 8 }}>{c.t}</h3>
                  <p>{c.d}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container" style={{ display: 'grid', gap: 18 }}>
          <SpotlightCard>
            <h2 className="michroma">About IEEE GRSS</h2>
            <p>
              The IEEE Geoscience and Remote Sensing Society (GRSS) advances the science and engineering of remote sensing of the Earth, oceans, atmosphere, and space, including data processing and integration, remote sensing technology development, and scientific research. GRSS provides a global platform for professionals to collaborate, share knowledge, and promote the application of remote sensing for societal benefit.
            </p>
          </SpotlightCard>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container" style={{ display: 'grid', gap: 18 }}>
          <SpotlightCard>
            <h2 className="michroma">About Manipal University Jaipur</h2>
            <p>
              Manipal University Jaipur (MUJ) is a multidisciplinary university known for its strong emphasis on innovation, research, and experiential learning. The campus fosters a dynamic environment that encourages students to explore new ideas, engage in interdisciplinary collaboration, and develop skills for real-world challenges.
            </p>
          </SpotlightCard>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container" style={{ display: 'grid', gap: 14 }}>
          <SpotlightCard>
            <h2 className="michroma">Get Involved</h2>
            <p>Join our chapter, participate in events, and collaborate on real-world geospatial challenges.</p>
            <div style={{ marginTop: 16 }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSec_vKSF6-HKhhVpG9bZCsR3NB4ffYjFIRPgi3ZknOpylVblA/viewform?usp=header"
                className="michroma"
                style={{
                  display: 'inline-block',
                  padding: '12px 18px',
                  borderRadius: 10,
                  color: '#bfcbe0',
                  background: 'linear-gradient(135deg, rgba(60,80,120,0.35), rgba(30,40,60,0.35))',
                  border: '1px solid rgba(160,200,255,0.18)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25), 0 0 18px rgba(120,170,255,0.10) inset',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  position: 'relative',
                  transition: 'background 0.2s',
                  textDecoration: 'none'
                }}
                target="_blank"
                rel="noopener noreferrer"
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
