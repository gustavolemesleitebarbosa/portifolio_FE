import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const SocialMedia = () => {
  return (
    <div className='app__social_wrapper'>
      <div className='app__social'>
        <div onClick={()=>window.open('https://github.com/gustavolemesleitebarbosa', '_blank', 'noreferrer')}>
          <BsGithub size={80}/>
        </div>
        <div onClick={ ()=>window.open('https://www.linkedin.com/in/gustavo-lemes-207822132', '_blank', 'noreferrer')}>
          <BsLinkedin />
        </div>
      </div>
    </div>
  )
}

export default SocialMedia