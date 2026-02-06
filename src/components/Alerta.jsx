import Alert from 'react-bootstrap/Alert';

function Alerta({ mensaje, tipo }) {
  // Si no hay mensaje, el componente no muestra nada.
  if (!mensaje) {
    return null;
  }

  return (
    <Alert variant={tipo}>
      {mensaje}
    </Alert>
  );
}

export default Alerta;