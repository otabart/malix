// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

contract IPRegistrationNFT is 
    Initializable, 
    ERC721Upgradeable, 
    ERC721URIStorageUpgradeable, 
    ERC721EnumerableUpgradeable, 
    OwnableUpgradeable, 
    ReentrancyGuardUpgradeable,
    PausableUpgradeable
{
    uint256 private _nextTokenId;
    struct IPMetadata {
        string title;
        string description;
        uint256 creationDate;
        string ipfsHash;
    }

    mapping(uint256 => IPMetadata) private _ipMetadata;

    event IPRegistered(uint256 indexed tokenId, address indexed owner, string title, string ipfsHash);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC721_init("TokenIP", "TIP");
        __ERC721URIStorage_init();
        __ERC721Enumerable_init();
        __Ownable_init_unchained();
        __ReentrancyGuard_init();
        __Pausable_init();
        _nextTokenId = 1;
    }

    function registerIP(
        string memory title,
        string memory description,
        string memory ipfsHash
    ) public whenNotPaused nonReentrant returns (uint256) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        
        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, ipfsHash);

        _ipMetadata[newTokenId] = IPMetadata({
            title: title,
            description: description,
            creationDate: block.timestamp,
            ipfsHash: ipfsHash
        });

        emit IPRegistered(newTokenId, msg.sender, title, ipfsHash);

        return newTokenId;
    }

    function getIPMetadata(uint256 tokenId) public view returns (IPMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        return _ipMetadata[tokenId];
    }

    function updateIPMetadata(
        uint256 tokenId,
        string memory newTitle,
        string memory newDescription,
        string memory newIpfsHash
    ) public whenNotPaused {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == _msgSender() || isApprovedForAll(ownerOf(tokenId), _msgSender()), "Caller is not owner nor approved");
        require(bytes(newTitle).length > 0, "New title cannot be empty");
        require(bytes(newIpfsHash).length > 0, "New IPFS hash cannot be empty");

        _ipMetadata[tokenId].title = newTitle;
        _ipMetadata[tokenId].description = newDescription;
        _ipMetadata[tokenId].ipfsHash = newIpfsHash;

        _setTokenURI(tokenId, newIpfsHash);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        ERC721EnumerableUpgradeable._beforeTokenTransfer(from, to, tokenId, batchSize);
        ERC721URIStorageUpgradeable._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

        override(ERC721Upgradeable, ERC721URIStorageUpgradeable, ERC721EnumerableUpgradeable)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
    return _ownerOf(tokenId) != address(0);
    }

    
}