const express = require('express');
const router = express.Router();
const expControl = require('../controllers/expenseadd');



router.post('/login/add-expense', expControl.addExpense);
router.get('/login/get-expense', expControl.getExpense);
router.delete('/login/delete-expense/:id', expControl.delExpense);

module.exports = router;

