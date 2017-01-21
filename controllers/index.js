var router = require('express').Router();

router.use('/login', require('./loginController'));
router.use('/api', require('./apiController'));

module.exports = router;
