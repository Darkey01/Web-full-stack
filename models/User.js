/**
 * Created by Reynald on 13/01/2017.
 */
var db = require('../config/db');
var Schema = db.Schema;
var Article = require('../models/Article')

var userSchema= new Schema({
    nom: 'String',
    prenom: 'String',
    email : 'String',
    panier : [{type: Schema.Types.ObjectId, ref: 'Article'}],
    password : 'String',

});

var User= db.model('User', userSchema);

module.exports = User;