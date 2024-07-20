const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployModule", (m) => {
  // Deploy GiftToken contract
  const giftToken = m.contract("GiftToken", []);

  // Deploy LoginVerifier contract
  const loginVerifier = m.contract("LoginVerifier", []);

  // Deploy Groth16Verifier contract
  const groth16Verifier = m.contract("Groth16Verifier", []);

  // Return the deployed contract instances
  return { giftToken, loginVerifier, groth16Verifier };
});
