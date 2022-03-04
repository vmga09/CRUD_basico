const { validationResult } = require('express-validator');
const User = require('../models/usuarios.modeles')
/* const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); */

module.exports={
    listarUsuarios:function(req,res){
         User.listarUsuarios(function(data){
             res.send(data)
        })
     },

     signIn:function(req,res){
               //const { username,password } = req.body;
               var username = req.body.username;
               var password = req.body.password;
               //console.log(username,password)
               //res.json('Parametros recibidos ')
               User.signIn(username,password,function(data){
                    //res.send(username,password)
                    res.send(data)
                    //console.log(data)//res.send(data)
               })  
            
     }, 

      consultarUsuario:function(req,res){
          var username = req.body.username;
          //console.log(username,password)
          //res.json('Parametros recibidos ')
          User.consultarUsuario(username,function(data){
               console.log(username)
               res.send(data)
               console.log(data)
          })  
       
     },

     crearUsuario:function(req,res){
          const { username,email,password } = req.body
          //console.log(username,password)
          //res.json('Parametros recibidos ')
          User.consultarUsuario(username,function(data){
               console.log(username)
               res.send(data)
               console.log(data)
          })  
       
}

}