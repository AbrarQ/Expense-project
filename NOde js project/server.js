const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const sequelize = require('./util/dbConnect');
const Expense = require('./models/expenseDefine');
const User = require('./models/dbDefine');


const cors = require('cors');



app.use(cors())
const signuproutes = require('./routes/signupRoute');
const signinroutes = require('./routes/signinRoute');
const exproutes = require('./routes/expense');
app.use(signuproutes);
app.use(signinroutes);
app.use(exproutes);

(User).hasMany(Expense);
(Expense).belongsTo(User)


//  sequelize.sync().then(result => 
//     {
//         console.log(result)
//     }).catch(err => {
//         console.log(err)
//     })



   
app.listen(4000);
 
