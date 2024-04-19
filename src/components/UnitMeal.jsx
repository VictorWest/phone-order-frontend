import { useContext, useState } from "react"
import CartContext from "../store/CartContext"

export default function UnitMeal({ item }) {
  // console.log(item);
  const {  name, image, price, description  } = item
  const cartCtx = useContext(CartContext)

  function handleAddToCart(){
    cartCtx.addItem(item)
  }

  return (
    <div className="flex flex-col items-center meal-item" >
      <article>
        <div>
          <img src={`https://react-food-app-backend.onrender.com/${image}`} alt=""/>
          <h3 id={name}>{name}</h3>
          <div className="meal-item-price" id={price}>${price}</div>
          <div className="meal-item-description" id={description}>{description}</div>          
        </div>
        <div className="meal-item-action button mb-3 w-fit mx-auto" onClick={handleAddToCart}><button>Add to Cart</button></div>        
      </article>

    </div>
  )
}