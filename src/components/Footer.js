import React from 'react'
import {FaFacebookF} from 'react-icons/fa'
import {BiLogoInstagram, BiLogoTelegram} from 'react-icons/bi'
import {AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div>
        <div className='flex justify-center items-center'>
            <a> <FaFacebookF/></a>
            <a> <BiLogoInstagram/></a>
            <a><BiLogoTelegram/></a>
            <a><AiOutlineTwitter/></a>

        </div>
      
    </div>
  )
}

export default Footer
