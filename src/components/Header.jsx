import { useContext } from 'react'
import logoJPG from '../assets/logo.jpg'
import CartContext from '../store/CartContext'
export default function Header({handleCartOpen}) {

  const cartCtx = useContext(CartContext)
  const cartLength = cartCtx.items.reduce((acc, items) => {
    return acc + items.quantity
  }, 0)

  return (
    <div id="main-header" className='max-[540px]:flex max-[540px]:flex-col'>
        <div id="title">
            <img src={logoJPG} alt="logo"  />
            <h1>DEVICE APP</h1>
        </div>
        <button onClick={handleCartOpen} className='hover:text-[#FFAB04]'>Cart ({cartLength})</button>
    </div>
  )
}
