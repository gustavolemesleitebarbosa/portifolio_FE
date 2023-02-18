import React from 'react'
import { BsInstagram, BsTwitter } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social_wrapper'>
      <div className='app__social'>
        <div>
          <BsTwitter />
        </div>
        <div>
          <FaFacebookF />
        </div>
        <div>
          <BsInstagram />
        </div>
      </div>
    </div>
  )
}

export default SocialMedia