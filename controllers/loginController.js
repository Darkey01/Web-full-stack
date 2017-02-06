/**
 * Created by Reynald on 13/01/2017.
 */
var router = require('express').Router();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mime = require('mime');
var multer = require('multer');
var User = require('../models/User');

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

router.post('/authentification' , function(req, res) {
    var email = req.body.email;
    var pwd = req.body.password;
    User.find({email : email , password : pwd}).exec(function (err, user) {
        if(user.length>0){
            res.json({user : user});
        }else{
            res.json({error : "Utilisateur inconnue"})
        }
    });

});




module.exports = router;