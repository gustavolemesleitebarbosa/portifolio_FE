import React from 'react'
import { NavigationDots } from '../components'

const AppWrap = (Component, idName, classnames) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classnames}`}>
      <div className='app__wrapper app__flex'>
        <Component/>
        <div className='copyright'>
        <p className='p-text'> @2023 GUSTAVO</p>
        <p className='p-text'> All rights reserved</p>
        </div>
      </div>
      <NavigationDots active={idName}/>
    </div>
  )
}

export default AppWrap