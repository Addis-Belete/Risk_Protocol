// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./IUniswap.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
contract ListToken {
	address routerAddress = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
	address factoryAddress = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

	IUniswap add = IUniswap(routerAddress);
	IUniswapFactory createP = IUniswapFactory(factoryAddress);

	function createPair(address tokenA, address tokenB) external returns(address pair) {
		pair  = createP.createPair(tokenA, tokenB);
	}

	function addLiquidity(address tokenA, address tokenB, uint256 tokenAmount, uint256 tokenBAmount) external {
		IERC20(tokenA).transferFrom(msg.sender, address(this), tokenAmount);
		IERC20(tokenB).transferFrom(msg.sender, address(this), tokenBAmount);

		IERC20(tokenA).approve(routerAddress, tokenAmount);
		IERC20(tokenB).approve(routerAddress, tokenBAmount);

		add.addLiquidity(tokenA, tokenB, tokenAmount, tokenBAmount, 0, 0, msg.sender, block.timestamp + 5 minutes);

	}


}