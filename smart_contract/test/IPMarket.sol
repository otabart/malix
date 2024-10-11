// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/IPMarket.sol";

contract IPRegistrationNFTTest is Test {
    IPRegistrationNFT public nft;
    address public deployer;
    address public user1;
    address public user2;
    uint256 public constant REGISTRATION_FEE = 0.1 ether;

    function setUp() public {
        deployer = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        // Deploy the contract
        nft = new IPRegistrationNFT();
        nft.initialize("TokenIP", "TIP", REGISTRATION_FEE, deployer);
    }

    function testInitialization() public {
        assertEq(nft.name(), "TokenIP");
        assertEq(nft.symbol(), "TIP");
        assertEq(nft.registrationFee(), REGISTRATION_FEE);
        assertEq(nft.feeRecipient(), deployer);
    }

    function testRegisterIP() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        
        uint256 tokenId = nft.registerIP{value: REGISTRATION_FEE}("Test IP", "This is a test IP", "QmTest");
        
        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(tokenId), user1);
        
        IPRegistrationNFT.IPMetadata memory metadata = nft.getIPMetadata(tokenId);
        assertEq(metadata.title, "Test IP");
        assertEq(metadata.description, "This is a test IP");
        assertEq(metadata.ipfsHash, "QmTest");
    }

    function testSequentialTokenIds() public {
        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        
        uint256 tokenId1 = nft.registerIP{value: REGISTRATION_FEE}("Test IP 1", "This is test IP 1", "QmTest1");
        uint256 tokenId2 = nft.registerIP{value: REGISTRATION_FEE}("Test IP 2", "This is test IP 2", "QmTest2");
        uint256 tokenId3 = nft.registerIP{value: REGISTRATION_FEE}("Test IP 3", "This is test IP 3", "QmTest3");
        
        assertEq(tokenId1, 1);
        assertEq(tokenId2, 2);
        assertEq(tokenId3, 3);
        
        vm.stopPrank();
    }

    function testCannotRegisterWithInsufficientFee() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        
        vm.expectRevert("Insufficient registration fee");
        nft.registerIP{value: REGISTRATION_FEE - 1 wei}("Test IP", "This is a test IP", "QmTest");
    }

    function testCannotRegisterEmptyIPFSHash() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        
        vm.expectRevert("IPFS hash already used");
        nft.registerIP{value: REGISTRATION_FEE}("Test IP", "This is a test IP", "");
    }

    function testUpdateIPMetadata() public {
        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        
        uint256 tokenId = nft.registerIP{value: REGISTRATION_FEE}("Test IP", "This is a test IP", "QmTest");
        
        nft.updateIPMetadata(tokenId, "Updated IP", "This is an updated test IP", "QmTestUpdated");
        
        IPRegistrationNFT.IPMetadata memory metadata = nft.getIPMetadata(tokenId);
        assertEq(metadata.title, "Updated IP");
        assertEq(metadata.description, "This is an updated test IP");
        assertEq(metadata.ipfsHash, "QmTestUpdated");
        
        vm.stopPrank();
    }

    function testCannotUpdateOthersIP() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        uint256 tokenId = nft.registerIP{value: REGISTRATION_FEE}("Test IP", "This is a test IP", "QmTest");
        
        vm.prank(user2);
        vm.expectRevert("Only the owner can update metadata");
        nft.updateIPMetadata(tokenId, "Updated IP", "This is an updated test IP", "QmTestUpdated");
    }

    function testEnumeration() public {
        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        
        uint256 tokenId1 = nft.registerIP{value: REGISTRATION_FEE}("Test IP 1", "This is test IP 1", "QmTest1");
        uint256 tokenId2 = nft.registerIP{value: REGISTRATION_FEE}("Test IP 2", "This is test IP 2", "QmTest2");
        
        assertEq(nft.totalSupply(), 2);
        assertEq(nft.tokenOfOwnerByIndex(user1, 0), tokenId1);
        assertEq(nft.tokenOfOwnerByIndex(user1, 1), tokenId2);
        
        vm.stopPrank();
    }

    function testTokenURI() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        uint256 tokenId = nft.registerIP{value: REGISTRATION_FEE}("Test IP", "This is a test IP", "QmTest");
        
        assertEq(nft.tokenURI(tokenId), "QmTest");
    }

    function testTokenIdStartsAtOne() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        uint256 firstTokenId = nft.registerIP{value: REGISTRATION_FEE}("First IP", "This is the first IP", "QmFirst");
        assertEq(firstTokenId, 1);
    }

    function testFeeTransfer() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        nft.registerIP{value: REGISTRATION_FEE}("Test IP", "This is a test IP", "QmTest");

        assertEq(deployer.balance, REGISTRATION_FEE);
    }

    receive() external payable {}
}