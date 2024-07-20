// SPDX-License-Identifier: UNLICENSED
const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Groth16Verifier", function () {
  let Groth16Verifier;
  let groth16Verifier;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    
    Groth16Verifier = await ethers.getContractFactory("Groth16Verifier");
    groth16Verifier = await Groth16Verifier.deploy();
    await groth16Verifier.deployed();
  });

  describe("Proof Verification", function () {
    it("Should verify proof correctly", async function () {
      // Replace with actual proof values
      const pA = [0, 0];
      const pB = [[0, 0], [0, 0]];
      const pC = [0, 0];
      const pubSignals = [0];

      await expect(
        groth16Verifier.verifyProof(pA, pB, pC, pubSignals)
      ).to.be.true;
    });

    it("Should fail verification with incorrect proof", async function () {
      // Replace with actual proof values
      const pA = [0, 0];
      const pB = [[0, 0], [0, 0]];
      const pC = [0, 0];
      const pubSignals = [1]; // Modify to simulate failure

      await expect(
        groth16Verifier.verifyProof(pA, pB, pC, pubSignals)
      ).to.be.false;
    });
  });
});
