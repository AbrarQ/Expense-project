const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premium');
const userAuth = require('../middleware/tokenAuth');


router.get('/premium/leaderboard',userAuth.authenticate,premiumController.getLeaderBoard);

module.exports = router;
