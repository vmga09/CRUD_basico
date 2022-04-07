
const jwt = require('jsonwebtoken');
const conexion = require('../config/conexion');
const User = require('../models/auth.modeles');
const bcryptjs = require('bcryptjs');





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

                    if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {

                        res.status(401).send('Not authorized');
                    }
                    else {
                        req.session.userid = results[0].id
                        req.session.username = results[0].username
                        req.session.role = results[0].role_id
                        req.session.email = results[0].email
                        
                        console.log('session:'+req.session.id,req.session.username,req.session.role)
                        const id = results[0].id
                        const role_id = results[0].role_id
                        const token = jwt.sign({ id: id, idr: role_id }, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        })

                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        rid_ss0 = req.session.id  
                        const roleHash = await bcryptjs.hash(req.session.role, 8)
                        return res.status(200).json({ token, cookieOptions, roleHash, rid_ss0 })

                    }


                })

        }
    } catch (err) {

    }


}



exports.logout = async (req, res) => {
    sessionStore.close();
    res.clearCookie('jwt')
    res.clearCookie('connect.sid')

}