const { UUIDV1 } = require("sequelize");
const uuid = require('uuid')
const usersModel = require('../models/dbDefine')
const path = require('path')

function generateUUID() {
    return new uuid.v1()
}

// console.log(generateUUID());


exports.resetPass = async (req, res, next) => {
    try{
        const mail = req.body.emailid;
    const uuidx = req.middlewareUUID;
    // console.log(uuidx, "is the last step")
   

    const Sib = require('sib-api-v3-sdk');

    const client = new Sib.ApiClient.instance;

    const apiKey = new client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;

    // create a transactional email message
    let sendSmtpEmail = new Sib.SendSmtpEmail();
    sendSmtpEmail.to = [{ "email": mail }];
    sendSmtpEmail.sender = { "email": "abrarquraishi96@gmail.com", "name": "Abrar" };
    sendSmtpEmail.subject = "Reset-Password";
    sendSmtpEmail.textContent = "Hey Click below to reset Your Password";
    sendSmtpEmail.htmlContent = `<form  onsubmit="submitPass(event)" ><a href="http://localhost:4000/password/resetpassword/${uuidx}">Reset Password</a></form>`;
    console.log(sendSmtpEmail.htmlContent)

    // send the email
    const apiInstance = new Sib.TransactionalEmailsApi();
    apiInstance.sendTransacEmail(sendSmtpEmail)
        .then(
            res.status(200).json({ message: "Email sent successfully.", uuid :uuidx })
        )
        .catch((err) => {
            res.status(500).json({ error: err, message: false })
        });
    }catch(err){console.log(err); console.log("error at store pass")}
    



}


exports.sendhtml = async (req, res, next)=> {
    await res.sendFile(path.join(__dirname, '../views/SetNewPass.html'))
   
}

exports.sendjs= async (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname,'../views/JS/Setpass.js'))
  };
   

