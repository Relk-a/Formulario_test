Formulario de Pago:

Aplicación web para el registro y administración de pagos con tarjeta, con frontend en React (Vite) y backend en Node.js/Express. Permite gestionar pagos de manera segura y visualizar transacciones a través de un panel de administración protegido.


Demo:

Frontend: https://formulario-test-murex.vercel.app

Backend: https://formulario-test.onrender.com


Características:

Formulario de pago seguro

Panel de administración protegido por login

Autenticación con JWT

Modo claro/oscuro

Validaciones y enmascaramiento de datos


Instalación:
# Clonar el repositorio
git clone <url-del-repo>
cd formulario_pago

# Backend
cd backend
npm install
# Configura .env con tus variables
node server.js

# Frontend
cd ../frontend
npm install
npm run dev


Uso:

Completa los datos en el formulario para registrar un pago.

Accede a /admin para ver el panel de administración (solo administradores).


Tecnologías:

Frontend: React, Vite, CSS

Backend: Node.js, Express, MongoDB, JWT


Seguridad:

CVV no almacenado

Número de tarjeta enmascarado

Acceso al panel protegido por JWT
