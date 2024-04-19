import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import CartItem from "./CartItem"
import CartContext from "../store/CartContext"
import { createPortal } from "react-dom"
import Checkout from "./Checkout"

const CartModal = forwardRef(function CartModal({handleCartClose}, ref) {
    const dialog = useRef()
   
    useImperativeHandle(ref, () => {
        return{
            open: () => {
                dialog.current.showModal()
            },
            close: () => {
                dialog.current.close()
            }            
        }
    })

    const checkout = useRef()
    function handleCheckoutOpen(){
        checkout.current.open()
    }
    function handleCheckoutClose(e){
        e.preventDefault()
        checkout.current.close()
    }

    const cartCtx = useContext(CartContext)
    const cartLength = cartCtx.items.length
    const cartArray = cartCtx.items
    const cartTotal = cartCtx.items.reduce((acc, item) => {
        return acc + (item.quantity * parseFloat(item.price))
    }, 0)
  return createPortal(
    <>
        <Checkout ref={checkout} handleCheckoutClose ={handleCheckoutClose}/>
        <dialog className="modal w-fit p-4 rounded-md" ref ={dialog}>
            <h2 className="text-[#1D1A16] font-bold text-lg">{cartLength !== 0 ? "Your Cart" : "Empty Cart"}</h2>
            {cartLength !== 0 && cartArray.map((item) => {
                return <CartItem item ={item}/>
            })}
            <div className="cart-total">{cartLength !== 0 && `$${cartTotal}`}</div>
            <div className="flex justify-end gap-5">
                <button onClick={handleCartClose}>Close</button>
                {cartLength !== 0 && <button className="button" onClick={handleCheckoutOpen}>Go to Checkout</button>}
            </div>
        </dialog>    
    </>

  , document.getElementById('modal'))
})
export default CartModal