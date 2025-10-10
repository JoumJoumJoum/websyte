import React from 'react';

import SpotlightCard from './SpotlightCard';
import './ImageGallery.css';

const IMAGES = [
  { src: '/images/image.png', alt: 'Gallery image 1' },
  { src: '/images/image2.png', alt: 'Gallery image 2' },
  { src: '/images/image3.png', alt: 'Gallery image 3' },
  { src: '/images/image4.png', alt: 'Gallery image 4' },
  { src: '/images/image5.png', alt: 'Gallery image 5' },
  { src: '/images/image6.png', alt: 'Gallery image 6' },
];

export default function ImageGallery({ images = IMAGES }) {
  return (
    <div className="image-gallery-root">
      <div className="image-grid">
        {images.map((img, idx) => (
          <SpotlightCard key={idx} className="image-card">
            <img className="image" src={img.src} alt={img.alt || `Image ${idx+1}`} />
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}


