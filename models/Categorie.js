/**
 * Created by Reynald on 13/01/2017.
 */
var db = require('../config/db');
var Article = require('../models/Article.js');
var Schema = db.Schema;

var categorieSchema= new Schema({
    nom: 'String',
    description: 'String',
    article: [{ type: Schema.Types.ObjectId, ref: 'Article'}]
});

var Categorie = db.model('Categorie', categorieSchema);

module.exports = Categorie;