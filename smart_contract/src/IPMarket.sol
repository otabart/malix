// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract IPRegistrationNFT is 
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    ERC721EnumerableUpgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable
{

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct IPMetadata {
        string title;
        string description;
        uint256 creationDate;
        string ipfsHash;
        bool isVerified;
    }

    uint256 private _nextTokenId;
    mapping(uint256 => IPMetadata) private _ipMetadata;
    mapping(string => bool) private _usedIPFSHashes;

    uint256 public registrationFee;
    address public feeRecipient;

    event IPRegistered(uint256 indexed tokenId, address indexed owner, string title, uint256 creationDate);
    event IPMetadataUpdated(uint256 indexed tokenId, string title, string description, string ipfsHash);
    event IPVerificationStatusChanged(uint256 indexed tokenId, bool isVerified);
    event RegistrationFeeUpdated(uint256 newFee);
    event FeeRecipientUpdated(address newRecipient);

   /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory name, 
        string memory symbol,
        uint256 initialFee,
        address initialFeeRecipient
    ) public initializer {
        __ERC721_init(name, symbol);
        __ERC721URIStorage_init();
        __ERC721Enumerable_init();
        __AccessControl_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);

        registrationFee = initialFee;
        feeRecipient = initialFeeRecipient;
        _nextTokenId = 1; // Start token IDs at 1
    }

    function registerIP(
        string memory title,
        string memory description,
        string memory ipfsHash
    ) 
        public
        payable
        whenNotPaused
        nonReentrant
        returns (uint256)
    {
        require(msg.value >= registrationFee, "Insufficient registration fee");
        require(!_usedIPFSHashes[ipfsHash], "IPFS hash already used");

        uint256 newTokenId = _nextTokenId;
        unchecked {
            _nextTokenId++;
        }
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, ipfsHash);
        
        _ipMetadata[newTokenId] = IPMetadata({
            title: title,
            description: description,
            creationDate: block.timestamp,
            ipfsHash: ipfsHash,
            isVerified: false
        });

        _usedIPFSHashes[ipfsHash] = true;

        emit IPRegistered(newTokenId, msg.sender, title, block.timestamp);

        // Transfer the registration fee
        (bool sent, ) = feeRecipient.call{value: msg.value}("");
        require(sent, "Failed to send registration fee");
        
        return newTokenId;
    }

    function getIPMetadata(uint256 tokenId) public view returns (IPMetadata memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _ipMetadata[tokenId];
    }

    function updateIPMetadata(
        uint256 tokenId,
        string memory title,
        string memory description,
        string memory ipfsHash
    ) 
        public
        whenNotPaused
    {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can update metadata");
        require(!_usedIPFSHashes[ipfsHash] || keccak256(bytes(_ipMetadata[tokenId].ipfsHash)) == keccak256(bytes(ipfsHash)), "IPFS hash already used");
        
        IPMetadata storage metadata = _ipMetadata[tokenId];
        metadata.title = title;
        metadata.description = description;

        if (keccak256(bytes(metadata.ipfsHash)) != keccak256(bytes(ipfsHash))) {
            _usedIPFSHashes[metadata.ipfsHash] = false;
            _usedIPFSHashes[ipfsHash] = true;
            metadata.ipfsHash = ipfsHash;
            _setTokenURI(tokenId, ipfsHash);
        }

        emit IPMetadataUpdated(tokenId, title, description, ipfsHash);
    }

    function verifyIP(uint256 tokenId, bool verificationStatus) public onlyRole(ADMIN_ROLE) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        _ipMetadata[tokenId].isVerified = verificationStatus;
        emit IPVerificationStatusChanged(tokenId, verificationStatus);
    }

    function setRegistrationFee(uint256 newFee) public onlyRole(ADMIN_ROLE) {
        registrationFee = newFee;
        emit RegistrationFeeUpdated(newFee);
    }

    function setFeeRecipient(address newRecipient) public onlyRole(ADMIN_ROLE) {
        require(newRecipient != address(0), "Invalid fee recipient");
        feeRecipient = newRecipient;
        emit FeeRecipientUpdated(newRecipient);
    }

    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    function _update(
        address to, 
        uint256 tokenId, 
        address auth)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (address)
    {
        address from = _ownerOf(tokenId);
        address result = super._update(to, tokenId, auth);
        if (from != to && !paused()) {
            // Implement any additional logic you need here
        }
        return result;
    }

    function _increaseBalance(address account, uint128 amount)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._increaseBalance(account, amount);
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
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}