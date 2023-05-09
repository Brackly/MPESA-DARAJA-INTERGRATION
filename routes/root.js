const express = require('express');
const router = express.Router();
const c2bController = require('./../controllers/c2bController');

router.route('/')
    .get((req, res) => {
      res.status(200).json({'message':'This is the Mpesa integration service '})
})

router.route('/validation')
    .post(c2bController.validation)
router.route('/callback')
    .post(c2bController.callback)

module.exports = router;