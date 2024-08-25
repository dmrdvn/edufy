import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});


export const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum!),
});


export async function getWalletConnectClient() {
  const provider = await EthereumProvider.init({
    projectId: "abcd1234",
    showQrModal: true,
    chains: [11155111],
  });

  return createWalletClient({
    chain: sepolia,
    transport: custom(provider),
  });
}
