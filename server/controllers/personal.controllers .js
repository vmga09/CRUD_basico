///const conexion=require('../config/conexion');
const myModel=require('../models/personal.models');

 module.exports={
    listarPersonal:function(req,res){
         myModel.listarPersonal(function(data){
             //res.send(data)
             //req.flash('personaldata',data)
             res.render('index',{ personal:data })
             //console.log(personal)
        })
     },
 
    listarPersonalId:function(req,res){
        const id = req.params.id;
         myModel.listarPersonalId(id,function(data){
            res.render('editarpersonal',{ personal:data })
            //console.log(data)
            
             
        })
     },
     
     agregarPersonal:function(req,res){
        
        var nombre = req.body.nombre;
        var cargo = req.body.cargo;
        var correo = req.body.correo;

         if(!nombre || !cargo || !correo ){
                   res.render('agregarpersonal',{
                   alert:true,
                   alertTitle: "Advertencia",
                   alertMessage:"Uno o mas datos estan sin completar",
                   alertIcon:'info',
                   showConfirmButton: true,
                   timer: false,
                   ruta:'/agregarpersonal'
                     })
               }
         else{

        myModel.agregarPersonal(nombre,cargo,correo,function(data){
             //res.send(nombre,cargo,correo)
             //res.send(data)
             res.render('index',{
               alert:true,
               alertTitle: "Registro exitoso",
               alertMessage:"Personal registrado exitosamente",
               alertIcon:'success',
               showConfirmButton: false,
               timer: 1000,
               ruta:'/'
           })

             //res.redirect('/')
        })
      }
     }, 
    
     eliminarPersonalId:function(req,res){
        var id = req.params.id;
         myModel.eliminarPersonalId(id,function(data){
             //res.send(data)
             res.redirect('/')
        })
     },

     modificarPersonal:function(req,res){
      var id = req.params.id;  
      var nombre = req.body.nombre;
      var cargo = req.body.cargo;
      var correo = req.body.correo;
      myModel.modificarPersonal(id,nombre,cargo,correo,function(data){
           
           res.redirect('/')
      })
   } 
 }
