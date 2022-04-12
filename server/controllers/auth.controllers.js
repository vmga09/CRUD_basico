
const jwt = require('jsonwebtoken');
const conexion = require('../config/conexion');
const User = require('../models/auth.modeles');
const bcryptjs = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.EXP_SESSION_CRYPTO);





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
            return res.status(401).send('Ingrese un usuario o password');           
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
                        //rid_ss0 = req.session.id 
                        
                        //console.log('session:'+req.session.id,req.session.username,req.session.role)
                        //const id = results[0].id
                        const rid_ss0 = cryptr.encrypt(req.session.id);
                        const token = jwt.sign({ idr:rid_ss0 }, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        })
                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }                         
                        //Envia token generado 
                        return res.status(200).json({ token })
                    }
                })
        }
    } catch (err) {

    }


}



// Función para eliminar la session 
exports.logout = async (req, res) => {
    //Obtiene del token la session id 
    const session_id = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO).idr
    const decryptedString = cryptr.decrypt(session_id); 
    //Ejecuta la funcion eliminar session con el valor de la session capturada 
    await User.eliminarSession(decryptedString,function(data) {
        return res.status(200).send('Session Terminada');
    })
}