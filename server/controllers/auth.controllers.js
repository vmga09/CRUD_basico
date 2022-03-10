

const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexion = require('../config/conexion');
const User = require('../models/auth.modeles');
const bcryptjs = require('bcryptjs');
const { getDefaultFlags } = require('mysql/lib/ConnectionConfig');
const {promisify} = require('util')



exports.validarusuario = async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role_id = req.body.role_id;
    const passHash = await bcryptjs.hash(password,8)
    
    User.finduser(username,email,function(data){
        
        if(data!=undefined){
            //res.send('usuario ya existe')
            res.redirect('/register')
        }
        else {
            User.register(username,email,passHash,role_id,function(resp){
                //res.send(resp)
                res.redirect('/inicio')
            })
            
           
        }
        
        
    })
}


exports.login = async (req,res) =>{
         try {
            const username = req.body.username;
            const password = req.body.password;
            
              if(!username || !password){
                  res.render('login',{
                      alert:true,
                      alertTitle: "Advertencia",
                      alertMessage:"Ingrese un usuario y password",
                      alertIcon:'info',
                      showConfirmButton: true,
                      timer: false,
                      ruta:'inicio'
                  })
              }
              else {
                conexion.query('select * from users where username=?',
                [username],
                async (error,results)=>{
                    if(results.length ==0 || ! (await bcryptjs.compare(password, results[0].password))){
                        res.render('login',{
                            alert:true,
                            alertTitle: "Error",
                            alertMessage:"Usuario y/o password incorrectos",
                            alertIcon:'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta:'inicio'
                        })
                    }
                    else{
                        //res.send('usuario correcto')
                        const id = results[0].id
                        const token  = jwt.sign({id:id},process.env.JWT_SECRETO,{
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        })
                        //console.log(token)
                        const cookieOptions = {
                            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 *100),
                            httpOnly:true
                        }
                        res.cookie('jwt',token,cookieOptions)
                        res.render('login',{
                            alert:true,
                            alertTitle: "Conexion Exitosa",
                            alertMessage:"Login correcto!",
                            alertIcon:'success',
                            showConfirmButton: false,
                            timer: 800,
                            ruta:'/'
                        })




                        //res.redirect('/')
                        
                        
                    } 

                    
                })
                
              }
         }catch (err) {

         }

    
     }


     exports.isAuthenticated = async (req,res,next)=>{
         if(req.cookies.jwt){
             try {
                 const decodificada = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRETO)
                 conexion.query('SELECT * FROM users id = ?',[decodificada.id],(error, results)=>{
                     if(!results){return next()}
                     req.username = results[0]
                     return next()
                 })
             } catch (error) {
                 console.log(error)
                 return next()
                 
             }
         }else{
             res.redirect('/inicio')
         }
     }

     exports.logout = (req,res) =>{
         res.clearCookie('jwt')
         return res.redirect('/')
     }