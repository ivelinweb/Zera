const { ethers } = require("ethers");

// BSC Testnet Configuration
const BSC_TESTNET_RPC = "https://bsc-testnet-dataseed.bnbchain.org";
const PRIVATE_KEY = "703b7be782c4a247aaa7e14a506f81d85fb05191a9f08f930e5797b41a947d67";
const CONTRACT_ADDRESS = "0x5d4c4b84458edB1118A87ccE3D3EA8a6C2F82467";

async function fundContract() {
  console.log("=".repeat(60));
  console.log("  Funding AuditRegistry Contract on BSC Testnet");
  console.log("=".repeat(60));
  console.log();

  try {
    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(BSC_TESTNET_RPC);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log(`📝 Funding from: ${wallet.address}`);
    console.log(`📝 Funding to: ${CONTRACT_ADDRESS}`);
    console.log();

    // Check balance
    const balance = await provider.getBalance(wallet.address);
    const balanceInBNB = ethers.formatEther(balance);
    console.log(`💰 Wallet Balance: ${balanceInBNB} tBNB`);

    // Check contract balance
    const contractBalance = await provider.getBalance(CONTRACT_ADDRESS);
    const contractBalanceInBNB = ethers.formatEther(contractBalance);
    console.log(`💰 Contract Balance: ${contractBalanceInBNB} tBNB`);
    console.log();

    // Amount to send (0.1 tBNB)
    const amountToSend = ethers.parseEther("0.1");
    console.log(`💸 Sending: ${ethers.formatEther(amountToSend)} tBNB`);
    console.log();

    // Send transaction
    console.log("⏳ Sending transaction...");
    const tx = await wallet.sendTransaction({
      to: CONTRACT_ADDRESS,
      value: amountToSend
    });

    console.log(`📋 Transaction hash: ${tx.hash}`);
    console.log("⏳ Waiting for confirmation...");

    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("✅ Transaction confirmed!");
    console.log(`🔗 BSC Testnet Explorer: https://testnet.bscscan.com/tx/${tx.hash}`);
    console.log();

    // Check new contract balance
    const newContractBalance = await provider.getBalance(CONTRACT_ADDRESS);
    const newContractBalanceInBNB = ethers.formatEther(newContractBalance);
    console.log(`💰 New Contract Balance: ${newContractBalanceInBNB} tBNB`);
    console.log();

    console.log("=".repeat(60));
    console.log("  Funding Complete!");
    console.log("=".repeat(60));
    console.log();

  } catch (error) {
    console.error("❌ Funding failed:");
    console.error(error);
    process.exit(1);
  }
}

// Execute funding
fundContract()
  .then(() => {
    console.log("✅ Funding successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Funding failed:");
    console.error(error);
    process.exit(1);
  });
