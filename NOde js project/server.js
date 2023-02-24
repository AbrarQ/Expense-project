const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const sequelize = require('./util/dbConnect');
const Expense = require('./models/expenseDefine');
const UserE = require('./models/dbDefine');
const User = require('./models/dbDefine');
const Orders = require('./models/order');
const forgotPass = require('./models/forgotpass');
const path = require('path')
const uuid = require('uuid')
const cors = require('cors');
const axios = require('axios');


app.use(cors())
const signuproutes = require('./routes/signupRoute');
const signinroutes = require('./routes/signinRoute');
const exproutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const resetRoutes = require('./routes/forgotpassR');
const savepassRoutes = require('./routes/savepass');

app.use(signuproutes);
app.use(signinroutes);
app.use(exproutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(resetRoutes);
app.use(savepassRoutes);
require("dotenv").config();

// (UserE).hasMany(Expense);
// Expense.belongsTo(UserE)

// (User).hasMany(forgotPass);
// (forgotPass).belongsTo(User)




//   sequelize.sync().then(result => 
//     {
//         console.log(result)
//     }).catch(err => {
//         console.log(err)
//     })

// const abrar = uuid.v1();
// console.log(abrar)
// console.log(`Here is a test v4 uuid: ${uuid.v4()}`);

app.listen(4000);
 
