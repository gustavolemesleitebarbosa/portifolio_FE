import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { images } from '../../constants'
import SocialMedia from '../SocialMedia'
import Toggle from '../Toogle'

import './Navbar.scss'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className='app__navbar' >
      <div className='app__navbar-logo'>
        <img src={images.logo} alt="logo" />
      </div>
      <ul className='app__navbar-links'>
        {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map(
          (item) => <li className='app__flex p-text' key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        )}
      </ul>
      <div className='toggle-nonMobile'>
        <Toggle text='Light' textChecked="Dark" />
      </div>
      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileInView={{ x: [190, 0] }}
              transition={{ type: "easeOut", duration: 0.85 }}
            >
              <ul>
                <li style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingRight:'10%' }}>
                  <Toggle style={{ marginRight: 'auto' }} text='Light' textChecked="Dark" />
                  <HiX onClick={() => setToggle(false)} />
                </li>
                {['home', 'about', 'work', 'skills', 'contact'].map(
                  (item) => <li key={item}>
                    <a onClick={() => setToggle(false)} href={`#${item}`}>{item}</a>
                  </li>
                )}
              </ul>
            </motion.div>
          )
          }
        </AnimatePresence>
      </div>
      {!toggle && <SocialMedia />}
    </nav>
  )
}

export default Navbar