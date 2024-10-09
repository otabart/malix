// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/IPMarket.sol";

contract IPRegistrationNFTTest is Test {
    IPRegistrationNFT public nft;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        // Deploy the contract
        nft = new IPRegistrationNFT();
        nft.initialize("TokenIP", "TIP", 0, address(this));
    }

    function testInitialization() public {
        assertEq(nft.name(), "TokenIP");
        assertEq(nft.symbol(), "TIP");
        assertTrue(nft.hasRole(nft.DEFAULT_ADMIN_ROLE(), address(this)));
    }

    function testRegisterIP() public {
        vm.startPrank(user1);
        
        uint256 tokenId = nft.registerIP("Test IP", "This is a test IP", "QmTest");
        
        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(tokenId), user1);
        
        IPRegistrationNFT.IPMetadata memory metadata = nft.getIPMetadata(tokenId);
        assertEq(metadata.title, "Test IP");
        assertEq(metadata.description, "This is a test IP");
        assertEq(metadata.ipfsHash, "QmTest");
        
        vm.stopPrank();
    }

    function testSequentialTokenIds() public {
        vm.startPrank(user1);
        
        uint256 tokenId1 = nft.registerIP("Test IP 1", "This is test IP 1", "QmTest1");
        uint256 tokenId2 = nft.registerIP("Test IP 2", "This is test IP 2", "QmTest2");
        uint256 tokenId3 = nft.registerIP("Test IP 3", "This is test IP 3", "QmTest3");
        
        assertEq(tokenId1, 1);
        assertEq(tokenId2, 2);
        assertEq(tokenId3, 3);
        
        vm.stopPrank();
    }

    function testCannotRegisterEmptyTitle() public {
        vm.prank(user1);
        
        vm.expectRevert("Title cannot be empty");
        nft.registerIP("", "This is a test IP", "QmTest");
        
    }

    function testCannotRegisterEmptyIPFSHash() public {
        vm.prank(user1);
        
        vm.expectRevert("IPFS hash cannot be empty");
        nft.registerIP("Test IP", "This is a test IP", "");
        
    }

    function testUpdateIPMetadata() public {
        vm.startPrank(user1);
        
        uint256 tokenId = nft.registerIP("Test IP", "This is a test IP", "QmTest");
        
        nft.updateIPMetadata(tokenId, "Updated IP", "This is an updated test IP", "QmTestUpdated");
        
        IPRegistrationNFT.IPMetadata memory metadata = nft.getIPMetadata(tokenId);
        assertEq(metadata.title, "Updated IP");
        assertEq(metadata.description, "This is an updated test IP");
        assertEq(metadata.ipfsHash, "QmTestUpdated");
        
        vm.stopPrank();
    }

    function testCannotUpdateOthersIP() public {
        vm.prank(user1);
        uint256 tokenId = nft.registerIP("Test IP", "This is a test IP", "QmTest");
        
        vm.prank(user2);
        vm.expectRevert("Caller is not owner nor approved");
        nft.updateIPMetadata(tokenId, "Updated IP", "This is an updated test IP", "QmTestUpdated");
    }

    function testPauseAndUnpause() public {
        nft.pause();
        assertTrue(nft.paused());
        
        vm.expectRevert("Pausable: paused");
        vm.prank(user1);
        nft.registerIP("Test IP", "This is a test IP", "QmTest");
        
        nft.unpause();
        assertFalse(nft.paused());
        
        vm.prank(user1);
        uint256 tokenId = nft.registerIP("Test IP", "This is a test IP", "QmTest");
        assertEq(tokenId, 1);
    }

    function testOnlyAdminCanPauseAndUnpause() public {
        vm.prank(user1);
        vm.expectRevert("AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775");
        nft.pause();
        
        vm.prank(user1);
        vm.expectRevert("AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775");
        nft.unpause();
    }

    function testEnumeration() public {
        vm.startPrank(user1);
        
        uint256 tokenId1 = nft.registerIP("Test IP 1", "This is test IP 1", "QmTest1");
        uint256 tokenId2 = nft.registerIP("Test IP 2", "This is test IP 2", "QmTest2");
        
        assertEq(nft.totalSupply(), 2);
        assertEq(nft.tokenOfOwnerByIndex(user1, 0), tokenId1);
        assertEq(nft.tokenOfOwnerByIndex(user1, 1), tokenId2);
        
        vm.stopPrank();
    }

    function testTokenURI() public {
        vm.prank(user1);
        uint256 tokenId = nft.registerIP("Test IP", "This is a test IP", "QmTest");
        
        assertEq(nft.tokenURI(tokenId), "QmTest");
    }

    function testTokenIdStartsAtOne() public {
        vm.prank(user1);
        uint256 firstTokenId = nft.registerIP("First IP", "This is the first IP", "QmFirst");
        assertEq(firstTokenId, 1);
    }

   function testRegistrationFee() public {
    uint256 fee = 0.1 ether;
    nft.setRegistrationFee(fee);

    vm.deal(user1, 1 ether);
    vm.prank(user1);
    uint256 tokenId = nft.registerIP{value: fee}("Test IP", "This is a test IP", "QmTest");

    assertEq(tokenId, 1);
    assertEq(address(nft.feeRecipient()).balance, fee);
   }

   function testSetFeeRecipient() public {
    address newRecipient = address(0x123);
    nft.setFeeRecipient(newRecipient);
    assertEq(nft.feeRecipient(), newRecipient);
   }

    receive() external payable {}
}