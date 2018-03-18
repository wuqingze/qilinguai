module.exports = {
    connection : function(){
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            user: 'root',
            password: 'root',
            database:'qilinguai'
        });
        connection.connect();
        return connection;
        },
    jj: function(){
        return "jj";
    }
}