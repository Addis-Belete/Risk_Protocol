import styles from "@/styles/Header.module.css";
export const Header = () => {
  return (
    <div >
      <nav className={styles.header}>
        <h1>RISK EXCHANGE</h1>
        <ul>
          <li>List Order</li>
          <li>Buy Order</li>
          <li>Rebase</li>
        </ul>
 <div>
<button>Connect</button>
<span>0x0000000000</span>
</div>
      </nav>
    </div>
  );
};
