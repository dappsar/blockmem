const Migrations = artifacts.require("Migrations");

module.exports = function(deployer, network, accounts) {
  if (network.startsWith("development")) {
    web3.eth.personal.unlockAccount(accounts[0], null, 20000);
  }

  return deployer.deploy(Migrations);

};


