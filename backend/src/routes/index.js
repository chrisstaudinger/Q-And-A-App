const express = require('express');
const router = express.Router();

router.use('/answer', require('./answers'));
router.use('/', require('./questions'));

module.exports = router;