import React, { useEffect, useState } from "react";
import './styles/App.css';
import { ethers } from "ethers";
import minttreesNFT from "./utils/minttreesNFT.json";
require('dotenv').config()

/*
const express = require('express');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

// WARN: Everytime we deploy an updated contract, we need to update this
//  AND update abi 
//  cp artifacts/contracts/minttreesNFT.sol/minttreesNFT.json web-react/src/utils/minttreesNFT.json
const CONTRACT_ADDRESS = "0x213F7d1571386788E1c088E4E3F0DD5358778D6c";

console.log(CONTRACT_ADDRESS);
const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have what we came for!", ethereum);
    }
    
    // check if we auth'd to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // user can have multi auth'd accounts; grab the first
    if (accounts.length !== 0) {
      const account = accounts[0];   //////////////////////// FIXME: NOT USED?
    } else {
      console.log("No auth'd accounts found");
    }
  }

  // connectWallet here
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" } );

      console.log("Connected", accounts[0]); 
      setCurrentAccount(accounts[0]);

      // when user comes and connects their wallet for the first time
      setupEventListener();

    } catch (error) {
      console.log(error);
    }
  }

  // Listener
  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, minttreesNFT.abi, signer);

        // capture the event when our contract throws it; like webhooks
        connectedContract.on("NewTreeMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey! NFT minted and sent to your wallet; might be blank. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
        });
      } else {
        console.log("Eth obj doesn't exist");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, minttreesNFT.abi, signer);
        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.minttree();

        console.log("Mining, please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

        console.log("Going to order a trees now");

        // Order Trees
        let body = JSON.stringify({
          test: 'true',
          number: '1',
          name: nftTxn.hash
        });
        let headers = {
          //"Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer " + process.env.REACT_APP_BEARER_AUTH,
          "Idempotency-Key": "1234567890"
        };
        console.log(body);
        
        let r = fetch(process.env.REACT_APP_API_ENDPOINT, {
          headers: headers, 
          method: 'POST',
          body: body
        });
        console.log(headers)
        console.log(r)
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Mint Trees</p>
          <p className="sub-text">
            Transact. Burn. Plant.
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint a Tree
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
