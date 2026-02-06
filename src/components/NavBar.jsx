import { useContext } from 'react'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; 
import {Link} from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext'; 

function NavBar() {
  const { isLoggedIn, logout } = useContext(UserContext); 
  
  
  const { total } = useContext(CartContext);

  return (
    
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">¡Pizzería Mamma Mia!</Link>
          <Nav className="me-auto">
            
            <Link to="/" className="btn btn-outline-light ms-2">🍕 Home</Link>

            {isLoggedIn ? (
              <>
                <Link to="/Profile" className="btn btn-outline-light ms-2">🔓 Profile</Link>
                
                <Button variant="outline-light" className="ms-2" onClick={logout}>🔒 Logout</Button>
              </>
            ) : (
              <>
                <Link to="/Login" className="btn btn-outline-light ms-2">🔐 Login</Link>
                
                <Link to="/Register" className="btn btn-outline-light ms-2">🔐 Register</Link>
              </>
            )}
          </Nav>
          <Nav>
            <Link to="/Cart" className="btn btn-outline-info">
              🛒 Total: ${total.toLocaleString('es-CL')}
            </Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavBar;