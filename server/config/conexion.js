//Llama libreria de mysql
const mysql = require('mysql');

//Se define la configuración a la base de datos
const conexion = mysql.createConnection({
    host     : '172.17.0.2',
    user     : 'root',
    password : 'password.01',
    port: 3306,
    database: 'personal'
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