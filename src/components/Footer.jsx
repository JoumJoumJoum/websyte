import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{position:'relative', zIndex:2, marginTop:60}}>
      <div style={{position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, background:'radial-gradient(800px 200px at 50% -40%, rgba(80,120,255,0.25), rgba(4,8,21,0.9))'}} />
        <div className="stars" />
        <div className="container" style={{position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, padding:'28px 20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#8ec5ff,#4b6fff)'}} />
            <div>
              <div style={{fontWeight:700}}>IEEE GRSS MUJ</div>
              <small style={{color:'#9fb7e6'}}>© {new Date().getFullYear()} All rights reserved.</small>
            </div>
          </div>
          <div style={{display:'flex', gap:14}}>
            <SocialIcon href="https://www.linkedin.com/company/ieee-grss-muj/" label="LinkedIn"><FaLinkedin /></SocialIcon>
            <SocialIcon href="https://www.instagram.com/ieee.grss_muj/" label="Instagram"><FaInstagram /></SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, label, children }) => (
  <a href={href} aria-label={label} target="_blank" rel="noreferrer" style={{
    width:36, height:36, display:'grid', placeItems:'center', borderRadius:10,
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)'
  }}>
    <span style={{color:'#eaf2ff', fontSize:18}}>{children}</span>
  </a>
);

export default Footer;


