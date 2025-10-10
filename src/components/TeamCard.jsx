import React from 'react';
import SpotlightCard from './SpotlightCard';
import './TeamCard.css';

export default function TeamCard({ name, img, role = 'Position Title', description = '1–2 lines describing this member, their focus, or contribution.', objectPosition = 'center 50%' }) {
  return (
    <SpotlightCard className="team-card">
      <div className="team-card__image-wrap">
        <img className="team-card__image" src={img} alt={name} loading="lazy" style={{ objectPosition }} />
      </div>
      <div className="team-card__info">
        <h3 className="michroma team-card__name">{name}</h3>
        <div className="team-card__role">{role}</div>
        <p className="team-card__desc">{description}</p>
      </div>
    </SpotlightCard>
  );
}


