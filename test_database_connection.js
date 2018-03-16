function mysqlconnection(){
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        user: 'root',
        password: 'root',
        database:'qilinguai'
    });
    connection.connect();
    return connection;
    // connection.end();
}

var connection = mysqlconnection();
var querysql = "select * from teacher";
connection.query(querysql,function(err, rows, fields) {    
  console.log(rows);
  connection.end();      
});
