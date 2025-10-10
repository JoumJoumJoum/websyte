import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="section">
      <div className="container" style={{display:'grid', gap:24}}>
        <h2>Contact</h2>
        <motion.form initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}} className="glass" style={{borderRadius:20, padding:'28px 22px', display:'grid', gap:16, background:'rgba(10,20,50,0.35)'}} action="https://formspree.io/f/mvgbvzok" method="POST">
          <input type="hidden" name="_subject" value="New message from GRSS MUJ website" />
          <label>
            <div style={{marginBottom:6}}>Name</div>
            <input required name="name" placeholder="Your name" className="glass" style={{width:'100%', padding:'12px 14px', borderRadius:12, color:'#eaf2ff', background:'rgba(255,255,255,0.06)'}} />
          </label>
          <label>
            <div style={{marginBottom:6}}>Email</div>
            <input required type="email" name="email" placeholder="you@example.com" className="glass" style={{width:'100%', padding:'12px 14px', borderRadius:12, color:'#eaf2ff', background:'rgba(255,255,255,0.06)'}} />
          </label>
          <label>
            <div style={{marginBottom:6}}>Message</div>
            <textarea
              required
              name="message"
              rows="6"
              placeholder="How can we help?"
              className="glass"
              onKeyDown={(e) => { e.stopPropagation(); }}
              style={{width:'100%', padding:'12px 14px', borderRadius:12, resize:'vertical', color:'#eaf2ff', background:'rgba(255,255,255,0.06)', whiteSpace:'pre-wrap', overflowWrap:'anywhere'}}
            />
          </label>
          <button type="submit" className="glass" style={{padding:'12px 16px', borderRadius:12, width:'fit-content', background:'linear-gradient(135deg, rgba(80,120,255,0.35), rgba(0,200,255,0.35))', color:'#eaf2ff', boxShadow:'0 8px 24px rgba(0,0,0,0.35)'}}>Send</button>
          <small style={{color:'#9fb7e6'}}>Email: ieeegrssmuj@gmail.com</small>
        </motion.form>

        <div style={{display:'flex', gap:12}}>
          <Social href="https://www.linkedin.com/company/ieee-grss-muj/" label="LinkedIn"><FaLinkedin /></Social>
          <Social href="https://www.instagram.com/ieee.grss_muj/" label="Instagram"><FaInstagram /></Social>
        </div>
      </div>
    </section>
  );
};

const Social = ({ href, label, children }) => (
  <a href={href} aria-label={label} target="_blank" rel="noreferrer" style={{
    width:40, height:40, display:'grid', placeItems:'center', borderRadius:12,
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)'
  }}>
    <span style={{fontSize:20}}>{children}</span>
  </a>
);

export default Contact;


