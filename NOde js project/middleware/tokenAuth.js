const jwt = require('jsonwebtoken');
const usersModel = require('../models/dbDefine')

exports.authenticate =  (req,res, next) =>{
   try{
    const token = req.header("Authorization");
    console.log(token);
    console.log("entering authenticaation")

    const user = (jwt.verify(token, 'secretkey'));

    // console.log(user," token wala user")

    usersModel.findByPk(user.userId).then( user => {
        console.log(JSON.stringify(user))
        req.user =user;
        // console.log(req.user.totalexp)
      
        next();  
    }).catch((err => console.log(err)))
   } catch(err){
    console.log(err);
    res.status(401).json({success : false})
   }
}

exports.premiumcheck =  (req,res, next) =>{
    
     const token = req.header("Authorization");
     console.log(token);
     console.log("entering premiumcheck")
 
     const user = (jwt.verify(token, 'secretkey'));
 
     console.log(user," token wala user")
 
     usersModel.findByPk(user.userId).then( user => {
         console.log(JSON.stringify(user))
         req.user =user;
         console.log(req.user.ispremium,"premium check")
       
         res.status(200).json({message : "You are a Premium User"})
     }) .catch(async(err)=> res.status(500).json({error:err, success: false}))

   
   
 }

