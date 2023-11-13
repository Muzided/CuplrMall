import React, { useEffect, useState } from 'react'
//wagmi
import { useSwitchNetwork, useNetwork } from "wagmi";

//images
import stripes from '../assets/images/stripes.png'
import usdtlogo from '../assets/images/usdtlogo.png'
import ethlogo from '../assets/images/ethlogo.png'
import bnblogo from '../assets/images/bnblogo.png'
//api
import { saveUser } from '../services/api/api'
//context
import { useComponentContext } from '../context/componentContext';
import usdtAbi from '../services/contractInfo/usdtAbi.json'
import { toast } from 'react-toastify';


const BuyTokenUsdt = () => {
    const [exchange, setExchange] = useState()
    const [amount, setAmount] = useState(0)
    const [amountInUsdt, setAmountInUsdt] = useState()
    const [acountAddress, setAccountAddress] = useState()
   

    //----------context-----------------------//
    const { tokenPriceInUsd, } = useComponentContext()
    // console.log("pricuss", tokenPriceInUsd)

    useEffect(() => {
        if (amount > 0) {
            const amt = amount * tokenPriceInUsd;
            setAmountInUsdt(amt);
        }

    }, [amount])
    // useEffect(()=>{
    //     const 
    // },[amount])
    async function connectTron() {
    let tronWeb;
  
    if (window.tronWeb && window.tronWeb.ready) {
      // TronLink is already connected and ready
      tronWeb = window.tronWeb;
    } else {
      // TronLink is not connected or ready
      if (window.tronLink) {
        try {
          // Clear any previously selected address
          window.tronWeb.defaultAddress = "";
  
          // Try to request account access
          const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
  
          if (res && res.length > 0) {
            // Successfully got accounts, TronLink is unlocked
            tronWeb = window.tronWeb;
          } else {
            // TronLink is installed but locked or not logged in
            // You can prompt the user to unlock or log in
       
          }
        } catch (error) {
          // Handle any potential errors when requesting account access
          console.error("Error when requesting account access:", error);
        }
      } else {
        // TronLink extension is not installed
        console.error("TronLink extension is not installed");
      }
    }
  
    return tronWeb;
  }


    const sendUSDT = async () => {
        // console.log("tokenPrice", tokenPriceInUsd)
        connectTron()


        if (window.tronLink.ready) {


            try {
                const userAddress = acountAddress;
                const tronweb = window.tronLink.tronWeb;
                const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Replace with the actual USDT contract address.
 const toAddress = "TUzCWHMqmNBzeaDiGnHtbgo2VxBhBYURT4";

                // Create an instance of the USDT contract
                const usdtContract = await tronweb.contract(usdtAbi, usdtContractAddress);

                // Convert the amount to the smallest unit (Sun)
                const usdtAmountInSun = amountInUsdt * 1000000;
                // console.log("usdtAmountInSun", usdtAmountInSun)

                // Call the transfer function to send USDT
                const result = await usdtContract.transfer(toAddress, usdtAmountInSun.toFixed(0)).send({
                    shouldPollResponse: true,
                });
                const tokens = amount;
                const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

                const received = "true";
                if (ethereumAddressRegex.test(userAddress)) {
                    // console.log("Valid Ethereum address");
                    saveUser({ userAddress, tokens, received })
                    toast.success("Transaction Successfull")
                } else {
                    console.log("Invalid Ethereum address");
                }


                // console.log('USDT Transaction sent:', result);
                // Handle the transaction result here.
            } catch (error) {
                console.error('Error sending USDT transaction:', error);
                // Handle the error here.
            }

        }
    }


    return (
        <div className='flex justify-center items-center '>
            <div className='flex flex-col space-y-8  justify-center items-center px-6 py-12 bg-black/10 backdrop-blur-3xl text-white text-xl mt-24 shadow-xl shadow-box2  rounded-lg bg-stripes bg-cover bg-no-repeat bg-fit  '>
                <div className='grid grid-cols-3 gap-8'>
                    <div className='flex flex-col space-y-2 col-span-2  '>
                        <h1 className='glowing-Pricetext'>Enter no of tokens</h1>
                        <input type='number' onChange={(e) => { setAmount(e.target.value) }} className='px-2 py-2 text-white text-base rounded-md bg-white/20' />

                    </div>
                    <div className='flex flex-col col-span-1 space-y-2'>
                        <h1 className='glowing-Pricetext'>Amount in </h1>
                        <input value={amountInUsdt} readOnly={true} className='px-2 py-2 text-white text-base rounded-md bg-white/20' />

                    </div>
                    <div className='flex flex-col col-span-3 space-y-2'>
                        <h1 className='glowing-Pricetext'>Enter Account Address to receive Token</h1>
                        <input onChange={(e) => { setAccountAddress(e.target.value) }} className='px-2 py-2 text-white text-base rounded-md bg-white/20' />

                    </div>

                </div>
                <button className='bg-[#56ffa2cc]/60 font-medium hover:scale-95 transition-transform  px-8 py-1 rounded-md' onClick={() => { sendUSDT() }}>BUY</button>

            </div>

        </div>
    )
}

export default BuyTokenUsdt
