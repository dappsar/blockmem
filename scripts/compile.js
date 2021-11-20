const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');

const source = fs.readFileSync(inboxPath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};


// parses solidity to English and strings 
var output = JSON.parse(solc.compile(JSON.stringify(input)));

var outputContracts = output.contracts['inbox.sol']['Inbox']

// spits out ABI interface
exports.abi = outputContracts.abi;

// exports bytecode from smart contract
exports.bytecode = outputContracts.evm.bytecode.object;