require("@nomicfoundation/hardhat-ignition");
require('dotenv').config();

task("deploy", "Deploys the contracts using Ignition")
  .setAction(async (taskArgs, hre) => {
    const { ignition } = hre;

    try {
      const deployments = await ignition.deploy("DeployModule");

      const giftToken = deployments.GiftToken;
      const loginVerifier = deployments.LoginVerifier;
      const groth16Verifier = deployments.Groth16Verifier;

      console.log("GiftToken deployed to:", giftToken.address);
      console.log("LoginVerifier deployed to:", loginVerifier.address);
      console.log("Groth16Verifier deployed to:", groth16Verifier.address);
    } catch (error) {
      console.error("Error deploying contracts:", error);
    }
  });
