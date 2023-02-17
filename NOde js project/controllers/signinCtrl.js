const { all } = require('axios');
const usersModel = require('../models/dbDefine')


exports.getUsers = async (req, res, next) => {

    const user = req.params.id;
    const pass = req.params.pass;

  
   
    try {

        const allData = await usersModel.findAll({ where: { name: user } }).then(response => response);
        const check = JSON.stringify(allData);
        const final = JSON.parse(check)

        // console.log(final[0].password)
        // console.log(req.params.pass)
        // console.log(req.params.id)

        if (final.length == 0) {
            res.status(404).send();
        } else if (final[0].password != pass) {
            res.status(401).send();
        } else if (final[0].password == pass) {
            console.log("found")
            res.status(200).send();
        }



    } catch (e) {
        console.log(e)
    }

}


