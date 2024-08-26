import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// `window` nesnesinin varlığını kontrol ediyoruz
export const walletClient = typeof window !== "undefined" && window.ethereum
  ? createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    })
  : null;

export async function getWalletConnectClient() {
  const provider = await EthereumProvider.init({
    projectId: process.env.WALLET_CONNECT_ID!,
    showQrModal: true,
    chains: [11155111],
  });

  return createWalletClient({
    chain: sepolia,
    transport: custom(provider),
  });
}
