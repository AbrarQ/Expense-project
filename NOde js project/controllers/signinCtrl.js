const usersModel = require('../models/dbDefine')


exports.getUsers = async (req, res, next) => {

    const user = req.params.id;

    console.log(user)
    try {

        const allData = await usersModel.findAll({ where : {name : user}}).then(resp => res.json(resp));

        
    } catch (e) {
        console.log(e)
    }

}


