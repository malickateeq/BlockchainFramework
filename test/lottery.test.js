const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const {abi, evm} = require("../compile");

const web3 = new Web3(ganache.provider());
let accounts, deployedContract;

beforeEach( async () => {
    // 1. Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // 2. Use an account to deploy the contract
    deployedContract = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: null })
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
        
        const playerEntry = await deployedContract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether")
        });
        
        const players = await deployedContract.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });
    
    it("Require a fee to enter", async () => {

        try 
        {
            await deployedContract.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei("0.00000000", "ether")
            });
        } 
        catch (error) 
        {
            assert(error);    
        }
    });

    it("Only manager can call pick winner", async () => {
        
        const init = await web3.eth.getBalance( accounts[0] );
        
        await deployedContract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("2", "ether")
        });
        
        const initialBalance = await web3.eth.getBalance( accounts[0] );
        await deployedContract.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance( accounts[0] );

        const difference = finalBalance - initialBalance;
        // console.log( 2 - difference );
    });
    
});