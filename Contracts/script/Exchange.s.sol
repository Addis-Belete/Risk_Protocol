// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Exchange.sol";
contract ExchangeScript is Script {
	Exchange exchange;
	function run() public {
		uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
		vm.startBroadcast(deployerPrivateKey);
        exchange = new Exchange(0x35F21a47a19C7B634B534936dF505C7D92f07D8c, 0xb505D25720c37dF4c85919FCbECE8712272F7eF3);

		console.log(address(exchange), "exchang address");
		vm.stopBroadcast();
	}

}