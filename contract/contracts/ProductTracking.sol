// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductTracking is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public productMetadata;

    event ProductMinted(uint256 indexed tokenId, address indexed recipient, string productInfo);
    event ProductUpdated(uint256 indexed tokenId, string newProductInfo);
    event ProductTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor() ERC721("ProductNFT", "PNFT") Ownable(msg.sender) {}

    function mintProductNFT(address recipient, string memory productInfo) public onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId;
        _safeMint(recipient, tokenId);
        productMetadata[tokenId] = productInfo;

        emit ProductMinted(tokenId, recipient, productInfo);
        nextTokenId++;
        return tokenId;
    }

function getProductDetails(uint256 tokenId) public view returns (string memory, address) {
    require(_ownerOf(tokenId) != address(0), "Token does not exist");
    return (productMetadata[tokenId], ownerOf(tokenId));
}


    function updateProductNFT(uint256 tokenId, string memory newProductInfo) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        productMetadata[tokenId] = newProductInfo;

        emit ProductUpdated(tokenId, newProductInfo);
    }

    function transferProductNFT(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        _safeTransfer(msg.sender, to, tokenId, "");

        emit ProductTransferred(tokenId, msg.sender, to);
    }

    // ✅ Custom public function to check token existence
    function _existsPublic(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}
