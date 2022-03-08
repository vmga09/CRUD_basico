
const conexion = require('../config/conexion');

module.exports = {

    register:function(username,email,password,role_id,callback) {
        let sql = `insert into users(username,email,password,role_id) values('${username}','${email}','${password}','${role_id}')`;
        conexion.query(sql,function(err,rows,fields){
             if(err) throw err;
             else{
                 console.log(rows);
                 return callback(rows);
             }

        })
        
    },

    finduser:function(username,email,callback){
        //let sql = 'select username,email from users where username=? or email=?';
        conexion.query('select username,email from users where username=? or email=?',
        [username, email],
        (err,rows,fields)=> {
            if (err) throw err;
            else {
                //console.log(rows);
                return callback(rows[0]);
            }
        }
        )
}

}