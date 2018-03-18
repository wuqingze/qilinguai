var app = angular.module('studentAPP', []);
app.directive('honortable', function(){
    return {
        templateUrl: 'honor_table.html',
        replace: true,
        restrict: 'AE',
    }
});

app.controller('studentController', function($scope) {

});