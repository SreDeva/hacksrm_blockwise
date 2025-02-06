require("@nomicfoundation/hardhat-toolbox");


const { vars } = require("hardhat/config");

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/34595ba8d5054540908cf0ed72b6d25b`,
      accounts: [""],
    },
    zkEVM: {
      url: `https://rpc.cardona.zkevm-rpc.com`,
      accounts: [""],
      },
    localhost: {
      url: 'http://localhost:8545',
      accounts: [""],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "",
    },
  },
};
