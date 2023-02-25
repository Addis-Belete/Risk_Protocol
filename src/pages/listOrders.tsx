import { useEffect, useState } from "react";
import { Header } from "@/Components/header";
import styles from '@/styles/OrderList.module.css'
import { buyTokens } from "./app";
declare let window: any
export default function listOrders() {
let makerAddress = "0x5dd7be3badc927a2dc355a276b7f6a3420550c96"
	const [orders,setOrders] = useState([])
	
	useEffect(() => {
	let availableOrders = window.localStorage.getItem("orderss") || [];
	let availableOrdersObj = JSON.parse(`${availableOrders}`);
		setOrders(availableOrdersObj);
	},[])
	console.log(orders)
return(
<>
<Header/>
<div className={styles.orders}>{orders.length == 0 ? <p>No orders available</p>: <>
	{orders.map((order:any, index: any) => {
return(
		<div key={index} className={styles.list}>
		<p><span>Maker Token: </span> {order.makerToken == makerAddress? "USDC" : "WETH"}</p>
		<p><span>Taker Token: </span> {order.takerToken == makerAddress ? "USDC" : "WETH"}</p>
		<p><span>Maker Amount: </span>{order.takerAmount}</p>	
		<p><span>Taker Amount: </span>{order.makerAmount}</p>
		<button onClick={buyTokens}>Buy</button>
		
</div>
)
	})}

</>}</div>
</>
)


} 