

const Sequelize = require ('sequelize');


const sequelizedb  = require('../util/dbConnect');

const forgotModel =  sequelizedb.define('forgotpasses',{
  uuid : { 
    type : Sequelize.INTEGER, 
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  },

  userid : { 
    type : Sequelize.INTEGER, 
    allowNull : false,
 
  },

  isactive : { 
    type : Sequelize.INTEGER,
    allowNull : false, 
    
  },
  
})


module.exports =  forgotModel;
