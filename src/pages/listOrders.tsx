import { useEffect, useState } from "react";
import { Header } from "@/Components/header";
import styles from "@/styles/OrderList.module.css";
import { ListCompenent } from "@/Components/listComponent";
declare let window: any;
export default function listOrders() {
 
  const [orders, setOrders] = useState([]);
 
 ;

  useEffect(() => {
    let availableOrders = window.localStorage.getItem("newOrder2") || [];
    if (availableOrders.length > 0) {
      let availableOrdersObj = JSON.parse(`${availableOrders}`);
      setOrders(availableOrdersObj);
    }
  }, []);
  console.log(orders);
  
  return (
    <>
      <Header />
      <div className={styles.orders}>
        {orders.length == 0 ? (
          <p>No orders available</p>
        ) : (
          <>
            {orders.map((order: any, index: any) => {
              return <ListCompenent order= {order} index={index}/>
            })}
          </>
        )}
        
      </div>
    </>
  );
}
