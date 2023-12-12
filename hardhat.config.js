const { alchemyApiKey, mnemonic } = require('./secrets.json');

require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-truffle5");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.20",
    networks: {
     sepolia: {
       url: `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
       accounts: { mnemonic: mnemonic },
     },
   },
};
