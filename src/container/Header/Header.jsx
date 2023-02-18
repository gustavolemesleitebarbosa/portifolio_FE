import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import about01 from '../../assets/cv_english.pdf';
import { images } from '../../constants';
import { AppWrap } from '../../wrapper';

import './Header.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const Header = () => {
  return (
    <div id="home" className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Gustavo</h1>
            </div>
          </div>

          <div className='header-cv'>
            <div className="tag-cmp app__flex">
              <p className="p-text">Web Developer</p>
              <p className="p-text">Mobile developer</p>
            </div>

          <div className="tag-cmp app__flex" style={{ display: 'flex', justifyContent:'flex-start', maxWidth:120, marginLeft:12}}>
            <p className="p-text-right">Download my CV</p>
             <a href={about01} download style={{height:32, width:32 ,display: 'flex', alignItems: 'center', justifyContent: 'center',borderRadius: '50%', background: '#e4e4e4', marginTop:3 }} color="#fffff">
                  <AiOutlineDownload size={22} style={{ color: '#6b7688' }} />
              </a>
            </div>
          </div>

        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="profile_bg" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.flutter, images.redux, images.sass].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="profile_bg" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home',)