// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./IOx.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
contract Exchange {

IExchange exchange = IExchange(0xF471D32cb40837bf24529FCF17418fC1a4807626);
IERC20 internal makerToken;
IERC20 internal takerToken;

	constructor(address _makerToken, address _takerToken){
		makerToken = IERC20(_makerToken);
		takerToken = IERC20(_takerToken);


	}
function fillOrder(IExchange.LimitOrder calldata order, uint128 takerAssetAmount,IExchange.Signature calldata signature) external payable returns (uint128 makerTokenFillAmount) {


	//fillResults = exchange.fillOrder(order, takerAssetFillAmount, signature);
	takerToken.transferFrom(msg.sender, address(this), takerAssetAmount);
	takerToken.approve(address(exchange), takerAssetAmount);
	makerTokenFillAmount = exchange.fillLimitOrder(order, signature, takerAssetAmount);

	
		require(makerToken.transfer(msg.sender, makerTokenFillAmount), "transfer failed");

	


}

}