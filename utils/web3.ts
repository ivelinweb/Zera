import { ethers } from "ethers";

/**
 * BNB Smart Chain Mainnet Configuration
 * 
 * Network Details:
 * - Chain ID: 56 (0x38 in hex)
 * - Token Symbol: BNB
 * - RPC Endpoints:
 *   - https://bsc-dataseed.bnbchain.org
 * - Blockchain Explorer: https://bscscan.com
 */

export const BNB_MAINNET_CONFIG = {
  chainId: 56,
  chainIdHex: "0x38",
  chainName: "BNB Smart Chain Mainnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: [
    "https://bsc-dataseed.bnbchain.org"
  ],
  blockExplorerUrls: ["https://bscscan.com"],
};

/**
 * BNB Smart Chain Testnet Configuration
 * 
 * Network Details:
 * - Chain ID: 97 (0x61 in hex)
 * - Token Symbol: BNB (tBNB on testnet)
 * - RPC Endpoints:
 *   - https://bsc-testnet-dataseed.bnbchain.org
 * - Blockchain Explorer: https://testnet.bscscan.com
 */

export const BNB_TESTNET_CONFIG = {
  chainId: 97,
  chainIdHex: "0x61",
  chainName: "BNB Smart Chain Testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: [
    "https://bsc-testnet-dataseed.bnbchain.org"
  ],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

/**
 * All supported network configurations
 */
export const NETWORK_CONFIGS = {
  BNBMainnet: BNB_MAINNET_CONFIG,
  BNBTestnet: BNB_TESTNET_CONFIG,
} as const;

export type NetworkKey = keyof typeof NETWORK_CONFIGS;

/**
 * Switch wallet to BNB Smart Chain Mainnet
 * @returns Promise that resolves when the network is switched
 */
export const switchToBNBMainnet = async (): Promise<void> => {
  if (!window.ethereum) {
    throw new Error("MetaMask or compatible wallet not detected");
  }

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BNB_MAINNET_CONFIG.chainIdHex }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        // Add the network to MetaMask
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [BNB_MAINNET_CONFIG],
        });
      } catch (addError: any) {
        console.error("Failed to add BNB Smart Chain Mainnet:", addError);
        throw new Error("Failed to add BNB Smart Chain Mainnet to wallet");
      }
    } else {
      console.error("Failed to switch to BNB Smart Chain Mainnet:", switchError);
      throw new Error("Failed to switch to BNB Smart Chain Mainnet");
    }
  }
};

/**
 * Switch wallet to BNB Smart Chain Testnet
 * @returns Promise that resolves when the network is switched
 */
export const switchToBNBTestnet = async (): Promise<void> => {
  if (!window.ethereum) {
    throw new Error("MetaMask or compatible wallet not detected");
  }

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BNB_TESTNET_CONFIG.chainIdHex }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        // Add the network to MetaMask
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [BNB_TESTNET_CONFIG],
        });
      } catch (addError: any) {
        console.error("Failed to add BNB Smart Chain Testnet:", addError);
        throw new Error("Failed to add BNB Smart Chain Testnet to wallet");
      }
    } else {
      console.error("Failed to switch to BNB Smart Chain Testnet:", switchError);
      throw new Error("Failed to switch to BNB Smart Chain Testnet");
    }
  }
};

/**
 * Switch wallet to a specific network
 * @param networkKey - The network key (BNBMainnet or BNBTestnet)
 * @returns Promise that resolves when the network is switched
 */
export const switchToNetwork = async (networkKey: NetworkKey): Promise<void> => {
  const config = NETWORK_CONFIGS[networkKey];
  
  if (!window.ethereum) {
    throw new Error("MetaMask or compatible wallet not detected");
  }

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: config.chainIdHex }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        // Add the network to MetaMask
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [config],
        });
      } catch (addError: any) {
        console.error(`Failed to add ${config.chainName}:`, addError);
        throw new Error(`Failed to add ${config.chainName} to wallet`);
      }
    } else {
      console.error(`Failed to switch to ${config.chainName}:`, switchError);
      throw new Error(`Failed to switch to ${config.chainName}`);
    }
  }
};

/**
 * Get ethers provider for BNB Smart Chain Mainnet
 * @returns ethers.JsonRpcProvider instance
 */
export const getBNBMainnetProvider = (): ethers.JsonRpcProvider => {
  return new ethers.JsonRpcProvider(BNB_MAINNET_CONFIG.rpcUrls[0]);
};

/**
 * Get ethers provider for BNB Smart Chain Testnet
 * @returns ethers.JsonRpcProvider instance
 */
export const getBNBTestnetProvider = (): ethers.JsonRpcProvider => {
  return new ethers.JsonRpcProvider(BNB_TESTNET_CONFIG.rpcUrls[0]);
};

/**
 * Get ethers provider for a specific network
 * @param networkKey - The network key (BNBMainnet or BNBTestnet)
 * @returns ethers.JsonRpcProvider instance
 */
export const getNetworkProvider = (networkKey: NetworkKey): ethers.JsonRpcProvider => {
  const config = NETWORK_CONFIGS[networkKey];
  return new ethers.JsonRpcProvider(config.rpcUrls[0]);
};

/**
 * Check if current network is BNB Smart Chain Mainnet
 * @returns Promise<boolean> indicating if connected to BNB Mainnet
 */
export const isBNBMainnet = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    return Number(network.chainId) === BNB_MAINNET_CONFIG.chainId;
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
};

/**
 * Check if current network is BNB Smart Chain Testnet
 * @returns Promise<boolean> indicating if connected to BNB Testnet
 */
export const isBNBTestnet = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    return Number(network.chainId) === BNB_TESTNET_CONFIG.chainId;
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
};

/**
 * Check if current network is a supported BNB network
 * @returns Promise<NetworkKey | null> indicating the current network key or null if not supported
 */
export const getCurrentNetworkKey = async (): Promise<NetworkKey | null> => {
  if (!window.ethereum) {
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);

    if (chainId === BNB_MAINNET_CONFIG.chainId) {
      return "BNBMainnet";
    } else if (chainId === BNB_TESTNET_CONFIG.chainId) {
      return "BNBTestnet";
    }
    return null;
  } catch (error) {
    console.error("Error checking network:", error);
    return null;
  }
};

/**
 * Get current network information
 * @returns Promise with network details
 */
export const getCurrentNetwork = async (): Promise<{
  chainId: number;
  name: string;
  isTestnet: boolean;
  networkKey: NetworkKey | null;
}> => {
  if (!window.ethereum) {
    throw new Error("No wallet detected");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);

  return {
    chainId,
    name: network.name || `Chain ${chainId}`,
    isTestnet: chainId === BNB_TESTNET_CONFIG.chainId,
    networkKey: await getCurrentNetworkKey(),
  };
};
