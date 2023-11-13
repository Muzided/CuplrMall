import axios from "axios";



export const getBalance = async () => {
  try {
    const response = await axios.get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BNB,BTC&tsyms=,USD,&api_key=63f838eff9b7e97a7a6a1af6dbefdac95fbf9358c748bb8c9befb390111ab4a3",

    ).then(async (_res) => {

      let USDprices = [];

      USDprices.push({
        EthUsd: _res.data.ETH.USD,
        BnbUsd: _res.data.BNB.USD,
        BtcUsd: _res.data.BTC.USD
      });

      return USDprices;
    });
    return response;



  } catch (error) {
    console.error("Error retrieving balance:", error.message);
    return 0; // or return any other default value you want to use
  }
};


export const getTokenPriceInEth = async ({nativePrice,setTokenPerEth}) => {
  const val = parseFloat(nativePrice).toFixed(18)
  //console.log("ethvalincryptocompare",val)
  axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=eth').then(async (res) => {
    // console.log('bnb to eth', res?.data?.binancecoin.eth)
    const eth = res?.data?.binancecoin.eth
    const bnbtoeth = val * eth
     //console.log("ruraaaaakksssuu", bnbtoeth)
     //console.log("shuklaa", parseFloat(bnbtoeth).toFixed(18))
     const tokenperethereum= parseFloat(bnbtoeth).toFixed(18);
     //console.log("tokenpereth",parseFloat(1/tokenperethereum).toFixed(0));
    setTokenPerEth(parseFloat(1/tokenperethereum).toFixed(0));
  }).catch((err)=>{console.log("err",err)})
}
