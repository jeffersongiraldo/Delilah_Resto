# Delilah Restó 
Proyecto de backend realizado en el módulo final de la carrera DWFS de Acámica.

El objetivo del proyecto es generar el backend de una app de pedidos de comida típica colombiana llamada Delilah Restó, generando la arquitectura, bases de datos relacionales, endpoints funcionales y documentación.
En la plataforma los usuarios podrán registrarse, iniciar sesión, actualizar sus datos personales, ver los platos disponibles y realizar su orden. Además, esta API permitirá al administrador crear nuevos productos, actualizar los productos ya creados, visualizar a los usuarios registrados con sus pedidos y finalmente, el administrador podrá actualizar el estado de las ordenes.

* * *

### Pre-requisitos

Recursos utilizados y recomendados para poder levantar el proyecto y realizar las pruebas.

- **Node.js**
- **Nodemon**
- **XAMMP-phpmyadmin**
- **Postman** 
- **Swagger** 
- **MySQL**


### Estructura del proyecto

Esto te ayudará a entender de antemano como se organizan las carpetas del proyecto

- **DelilahResto_v1**
    
    - src
        - config
        - database
        - middlewares
        - models
        - routes 
        - utils
    - index.js
    - env.example



## Pasos a seguir:
Las siguientes instrucciones le permitirán al usuario poner a funcionar este proyecto en la maquina.

####  Clonar el repositorio o descargarlo desde GitHub
```
https://github.com/jeffersongiraldo/Delilah_Resto
```
#### Situarse en la carpeta del proyecto desde consola e instalar dependencias:
```
npm i
```
#### Configuración de base de datos:
1. Abrir XAMPP y configurar el puerto en el deseado.
2. Inicializar los servicios de Apache y MySQL.
3. Abrir el panel de control del servicio MySQL.
4. Crear una nueva Base de datos `delilah_resto_db`.
5. Importar y ejecutar Query de estructura de Tablas y carga de datos identificado con el nombre `database/delilah_resto_db.sql`.
7. Crear el archivo para el manejo de variables de entorno `.env` tomando como guía el archivo `.env.example`
8. Verificar datos (host, puerto, usuario, contraseña, nombre de la db) y ponerlos en el archivo `.env` 
9. Probar la conexión de la base de datos corriendo el siguiente comando en la consola  ` node  ./src/database/testConnection.js `

#### Ejecutar el programa:
En consola situarse dentro de la carpeta del proyecto y correr el comando:
```
node index.js
```

## Aclaración para pruebas

**Usuario con rol de Administrador**
Para crearlo, se deben agregar estos atributos y valores al objeto JSON, además de los otros datos que corresponden a la info personal del usuario:
 ```   
    {
        "isAdmin": "true",
        "adminCode": "delilahLoMejor"
    }
```

**Login en la plataforma**
Hay dos formas de logearse en la app, usando el usuario o email además de la contraseña. Aquí un ejemplo del JSON que se debe enviar:
```    
    {
    "username": "JBalvin",
    "password": "noaladepre"
    }    
```
```
    {
    "email": "elcrackdemedallo@email.com",
    "password": "noaladepre"
    }
```

**Crear una Orden**
- Para realizar una orden se debe enviar un JSON especificando el método de pago y el Array de productos a ordenar con su Id y cantidad deseada. Por ejemplo:
```
    {
    "products": [
        {
        "product_id": 1,
        "quantity": 1
        },
        {
        "product_id": 3,
        "quantity": 5
        },
        {
        "product_id": 4,
        "quantity": 2
        }
    ], 
    "paymentMethod": "credit card"
    }
```

- Dentro de las opciones del método de pago están las siguientes:
paymentMethod: "cash", "credit card", "transfer", "debit card".


**Opciones de Status de una Orden**
Tener en cuenta que úniamente el usuario que tenga rol de administrador puede cambiar el status de una orden. Dentro de las opciones que hay están las siguientes: 
    - statusOrden: "new", "confirmed", "in process", "sending", "delivered", "canceled".


### Autor:
- **Ana Maria Zapata**
- **Jefferson Giraldo**
---
