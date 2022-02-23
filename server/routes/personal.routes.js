const rutas = require('express').Router();
const controller =require('../controllers/personal.controllers ');


module.exports = function (app){

    app.get('/api/listarPersonal', controller.listarPersonal);
    app.get('/api/listarPersonalId/:id', controller.listarPersonalId);
    app.post('/api/agregarPersonal', controller.agregarPersonal);
    app.get('/api/eliminarPersonal/:id', controller.eliminarPersonalId);
    app.put('/api/modificarPersonal/:id',controller.modificarPersonal);

}


