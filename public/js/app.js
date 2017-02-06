var app = angular.module('Ecommerce', ['ngRoute','ngCookies', 'footerModule' , 'navigationBarModule']);


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
            controller: 'personController',
            templateUrl: 'account.html'
        })
        .when('/panier', {
            controller: 'panierController',
            templateUrl: 'panier.html'
        })

});

app.controller('LoginController', ['$scope','$cookies','$location', 'users', function($scope,$cookies, $location, users) {
    $scope.email = 'reynald.jayr@localhost';
    $scope.password = 'azerty';

    if ($cookies.get("user")) {
        $location.path('/accueil');
        return;
    }
    $scope.loginAction = function() {
        var promise = users.loginUser($scope.email, $scope.password);
        promise.then(function(response) {
            if(!response.data.error) {
                $location.path('/accueil');
            }
        }, function(error) {
            console.log(error);
        });
    }
}]);

app.controller('panierController', ['$scope','$cookies','$location', 'article', function($scope,$cookies, $location, article) {
    $scope.prixTotal = 0;

    if (!$cookies.get("user")) {
        $location.path('/');
        return;
    }
    article.getArticleByUser($cookies.get("user")).then(function (response) {
        $scope.articleCommande = response.data.articles;
        console.log(response.data);
        $scope.articleCommande.forEach(function (article) {
            if(article.isPromo){
                $scope.prixTotal += article.prixPromo;
            }else{
                $scope.prixTotal += article.prix;
            }
        });
    }, function (error) {

    });

    $scope.validezCommande = function () {
        article.validezCmd($cookies.get('user')).then(function (response) {
            $location.path('/accueil');
            alert("Commande validé.");
            return;
        }, function (error) {

        });
    };

}]);

app.controller('detailController', ['$scope','$routeParams','$location','$cookies', 'article', function($scope ,$routeParams,$location,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
            $location.path('/');
            return;
        }
        var idUser = $cookies.get("user");
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
        var idUser = $cookies.get("user");
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
            $location.path('/');
            return;
        }
        var idUser = $cookies.get("user");
        article.postCart(idArticle , idUser).then(function (response) {
            alert('Article Ajouter au panier');

        }, function (error) {
            console.log(error);
        });

    };

    $scope.detailArticle = function (idProduit) {
        $location.path('article/'+idProduit);
    }
    article.getPhone().then(function (response) {
        $scope.articles = response.data.articles;
    }, function (error) {
        console.log(error);
    });
}]);

app.controller('computerController', ['$scope','$location','$cookies', 'article', function($scope ,$location ,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
            $location.path('/');
            return;
        }
        var idUser = $cookies.get("user");
        article.postCart(idArticle , idUser).then(function (response) {
            alert('Article Ajouter au panier');

        }, function (error) {
            console.log(error);
        });

    };

    $scope.detailArticle = function (idProduit) {
        $location.path('article/'+idProduit);
    }
    article.getPc().then(function (response) {
        $scope.articles = response.data.articles;
    }, function (error) {
        console.log(error);
    });
}]);

app.controller('tabletController', ['$scope','$location','$cookies', 'article', function($scope ,$location ,$cookies, article) {

    $scope.addCart = function (idArticle) {
        if (!$cookies.get("user")) {
            $location.path('/');
            return;
        }
        var idUser = $cookies.get("user");
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

app.controller('personController', function($scope, $http , $cookies , article) {
    $scope.disabledInput = true;
    $scope.toggle = function () {
        $scope.disabledInput = !$scope.disabledInput;
    };

    article.getUserById($cookies.get("user")).then(function (response) {
        var currentUser = response.data.user;
        $scope.prenom = currentUser.prenom;
        $scope.nom = currentUser.nom;
        $scope.email = currentUser.email;
        $scope.dateAnniversaire = currentUser.dateAnniversaire ;
        $scope.adresse = currentUser.adresse;

    }, function (error) {

    });

    $scope.enregistrerDonnees = function () {
        var user = {
            prenom : $scope.prenom,
            nom : $scope.nom,
            email : $scope.email,
            dateAnniversaire : $scope.dateAnniversaire,
            adresse : $scope.adresse
        };
        alert("Fonction non implémenté code api");
        var idUser = $cookies.get("user");
        /*$http.post(apiBaseURL + "/account/update/"+idUser, user).then(function (response) {
         alert("Vous avez bien modifié vos données");

         }, function (error) {

         });*/


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

    this.getUserById = function (idUser) {
        var url = apiBaseURL + '/account/' + idUser;
        return $http.get(url);
    };
    this.getArticleByID = function (idArticle) {
        var url = apiBaseURL + '/article/' + idArticle;
        return $http.get(url);
    } ;
    this.postCart = function (idArticle , idUser) {
        var url = apiBaseURL + '/addpanier/' + idArticle+"/"+idUser;
        return $http.post(url);
    }
    this.validezCmd = function (idUser) {
        var url = apiBaseURL + '/valpanier/' +idUser;
        return $http.get(url);
    }
    this.getArticleByUser = function (idUser) {
        var url = apiBaseURL + '/panier/' +idUser;
        return $http.get(url);
    }
});

app.service('users', ['$http' ,'$cookies', function($http , $cookies) {

    this.loginUser = function(email, password) {

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
            if(!response.data.error) {
                console.log();
                $cookies.put("user", response.data.user[0]._id);
            }else{
                alert("Utilisateur Inconnu") ;
            }
        }, function(error) {
        });
        return promise;
    };
}]);