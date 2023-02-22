const express = require('express');
const router = express.Router();
const signupControl = require('../controllers/signupCtrl');

router.post('/save-users', signupControl.saveUsers);

module.exports = router;


