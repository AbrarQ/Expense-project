const express = require('express');
const router = express.Router();
const savepass = require('../controllers/savepass');
const uuidCheck = require('../middleware/uuidchecker');



router.post('/Setpass.js', savepass.sendjs);

router.post('/password/resetpassword/:uuid',savepass.storepass);


module.exports = router;