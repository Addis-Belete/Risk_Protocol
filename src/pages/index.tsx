import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { listToken, buyTokens,  } from '../Components/app'
const inter = Inter({ subsets: ['latin'] })
import { Header } from '@/Components/header'
import { useState } from 'react'

export default function Home() {
	const [makerAmount, setMakerAmount] = useState("");
	const [takerAmount, setTakerAmount] = useState("");
	const [success, setSuccess] = useState(false);
	const [load, setLoad] = useState(false);
  return (
    <>
       <Header/>
	<>

      <main className={styles.main}>
	{success && <p style={{color: "green", textAlign: "center", fontSize: "x-larger", fontWeight: "bold"}}>Order Successfully Listed!</p>}
			<label htmlFor="maker">Maker Token Amount(ADT)</label>
			<input type="text" id='maker' onChange={(e) => setMakerAmount(e.target.value)} value={makerAmount} /> <br/>
			<label htmlFor="taker">Taker Token Amount(WETH)</label> 
			<input type="text" id='taker' onChange={(e) => setTakerAmount(e.target.value)} value= {takerAmount}/><br/>
			<button onClick={async () => {
				setLoad(true)
				await listToken(makerAmount, takerAmount)
					setMakerAmount("")
					setTakerAmount("")
					setSuccess(true)
					setLoad(false)

				}} >{load? "Listing ..." : "List Tokens"}</button>
      </main>

</>
    </>
  )
}
