const authController = require('../controllers/auth.controllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth.middleware')
//const { body } = require('express-validator');
//const User = require('../models/auth.modeles');
//const res = require('express/lib/response');
const personalcontroller = require('../controllers/personal.controllers ')

router.post('/finduser', authController.isAuthenticated, middleware.isAuthorizedAdmin, authController.validarusuario)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/mostrarpersonal', authController.isAuthenticated, personalcontroller.listarPersonal)
router.post('/agregarpersonal', authController.isAuthenticated, middleware.isAuthorizedAdmin, personalcontroller.agregarPersonal)
router.get('/eliminarpersonal/:id', authController.isAuthenticated, middleware.isAuthorizedAdmin, personalcontroller.eliminarPersonalId)
router.get('/listarPersonalId/:id', authController.isAuthenticated, middleware.isAuthorizedAdmin, personalcontroller.listarPersonalId)
router.put('/modificarpersonal/:id', authController.isAuthenticated, middleware.isAuthorizedAdmin, personalcontroller.modificarPersonal)
router.get('/isadmin', authController.isAuthenticated, middleware.isAdmin)

module.exports = router





// Rutas para las vistas
/*
router.get('/', authController.isAuthenticated, personalcontroller.listarPersonal, (req, res) => {
    res.render('index', { alert: false })
})

router.get('/inicio', (req, res) => {
    res.render('login', { alert: false })
})

router.get('/register', authController.isAuthorizedAdmin, (req, res) => {
    res.render('register', { alert: false })
})

router.get('/agregarpersonal', authController.isAuthorizedAdmin, (req, res) => {
    res.render('agregarpersonal')
})
*/

//router.get('/editarpersonal',authController.isAuthenticated,authController.isAuthorizedAdmin,(req,res)=>{
//       res.render('editarpersonal')
//   })
// router.get('/modificarpersonal',authController.isAuthorizedAdmin,(req,res)=>{
//         res.render('modificarpersonal')
//     })






