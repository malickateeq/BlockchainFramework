// We can't "require" non-js code here. Node will throw error
// So we will be directly scanning the code from contracts/.sol files

const solc = require("solc");
const path = require("path");
const fs = require("fs");

const InboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(InboxPath, "utf8");

const compiled = solc.compile(source, 1);
module.exports = compiled.contracts[":Inbox"];