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
    mantleTestnet: {
      type: "http",
      url: "https://rpc.sepolia.mantle.xyz",
      chainId: 5003,
      accounts: ["5338651c6d795ea8035325e88bae5f8bb5b191c2db7b0ab6e19d0da567af6e25"]
    }
  }
};
