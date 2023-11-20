import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar';
// web3
import "@rainbow-me/rainbowkit/styles.css";

import { coinbaseWallet, metaMaskWallet, rainbowWallet, trustWallet, walletConnectWallet} from "@rainbow-me/rainbowkit/wallets";
import { darkTheme, Theme } from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createConfig,
  WagmiConfig,
} from "wagmi";
import { infuraProvider } from 'wagmi/providers/infura';
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { publicProvider } from "wagmi/providers/public";

import {  mainnet ,bsc} from "@wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Footer from './components/Footer';

const { chains, publicClient } = configureChains(
  [mainnet, bsc,],
  [
    alchemyProvider({ apiKey: "JomhmuQ76IsTZ8H5xQ0kuj2kvpHwF8X2" }),
    publicProvider()
  ]);

  // const { connectors } = getDefaultWallets({
  //   appName: 'Payment',
  //   projectId: '72f5d80525bd261bb92a76b1426b1ce0',
  //   chains
  // });
  // const { connectors } = getDefaultWallets({
  //   appName: '72f5d80525bd261bb92a76b1426b1ce0',
  //   projectId: 'Payment',
  //   chains
  // });
  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        walletConnectWallet({
          projectId: '72f5d80525bd261bb92a76b1426b1ce0',
          chains: [mainnet, bsc],
         
        }),
        metaMaskWallet({ appName: 'Payment',projectId:'72f5d80525bd261bb92a76b1426b1ce0', chains}),
        rainbowWallet({ appName: 'Payment',projectId:'72f5d80525bd261bb92a76b1426b1ce0', chains }),
        trustWallet({appName: 'Payment',projectId:'72f5d80525bd261bb92a76b1426b1ce0', chains}),
        coinbaseWallet( {
          appName: 'Payment',
          chains: [bsc,mainnet],
        }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

const Routing = () => {
 

  return (
    <WagmiConfig  config={wagmiConfig}>
    <RainbowKitProvider
    initialChain={mainnet}
      coolMode
      theme={darkTheme({
        accentColor: '#18242A',
        accentColorForeground: 'white',
        borderRadius: 'large',
        fontStack: 'system',
        overlayBlur: 'large',
      })} chains={chains}>
    <div className='bg-bg-color-Primary min-h-screen  relative '>
      <div className='bg-stripes '></div>
      <NavBar/>
      <div className=''> <Outlet/></div>
  
    </div>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Routing
