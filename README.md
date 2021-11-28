ref:
https://medium.com/coinmonks/deploy-your-smart-contract-directly-from-truffle-with-infura-ba1e1f1d40c2
https://soliditydeveloper.com/deployments

compiler:
0.5.10+commit.5a6ea5b1.js

Rinkeby with compile:
https://remix.ethereum.org/#optimize=false&runs=200&version=soljson-v0.5.10+commit.5a6ea5b1.js

Contract:
https://rinkeby.etherscan.io/address/0x0806f0185213892fed471bb7944175e88a63e3ae

curl https://rinkeby.infura.io/v3/da4aca0cc4054f1eb4df269eda8565a0 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}'

faucet rikeby:
https://www.rinkeby.io/#faucet

truffle migrate --network rinkeby
truffle migrate --reset --network rinkeby

ganache-cli \
 --account="0x0000000000000000000000000000000000000000000000000000000000000001, 2471238800000000000" \
 --account="0x0000000000000000000000000000000000000000000000000000000000000002, 4471238800000000000" \
 --unlock "0x0000000000000000000000000000000000000000000000000000000000000001" \
 --unlock "0x0000000000000000000000000000000000000000000000000000000000000002" \
 --blockTime 0 \
 --port 8545 \
 --hostname localhost \
 --seed 'blah' \
 --debug true \
 --mem true \
 --mnemonic 'something' \
 --db './db/chain_database' \
 --verbose \
 --networkId=3 \
 --gasLimit=7984452 \
 --gasPrice=20000000000;
