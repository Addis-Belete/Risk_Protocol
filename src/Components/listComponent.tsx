import { useState } from "react";
import styles from "@/styles/OrderList.module.css";
const utils = require("@0x/protocol-utils");
import { Web3Wrapper } from "@0x/web3-wrapper";
const { BigNumber, hexUtils } = require("@0x/utils");
import { buyTokens } from "../pages/app";
import { ethers } from "ethers";

declare let window: any;

export const ListCompenent = (order: any, index: any) => {
  console.log(order.order.makerToken, "from list componet");
  let makerAddress = "0xe12Ea88F759E8f2e17507074E9465860247FF699";

  const [hash, setHash] = useState("");
  const [load, setLoad] = useState(false);
  const remove = (id: number) => {
    let orders = window.localStorage.getItem("newOrder2") || [];
    let ordersObj = JSON.parse(`${orders}`);
    ordersObj[id] = orders[orders.length - 1];
    ordersObj.pop();
    window.localStorage.setItem("newOrder2", JSON.stringify(ordersObj));
  };

  return (
    <>
      <div key={order.index} className={styles.list}>
        <p>
          <span>Maker Token: </span>{" "}
          {order?.order.makerToken == makerAddress ? "ADT" : "WETH"}
        </p>
        <p>
          <span>Taker Token: </span>{" "}
          {order?.order.takerToken == makerAddress ? "ADT" : "WETH"}
        </p>
        <p>
          <span>Maker Amount: </span>
          { ethers.utils.formatUnits(order?.order.makerAmount, 9)}
        </p>
        <p>
          <span>Taker Amount: </span>
          {
             ethers.utils.formatUnits(order?.order.takerAmount, 18)
           }
        </p>
        <button
          onClick={async () => {
            setLoad(true);
            const _makerAmount = Web3Wrapper.toBaseUnitAmount(
              new BigNumber(order?.order.makerAmount),
              9
            );
            const _takerAmount = Web3Wrapper.toBaseUnitAmount(
              new BigNumber(order?.order.takerAmount),
              18
            );

            const ord = new utils.LimitOrder({
              makerToken: order?.order.makerToken,
              takerToken: order?.order.takerToken,
              makerAmount: order?.order.makerAmount,
              takerAmount: order?.order.takerAmount,
              maker: order?.order.maker,
              taker: order?.order.taker,
              sender: order?.order.sender,
              expiry: order?.order.expiry,
              salt: order?.order.salt,
              chainId: order?.order.chainId,
              verifyingContract: order?.order.verifyingContract,
              takerTokenFeeAmount: "0",
            });
            const sign = order?.order.signature;
            const tokenFillAmount = order?.order.takerAmount;

            const tx = await buyTokens(ord, sign, tokenFillAmount);
            setHash(tx);
            remove(index);
            setLoad(false);
          }}
        >
          {load ? "Buying..." : "Buy"}
        </button>
      </div>
      {hash && (
        <p className={styles.success} style={{ color: "green" }}>
          Transaction Successfull{" "}
          <a href={`https://mumbai.polygonscan.com/tx/${hash}`}>
            View On Explorer
          </a>
        </p>
      )}
    </>
  );
};
