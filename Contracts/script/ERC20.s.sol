// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/ERC20.sol";
contract TokenScript is Script {
	Token usdc;
	Token WETH;
	function run() public {
		uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
		usdc = new Token("USD Coin", "USDC");
		WETH = new Token("Wrapped Eth", "WETH");
		console.log(address(usdc), "USDC address");
		console.log(address(WETH), "WETH address");
		vm.stopBroadcast();
	}

}