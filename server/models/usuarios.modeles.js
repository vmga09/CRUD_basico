//Llama a la conexion a la base de datos
const conexion = require('../config/conexion');

moddule.exports = class User {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password
    }

    static find(email) {
        return conexion.execute('SELECT * FROM users WHERE email = ?', [email]);
      }


    static save(user) {
        return conexion.execute(
            'INSERT INTO users (username, email, password) (?,?,?)',
            [user.username,user.email,user.password]
        );
    }
};

