
import React from 'react'
import {Route,Routes } from "react-router-dom"
import Routing from './Routing'
import HeroSection from './components/HeroSection'
import SelectToken from './components/SelectToken'
import BuyToken from './components/BuyToken'
import BuyTokenUsdt from './components/BuyTokenUsdt'
import FundUser from './components/FundUser'
import Admin from './components/Admin'

const App = () => {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Routing/>}>
        <Route index path='/' element={<HeroSection/>}/>
         <Route exact path='/select-token' element={<SelectToken/>}/>
         <Route exact path='/buy-token' element={<BuyToken/>}/>
         <Route exact path='/buytoken' element={<BuyTokenUsdt/>}/>
         <Route exact path='/funduser' element={<Admin/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default App

