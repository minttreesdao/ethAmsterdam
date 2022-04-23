# Mint Trees

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
