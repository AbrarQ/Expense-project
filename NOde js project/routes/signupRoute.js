const express = require('express');

const signupControl = require('../controllers/signupCtrl');
const router = express.Router();


router.post('/save-users', signupControl.saveUsers);


module.exports = router;