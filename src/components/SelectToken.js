import React, { useState, useEffect } from 'react'
//tron wallet
import TronWeb from 'tronweb'
//images
import usdtlogo from '../assets/images/usdtlogo.png'
import ethlogo from '../assets/images/ethlogo.png'
import bnblogo from '../assets/images/bnblogo.png'
//navgation-link
import { NavLink } from 'react-router-dom'
//axips
import axios from 'axios';
//crypto-compare
import { getBalance } from '../services/Prices/CryptoCompare'
//moralis
import { getTokenBalance } from '../services/moralis/moralis'
//ether
import { ethers } from "ethers";
//wagmi
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSwitchNetwork, useNetwork } from "wagmi";
import { useAccount } from 'wagmi'
//context
import { useComponentContext } from '../context/componentContext'
import FundEthModal from '../Modals/InstructionModal'
import { toast } from 'react-toastify'






const SelectToken = () => {
  //states
  const [selectToken, setSelectToken] = useState(undefined)
  const [price, setPrice] = useState()
  const [usdPrices, setUsdPrices] = useState([])
  const [chaindata, setChainData] = useState([])
  const [bnbPrice, setBnbPrice] = useState([]);
  const [priceinEth, setPriceInEth] = useState();
  //-------------wagmi-Hooks----------------------//
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
   const { address,isConnected,  isDisconnected } = useAccount();
  //----------context-----------------------//
  const { tokenPriceInUsd, tokenPerUsd, tokenPerEth, tokenPerBnb, instructionsModal, SetInstuctionModal } = useComponentContext()

  // console.log("componentContext", tokenPriceInUsd, tokenPerUsd, tokenPerEth, tokenPerBnb)
  // const tronWeb = new TronWeb({
  //   fullHost: 'https://api.trongrid.io',
  // });
  const connectToTronLink = async () => {
    if (window.tronWeb) {
      try {
        await window.tronWeb.setFullNode('https://api.trongrid.io'); // Set the Tron full node URL.
        await window.tronWeb.setDefaultBlock('latest'); // Set the default block.
        await window.tronWeb.setAddress(0); // Connect to TronLink.
        // console.log('Connected to TronLink:', window.tronWeb.defaultAddress.base58);
        // You're now connected to TronLink. Perform actions here.
      } catch (error) {
        console.error('Error connecting to TronLink:', error);
        // Handle connection errors.
      }
    } else {
      console.error('TronLink is not available.');
      // Provide instructions to the user to install TronLink.
    }
  };
  const setToken = (val) => {
    setSelectToken(val)

  }
  const switchtoEhereum = async () => {
    switchNetwork?.(1);
    localStorage.setItem("Network", "Ethereum");
  };
  const switchtoBNB = async () => {
    switchNetwork?.(56)
    localStorage.setItem("Network", "Bnb");
  };

  async function connectTron() {
    console.log('h1')
    let tronWeb;
    if (window.tronLink && window.tronLink.ready) {
      tronWeb = window.tronLink.tronWeb;
    } else {
      console.log('h123')
      try {
        const res = await window?.tronLink?.request({ method: 'tron_requestAccounts' });
        if (res?.code === 200) {
          console.log('h145')
          tronWeb = window.tronLink.tronWeb;
        } else {
          console.log('h134')

          SetInstuctionModal(true)
        }
      } catch (error) {
        console.log("error", error)
      }
    }
    return tronWeb;
  }


 

  useEffect(() => {
    if (selectToken === 'bnb') {
      switchtoBNB()
    } else if (selectToken === 'eth') {
      switchtoEhereum()
    } else if (selectToken === 'usdt') {


      connectTron()


    } else {
      // TronLink is not available; provide instructions for users to install it.

    }


  }, [selectToken])


  return (
    <div className='font-poppins'>
      <div className=' flex md:flex-row flex-col sapce-y-6 md:gap-8 justify-start  md:pl-28 text-white   pt-24 '>
        <div className='flex w-full md:w-6/12 flex-col justify-center  space-y-4 rounded-lg shadow-xl  p-6 bg-[#26262C]'>
          <h1 className='text-2xl font-medium glowing-Pricetext text-center md:text-left '>CURRENT PRICES</h1>
          <div className='w-full flex md:flex-row flex-col justify-between   items-center'><h1 className='text-2xl glowing-Pricetext  '>Token Price</h1><p className='glowing-Pricetext text-2xl'>{tokenPriceInUsd}$</p></div>
          <div className='w-full flex md:flex-row flex-col justify-between   items-center'><h1 className='text-2xl glowing-Pricetext  '>Tokens per BNB </h1><p className='glowing-Pricetext text-2xl'>{tokenPerBnb} CPLR</p></div>
          <div className='w-full flex md:flex-row flex-col justify-between   items-center'><h1 className='text-2xl glowing-Pricetext  '> Tokens per USDT </h1><p className='glowing-Pricetext text-2xl'>{tokenPerUsd} CPLR</p></div>
          <div className='w-full flex md:flex-row flex-col justify-between   items-center'><h1 className='text-2xl glowing-Pricetext  '>Tokens per ETH </h1><p className='glowing-Pricetext text-2xl'>{tokenPerEth} CPLR</p></div>

        </div>
        <div className='w-full md:w-6/12 flex flex-col items-center space-y-12 mt-12 md:mt-0'>
          <h1 className='text-4xl font-medium text-center glowing-Pricetext'>Select to buy cuplr</h1>
          <div className='flex flex-col md:flex-row gap-12 '>
            <div className={`text-center bg-[#26262C] p-4 rounded-md shadow-lg ${selectToken === 'usdt' ? 'border border-green-400/40 shadow-box' : ''}`} onClick={() => { setToken('usdt') }}>
              <div className='w-[100px]'><img src={usdtlogo} alt='usdtlogo' className='w-[100%] h-[100%]' /></div>
              <div className='mt-2 text-lg'>USDT</div>

            </div>
            <div className={`text-center bg-[#26262C] p-4 rounded-md shadow-lg ${selectToken === 'eth' ? 'border border-green-400/40 shadow-box' : ''}`} onClick={() => { setToken('eth') }} >
              <div className='w-[100px]'><img src={ethlogo} alt='ethlogo' className='w-[100%] h-[100%]' /></div>
              <div className='mt-2 text-lg'>ETH</div>

            </div>
            <div className={`text-center bg-[#26262C] md:mb-0 mb-4 p-4 rounded-md shadow-lg ${selectToken === 'bnb' ? 'border border-green-400/40 shadow-box' : ''}`} onClick={() => { setToken('bnb') }}>
              <div className='w-[100px]'><img src={bnblogo} alt='bnblogo' className='w-[100%] h-[100%]' /></div>
              <div className='mt-2 text-lg'>BNB</div>

            </div>
          </div>
          {selectToken === "usdt" ? <NavLink to={selectToken !== 'usdt' ? '/buy-token' : '/buytoken'}><button className='hover:scale-110 transition-transform md:mb-0 mb-12  text-lg'>Continue</button></NavLink> : isConnected?<NavLink to={selectToken !== 'usdt' ? '/buy-token' : '/buytoken'}><button className='hover:scale-110 transition-transform md:mb-0 mb-12  text-lg'>Continue</button></NavLink>:<ConnectButton/>}


        </div>


      </div>
      <FundEthModal />
    </div >
  )
}

export default SelectToken
