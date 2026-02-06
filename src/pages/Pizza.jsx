import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { pizzas as pizzasLocales } from '../components/pizzas'; 
import { CartContext } from '../context/CartContext'; 

const Pizza = () => {
  const { id } = useParams(); 
  const { addToCart } = useContext(CartContext); 
  
  const [pizza, setPizza] = useState(null)
  const [error, setError] = useState(false) 

  const consultarApi = async () => {
    try {
      const url = `http://localhost:5000/api/pizzas/${id}` 
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      setPizza(resultado)
    } catch (error) {
      console.error("Error al traer la pizza, usando backup local:", error)
      // Si la API falla, buscamos la pizza en el archivo local
      const pizzaLocal = pizzasLocales.find((p) => p.id.toLowerCase() === id.toLowerCase())
      if (pizzaLocal) {
        setPizza(pizzaLocal)
      } else {
        setError(true) // Solo mostramos error si tampoco está en el archivo local
      }
    }
  }

  useEffect(() => {
    consultarApi()
  }, [id]) 

  
  if (error) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">⚠️ Error al cargar la pizza</h2>
        <p>Parece que la API está apagada. Revisa la terminal.</p>
      </div>
    )
  }
  
  if (!pizza) {
    return <div className="text-center mt-5">Cargando pizza... 🍕</div>
  }

  const { name, price, ingredients, img, desc } = pizza;

  const formatPrice = (value) => {
    return value.toLocaleString('es-CL')
  };

  return(
    
    <Card style={{ width: '23rem' }} className="mx-auto my-5">
      
      <Card.Img variant="top" src={img} alt={name} />
      <Card.Body>
        
        <Card.Title className="text-capitalize fw-bold text-start">{name}</Card.Title>
        <hr />
        
        
        <Card.Text className="text-start">
          {desc}
        </Card.Text>
        
        <Card.Text className="text-center text-muted">
          Ingredientes:
        </Card.Text>
                
        <div className="d-flex align-items-center text-start">
          <span className="me-2">🍕</span>
          <ul className="list-inline mb-0">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="list-inline-item text-capitalize fs-7 me-2">{ingredient}{index < ingredients.length - 1 ? ',' : ''}</li>
            ))}
          </ul>
        </div>

        <hr />
        
        <Card.Text className="text-center h4">
          Precio: ${formatPrice(price)}
        </Card.Text>
        
        <div className="d-flex justify-content-between">
            
            <Button variant="dark" onClick={() => addToCart(pizza)}>Añadir <span className="ms-1">🛒</span></Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Pizza;