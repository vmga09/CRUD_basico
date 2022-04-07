const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models/auth.modeles');



exports.isAuthenticated = async (req, res, next) => {
    const rolekey = req.headers.rolekey
    if (req.headers.authorization) {
        try {
            const decodificada = await jwt.verify(req.headers.authorization.substr(7), process.env.JWT_SECRETO)
            const id = decodificada.id
            models.validarUsuarioId(id, function (data) {
                if (!data) {
                    return res.status(401).send('Not authorized, token not found!');
                }
                else {
                    req.username = data.username
                    req.rolekey = rolekey
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

exports.isRoleAdmin = async (req, res, next) => {
    const session_id = req.headers.rid_ss0.substr(7)
    try {
        models.validarSesion(session_id,function(data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else
            {
                let role_id = JSON.parse(data.data).role
                  if(role_id === "admin"){
                    res.status(200).send('Is admin')  
                    return next()
                  }
                  else{
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
    const session_id = req.headers.rid_ss0.substr(7)
    try {
        models.validarSesion(session_id,function(data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else
            {
                let role_id = JSON.parse(data.data).role
                  if(role_id === "editor"){
                    res.status(200).send('Is Editor')  
                    return next()
                  }
                  else{
                    return res.status(401).send('Not authorized');  
                  }                 
            }
            })
            
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}


exports.isRoleEditororAdmin = async (req, res, next) => {
    const session_id = req.headers.rid_ss0.substr(7)
    try {
        models.validarSesion(session_id,function(data) {
            if (!data) {
                return res.status(401).send('Not authorized, session id not found');
            }
            else
            {
                let role_id = JSON.parse(data.data).role
                  if(role_id === "editor" || role_id === "admin"){
                    res.status(200).send('It is authorized')  
                    return next()
                  }
                  else{
                    return res.status(401).send('Not authorized');  
                  }                 
            }
            })
            
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}