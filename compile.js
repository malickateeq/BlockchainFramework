// We can't "require" non-js code here. Node will throw error
// So we will be directly scanning the code from contracts/.sol files

const solc = require("solc");
const path = require("path");
const fs = require("fs");

const contractPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(contractPath, "utf8");

const compiled = solc.compile(source, 1);
module.exports = compiled.contracts[":Lottery"];