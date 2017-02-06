/**
 * Created by Reynald on 13/01/2017.
 */
var router = require('express').Router();
var Article = require('../models/Article');
var User = require('../models/User');
var multer = require('multer');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mime = require('mime');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/imgs');
    },
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(err, raw.toString('hex') + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        var extensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
        var ext = mime.extension(file.mimetype);
        if(extensions.indexOf(ext) != -1) {
            cb(null, true);
        }else {
            cb(new Error('Fichier incorrect'));
        }
    }
}).single('picture');

var parser = bodyParser.urlencoded({extended: false});


router.get('/phone', function(req, res) {

    Article.find({categorie : "phone"}).exec(function (err, articles) {
        res.json({articles : articles});
    });
});
router.get('/computer', function(req, res) {

    Article.find({categorie : "computer"}).exec(function (err, articles) {
        res.json({articles : articles});
    });
});
router.get('/tablet', function(req, res) {

    Article.find({categorie : "tablet"}).exec(function (err, articles) {
        res.json({articles : articles});
    });
});


router.get('/account/:id', function(req, res) {
    var userId = req.params.id;
    User.findById(userId).exec(function (err , user) {
        res.json({user : user});
    })
});

router.get('/account/update/:id', function(req, res) {
    var userId = req.params.id;
    User.findById(userId).exec(function (err , user) {
        //var req.body.
        user.save(function(err, postSaved) {

        });
    })
});


router.get('/article/:id', function(req, res) {
    var idArticle = req.params.id;
    Article.findById(idArticle).exec(function(err, article) {
        res.json({article: article});
    });
});

router.get('/panier/:idUser',parser, function(req, res) {
    var userId = req.params.idUser;
    User.findById(userId).populate('panier').exec(function (err , user) {

        res.json({articles : user.panier});
    })
});

router.get('/valpanier/:idUser',parser, function(req, res) {
    var idUser = req.params.idUser;
    User.update({ _id : idUser}, { panier : [] }, function (err) {
        if (err) { throw err; }
        console.log('Panier vidé modifiés !');
    });

});

router.post('/addpanier/:idArticle/:idUser',parser, function(req, res) {
    var idArticle = req.params.idArticle;
    var idUser = req.params.idUser;
    User.findById(idUser).exec(function (err , user) {
        user.panier.push(idArticle);

        user.save(function(err, postSaved) {
            Article.findById(idArticle).exec(function (err , article) {
                var stockN = article.stock - 1 ;

                Article.update({ _id : idArticle}, { stock: stockN}, function (err) {
                    if (err) { throw err; }
                    console.log('Panier vidé modifiés !');
                });
            });

        });

    });
});


    router.get('/', function(req, res) {
        console.log("jesus");
        Article.find({}).sort('-dateSortie').limit(5).exec(function (err, articleNouveau) {
            Article.find({isPromo : true}).limit(4).exec(function (err, articleSoldes) {
                Article.find({}).sort('-moyenneNote').limit(1).exec(function (err, articleTop) {
                    res.json({articleSoldes: articleSoldes, articleNouveau: articleNouveau, articleTop: articleTop});
                });
            });
        });
    });
    module.exports = router ;