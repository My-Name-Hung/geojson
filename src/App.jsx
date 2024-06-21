import React from 'react'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Slides from './components/Slides/Slides'
import Maps from './components/Map/Maps'
import Footers from './components/Footer/Footers'


function App() {
  return (
    <div>
      <NavBar />
      <Home />
      <Slides />
      <Maps />
      <Footers />
    </div>
  )
}

export default App