const express = require('express');
const router = express.Router();
const stkpushController = require('./../controllers/stkpushController');

router.route('/')
    .get((req, res) => {
      res.status(200).json({'message':'This is the Mpesa integration service '})
})

router.route('/callback')
    .post(stkpushController.callback)

module.exports = router;