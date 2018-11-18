const express = require('express');
const ruta = express.Router();

const empleadoControlador = require('../controlador/empleadoControlador');

ruta.get('/empleado', empleadoControlador.pagEmpleado);//llama la funcion en empleadoControlador.js
ruta.post('/add',empleadoControlador.save);
ruta.get('/delete/:id',empleadoControlador.delete);


//actualizar
ruta.get('/update/:id', empleadoControlador.edit);
ruta.post('/update/:id', empleadoControlador.update);

//para que se puedan llamar en el navegador
ruta.get('/listaempleado',empleadoControlador.pagListaEmpleado);
ruta.get('/listacontrato',empleadoControlador.pagListaContrato);
ruta.get('/deletecontrato/:id',empleadoControlador.deleteContrato);

ruta.get('/cargarweb',empleadoControlador.pagCargar);


//contrato
ruta.get('/asignar/:id',empleadoControlador.pasarEmpleado);
ruta.post('/contrato',empleadoControlador.saveContrato);


//llamar a json
ruta.get('/paginalistaempleado',empleadoControlador.pagListaEmpleadoCargarPagina);
ruta.get('/pagListaContratoCargarPagina',empleadoControlador.pagListaContratoCargarPagina);

module.exports = ruta;