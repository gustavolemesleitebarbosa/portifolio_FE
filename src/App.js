import React, { useState } from 'react'
import './App.scss'
import { Navbar } from './components'
import { About, Footer, Header, Skills, Testimonial, Work } from './container'
import { ThemeProvider } from './hooks/useTheme'

const App = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <ThemeProvider >
    <div className='app'>
      <Navbar toggle={toggle}  setToggle={setToggle}/>
      <Header toggle/>
      <About toggle/>
      <Work toggle/>
      <Skills toggle/>
      <Testimonial toggle/>
      <Footer toggle/>
    </div>
    </ThemeProvider>
  )
}

export default App