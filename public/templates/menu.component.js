/**
 * Created by Reynald on 01/02/2017.
 */
angular.module('navigationBarModule', ['ngRoute' , 'ngCookies']).component('navigationBar', {
    templateUrl: 'templates/navigation-bar.html',
    controller: ['$scope', '$routeParams',"$location", "$cookies","$route", function ($scope, $routeParams ,$location, $cookies,$route) {
        $scope.connected = false;

        if ($cookies.get("user")) {
            $scope.connected = true;
        }

        $scope.disconnect = function () {
            $cookies.remove("user");
            $location.path('/accueil');
            alert('j\'ai pas reussie a reload le component de la nav bar donc faite un F5');
        }
    }]
});