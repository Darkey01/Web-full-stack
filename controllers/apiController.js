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

router.get(['/', '/index','/accueil'], function(req, res) {
    //affiche index.html

    Article.find({}).sort('-dateSortie').limit(5).exec(function (err, articleNouveau) {
        Article.find({isPromo : true}).limit(4).exec(function (err, articleSoldes) {
            Article.find({}).sort('-moyenneNote').limit(1).exec(function (err, articleTop) {
                res.render('accueil.html', {articleSoldes: articleSoldes, articleNouveau: articleNouveau, articleTop: articleTop});
            });
        });
    });
});

router.get(['/arcticle/:id'], function(req, res) {
    //affiche detail.html
    var idFilm = req.params.id;
    Article.findById(idFilm).exec(function(err, arcticle) {
        res.render('fichesProduit.html', { arcticle: arcticle});
    });
});

router.post('/article/:id',parser, function(req, res) {

});

module.exports = router ;