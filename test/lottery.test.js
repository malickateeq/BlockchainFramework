const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const {interface, bytecode} = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts, deployedContract;

beforeEach( async () => {
    // 1. Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // 2. Use an account to deploy the contract
    deployedContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: null })
        .send({ from: accounts[0], gas: '1000000' });

});

// console.log(deployedContract.options.address);

describe("contracts", () => 
{
    it("Contract deployed", async () => {
        assert.ok(deployedContract.options.address);
        // const manager = await deployedContract.methods.manager().call();
    });

    it("Contract can enter a player", async () => {
        const playerEntry = await deployedContract.methods.enter().call();
    });
    
    // it("Contract can set message", async () => {
    //     const transactionReceipt = await deployedContract.methods.setMessage("How are you dear!").send({ from: accounts[0]});
    //     const message = await deployedContract.methods.getMessage().call();
    //     console.log(transactionReceipt, message);
    // });
    
});