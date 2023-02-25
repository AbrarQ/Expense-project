const { UUIDV1 } = require("sequelize");
const uuid = require('uuid')
const usersModel = require('../models/dbDefine')
const helperFunction = require('../services/functions')
const path = require('path')
const passModel = require('../models/forgotpass')
const sequelize = require('../util/dbConnect');
const { QueryTypes, where } = require('sequelize');

const bcrypt = require('bcrypt');



exports.sendjs = async (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../views/JS/Setpass.js'))
};


exports.storepass = async (req, res, next) => {

  const t = await sequelize.transaction();

  const userID = await helperFunction.userID(req.body.fileName)
  console.log(userID)
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

      const uuidUpdate = await passModel.update({
        isactive: false
      }, { where: { userid: userID.userid }, transaction: t })

        .then(async () => {
          await t.commit();
          res.status(200).json({ message: "Password Updated Successfully" })
        })
        .catch(async (err) => {
          await t.rollback();
          res.status(500).json({ error: err })
        })
    })
    .catch(async (err) => {
      await t.rollback();
      res.status(500).json({ error: err })
    })

  }









}



