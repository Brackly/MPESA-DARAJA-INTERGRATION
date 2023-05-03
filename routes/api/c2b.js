const express = require('express');
const router = express.Router();
const c2bController = require('../../controllers/c2bController');
router.route('/registerUrl')
    .post( c2bController.RegisterUrl)

module.exports = router;