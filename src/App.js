import React, { useState } from 'react'
import './App.scss'
import { Navbar } from './components'
import { About, Footer, Header, Skills, Testimonial, Work } from './container'

const App = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className='app'>
      <Navbar toggle={toggle}  setToggle={setToggle}/>
      <Header toggle/>
      <About toggle/>
      <Work toggle/>
      <Skills toggle/>
      <Testimonial toggle/>
      <Footer toggle/>
    </div>
  )
}

export default App