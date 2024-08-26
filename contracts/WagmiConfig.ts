"use client";

import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage 
} from 'wagmi';
import { defineChain } from 'viem';


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
      url: 'https://opencampus-codex.blockscout.com', 
    },
  },
});

export function getConfig() {
  return createConfig({
    chains: [eduChain], 
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [eduChain.id]: http(), 
    },
  });
}

export const config = createConfig({
  chains: [eduChain],
  transports: {
    [eduChain.id]: http(), 
  },
});
