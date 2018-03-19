var socket = io.connect();

var app = angular.module('admin_app', []);

app.controller('main_controller',function($scope) {
   
});
app.controller('not_checked_controller',function($scope) {
    socket.emit('not_checked_honor',{cookie:getCookie('qilinguai_teacher')},function(msg){
        $scope.honors = msg;
        $scope.$apply();
    });
    $scope.pass = function(h_id,honor){
        honor.checked = 1;
        window.setTimeout(function(){honor.checked = 1024},250);
        socket.emit('pass_honor',{cookie:getCookie('qilinguai_teacher'),'h_id':h_id},function(msg){
            // alert(msg);
            // console.log(msg);
            // if(msg.changedRows != 0){
            //     $scope.honors = updateHonors($scope.honors,'pass',h_id);
            //     $scope.$apply();
            // }
            // console.log(msg);
        });
    };
    // socket.on('not_checked_honor',function(msg){alert(msg.result)});
});
app.controller('checked_controller',function($scope) {
    socket.emit('checked_honor',{cookie:getCookie('qilinguai_teacher')},(msg)=>{
        $scope.honors = msg;
        $scope.$apply();
       
    });
});

function updateHonors(honors,operation,h_id){
    if(operation == 'pass'){
        for(var i in honors){
            if(honors[i].h_id == h_id){
                honors.splice(i,1);
                return honors;
            }
        }
    }
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}