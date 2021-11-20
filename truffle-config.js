require('babel-register');
require('babel-polyfill');
require('dotenv').config()  // Store environment-specific variable from '.env' to process.env
const HDWalletProvider = require("truffle-hdwallet-provider");
const path = require("path");

let PROJECT_ID = process.env.PROJECT_ID || 'dummy'; // dummy to avoid error en empty envirnment variable
let INFURA_KEY = process.env.INFURA_KEY || 'dummy'; // dummy to avoid error en empty envirnment variable
let MNENOMIC = process.env.MNENOMIC || 'dummy'; // dummy to avoid error en empty envirnment variable
let FROM = process.env.FROM || '0x0Fb80359dD096A1Ec1FbfDC07ddEBc2003272b0c'

if (!MNENOMIC || !PROJECT_ID || !INFURA_KEY) {
  console.error("********************************************************************************************");
  console.error("********************************************************************************************");
  console.error("");
  console.error("Please set a MNENOMIC, PROJECT_ID and INFURA_KEY variables in an environment file (.env)");
  console.error("(if you want to use another network that localhost)");
  console.error("");
  console.error("********************************************************************************************");
  console.error("********************************************************************************************");
}

console.log(MNENOMIC);
console.log(PROJECT_ID);
console.log(INFURA_KEY);



module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      networkCheckTimeout: 90000,
      provider: () => new HDWalletProvider(MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 3,
      gas: 3000000,
      gasPrice: 10000000000,
      from: FROM
    },
    kovan: {
      networkCheckTimeout: 90000,
      provider: () => new HDWalletProvider(MNENOMIC, "https://kovan.infura.io/v3/" + INFURA_KEY),
      network_id: 42,
      gas: 3000000,
      gasPrice: 10000000000,
      from: FROM
    },
    rinkeby: {
      networkCheckTimeout: 90000,
      provider: () => new HDWalletProvider(MNENOMIC, "https://rinkeby.infura.io/v3/" + INFURA_KEY),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000,
      from: FROM
    },
    // main ethereum network(mainnet)
    main: {
      networkCheckTimeout: 90000,
      provider: () => new HDWalletProvider(MNENOMIC, "https://mainnet.infura.io/v3/" + INFURA_KEY),
      network_id: 1,
      gas: 3000000,
      gasPrice: 10000000000,
      from: FROM
    }
  },
  contracts_build_directory: path.join(__dirname, "./src/abis/"),
  contracts_directory: path.join(__dirname, "./src/contracts/"),
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
