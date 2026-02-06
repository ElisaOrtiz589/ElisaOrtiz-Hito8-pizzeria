import { createContext, useState, useEffect } from 'react';
import { pizzas as pizzasLocales } from '../components/pizzas'; 

// Creación del Contexto 
export const CartContext = createContext();

// Creación del Provider 
const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState([]);
  
  const [pizzas, setPizzas] = useState([]);

  // Función para obtener las pizzas de la API
  const getPizzas = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pizzas");
      const data = await res.json();
      setPizzas(data);
    } catch (error) {
      console.error("Error al obtener pizzas:", error);
      // Si falla la API, usamos los datos locales
      setPizzas(pizzasLocales);
    }
  };

  
  useEffect(() => {
    getPizzas();
  }, []);

  
  const addToCart = (pizza) => {
    
    const index = cart.findIndex((item) => item.id === pizza.id);

    if (index !== -1) {
      
      const newCart = [...cart];
      newCart[index].count += 1;
      setCart(newCart);
    } else {
      
      const newPizza = { ...pizza, count: 1 };
      setCart([...cart, newPizza]);
    }
  };

  
  const increaseQuantity = (id) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  
  const decreaseQuantity = (id) => {
    const newCart = cart.map((item) => {
      if (item.id === id && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    }).filter(item => item.count > 0); 
    setCart(newCart);
  };

  
  const total = cart.reduce((acc, item) => acc + (item.price * item.count), 0);

  return (
    
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, total, pizzas }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;