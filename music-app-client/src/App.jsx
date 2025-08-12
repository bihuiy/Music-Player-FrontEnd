import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router'

import Homepage from './components/views/Homepage/homepage.jsx'
import Navbar from './components/Navbar/navbar.jsx'
import SignUpPage from './components/views/user/sign-up/sign-up-page.jsx'
import SignInPage from './components/views/user/sign-in/sign-in.jsx'


function App() {
  return(
    <>
  <Navbar />
  <Routes>
    <Route index element={<Homepage/>} />
    <Route path="/user/sign-up" element={<SignUpPage/>}/>
    <Route path="/user/sign-in" element={<SignInPage/>}/>
  </Routes>
  </>
  )
}

export default App
