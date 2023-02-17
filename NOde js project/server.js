const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const sequelize = require('./util/dbConnect');
const cors = require('cors');



app.use(cors())
const signuproutes = require('./routes/signupRoute');
const signinroutes = require('./routes/signinRoute');
app.use(signuproutes);
app.use(signinroutes);




//  sequelize.sync().then(result => 
//     {
//         console.log(result)
//     }).catch(err => {
//         console.log(err)
//     })
app.listen(4000);
 