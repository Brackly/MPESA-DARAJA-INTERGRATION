const express = require('express');
const router = express.Router();
const stkpushController = require('../../controllers/stkpushController');

router.route('/')
    .post( stkpushController.post)
    .get(stkpushController.get);
    

module.exports = router;