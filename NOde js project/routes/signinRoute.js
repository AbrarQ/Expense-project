const express = require('express');
const router = express.Router();
const signinControl = require('../controllers/signinController');

router.get('/:id/:pass', signinControl.getUsers);

module.exports = router;



