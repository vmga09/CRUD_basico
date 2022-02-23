const conexion=require('../config/conexion');
const myModel=require('../models/personal.models');

 module.exports={
    listarPersonal:function(req,res){
         myModel.listarPersonal(function(data){
             res.send(data)
        })
     },
 
    listarPersonalId:function(req,res){
        var id = req.params.id;
         myModel.listarPersonalId(id,function(data){
             res.send(data)
        })
     },
     
     agregarPersonal:function(req,res){
        
        var nombre = req.body.nombre;
        var cargo = req.body.cargo;
        var correo = req.body.correo;
        myModel.agregarPersonal(nombre,cargo,correo,function(data){
             //res.send(nombre,cargo,correo)
             res.send(data)
        })
     }, 
    
     eliminarPersonalId:function(req,res){
        var id = req.params.id;
         myModel.eliminarPersonalId(id,function(data){
             res.send(data)
        })
     },

     modificarPersonal:function(req,res){
      var id = req.params.id;  
      var nombre = req.body.nombre;
      var cargo = req.body.cargo;
      var correo = req.body.correo;
      myModel.modificarPersonal(id,nombre,cargo,correo,function(data){
           res.send(data)
      })
   } 
 }
