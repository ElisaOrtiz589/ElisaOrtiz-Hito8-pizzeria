import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'; 
import Alerta from '../components/Alerta'; 
import { UserContext } from '../context/UserContext'; 

const Login = () => {
  const { login } = useContext(UserContext); 
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const validarDatos = async (e) => {
    e.preventDefault()

    setMensaje('');
    setTipoMensaje('');

    // Validaciones
    if(email === "" || password === ""){
      setMensaje("Todos los campos son obligatorios.");
      setTipoMensaje('danger');
      return;
    }
    if(password.length < 6){
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setTipoMensaje('danger');
      return;
    }

    
    const exito = await login(email, password); 
    
    if (exito) {
      setMensaje('¡Inicio de sesión exitoso! Redirigiendo...');
      setTipoMensaje('success');
      setTimeout(() => navigate('/profile'), 1500); 
    }
  }


  return (
    <Container className="my-5">
      
      <Form className='formulario-login p-4 border rounded shadow-sm w-50 mx-auto' onSubmit={validarDatos} noValidate>
        
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

        <Alerta mensaje={mensaje} tipo={tipoMensaje} />
        
        <Form.Group className="email mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange = {(e) => setEmail(e.target.value)} 
            value={email} 
            required
          />
        </Form.Group>

        <Form.Group className="password mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Password" 
          onChange = {(e) => setPassword(e.target.value)} 
          value={password} 
          required
        />
        </Form.Group>
        
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">Ingresar</Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;