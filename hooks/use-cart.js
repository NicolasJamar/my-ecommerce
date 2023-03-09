import { useState, createContext, useContext, useEffect  } from "react";
import { initiateCheckout } from '../lib/payments';
import products from "../products.json";

export const CartContext = createContext();

const defaultCart = {
  products: {}
}

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect( () => {
    const stateFormStorage = window.localStorage.getItem("cart")
    const data = stateFormStorage && JSON.parse(stateFormStorage);
    if(data) {
      updateCart(data)
    }
  }, []);

  useEffect( () => {
    const data = JSON.stringify(cart)
    window.localStorage.setItem("cart", data);
  }, [cart]);

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

  const updateItem = ({id, quantity}) => {
    updateCart(prev => {
      let cartState = {...prev};

      if(cartState.products[id]) {
        cartState.products[id].quantity = quantity;
      }
      if (cartState.products[id].quantity === 0) {
        delete cartState.products[id]
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
    cartItems,
    totalItems, 
    subtotal, 
    addToCart,
    updateItem,
    checkout
  }
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart
}