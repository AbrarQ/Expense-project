const express = require('express');
const router = express.Router();
const uuidMiddleware = require('../middleware/uuidFunctions');
const passwordController = require('../controllers/passwordsController');


router.post('/Setpass.js', passwordController.sendjs);

router.post('/resetpassword/:uuid',passwordController.storepass, passwordController.sendhtml);

router.post('/forgotpassword',uuidMiddleware.uuidDbCheck, passwordController.resetPass);

module.exports = router;



// router.get('/Setpass.js', resetControl.sendjs);