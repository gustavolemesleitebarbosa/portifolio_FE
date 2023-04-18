import React, { useEffect, useState } from 'react';
import './Shimmer.scss';

const Shimmer = () => {
  return (
      <img className="shimmer"></img>
  );
};

const PlaceholderImage = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [shimmer, setShimmer] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      setShimmer(false);
    };
  }, [src]);

  return (
    <>
      {(!imageLoaded || shimmer) &&  <Shimmer />}
      <img
        src={imageSrc}
        alt={alt}
        style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
      />
    </>
  );
};

export default PlaceholderImage;