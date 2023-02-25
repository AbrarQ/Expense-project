const { all } = require('axios');
const expModel = require('../models/expenseDefine')
const loginModel = require('../models/dbDefine')
const sequelize = require('../util/dbConnect');
const { QueryTypes, where } = require('sequelize');

const sequelizedb = require('../util/dbConnect');
const { json } = require('body-parser');
const expmodel = require('../models/expenseDefine');


exports.addExpense = async (req, res, next) => {

    const t = await sequelize.transaction();
    await expModel.create({
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        userloginId: req.user.id
    }, { transaction: t }).then((data) => {
        const totalExp = Number(req.user.totalexp) + Number(req.body.amount)

        loginModel.update({ totalexp: totalExp }, {
            where: { id: req.user.id }, transaction: t
        })
            .then(async () => {
                await t.commit();
                res.status(200).json(data)
            })
            .catch(async (err) => {
                await t.rollback();
                res.status(500).json({ error: err })
            })
    })
        .catch(async (err) => {
            await t.rollback();
            res.status(500).json({ error: err })
        })






}




// router.get('/get-expense',
exports.getExpense = async (req, res, next) => {

    await expModel.findAll({ where: { userloginId: req.user.id } })
        .then(expenses => {
            res.status(200).json(expenses)
        })
        .catch(async (err) => res.status(500).json({ err }))


}



// router.delete('/del-expense/:id',
exports.delExpense = async (req, res, next) => {

    const t = await sequelize.transaction();

    const expID = req.params.id;

    console.log(req.user.totalexp);
    // console.log(req.body);


    const val = await expmodel.findAll({ where: { id: expID } })

    const check = JSON.stringify(val);
    const final = JSON.parse(check)
    const delAmount = final[0].amount;
    console.log(delAmount)


    const ab = await expModel.destroy({ where: { id: expID } }, { transaction: t })
        .then(data => {

            const totalExp = Number(req.user.totalexp) - Number(delAmount)

            loginModel.update({ totalexp: totalExp }, {
                where: { id: req.user.id }, transaction: t
            })   .then(async () => {
                await t.commit();
                res.status(200).json({data: data, message : "Expense Deleted"})
            })
            .catch(async (err) => {
                await t.rollback();
                res.status(500).json({ error: err, message : "Deletion Failure" })
            })
    })
        .catch(async (err) => {
            await t.rollback();
            res.status(500).json({ error: err, message : "Deletion Failure" })
        })
    }
