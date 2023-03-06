import { useState } from "react";
import { initiateCheckout } from '../lib/payments';
import products from "../products.json";

const defaultCart = {
  products: {}
}

export default function useCart() {

  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map( key => {
    const product = products.find( ({id}) => `${id}` === `${key}` )
    return {
      ...cart.products[key],
      pricePerItem: product.price
    }
  })

  const subtotal = cartItems.reduce( (accumulator, {pricePerItem, quantity} ) => {
    const totalPrice = accumulator + (pricePerItem * quantity)
    return totalPrice
  }, 0)

  const totalItems = cartItems.reduce( (accumulator, {quantity} ) => {
    const items = accumulator + (quantity)
    return items
  }, 0)

  const addToCart = ({id} = {}) => {
    updateCart(prev => {
      let cartState = {...prev};

      if(cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1
        }
      }
      return cartState
    })
  }

  const checkout = () => {
    initiateCheckout({
      lineItems: cartItems.map( item => {
        return {
          price: item.id,
          quantity: item.quantity
        }
      })
      // lineItems: [{
      //   price: id, // Replace with the ID of your price
      //   quantity: 1,
      // }]
    })
  }

  return {
    totalItems, 
    subtotal, 
    addToCart,
    checkout
  }

}