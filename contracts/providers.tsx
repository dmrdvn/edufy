'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import {  WagmiProvider } from 'wagmi'

import { getConfig } from '../contracts/WagmiConfig'

type Props = {
  children: ReactNode,
  autoConnect?: boolean
}


export function Providers({ children }: Props) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (

    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
            {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}