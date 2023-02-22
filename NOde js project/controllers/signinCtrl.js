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


exports.resetPass = async( req, res, next)=> {
    console.log( req.body.emailid)
    
    const { GetEmailCampaign } = require('sib-api-v3-sdk');
const Sib = require('sib-api-v3-sdk');


require('dotenv').config();

const client = Sib.ApiClient.instance

const apikey = client.authentications['api-key'];
apikey.apikey = process.env.API_KEY 

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
    email : 'abrarquraishi99@gmail.com'
}

tranEmailApi.sendTransacEmail({
    sender,
    to : req.body.emailid,
    subject : "Password Reset Link for Expenses App",
    textContent : "Please click below to reset your password"
})
.then(response => console.log(response))
.catch((err)=> { console.log(err)})

  
}


