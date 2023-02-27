import { Header } from "@/Components/header"
import styles from "@/styles/Home.module.css"
export default function Rebase() {

return (
	   <>
      
       <Header/>
      
      <main className={styles.main}>
	<label htmlFor="maker">Epoch</label>
	<input type="text" id='maker' /> <br/>
	<label htmlFor="taker">Supply Delta</label> 
	<input type="text" id='taker' /><br/>
		<button >Rebase</button>
		
      </main>
    </>
)

}