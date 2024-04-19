import {forwardRef, useContext, useEffect, useState} from 'react'
import CartContext from '../store/CartContext'

const CartItem = forwardRef(function CartItem({item}, ref) {
    const {id, name, price, quantity} = item
    const cartCtx = useContext(CartContext)

    function handleCountIncrease(){
        cartCtx.addItem(item)
    }

    function handleCountDecrease(){
        cartCtx.removeItem(id)
    }
  return (
    <div className="flex justify-between ">
        <p>{name} - {quantity} x ${price}</p>
        <div className="cart-item-actions">
            <button onClick={handleCountDecrease}>-</button>
            <div>{quantity}</div>
            <button onClick={handleCountIncrease}>+</button>
        </div>
    </div>
  )
})
export default CartItem