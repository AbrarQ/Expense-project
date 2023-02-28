const passModel = require('../models/resetPassLinkStatusModel')
const usersModel = require('../models/userLoginsModel');
const expmodel = require('../models/expensesModel');

/**
 * HOME FOR UUID FUNCTIONS
 * FETCH USER ID WHERE EMAIL IS GIVEN
 * NEW REQUEST UPDATION IN DB WITH NEW UUID
 * UUID DB CHECK - CHECKING IF THE LINK IS IN ACTIVE STATE OR NOT
 */



async function fetchUserID(mail) {
    // console.log("Fetching Mail Id, step-2")
    const email = `${mail}`;

    const allData = await usersModel.findOne({ where: { email: email } })
        .catch(async (err) => res.status(500).json({ err }))
    const check = JSON.stringify(allData);
    const final = JSON.parse(check)
    if(final == null){
        return final
    } else {

    return final.id;
    }

}




async function  newResetRequest(userid) {
    // console.log("step-3")
    const uuid = require('uuid');

    const UUID = new  uuid.v1();
   
   
   
    const newSubmit = await passModel.create({
        userid : `${userid}`,
        uuid : UUID,
        isactive : true

    }).then().catch((err)=> console.log(err))

 
    
return new UUID;

}


exports.userid =async (req, res, next)=> {
    const mail = req.body.emailid;

    const userid = await fetchUserID(mail)

}

exports.uuidDbCheck = async (req,res,next)=>{
// console.log("Entering step -1")
    const mail = req.body.emailid;

    const userid = await fetchUserID(mail)

    if (userid == null){
        res.status(404).json({message : "User Not Found"})
    }


    const fetcher = await passModel.findOne({where : { userid : userid}});
    const check = JSON.stringify(fetcher);
    const final = JSON.parse(check)
    // console.log(final,"Precheck")
if (final== null || final.isactive===0){
   const uuidData = await newResetRequest(userid);
   req.middlewareUUID = uuidData;
   next();
    
} else {

   res.status(201).json({message: "An Email has been sent, Please check your inbox"})
}


}