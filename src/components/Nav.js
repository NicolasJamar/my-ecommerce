import { useCart } from '../../hooks/use-cart.js';
import { FaShoppingCart } from 'react-icons/fa';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

import styles from './Nav.module.css';

const Nav = () => {
  const { subtotal } = useCart(); 

  return (
    <nav className={styles.nav}>
      <p className={`${styles.navTitle} ${inter.className}`}>
        Space Jelly Shop
      </p>
      <p className={styles.navCart}>
        <button>
          <FaShoppingCart /> ${subtotal}
        </button>
      </p>
    </nav>
  )
}

export default Nav;