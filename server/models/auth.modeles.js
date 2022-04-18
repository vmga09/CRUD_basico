
const conexion = require('../config/conexion');

module.exports = {

    register: function (username, email, password, role_id, callback) {
        let sql = `insert into users(username,email,password,role_id) values('${username}','${email}','${password}','${role_id}')`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                //console.log(rows);
                return callback(rows);
            }

        })

    },

    finduser: function (username, email, callback) {
        conexion.query('select username,email from users where username=? or email=?',
            [username, email],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        )
    },

    validarUsuarioId: function (id,callback){
        conexion.query('select * from users where id=?',
            [id],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        )
    },

    validarSesion: function (session_id,callback){
        conexion.query('select data from sessions where session_id=?',
            [session_id],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        )
    },

    eliminarSession: function (session_id, callback) {
        let sql = 'Delete from sessions where session_id = ?';
        conexion.query(sql, session_id, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        })
    },

    tiempoExtra: function (tiempoExtra,session_id,callback){
        conexion.query('update sessions set expires = ? where session_id = ?',
            [tiempoExtra,session_id],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        )
    }
}