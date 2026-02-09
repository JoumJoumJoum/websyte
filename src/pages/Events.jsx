import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { eventsData } from '../data/eventsData';



const Events = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <h2>Events</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {eventsData.map((ev, idx) => (
            <motion.div key={ev.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * idx, duration: 0.45 }} className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingTop: '58%' }}>
                <img alt={ev.title} src={ev.img} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
                  <h3 style={{ margin: 0 }}>{ev.title}</h3>
                </div>
                <p style={{ marginTop: 6 }}>{ev.desc.length > 100 ? ev.desc.slice(0, 100) + '...' : ev.desc}</p>
                <button onClick={() => setSelected(ev)} className="glass" style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', color: '#eaf2ff', background: 'rgba(80,120,255,0.25)' }}>Read More</button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 10, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.5)' }} onClick={() => setSelected(null)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass" style={{ width: 'min(720px, 92%)', borderRadius: 16, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ position: 'relative', paddingTop: '45%' }}>
                  <img alt={selected.title} src={selected.img} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <h3 style={{ marginTop: 0 }}>{selected.title}</h3>
                  <p style={{ marginTop: 10 }}>{selected.desc} </p>
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


