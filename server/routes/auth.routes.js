const authController =require('../controllers/auth.controllers');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/auth.modeles');


//router.post('/api/register',authController.register)
router.post('/api/finduser',authController.validarusuario)
router.post('/api/login',authController.login)

module.exports = router