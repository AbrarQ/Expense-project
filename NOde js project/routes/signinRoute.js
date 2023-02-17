const express = require('express');
const router = express.Router();
const signinControl = require('../controllers/signinCtrl');

router.get('/login/:id', signinControl.getUsers);

module.exports = router;