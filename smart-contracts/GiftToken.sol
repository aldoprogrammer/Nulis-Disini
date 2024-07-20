// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract GiftToken is ERC20, Ownable, ReentrancyGuard {
    struct Gift {
        string name;
        uint256 price;  // Price in Theta tokens (using 18 decimals)
        uint256 stock;  // Available quantity
    }

    mapping(uint256 => Gift) public gifts;
    mapping(address => uint256) public userScores;
    uint256 public nextGiftId;

    event GiftAdded(uint256 indexed giftId, string name, uint256 price, uint256 stock);
    event GiftPurchased(address indexed buyer, uint256 indexed giftId, uint256 quantity);
    event ScoresUpdated(address indexed user, uint256 score);

    constructor() ERC20("Gift Token", "GIFT") {
        _mint(msg.sender, 1000000 * 10**decimals());  // Initial mint for testing
    }

    modifier validAddress(address user) {
        require(user != address(0), "Invalid address");
        _;
    }

    modifier giftExists(uint256 giftId) {
        require(bytes(gifts[giftId].name).length > 0, "Gift does not exist");
        _;
    }

    modifier hasSufficientStock(uint256 giftId, uint256 quantity) {
        require(gifts[giftId].stock >= quantity, "Insufficient stock");
        _;
    }

    function addGift(string memory name, uint256 price, uint256 stock) external onlyOwner {
        gifts[nextGiftId] = Gift(name, price, stock);
        emit GiftAdded(nextGiftId, name, price, stock);
        nextGiftId++;
    }

    function updateGiftStock(uint256 giftId, uint256 newStock) external onlyOwner giftExists(giftId) {
        gifts[giftId].stock = newStock;
        emit GiftAdded(giftId, gifts[giftId].name, gifts[giftId].price, newStock);
    }

    function purchaseGift(uint256 giftId, uint256 quantity) external nonReentrant giftExists(giftId) hasSufficientStock(giftId, quantity) {
        uint256 totalPrice = gifts[giftId].price * quantity;
        require(balanceOf(msg.sender) >= totalPrice, "Insufficient balance to purchase gift");

        _transfer(msg.sender, address(this), totalPrice);  // Transfer Theta tokens to contract
        gifts[giftId].stock -= quantity;  // Update gift stock

        emit GiftPurchased(msg.sender, giftId, quantity);
    }

    function setUserScore(address user, uint256 score) external onlyOwner validAddress(user) {
        userScores[user] = score;
        emit ScoresUpdated(user, score);
    }

    function mintTokens(address user, uint256 amount) external onlyOwner validAddress(user) {
        _mint(user, amount);
    }

    function burnTokens(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
