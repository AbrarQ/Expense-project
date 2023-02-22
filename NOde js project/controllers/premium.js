const { all } = require('axios');
const expModel = require('../models/expenseDefine')
const loginModel = require('../models/dbDefine')
const sequelize = require("sequelize")
const { QueryTypes } = require('sequelize');

const sequelizedb  = require('../util/dbConnect');
const { json } = require('body-parser');

exports.getLeaderBoard = async(req,res,next)=> {
    try{
       const leaderArray = await loginModel.findAll({
        attributes : ['id', 'name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_spend']],
        include :[{
            model : expModel,
            attributes : []
        }],
        group : ['userlogins.id'],
        order : [[sequelize.col('total_spend'), "DESC"]]
       });
        console.log(leaderArray)
    res.status(200).json(leaderArray)
    }catch(err){
          res.status(500).json(err)
    }
}
