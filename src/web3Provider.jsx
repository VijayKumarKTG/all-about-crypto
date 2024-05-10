import { createWeb3Modal } from '@web3modal/wagmi/react';

import { createConfig, WagmiProvider } from 'wagmi';
import { mainnet, polygon, base } from 'viem/chains';
import { walletConnect, coinbaseWallet } from 'wagmi/connectors';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_PROJECT_ID;
if (!projectId) throw new Error('Project ID is undefined');

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const wagmiConfig = createConfig({
  chains: [mainnet, polygon, base],
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId });

// eslint-disable-next-line react/prop-types
export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
