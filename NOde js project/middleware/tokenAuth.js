const jwt = require('jsonwebtoken');
const usersModel = require('../models/dbDefine')

exports.authenticate =  (req,res, next) =>{
   try{
    const token = req.header("Authorization");
    console.log(token);
    console.log("entering authenticaation")

    const user = (jwt.verify(token, 'secretkey'));

    // console.log(user," token wala user")
    usersModel.findByPk(user.userId).then( data => {
        console.log(JSON.stringify(data))
        req.user =data;
        console.log(req.user.id)
        // console.log(req.user.totalexp)
      
        next();  
    }).catch((err => console.log(err)))
   } catch(err){
    console.log(err);
    res.status(401).json({success : false})
   }
}

exports.premiumcheck =  (req,res, next) =>{
    

    try{

        
        const token = req.get("Authorization");
        console.log(token);
        console.log("entering premiumcheck")
    
        const user = (jwt.verify(token, 'secretkey'));
    
        console.log(user)
   
   
        if (user.ispremium==="True"){
            console.log("Exiting PremiumCheck")
        res.status(200).json({message : "You are a Premium User"})
        req.user =user.userID;
       
        next();
        } else {
           res.status(500).json({success: false});
        }

    }catch(e){
        console.log(e)
    }
    

 
    //  usersModel.findByPk(user.userId).then( user => {
    //      console.log(JSON.stringify(user))
    //      
    //      console.log(req.user.ispremium,"premium check")
       
    //      
    //  }) .catch(async(err)=> res.status(500).json({error:err, success: false}))

   
   
 }

