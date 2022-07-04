const authController = require('../controllers/auth.controllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth.middleware')
const personalcontroller = require('../controllers/personal.controllers ')

router.post('/finduser', middleware.isAuthenticated, middleware.isAuthRoleAdmin, authController.validarusuario)
//router.post('/finduser', authController.validarusuario);
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/mostrarpersonal', middleware.isAuthenticated, personalcontroller.listarPersonal)
router.post('/agregarpersonal', middleware.isAuthenticated, middleware.isAuthRoleAdmin, personalcontroller.agregarPersonal)
//router.get('/eliminarpersonal/:id', middleware.isAuthenticated, middleware.isAuthorizedAdmin, personalcontroller.eliminarPersonalId)
router.get('/eliminarpersonal/:id', middleware.isAuthenticated, middleware.isAuthRoleEditorAdmin, personalcontroller.eliminarPersonalId)
router.get('/listarPersonalId/:id', middleware.isAuthenticated,middleware.isAuthRoleEditorAdmin, personalcontroller.listarPersonalId)
router.put('/modificarpersonal/:id', middleware.isAuthenticated, middleware.isAuthRoleEditorAdmin, personalcontroller.modificarPersonal)
router.get('/isadmin', middleware.isAuthenticated, middleware.isRoleAdmin)
router.get('/iseditoroadmin', middleware.isAuthenticated, middleware.isRoleEditorAdmin)

//router.get('/isadmin', middleware.isAuthenticated, middleware.isAdmin)

//Rutas TEST 

//router.post('/testadmin',middleware.isRoleAdmin)
//router.post('/testeditor',middleware.isRoleEditor)
//router.post('/testaoe',middleware.isRoleEditororAdmin)


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






