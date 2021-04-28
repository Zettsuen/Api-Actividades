# API NodeJS + Express + TS + MySQL


## Instalación

Instalar los paquetes de node

```bash
npm install
```

Cambiar la conexión a base de datos en el archivo

```bash
db/connection.ts
```

Compilar Typescript

```bash
tsc
```

Se generara la carpeta dist.

Luego se ha de ejecutar el servidor

```bash
node dist/app
```


## Como utilizar

Existen 2 rutas en la API:

```bash 

{host}:{port}/api/usuarios
{host}:{port}/api/actividades

```

La ruta de actividades soporta 2 peticiones ```GET```

```bash 

{host}:{port}/{route}/ --> Muestra todas las actividades
{host}:{port}/{route}/:id --> Muestra la actividad con el id :id

```
La ruta de usuarios soporta 2 peticiones ```GET```

```bash 

{host}:{port}/{route}/ --> Muestra todos los usuarios
{host}:{port}/{route}/:id --> Muestra el usuario con el id :id

```
La ruta de usuarios soporta 1 petición ```POST```

```bash 

{host}:{port}/{route}/ --> Añade un usuario. La estructura JSON es la siguiente:

{
    "nombre": "Paaa",
    "apellido": "Ferrer",
    "id_actividad": 1,
    "herramientas": "[\"aa\",\"bb\"]"
}

```

## Requisitos

La base de datos ha de existir y la tablas han de estar creadas

## Imagenes

En la carpeta ```/images``` hay capturas de la API funcionando 