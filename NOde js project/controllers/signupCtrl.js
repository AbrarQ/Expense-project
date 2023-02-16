const usersModel = require('../models/dbDefine')

exports.saveUsers =async(req,res,next)=>{

    const usrName = req.body.userdata;
    const emailid = req.body.emaildata;
    const pnumber = req.body.pnumberdata;
    const pswrd = req.body.passwordData

    console.log(req.body.userdata);
    console.log(req.body.emaildata);
    console.log(req.body.pnumberdata);
    console.log(req.body.passwordData);
    
try{
    const data = await usersModel.create({
        name : usrName,
        email : emailid,
        phonenumber : pnumber,
        password : pswrd
    }).then(console.log("done"))

    res.json(data);
} catch(e){

}
    
}


