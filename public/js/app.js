var app = angular.module('Ecommerce', ['ngRoute','ngCookies', 'footerModule' , 'navigationBarModule']);


//var apiBaseURL = 'http://0.0.0.0:3000/api';
var apiBaseURL = 'http://localhost:1337/api';

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller : 'LoginController',
            templateUrl : 'login.html'
        })
        .when('/accueil', {
            controller: 'accueilController',
            templateUrl: 'accueil.html'
        })
        .when('/article/:idArticle', {
            controller: 'detailController',
            templateUrl: 'ficheProduit.html'
        })
        .when('/phone', {
            controller: 'phoneController',
            templateUrl: 'mobilePhone.html'
        })
        .when('/computer', {
            controller: 'computerController',
            templateUrl: 'computer.html'
        })
        .when('/tablet', {
            controller: 'tabletController',
            templateUrl: 'tablet.html'
        })
        .when('/account', {
            controller: '',
            templateUrl: 'account.html'
        })
        .when('/panier', {
            controller: '',
            templateUrl: 'panier.html'
        })

});

app.controller('LoginController', ['$scope', '$location', 'users', function($scope, $location, users) {
    $scope.loginError = false;
    $scope.email = 'reynald@localhost';
    $scope.password = 'azerty';

    $scope.loginAction = function() {
        $scope.loginError = false;
        var promise = users.loginUser($scope.email, $scope.password);
        promise.then(function(response) {
            $location.path('/accueil');
        }, function(error) {
            $scope.loginError = true;
        });
    }
}]);

app.controller('detailController', ['$scope','$routeParams','$location','$cookies', 'article', function($scope ,$routeParams,$location,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
            $location.path('/');
            return;
        }
        var idUser = $cookies.get("user").__id;
        console.log($cookies.get("user"));
        article.postCart(idArticle , idUser).then(function (response) {
            alert('Article Ajouter au panier');

        }, function (error) {
            console.log(error);
        });

    };

    article.getArticleByID($routeParams.idArticle).then(function (response) {
        $scope.articleD = response.data.article;
        $scope.disabledBouton = false ;
        var range = [];
        for(var i=5;i> $scope.articleD.moyenneNote ;i--) {
            range.push(i);
        }
        var note = [];
        for(var i=0;i<$scope.articleD.moyenneNote ;i++) {
            note.push(i);
        }
        $scope.note = note;
        $scope.range = range;
        if ($scope.articleD.stock == 0 ){
            $scope.stock = "Rupture de Stock";
            $scope.disabledBouton = true ;
        }else{
            if($scope.articleD.stock <= 5 ){
                $scope.stock = "Attention, plus que "+ $scope.articleD.stock + " arcicles.";
            }else{
                $scope.stock = "En stock.";
            }
        }

    }, function (error) {
        console.log(error)
    });

}]);

app.controller('accueilController', ['$scope','$location','$cookies', 'article', function($scope ,$location ,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
         $location.path('/');
         return;
         }
         var idUser = $cookies.get("user").__id;
        console.log($cookies.get("user"));
        article.postCart(idArticle , idUser).then(function (response) {
            alert('Article Ajouter au panier');

        }, function (error) {
            console.log(error);
        });

    };

    $scope.detailArticle = function (idProduit) {
        $location.path('article/'+idProduit);
    }
    article.getAccueil().then(function (response) {
        $scope.articleSoldes = response.data.articleSoldes;
        $scope.articleNouveau = response.data.articleNouveau;
        $scope.articleTop = response.data.articleTop;
    }, function (error) {
        console.log(error);
    });
}]);

app.controller('phoneController', ['$scope','$location','$cookies', 'article', function($scope ,$location ,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
            $location.path('/phone');
            return;
        }
        var idUser = $cookies.get("user").__id;
        console.log($cookies.get("user"));
        article.postCart(idArticle , idUser).then(function (response) {
            alert('Article Ajouter au panier');

        }, function (error) {
            console.log(error);
        });

    };

    $scope.detailArticle = function (idProduit) {
        $location.path('article/'+idProduit);
    }
    article.getAccueil().then(function (response) {
        $scope.articleSoldes = response.data.articleSoldes;
        $scope.articleNouveau = response.data.articleNouveau;
        $scope.articleTop = response.data.articleTop;
        console.log(response.data);
    }, function (error) {
        console.log(error);
    });
}]);

app.controller('computerController', ['$scope','$location','$cookies', 'article', function($scope ,$location ,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
            $location.path('/computer');
            return;
        }
        var idUser = $cookies.get("user").__id;
        console.log($cookies.get("user"));
        article.postCart(idArticle , idUser).then(function (response) {
            alert('Article Ajouter au panier');

        }, function (error) {
            console.log(error);
        });

    };

    $scope.detailArticle = function (idProduit) {
        $location.path('article/'+idProduit);
    }
    article.getAccueil().then(function (response) {
        $scope.articleSoldes = response.data.articleSoldes;
        $scope.articleNouveau = response.data.articleNouveau;
        $scope.articleTop = response.data.articleTop;
        console.log(response.data);
    }, function (error) {
        console.log(error);
    });
}]);

app.controller('tabletController', ['$scope','$location','$cookies', 'article', function($scope ,$location ,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
            $location.path('/tablet');
            return;
        }
        var idUser = $cookies.get("user").__id;
        console.log($cookies.get("user"));
        article.postCart(idArticle , idUser).then(function (response) {
            alert('Article Ajouter au panier');

        }, function (error) {
            console.log(error);
        });

    };

    $scope.detailArticle = function (idProduit) {
        $location.path('article/'+idProduit);
    }
    article.getTablet().then(function (response) {
        console.log(response.data.articles);
        $scope.articles = response.data.articles;
    }, function (error) {
        console.log(error);
    });
}]);

app.controller('personCtrl', function($scope, $http) {
    $scope.disabledInput = true;
    $scope.toggle = function () {
        $scope.disabledInput = !$scope.disabledInput;
    };

    $scope.enregistrerDonnees = function () {
        var user = {
            prenom : $scope.prenom,
            nom : $scope.nom,
            email : $scope.email,
            password : $scope.password
        };


        $http.post(apiBaseURL + "/account/update/:id", user);

        alert("Vous avez bien modifié vos données");
    }
});

app.service('article',  function($http) {

    this.getAccueil = function() {
        var url = apiBaseURL + '/';
        return $http.get(url);
    };
    this.getTablet = function () {
        var url = apiBaseURL + '/tablet';
        return $http.get(url);
    };
    this.getPc= function () {
        var url = apiBaseURL + '/computer';
        return $http.get(url);
    };
    this.getPhone = function () {
        var url = apiBaseURL + '/phone';
        return $http.get(url);
    };

    this.getArticleByID = function (idArticle) {
        var url = apiBaseURL + '/article/' + idArticle;
        return $http.get(url);
    } ;
    this.postCart = function (idArticle , idUser) {
        var url = apiBaseURL + '/addpanier/' + idArticle+idUser;
        return $http.post(url);
    }
});

 app.service('users', ['$http' ,'$cookies', function($http , $cookies) {

 this.authenticated = false;
 var users = this;

 this.loginUser = function(email, password) {

 users.authenticated = false;
 var loginUrl = apiBaseURL + '/login/authentification';
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
    /*$cookies.put("user" , response.data.user)*/
 }, function(error) {
 });
 return promise;
 };
 }]);