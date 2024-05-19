import { useRef } from "react";
import CartModal from "./components/CartModal";
import Header from "./components/Header";
import Meal from "./components/Meal";
import { CartContextProvider } from "./store/CartContext";
import { Notifications } from 'react-push-notification'
function App() {
  const dialog = useRef()

  function handleCartOpen(){
    dialog.current.open()
  }

  function handleCartClose(){
    dialog.current.close()
  }

  function handleAddToCart(value){
    setCartArray(prevVal => [value, ...prevVal])
  }
  return (
    <CartContextProvider>
      <Header handleCartOpen={handleCartOpen} />
      <Notifications/>
      <CartModal ref={dialog} handleCartClose={handleCartClose} />
      <Meal handleAddToCart={handleAddToCart} />
    </CartContextProvider>
  );
}

export default App;
