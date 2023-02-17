const usersModel = require('../models/dbDefine')


exports.saveUsers = async (req, res, next) => {

    

    
    console.log(req.body.userdata);
    console.log(req.body.emaildata);
    console.log(req.body.pnumberdata);
    console.log(req.body.passwordData);

    try {
        const data = await usersModel.create({
            name: req.body.userdata,
            email: req.body.emaildata,
            phonenumber: req.body.pnumberdata,
            password: req.body.passwordData
        }).then(console.log("done"))

        res.json(data);
    } catch (e) {
        console.log(e)
    }

}


