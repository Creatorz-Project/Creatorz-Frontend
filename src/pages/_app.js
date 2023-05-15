import '@/styles/globals.css'
import Header from '@/components/Header/Header';
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  midnightTheme
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, mainnet, optimism, polygon, arbitrum } from 'wagmi/chains'
import { publicProvider } from "wagmi/providers/public";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, injectedWallet, rainbowWallet, walletConnectWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";

import { ArcanaConnector } from "@arcana/auth-wagmi";

import { ApolloProvider } from "@apollo/client";
import client from '/utils/client';

const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "Arcana Wallet",
    iconUrl: "https://media.licdn.com/dms/image/C4D0BAQFnmnmr4ZrjUQ/company-logo_200_200/0/1663061019048?e=1684368000&v=beta&t=Km-ii4HJitQr9GRB0LF4IVmWkWX52Z1QGLSZ6PiRkC0",
    iconBackground: "#101010",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          // appId parameter refers to App Address value in the Dashboard
          appId: "51d1846eb0f2283b7bc7cb36f2032d0c1c6c8f9e",
        },
      });
      return {
        connector,
      };
    },
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      groupName: "AdChain",
      wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains }), injectedWallet({ chains }), rainbowWallet({ chains }), walletConnectWallet({ chains }), coinbaseWallet({ chains })]
    },
  ]);

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [
    publicProvider()
  ]
);


const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider
});


export default function App({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={midnightTheme()}>
              <Header />
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
      </ApolloProvider>
    </>
  )
}
