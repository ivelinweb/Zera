import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("=".repeat(60));
  console.log("  Deploying AuditRegistry to BSC Testnet");
  console.log("=".repeat(60));
  console.log();

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Get balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "tBNB");
  console.log();

  // Deploy the contract
  console.log("🚀 Deploying AuditRegistry...");
  const AuditRegistry = await hre.ethers.getContractFactory("AuditRegistry");
  const auditRegistry = await AuditRegistry.deploy();

  // Wait for deployment
  await auditRegistry.waitForDeployment();
  const address = await auditRegistry.getAddress();

  console.log("✅ AuditRegistry deployed to:", address);
  console.log();

  // Get deployment transaction
  const deploymentTx = auditRegistry.deploymentTransaction();
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
    chainId: 97,
    contractName: "AuditRegistry",
    contractAddress: address,
    deployer: deployer.address,
    transactionHash: deploymentTx?.hash,
    timestamp: new Date().toISOString(),
    explorerUrl: `https://testnet.bscscan.com/address/${address}`
  };

  const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", deploymentPath);
  console.log();

  return address;
}

// Execute deployment
main()
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
