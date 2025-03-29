require("@nomicfoundation/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      timeout: 200000, 
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};