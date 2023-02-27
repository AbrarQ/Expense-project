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
const downloadedUrls = require('./models/Linksmodel');
const path = require('path')
const uuid = require('uuid')
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet')
const compression = require('compression')
const fs = require('fs')
const https =require('https')

require("dotenv").config();

const signuproutes = require('./routes/signupRoute');
const signinroutes = require('./routes/signinRoute');
const exproutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const resetRoutes = require('./routes/forgotpassR');
const savepassRoutes = require('./routes/savepass');
const donwloadROutes = require('./routes/downloadR');
const morgan = require('morgan');
const LogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags : 'a'})
app.use(morgan('combined',{ stream : LogStream }) )
app.use(signuproutes);
app.use(signinroutes);
app.use(exproutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(resetRoutes);
app.use(savepassRoutes);
app.use(donwloadROutes);
app.use(downloadedUrls);
app.use(cors())
app.use(helmet())
// app.use(compression())



const privateKey = fs.readFileSync('server.key')
const certificate = fs.readFileSync('-server.cert')


app.use((req, res)=>{
    console.log("url", req.url );
    res.sendFile(path.join(__dirname,`public/signin.html`))
})

// (UserE).hasMany(Expense);
// Expense.belongsTo(UserE)

// (User).hasMany(forgotPass);
// (forgotPass).belongsTo(User)



   sequelize.sync().then(result => 
    {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })





// https.createServer({key :privateKey , cert :certificate},app)
app.listen(4000);
 
