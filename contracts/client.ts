import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

// Public client can be created without any conditions as it doesn't rely on window object
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

let walletClient: ReturnType<typeof createWalletClient> | null = null;

if (typeof window !== 'undefined' && window.ethereum) {
  walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!),
  });
} else {
  console.warn('window.ethereum is not available. This code runs on the server-side or without Metamask.');
}

export { walletClient };

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
