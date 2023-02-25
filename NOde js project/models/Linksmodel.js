

const Sequelize = require ('sequelize');


const sequelizedb  = require('../util/dbConnect');


const linksModel = sequelizedb.define('urls',{
  userid : { 
    type : Sequelize.INTEGER, 
    allowNull : false,
    primaryKey : true,
  },

  url : { 
    type : Sequelize.STRING,
    allowNull : false,    
  },
  
})

module.exports = linksModel;
