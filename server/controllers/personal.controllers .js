///const conexion=require('../config/conexion');
const myModel = require('../models/personal.models');

module.exports = {
   listarPersonal: function (req, res) {
      console.log(req.username)
      myModel.listarPersonal(function (data) {
         res.send(data)
      })
   },

   listarPersonalId: function (req, res) {
      const id = req.params.id;
      myModel.listarPersonalId(id, function (data) {
         res.send(data)
      })
   },

   agregarPersonal: function (req, res) {

      var nombre = req.body.nombre;
      var cargo = req.body.cargo;
      var correo = req.body.correo;

      if (!nombre || !cargo || !correo) {

         return res.status(501).send('Falta información, campos vacios');
      }
      else {

         myModel.findpersonal(nombre, correo, function (data) {

            if (data != undefined) {

               return res.status(501).send('Usuario ya existente');
            }
            else {

               myModel.agregarPersonal(nombre, cargo, correo, function (data) {                 
                  return res.status(200).send('Personal ingresado exitosamente');
               })

            }
         })



      }
   },

   eliminarPersonalId: function (req, res) {
      var id = req.params.id;
      myModel.eliminarPersonalId(id, function (data) {
         res.send(data)

      })
   },

   modificarPersonal: function (req, res) {
      var id = req.params.id;
      var nombre = req.body.nombre;
      var cargo = req.body.cargo;
      var correo = req.body.correo;

      if (!nombre || !cargo || !correo) {
        /* res.render('agregarpersonal', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Uno o mas datos estan sin completar",
            alertIcon: 'info',
            showConfirmButton: true,
            timer: false,
            ruta: '/'
         }) */
      }

      else {
         myModel.modificarPersonal(id, nombre, cargo, correo, function (data) {
            //res.send(data)
            //res.redirect('/')

         })
      }

   }
}
