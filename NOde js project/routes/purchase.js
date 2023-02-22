const express = require('express');

const purchaseController = require('../controllers/purchases');
const userAuth = require('../middleware/tokenAuth');

const router = express.Router();
router.get('/login/premium', userAuth.authenticate, purchaseController.purchasePremium)
router.get('/login/check', userAuth.premiumcheck)
router.post('/login/updatetransactionstatus', userAuth.authenticate, purchaseController.postTransaction, purchaseController.makeHimPremium)

module.exports = router;

