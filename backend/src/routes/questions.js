const express = require('express');
const router = express.Router();

const { index, create, update, destroy } = require('../controllers/questions-controller');

// middleware
const authMiddleware = require('../middleware/auth-middleware');

router.get('/', index);
router.post('/', authMiddleware, express.json(), create)
router.put('/', authMiddleware, express.json(), update)
router.delete('/', authMiddleware, express.json(), destroy)

module.exports = router;