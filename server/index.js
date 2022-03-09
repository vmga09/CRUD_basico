//require('./config/conexion');
//Llama librería express
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config({path:'./env/.env'});

//Define constante de puerto
const port = (process.env.port || 3000);

const cors = require('cors');
const router = require('./routes/auth.routes');

var corsOptions = {
    origin: "http://172.17.0.5:4200"
};

//Express
const app = express();



//Admite formato json para body
app.use(express.json())
app.use(cookieParser())

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, PUT, DELETE, OPTIONS'
//     );
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Content-Type, Accept, X-Custom-Header, Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//       return res.status(200).end();
//     }
//     next();
//   });






//Asignación del puerto 
app.set('port', port)

//Llama a rutas
require('./routes/personal.routes')(app);
//require('./routes/auth.routes')(router);
app.use('/',require('./routes/auth.routes'))





//Iniciar servicio API por el puerto 3000
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('Error al iniciar el servidor '+error)
    }
    else{
        console.log('Servidor iniciado correctamente'+port)
    }
})