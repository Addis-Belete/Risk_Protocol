import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
declare let window: any;
export const Header = () => {
  const [active, setActive] = useState("");
  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
	  setActive(accounts[0])
    } catch (err) {
      console.log(err);
    }
  };
	const trunc = (addr: string) => {
		return(`${addr.substring(0, 4)}...${addr.substring(30, addr.length)}`)

	}
	useEffect(()=> {
		connect()
	},[])
  return (
    <div>
      <nav className={styles.header}>
        <h1>
          <Link href="/">RISK EXCHANGE</Link>
        </h1>
        <ul>
          <li>
            <Link href="/">List Order</Link>
          </li>
          <li>
            <Link href="/listOrders">Buy Order</Link>
          </li>
          <li>
            <Link href="/Rebase">Rebase</Link>
          </li>
        </ul>
        <div>
          <button onClick={connect}>{active ? "Connected" : "Connect" }</button>
          <span>{active? trunc(active): ""}</span>
        </div>
      </nav>
    </div>
  );
};
