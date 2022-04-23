# Mint Trees

## The Story

Alice wants to buy a fancy NFT.  Alice needs some more ETH and chooses ecoSwap a project, planting a tree for every transaction executed on their platform, to swap USCD for ETH. 🌳

Alice can mint her cute cat. Guess what, cute cats plant a tree for every mint. 🌳

Alice is stoked about her new cat. She would like to let everyone know that she is now a cute cat as well. Alice changed her profile pic and posts about her cat on ecoLens, a web3 social media project rewarding users with mintable trees (resolving in planted trees).

Alice is lucky her post was the 100th -> she got a notification, that ecoLens rewards her with 10 trees on minttrees.xyz. 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳

1 cute cat + 10 + 2 trees, what a day. 

Alice informed herself about the planting tree partners mint trees works with. 

Alice, still on minttrees.xyz, would like to help decarbonising the world a bit more and plants another 100 trees with some of her remaining USDC.

-> Integrate mint trees into your project.
-> Join the mint trees DAO

## Create a file called .env in the root project directory

```
STAGING_ALCHEMY_KEY="https://eth-rinkeby.alchemyapi.io/v2/XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
PROD_ALCHEMY_KEY=""
PRIVATE_KEY="XXXXXXXXXXXXXXXX YOUR KEY HERE XXXXXXXXXXXXXXXXXXXX"
MUMBAI_ALCHEMY_KEY=""
MUMBAI_PRIVATE_KEY=""
POLYGON_ALCHEMY_KEY=""
ETHERSCAN_URL="https://api-rinkeby.etherscan.io"
ETHERSCAN_KEY=""
```

## NOTES
After deploying a new contract
 * update contract address in `web-react/src/App.js`.
 * cp artifacts/contracts/minttreesNFT.sol/minttreesNFT.json web-react/src/utils/minttreesNFT.json


### Originally developed as a started project for DevConnect Amsterdam 2022
