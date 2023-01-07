const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const { accessToken } = require('./middlewares/accesstoken')
const routes = require('./route/userRoute');

require("dotenv").config({
 path: path.join(__dirname, "../.env")
});

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', true)

mongoose
 .connect('mongodb://localhost:27017/rbac')
 .then(() => {
  console.log('Connected to the Database successfully');
 });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(accessToken);

app.use('/', routes); 

app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})