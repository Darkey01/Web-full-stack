/**
 * Created by Reynald on 13/01/2017.
 */
var db = require('../config/db');
var Schema = db.Schema;

var articleSchema = new Schema({
    nom: 'String',
    prix: 'Number',
    isPromo : 'Boolean',
    prixPromo : 'Number',
    description: 'String',
    stock : 'Number',
    dateAjout : 'Date',
    moyenneNote : {type : 'Number', default  : 0},
    image : 'String',
    categorie: 'String'
});
var Article = db.model('Article', articleSchema);

module.exports = Article;