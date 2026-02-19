const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const solc = require("solc");

// BSC Testnet Configuration
const BSC_TESTNET_RPC = "https://bsc-testnet-dataseed.bnbchain.org";
const CHAIN_ID = 97;
const PRIVATE_KEY = "703b7be782c4a247aaa7e14a506f81d85fb05191a9f08f930e5797b41a947d67";

// Contract ABI (extracted from the contract)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "contractHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "stars",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "summary",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "auditor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "AuditRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "contractHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "stars",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "summary",
        "type": "string"
      }
    ],
    "name": "registerAudit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "startIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      }
    ],
    "name": "getAllAudits",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "contractHashes",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8[]",
        "name": "stars",
        "type": "uint8[]"
      },
      {
        "internalType": "string[]",
        "name": "summaries",
        "type": "string[]"
      },
      {
        "internalType": "address[]",
        "name": "auditors",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "timestamps",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "auditor",
        "type": "address"
      }
    ],
    "name": "getAuditorHistory",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "contractHash",
        "type": "bytes32"
      }
    ],
    "name": "getContractAudits",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "stars",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "summary",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "auditor",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct AuditRegistry.AuditEntry[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "contractHash",
        "type": "bytes32"
      }
    ],
    "name": "getLatestAudit",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "stars",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "summary",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "auditor",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct AuditRegistry.AuditEntry",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalContracts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function compileContract() {
  console.log("🔨 Compiling AuditRegistry contract...");
  
  const contractPath = path.join(__dirname, "..", "contracts", "AuditContract.sol");
  const contractSource = fs.readFileSync(contractPath, "utf8");
  
  const input = {
    language: "Solidity",
    sources: {
      "AuditContract.sol": {
        content: contractSource
      }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"]
        }
      }
    }
  };
  
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  
  if (output.errors) {
    output.errors.forEach((error) => {
      console.error(error.formattedMessage);
    });
    throw new Error("Compilation failed");
  }
  
  const contract = output.contracts["AuditContract.sol"]["AuditRegistry"];
  const bytecode = contract.evm.bytecode.object;
  const abi = contract.abi;
  
  console.log("✅ Contract compiled successfully");
  return { bytecode, abi };
}

async function deployContract() {
  console.log("=".repeat(60));
  console.log("  Deploying AuditRegistry to BSC Testnet");
  console.log("=".repeat(60));
  console.log();

  try {
    // Compile the contract
    const { bytecode, abi } = await compileContract();
    
    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(BSC_TESTNET_RPC);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log(`📝 Deployer Address: ${wallet.address}`);

    // Check balance
    const balance = await provider.getBalance(wallet.address);
    const balanceInBNB = ethers.formatEther(balance);
    console.log(`💰 Balance: ${balanceInBNB} tBNB\n`);

    if (balance === 0n) {
      console.error("❌ Insufficient balance. Please fund the wallet with tBNB.");
      console.log("🔗 Get testnet BNB: https://testnet.bnbchain.org/faucet-smart");
      process.exit(1);
    }

    // Deploy the contract
    console.log("🚀 Deploying AuditRegistry...");
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();

    console.log("⏳ Waiting for deployment confirmation...");
    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log("✅ AuditRegistry deployed to:", address);
    console.log();

    // Get deployment transaction
    const deploymentTx = contract.deploymentTransaction();
    if (deploymentTx) {
      console.log("📋 Transaction hash:", deploymentTx.hash);
      console.log("🔗 BSC Testnet Explorer:", `https://testnet.bscscan.com/tx/${deploymentTx.hash}`);
      console.log("🔗 Contract Address:", `https://testnet.bscscan.com/address/${address}`);
    }

    console.log();
    console.log("=".repeat(60));
    console.log("  Deployment Complete!");
    console.log("=".repeat(60));
    console.log();
    console.log("📝 Contract Address:", address);
    console.log("🔗 Verify on BSC Testnet: https://testnet.bscscan.com/address/" + address);
    console.log();

    // Save deployment info to file
    const deploymentInfo = {
      network: "BNB Smart Chain Testnet",
      chainId: CHAIN_ID,
      contractName: "AuditRegistry",
      contractAddress: address,
      deployer: wallet.address,
      transactionHash: deploymentTx?.hash,
      timestamp: new Date().toISOString(),
      explorerUrl: `https://testnet.bscscan.com/address/${address}`,
      abi: abi
    };

    const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
    console.log("💾 Deployment info saved to:", deploymentPath);
    console.log();

    return address;

  } catch (error) {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  }
}

// Execute deployment
deployContract()
  .then((address) => {
    console.log("✅ Deployment successful!");
    console.log("📝 Contract Address:", address);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
