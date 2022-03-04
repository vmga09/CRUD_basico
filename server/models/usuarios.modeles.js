//Llama a la conexion a la base de datos
const conexion = require('../config/conexion');




module.exports = {
    listarUsuarios: function (callback) {
        let sql = 'select * from users';
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows);
            }
        })
    },

    signIn: function (username, password, callback) {
        conexion.query('select username,role_id from users where username=? and password=?',
            [username, password],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    console.log(rows);
                    return callback(rows);
                    
                }
            }
        )
    },

    consultarUsuario: function (username, callback) {
        conexion.query('select * from users where username=?',
            [username],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    //console.log(rows);
                    return callback(rows);
                    
                }
            }
        )
    }
}
