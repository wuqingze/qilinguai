var socket = io.connect();

var app = angular.module('studentAPP', []);
app.directive('honortable', function(){
    return {
        templateUrl: 'honor_table.html',
        replace: true,
        restrict: 'AE',
    }
});

var honor_classic = {"sxchzh":"思想成长" ,"shjxx":"实践学习" ,"zhygy":"志愿公益" ,"xshky":"学术科研" ,"wthd":"文体活动" ,"gzll":"工作履历" ,"kjzhsh":"考级证书"};

app.controller('studentController',function($scope) {
    $scope.honortables = {sxchzh:[{p_name:"name",theme:"theme",introduction:"intr",checked:1,time:"djfk"},],shjxx:[{p_name:"name",theme:"theme",introduction:"intr",checked:1,time:"djfk"},{p_name:"name",theme:"theme",introduction:"intr",checked:1,time:"djfk"},],zhygy:[{p_name:"name",theme:"theme",introduction:"intr",checked:1,time:"djfk"},{p_name:"name",theme:"theme",introduction:"intr",checked:1,time:"djfk"},{p_name:"name",theme:"theme",introduction:"intr",checked:1,time:"djfk"},],xshky:[],wthd:[],gzll:[],kjzhsh:[]};
    $scope.table_show = true;

    socket.emit('honor_table',{cookie:getCookie('qilinguai')});
    socket.on('honor_table',function(msg){
        $scope.$broadcast("parentChange", msg);
    });

    $scope.submmit = function(){
        $scope.table_show = false;
        // $scope.$apply();
    }
});

app.controller('sxchzhController', function($scope){$scope.$on('parentChange',function(e,m){$scope.honors=m['sxchzh'];$scope.$apply()})});
app.controller('shjxxController', function($scope){$scope.$on('parentChange',function(e,m){$scope.honors=m['shjxx'];$scope.$apply()})});
app.controller('zhygyController', function($scope){$scope.$on('parentChange',function(e,m){$scope.honors=m['zhygy'];$scope.$apply()})});
app.controller('xshkyController', function($scope){$scope.$on('parentChange',function(e,m){$scope.honors=m['xshky'];$scope.$apply()})});
app.controller('wthdController', function($scope){$scope.$on('parentChange',function(e,m){$scope.honors=m['wthd'];$scope.$apply()})});
app.controller('gzllController', function($scope){$scope.$on('parentChange',function(e,m){$scope.honors=m['gzll'];$scope.$apply()})});
app.controller('kjzhshController', function($scope){$scope.$on('parentChange',function(e,m){$scope.honors=m['kjzhsh'];$scope.$apply()})});


// app.controller('sxchzhController', function($scope){
//     // $scope.test = $scope.$parent.tables[0];
// });

// app.controller('jj',function($scope){
//     $scope.$on("parentChange", function(e, m) {
//         $scope.test_ = m;
//         $scope.$apply();
//     })
// });


// socket.emit('honor_table',{cookie:getCookie('qilinguai')});
// socket.on('honor_table',function(msg){
//     for(p_name in msg){
//         console.log(p_name);
//         console.log(msg[p_name]);
        
//         var controller = p_name+"Controller";
//         // console.log(controller);
//         app.controller(controller,function($s){
//             console.log(controller);
//             $s.honors = msg[p_name];
//             $s.$apply();
//         });
//     }
//     // $scope.honors = msg['shjxx'];
//     // $scope.$apply();
//     // console.log(msg['shjxx']);
// });

// app.controller('shjxxController', function($scope) {
//     // $scope.honors = {"sxchzh":"思想成长" ,"shjxx":"实践学习" ,"zhygy":"志愿公益" ,"xshky":"学术科研" ,"wthd":"文体活动" ,"gzll":"工作履历" ,"kjzhsh":"考级证书"};
//     socket.emit('honor_table',{cookie:getCookie('qilinguai')});
//     socket.on('honor_table',function(msg){
//         $scope.honors = msg['shjxx'];
//         $scope.$apply();
//         console.log(msg['shjxx']);
//     });
//     // $scope.honors = [{p_name:"name",theme:"theme",introduction:"intr",checked:1,time:"djfk"},{p_name:"af",theme:"fdf",introduction:"dfdf",checked:1,time:"dfaf"},{p_name:"dfa",theme:"afa",introduction:"afaf",checked:0,time:"adfa"}]
// });

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}