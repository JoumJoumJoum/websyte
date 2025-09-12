import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const allEvents = [
  { id:1, type:'upcoming', title:'Intro to Remote Sensing', date:'Oct 10, 2025', img:'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop', desc:'Kickoff seminar covering fundamentals of Earth observation, satellites, and sensors.' },
  { id:2, type:'upcoming', title:'Satellite Imagery Workshop', date:'Nov 02, 2025', img:'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop', desc:'Hands-on workshop on processing and analyzing satellite images.' },
  { id:3, type:'past', title:'GRSS Hackathon', date:'Apr 13, 2025', img:'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=1200&auto=format&fit=crop', desc:'24-hour hackathon on geospatial data visualization and ML for EO.' },
];

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const [selected, setSelected] = useState(null);
  const events = allEvents.filter(e => filter === 'all' ? true : e.type === filter);

  return (
    <section className="section">
      <div className="container" style={{display:'grid', gap:20}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
          <h2>Events</h2>
          <div style={{display:'flex', gap:8}}>
            {['upcoming','past','all'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className="glass" style={{
                padding:'8px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', color:'#eaf2ff', background: filter===f ? 'rgba(80,120,255,0.25)' : 'rgba(10,20,50,0.25)'
              }}>{f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16}}>
          {events.map((ev, idx) => (
            <motion.div key={ev.id} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.05*idx, duration:0.45}} className="glass" style={{borderRadius:16, overflow:'hidden'}}>
              <div style={{position:'relative', paddingTop:'58%'}}>
                <img alt={ev.title} src={ev.img} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <div style={{padding:'14px 16px'}}>
                <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:6}}>
                  <h3 style={{margin:0}}>{ev.title}</h3>
                  <small style={{color:'#9fb7e6'}}>{ev.date}</small>
                </div>
                <p style={{marginTop:6}}>{ev.desc}</p>
                <button onClick={() => setSelected(ev)} className="glass" style={{padding:'8px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', color:'#eaf2ff', background:'rgba(80,120,255,0.25)'}}>Read More</button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{position:'fixed', inset:0, zIndex:10, display:'grid', placeItems:'center', background:'rgba(0,0,0,0.5)'}} onClick={() => setSelected(null)}>
              <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="glass" style={{width:'min(720px, 92%)', borderRadius:16, overflow:'hidden'}} onClick={(e)=>e.stopPropagation()}>
                <div style={{position:'relative', paddingTop:'45%'}}>
                  <img alt={selected.title} src={selected.img} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}} />
                </div>
                <div style={{padding:'16px 18px'}}>
                  <h3 style={{marginTop:0}}>{selected.title}</h3>
                  <small style={{color:'#9fb7e6'}}>{selected.date}</small>
                  <p style={{marginTop:10}}>{selected.desc} More details coming soon.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Events;


