import { useEffect, useState } from "react";

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
<div>{orders.length == 0 ? <p>No orders available</p>: <>
	{orders.map((order:any, index: any) => {
return(
		<div key={index}>
		<p>Maker Token: {order.makerToken == makerAddress? "USDC" : "WETH"}</p>
		<p>Taker Token: {order.takerToken == makerAddress ? "USDC" : "WETH"}</p>
		<p>Maker Amount:{order.takerAmount}</p>	
		<p>Taker Amount:{order.makerAmount}</p>
		<button>Buy</button>
		
</div>
)
	})}

</>}</div>

)


} 