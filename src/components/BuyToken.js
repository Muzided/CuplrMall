import React, { useEffect, useState } from 'react'
//wagmi
import { useSwitchNetwork, useNetwork } from "wagmi"
import { useSendTransaction, usePrepareSendTransaction,useAccount } from 'wagmi'
//images
import stripes from '../assets/images/stripes.png'
import usdtlogo from '../assets/images/usdtlogo.png'
import ethlogo from '../assets/images/ethlogo.png'
import bnblogo from '../assets/images/bnblogo.png'
//ether
import { ethers } from 'ethers'
//api
import { saveUser } from '../services/api/api'
//context
import { useComponentContext } from '../context/componentContext';
import { toast } from 'react-toastify';
import { parseEther } from 'viem'
import { ConnectButton } from '@rainbow-me/rainbowkit'
const BuyToken = () => {
    //states
    const [exchange, setExchange] = useState()
    const [amountToSend, setAmountToSend] = useState('0.01');
    //wagmi
    const { chain } = useNetwork();
    const { address, isConnecting, isDisconnected } = useAccount()
    // console.log("address",address)

    // console.log("changings", (chain?.id).toString() === "1")

    //----------context-----------------------//
    const { tokenPriceInUsd, tokenPerUsd, tokenPerEth, tokenPerBnb } = useComponentContext()

    const [amount, setAmount] = useState();
    const changeAmount = (e) => {
        // console.log("chain id ", chain?.id)

        // console.log('yolo');
        // console.log("yolo2",tokenPerEth)
        // console.log("yolo3",e)
        // const ethPerToken = e/tokenPerEth
        // console.log("object",ethPerToken)
        // const wei = ethers.utils.parseEther(ethPerToken.toString())
        setAmount(e)





    }
    let wei;
    useEffect(() => {
        if (amount && address) {
            if (chain?.id.toString() === "56") {
                console.log("we in bnb baby")
                console.log("token", tokenPerBnb)
                const huhu = 1 / tokenPerBnb
                // 1.62963083e-8
                console.log("without getiing fixed", huhu)
                console.log("kamaon", huhu.toFixed(18))
                const val = huhu.toFixed(18)
                const actual = amount * val;
                const damn = actual.toFixed(18);
                console.log("object", actual.toFixed(18))
                setExchange(damn.toString())
                wei = ethers.utils.parseEther(damn.toString())
                setAmountToSend(wei);

                console.log("wulalala", wei.toString())
            } else {
                console.log("we in eth baby ")
                console.log("token", tokenPerEth)
                const huhu = 1 / tokenPerEth
                // 1.62963083e-8
                console.log("without getiing fixed", huhu)
                console.log("kamaon", huhu.toFixed(18))
                const val = huhu.toFixed(18)
                const actual = amount * val;
                const damn = actual.toFixed(18);
                console.log("object", actual.toFixed(18))
                setExchange(damn.toString())
                wei = ethers.utils.parseEther(damn.toString())
                setAmountToSend(wei);

                console.log("wulalala", wei.toString())

            }
        }

    }, [amount,address])
    // const { config } = usePrepareSendTransaction({
    //     to: '0x6DeCe8ae82AA17cB6C529CccEc960B4c6A8ED06F',
    //     value: amountToSend,
    //     onSettled(data, error) {
    //         console.log('Settled', { data, error })
    //       },
    //   })
    //   const { data,error, isLoading, isSuccess, sendTransaction } =
    //     useSendTransaction(
    //         config,

    //     )
    const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
        to: '0x6DeCe8ae82AA17cB6C529CccEc960B4c6A8ED06F',
        value: amountToSend,
        data:'0x',
        onError(error) {
            console.log('Error', error?.message)
            toast.error(error?.message.toString())
        },
        onSuccess(data) {
            const tokens = amount;
            const received = "true"
            const userAddress=address;
            saveUser({ userAddress, tokens, received })
            console.log('Success', data)
        },
    })


    // const { config } = usePrepareSendTransaction({
    //     request: {
    //         to: "'0x6DeCe8ae82AA17cB6C529CccEc960B4c6A8ED06F'",
    //         value: amountToSend.toString(),
    //     },
    // });

    // const { sendTransaction } = useSendTransaction(config);

    //     const sendTransaction = async () => {
    //         const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // const signer = provider.getSigner();
    // const amountToSend = ethers.utils.parseEther(exchange)
    //         // const wei = ethers.utils.parseEther(e.toString())
    //         const userAddress = (await signer.getAddress()).toString()
    //         console.log("address", userAddress)



    //         signer.sendTransaction({
    //             to: "0x6DeCe8ae82AA17cB6C529CccEc960B4c6A8ED06F",
    //             value: amountToSend.toString()
    //         }).then(async (tx) => {
    //             console.log("tx1", tx);
    //             tx.wait().then(async (res) => {
    //                 console.log('tx2', res);
    //                 const tokens = amount;
    //                 const received = "true"
    //                 saveUser({ userAddress, tokens, received })
    //                 toast.success("Transaction Successfull")
    //             }).catch((err) => {
    //                 console.log("erwwwr", err
    //                 )
    //                 toast.error(err)
    //             })
    //         }).catch((err) => {
    //             console.log("err", err
    //             )
    //             toast.error("Not Enough Balance")
    //         })
    //     }
    const handleBuyClick = async () => {
        if (sendTransaction) {
          try {
            await sendTransaction();
          } catch (error) {
            console.error('Error sending transaction:', error);
          }
        }
      };
    console.log("amount", amount)
    console.log("exchange", exchange);

    return (
        <div className='flex justify-center items-center '>
           {address?  <div className='flex flex-col md:w-4/12 space-y-8 justify-center items-center px-6 py-12 bg-black/10 backdrop-blur-3xl text-white text-xl mt-24 shadow-xl shadow-box2  rounded-lg bg-stripes bg-cover bg-no-repeat bg-fit   '>
                <div className='flex flex-col w-full gap-8 '>
                    <div className='flex flex-col'>
                        {/* <h1 className='glowing-Pricetext'>Selected Token</h1>
                        {
                            chain?.id === 11155111 ? (
                                <div >
                                    <div className='w-[50px]'>
                                        <img src={ethlogo} alt='ethlogo' />
                                    </div>

                                </div>
                            ) : (
                                <div >
                                    <div className='w-[50px]'>
                                        <img src={bnblogo} alt='ethlogo' />
                                    </div>

                                </div>
                            )
                        } */}

                    </div>
                    <div className='flex flex-col space-y-2 w-full  '>
                        <h1 className='glowing-Pricetext'>Enter no of tokens</h1>
                        <input type='number' onChange={(e) => { changeAmount(e.target.value) }} className='px-2 py-2 text-white text-base  rounded-md bg-white/20' />

                    </div>
                    <div className='flex flex-col  space-y-2'>
                        <h1 className='glowing-Pricetext'>Amount in {(chain?.id).toString() === "1" ? "ETH" : "BNB"} </h1>
                        <input value={exchange} readOnly={true} className='px-2 py-2 text-white text-base rounded-md bg-white/20' />

                    </div>
                    {/* <div className='flex flex-col space-y-2'>
                        <h1 className='glowing-Pricetext'>Get Amount(Cuplr)</h1>
                        <input className='px-2 py-2 text-white text-base rounded-md bg-white/20' />

                    </div> */}

                </div>
                <button className='bg-[#56ffa2cc]/60 font-medium hover:scale-95 transition-transform  px-8 py-1 rounded-md' onClick={() => handleBuyClick()}>BUY</button>

            </div>:<div className='flex flex-col  items-center text-white text-lg space-y-4 pt-24'>
            <ConnectButton/>
            <div>Connect Wallet to continue</div></div>}

        </div>
    )
}

export default BuyToken
