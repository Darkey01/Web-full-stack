var app = angular.module('quizApp', ['ngRoute']);

//var apiBaseURL = 'http://0.0.0.0:3000/api';
var apiBaseURL = 'http://10.69.2.15:3000/api';

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller : 'LoginController',
			templateUrl : 'login.html'
		})
		.when('/accueil', {
			controller: 'QuizController',
			templateUrl: 'accueil.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.controller('LoginController', ['$scope', '$location', 'users', function($scope, $location, users) {
	$scope.loginError = false;

//	$scope.email = 'admin@localhost';
//	$scope.password = 'azerty';

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


app.controller('QuizController', ['$scope', '$location', 'users', 'questions', function($scope, $location, users, questions) {

	$scope.invalidResponse = false;
	$scope.currentQuestion = null;
	$scope.selectedResponseId = null;

	$scope.labelClasses = ['', '', ''];

	if (!users.authenticated) {
		$location.path('/');
		return;
	}

	var currentId = 1;
	var loadQuestionById = function(id) {
		questions.getQuestion(id).then(function(response) {
			$scope.currentQuestion = response.data;
		}, function(error) {
			console.log(error);
		});
	}
	loadQuestionById(currentId);

	$scope.validateQuestion = function() {
		$scope.invalidResponse = ($scope.selectedResponseId != $scope.currentQuestion.validResponseId);
		$scope.labelClasses = ['', '', ''];
		if (!$scope.invalidResponse) {
			currentId += 1;
			if (currentId == 4) {
				currentId = 1;
			}
			$scope.selectedResponseId = null;
			loadQuestionById(currentId);
		} else {
			$scope.labelClasses[$scope.selectedResponseId - 1] = 'invalid-input';
		}
	}
}]);

app.service('questions', ['fakeHttp', function($http) {	

	this.getQuestion = function(questionId) {

		var url = apiBaseURL + '/questions/' + questionId;

		var promise = $http.get(url);
		return promise;
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

app.directive('myCopyright', function() {
	return {
		restrict: 'AE',
		template: '<strong>© MyCompany {{ currentYear }}</strong>',
		scope: {
			currentYear: '=myCopyright'
		}
	}
});

app.directive('myGreeting', function() {
	return {
		restrict: 'A',
		template: '<strong>Hello {{ name }}</strong>',
		scope: {
			name: '=myGreeting'
		}
	}
});