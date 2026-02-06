import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alerta from '../components/Alerta'; 
import { UserContext } from '../context/UserContext'; 

const Register = () => { 
  const { register } = useContext(UserContext); 
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const validarDatos = async (e) => {
    e.preventDefault()

    setMensaje('');
    setTipoMensaje('');

    if(email === "" || password === "" || confirmPassword === ""){
      setMensaje("Todos los campos son obligatorios.");
      setTipoMensaje('danger');
      return;
    }
    if(password.length < 6){
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setTipoMensaje('danger');
      return;
    }
    if(password !== confirmPassword){
      setMensaje("Las contraseñas no coinciden.");
      setTipoMensaje('danger');
      return;
    }

    
    const exito = await register(email, password); 
    
    if (exito) {
      setMensaje("Registro exitoso. ¡Bienvenido! Redirigiendo...");
      setTipoMensaje('success');
      setTimeout(() => navigate('/profile'), 1500); 
    }
  }

  return (
    <Container className="my-5">
      
      <Form className='formulario-register p-4 border rounded shadow-sm w-50 mx-auto' onSubmit={validarDatos} noValidate>
        <h2 className="mb-4 text-center">Registro</h2>

        <Alerta mensaje={mensaje} tipo={tipoMensaje} />

        {/*email*/}
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
      
      {/*password*/}
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

      {/*confirmar password*/}
        <Form.Group className="confirm-password mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Password" 
          onChange = {(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword} 
          required
          />
        </Form.Group>
      
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
    </Container>
  );
}

export default Register; 