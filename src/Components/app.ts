//import utils from "@0x/protocol-utils";
import { ContractWrappers } from "@0x/contract-wrappers";
import TokenABI from "../../Contracts/out/Token.sol/UFragments.json";
import { BigNumber } from "@0x/utils";
import {
  getContractAddressesForChainOrThrow,
} from "@0x/contract-addresses";
import { providerUtils } from "@0x/utils";
import { MetamaskSubprovider, RPCSubprovider, Web3ProviderEngine } from "@0x/subproviders";
import { ethers } from "ethers";
import ERC20ABI from "../../Contracts/out/ERC20.sol/Token.json";
import utils from "@0x/protocol-utils";
import { Web3Wrapper } from "@0x/web3-wrapper";

let makerToken: string = "0xe12Ea88F759E8f2e17507074E9465860247FF699"; // Addis Token
let takerToken: string = "0x6deef5155d778b3a82b8ca91d9e493e0c27eef3f"; // weth address
const NULL_ADDRESS: string = "0x0000000000000000000000000000000000000000";
declare let window: any;

const TX_DEFAULTS = { gas: 500000, gasPrice: 20e9 };

// Used to create order for exchange of ADT -> WETH
// makerAmount -> The amount of ADT token we want to sell
// takerAmount -> The amount of WETH we receive in for given makerAmount
export async function listToken(makerAmount: string, takerAmount: string) {
  try {
    const addresses = getContractAddressesForChainOrThrow(80001);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    /** */
    const AddisToken = new ethers.Contract(makerToken, TokenABI.abi, provider);

    const _makerAmount = Web3Wrapper.toBaseUnitAmount(
      new BigNumber(makerAmount),
      9
    );
    const _takerAmount = Web3Wrapper.toBaseUnitAmount(
      new BigNumber(takerAmount),
      18
    );
    await AddisToken.connect(signer).approve(
      addresses.exchangeProxy,
      _makerAmount.toString()
    );

    // Use first selected Metamask account
    const maker = accounts[0];

    const order = new utils.LimitOrder({
      makerToken: makerToken,
      takerToken: takerToken,
      makerAmount: _makerAmount,
      takerAmount: _takerAmount,
      maker: maker,
      taker: NULL_ADDRESS,
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
      utils.SignatureType.EIP712,
      maker
      // Optional
    );

    console.log(`Signature: ${JSON.stringify(signature, undefined, 2)}`);

    const signedOrder = { ...order, signature };
    console.log(signedOrder);
    let orders = [];
    orders.push(signedOrder);

    orders = orders.concat(
      JSON.parse(window.localStorage.getItem("newOrder2")) || []
    );
    window.localStorage.setItem("newOrder2", JSON.stringify(orders));
  } catch (err) {
    console.log(err);
  }
}

// Used fill Limit order.
export async function buyTokens(
  _order: any = {},
  _signature: any,
  _takerAmount: string
) {
  try {
    const addresses = getContractAddressesForChainOrThrow(80001);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const WETHToken = new ethers.Contract(takerToken, ERC20ABI.abi, provider);
    const supportedProvider = new MetamaskSubprovider(
      window.web3.currentProvider
    );
    const contractWrappers = new ContractWrappers(determineProvider(), {
      chainId: 80001,
    });
    const protocolFeeMultiplier = new BigNumber(
      await contractWrappers.exchangeProxy
        .getProtocolFeeMultiplier()
        .callAsync()
    );
	console.log(_order.takerAmount, "order taker amount");
    await WETHToken.connect(signer).approve(
      addresses.exchangeProxy,
      _order.takerAmount
    );
    const exchange = new ethers.Contract(
      addresses.exchangeProxy,
      contractWrappers.exchangeProxy.abi,
      provider
    );
    console.log(exchange);
    let tx3 = await exchange
      .connect(signer)
      .fillLimitOrder(_order, _signature, _takerAmount, {
        value: calculateProtocolFee(1, protocolFeeMultiplier).toString(),
        gasLimit: "7500000",
      });
	tx3.wait()
    console.log(tx3);
	return tx3.hash;
  } catch (err) {
    console.log(err);
  }
}



//Rebase function
export async function rebase(epoch: string, supplyDelta: string) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log(accounts);
    const signer = await provider.getSigner();
    const AddisToken = new ethers.Contract(makerToken, TokenABI.abi, provider);
	
   const tx =  await AddisToken.connect(signer).rebase(epoch, supplyDelta, {gasLimit:"750000"});
	console.log(tx);
	return tx.hash;
  } catch (err) {
    console.log(err);
  }
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