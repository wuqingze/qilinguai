var sql = require("./sql.js");
var database = require('./database.js');
// console.log(sql.login('nong','xiao'));

// var database = require("./database.js");
// console.log(database.jj());
// console.log(sql.honor_table('1000','shiijan'));



var s_id = '10152510231';
var p_name = 'shjxx';
var theme = '微软实习';
var introduction = '微软全球骇客马拉';
var explanation = '为你揭晓获奖的三';
var checked = 0;
var d = new Date();
var c = database.connection()
var h_id = Math.random().toString();
var file_id = 3243242;
// console.log(sql.insert_honor(h_id,p_name,s_id,theme,introduction,explanation,checked,file_id,'2015-12-31'));
for(var i=0; i<20; i++){
    var h_id = Math.random().toString();
    c.query(sql.insert_honor(h_id,p_name,s_id,theme,introduction,explanation,checked,file_id,'2015-12-31'),function(err,rows,field){
        console.log(err);
        console.log(rows);
    });
}
c.end();