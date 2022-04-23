const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('minttreesNFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Basic test - just to be sure we are able to mint as expected
  let overrides = { value: ethers.utils.parseEther("0.0001") }
  let txn = await nftContract.minttree(1, overrides);
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
