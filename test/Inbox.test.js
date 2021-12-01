
// A runtime library by Node Js to test code
const assert = require("assert");
const ganache = require("ganache-cli");
// !Important: Import uppercase Web3, which is a constructor function to create instances of web3 instances
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

