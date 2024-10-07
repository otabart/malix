// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/IPRegistrationNFT.sol";

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
        nft.initialize();
    }

    function testInitialization() public {
        assertEq(nft.name(), "TokenIP");
        assertEq(nft.symbol(), "TIP");
        assertEq(nft.owner(), owner);
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

    function testCannotRegisterEmptyTitle() public {
        vm.startPrank(user1);
        
        vm.expectRevert("Title cannot be empty");
        nft.registerIP("", "This is a test IP", "QmTest");
        
        vm.stopPrank();
    }

    function testCannotRegisterEmptyIPFSHash() public {
        vm.startPrank(user1);
        
        vm.expectRevert("IPFS hash cannot be empty");
        nft.registerIP("Test IP", "This is a test IP", "");
        
        vm.stopPrank();
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

    function testOnlyOwnerCanPauseAndUnpause() public {
        vm.prank(user1);
        vm.expectRevert("Ownable: caller is not the owner");
        nft.pause();
        
        vm.prank(user1);
        vm.expectRevert("Ownable: caller is not the owner");
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

    receive() external payable {}
}