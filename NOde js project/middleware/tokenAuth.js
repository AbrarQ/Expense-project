const jwt = require('jsonwebtoken');
const usersModel = require('../models/dbDefine')


exports.authenticate =  (req,res, next) =>{
   try{
    const token = req.header("Authorization");
    console.log(token);
    console.log("entering authenticaation")

    const user = (jwt.verify(token, 'mysecret'));

    console.log(user," token wala user")

    usersModel.findByPk(user.userId).then( user => {
        console.log(JSON.stringify(user))
        req.user =user;
        console.log(req.user,"req.user iss");
        next();  
    }).catch((err => console.lo(err)))
   } catch(e){
    console.log(err);
    res.status(401).json({success : false})
   }
}


