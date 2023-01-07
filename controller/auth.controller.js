const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

// Register route
exports.signup = async (req, res, next) => {
    try {
    const { 
        firstName,
        email, 
        password, 
        role 
    } = req.body

    // get the password and hash it
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({ 
        firstName,
        email, 
        password: hashedPassword, 
        role: role || "staff"
    });

    //jwt auth token
    const accessToken = jwt.sign({ userId: newUser._id },
        process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    newUser.accessToken = accessToken;
    await newUser.save();
    return res.status(201).json({
    data: newUser,
    accessToken,
    message: "You successfully registered"
    })
    } catch (error) {
    next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     // check if email exists
     const user = await User.findOne({ email });
     if (!user) return res.status(404).json({
        message: "Invalid email or password"
     });
    // check and compare password
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return res.status(404).json({
    message: "Invalid email or password"
    });
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
    });

    await User.findByIdAndUpdate(user._id, { accessToken })
    return res.status(200).json({
        data: { 
            email: user.email, 
            role: user.role 
        },
        accessToken
    })
    } catch (error) {
     next(error);
    }
}
