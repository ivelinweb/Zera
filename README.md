# Zera - Smart Contract Security Audit Platform

A comprehensive platform for auditing smart contracts with AI-powered security analysis and on-chain audit registration.

## Blockchain Networks

This project supports both **BNB Smart Chain Mainnet** and **BNB Smart Chain Testnet**. Users can switch between networks using the network selector in the application.

### BNB Smart Chain Mainnet

- **Blockchain Network**: BNB Smart Chain Mainnet
- **Chain ID**: 56 (also 0x38 in hex)
- **Token Symbol/Ticker**: BNB
- **Default RPC Endpoints**:
  - https://bsc-dataseed.bnbchain.org
- **Blockchain Explorer**: https://bscscan.com

### BNB Smart Chain Testnet

- **Blockchain Network**: BNB Smart Chain Testnet
- **Chain ID**: 97 (also 0x61 in hex)
- **Token Symbol/Ticker**: BNB (sometimes shown as tBNB)
- **Default RPC Endpoints**:
  - https://bsc-testnet-dataseed.bnbchain.org
- **Blockchain Explorer**: https://testnet.bscscan.com

### Getting Testnet BNB

To interact with the BNB Smart Chain Testnet, you'll need testnet BNB (tBNB). You can get free testnet BNB from the official BNB Chain faucet:

- **BNB Chain Testnet Faucet**: https://testnet.bnbchain.org/faucet-smart

### Adding BNB Smart Chain Networks to MetaMask

The application will automatically prompt you to add the appropriate BNB Smart Chain network to your MetaMask wallet when you try to perform on-chain operations. Alternatively, you can add them manually:

#### For Mainnet:
1. Open MetaMask
2. Click on the network dropdown
3. Click "Add Network" or "Custom RPC"
4. Enter the following details:
   - **Network Name**: BNB Smart Chain Mainnet
   - **New RPC URL**: https://bsc-dataseed.bnbchain.org
   - **Chain ID**: 56
   - **Currency Symbol**: BNB
   - **Block Explorer URL**: https://bscscan.com

#### For Testnet:
1. Open MetaMask
2. Click on the network dropdown
3. Click "Add Network" or "Custom RPC"
4. Enter the following details:
   - **Network Name**: BNB Smart Chain Testnet
   - **New RPC URL**: https://bsc-testnet-dataseed.bnbchain.org
   - **Chain ID**: 97
   - **Currency Symbol**: tBNB
   - **Block Explorer URL**: https://testnet.bscscan.com

## Network Selection

The application includes a network selector component that allows you to:
- View your current connected network
- Switch between BNB Smart Chain Mainnet and Testnet
- Automatically add networks to your wallet if not already configured

The network selector will automatically detect your current network and update the UI accordingly.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- **AI-Powered Security Analysis**: Analyze smart contracts for vulnerabilities using advanced AI models
- **On-Chain Audit Registration**: Register audit results on BNB Smart Chain Mainnet or Testnet
- **Multi-Network Support**: Switch between Mainnet and Testnet seamlessly
- **Comprehensive Reports**: View detailed audit reports with severity ratings and recommendations
- **Wallet Integration**: Connect with MetaMask or compatible wallets
- **Real-time Updates**: Live updates on audit status and contract information

## Project Structure

- `src/app/` - Next.js app directory with pages and layouts
- `src/components/` - React components organized by feature
  - `ui/` - Reusable UI components (including NetworkSelector)
- `src/hooks/` - Custom React hooks for wallet and state management
- `src/services/` - Service layer for wallet and blockchain interactions
- `src/store/` - Redux store for state management
- `utils/` - Utility functions and blockchain configuration
  - `Contract.ts` - Smart contract configuration and ABI for both networks
  - `web3.ts` - Web3 utilities and network configuration with switching functions

## Smart Contract

The AuditRegistry smart contract is deployed on BNB Smart Chain Testnet:

### Testnet
- **Contract Address**: 0x5d4c4b84458edB1118A87ccE3D3EA8a6C2F82467
- **Explorer**: https://testnet.bscscan.com/address/0x5d4c4b84458edB1118A87ccE3D3EA8a6C2F82467

## Network Configuration

The project uses a centralized configuration system in `utils/web3.ts` and `utils/Contract.ts`:

- [`NETWORK_CONFIGS`](utils/web3.ts:37) - All network configurations
- [`switchToNetwork()`](utils/web3.ts:115) - Function to switch between networks
- [`getCurrentNetworkKey()`](utils/web3.ts:169) - Function to get current network
- [`CHAIN_CONFIG`](utils/Contract.ts:1) - Contract configurations for each network

## Development Notes

### Network Switching
- The application automatically detects the current network
- Users can switch networks using the NetworkSelector component
- All contract interactions are network-aware and use the appropriate contract address and RPC endpoint

### Testing
- Use Testnet for development and testing
- Use Mainnet for production deployments
- Ensure you have appropriate BNB/tBNB balance for transactions

## Additional Resources

- [BNB Chain Documentation](https://docs.bnbchain.org/)
- [BNB Smart Chain Mainnet Documentation](https://docs.bnbchain.org/bnb-smart-chain/developer/mainnet)
- [BNB Smart Chain Testnet Documentation](https://docs.bnbchain.org/bnb-smart-chain/developer/testnet)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
