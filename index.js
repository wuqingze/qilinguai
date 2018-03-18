
'use strict';

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


    socket.on('access', function(msg){
        if(getCookie(msg['cookie'])){
            socket.emit('access',successResult);
        }else{
            socket.emit('access',failResult);
        }
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