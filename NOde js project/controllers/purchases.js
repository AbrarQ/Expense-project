const Razorpay = require('razorpay');
const order = require('../models/order')
const users = require('../models/dbDefine')

exports.purchasePremium = async (req, res, next)=>{
    try{
        console.log("Entering Purchase Section")
        var rzr = new Razorpay({
            key_id : 'rzp_test_jj0ngrCfqdNTOy',
            key_secret : 'JiRJfULmVfiC24kR1O822d0L'
        })

        const amount = 3175;
        
        //We create the oder for amount of thi currency
       const orderid = await rzr.orders.create({amount, currency: 'INR'});
       console.log(orderid.id)
       console.log(req.user.id)
          
        await order.create({orderid : orderid.id, status : "pending",userloginId : req.user.id}).then(()=> {
            res.status(201).json({orderid,key_id : rzr.key_id})

        })
    } catch(err){
      console.log(err)
    }
} 


exports.postTransaction = async( req, res, next)=> {
    console.log("enteringPost Transact")
    console.log(req.body);
    console.log(req.user)

    await order.update({
        paymentid : req.body.payment_id,
        status : " Success" },
        {where : { orderid : req.body.order_id}}

    )
    next();

}

exports.makeHimPremium = async( req, res, next)=> {
    console.log(req.user.id)
    console.log("making him premium")


    await users.update({
        ispremium : 1,
    }, {where : { id : req.user.id}}
    ).then(()=> {

    res.status(201).json({message : "You are a premium user now"})})


}