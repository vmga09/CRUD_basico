const authController =require('../controllers/auth.controllers');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/auth.modeles');
const res = require('express/lib/response');
const personalcontroller = require('../controllers/personal.controllers ')

// Rutas para las vistas

router.get('/',authController.isAuthenticated,personalcontroller.listarPersonal,(req,res)=>{
    res.render('index')
})

router.get('/inicio',(req,res)=>{
    res.render('login',{alert:false})
})

router.get('/register',authController.isAuthorizedAdmin,(req,res)=>{
    res.render('register')
})

router.get('/agregarpersonal',authController.isAuthorizedAdmin,(req,res)=>{
    res.render('agregarpersonal')
})




router.get('/modificarpersonal',(req,res)=>{
        res.render('modificarpersonal')
    })

//router.get('/listarPersonalId/:id',authController.isAuthorizedAdmin,(req,res)=>{
//        res.render('modificarpersonal')
//    })





//router.post('/api/register',authController.register)
router.post('/finduser',authController.validarusuario)
router.post('/login',authController.login)
router.get('/logout',authController.logout)
router.post('/agregarpersonal',personalcontroller.agregarPersonal)
router.get('/eliminarpersonal/:id',authController.isAuthorizedAdmin,personalcontroller.eliminarPersonalId)
router.get('/listarPersonalId/:id',personalcontroller.listarPersonalId)
router.post('/modificarpersonal',personalcontroller.modificarPersonal)

module.exports = router