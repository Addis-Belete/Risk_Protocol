import { useEffect, useState } from "react";
import { Header } from "@/Components/header";
import styles from "@/styles/OrderList.module.css";
const utils = require("@0x/protocol-utils");
import { Web3Wrapper } from "@0x/web3-wrapper";
const { BigNumber, hexUtils } = require("@0x/utils");
import { buyTokens } from "./app";
import { ethers } from "ethers";
declare let window: any;
export default function listOrders() {
  let makerAddress = "0xe12Ea88F759E8f2e17507074E9465860247FF699";
  const [orders, setOrders] = useState([]);
  const [hash, setHash] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let availableOrders = window.localStorage.getItem("newOrder") || [];
    if (availableOrders.length > 0) {
      let availableOrdersObj = JSON.parse(`${availableOrders}`);
      setOrders(availableOrdersObj);
    }
  }, []);
  console.log(orders);
  const remove = (id: number) => {
    let orders = window.localStorage.getItem("newOrder") || [];
    let ordersObj = JSON.parse(`${orders}`);
    ordersObj[id] = orders[orders.length - 1];
    ordersObj.pop();
    window.localStorage.setItem("newOrder", JSON.stringify(ordersObj));
  };
  return (
    <>
      <Header />
      <div className={styles.orders}>
        {orders.length == 0 ? (
          <p>No orders available</p>
        ) : (
          <>
            {orders.map((order: any, index: any) => {
              return (
                <div key={index} className={styles.list}>
                  <p>
                    <span>Maker Token: </span>{" "}
                    {order.makerToken == makerAddress ? "ADT" : "WETH"}
                  </p>
                  <p>
                    <span>Taker Token: </span>{" "}
                    {order.takerToken == makerAddress ? "ADT" : "WETH"}
                  </p>
                  <p>
                    <span>Maker Amount: </span>
                    {ethers.utils.formatUnits(order.makerAmount, 9)}
                  </p>
                  <p>
                    <span>Taker Amount: </span>
                    {ethers.utils.formatUnits(order.takerAmount, 18)}
                  </p>
                  <button
                    onClick={async () => {
						setLoad(true)
                      const _makerAmount = Web3Wrapper.toBaseUnitAmount(
                        new BigNumber(order.makerAmount),
                        9
                      );
                      const _takerAmount = Web3Wrapper.toBaseUnitAmount(
                        new BigNumber(order.takerAmount),
                        18
                      );
					
                      const ord = new utils.LimitOrder({
                        makerToken: order.makerToken,
                        takerToken: order.takerToken,
                        makerAmount: order.makerAmount,
                        takerAmount: order.takerAmount,
                        maker: order.maker,
                        taker: order.taker,
                        sender: order.sender,
                        expiry: order.expiry,
                        salt: order.salt,
                        chainId: order.chainId,
                        verifyingContract: order.verifyingContract,
                        takerTokenFeeAmount: "0",
                      });
                      const sign = order.signature;
                      const tokenFillAmount = order.takerAmount;

                      const tx = await buyTokens(ord, sign, tokenFillAmount);
                      setHash(tx);
                      remove(index);
					  setLoad(false)
                    }}
                  >
                    {load ? "Buying...": "Buy"}
                  </button>
                </div>
              );
            })}
          </>
        )}
        {hash && (
          <p className={styles.success} style={{ color: "green" }}>
            Transaction Successfull{" "}
            <a href={`https://mumbai.polygonscan.com/tx/${hash}`}>
              View On Explorer
            </a>
          </p>
        )}
      </div>
    </>
  );
}
