import React, { useEffect, useState } from 'react'
import { getSavedUsers, fundUser } from '../services/api/api'
//ether
import { ethers } from "ethers";
import { cuplrTokenAddress } from '../services/contractInfo/addresses'
import cuplrAbi from '../services/contractInfo/cuplrAbi.json'
import { useSwitchNetwork, useNetwork } from "wagmi";
import { useContractWrite, usePrepareContractWrite,useAccount  } from 'wagmi'
import{cuplrContractConfig,transferCuplr} from '../services/contractInfo/addresses'
import { parseEther } from 'viem';
import { toast } from 'react-toastify';
const Admin = () => {

  const [userAddress, setUserAddress] = useState();
  const [usersToFund, setUsersToFund] = useState([])
  const [tokens, setTokens] = useState([])
  const [removeToken,SetRemoveToken]=useState();
  //wagmi
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    getSavedUsers().then((res) => { console.log("res from get user", res); setUsersToFund(res) })
  }, [])



  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: wagmigotchiABI,
  //   functionName: 'transfer',
  // })

  // const { config } = usePrepareContractWrite({
  //   ...transferCuplr,
  //   args: [userAddress,tokens],
  // });

  // const { write } = useContractWrite(config);
  const { write } = useContractWrite({
    address: cuplrTokenAddress,
    abi: cuplrAbi,
    functionName: 'transfer',
    args: [userAddress,tokens],
    onSuccess(data) {
      console.log('Success', data)
      fundUser({ userAddress, removeToken })
    },
    onSettled(data, error) {
      console.log('Settled', { data, error })
      toast.error(error?.message.toString())
    },
  })

  // const FundTokens = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  //     const signer = provider.getSigner();
     
  //     const cuplrContract = new ethers.Contract(cuplrTokenAddress, cuplrAbi, signer)
  //     const amount = ethers.utils.parseUnits(tokens.toString(), 9)
  //     console.log("amount", amount.toString())
  //     cuplrContract.transfer(
  //       userAddress,
  //       amount.toString()).then(async (res) => {
  //         res.wait().then((res) => {
  //           fundUser({ userAddress, tokens })

  //         })

  //       })




  //   } catch (error) {
  //     console.log("err", error)
  //   }


  // }
  const setTokensValue=(value)=>{
    const val =value
    SetRemoveToken(val);
    const amount = ethers.utils.parseUnits(val.toString(), 9);
    console.log("baddua",amount.toString())
    setTokens(amount.toString())

  }
  return (
    <div className='px-4 md:px-12 '>
      <div className='flex flex-col space-y-12 justify-center items-center'>
        {/* fund-tokens */}
        <div className='flex space-y-2 md:w-4/12 flex-col items-center pt-8'>
          <h1 className='text-3xl py-4 text-white '>Fund Users</h1>
          <input onChange={(e) => { setUserAddress(e.target.value.trim()) }} placeholder='Enter user Address' className='py-1 px-2 w-full bg-white text-black text-xl text-center rounded-md' />
          <input onChange={(e) => { setTokensValue(e.target.value.trim()) }} placeholder='Enter Tokens ' className='py-1 px-2 bg-white text-black text-xl w-full text-center rounded-md' />
          <button className='text-white font-medium text-lg w-full bg-white/20 px-6 py-1 rounded-md' onClick={() => {write() }}>Fund</button>

        </div>
        {/* users-to-be-funded */}
        <div className='flex flex-col space-y-6'>
          <h1 className='text-center text-3xl text-green-400'> Requests</h1>
          <div className=' grid grid-cols-8  px-4 py-2 rounded-md w-full'>
            <h1 className='text-xl col-span-4 text-white font-medium'>Address</h1>
            <p className='text-xl col-span-2 text-white font-medium'>Tokens</p>
            <p className='text-xl col-span-2 text-white font-medium'>Payment received</p>


          </div>
          {usersToFund?.map((value, index) => {
            return (
              <div key={index} className=' grid grid-cols-8   bg-white/10 px-4 py-2 rounded-md w-full items-center gap-8 '>
                <h1 className=' text-white hidden md:flex  col-span-4 text-xl font-medium'>{value?.userAddress}</h1>
                <h1 className=' text-white flex md:hidden  col-span-4 text-xl font-medium'>{value?.userAddress.slice(0,8)}...{value?.userAddress.slice(-5,-1)}</h1>
                <p className='text-xl col-span-2 text-white font-medium'>{value?.tokens}</p>
                <p className='text-xl col-span-2 text-white font-medium'>{value?.amountReceived}</p>


              </div>
            )

          })
          }


        </div>

      </div>

    </div>
  )
}

export default Admin
