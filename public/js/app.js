var app = angular.module('Ecommerce', ['ngRoute', 'footerModule' , 'navigationBarModule']);


//var apiBaseURL = 'http://0.0.0.0:3000/api';
var apiBaseURL = 'http://localhost:1337/api';


app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller : '',
            templateUrl : 'login.html'
        })
        .when('/accueil', {
            controller: 'accueilController',
            templateUrl: 'accueil.html'
        })
        .when('/phone', {
            controller: '',
            templateUrl: 'mobilePhone.html'
        })
        .when('/computer', {
            controller: '',
            templateUrl: 'computer.html'
        })
        .when('/tablet', {
            controller: '',
            templateUrl: 'tablet.html'
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
        $location.path('/accueil');
        var promise = users.loginUser($scope.email, $scope.password);
        promise.then(function(response) {
            $location.path('/accueil');
        }, function(error) {
            $scope.loginError = true;
        });
    }
}]);

app.controller('accueilController', ['$scope', 'article', function($scope , article) {
/*
    if (!users.authenticated) {
        $location.path('/');
        return;
    }*/
    article.getAccueil().then(function (response) {
        $scope.articleSoldes = response.data.articleSoldes;
        $scope.articleNouveau = response.data.articleNouveau;
        $scope.articleTop = response.data.articleTop;
        console.log(response.data);
    }, function (error) {
        console.log(error);
    });
}]);

app.service('article',  function($http) {

    this.getAccueil = function() {
        var url = apiBaseURL + '/accueil';
        return $http.get(url);
    }
});
/*
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
}]);*/