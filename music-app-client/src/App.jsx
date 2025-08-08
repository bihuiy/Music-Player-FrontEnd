import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router'

import Homepage from './components/Homepage/homepage.jsx'
import Navbar from './components/Navbar/navbar.jsx'

function App() {
  return(
    <>
  <Navbar />
  <Routes>
    <Route index element={<Homepage/>} />
  </Routes>
  </>
  )
}

export default App
