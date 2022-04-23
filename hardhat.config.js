require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config(); // Load env vars from process.env.VAR as defined in .env file

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  networks: { },
};

if (process.env.STAGING_ALCHEMY_KEY) {
  module.exports.networks['rinkeby'] = {
        chainId: 1,
        url: process.env.STAGING_ALCHEMY_KEY,
        accounts: [process.env.PRIVATE_KEY],
  };
}

if (process.env.PROD_ALCHEMY_KEY) {
  module.exports.networks['mainnet'] = {
        chainId: 1,
        url: process.env.PROD_ALCHEMY_KEY,
        accounts: [process.env.PRIVATE_KEY],
  };
}

if (process.env.ETHERSCAN_URL & process.env.ETHERSCAN_KEY) {
  module.exports.networks['etherscan'] = {
        // Your API key for Etherscan - Obtain one at https://etherscan.io/
        url: process.env.ETHERSCAN_URL,
        apiKey: process.env.ETHERSCAN_KEY,
  };
}

if (process.env.MUMBAI_ALCHEMY_KEY & process.env.MUMBAI_PRIVATE_KEY) {
  module.exports.networks['polygon_mumbai'] = {
        url: process.env.MUMBAI_ALCHEMY_KEY,
        accounts: [process.env.MUMBAI_PRIVATE_KEY],
  };
}
