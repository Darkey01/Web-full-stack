var router = require('express').Router();

router.use('/login', require('./loginController'));
router.use(['/', '/index'], require('./apiController'));

module.exports = router;