const authController =require('../controllers/auth.controllers');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/auth.modeles');
const res = require('express/lib/response');

// Rutas para las vistas

router.get('/',authController.isAuthenticated,(req,res)=>{
    res.render('index')
})

router.get('/inicio',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})


//router.post('/api/register',authController.register)
router.post('/api/finduser',authController.validarusuario)
router.post('/api/login',authController.login)
router.get('/logout',authController.logout)

module.exports = router