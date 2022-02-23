
//Llama a la conexion a la base de datos
const conexion = require('../config/conexion');

 //Export modulos 
 module.exports={
     //Lista personal en la base de datos
     listarPersonal:function(callback){
         let sql='select * from personal';
         conexion.query(sql,function(err,rows,fields){
             if(err) throw err;
             else{
                 return callback(rows);
             } 
         })
     },
    //Lista personal por ID en base de datos
    listarPersonalId:function(id,callback){
        let sql='select * from personal where id = ?';
        conexion.query(sql,id,function(err,rows,fields){
            if(err) throw err;
            else{
                return callback(rows[0]);
            } 
        })
    },
    //Agrega personal a la base de datos
    agregarPersonal:function(nombre,cargo,correo,callback){
        let sql=`insert into personal(nombre,cargo,correo) values('${nombre}','${cargo}','${correo}')`;
        conexion.query(sql,function(err,rows,fields){
            if(err) throw err;
            else{
                return callback(rows);
            } 
        })
    },
    //Elimina personal de la base de datos por Id
    eliminarPersonalId:function(id,callback){
        let sql='Delete from personal where id = ?';
        conexion.query(sql,id,function(err,rows,fields){
            if(err) throw err;
            else{
                return callback(rows[0]);
            } 
        })
    },


    //Modifica personal a la base de datos
    modificarPersonal:function(id,nombre,cargo,correo,callback){
        let sql=`update personal set 
                 nombre = '${nombre}',
                 cargo = '${cargo}',
                 correo = '${correo}'
                 where id = '${id}'
                 `;
        conexion.query(sql,function(err,rows,fields){
           if(err) throw err;
           else{
                return callback(rows);
        } 
    })
}



}

