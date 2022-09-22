const express = require('express');
const bodyParser = require('body-parser');
const errorLogger = require('./Utilities/errorLogger');
const reqestLogger = require('./Utilities/requestLogger');
const router = require('./routes/routing');
const cors= require('cors');
const create =require('./model/setupdb');
const app = express();

let port = 3333 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(reqestLogger);
app.use('/cart',router);
app.use(errorLogger);

app.listen(port);
console.log('Service started at '+ port);
module.exports=app

