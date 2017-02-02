var router = require('express').Router();

router.use('/login', require('./loginController'));
router.use('/*', require('./apiController'));


module.exports = router;