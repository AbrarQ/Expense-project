const express = require('express');
const router = express.Router();
const resetControl = require('../controllers/resetpass');
const uuidCheck = require('../middleware/uuidchecker');



router.post('/password/forgotpassword',uuidCheck.uuidDbCheck, resetControl.resetPass);
router.get('/password/resetpassword/:uuid',resetControl.sendhtml);
router.get('/Setpass.js', resetControl.sendjs);
// router.post('/savepass',resetControl.sendhtml);






module.exports = router;