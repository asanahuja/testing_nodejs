# Prueba de node.js
Prueba de conocimientos de node.js para back-end developer

## El funcionamiento se puede ver en:
http://vps158334.vps.ovh.ca:5555/

## Empezando ...
### Dependencias
* Express.js
* body-parse
* fs
* marked
* path
* pg
> Las podéis ver en el fichero package.json
### Instalación de las dependencias
1. Descargar o clonar el repositorio
2. Acceder a la carpeta
3. ejecutar `npm install`

## Creación de la BBDD
Ejectuar el script db.sql en base de datos PostgreSQL

### Ejecutar el servicio
¿Cómo ejecutarlo?\
Acceder a la carpeta del repositorio a través de un terminal.\
Ejecutar el comando:
```
node app.js
```
En el terminal tiene que salir esta respuesta:
```
Server listening on http://localhost:5555
```
El servidor ya está listo, así que podemos acceder a:\
<http://localhost:5555>

## API
### TODO LIST:
1. Obtener listado de tareas ordenado por "createAt" descendiente
2. Crear una nueva tarea
3. Eliminar una tarea según su "id"
4. Actualizar el campo "dueDate" a 2021-01-25 según su id

### SOLUTIONS:
1. GET /task
2. POST /task/create
```
{
 “name”: “Task1”,
 “dueDate”: “2020-09-10”,
 “priority”: 5
}
```
3. DELETE /task/:id
4. PUT /task/update/:id

### EXTRA:
Obtener tarea por id
GET /task/:id

## Autor
Albert Sanahuja\
> [LinkedIn](https://www.linkedin.com/in/albertsanahuja/)\
[Github](https://github.com/asanahuja)\
[e-mail](mailto://albert.sanahuja@sdezaina.com)
## Version History
* 0.0 - Init
