

const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexion = require('../config/conexion');
const User = require('../models/auth.modeles');
const bcryptjs = require('bcryptjs');
const { getDefaultFlags } = require('mysql/lib/ConnectionConfig');
const { promisify } = require('util');
const { append, clearCookie } = require('express/lib/response');
const { NULL } = require('mysql/lib/protocol/constants/types');
const myModel = require('../models/personal.models');
//const { removeTicks } = require('sequelize/types/utils');




exports.validarusuario = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role_id = req.body.role_id;
    const passHash = await bcryptjs.hash(password, 8)

    //console.log(req.body)
    console.log(username, password, email, role_id)
    if (!username || !password || !email || !role_id) {
        return res.status(501).send('Falta información');
    }

    else {
        User.finduser(username, email, function (data) {
            if (data != undefined) {
                return res.status(501).send('Usuario y/o email ya existente');
            }
            else {
                User.register(username, email, passHash, role_id, function (resp) {
                    return res.status(200).send('Usuario ingresado' + role_id);
                })
            }
        })
    }
}


exports.login = async (req, res) => {

    try {
        res.clearCookie('jwt')
        res.clearCookie('connect.sid')
        const username = req.body.username;
        const password = req.body.password;
        console.log('usuario:' + username)
        if (!username || !password) {
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'inicio'
            })
        }
        else {
         
        

            conexion.query('select * from users where username=?',
                [username],
                async (error, results) => {
                    //console.log(results[0])
                    if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                        /* res.render('login',{
                             alert:true,
                             alertTitle: "Error",
                             alertMessage:"Usuario y/o password incorrectos",
                             alertIcon:'error',
                             showConfirmButton: true,
                             timer: false,
                             ruta:'inicio'
                         }) */
                        res.status(401).send('Not authorized');
                    }
                    else {
                        //res.send('usuario correcto')
                        const id = results[0].id
                        const role_id = results[0].role_id
                        const token = jwt.sign({ id: id, idr: role_id }, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        })
                        //console.log(token) 
                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        //req.session.role = results[0].role_id
                        rid_ss0 = results[0].role_id
                        //const role = req.session.id
                        const roleHash = await bcryptjs.hash(rid_ss0, 8)
                        //console.log(req.session.id)
                        //console.log(req.session.cookie)
                        //console.log('el token es: '+token)
                        //console.log('el role es: '+roleHash)
                        //console.log(results[0].role_id)
                        //console.log(req.session.role)
                        //res.cookie('jwt',token,cookieOptions)
                        return res.status(200).json({ token, cookieOptions, roleHash, rid_ss0 })

                    }


                })

        }
    } catch (err) {

    }


}


exports.isAuthenticated = async (req, res, next) => {

    const rolekey = req.headers.rolekey

    if (req.headers.authorization) {
        try {

            const decodificada = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO)

            const exp = decodificada.exp

            conexion.query('select * from users where id=?',
                [decodificada.id],
                async (error, results) => {
                    if (!results) {

                        return res.status(401).send('Not authorized, token not found!');


                    }

                    else {
                        req.username = results[0]
                        req.rolekey = rolekey

                        return next()

                    }


                })
        } catch (error) {
            //console.log('Token expiratdo ==>' + error)
            return res.status(401).send('Not authorized, invalid token'); //next()

        }
    } else {
        return res.status(401).send('Not authorized, token not found!')
        // res.redirect('/inicio')
    }
}

exports.isAuthorizedAdmin = async (req, res, next) => {

    const rolekey = req.rolekey
    //console.log('Esto es:' + rolekey)
    //console.log(rolekey)
    //const role = req.session.role

    try {

        //if(role == 'admin'){
        if (await bcryptjs.compare('admin', rolekey.substr(7))) {

            //res.status(200).send('IS OKrs')
            return next()
        }
        else {




            res.status(401).json({ error: 'Unauthorized' })
            /* res.render('index',{
               alert:true,
               alertTitle: "Error",
               alertMessage:"No esta autorizado para ejecutar esta acción",
               alertIcon:'error',
               showConfirmButton: true,
               timer: false,
               ruta:'/'


               }) 
           */


        }

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
        //return next()

    }

}


exports.isAdmin = async (req, res, next) => {
    const rolekey = req.rolekey
    try {
        if (await bcryptjs.compare('admin', rolekey.substr(7))) {

            res.status(200).send('Autorized')
        }
        else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}







exports.logout = async (req, res) => {

    res.clearCookie('jwt')
    res.clearCookie('connect.sid')

    res.render('index', {
        alert: true,
        alertTitle: "Logout",
        alertMessage: "Logout exitoso",
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 800,
        ruta: '/inicio'

    })

}