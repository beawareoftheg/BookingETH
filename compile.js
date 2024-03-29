const path = require('path');
const fs = require('fs');
const solc = require('solc');

const backendPath = path.resolve(__dirname, 'contracts', 'sc_backend.sol');  // full path to the Solidity contract file
const source = fs.readFileSync(backendPath, 'utf8');  // load the file content

// compile the contract, the output is an object of object with all the contracts deployed.
// The number of contract is specified after the source code
// The resulting object has several properties, the interesting onces are: Bytecode and Interface (the ABI)

console.log(solc.compile(source, 1));

module.exports = solc.compile(source, 1).contracts[':sc_backend'];

