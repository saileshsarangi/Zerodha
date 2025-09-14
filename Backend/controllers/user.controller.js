const User = require("../models/userModel")
const BlacklistedToken =  require('../models/BlckToken')
const jwt = require("jsonwebtoken")
const {validationResult}=require('express-validator');
const { createConnection } = require("mongoose");
const signup = async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { name, email, password, phone } = req.body;
        if (!name || !email || !password ||! phone) {
            return res.status(402).json({ message: " please give email password name phone" })
        }
        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: 'User already exists' });
        const hasedPassword = await User.createPassword(password)
        const newuser = new User({ name, email, password: hasedPassword, phone })
        console.log(newuser)
        const token = await newuser.generateAuthToken({userId:newuser._id})
        await newuser.save();
        res.status(201).json({token:token ,data:newuser});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req,res) => {
    console.log("comming")
    try {
    const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { email, password} = req.body;
        if ( !email || !password ) {
            return res.status(402).json({ messeage: " please give email password" })
        }
        let user = await User.findOne({ email });
        if(!user)
        {
           return res.status(402).json({ messeage: "email and password not found" })
        }
        const valid =  user.comparePassword(password)
        if(!valid)
        {
             return res.status(402).json({ messeage: "email and password is invalid" })
        }
        const token =  user.generateAuthToken({userID:user._id});
        res.status(201).json({token:token ,data:user});
    }
    catch (error) {
       console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = async () => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const Authtoken =  req.headers.authorization
        const token = Authtoken.split(' ')[1];
        if(!token)
        {
            res.status(401).json({message:"no token is provided"})
        }
        const decoded =  jwt.decode(token)
        const blacklistedtoken = new BlacklistedToken({token:token,user:decoded.userID})
        
    } catch (error) {

    }
}

module.exports =  {signup,login,logout}