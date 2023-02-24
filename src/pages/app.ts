import utils from "@0x/protocol-utils";
import { ContractWrappers, ERC20TokenContract } from '@0x/contract-wrappers';
import { BigNumber, hexUtils } from '@0x/utils';
import contractAddresses from "@0x/contract-addresses";
import { MetamaskSubprovider } from "@0x/subproviders";

let makerToken: string = "0x35f21a47a19c7b634b534936df505c7d92f07d8c" // usdc address
let takerToken: string = "0xb505d25720c37df4c85919fcbece8712272f7ef3" // weth address
const NULL_ADDRESS: string = "0x00000000000000000000000000000000"
declare let window: any

const getFutureExpiryInSeconds = () =>{
   return Math.floor(Date.now() / 1000 + 300).toString(); // 5 min expiry
}

// create limit order 
export async function listToken(){
const addresses = contractAddresses.getContractAddressesForChainOrThrow(
   3
  );
const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });
  // Use first selected Metamask account
  const maker = accounts[0];

const order = new utils.LimitOrder({
	makerToken: makerToken,
	takerToken: takerToken,
	makerAmount: new BigNumber(1),
	takerAmount: new BigNumber(1000000),
	takerTokenFeeAmount: new BigNumber(0),
	sender: NULL_ADDRESS,
	expiry: new BigNumber(getFutureExpiryInSeconds()),
	salt: new BigNumber(Date.now()),
	chainId: 3,
	verifyingContract: addresses.exchangeProxy
})

const supportedProvider = new MetamaskSubprovider(
    window.web3.currentProvider
  );
 const signature = await order.getSignatureWithProviderAsync(
    supportedProvider,
    utils.SignatureType.EIP712 // Optional
  );
	console.log(`Signature: ${JSON.stringify(signature, undefined, 2)}`);

  const signedOrder = { ...order, signature };
  const resp = await fetch("https://ropsten.api.0x.org/sra/v4/order", {
    method: "POST",
    body: JSON.stringify(signedOrder),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (resp.status === 200) {
    alert("Successfully posted order to SRA");
  } else {
    const body = await resp.json();
    alert(
      `ERROR(status code ${resp.status}): ${JSON.stringify(body, undefined, 2)}`
    );
  }



}

// Fill limit order
export async function buyTokens() {}

// 
export async function rebase() {}