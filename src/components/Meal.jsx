import React, { useEffect, useRef, useState } from 'react'
import CartModal from './CartModal';
import UnitMeal from './UnitMeal';

export default function Meal({handleAddToCart}) {
    const [ isLoaded, setIsLoaded ] = useState(true)
    const [ availableMeals, setAvailableMeals ] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/meals")
        .then(response => response.json())
        .then(data =>{
            setAvailableMeals([...data])
            setIsLoaded(false)
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <>
        {!isLoaded ? <div id="meals">
            {availableMeals.map((item) => {
                return <UnitMeal key={item.id} item={item} />
            })}
            
        </div> : <p className='flex justify-center'>Loading meal items...</p>}
    </>

  )
}
