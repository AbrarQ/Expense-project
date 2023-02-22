const { all } = require('axios');
const usersModel = require('../models/dbDefine')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')




function generateAuthToken(id){
    return jwt.sign({userId : id}, 'secretkey')
}

exports.getUsers = async (req, res, next) => {

    const user = req.params.id;
    console.log(user)


        const allData = await usersModel.findAll({ where: { name: user } }).then(response => response)
         .catch(async(err)=> res.status(500).json({err}))
        const check = JSON.stringify(allData);
        const final = JSON.parse(check)
        console.log(final)

        if (final.length==0){
            res.status(404).send();
        
        } else{
        const hashPass = final[0].password
        const pass = req.params.pass;
        const comparePass = await  bcrypt.compare(pass,hashPass);

        console.log(comparePass); 

        if (comparePass == false) {

           res.status(401).send()
        } else if (comparePass == true) {
          
            res.status(200).json({token : generateAuthToken(final[0].id), message : "Login done"});
        }
    }
    



}


