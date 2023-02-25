//import utils from "@0x/protocol-utils";
import { ContractWrappers, ERC20TokenContract } from "@0x/contract-wrappers";
const { BigNumber } = require("@0x/utils");
const {
  getContractAddressesForChainOrThrow,
} = require("@0x/contract-addresses");
import { providerUtils } from "@0x/utils";
const {
  MetamaskSubprovider,
  RPCSubprovider,
  Web3ProviderEngine,
} = require("@0x/subproviders");
const { ethers } = require("ethers");
import TokenABI from "../../Contracts/out/ERC20.sol/Token.json";
const utils = require("@0x/protocol-utils");
import { Web3Wrapper } from "@0x/web3-wrapper";

let makerToken: string = "0x5dd7be3badc927a2dc355a276b7f6a3420550c96"; // usdc address
let takerToken: string = "0x6deef5155d778b3a82b8ca91d9e493e0c27eef3f"; // weth address
const NULL_ADDRESS: string = "0x0000000000000000000000000000000000000000";
declare let window: any;


const TX_DEFAULTS = { gas: 500000, gasPrice: 20e9 };

// create limit order
export async function listToken() {
  const addresses = getContractAddressesForChainOrThrow(80001);
  console.log(addresses);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  console.log(accounts);
  const signer = await provider.getSigner();

  const USDCToken = new ethers.Contract(makerToken, TokenABI.abi, provider);
/** 
  await USDCToken.connect(signer).approve(
    addresses.exchangeProxy,
    "5000000000000000000"
  );
*/
  // Use first selected Metamask account
  const maker = accounts[0];
  
  const order = new utils.LimitOrder({
    makerToken: makerToken,
    takerToken: takerToken,
    makerAmount: new BigNumber(5),
    takerAmount: new BigNumber(5),
    maker: maker,
    sender: NULL_ADDRESS,
    expiry: new BigNumber(getFutureExpiryInSeconds()),
    salt: new BigNumber(Date.now()),
    chainId: 80001,
    verifyingContract: addresses.exchangeProxy,
  });

  const supportedProvider = new MetamaskSubprovider(
    window.web3.currentProvider
  );

  const signature = await order.getSignatureWithProviderAsync(
    supportedProvider,
    utils.SignatureType.EIP712 // Optional
  );
  console.log(`Signature: ${JSON.stringify(signature, undefined, 2)}`);
	
  const signedOrder = { ...order, signature };
	console.log(signedOrder);
  let orders = [];
  orders.push(signedOrder);

  orders = orders.concat(JSON.parse(window.localStorage.getItem("orderss")) || []);
  window.localStorage.setItem("orderss", JSON.stringify(orders));
	
  
}



// Fill limit order


export async function buyTokens() {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  console.log(accounts);
  const signer = await provider.getSigner();

  const WETHToken = new ethers.Contract(takerToken, TokenABI.abi, provider);

  //let amount = ethers.utils.parseEther("200")

  // Approve
  const addresses = getContractAddressesForChainOrThrow(80001);
  console.log(addresses);
  let order1 = window.localStorage.getItem("orderss");

  const web3Wrapper = new Web3Wrapper(determineProvider());

  let orders = JSON.parse(`${order1}`);
console.log(orders,"orders from buy token")
/** 
  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(5), 18);
  // the amount the maker wants of taker asset
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(5), 18);
  console.log(takerAssetAmount.toString());
  console.log(makerAssetAmount.toString());
  await WETHToken.connect(signer).approve(
    addresses.exchangeProxy,
    "5000000000000000000"
  );
  console.log(orders.takerAmount);
  const order = new utils.LimitOrder({
    makerToken: orders.makerToken,
    takerToken: orders.takerToken,
    makerAmount: makerAssetAmount,
    takerAmount: takerAssetAmount,
    maker: orders.maker,
    sender: orders.sender,
    expiry: orders.expiry,
    salt: parseInt(orders.salt),
    chainId: orders.chainId,
    verifyingContract: orders.verifyingContract,
  });

  const contractWrappers = new ContractWrappers(determineProvider(), {
    chainId: 80001,
  });
 

  const protocolFeeMultiplier = new BigNumber(
    await contractWrappers.exchangeProxy.getProtocolFeeMultiplier().callAsync()
  );

  await contractWrappers.exchangeProxy
    .fillLimitOrder(order, orders.signature, takerAssetAmount)
    .sendTransactionAsync({
      from: accounts[0],
      value: new BigNumber(0),
      ...TX_DEFAULTS,
    })
    .then((res: any) => console.log(res))
    .catch((err: any) => console.log(err));
*/
}

const determineProvider = (): typeof Web3ProviderEngine => {
  const pe = new Web3ProviderEngine();
  pe.addProvider(new RPCSubprovider("https://rpc-mumbai.maticvigil.com"));
  providerUtils.startProviderEngine(pe);
  return pe;
};

const calculateProtocolFee = (
  numOrders: number,
  multiplier: typeof BigNumber,
  gasPrice: typeof BigNumber | number = TX_DEFAULTS.gasPrice
): typeof BigNumber => {
  return multiplier.times(gasPrice).times(numOrders);
};

const getFutureExpiryInSeconds = () => {
  return Math.floor(Date.now() / 1000 + 300).toString(); // 5 min expiry
};

//
export async function rebase() {}
