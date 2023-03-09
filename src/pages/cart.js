import Head from 'next/head'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Cart.module.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import products from '../../products.json';
import { useCart } from '../../hooks/use-cart';

import Table from '../components/Table/Table';

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name'
  },
  {
    columnId: 'quantity',
    Header: 'Quantity'
  },
  {
    columnId: 'pricePerItem',
    Header: 'Price Per Item'
  },
  {
    columnId: 'total',
    Header: 'Item Total'
  }
];

export default function Home() {
  const {cartItems, updateItem, checkout} = useCart();
  console.log("cartitems", cartItems);

  const data = cartItems.map( item => {
    const product = products.find( ({id}) => id === item.id);

    
    const Quantity = (() => {
      function handleOnSubmit(e) {
        e.preventDefault();
        const quantity = e.currentTarget.quantity.value;

        updateItem({
          id: item.id, 
          quantity: quantity && parseInt(quantity)
        })
      }

      return (
        <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
          <input name="quantity" type="number" min={0} defaultValue={item.quantity} />
          <button className={styles.button}>Update</button>
        </form>
      )
    })

    return {
      ...item,
      quantity: <Quantity/>,
      title: product.title,
      total: item.quantity * item.pricePerItem
    }
  })


  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
