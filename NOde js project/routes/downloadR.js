const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadCTRL');
const userAuth = require('../middleware/tokenAuth');


router.get('/premium/download', userAuth.authenticate , downloadController.downloadExpense);
router.get('/premium/downloadlist', userAuth.authenticate , downloadController.downloadList);


module.exports = router;

