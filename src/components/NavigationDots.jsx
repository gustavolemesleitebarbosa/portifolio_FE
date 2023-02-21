import React from 'react'
import { useTheme } from '../hooks/useTheme'


const NavigationDots = ({ active }) => {
  const {theme} =  useTheme()
  return (
    <div className= {theme ==='light'?'app__navigation':'app__navigation  app__navigation_bg_dark'}>
      {['home', 'about', 'work', 'skills','testimonials', 'contact'].map(
        (item, index) => 
          <a 
          href={`#${item}`}
          key={item+index}
          className ='app__navigation-dot'
          style={active === item?{ backgroundColor:theme==='dark'?'#186559':'#313BAC'}:{}}
          />
      )}
    </div>
  )
}

export default NavigationDots