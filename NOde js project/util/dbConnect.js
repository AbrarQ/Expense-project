const Sequelize = require ('sequelize');
const sequelize = new Sequelize('nodejs','root', 'H3lloworld!', {
    dialect : 'mysql',
    host : 'localhost'
});


module.exports = sequelize;