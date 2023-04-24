import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { client, urlFor } from '../../client';
import PlaceholderImage from '../../components/PlaceholderImage/PlaceholderImage';
import { useTheme } from '../../hooks/useTheme';
import { AppWrap, MotionWrapper } from '../../wrapper';

import './Testimonial.scss';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  const { theme } = useTheme()

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      const jeff = data.filter((testimonial) => testimonial.name === "Jefferson Delfes")
      const withoutJeff =data.filter((testimonial) => testimonial.name !== "Jefferson Delfes")
      setTestimonials([...jeff, ...withoutJeff ]);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      {testimonials.length && (
        <>
          <div key={testimonials[currentIndex]?.imgurl} className="app__testimonial-item app__flex">
            <div  className="app__testimonial_img_wrapper">
            {urlFor(testimonials[currentIndex]?.imgurl) &&
              <PlaceholderImage key={testimonials[currentIndex].feedback} src={urlFor(testimonials[currentIndex].imgurl).url()} alt={testimonials[currentIndex]?.name} />
            }
            </div>
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div> 
          </div>
          <div className="app__testimonial-btns app__flex">
            <div className="app__flex arrow" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>
            <div className="app__flex arrow" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
      <div className="app__testimonial-brands app__flex">
        {brands.filter((brand) => theme === 'light' && brand.name !== 'PF_dark' || theme === 'dark' && brand.name !== 'PF_light').map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrapper(Testimonial, 'app__testimonial'),
  'testimonials',
  'app__primarybg',
);