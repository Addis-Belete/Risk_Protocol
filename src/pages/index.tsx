import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { listToken, buyTokens } from './app'
const inter = Inter({ subsets: ['latin'] })
import { Header } from '@/Components/header'

export default function Home() {
  return (
    <>
      
       <Header/>
      
      <main className={styles.main}>
	<label htmlFor="maker">Maker Token Amount</label>
	<input type="text" id='maker' /> <br/>
	<label htmlFor="taker">Taker Token Amount</label> 
	<input type="text" id='taker' /><br/>
		<button onClick={listToken} >List Token</button>
		
      </main>
    </>
  )
}
