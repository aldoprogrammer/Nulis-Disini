// SPDX-License-Identifier: UNLICENSED
const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("GiftToken", function () {
  let GiftToken;
  let giftToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    GiftToken = await ethers.getContractFactory("GiftToken");
    giftToken = await GiftToken.deploy();
    await giftToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await giftToken.owner()).to.equal(owner.address);
    });

    it("Should mint the initial supply to the owner", async function () {
      const ownerBalance = await giftToken.balanceOf(owner.address);
      expect(await giftToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Gift Management", function () {
    it("Should allow owner to add a gift", async function () {
      await giftToken.addGift("Gift1", ethers.utils.parseUnits("10", 18), 100);
      const gift = await giftToken.gifts(0);
      expect(gift.name).to.equal("Gift1");
      expect(gift.price).to.equal(ethers.utils.parseUnits("10", 18));
      expect(gift.stock).to.equal(100);
    });

    it("Should allow purchase of a gift", async function () {
      await giftToken.addGift("Gift1", ethers.utils.parseUnits("10", 18), 100);
      await giftToken.mintTokens(addr1.address, ethers.utils.parseUnits("50", 18));
      await giftToken.connect(addr1).purchaseGift(0, 2);
      const gift = await giftToken.gifts(0);
      expect(gift.stock).to.equal(98);
    });

    it("Should update user scores", async function () {
      await giftToken.setUserScore(addr1.address, 100);
      expect(await giftToken.userScores(addr1.address)).to.equal(100);
    });
  });
});
