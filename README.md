# Guía para levantar el proyecto Node.js + Express + PostgreSQL + ORM Sequelize

Este documento te guiará paso a paso para poner en marcha el proyecto, utilizando tres opciones diferentes para la base de datos PostgreSQL: local, Docker y conexión a la nube.

## Requisitos previos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (opcional)
- [pgAdmin4](https://www.pgadmin.org/) (opcional, para gestionar tu base de datos local)
- Acceso a un servicio de base de datos en la nube (opcional)

[pruebas backend.webm](https://github.com/user-attachments/assets/7521777a-9634-4b2f-a977-f346951c0c47)


---

## 1. (Opcion 1) Usar PostgreSQL local + pgAdmin4

Esta opción utiliza una instancia de PostgreSQL corriendo en tu máquina local. pgAdmin4 te ayudará a visualizar la base de datos que monta Docker si lo usas en la opción 2.

### Pasos

1. **Instala PostgreSQL y pgAdmin4**  
   Descarga e instala PostgreSQL y pgAdmin4 según tu sistema operativo.

2. **Crea una base de datos local**  
   Ingresa a pgAdmin4, crea una nueva base de datos (por ejemplo: `mi_proyecto_db`).

3. **Configura la conexión en el proyecto**  
   Edita el archivo `.env` con la conexión local. Ejemplo:
   ```
   DB_HOST="localhost"
   DB_PORT="5432"
   NAME_DATABASE="tcit"
   USER_DATABASE="postgres"
   CLAVE_DB="tu_Password1234"
   JWT_SECRET=hd72k9d8s7a6d81sajd81726hd91
   JWT_EXPIRES_IN=1h
   ```

4. **Instala las dependencias del proyecto**
   ```bash
   npm install
   ```

5. **Ejecuta las migraciones**
   ```bash
   npx sequelize-cli db:migrate --config config/config.js
   npx sequelize-cli db:seed:all --config config/config.js
   ```

6. **Levanta el proyecto**
   ```bash
   npm run start
   ```

---

## 2. (Opcion 2) Usar Docker con PostgreSQL

Esta opción utiliza Docker y Docker Compose para levantar la base de datos en un contenedor.

### Pasos

1. **Instalar docker compose**
   ```bash
   sudo apt install docker-compose-plugin -y
   ```

2. **Levanta el contenedor**
   ```bash
   docker-compose up -d
   ```

3. **Configura la conexión en el proyecto**  
   En tu archivo `.env`:
   ```
   DB_HOST="localhost"
   DB_PORT="5432"
   NAME_DATABASE="tcit"
   USER_DATABASE="postgres"
   CLAVE_DB="tu_Password1234"
   JWT_SECRET=hd72k9d8s7a6d81sajd81726hd91
   JWT_EXPIRES_IN=1h
   ```

4. **Instala las dependencias**
   ```bash
   npm install
   ```

5. **Ejecuta las migraciones**
   ```bash
   npx sequelize-cli db:migrate --config config/config.js
   npx sequelize-cli db:seed:all --config config/config.js
   ```

6. **Levanta el proyecto**
   ```bash
   npm run start
   ```

---
## Correr los test
   ```bash
   npm run test
   ```
---

## Notas adicionales

- Recuerda que debes crear un archivo `.env` en la raíz del proyecto con tus credenciales de base de datos.
- Si usas Docker, puedes administrar la base de datos desde pgAdmin4 conectándote a `localhost:5432`.
- Si usas la nube, asegúrate de que la IP de tu máquina tenga acceso a la base de datos.

---
