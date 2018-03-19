
'use strict';

const honor_name = {"sxchzh":"思想成长" ,"shjxx":"实践学习" ,"zhygy":"志愿公益" ,"xshky":"学术科研" ,"wthd":"文体活动" ,"gzll":"工作履历" ,"kjzhsh":"考级证书"};
var sql = require("./sql.js");
var database = require('./database.js');

var os = require('os');
var nodeStatic = require('node-static');
var fs = require('fs');

var express = require('express');
var app = express();
app.use("/", express.static(__dirname));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var http = require('http').Server(app);
var io = require("socket.io")(http);


var loginUser = {'_ga':[]};

const successResult = {result:true};
const failResult = {result:false};


function getCookie(cookie){
    if(cookie in loginUser){
        return true;
    }
}


app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

io.on('connection', function(socket){
    console.log('a user connected '+socket.id);

    socket.on("login",function(msg){
        database.connection().query(sql.login(msg['username'],msg['password']),function(err, rows, fields) {
            if(err){
                socket.emit('login',failResult);
            }else{
                var count = rows.length;
                if(count == 0){
                    socket.emit('login',{result:count});
                }else if(count == 1){
                    loginUser[socket.id] = rows[0];
                    socket.emit('login',{result:count,cookie:socket.id});
                }
            }
        });
        // socket.emit("login",{cookie:'hello world',login:true});
    });

    socket.on('teacher_login',function(msg){
        database.connection().query(sql.teacher_login(msg['username'],msg['password']),function(err, rows, fields){
            console.log(rows);
            if(err){
                socket.emit('teacher_login',failResult);
            }else{
                var count = rows.length;
                if(count == 0){
                    socket.emit('teacher_login',{result:count});
                }else if(count == 1){
                    loginUser[socket.id] = rows[0];
                    socket.emit('teacher_login',{result:count,cookie:socket.id});
                }
            }
        });
    });

    socket.on('access', function(msg){
        if(getCookie(msg['cookie'])){
            socket.emit('access',successResult);
        }else{
            socket.emit('access',failResult);
        }
    });

    socket.on('honor_table',function(msg){
        console.log('honor_table-----------------------------------'+msg['cookie']);
        // var tables = {};
        // var cnct = database.connection();
        // for(var p_name in honor_name){
        //     console.log(sql.honor_table(loginUser[msg['cookie']]['s_id'],honor_name[p_name]));
        //     console.log(honor_name[p_name]);
        //     cnct.query(sql.honor_table(loginUser[msg['cookie']]['s_id'],honor_name[p_name]),function(err, rows, fields){
        //         tables[p_name] = rows;
        //         console.log(rows);
        //         console.log(tables[p_name]);
        //         if(Object.keys(tables).length == 7){
        //             console.log(Object.keys(tables).length);
        //             socket.emit('honor_table',tables);
        //             cnct.end();
        //         }
        //     });
        // }
        
        
        database.connection().query(sql.honor_table(loginUser[msg['cookie']]['s_id']),function(err, rows,fields){

            var tables = {};
            for(var p_name in honor_name){
                tables[p_name] = [];
            }

            for(var i in rows){
                // tables[rows[i]['p_name']] = tables[rows[i]['p_name']]?tables[rows[i]['p_name']]:[];
                tables[rows[i]['p_name']].push(rows[i]);
                console.log(rows[i]);
            }
            socket.emit('honor_table',tables);
            console.log(tables);
        });

        // socket.emit('honor_table',successResult);
    });

    socket.on('not_checked_honor',function(msg,fn){
        database.connection().query(sql.not_checked_honor,function(err,rows,fields){
            fn(rows);
        });
        
    });

    socket.on('checked_honor',(msg,fn)=>{
        database.connection().query(sql.checked_honor,(err,rows,fields)=>{
            fn(rows);
        });
    });

    socket.on('pass_honor',function(msg,fn){
        database.connection().query(sql.pass_honor(msg.h_id),function(err,results,fields){
            // console.log(err);
            // console.log(results);
            // console.log(fields);
            // console.log('---------------------------------------');
            fn(results);
        });
    });

    socket.on('deny_honor',function(msg,fn){
        database.connection().query(sql.deny_honor(msg.h_id),function(err,results,fields){
            fn(results);
        });
    });

    socket.on('cancel_honor',function(msg,fn){
        database.connection().query(sql.cancel_honor(msg.h_id),function(err,results,fields){
            fn(results);
        });
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
  });


function mysqlconnection(){
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'www.muedu.org',
    user: 'deit-2015',
    password: 'deit@2015!',
    database:'project_2015_5'
});
connection.connect();
return connection;
// connection.end();
}