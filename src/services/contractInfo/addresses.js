export const cuplrTokenAddress = "0x0D3608CE95Cd2b561298BeeD3F9fd3DDD3083163"
import cuplrAbi from "./cuplrAbi.json"



export const cuplrContractConfig = {
    address: cuplrTokenAddress,
    abi: cuplrAbi,
  };

  export const transferCuplr = {
    ...cuplrContractConfig,
    functionName: "transfer",
    watch: true,
  };