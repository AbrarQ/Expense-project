const jwt = require('jsonwebtoken');
const usersModel = require('../models/dbDefine')

exports.authenticate =  (req,res, next) =>{
   try{
    const token = req.header("Authorization");
    // console.log(token);
    // console.log("entering authenticaation")

    const userToken = (jwt.verify(token, process.env.JWT_SECRET_KEY ));
    // console.log(userToken)

    // console.log(user," token wala user")
    usersModel.findByPk(userToken.userId).then( data => {
        // console.log(JSON.stringify(data))
        if(data!=null){
            
            req.user= userToken
            // console.log(req.user,"is data wala")

          
            next();
        }
    
        // console.log(req.user.totalexp)
      
        
    }).catch((err => console.log(err)))
   } catch(err){
    console.log(err);
    res.status(401).json({success : false})
   }
}

// exports.premiumcheck =  (req,res, next) =>{
    
//     try{
        
//         const token = req.get("Authorization");
//         console.log(token);
//         console.log("entering premiumcheck")
    
//         const user = (jwt.verify(token, 'secretkey'));
    
//         console.log(user)
   
   
//         if (user.ispremium==="True"){
//             console.log("Exiting PremiumCheck")
//         res.status(200).json({message : "You are a Premium User"})
//         req.user =user.userID;
       
//         next();
//         } else {
//             res.status(200).json({message : "You are a Not Premium User"})
//             req.user =user.userID;
       
//         next();
//         }

//     }catch(e){
//         console.log(e)
//     }
    

 
//     //  usersModel.findByPk(user.userId).then( user => {
//     //      console.log(JSON.stringify(user))
//     //      
//     //      console.log(req.user.ispremium,"premium check")
       
//     //      
//     //  }) .catch(async(err)=> res.status(500).json({error:err, success: false}))

   
   
//  }

