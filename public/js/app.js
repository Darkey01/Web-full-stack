var app = angular.module('quizApp', ['ngRoute']);
var router = require('express').Router();

//var apiBaseURL = 'http://0.0.0.0:3000/api';
var apiBaseURL = 'http://10.69.2.15:3000/api';

router.get(['/', '/index'], function(req, res) {
        res.render('index.html');
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller : '',
            templateUrl : 'login.html'
        })
        .when('/accueil', {
            controller: '',
            templateUrl: 'accueil.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('LoginController', ['$scope', '$location', 'users', function($scope, $location, users) {
    $scope.loginError = false;

	$scope.email = 'reynald@localhost';
	$scope.password = 'reynald';

    $scope.loginAction = function() {
        $scope.loginError = false;
        alert('email : ' + $scope.email + '  password : ' + $scope.password)

        var promise = users.loginUser($scope.email, $scope.password);
        promise.then(function(response) {
            $location.path('/accueil');
        }, function(error) {
            $scope.loginError = true;
        });
    }
}]);

app.controller('accueilController', ['$scope', 'users','article', function($scope, $location, users, article) {

    if (!users.authenticated) {
        $location.path('/');
        return;
    }
    article.getAccueil().then(function (response) {
        $scope.articleSoldes = response.articleSoldes;
        $scope.articleNouveau = response.articleNouveau;
        $scope.articleTop = response.articleTop;
    }, function (error) {
        console.log(error);
    });
}]);

app.service('article', ['fakeHttp', function($http) {

    this.getAccueil = function() {
        var url = apiBaseURL + '/accueil';
        return $http.get(url);
    }
}]);

app.service('users', ['fakeHttp', function($http) {

    this.authenticated = false;
    var users = this;

    this.loginUser = function(email, password) {

        users.authenticated = false;
        var loginUrl = apiBaseURL + '/Users/login';
        var postData = {
            'email': email,
            'password': password
        }
        var headers =  {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        var promise = $http.post(loginUrl, postData, headers);
        promise.then(function(response) {
            users.authenticated = true;
        }, function(error) {
            users.authenticated = false;
        });
        return promise;
    };
}]);