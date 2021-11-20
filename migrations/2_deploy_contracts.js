const MemoryToken = artifacts.require("MemoryToken");
const MOCK = false;


module.exports = async (deployer, network, accounts) => {

  // unlock account
  if (network.startsWith("development")) {
    web3.eth.personal.unlockAccount(accounts[0], null, 36000);
  }

  // Se puede usar async/await, pero dentro de un primer then, por issue 713
  // https://github.com/trufflesuite/truffle/issues/713
  deployer.then(async () => {
    console.log('\n***** Deploying contracts begin *****\n');

    await deployer.deploy(MemoryToken);
    memoryTokenInstance = await MemoryToken.deployed();

    console.log('\n***** Deploying contracts end *****\n');

  }).then(async () => {
    await Mock(deployer, network, accounts);
  });

};

Mock = async (deployer, network, accounts) => {
  if (!MOCK) return;

};