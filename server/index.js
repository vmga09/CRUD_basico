require('./config/conexion');
//Llama librería express
const express = require('express');

//Define constante de puerto
const port = (process.env.port || 3000);

const cors = require('cors');

var corsOptions = {
    origin: "http://172.17.0.5:4200"
};

//Express
const app = express();

//Admite formato json para body
app.use(express.json())

app.use(cors(corsOptions));

//Asignación del puerto 
app.set('port', port)

//Llama a rutas
require('./routes/personal.routes')(app);




//Iniciar servicio API por el puerto 3000
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('Error al iniciar el servidor '+error)
    }
    else{
        console.log('Servidor iniciado correctamente'+port)
    }
})