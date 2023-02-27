// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;



interface IUniswap{
	function addLiquidity(
  		address tokenA,
  		address tokenB,
  		uint amountADesired,
  		uint amountBDesired,
  		uint amountAMin,
  		uint amountBMin,
  		address to,
  		uint deadline
	) external returns (uint amountA, uint amountB, uint liquidity);

}

interface IUniswapFactory {
	function getPair(address tokenA, address tokenB) external view returns (address pair);
    function createPair(address tokenA, address tokenB) external returns (address pair);
	function createPool(
        address tokenA,
        address tokenB,
        uint24 fee
    ) external returns (address pool);
}