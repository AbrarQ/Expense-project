const { all } = require('axios');
const expModel = require('../models/expenseDefine')
const loginModel = require('../models/dbDefine')
const sequelize = require("sequelize")
const { QueryTypes } = require('sequelize');

const sequelizedb  = require('../util/dbConnect');
const { json } = require('body-parser');

exports.getLeaderBoard = async(req,res,next)=> {
   
       const leaderArray = await loginModel.findAll({
       
        order : [[sequelize.col('totalexp'), "DESC"]]
       }) .catch(async(err)=> res.status(500).json({err}))
        console.log(leaderArray)
    res.status(200).json(leaderArray)
    
}

