// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductTracking is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public productMetadata;

    constructor() ERC721("ProductNFT", "PNFT") Ownable(msg.sender) {}

    function mintProductNFT(address recipient, string memory productInfo) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(recipient, tokenId);
        productMetadata[tokenId] = productInfo;
        nextTokenId++;
    }

    function getProductDetails(uint256 tokenId) public view returns (string memory) {
        return productMetadata[tokenId];
    }
}
