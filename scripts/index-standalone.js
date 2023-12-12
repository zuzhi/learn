// scripts/index-standalone.js
//
// Run example:
// $ HARDHAT_NETWORK=localhost node scripts/index-standalone.js 0x0165878A594ca255338adfa4d48449f69242Eb8F
//
const hre = require("hardhat");

async function main () {
  await hre.run("compile");

  // Retrieve accounts from the local node
  const accounts = await hre.ethers.provider.listAccounts();
  console.log(accounts);

  // Set up an ethers contract, representing our deployed Box instance
  const [address] = process.argv.slice(2);
  if (!address) {
    console.error('Please provide the contract address as a command line argument.');
    return;
  }

  const Box = await hre.ethers.getContractFactory('Box');
  const box = await Box.attach(address);

  // Send a transaction to store() a new value in the Box
  const storeTx = await box.store(23);
  console.log('Store Transaction Hash:', storeTx.hash);

  // Wait for the transaction to be mined
  const receipt = await storeTx.wait();

  // Check if the transaction was successful
  if (receipt.status === 1) {
    // Call the retrieve() function of the deployed Box contract
    const value = await box.retrieve();
    console.log('Box value is', value.toString());
  } else {
    console.error('Transaction failed');
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
