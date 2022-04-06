//Llama librería express
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './env/.env' });
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

//Define constante de puerto
const port = (process.env.NODE_PORT || 3000);

const cors = require('cors');
const router = require('./routes/auth.routes');
const { options } = require('./routes/auth.routes');


//Cors
var corsOptions = { 
    origin: process.env.CORS_URL
};

//Express
const app = express();

// Session Express
var sessionStore = new MySQLStore({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    mysql_port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  }
);


app.use(session({
    
    secret: process.env.EXP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false
    }
}))


//Admite formato json para body
app.use(express.json())
app.use(cookieParser())

app.use(cors(corsOptions));

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))



//Asignación del puerto 
app.set('port', port)

//Llama a rutas

app.use('/', require('./routes/auth.routes'))


//Iniciar servicio API por el puerto 3000
app.listen(app.get('port'), (error) => {
    if (error) {
        console.log('Error al iniciar el servidor ' + error)
    }
    else {
        console.log('Servidor iniciado correctamente' + port)
    }
})