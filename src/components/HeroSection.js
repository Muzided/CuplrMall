import React, { useEffect, useState } from 'react'
import hero from '../assets/images/hero-cover.jpg'
import { NavLink } from 'react-router-dom'
import { useSwitchNetwork, useNetwork } from "wagmi";

import { getTokenBalance } from '../services/moralis/moralis'

import axios from 'axios'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaFacebookF } from 'react-icons/fa'
import { BiLogoInstagram, BiLogoTelegram } from 'react-icons/bi'
import { AiOutlineTwitter } from 'react-icons/ai'

const HeroSection = () => {
  const [price,setPrice] = useState();

  useEffect(() => {
  
  }, [])

 
  return (
    <div>
      <div className='flex md:flex-row flex-col space-y-8 px-4 py-8 md:space-y-0 justify-center items-center pt-28 text-white'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center space-y-8 text-center'>
          <h1 className='text-6xl font-semibold glowing-text '>Welcome to Cuplr Mall</h1>
          <p className='text-white/50 '>
            Load up your Cuplr Community Wallet Now</p>
         <NavLink to={'/select-token'}> <button className='font-bold text-lg px-10 py-2 text-black  rounded-lg btn'>Buy</button></NavLink>
          <div className='flex justify-center items-center gap-4 pt-6'>
                <a href='https://www.facebook.com/cuplr' target='_blank' className='hover:scale-95 transition-transform '> <FaFacebookF size={44} /></a>
                <a href='https://www.instagram.com/cuplrapp/' target='_blank'  className='hover:scale-95 transition-transform'> <BiLogoInstagram size={44} /></a>
                <a href='https://t.me/cuplrofficial' target='_blank'  className='hover:scale-95 transition-transform'><BiLogoTelegram size={44} /></a>
                <a href='https://twitter.com/cuplrapp' target='_blank'  className='hover:scale-95 transition-transform'><AiOutlineTwitter size={44} /></a>

            </div>
        </div>
       

        <div className='w-full md:w-1/2'  > <img src={hero} alt='hero' className='h-[400px] rounded-2xl  ' /></div>
      </div>

    </div>
  )
}

export default HeroSection
