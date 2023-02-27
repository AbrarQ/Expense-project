const { all } = require('axios');
const expModel = require('../models/expenseDefine')
const loginModel = require('../models/dbDefine')
const sequelize = require('../util/dbConnect');

const helperFunction = require('../services/functions')
const S3helper = require('../services/S3Services')
const sequelizedb = require('../util/dbConnect');
const { json } = require('body-parser');
const aws = require('aws-sdk')
 require("aws-sdk/lib/maintenance_mode_message").suppress = true;





exports.downloadExpense = async (req, res, next) => {
   
   try{
      if (req.user.ispremium==="True"){
         
    const userID = req.user.userId;
    const stringifiedExp = await helperFunction.getExpense(userID).then()


    const fileName = `Expense${userID}/${new Date()}.txt`;

    const fileurl = await S3helper.uploadToS3(stringifiedExp, fileName)
   //  console.log("file url is",fileurl)

    await  S3helper.urlExport(fileurl, userID)

     res.status(200).json({ fileurl, success: true })
      } else{
         res.status(402).json("You are not a premium user")
      }
   } catch(err){
    console.log(err)
    console.log("error at store pass")
    res.status(500).json({fileurl:'', success : false, err : err})
   }


}

exports.downloadList  = async (req, res, next)=>{
 
  try{
   if (req.user.ispremium==="True"){
    const list = await S3helper.urlsFetch(req.user.userId);
res.status(200).json({list})
} else{
   res.status(402).json("You are not a premium user")
}

   }catch(err){
      console.log("error at store pass")
    console.log(err)
   }
   
}




