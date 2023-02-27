const { all } = require('axios');
const expModel = require('../models/expenseDefine')
const loginModel = require('../models/dbDefine')
const sequelize = require("sequelize")


const sequelizedb  = require('../util/dbConnect');
const { json } = require('body-parser');

exports.getLeaderBoard = async(req,res,next)=> {
    try{
        if (req.user.ispremium==="True"){
   
            const leaderArray = await loginModel.findAll({
            
             order : [[sequelize.col('totalexp'), "DESC"]]
            }) .catch(async(err)=> res.status(500).json({err, message: false}))
             // console.log(leaderArray)
         res.status(200).json(leaderArray)
     }else{
         res.status(402).json("You are not a premium user")
     }
    }catch(err){console.log(err); console.log("error at store pass")}
   

    
}

