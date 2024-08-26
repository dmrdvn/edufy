import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { defineChain } from 'viem';
import { EthereumProvider } from '@walletconnect/ethereum-provider';


const eduChain = defineChain({
  id: 656476, 
  name: 'Edu Chain',
  network: 'edu-chain',
  nativeCurrency: {
    name: 'EduToken',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.open-campus-codex.gelato.digital'], 
    },
  },
  blockExplorers: {
    default: {
      name: 'EduScan',
      url: 'https://opencampus-codex.blockscout.com/', 
    },
  },
});

export const publicClient = createPublicClient({
  chain: eduChain, 
  transport: http(),
});


export const walletClient = typeof window !== "undefined" && window.ethereum
  ? createWalletClient({
      chain: eduChain, 
      transport: custom(window.ethereum),
    })
  : null;

export async function getWalletConnectClient() {
  const provider = await EthereumProvider.init({
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
    showQrModal: true,
    chains: [656476], 
  });

  return createWalletClient({
    chain: eduChain, 
    transport: custom(provider),
  });
}
