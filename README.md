# Simracing League Manager
**Proyecto final de Grado Superior de Desarrollo de Aplicaciones Web**

 Herramienta para administrar ligas de simracing. ¡Crea tu propia comunidad de simracing con tus amigos! 

## Despliegue de la aplicación

 ### Programas necesarios:
-  [**Node.js**](https://nodejs.org/en/) para poder ejecutar el proyecto.
- [**PHPMyAdmin**](https://www.phpmyadmin.net/) o [**Laragon**](https://laragon.org/) para poder guardar la base de datos.

1. Descargar el contenido de la **release más reciente**.
2. Descomprimir el contenido de la release en cualquier carpeta.
3. Hacer una copia del `src/api/.env.example` a `.env` y modificar lo que se considere necesario.
4. Crear una base de datos con el nombre que aparece en el `.env` de la API. Por defecto `league_manager`.
5. Encender la base de datos, asegurandonos de que está creada.
6. Entrar al subdirectorio `src/api` y ejecutar los siguientes comandos:
```powershell
npm i
npx prisma migrate dev --name init; npm run seed
npm run start
```
6. Importar el SQL de la defensa (`defensa.sql`, si lo tienes).
7. Entrar al subdirectorio `src/client` y ejecutar los siguientes comandos:
```powershell
npm i
ng s --open
```
