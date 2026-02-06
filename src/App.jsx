import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Pizza from './pages/Pizza.jsx'
import NotFound from './components/NotFound.jsx'
import Profile from './components/Profile.jsx'
import Footer from './components/Footer.jsx'
import {Route, Routes} from 'react-router-dom'
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartProvider from './context/CartContext.jsx';
import UserProvider, { UserContext } from './context/UserContext.jsx'; 
import { Navigate } from 'react-router-dom'; 
import './App.css'


const AppRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />}/>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/pizza/:id" element={<Pizza />}/>
      <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/404" element={<NotFound />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

function App() {
  return (
    
    <UserProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <NavBar/>
          <AppRoutes /> 
          <Footer/>
        </div>
      </CartProvider>
    </UserProvider>
  )
}

export default App
