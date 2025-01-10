# Proyecto de Gestión de Libros y Autores

1. **Instrucciones para el Seed de la Base de Datos**:
   - Se ha agregado un **script de seed** para inicializar la base de datos de MongoDB con datos predeterminados (autores y libros). Este seed es útil para poblar la base de datos con datos de prueba.

2. **Backup de la Configuración de Mongoose**:
   - Se ha incluido el código de configuración de **Mongoose** y un ejemplo básico de cómo crear un **`DatabaseSeedService`** para insertar datos en la base de datos.

---

## **Instrucciones**

### **Requisitos**

- **Node.js**: Este proyecto utiliza **Node.js 20**. Asegúrate de tener esta versión de Node instalada para garantizar la compatibilidad con el entorno de desarrollo.

- **npm**: El gestor de paquetes de **Node.js** se usa para instalar las dependencias. Asegúrate de tener **npm** instalado en tu entorno.

---

### **Pasos para Configuración y Ejecución**

1. **Instalar Dependencias**:
   - Ejecuta el siguiente comando para instalar las dependencias necesarias:

   `npm install`

2. **Ejecutar la Aplicación**:
   - Para iniciar la aplicación en modo de desarrollo, ejecuta:

   `npm run start:dev`

3. **Ejecutar el Seed**:
   - Después de que la aplicación esté corriendo, puedes poblar la base de datos con datos iniciales ejecutando:

   `npm run seed`

   Esto ejecutará el script que inserta datos de prueba (autores y libros) en la base de datos.

---

## **Documentación de la API con Swagger**

Para acceder a la documentación interactiva de la API, puedes usar **Swagger**. Después de iniciar la aplicación, Swagger estará disponible en la siguiente URL:

**URL**:  
`http://localhost:3000/api`

Esta ruta te permitirá explorar todos los endpoints disponibles de la API, realizar pruebas y obtener información detallada sobre cada uno de ellos.


## **Recomendaciones Finales**

- Asegúrate de que **MongoDB** esté en funcionamiento antes de ejecutar el script de seed.
- Si necesitas agregar más datos o realizar alguna personalización en el seed, puedes editar el archivo `database-seed.ts`.

---
