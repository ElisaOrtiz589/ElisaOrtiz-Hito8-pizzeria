import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { CartContext } from "../context/CartContext"; 
import { UserContext } from "../context/UserContext";

const Cart = () => {
  
  const { cart, increaseQuantity, decreaseQuantity, total } = useContext(CartContext);
  const { token } = useContext(UserContext); 
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false); // Estado para saber si se está enviando

  const formatPrice = (value) => {
    return value.toLocaleString("es-CL");
  };

  const handleCheckout = async () => {
    if (!token) return;
    setLoading(true); // Activamos el loading al empezar

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      if (response.ok) {
        setMensaje("Compra realizada con éxito 🎉");
      } else {
        setMensaje("Error al realizar la compra ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error de conexión");
    } finally {
      setLoading(false); // Desactivamos el loading termine bien o mal
    }
  };

  return (
    <Container className="my-5">
      <div className="p-4 border rounded shadow-sm bg-white w-75 mx-auto">
        <h4 className="mb-4">Detalles del pedido:</h4>
        {cart.map((item, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <img src={item.img} alt={item.name} style={{ width: '80px' }} />
              <h6 className="text-capitalize ms-3 mb-0">{item.name}</h6>
            </div>
            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-3 text-success">
                ${formatPrice(item.price * item.count)}
              </h6>
              <Button variant="outline-danger" onClick={() => decreaseQuantity(item.id)}>-</Button>
              <span className="mx-2 fw-bold">{item.count}</span>
              <Button variant="outline-primary" onClick={() => increaseQuantity(item.id)}>+</Button>
              
            </div>
          </div>
        ))}

        <hr />

        <div className="d-flex flex-column align-items-start">
          <h3 className="mb-3">Total: ${formatPrice(total)}</h3>
          {/* Deshabilitamos el botón si no está logueado */}
          <Button variant="dark" disabled={!token || loading} onClick={handleCheckout}>
            {loading ? "Procesando..." : "Pagar"}
          </Button>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
      </div>
    </Container>
  );
};

export default Cart;
