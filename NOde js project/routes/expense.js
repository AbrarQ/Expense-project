const express = require('express');
const router = express.Router();
const expControl = require('../controllers/expenseadd');
const userAuth = require('../middleware/tokenAuth');

router.post('/login/add-expense',userAuth.authenticate ,expControl.addExpense);
router.get('/login/get-expense', userAuth.authenticate , expControl.getExpense);

router.delete('/login/delete-expense/:id', userAuth.authenticate,expControl.delExpense);

module.exports = router;

