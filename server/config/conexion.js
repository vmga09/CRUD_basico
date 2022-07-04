//Llama libreria de mysql
const mysql = require('mysql');

  const conexion = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });



  conexion.connect((err)=>{
      if(err){
          console.log('Error en la conexion '+err)      
      }
      else {
          console.log('Conexión exitosa a la base de datos MySql')
      }
  });

  module.exports = conexion;