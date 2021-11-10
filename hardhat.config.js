require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const pk = process.env.PRIVATE_KEY; 
const endpoint = process.env.RINKEBY_RPC_URL;

module.exports = {
  solidity: "0.8.7",
  networks: {
    rinkeby: {
      url:endpoint,
      accounts: [`0x${pk}`]
    }
  }
  //TESTING
  // mocha: {
  //   timeout:100000
  // },
  // networks: {
  //   hardhat: {
  //     forking: {
  //       url: mainnetEndpoint
  //     }
  //   }
  // },
};


