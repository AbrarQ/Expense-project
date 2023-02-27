const Razorpay = require('razorpay');
const order = require('../models/order')
const users = require('../models/dbDefine')
// require("dotenv").config();

const jwt = require('jsonwebtoken')


function generateAuthToken(uid){
    return new jwt.sign({userId : uid, ispremium :"1"}, process.env.JWT_SECRET_KEY)
}

exports.purchasePremium = async (req, res, next)=>{
  try{  
    //  console.log("Entering Purchase Section")
  
  var rzr = new Razorpay({
      key_id : process.env.RAZORPAY_KEY_ID,
      key_secret : process.env.RAZORPAY_KEY_SECRET 
     
  })

  const amount = 250000;
  
  //We create the oder for amount of thi currency
 const orderid = await rzr.orders.create({amount, currency: 'INR'});
//  console.log(orderid.id)
//  console.log(req.user.id)

     
          
        await order.create({orderid : orderid.id, status : "pending",userloginId : req.user.id})
        .then(()=> {
            res.status(201).json({orderid,key_id : rzr.key_id})
        })
        .catch(async(err)=> res.status(500).json({err, message: false}))
    
    }
    catch(err)
    {
        console.log(err);
    console.log("error in ourchase")}
} 


exports.postTransaction = async( req, res, next)=> {
    // console.log("enteringPost Transact")
    // console.log(req.body);
    // console.log(req.user)
try {
    const status = req.body.status;
    // console.log(status)
    await order.update({
        paymentid : req.body.payment_id,
        status : status },
        {where : { orderid : req.body.order_id}}

    ) .catch(async(err)=> res.status(500).json({err, message: false}))

    const uid =req.user.id;
    // console.log("making him premium")
if (status==="Success"){
    await users.update({
        ispremium : '1',
    }, {where : { id : uid}}
    ).then(()=> {

    res.status(201).json({token : generateAuthToken(uid, "True"),message : "You are a premium user now"})})
    .catch(async(err)=> console.log(err))
    next();
    } else {
        res.status(402).json({token : generateAuthToken(req.user.id,"False"), message : "Payment Failed"});
    }
} catch(err){console.log(err);console.log("post transact")}
   
    

}

function generateAuthToken(id,key){
    return new jwt.sign({userId : id, ispremium:key}, process.env.JWT_SECRET_KEY)
}

exports.makeHimPremium = async( req, res, next)=> {
 
try{
    generateAuthToken(req.user.id)
    await users.update({
        ispremium : "1",
       }, {where : { orderid : req.body.order_id}}

    ).catch(async(err)=> res.status(500).json({success : false}))
    
} catch(err){
    console.log(err);
    console.log("making premium")
}
   


}