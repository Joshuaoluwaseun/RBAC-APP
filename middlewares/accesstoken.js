const jwt = require('jsonwebtoken');
const User = require('../model/userModel')
require("dotenv").config();

exports.accessToken  = async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) {
        console.log(Date.now().valueOf()) 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId); 
     next(); 
    } else { 
     next(); 
    } 
   }