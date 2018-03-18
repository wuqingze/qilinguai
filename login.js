var app = angular.module('loginAPP', []);

app.controller('loginController', function($scope) {
    $scope.username = "";
    $scope.password = "";
    $scope.login_result = "";
    var socket = io.connect();


    $scope.login = function(){
        socket.emit('login',{username:this.username,password:this.password});
        console.log('login');
    }


    
    socket.on('login', function(msg){
        if(msg.result == 1){
            document.cookie = "qilinguai="+msg.cookie;
            document.location.href = "./student.html";
        }else{
            $scope.login_result = "用户不存在或密码错误";     
            // alert("用户不存在或密码错误");
            $scope.$apply();
        }
    });
});