
app.service('fakeHttp', function($q) {

	this.get = function(url) {
		var deferred = $q.defer();
		if (url == apiBaseURL + '/questions/1') {
			deferred.resolve({data:templateQuestionData(1)});
		} else if (url == apiBaseURL + '/questions/2') {
			deferred.resolve({data:templateQuestionData(2)});
		} else if (url == apiBaseURL + '/questions/3') {
			deferred.resolve({data:templateQuestionData(3)});
		} else {
			deferred.reject("Invalid url"); 
		}
		return deferred.promise;
	};

	this.post = function(url, loginData, headers) {
		var deferred = $q.defer();
		if (url == apiBaseURL + '/Users/login') {
			if (loginData.email == 'ludovic@localhost' && loginData.password == 'ludovic' ||loginData.email == 'reynald@localhost' && loginData.password == 'reynald') {
				deferred.resolve({data:templateLoginToken(1)});
			} else {
				deferred.reject("Invalid credentials"); 
			}
		} else {
			deferred.reject("Invalid url"); 
		}
		return deferred.promise;
	};
});

function templateQuestionData(id) {
	return {
		'title': 'Test question ' + id,
		'errorMessage' : 'Try again!',
		'imageURL': 'https://www.drupal.org/files/project-images/quiz-image_0.jpg',
		'response1': 'resp 1',
		'response2': 'resp 2',
		'response3': 'resp 3',
		'validResponseId': 2,
		'score': 100,
		'activated': true,
		'id': id
	};
}

function templateLoginToken(userId) {
	return {
		'id': '5XtrTRSD9uoTGO111fOcuHIgXdNiKuVhVHxFSdiKWFnPcf0xzMYicFuIwJvE5K7w',
		'ttl': 1209600,
		'userId': userId
	};
}
