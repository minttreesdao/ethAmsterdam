const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('minttreesNFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Basic test - just to be sure we are able to mint as expected
  
  // Call the function.
  let txn = await nftContract.minttree()
  // Wait for it to be mined.
  await txn.wait()
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
