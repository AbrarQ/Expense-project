const usersModel = require('../models/dbDefine')
const bcrypt = require('bcrypt');
const check = require('../models/checks');



exports.saveUsers = async (req, res, next) => {
    try {

        const usernameCheck = await check(req.body.userdata);
        if (usernameCheck == -1) {
            console.log(usernameCheck);
            console.log("we are not executing this user")
            res.status(401).send();
            // if {} esle{}

        } else if (usernameCheck == 0) {
            const pass = req.body.passwordData
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(pass, salt)
            const data = await usersModel.create({
                name: req.body.userdata,
                email: req.body.emaildata,
                phonenumber: req.body.pnumberdata,
                password: hashedPass
            })
            res.status(200).json({message : "User Created Succesfully"});


        }

    } catch (e) {
        console.log(e)
    }

}



