

const Sequelize = require ('sequelize');

const sequelizedb  = require('../util/dbConnect');



const expmodel = sequelizedb.define('expenses',{
  id : { 
    type : Sequelize.INTEGER, 
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  },

  amount : { 
    type : Sequelize.STRING, 
    allowNull : false,
 
  },

  description : { 
    type : Sequelize.STRING,
    
    allowNull : false, 
    
  },
  category : { 
    type : Sequelize.STRING,
    allowNull : false, 
    
  },
})

module.exports = expmodel;