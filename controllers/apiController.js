/**
 * Created by Reynald on 13/01/2017.
 */
var router = require('express').Router();
var Article = require('../models/Article');
var Categorie = require('../models/Categorie');
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

router.get('/accueil', function(req, res) {
    console.log("jesus");
    Article.find({}).sort('-dateSortie').limit(5).exec(function (err, articleNouveau) {
        Article.find({isPromo : true}).limit(4).exec(function (err, articleSoldes) {
            Article.find({}).sort('-moyenneNote').limit(1).exec(function (err, articleTop) {
                res.json({articleSoldes: articleSoldes, articleNouveau: articleNouveau, articleTop: articleTop , ok : 'ok ca marche'});
            });
        });
    });
});



router.get(['/phone'], function(req, res) {
    //affiche index.html
    res.render('mobilePhone.html');

});

router.get(['/computer'], function(req, res) {
    //affiche index.html
    res.render('computer.html');

});

router.get(['/tablet'], function(req, res) {
    //affiche index.html
    res.render('tablet.html');

});


router.get(['/account'], function(req, res) {
    //affiche index.html
    res.render('account.html');

});

router.get(['/article/:id'], function(req, res) {
    //affiche detail.html
    var idArticle = req.params.id;
    Article.findById(idArticle).exec(function(err, arcticle) {
        res.render('fichesProduit.html', { arcticle: arcticle});
    });
});

router.get('/panier/:idUser',parser, function(req, res) {
    var userId = req.params.idUser;
    User.findById(userId).populate().exec(function (err , user) {
        res.render('panier.html', {articles : user.arcticle});
    })
});

router.post('/addpanier/:idArticle/:idUser',parser, function(req, res) {
    var idArticle = req.params.idArticle;
    var idUser = req.params.idUser;
    User.findById(userId).populate().exec(function (err , user) {
    user.pannier.push(idArticle);
    user.save(function(err, postSaved) {
       // res.redirect('/panier/'+idPost);
    });

    });

});

module.exports = router ;