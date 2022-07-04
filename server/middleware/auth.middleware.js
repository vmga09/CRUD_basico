const jwt = require('jsonwebtoken');
const models = require('../models/auth.modeles');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.EXP_SESSION_CRYPTO);



exports.isAuthenticated = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const session_id = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO).idr
            //const idr = cryptr.decrypt(session_id);
            const idr = session_id;
            models.validarSesion(idr, function (data) {
                if (!data) {
                    return res.status(403).send('token not found');
                }
                else {
                    const expiresNew = Math.round((Date.now() + process.env.TIMEPO_EXTRA * 60 * 1000) / 1000)
                    models.tiempoExtra(expiresNew, idr, function (data) { })
                    req.session_id = idr
                    return next()
                }
            })
        } catch (error) {
            return res.status(401).send('Not authorized, invalid token');
        }
    } else {
        return res.status(401).send('Not authorized, token not found!')
    }
}


/*
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

exports.isAuthorizedAdmin = async (req, res, next) => {

    const rolekey = req.rolekey
    try {
        if (await bcryptjs.compare('admin', rolekey.substr(7))) {
            return next()
        }
        else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}


*/





//Middleware validar role desde el frontEnd

exports.isRoleAdmin = async (req, res, next) => {
    //const session_id = req.headers.rid_ss0.substr(7)
    const session_id = req.session_id
    try {
        models.validarSesion(session_id, function (data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else {
                let role_id = JSON.parse(data.data).role
                if (role_id === "admin") {
                    res.status(200).send('Is admin')
                }
                else {
                    return res.status(401).send('Not authorized');
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}

exports.isRoleEditor = async (req, res, next) => {

    //const session_id = req.headers.rid_ss0.substr(7)
    const session_id = req.session_id
    try {
        models.validarSesion(session_id, function (data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else {
                let role_id = JSON.parse(data.data).role
                if (role_id === "editor") {
                    res.status(200).send('Is Editor')

                }
                else {
                    return res.status(401).send('Not authorized');
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}

exports.isRoleEditorAdmin = async (req, res, next) => {
    //const session_id = req.headers.rid_ss0.substr(7)
    const session_id = req.session_id
    try {
        models.validarSesion(session_id, function (data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else {
                let role_id = JSON.parse(data.data).role
                if (role_id === "editor" || role_id === "admin") {
                    res.status(200).send('It is authorized')
                }
                else {
                    return res.status(401).send('Not authorized');
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}



//Middleware Admin o Editor Role para next() 


exports.isAuthRoleEditorAdmin = async (req, res, next) => {
    //const session_id = req.headers.rid_ss0.substr(7)
    const session_id = req.session_id
    try {
        models.validarSesion(session_id, function (data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else {
                let role_id = JSON.parse(data.data).role
                if (role_id === "editor" || role_id === "admin") {
                    return next()
                }
                else {
                    return res.status(401).send('Not authorized');
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}

exports.isAuthRoleAdmin = async (req, res, next) => {
    //const session_id = req.headers.rid_ss0.substr(7)
    const session_id = req.session_id
    //console.log(req.session.cookie.expires)
    try {
        models.validarSesion(session_id, function (data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else {
                let role_id = JSON.parse(data.data).role
                if (role_id === "admin") {
                    return next()
                }
                else {
                    return res.status(401).send('Not authorized');
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}