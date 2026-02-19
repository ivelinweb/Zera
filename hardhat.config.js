import "@nomicfoundation/hardhat-toolbox";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    bscTestnet: {
      url: "https://bsc-testnet-dataseed.bnbchain.org",
      chainId: 97,
      accounts: ["703b7be782c4a247aaa7e14a506f81d85fb05191a9f08f930e5797b41a947d67"]
    },
    bscMainnet: {
      url: "https://bsc-dataseed.bnbchain.org",
      chainId: 56,
      accounts: ["703b7be782c4a247aaa7e14a506f81d85fb05191a9f08f930e5797b41a947d67"]
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: "your-api-key-here",
      bscMainnet: "your-api-key-here"
    }
  }
};
