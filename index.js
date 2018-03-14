
'use strict';

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
    console.log('a user connected');

    socket.on("login",function(msg){
        console.log(msg['cookie']);
        socket.emit("login",{cookie:'hello world',login:true});
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