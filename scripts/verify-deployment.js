const { ethers } = require("ethers");
const fs = require("fs");

// BSC Testnet Configuration
const BSC_TESTNET_RPC = "https://bsc-testnet-dataseed.bnbchain.org";
const CONTRACT_ADDRESS = "0x5d4c4b84458edB1118A87ccE3D3EA8a6C2F82467";

async function verifyDeployment() {
  console.log("=".repeat(60));
  console.log("  Verifying AuditRegistry Deployment on BSC Testnet");
  console.log("=".repeat(60));
  console.log();

  try {
    // Create provider
    const provider = new ethers.JsonRpcProvider(BSC_TESTNET_RPC);

    console.log(`📝 Contract Address: ${CONTRACT_ADDRESS}`);
    console.log();

    // Check if contract exists
    const code = await provider.getCode(CONTRACT_ADDRESS);
    
    if (code === "0x") {
      console.error("❌ No contract deployed at this address");
      process.exit(1);
    }

    console.log("✅ Contract is deployed and accessible");
    console.log();

    // Load deployment info
    const deploymentInfo = JSON.parse(fs.readFileSync("deployment-info.json", "utf8"));
    
    console.log("📋 Deployment Information:");
    console.log(`   Network: ${deploymentInfo.network}`);
    console.log(`   Chain ID: ${deploymentInfo.chainId}`);
    console.log(`   Contract Name: ${deploymentInfo.contractName}`);
    console.log(`   Contract Address: ${deploymentInfo.contractAddress}`);
    console.log(`   Deployer: ${deploymentInfo.deployer}`);
    console.log(`   Transaction Hash: ${deploymentInfo.transactionHash}`);
    console.log(`   Timestamp: ${deploymentInfo.timestamp}`);
    console.log();

    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, deploymentInfo.abi, provider);

    // Test contract functions
    console.log("🔍 Testing Contract Functions:");
    console.log();

    try {
      const totalContracts = await contract.getTotalContracts();
      console.log(`✅ getTotalContracts(): ${totalContracts.toString()}`);
    } catch (error) {
      console.error(`❌ getTotalContracts() failed: ${error.message}`);
    }

    try {
      const allAudits = await contract.getAllAudits(0, 10);
      console.log(`✅ getAllAudits(0, 10): Retrieved ${allAudits.contractHashes.length} audits`);
    } catch (error) {
      console.error(`❌ getAllAudits() failed: ${error.message}`);
    }

    console.log();
    console.log("=".repeat(60));
    console.log("  Verification Complete!");
    console.log("=".repeat(60));
    console.log();
    console.log("🔗 BSC Testnet Explorer:");
    console.log(`   Contract: https://testnet.bscscan.com/address/${CONTRACT_ADDRESS}`);
    console.log(`   Transaction: https://testnet.bscscan.com/tx/${deploymentInfo.transactionHash}`);
    console.log();

  } catch (error) {
    console.error("❌ Verification failed:");
    console.error(error);
    process.exit(1);
  }
}

// Execute verification
verifyDeployment()
  .then(() => {
    console.log("✅ Verification successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Verification failed:");
    console.error(error);
    process.exit(1);
  });
