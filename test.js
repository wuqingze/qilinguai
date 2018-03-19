var sql = require("./sql.js");
var database = require('./database.js');
// console.log(sql.login('nong','xiao'));

// var database = require("./database.js");
// console.log(database.jj());
// console.log(sql.honor_table('1000','shiijan'));

database.connection().query(sql.pass_honor('fsk3jfk'),function(err,rows,field){
    console.log(err);
    console.log(rows);
    console.log(field);
});