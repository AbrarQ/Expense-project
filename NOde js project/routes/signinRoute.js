const express = require('express');
const router = express.Router();
const signinControl = require('../controllers/signinCtrl');

router.get('/login/:id/:pass', signinControl.getUsers);
router.post('/password/forgotpassword', signinControl.resetPass);

module.exports = router;



