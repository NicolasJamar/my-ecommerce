import '@/styles/globals.css';

import { CartContext, useCartState } from '../../hooks/use-cart';

import Nav from '../components/Nav';

export default function App({ Component, pageProps }) {
  const cart = useCartState()
  return (
    <CartContext.Provider value={ cart }>
      <Nav />
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}
