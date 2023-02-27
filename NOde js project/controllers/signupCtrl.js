const usersModel = require('../models/dbDefine')
const bcrypt = require('bcrypt');
const check = require('../models/checks');


exports.saveUsers = async (req, res, next) => {
    try {

        //calls the function which takes in user name and tells us if there are
        //any users with that user name 
        const usernameCheck = await check(req.body.userdata);
        if (usernameCheck == -1) {
            // console.log(usernameCheck);
            // console.log("we are not executing this user")
            res.status(401).json({message : "Username Already Exists!!"});
        

        } else if (usernameCheck == 0) {
            const pass = req.body.passwordData
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(pass, salt)
            const data = await usersModel.create({
                name: req.body.userdata,
                email: req.body.emaildata,
                phonenumber: req.body.pnumberdata,
                password: hashedPass
            }).then(
            res.status(200).json({message : "User Created Succesfully"}));


        }

    } catch (err){
        console.log("err at signupCTRL")
       console.log(err)
    }

} 



