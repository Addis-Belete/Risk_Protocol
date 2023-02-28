import { Header } from "@/Components/header";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { rebase } from "../Components/app";
export default function Rebase() {
  const [epoch, setEpoch] = useState("");
  const [supplyDelta, setSupplyDelta] = useState("");
  const [load, setLoad] = useState(false);
  const [hash, setHash] = useState("");
 
  return (
    <>
      <Header />
      <main className={styles.main}>
        {hash && (
          <p
            style={{ color: "green", fontSize: "larger", textAlign: "center" }}
          >
            Rebase Successfull{" "}
            <a
              href={`https://mumbai.polygonscan.com/tx/${hash}`}
              style={{
                color: "blue",
                fontSize:"large",
                textDecoration: "underlyine",
              }}
            >
              View On Explorer
            </a>{" "}
          </p>
        )}
        <label htmlFor="maker">Epoch</label>
        <input
          type="text"
          id="maker"
          onChange={(e) => setEpoch(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="taker">Supply Delta</label>
        <input
          type="text"
          id="taker"
          onChange={(e) => setSupplyDelta(e.target.value)}
        />
        <br />
        <button
          onClick={async () => {
            setLoad(true);
            const tx = await rebase(epoch, supplyDelta);
            setHash(tx);
            setEpoch("");
            setSupplyDelta("");
            setLoad(false);
          }}
        >
          {load ? "Rebasing..." : "Rebase"}
        </button>
      </main>
    </>
  );
}
