// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Base64.sol";

contract minttreesNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string treeSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' width='31.279' height='31.279' viewBox='0 0 31.279 31.279' style='enable-background:new 0 0 31.279 31.279' xml:space='preserve'><path d='M8.498 4.775 6.384 3.504l3.115-.042V.701L4.943 2.47l-.929 1.6 3.075 1.346H3.182c-.193 0-.386 3.203-.386 3.203h3.716l1.986-3.844zm.628 7.065L5.603 9.418H2.881l4.004 3.318zm14.617.302 1.474.705-2.113-.256.768-1.987 4.611-.32-1.921-3.266-3.586 2.627-3.396-1.026-3.393 1.985-3.845-.128-.193 1.729 2.563.994-.257.993-1.985-.64-3.203-1.347-1.282.705v2.179l1.987 1.345h3.746l.394 10.082-3.08 1.695.008.506H3.827v2.562h22.608v-2.562h-6.809l.005-1.156-3.517-.993.033-10.191 1.127-2.506-1.313-1.641 3.685.167-1.643 1.562 1.896.072 2.435-.929 1.722 1.482 3.804-.022.325-3.583-4.12.138z'/><path d='m17.178 16.41 1.921 1.731 4.334-.971v-2.49h-5.575zm1.458-11.751-.145 2.871 1.09.407 1.666-2.499.191-4.762-3.205-.517-2.4 3.624zm2.802 1.91v1.729h1.793l3.204-2.691-3.204-3.394-.897.85.128 2.193z'/><path d='m9.595 5.256-.584 1.12.848.642-.271.961-1.603-.545-1.12 1.984 2.634 1.893 1.945-.766.727-2.247.746.321v.704l3.975-.255.636-1.795V5.289l-3.073-.963 1.026-1.455L16.729.899 14.783.035 10.651 0l-.047 3.958 3.307 1.97-.994.448z'/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>";
    string NFTname = "mint trees";
    string description = "every NFT - minted tree enables one tree planted";
    string treePlantingProject = "https://www.edenprojects.org/ via Ecologi";
    string numberTrees = "1";

    event NewTreeMinted(address sender, uint256 tokenId);

    constructor() ERC721("treeNFT", "tree") {
        console.log("trees minted. A M A Z I N G !");
    }

    function minttree() public {
        uint256 newItemId = _tokenIds.current();

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        NFTname,
                        '", "description": "',
                        description,
                        '", "tree planting project": "',
                        treePlantingProject,
                        '", "trees planted": "',
                        numberTrees,
                        '", "image": "data:image/svg+xml;base64,',
                        // data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(treeSvg)),
                        '"}'
                    )
                )
            )
        );

        // Just like before, we prepend data:application/json;base64, to our data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, newItemId);

        // Update your URI!
        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

        emit NewTreeMinted(msg.sender, newItemId);
    }
}
