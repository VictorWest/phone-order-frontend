import { useRef } from "react";
import CartModal from "./components/CartModal";
import Header from "./components/Header";
import Meal from "./components/Meal";
import { CartContextProvider } from "./store/CartContext";

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
      <CartModal ref={dialog} handleCartClose={handleCartClose} />
      <Meal handleAddToCart={handleAddToCart} />
    </CartContextProvider>
  );
}

export default App;
