import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
        <i className="fa-solid fa-triangle-exclamation text-danger fa-5x mb-3"></i>
        <h1 className="mb-4">Error 404</h1>
        <h2 className="mb-4">Página no encontrada</h2>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  )
}

export default NotFound