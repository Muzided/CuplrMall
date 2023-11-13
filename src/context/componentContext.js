import { createContext, useState, useContext, useEffect } from "react";
// moralis functions
import { getTokenBalance } from '../services/moralis/moralis'
//crypro-compare
import{getTokenPriceInEth} from '../services/Prices/CryptoCompare'
//backend-api
import {saveCuplrTokenPrice,getCuplrInDollar} from '../services/api/api'
export const ComponentContext = createContext(undefined);

export const ComponentApi = ({ children }) => {
    const [tokenPriceInUsd, setTokenPriceInUsd] = useState();
    const [tokenPerUsd, setTokenPerUsd] = useState();
    const [tokenPerEth, setTokenPerEth] = useState();
    const [tokenPerBnb,setTokenPerBnb] = useState();
    const [instructionsModal,SetInstuctionModal]=useState(false)

    useEffect(()=>{
        console.log("hi")
        getTokenBalance().then((res)=>{
            saveCuplrTokenPrice(res?.usdPrice);
            getCuplrInDollar({setTokenPriceInUsd})
            const nativePrice = parseFloat(res?.nativePrice?.value) / 1000000000000000000;
            const bnbVal = (1/parseFloat(nativePrice).toFixed(18)).toFixed(0)
            getTokenPriceInEth({nativePrice,setTokenPerEth})
            setTokenPerBnb(bnbVal);

            const tokenperUsdt = (1/res?.usdPrice).toFixed(0)
            setTokenPerUsd(tokenperUsdt)

        })
    },[])




    return (
        <ComponentContext.Provider
            value={{
                tokenPriceInUsd,
                 setTokenPriceInUsd,
                tokenPerUsd,
                setTokenPerUsd,
                tokenPerEth,
                setTokenPerEth,
                tokenPerBnb,
                setTokenPerBnb,
                instructionsModal,
                SetInstuctionModal

            }}>
            {children}
        </ComponentContext.Provider>
    )
}

export const useComponentContext = () => useContext(ComponentContext);