const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const sqlize = require('./models/dbDefine');
const signupRoutes = require('./routes/signupRoute');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(signupRoutes);

sqlize.sync();

app.listen(5000);
