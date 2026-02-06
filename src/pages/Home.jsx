import { useContext } from "react"
import CardPizza from "../components/CardPizza.jsx"
import Header from "../components/Header.jsx"
import { CartContext } from "../context/CartContext.jsx"

 
const Home = () => {
  // Consumimos las pizzas directamente del Contexto
  const { pizzas } = useContext(CartContext)

  return (
    <div className="main">
      <Header/>
 
      <div className="d-flex justify-content-center flex-wrap gap-4 p-4">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            pizza={pizza}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
