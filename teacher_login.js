var app = angular.module('teacherloginapp', []);

app.controller('teacherlogincontroller', function($scope) {
    $scope.username = "";
    $scope.password = "";
    $scope.login_result = "";
    var socket = io.connect();


    $scope.login = function(){
        socket.emit('teacher_login',{username:this.username,password:this.password});
    }

    socket.on('teacher_login', function(msg){
        if(msg.result == 1){
            document.cookie = "qilinguai_teacher="+msg.cookie;
            document.location.href = "./administrator.html";
        }else{
            $scope.login_result = "用户不存在或密码错误";     
            // alert("用户不存在或密码错误");
            $scope.$apply();
        }
    });
});