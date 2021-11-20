const HDWalletProvider = require("@truffle/hdwallet-provider");
    const Web3 = require('web3');
    const {abi, bytecode} = require('./compile');
    
    const provider = new HDWalletProvider(
        'my mnemonic phrase',
        'https://rinkeby.infura.io/v3/myKey'
    );
    
    // instantiate with hdwallet
    const web3 = new Web3(provider);
    
    
    const deploy = async () => {
    
          // get list of all accounts
          const accounts = await web3.eth.getAccounts();
    
          console.log('Attempting to deploy from account', accounts[0]);
    
          const result = await new web3.eth.Contract(abi)
         .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) 
         .send({from: accounts[0]}); 
    
         console.log('Contract deployed to', result.options.address);
    };


deploy();