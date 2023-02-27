// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/ListToken.sol";

contract ListTokenScript is Script {
	ListToken list;

	function run() public {
		uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
		vm.startBroadcast(deployerPrivateKey);

		list  = new ListToken();
		address pair = list.createPair(0xdcAb8c1158c187CbBB09bF7f65262FFaE370A666, 0x925B1cE4a9Ac1ad02B662b7b5765Ab90874e197f);
		console.log( pair, "list and pair address");
		console.log(address(list), "list contract address");
		vm.stopBroadcast();
	}

}