const express = require('express');
const router = express.Router();

const { index, show, create, destroy } = require('../controllers/questions-controller');

// auth middleware
const { checkJwt } = require('../middleware/auth-middleware');

router.get('/', index)
router.get('/:id', show)
router.post('/', checkJwt, create)
router.delete('/question/:id', checkJwt, destroy)

module.exports = router;