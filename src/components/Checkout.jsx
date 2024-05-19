import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react'
import CartContext from '../store/CartContext'
import { createPortal } from 'react-dom'
import addNotification from 'react-push-notification';
import {TailSpin} from 'react-loader-spinner'
const Checkout = forwardRef(function Checkout({handleCheckoutClose}, ref) {
  const serverURL = 'https://react-food-app-backend.onrender.com'
  // const serverURL = "http://localhost:3000"
  const checkout = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState(false)
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

  //push notification
  const buttonClick = () => {
    addNotification({
        title: 'There was an error. Please try again',
        subtitle: ':)',
        message: '',
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
    });
  };
  function handleSubmit(e){
    e.preventDefault()
    const formInputs = new FormData(e.target) 
    const data = Object.fromEntries(formInputs.entries())
    setError(false)
    setIsLoading(true)
    fetch(`${serverURL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        orders: {customer: data}
      }), 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if(res.ok){
        setSubmitSuccess(true)
        setTimeout(() => location.reload(), 2000)
      }else{
        setSubmitSuccess(false)
        setError(true)
        buttonClick()
        console.log('there was an error')
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }

  return createPortal (
    <dialog className="modal w-fit p-4 rounded-md" ref ={checkout}>
      <h1 className='text-[#1D1A16] font-bold text-lg'>Checkout</h1>
      <p className='py-2'>Total Amount ${cartTotal}</p>
      {!submitSuccess ? <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <label htmlFor="name">Full Name</label>
        <input type="text" id='name' name='name' required/>
        <label htmlFor="email">E-Mail Address</label>
        <input type="email" id='email' name='email' required/>
        <label htmlFor="street">Street</label>
        <input type="text" id='street' name='street' required/>  
        <div className='flex gap-3 max-[540px]:flex-col'>
          <div className='max-[540px]:flex max-[540px]:flex-col'>
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" id='postal-code' name='postal-code' required/>            
          </div>
          <div className='max-[540px]:flex max-[540px]:flex-col'>
            <label htmlFor="city">City</label>
            <input type="text" id='city' name='city' required/>            
          </div>
        </div>
        <div className="flex justify-end gap-5 pt-5">
          <button onClick={handleCheckoutClose}>Close</button> 
          <button className='button'>{isLoading && !error ? 
              <TailSpin
              visible={true}
              height="20"
              width="20"
              color="#fff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              />        
          :"Submit Order"}</button>          
        </div>

      </form> : <p>Your Order was successful!</p>}  
      
    </dialog>,
    document.getElementById('checkout')
  )
})
export default Checkout