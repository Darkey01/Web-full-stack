/**
 * Created by Reynald on 13/01/2017.
 */
var router = require('express').Router();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mime = require('mime');
var multer = require('multer');


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
}).single('affiche');

var parser = bodyParser.urlencoded({extended: false});

router.get('/login' , function(req, res) {
    //affiche ajout.html
    res.render('/views/login.html');
});

router.get(['/add'] , function(req, res) {
    //affiche ajout.html
    res.render('ajout.html');
});

router.post(['/add'], parser,  function(req, res){

    upload(req, res, function(err) {


    });
});

module.exports = router;
