import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { Inter } from 'next/font/google';
import { useCart } from '../../../hooks/use-cart.js';

const inter = Inter({ subsets: ['latin'] })

import styles from './Nav.module.css';

const Nav = () => {
  const { subtotal, checkout } = useCart(); 

  return (
    <nav className={`${styles.nav} ${inter.className}`}>
      <Link href="/">
        <p className={styles.navTitle}>
          Space Jelly Shop
        </p>
      </Link>
      <p className={styles.navCart}>
        <Link href="/cart">
          <FaShoppingCart /> {subtotal}€
        </Link>
      </p>
    </nav>
  )
}

export default Nav;