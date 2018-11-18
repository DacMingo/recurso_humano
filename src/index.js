const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//importando rutas
const empleadoRutas = require('./rutas/empleado');


//settings - configurar expres
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

//middlewares - son funciones que se ejecutan antes que se vengan las peticiones del usuario
app.use(morgan('dev'));//mostrar mensaje por consola sencilo
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'recursohumano',
    password: 'recurso1234',
    port: '3306',
    database: 'rrhh'
}, 'single'));
app.use(express.urlencoded({extended: false}));//encargado de revisar y convertir los datos que entran por medio del form en html
//app.use(cors());

app.use(cors());
//app.use(bodyParser.json());//entender las peticiones json


//routes - rutas
app.use(empleadoRutas);

//archivos estaticos
app.use(express.static(path.join(__dirname,'public/')));


//empezando servidor
app.listen(app.get('port'),()=>{
    console.log('Puerto del servidor 3000');
});