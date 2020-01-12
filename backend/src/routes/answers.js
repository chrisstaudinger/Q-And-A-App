const express = require('express');
const router = express.Router();

const { create, destroy, update } = require('../controllers/answers-controller');

// auth middleware
const { checkJwt } = require('../middleware/auth-middleware');

router.post('/:id', checkJwt, create)
router.delete('/:id', checkJwt, destroy)
router.put('/:id', checkJwt, update)

module.exports = router;