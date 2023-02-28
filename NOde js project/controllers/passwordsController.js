const usersModel = require('../models/userLoginsModel')
const helperFunction = require('../services/functions')
const path = require('path')
const linkModel = require('../models/resetPassLinkStatusModel')
const sequelize = require('../util/dbConnection');
const bcrypt = require('bcrypt');

/**
 * HOME FOR PASSWORD ROUTES
 * RESET PASSWORD
 * SEND HTML ,SEND JS
 * STORE UPDATED PASSWORD IN DATABASE
 */





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
    next();
   
}

exports.sendjs= async (req, res) => {
    res.set('Content-Type', 'application/javascript');
    await res.sendFile(path.join(__dirname,'../views/JS/Setpass.js'))
  };
  
  
  
 
  
  
  exports.storepass = async (req, res, next) => {
  try{
    const t = await  sequelize.transaction();
  
    const userID = await helperFunction.userID(req.body.fileName)
    // console.log(userID)
    if(userID.isactive ===0){
      console.log("cant use me")
      res.status(301).json({error : "Url Expired!!!", success: false});
    }  else {
  
    const pass = await req.body.newpass
  
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt)
  
  
  
    const passUpdate = await usersModel.update({
      
      password: hashedPass
    }, { where: { id: userID.userid }, transaction: t })
      .then(async (response) => {
  
        const uuidUpdate = await linkModel.update({
          isactive: false
        }, { where: { userid: userID.userid }, transaction: t })
  
          .then(async () => {
            await t.commit();
            res.status(200).json({ message: "Password Updated Successfully" })
            next();
          })
          .catch(async (err) => {
            await t.rollback();
            res.status(500).json({ error: err, message: false})
          })
      })
      .catch(async (err) => {
        await t.rollback();
        res.status(500).json({ error: err, message: false })
      })
  
    }
  }catch(err){console.log(err); console.log("error at store pass")}
   
  
  
  
  
  
  
  
  
  
  }
  
  
  
  
