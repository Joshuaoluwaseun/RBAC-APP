const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const { accessToken } = require('./middlewares/accesstoken')
const routes = require('./route/userRoute');
const winston = require('winston');

require("dotenv").config({
 path: path.join(__dirname, "../.env")
});

const app = express();

const PORT = process.env.PORT || 3000;

require('./logging')();

mongoose.set('strictQuery', true)

mongoose
 .connect(process.env.MONGO_URI)
 .then(() => {
  winston.info('Connected to the Database successfully');
 })

app.use(bodyParser.urlencoded({ extended: true }));

app.use(accessToken); 

app.use('/', routes); 

app.listen(PORT, () => {
  winston.info('Server is listening on Port:', PORT)
})
