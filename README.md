# Guía para levantar el proyecto Node.js + Express + PostgreSQL

Este documento te guiará paso a paso para poner en marcha el proyecto, utilizando tres opciones diferentes para la base de datos PostgreSQL: local, Docker y conexión a la nube.

## Requisitos previos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (opcional)
- [Docker](https://www.docker.com/) (opcional)
- [pgAdmin4](https://www.pgadmin.org/) (opcional, para gestionar tu base de datos local)
- Acceso a un servicio de base de datos en la nube (opcional)

---

## 1. Usar PostgreSQL local + pgAdmin4

Esta opción utiliza una instancia de PostgreSQL corriendo en tu máquina local. pgAdmin4 te ayudará a visualizar la base de datos que monta Docker si lo usas en la opción 2.

### Pasos

1. **Instala PostgreSQL y pgAdmin4**  
   Descarga e instala PostgreSQL y pgAdmin4 según tu sistema operativo.

2. **Crea una base de datos local**  
   Ingresa a pgAdmin4, crea una nueva base de datos (por ejemplo: `mi_proyecto_db`).

3. **Configura la conexión en el proyecto**  
   Edita el archivo `.env` con la conexión local. Ejemplo:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=mi_proyecto_db
   ```

4. **Instala las dependencias del proyecto**
   ```bash
   npm install
   ```

5. **Ejecuta las migraciones**
   ```bash
   npx sequelize db:migrate
   # O el comando propio de tu ORM para migrar la base de datos
   ```

6. **Levanta el proyecto**
   ```bash
   npm run start
   ```

---

## 2. Usar Docker con PostgreSQL

Esta opción utiliza Docker y Docker Compose para levantar la base de datos en un contenedor.

### Pasos

1. **Crea el archivo `docker-compose.yml`**  
   Ejemplo:
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:14
       restart: always
       ports:
         - "5432:5432"
       environment:
         POSTGRES_USER: tu_usuario
         POSTGRES_PASSWORD: tu_contraseña
         POSTGRES_DB: mi_proyecto_db
       volumes:
         - pgdata:/var/lib/postgresql/data
   volumes:
     pgdata:
   ```

2. **Levanta el contenedor**
   ```bash
   docker-compose up -d
   ```

3. **Configura la conexión en el proyecto**  
   En tu archivo `.env`:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=mi_proyecto_db
   ```

4. **Instala las dependencias**
   ```bash
   npm install
   ```

5. **Ejecuta las migraciones**
   ```bash
   npx sequelize db:migrate
   ```

6. **Levanta el proyecto**
   ```bash
   npm run start
   ```

---

## 3. Conexión directa a la nube (Cloud PostgreSQL)

Esta opción utiliza un servicio de base de datos PostgreSQL en la nube (como Heroku, Supabase, AWS RDS, etc).

### Pasos

1. **Obtén el string de conexión de tu proveedor de nube**  
   Ejemplo:
   ```
   postgres://usuario:contraseña@host:puerto/nombre_db
   ```

2. **Configura el string de conexión en el archivo `.env`**
   ```
   DATABASE_URL=postgres://usuario:contraseña@host:puerto/nombre_db
   ```
   O bien, separa los valores si tu ORM no utiliza un string completo:
   ```
   DB_HOST=host
   DB_PORT=puerto
   DB_USER=usuario
   DB_PASSWORD=contraseña
   DB_NAME=nombre_db
   ```

3. **Instala las dependencias**
   ```bash
   npm install
   ```

4. **Ejecuta las migraciones**
   ```bash
   npx sequelize db:migrate
   ```

5. **Levanta el proyecto**
   ```bash
   npm run start
   ```

---

## Comandos de migración

Asegúrate de tener configurado Sequelize, TypeORM, Knex o el ORM que uses. Los comandos comunes para migrar son:

```bash
npx sequelize db:migrate
# O el comando equivalente para tu ORM
```

---

## Notas adicionales

- Recuerda que debes crear un archivo `.env` en la raíz del proyecto con tus credenciales de base de datos.
- Si usas Docker, puedes administrar la base de datos desde pgAdmin4 conectándote a `localhost:5432`.
- Si usas la nube, asegúrate de que la IP de tu máquina tenga acceso a la base de datos.
- Consulta la documentación de tu ORM para más detalles sobre migraciones y conexión.

---

¡Listo! Ahora puedes elegir la opción que más se adapte a tus necesidades para levantar el proyecto Node.js + Express + PostgreSQL.