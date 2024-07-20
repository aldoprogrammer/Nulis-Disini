// SPDX-License-Identifier: UNLICENSED
const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("LoginVerifier", function () {
  let LoginVerifier;
  let loginVerifier;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    
    LoginVerifier = await ethers.getContractFactory("LoginVerifier");
    loginVerifier = await LoginVerifier.deploy();
    await loginVerifier.deployed();
  });

  describe("User Registration", function () {
    it("Should register a user", async function () {
      const pHash = ethers.utils.formatBytes32String("passwordHash");
      const bHash = ethers.utils.formatBytes32String("blindingHash");
      await loginVerifier.registerUser(pHash, bHash, "user1");
      // Add any necessary assertions
    });

    it("Should fail if user is already registered", async function () {
      const pHash = ethers.utils.formatBytes32String("passwordHash");
      const bHash = ethers.utils.formatBytes32String("blindingHash");
      await loginVerifier.registerUser(pHash, bHash, "user1");
      await expect(
        loginVerifier.registerUser(pHash, bHash, "user1")
      ).to.be.revertedWith("User already registered");
    });
  });

  describe("Login Verification", function () {
    it("Should verify login successfully", async function () {
      const pHash = ethers.utils.formatBytes32String("passwordHash");
      const bHash = ethers.utils.formatBytes32String("blindingHash");
      await loginVerifier.registerUser(pHash, bHash, "user1");

      // Replace with actual proof values
      const pA = [0, 0];
      const pB = [[0, 0], [0, 0]];
      const pC = [0, 0];
      const pubSignals = [0];

      await expect(
        loginVerifier.verifyLogin(pA, pB, pC, pubSignals, "user1")
      ).not.to.be.reverted;
    });
  });
});
