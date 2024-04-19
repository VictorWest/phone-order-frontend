import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import CartContext from '../store/CartContext'
import { createPortal } from 'react-dom'

const Checkout = forwardRef(function Checkout({handleCheckoutClose}, ref) {
  const serverURL = 'http://localhost:3000'
  const checkout = useRef()

  useImperativeHandle(ref, () => {
    return{
      open: () => {
        checkout.current.showModal()
      },
      close: () => {
        checkout.current.close()
      }
    }
  })
  const cartCtx = useContext(CartContext)
  const cartTotal = cartCtx.items.reduce((acc, item) => {
    return acc + (item.quantity * parseFloat(item.price))
}, 0)

  function handleSubmit(e){
    e.preventDefault()
    const formInputs = new FormData(e.target) 
    const data = Object.fromEntries(formInputs.entries())
    fetch(`${serverURL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        orders: {customer: data}
      }), 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => console.log(response.message))
      .catch((err) => console.log(err))
  }
  return createPortal (
    <dialog className="modal w-fit p-4 rounded-md" ref ={checkout}>
      <h1 className='text-[#1D1A16] font-bold text-lg'>Checkout</h1>
      <p className='py-2'>Total Amount ${cartTotal}</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <label htmlFor="name">Full Name</label>
        <input type="text" id='name' name='name' />
        <label htmlFor="email">E-Mail Address</label>
        <input type="email" id='email' name='email' />
        <label htmlFor="street">Street</label>
        <input type="text" id='street' name='street' />  
        <div className='flex'>
          <div>
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" id='postal-code' name='postal-code' />            
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" id='city' name='city' />            
          </div>
        </div>
        <div className="flex justify-end gap-5 pt-5">
          <button onClick={handleCheckoutClose}>Close</button> 
          <button className='button'>Submit Order</button>          
        </div>

      </form>
    </dialog>,
    document.getElementById('checkout')
  )
})
export default Checkout