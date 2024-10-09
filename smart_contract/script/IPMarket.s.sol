// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {IPRegistrationNFT} from "../src/IPMarket.sol";

contract DeployIPRegistrationNFT is Script {
    IPRegistrationNFT public ipRegistrationNFT;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        console.log("Deploying IPRegistrationNFT contract from:", deployerAddress);

        vm.startBroadcast(deployerPrivateKey);

        ipRegistrationNFT = new IPRegistrationNFT();

        string memory name = "IP Registration NFT";
        string memory symbol = "IPREG";
        uint256 initialFee = 0.0000001 ether;
        address feeRecipient = deployerAddress;

        ipRegistrationNFT.initialize(name, symbol,initialFee, feeRecipient);

        vm.stopBroadcast();

        console.log("IPRegistrationNFT deployed to:", address(ipRegistrationNFT));
        console.log("Name:", name);
        console.log("Symbol:", symbol);
        console.log("Initial Registration Fee:", initialFee);
        console.log("Fee recipient:", feeRecipient);
    }
}