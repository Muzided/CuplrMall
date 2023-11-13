import React, { useEffect, useState } from 'react'
//images
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useSwitchNetwork, useNetwork } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GiHamburgerMenu } from 'react-icons/gi'

const NavBar = () => {
    //states
    const [nav, setNav] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const { address,isConnected,  isDisconnected } = useAccount()
    useEffect(() => {
        if (isConnected) {
            console.log("NavBar check",address)
            checkAdmin()
        }
    }, [isConnected])
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setNav(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //handle mobile navigation
    const handleNav = () => {
        setNav(!nav)
    }


    const checkAdmin = async () => {
       
        const userAddress = address;
        const admin = "0x6DeCe8ae82AA17cB6C529CccEc960B4c6A8ED06F"
        if (String(userAddress).toLowerCase() === String(admin).toLowerCase()) {
            setIsAdmin(true)
            console.log("Admin Logged", String(userAddress).toLowerCase() === String(admin).toLowerCase())
        } else {
            setIsAdmin(false)
            console.log("Admin Logged", String(userAddress).toLowerCase() === String(admin).toLowerCase())
        }

    }
    return (
        <div className=' font-poppins'>
            <div className='max-auto container'>
                <div className='flex justify-between items-center py-4 text-white px-24'>
                    <div className='hidden md:flex justify-center items-center gap-2'>
                        {/* <div className='w-[70px] h-[70px]'><img src={logo} alt='logo' className='w-[100%] h-[100%] ' /></div> */}
                        <NavLink to={'/'}><div className=' cursor-pointer font-medium text-xl glowing-text'>Cuplr Mall</div></NavLink>
                    </div>

                    <ul className='hidden md:flex justify-center items-center gap-6 text-white/80  '>

                        <NavLink to={'/'}>  <li className='cursor-pointer hidden md:flex px-4  hover:border-b  hover:border-[#56ffa2cc] transition-transform '>Home</li></NavLink>
                        {isAdmin === true ? <NavLink to={'/funduser'}> <li className='cursor-pointer hidden md:flex px-4 hover:border-b  hover:border-[#56ffa2cc] transition-transform'>Admin</li></NavLink> : null}
                        <NavLink to={'/select-token'}><li className='cursor-pointer hidden md:flex px-4 hover:border-b  hover:border-[#56ffa2cc] transition-transform'>Buy</li></NavLink> 
                       
                        <ConnectButton />
                    </ul>
                    </div>
                    <div className='flex text-white justify-between items-center md:hidden py-4 px-4'>
                    <NavLink to={'/'}><div className=' cursor-pointer font-medium text-xl glowing-text'>Cuplr</div></NavLink>
                        <div onClick={() => { handleNav() }}><GiHamburgerMenu size={28} /></div>

                    </div>
                    {nav ? <div className=' flex w-full text-white z-10 bg-bg-color-Primary py-4 shadow-lg flex-col items-center justify-center space-y-4 px-4 absolute'>
                        <NavLink to={'/'}><div className=' px-2 py-1' >Home</div></NavLink>
                        {isAdmin === true?<NavLink to={'/funduser'}><div className=' px-2 py-1' >Admin</div></NavLink>:null}
                        <NavLink to={'/select-token'}><div className=' px-2 py-1' >Buy</div></NavLink>
                        
                        <ConnectButton/>
                    </div> : null}

                


            </div>

        </div>
    )
}

export default NavBar
