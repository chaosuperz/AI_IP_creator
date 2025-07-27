const hre = require("hardhat");

async function main() {
  console.log("Deploying ZoraCoinCreator...");

  // You'll need to replace this with the actual Zora Factory address for Base Sepolia
  // This is a placeholder - check Zora's documentation for the correct address
  const zoraFactoryAddress = "0x0000000000000000000000000000000000000000"; // PLACEHOLDER

  const ZoraCoinCreator = await hre.ethers.getContractFactory("ZoraCoinCreator");
  const zoraCoinCreator = await ZoraCoinCreator.deploy(zoraFactoryAddress);

  await zoraCoinCreator.waitForDeployment();

  const address = await zoraCoinCreator.getAddress();
  console.log("ZoraCoinCreator deployed to:", address);
  console.log("Zora Factory address:", zoraFactoryAddress);
  console.log("Note: You need to update the zoraFactoryAddress with the correct Zora Factory address for Base Sepolia");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
