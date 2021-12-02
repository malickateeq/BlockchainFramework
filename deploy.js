const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    // Account Credentials and first node
    "moral student viable fault palm load snap holiday lady disease worry enlist",
    "https://rinkeby.infura.io/v3/44c6f8aafec543caba6da88f637dd014"
);

const INITIAL_STRING = "TEST MESSAGE!";
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log("Accounts: ", accounts[0] );

    const deployedContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0] });

    console.log("Deployed: ", deployedContract.options.address );
};
deploy(); 