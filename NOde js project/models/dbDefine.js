

const Sequelize = require ('sequelize');

const sequelizedb  = require('../util/dbConnect');



const usersModel = sequelizedb.define('userlogins',{
  id : { 
    type : Sequelize.INTEGER, 
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  },

  name : { 
    type : Sequelize.STRING, 
    allowNull : false,
 
  },

  email : { 
    type : Sequelize.INTEGER,
    allowNull : false, 
    
  },
  phonenumber : { 
    type : Sequelize.INTEGER,
    allowNull : false, 
    
  },
  password : { 
    type : Sequelize.STRING,
    allowNull : false, 
    
  },
})

module.exports = usersModel;