import styles from "@/styles/Header.module.css";
import Link from 'next/link'
export const Header = () => {
  return (
    <div>
      <nav className={styles.header}>
        <h1><Link href="/">RISK EXCHANGE</Link></h1>
        <ul>
          <li><Link href="/">List Order</Link></li>
          <li><Link href="/listOrders">Buy Order</Link></li>
          <li>< Link href="/Rebase">Rebase</Link></li>
        </ul>
        <div>
          <button>Connect</button>
          <span>0x0000000000</span>
        </div>
      </nav>
    </div>
  );
};
