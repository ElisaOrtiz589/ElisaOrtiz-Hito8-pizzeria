## Hito 8 - Pizzería Mamma Mía (Autenticación JWT)

Este proyecto es la entrega final de la aplicación de React para la pizzería "Mamma Mía". En este hito, se ha implementado la autenticación real con un backend utilizando **JWT (JSON Web Token)**.

### Características Implementadas

El proyecto cumple con los siguientes requerimientos de autenticación y manejo de estado:

1.  **Autenticación con API (UserContext):**
    - Se implementaron los métodos `login` y `register` en el `UserContext`.
    - Estos métodos consumen las rutas `/api/auth/login` y `/api/auth/register` respectivamente.
    - Se almacena el **token JWT** y el **email** del usuario en el estado global tras una autenticación exitosa.

2.  **Cierre de Sesión (Logout):**
    - Se implementó el método `logout` en el `UserContext` que elimina el token y el email del estado.
    - El botón de logout en el Navbar cierra la sesión del usuario.

3.  **Perfil de Usuario (Profile):**
    - Se implementó el método `getProfile` que consume la ruta protegida `/api/auth/me`.
    - Se envía el token JWT en el header `Authorization` para validar la sesión.
    - La página `Profile.jsx` muestra el email del usuario autenticado y un botón para cerrar sesión.

4.  **Integración en Vistas (Login/Register):**
    - Las páginas `Login.jsx` y `Register.jsx` utilizan los métodos del `UserContext` para interactuar con el backend y acceder al sistema.

5.  **Carrito y Checkout (Cart):**
    - En `Cart.jsx`, se implementó el método para enviar el carrito de compras al backend consumiendo la ruta `/api/checkouts`.
    - La petición incluye el token JWT en el header para autorizar la compra.
    - Se muestra un mensaje de éxito al usuario cuando la compra se realiza correctamente.

### Cómo ejecutar el proyecto

1.  Clona o descarga el repositorio.
2.  Asegúrate de tener el backend corriendo.
3.  En la terminal, navega a la carpeta del proyecto e instala las dependencias con `npm install`.
4.  Ejecuta la aplicación con `npm run dev`.

## 👤 Autor

Elisa Ortiz - [ElisaOrtiz589](https://github.com/ElisaOrtiz589)
# ElisaOrtiz-Hito8-pizzeria
