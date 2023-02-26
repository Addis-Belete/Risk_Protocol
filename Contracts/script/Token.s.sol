// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Token.sol";
contract ATokenScript is Script {
	UFragments addisToken;
	
	function run() public {
		uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
		addisToken = new UFragments();
		console.log(address(addisToken), "addis Token address");
		addisToken.initialize(0xd96773e685fAB01955980404d9bB112bb1BBF558);
		vm.stopBroadcast();
	}

}