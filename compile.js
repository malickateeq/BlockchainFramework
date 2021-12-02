// We can't "require" non-js code here. Node will throw error
// So we will be directly scanning the code from contracts/.sol files

const solc = require("solc");
const path = require("path");
const fs = require("fs");

const contractPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(contractPath, "utf8");

var sourceInput = {
    language: 'Solidity',
    sources: {
        'test.sol': {
            content: source,
        }
    },
    settings: 
    {
        outputSelection: {
            '*': { '*': ['*'] }
        }
    }
};
var compiled = JSON.parse(solc.compile(JSON.stringify(sourceInput)));
// for (var contractName in output.contracts['test.sol']) 
// {
//     console.log(
//       contractName +
//         ': ' +
//         output.contracts['test.sol'][contractName].evm.bytecode.object
//     );
// }

module.exports = compiled.contracts["test.sol"]["Lottery"];