const { all } = require('axios');
const expModel = require('../models/expenseDefine')
const loginModel = require('../models/dbDefine')
const sequelize = require('../util/dbConnect');
const { QueryTypes, where } = require('sequelize');
const helperFunction = require('../services/functions')
const S3helper = require('../services/S3Services')
const sequelizedb = require('../util/dbConnect');
const { json } = require('body-parser');
const aws = require('aws-sdk')
require("aws-sdk/lib/maintenance_mode_message").suppress = true;




exports.downloadExpense = async (req, res, next) => {

   try{
    const userID = req.user.id;
    const stringifiedExp = await helperFunction.getExpense(userID).then()


    const fileName = `Expense${userID}/${new Date()}.txt`;

    const fileurl = await S3helper.uploadToS3(stringifiedExp, fileName)
    console.log("file url is",fileurl)

    await  S3helper.urlExport(fileurl, userID)

     res.status(200).json({ fileurl, success: true })
   } catch(err){
    console.log(err)
    res.status(500).json({fileurl:'', success : false, err : err})
   }


}

exports.downloadList  = async (req, res, next)=>{

  try{
    const list = await S3helper.urlsFetch(req.user.id);
res.status(200).json({list})

   }catch(err){
    console.log(err)
   }

}




