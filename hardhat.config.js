require("@nomicfoundation/hardhat-ignition");
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVKEY;

module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `${process.env.SEPRPC}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    theta_testnet: {
      url: `https://eth-rpc-api-testnet.thetatoken.org/rpc`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 365,
      gasPrice: 4000000000000
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  sourcify: {
    enabled: true
  },
  ignition: {
    enabled: true
  }
};
