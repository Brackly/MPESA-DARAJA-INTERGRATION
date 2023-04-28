const express = require('express');
const router = express.Router();
const b2cController = require('../../controllers/b2cController');

router.route('/')
    .post( b2cController.post)
    .get(b2cController.get);
    

module.exports = router;