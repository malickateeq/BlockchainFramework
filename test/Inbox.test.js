
// A runtime library by Node Js to test code
const assert = require("assert");
const ganache = require("ganache-cli");
// !Important: Import uppercase Web3, which is a constructor function to create instances of web3 instances
const Web3 = require("web3");

// Import contract
const {interface, bytecode} = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts, inbox;
const INITIAL_STRING = "Hi there!"
beforeEach( async () => {
    // 1. Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // 2. Use an account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });

    // 3. 
});

// console.log(inbox.options.address);

describe("contracts", () => 
{
    it("Contract deployed", () => {
        assert.ok(inbox.options.address);
    });

    it("Contract has default value", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });
    
    it("Contract can set message", async () => {
        const transactionReceipt = await inbox.methods.setMessage("How are you dear!").send({ from: accounts[0]});
        const message = await inbox.methods.getMessage().call();
        console.log(transactionReceipt, message);
    });
    
});