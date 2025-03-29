const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ProductTracking
  console.log("Getting contract factory for ProductTracking...");
  const ProductTracking = await hre.ethers.getContractFactory(
    "ProductTracking"
  );
  console.log("Deploying ProductTracking contract...");
  const productTracking = await ProductTracking.deploy();
  console.log("Awaiting deployment confirmation...");
  await productTracking.waitForDeployment();
  console.log(
    "ProductTracking deployed to:",
    await productTracking.getAddress()
  );

  // Deploy PaymentEscrow
  console.log("Getting contract factory for PaymentEscrow...");
  const PaymentEscrow = await hre.ethers.getContractFactory("PaymentEscrow");
  console.log("Deploying PaymentEscrow contract...");
  const paymentEscrow = await PaymentEscrow.deploy();
  console.log("Awaiting deployment confirmation...");
  await paymentEscrow.waitForDeployment();
  console.log("PaymentEscrow deployed to:", await paymentEscrow.getAddress());

  // Deploy SupplyChainVerification
  console.log("Getting contract factory for SupplyChainVerification...");
  const SupplyChainVerification = await hre.ethers.getContractFactory(
    "SupplyChainVerification"
  );
  console.log("Deploying SupplyChainVerification contract...");
  const supplyChainVerification = await SupplyChainVerification.deploy();
  console.log("Awaiting deployment confirmation...");
  await supplyChainVerification.waitForDeployment();
  console.log(
    "SupplyChainVerification deployed to:",
    await supplyChainVerification.getAddress()
  );
}

main().catch((error) => {
  console.error("Error deploying:", error);
  process.exitCode = 1;
});
