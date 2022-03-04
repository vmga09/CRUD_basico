const rutas = require('express').Router();
const controller =require('../controllers/auth');

module.exports = function (app){

    app.get('/api/listarUsuarios', controller.listarUsuarios);
    app.post('/api/signIn', controller.signIn);
    app.post('/api/consultarUsuario', controller.consultarUsuario);

}









/* const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/usuarios.models');

const authController = require('../controllers/usuario.controllers');

router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router; */